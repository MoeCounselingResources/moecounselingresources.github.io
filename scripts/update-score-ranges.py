#!/usr/bin/env python3
"""Refresh assets/data/score-ranges.js with ACT/SAT middle-50% ranges from the
U.S. Department of Education College Scorecard API.

The API key is read ONLY from the SCORECARD_API_KEY environment variable (a
GitHub Actions secret). It is never written to any file or printed.
Uses only the Python standard library.

Each school takes ONE API request (all years and fields together); its Scorecard
id is saved into tracked-colleges.json after the first lookup, so later runs skip the
name search. Rate limits (HTTP 429) are waited out and retried, never skipped.
For every school in scripts/tracked-colleges.json (plus any school in
assets/data/popular-colleges.js that is missing from that list) it finds the
newest year with data and stores:
  ACT  = 25th and 75th percentile of the composite score
  SAT  = 25th + 25th and 75th + 75th percentile of Reading/Writing and Math
If a school or value can't be found, the old value is kept and a note is
printed to the workflow log (and shown as a GitHub Actions annotation).
Counselor notes, deadlines, and policies stay in popular-colleges.js.
Schools marked "useMyRanges": true there are skipped; their ranges never change.
"""
import json, os, re, sys, time, urllib.error, urllib.parse, urllib.request
from datetime import date, datetime, timezone

HERE = os.path.dirname(os.path.abspath(__file__))
LIST_FILE = os.path.join(HERE, "tracked-colleges.json")
POPULAR_FILE = os.path.join(HERE, "..", "assets", "data", "popular-colleges.js")
OUT_FILE = os.path.join(HERE, "..", "assets", "data", "score-ranges.js")
API_URL = os.environ.get("SCORECARD_API_URL", "https://api.data.gov/ed/collegescorecard/v1/schools.json")
YEARS_BACK = 6  # how many past years to ask for (newest data wins)

ACT_FIELDS = ("admissions.act_scores.25th_percentile.cumulative",
              "admissions.act_scores.75th_percentile.cumulative")
SAT_FIELDS = ("admissions.sat_scores.25th_percentile.critical_reading",
              "admissions.sat_scores.25th_percentile.math",
              "admissions.sat_scores.75th_percentile.critical_reading",
              "admissions.sat_scores.75th_percentile.math")

key = os.environ.get("SCORECARD_API_KEY", "").strip()
if not key:
    sys.exit("SCORECARD_API_KEY secret is not set; leaving score-ranges.js unchanged.")

notes = []
last_response = []  # most recent API response, shown in the log if a school fails
def note(msg):
    notes.append(msg)
    print("::warning::" + msg if os.environ.get("GITHUB_ACTIONS") else "NOTE: " + msg)

def norm(s):
    return re.sub(r"[^a-z0-9]", "", s.lower())

def flatten(o, prefix="", out=None):
    """Turn any mix of nested dicts/lists into {"dotted.path": scalar}.
    Handles flat dotted keys, nested objects (keys_nested), and lists.
    For repeated paths the first non-null value wins."""
    out = {} if out is None else out
    if isinstance(o, dict):
        for k, v in o.items():
            flatten(v, "%s.%s" % (prefix, k) if prefix else str(k), out)
    elif isinstance(o, list):
        for v in o:
            flatten(v, prefix, out)
    elif prefix and o is not None and prefix not in out:
        out[prefix] = o
    return out

def records(d):
    """The API's "results" as a list of flat {path: value} dicts, whatever its shape."""
    res = (d or {}).get("results") if isinstance(d, dict) else d
    if isinstance(res, dict):
        res = [res]
    recs = []
    for item in res or []:
        if isinstance(item, list):
            recs.extend(flatten(x) for x in item if isinstance(x, dict))
        elif isinstance(item, dict):
            recs.append(flatten(item))
    return recs

def number(v):
    if isinstance(v, bool):
        return None
    if isinstance(v, (int, float)):
        return v
    try:
        return float(v)
    except (TypeError, ValueError):
        return None

def shape(o, depth=0):
    """Short description of a response's structure (keys and types, no values)."""
    if isinstance(o, dict):
        if depth >= 3:
            return "{%d keys}" % len(o)
        return "{" + ", ".join("%s: %s" % (k, shape(v, depth + 1)) for k, v in list(o.items())[:12]) + (", ..." if len(o) > 12 else "") + "}"
    if isinstance(o, list):
        return "[%d x %s]" % (len(o), shape(o[0], depth + 1) if o else "empty")
    return type(o).__name__

shown = set()
def debug(label, d, force=False):
    """Print the response structure the first time each kind of call is made
    (or any time force=True), so a surprise shape is visible in the log."""
    if label in shown and not force:
        return
    shown.add(label)
    top = list(d.keys()) if isinstance(d, dict) else type(d).__name__
    print("DEBUG %s: top-level keys=%s; shape=%s" % (label, top, shape(d)))
    print("DEBUG %s: sample=%s" % (label, json.dumps(d, default=str)[:700]))

