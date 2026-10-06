#!/usr/bin/env python3
"""Refresh assets/data/score-ranges.js with ACT/SAT middle-50% ranges from the
U.S. Department of Education College Scorecard API.

The API key is read ONLY from the SCORECARD_API_KEY environment variable (a
GitHub Actions secret). It is never written to any file or printed.
Uses only the Python standard library.

For every school in scripts/tracked-colleges.json (plus any school in
assets/data/popular-colleges.js that is missing from that list) it finds the
newest year with data and stores:
  ACT  = 25th and 75th percentile of the composite score
  SAT  = 25th + 25th and 75th + 75th percentile of Reading/Writing and Math
If a school or value can't be found, the old value is kept and a note is
printed to the workflow log (and shown as a GitHub Actions annotation).
Counselor notes, deadlines, and policies stay in popular-colleges.js.
"""
import json, os, re, sys, time, urllib.error, urllib.parse, urllib.request
from datetime import date, datetime, timezone

HERE = os.path.dirname(os.path.abspath(__file__))
LIST_FILE = os.path.join(HERE, "tracked-colleges.json")
POPULAR_FILE = os.path.join(HERE, "..", "assets", "data", "popular-colleges.js")
OUT_FILE = os.path.join(HERE, "..", "assets", "data", "score-ranges.js")
API_URL = os.environ.get("SCORECARD_API_URL", "https://api.data.gov/ed/collegescorecard/v1/schools.json")
YEARS_BACK = 6  # how many past years to look through for the newest data

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

def api(params):
    """GET the API. Returns parsed JSON, or None on HTTP 400 (e.g. unknown field)."""
    q = urllib.parse.urlencode(dict(params, api_key=key))
    for attempt in range(4):
        try:
            with urllib.request.urlopen(API_URL + "?" + q, timeout=60) as r:
                d = json.load(r)
                last_response[:] = [d]
                return d
        except urllib.error.HTTPError as e:
            if e.code == 400:
                return None
            if e.code in (429, 500, 502, 503, 504) and attempt < 3:
                time.sleep(2 * (attempt + 1) ** 2)
                continue
            raise RuntimeError("HTTP %d from the Scorecard API" % e.code)
        except (urllib.error.URLError, TimeoutError):
            if attempt < 3:
                time.sleep(2 * (attempt + 1) ** 2)
                continue
            raise RuntimeError("could not reach the Scorecard API")

# ---------- the list of schools ----------
tracked = json.load(open(LIST_FILE, encoding="utf-8"))["colleges"]
have = {norm(c["name"]) for c in tracked}
try:
    popular = re.findall(r'^\s*"name":\s*"([^"]+)"', open(POPULAR_FILE, encoding="utf-8").read(), re.M)
except OSError:
    popular = []
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
    if c.get("unitid"):
        return int(c["unitid"])
    prev = colleges.get(c["name"], {}).get("id")
    if prev:
        return prev
    want = c.get("scorecardName") or c["name"]
    d = api({"school.name": want, "fields": "id,school.name,school.state", "per_page": 50})
    debug("name search (first school)", d)
    results = [r for r in records(d) if r.get("id") is not None]
    exact = [r for r in results if norm(str(r.get("school.name", ""))) == norm(want)]
    if len(exact) == 1:
        return exact[0]["id"]
    if len(exact) > 1:
        note("%s: %d Scorecard schools are named '%s'; set \"unitid\" in tracked-colleges.json." % (c["name"], len(exact), want))
    elif results:
        near = ", ".join("%s (%s)" % (r.get("school.name"), r.get("school.state")) for r in results[:4])
        note("%s: no exact Scorecard match for '%s'. Closest: %s. Set \"scorecardName\" or \"unitid\" in tracked-colleges.json." % (c["name"], want, near))
    else:
        note("%s: not found in College Scorecard." % c["name"])
    return None

bad_years = set()
def year_values(school_id, year, fields):
    """Values for one year, or None if the year isn't available/has no data."""
    if year in bad_years:
        return None
    names = ["%d.%s" % (year, f) for f in fields]
    d = api({"id": school_id, "fields": ",".join(names)})
    if d is None:
        bad_years.add(year)
        return None
    debug("score query (first school)", d)
    merged = {}
    for rec in records(d):
        for k, v in rec.items():
            merged.setdefault(k, v)
    vals = [number(merged.get(n)) for n in names]
    return vals if all(v is not None for v in vals) else None

def newest(school_id, fields):
    this = date.today().year
    for y in range(this, this - YEARS_BACK, -1):
        v = year_values(school_id, y, fields)
        if v:
            return y, v
    return None, None

updated = 0
for c in tracked:
    name = c["name"]
    try:
        sid = find_id(c)
        if not sid:
            continue
        entry = colleges.get(name, {})
        entry["id"] = sid
        changed = False

        y, v = newest(sid, ACT_FIELDS)
        if v:
            entry["act"] = {"low": int(round(v[0])), "high": int(round(v[1])), "year": y}
            changed = True
        else:
            note("%s: no ACT range in College Scorecard; keeping the old value." % name)

        y, v = newest(sid, SAT_FIELDS)
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
    time.sleep(0.15)

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
