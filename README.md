# Moeller Counseling Hub

One site, two teams. School Counseling and College Counseling each have a hub,
and both hubs share the same four class pages.

## How the pages fit together

```
index.html                  Moeller Counseling (main page)
├── school-counseling.html  School Counseling hub
│   ├── study-tips.html
│   ├── parent-education.html
│   ├── academic-support.html
│   ├── gpa-calculator.html     GPA Calculator (yearly, cumulative, Latin Honors)
│   └── honor-roll.html         Honor Roll Calculator (quarterly, unweighted)
├── college-counseling.html College Counseling hub
│   ├── seniors.html  ← "Application Resources" box opens this
│   ├── popular-colleges.html   Moeller Popular Colleges (test ranges, deadlines)
│   ├── app-tracker.html        College Application Tracker
│   ├── college-exploration.html
│   ├── military.html
│   ├── ccp-ap.html
│   ├── act-sat.html
│   └── career-exploration.html
└── Class pages (shared by both hubs)
    seniors.html · juniors.html · sophomores.html · freshmen.html
```

Each class page has two views, switched with the buttons under the title:

- **College view**: Application Resources (seniors), College Knowledge (juniors),
  Future Focus (sophomores), Freshman Foundations (freshmen)
- **School & Academics view**: study skills, academic support, and parent resources for that year

Links from the School Counseling hub open a class page in its School view
(`juniors.html?view=school`). Links from everywhere else open the College view.

## Where to edit things

| To change...                               | Edit this file                         |
|--------------------------------------------|----------------------------------------|
| A class page (either view)                 | `assets/data/senior.js` (or junior, sophomore, freshman) |
| The boxes on a hub dashboard               | `assets/data/hubs.js`                  |
| A topic page (Military, Study Tips, etc.)  | `assets/data/topics.js`                |
| Counselors, Upcoming Events, pop-ups, Common App guide | `assets/js/shared-content.js` |
| Brand colors and fonts                     | top of `assets/css/styles.css`         |
| Heading font files (Produkt / Bitter)      | `assets/fonts/` — see the note at the top of styles.css |
| Images (Common App screenshots, house crests) | `assets/img/`                       |
| Courses in the GPA / Honor Roll Calculators (update each year) | `assets/data/courses.js` |
| Popular Colleges data (update each cycle) | `assets/data/popular-colleges.js`      |
| Colleges tracked for ACT/SAT ranges    | `scripts/tracked-colleges.json`        |
| Turn on visit counting for the calculators | `assets/js/calc-tracking.js`        |

You shouldn't need to touch `engine.js` or `site.js`.

In the class files, the top part is the college view and the `school:` block at
the bottom is the School & Academics view. Anything marked "Placeholder" is
waiting for real content.

To give sophomores or freshmen a left-side index like juniors and seniors,
add `layout: "indexed",` near the top of their file.

## Putting it on GitHub

1. Create a new repository on github.com (for example, `moeller-counseling`).
2. Click **uploading an existing file**, then drag in everything inside this
   folder (the HTML files, `README.md`, and the `assets` folder), keeping the
   folder structure.
3. Click **Commit changes**.

To edit later, open a file on GitHub, click the pencil icon, make your change,
and commit.

## Connecting Cloudflare Pages

1. In the Cloudflare dashboard, go to **Workers & Pages → Create → Pages → Connect to Git**.
2. Choose this repository.
3. Framework preset: **None**. Build command: leave blank. Build output directory: `/`.
4. Click **Save and Deploy**.

From then on, every commit to GitHub updates the live site automatically in about a minute.

## Previewing on your computer

Double-clicking an HTML file works for a quick look. For an exact preview,
open a terminal in this folder and run `python3 -m http.server`, then visit
http://localhost:8000.

## GPA and Honor Roll Calculators

`gpa-calculator.html` and `honor-roll.html` use the school's grading scale from
the Curriculum Guide. Students' grades are saved only in their own browser;
nothing is sent anywhere.

- **Each spring:** update `assets/data/courses.js` from the new Curriculum Guide
  (add new courses, remove retired ones, fix levels or credits). Leave old
  courses in for a few years so upperclassmen can still find them.
- **Counting visits (optional):** sign up at https://www.goatcounter.com, then put
  your code in `assets/js/calc-tracking.js`. The dashboard shows visits to each
  calculator plus events such as `gpa-entered-grade` and `honor-roll-entered-grade`
  (each counted at most once per visit).
- The scale math lives in `assets/js/gpa-calculator.js` and `assets/js/honor-roll.js`.
  You shouldn't need to edit those unless the grading scale itself changes.

## Popular Colleges and Application Tracker

`popular-colleges.html` and `app-tracker.html` share the data in
`assets/data/popular-colleges.js`. Change `POPULAR_COLLEGES_CYCLE` and edit
the schools there each cycle.

The tracker saves only in each student's own browser (localStorage key
`moeller-app-tracker-v1`); nothing is sent anywhere. "Open Excel version" and the spreadsheet box open the
original tracker on OneDrive. The original spreadsheet
is linked from `app-tracker.html` (a OneDrive link; students use File → Save a copy).

### Yearly ACT/SAT ranges (College Scorecard)

Every August 1 (or any time from the **Actions** tab → *Update ACT/SAT score
ranges* → *Run workflow*), a GitHub Action pulls each school's ACT and SAT
25th/75th percentiles from the College Scorecard API and rewrites
`assets/data/score-ranges.js`. The chart uses those ranges, and the page shows
"Score data: College Scorecard, [year]". Your counselor notes, deadlines, and
policies stay in `popular-colleges.js`.

- Needs the repository secret `SCORECARD_API_KEY`.
- To track another school, add a line to `scripts/tracked-colleges.json`. If the
  school's Scorecard name differs, add `scorecardName`; if a name can't be
  matched, add its `unitid`.
- If a school or value is missing, the old value is kept and the workflow log
  (and run summary) says which one.