RETRY_BASE = float(os.environ.get("SCORECARD_RETRY_BASE", "5"))  # seconds; tests set it small
MAX_TRIES = 10

def api(params):
    """GET the API. Returns parsed JSON, or None on HTTP 400 (e.g. unknown field).
    On HTTP 429 (rate limit) it waits and retries with growing delays (honoring
    Retry-After) rather than giving up, so a busy hour just slows the run down."""
    q = urllib.parse.urlencode(dict(params, api_key=key))
    for attempt in range(1, MAX_TRIES + 1):
        wait = min(RETRY_BASE * 2 ** (attempt - 1), 120 if RETRY_BASE >= 1 else RETRY_BASE * 8)
        try:
            with urllib.request.urlopen(API_URL + "?" + q, timeout=60) as r:
                d = json.load(r)
                last_response[:] = [d]
                left = r.headers.get("X-RateLimit-Remaining")
                if left is not None and left.isdigit() and int(left) < 3:
                    print("Only %s API requests left this hour; pausing %ds." % (left, 60 * (RETRY_BASE >= 1)))
                    time.sleep(60 if RETRY_BASE >= 1 else RETRY_BASE)
                return d
        except urllib.error.HTTPError as e:
            if e.code == 400:
                return None
            if e.code == 429 or e.code in (500, 502, 503, 504):
                ra = e.headers.get("Retry-After") if e.headers else None
                if ra and ra.isdigit():
                    wait = max(wait, min(int(ra), 300) if RETRY_BASE >= 1 else RETRY_BASE)
                if attempt < MAX_TRIES:
                    print("%s from the Scorecard API (%s); waiting %.0fs, then retrying (%d/%d)." % (
                        e.code, "rate limit" if e.code == 429 else "server busy", wait, attempt, MAX_TRIES - 1))
                    time.sleep(wait)
                    continue
            raise RuntimeError("HTTP %d from the Scorecard API after %d tries" % (e.code, attempt))
        except (urllib.error.URLError, TimeoutError):
            if attempt < MAX_TRIES:
                time.sleep(wait)
                continue
            raise RuntimeError("could not reach the Scorecard API")

# ---------- the list of schools ----------
list_doc = json.load(open(LIST_FILE, encoding="utf-8"))
tracked = list_doc["colleges"]
ids_changed = False  # set when a school's unitid is learned, so the list file gets rewritten
have = {norm(c["name"]) for c in tracked}
popular, my_ranges = [], set()
try:
    ptxt = open(POPULAR_FILE, encoding="utf-8").read()
    for m in re.finditer(r'^\s*"name":\s*"([^"]+)"(.*?)(?=^\s*"name":|\Z)', ptxt, re.M | re.S):
        popular.append(m.group(1))
        if re.search(r'"useMyRanges":\s*true', m.group(2)):
            my_ranges.add(norm(m.group(1)))
except OSError:
    pass
for n in popular:
    if norm(n) not in have:
        note("%s is in popular-colleges.js but not in tracked-colleges.json; tracking it by name. Add it to the list file." % n)
        tracked.append({"name": n})

# ---------- previous data (kept when something is missing) ----------
old = {"colleges": {}}
try:
    txt = open(OUT_FILE, encoding="utf-8").read()
    m = re.search(r"const SCORE_RANGES = (\{.*\});", txt, re.S)
    if m:
        old = json.loads(m.group(1))
except (OSError, ValueError):
    pass
colleges = old.get("colleges", {})

def find_id(c):
    """The school's Scorecard id: from the list file, else earlier data, else a name search
    (done once; the id is then saved into tracked-colleges.json)."""
    global ids_changed
    if c.get("unitid"):
        return int(c["unitid"])
    sid = colleges.get(c["name"], {}).get("id")
    if not sid:
        want = c.get("scorecardName") or c["name"]
        d = api({"school.name": want, "fields": "id,school.name,school.state", "per_page": 50})
        debug("name search (first school)", d)
        results = [r for r in records(d) if r.get("id") is not None]
        exact = [r for r in results if norm(str(r.get("school.name", ""))) == norm(want)]
        if len(exact) == 1:
            sid = exact[0]["id"]
        elif len(exact) > 1:
            note("%s: %d Scorecard schools are named '%s'; set \"unitid\" in tracked-colleges.json." % (c["name"], len(exact), want))
        elif results:
            near = ", ".join("%s (%s)" % (r.get("school.name"), r.get("school.state")) for r in results[:4])
            note("%s: no exact Scorecard match for '%s'. Closest: %s. Set \"scorecardName\" or \"unitid\" in tracked-colleges.json." % (c["name"], want, near))
        else:
            note("%s: not found in College Scorecard." % c["name"])
    if sid:
        c["unitid"] = int(sid)
        ids_changed = True
        return int(sid)
    return None

ALL_YEARS = list(range(date.today().year, date.today().year - YEARS_BACK, -1))  # newest first
ALL_FIELDS = ACT_FIELDS + SAT_FIELDS
valid_years = None  # years the API knows about; found once, only if the big request is refused

def field_names(years):
    return ["%d.%s" % (y, f) for y in years for f in ALL_FIELDS]

def school_values(school_id):
    """One request for every year and field. Returns a flat {"2023.admissions...": value} dict."""
    global valid_years
    d = api({"id": school_id, "fields": ",".join(field_names(valid_years or ALL_YEARS))})
    if d is None and valid_years is None:
        # The API refused a year it doesn't have yet. Find the usable years once (one small
        # request per year), then use them for every school from here on.
        valid_years = [y for y in ALL_YEARS if api({"id": school_id, "fields": ",".join(field_names([y]))}) is not None]
        print("Using years: %s" % valid_years)
        if not valid_years:
            raise RuntimeError("the API accepted none of the years %s" % ALL_YEARS)
        d = api({"id": school_id, "fields": ",".join(field_names(valid_years))})
    if d is None:
        raise RuntimeError("the API refused the score request")
    debug("score query (first school)", d)
    merged = {}
    for rec in records(d):
        for k, v in rec.items():
            merged.setdefault(k, v)
    return merged

def newest(merged, fields):
    """Newest year with every field present: (year, [values]) or (None, None)."""
    for y in (valid_years or ALL_YEARS):
        vals = [number(merged.get("%d.%s" % (y, f))) for f in fields]
        if all(v is not None for v in vals):
            return y, vals
    return None, None

updated = 0
for c in tracked:
    name = c["name"]
    if norm(name) in my_ranges:
        colleges.pop(name, None)
        print("Skipping %s: marked useMyRanges in popular-colleges.js (keeping your ranges)." % name)
        continue
    try:
        sid = find_id(c)
        if not sid:
            continue
        entry = colleges.get(name, {})
        entry["id"] = sid
        changed = False

        merged = school_values(sid)
        y, v = newest(merged, ACT_FIELDS)
        if v:
            entry["act"] = {"low": int(round(v[0])), "high": int(round(v[1])), "year": y}
            changed = True
        else:
            note("%s: no ACT range in College Scorecard; keeping the old value." % name)

        y, v = newest(merged, SAT_FIELDS)
        if v:
            entry["sat"] = {"low": int(round(v[0] + v[1])), "high": int(round(v[2] + v[3])), "year": y}
            changed = True
        else:
            note("%s: no SAT range in College Scorecard; keeping the old value." % name)

        if entry.get("act") or entry.get("sat"):
            colleges[name] = entry
        if changed:
            updated += 1
    except Exception as e:  # one school's problem must not stop the run
        note("%s: skipped, %s: %s; keeping the old value." % (name, type(e).__name__, e))
        if last_response:
            debug("failed response for " + name, last_response[0], force=True)
    time.sleep(0.3 if RETRY_BASE >= 1 else 0)

if ids_changed:
    lines = json.dumps(list_doc.get("_help", []), indent=2, ensure_ascii=False).replace("\n", "\n  ")
    out = '{\n  "_help": %s,\n  "colleges": [\n%s\n  ]\n}\n' % (
        lines, ",\n".join("    " + json.dumps(e, ensure_ascii=False) for e in tracked))
    if out != open(LIST_FILE, encoding="utf-8").read():
        open(LIST_FILE, "w", encoding="utf-8").write(out)
        print("Saved school ids to tracked-colleges.json.")

years = [e[k]["year"] for e in colleges.values() for k in ("act", "sat") if e.get(k)]
data = {
    "source": "College Scorecard (U.S. Department of Education)",
    "dataYear": max(years) if years else old.get("dataYear"),
    "updated": date.today().isoformat() if updated else old.get("updated"),
    "colleges": {k: colleges[k] for k in sorted(colleges)},
}

header = """/* =========================================================================
   ACT / SAT MIDDLE-50% RANGES — written by scripts/update-score-ranges.py
   (GitHub Actions: "Update ACT/SAT score ranges", every August 1).
   Don't edit by hand; changes are overwritten. Counselor notes, deadlines, and
   policies stay in popular-colleges.js. The school list is scripts/tracked-colleges.json.
   • act / sat: {low, high, year}. SAT is Reading/Writing + Math, 25th and 75th percentile.
   ========================================================================= */
"""
body = "const SCORE_RANGES = " + json.dumps(data, indent=1, ensure_ascii=False) + ";\n"
new = header + body
if not os.path.exists(OUT_FILE) or open(OUT_FILE, encoding="utf-8").read() != new:
    open(OUT_FILE, "w", encoding="utf-8").write(new)

print("Updated %d of %d schools. Data year: %s. %d note(s)." % (updated, len(tracked), data["dataYear"], len(notes)))
summary = os.environ.get("GITHUB_STEP_SUMMARY")
if summary:
    with open(summary, "a", encoding="utf-8") as f:
        f.write("### Score ranges update\nUpdated %d of %d schools. Data year: %s.\n\n" % (updated, len(tracked), data["dataYear"]))
        if notes:
            f.write("**Needs a look:**\n" + "".join("- %s\n" % n for n in notes))
if updated == 0:
    sys.exit("No school could be updated; check the notes above.")
