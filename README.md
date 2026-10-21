# Moeller Counseling Hub

One site, two teams. School Counseling and College Counseling each have a hub,
and both hubs share the same four class pages.

## How the pages fit together

```
index.html                  Moeller Counseling (main page)
├── school-counseling.html  School Counseling hub
│   ├── study-tips.html
│   ├── parent-education.html
│   ├── academic-support.html   Academic Support (study groups, Chem Block schedule with quarter filter and next-session highlight, tutors; wording and schedule in assets/data/academic-support.js)
│   ├── gpa-calculator.html     GPA Calculator (yearly and cumulative, unweighted and weighted)
│   ├── honor-roll.html         Honor Roll Calculator (quarterly, unweighted)
│   ├── self-discovery.html     Self-Discovery (private, self-paced exercises; saves on the student's device)
│   ├── freshman-foundations-q1.html  Freshman Foundations, Quarter 1 (study skills, 720 Days reflection, quiz)
│   ├── freshman-foundations-q2.html  Freshman Foundations, Quarter 2 (learning, degrees, career game, bingo, glossary)
│   ├── freshman-foundations-q3.html  Freshman Foundations, Quarter 3 (course registration and planning)
│   ├── course-planner.html     Course Planner (four-year grid with a Status column, hero requirement pills, pathway tiles with Add to my plan, course connection panel, programs accordion; wording assets/data/course-planner.js, logic assets/js/course-planner.js, look assets/css/course-planner.css; reads pathways from assets/data/course-maps.js)
│   ├── course-maps.html        Course timelines and connections (course web and timeline cards; saves nothing; the pathway explorer moved to the Course Planner)
│   ├── flashcard-studio.html   Flashcard Studio (notes or PDF → cards → study with timer, coins, streak → print; wording in assets/data/flashcard-studio.js, logic assets/js/flashcard-studio.js, look assets/css/flashcard-studio.css; cards are made by a proxy, see scripts/README-flashcard-proxy.md)
│   ├── how-to-learn.html       How to Learn hub (progress, "which sentence sounds like you?", module cards, mind map; drawn by assets/js/htl-hub.js and assets/css/htl-hub.css; module pages record which modules were opened under the browser key moeller-ex-htl-visited); one page per module, plus how-to-learn-sources.html
├── college-counseling.html College Counseling hub
│   ├── seniors.html  ← "Application Resources" box opens this
│   ├── popular-colleges.html   Moeller Popular Colleges (test ranges, deadlines)
│   ├── app-tracker.html        College Application Tracker
│   ├── financial-aid.html      Financial Aid (FAFSA, CSS Profile, scholarships, award letters)
│   ├── know-yourself.html      Know Yourself (four self-discovery exercises that feed essays and college lists)
│   ├── ai.html                 Using AI in Your College Process (do's and don'ts, copyable prompts)
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
| The shared Essays page (prompts, brainstorm tool, writing guide, tips, supplemental guides) | `assets/data/essays.js` (the school list is `assets/data/essay-guides.js`) |
| The seven interactive exercises (wording, lists, and credits) | `assets/data/exercises.js` (instructions at the top; logic `assets/js/exercises.js`, look `assets/css/exercises.css`). Know Yourself shows exercises 1-4, the Essays page shows 5, the Seniors page shows 6 and 7. Each saves in the student's browser under its own `moeller-ex-...` key, so don't change the keys. |
| Which exercises are on the Know Yourself page | `assets/data/know-yourself.js` |
| The AI page (do's and don'ts, rules, every copyable prompt) | `assets/data/ai.js` (instructions at the top; logic `assets/js/ai.js`, look `assets/css/ai.css`) |
| Self-Discovery page (every exercise, prompt, and word) | `assets/data/self-discovery.js` (instructions at the top; the logic is `assets/js/self-discovery.js`, the look is `assets/css/self-discovery.css`) |
| How to Learn hub and module wording | `assets/data/how-to-learn.js` (hub) and `assets/data/htl-<module>.js` (one per module); research claims, evidence labels and source links live ONLY in `assets/data/evidence.js`; logic is `assets/js/how-to-learn.js` (+ `assets/js/htl-<module>.js` for a module's tools); look is `assets/css/how-to-learn.css` |
| Course timelines and connections, and the pathway tiles in the Course Planner (courses, pathways, departments) | `assets/data/course-maps.js` (instructions at the top); page wording `assets/data/course-maps-text.js`; logic `assets/js/course-maps.js`; look `assets/css/course-maps.css` |
| Course Planner wording, hero pills, status wording, and the list that matches pathway course names to the planner's course list (`pathwayMatch`) | `assets/data/course-planner.js` (instructions at the top); graduation rules and programs stay in `assets/data/course-rules.js`; courses in `assets/data/course-catalog.js` |
| Academic Support page (study groups, Chem Block schedule, tutors, study tools) | `assets/data/academic-support.js` (instructions at the top); logic `assets/js/academic-support.js`; look `assets/css/academic-support.css` |
| Flashcard Studio wording, timer options, coin amounts, shop prices, prompts, proxy URL (`api.url`), PDF.js links | `assets/data/flashcard-studio.js` (instructions at the top); logic `assets/js/flashcard-studio.js`; look `assets/css/flashcard-studio.css`; the API-key proxy is `scripts/flashcard-proxy-worker.js` (deploy steps in `scripts/README-flashcard-proxy.md`) |
| Freshmen Quarter 3 page (every word) | `assets/data/freshman-q3.js` (the logic is `assets/js/freshman-q3.js`; requirements and levels are read from `assets/data/course-rules.js`) |
| Freshmen Quarter 2 page (every word, glossary, career game) | `assets/data/freshman-q2.js` (the logic is `assets/js/freshman-q2.js`; the look is `assets/css/freshman-q1.css` plus `freshman-q2.css`) |
| Freshmen Quarter 1 page (every word) | `assets/data/freshman-q1.js` (the logic is `assets/js/freshman-q1.js`, the look is `assets/css/freshman-q1.css`) |
| Opportunities Board cards (college fairs, programs, career exploration, jobs) | `assets/data/opportunities.js` (instructions at the top of the file) |
| Brand colors and fonts                     | top of `assets/css/styles.css`         |
| Heading font files (Produkt / Bitter)      | `assets/fonts/` — see the note at the top of styles.css |
| Images (Common App screenshots, house crests) | `assets/img/`                       |
| Courses in the GPA / Honor Roll Calculators (update each year) | `assets/data/courses.js` |
| Early-deadline notices on the Seniors page | `earlyDeadline` in `assets/data/popular-colleges.js` (dates listed in `senior.js` → `deadlineNotices`) |
| Popular Colleges data (update each cycle) | `assets/data/popular-colleges.js`      |
| Financial Aid page (dates and rules change every year) | `assets/data/topics.js` → `YEARS["financial-aid"]` |
| Which popular colleges use the CSS Profile | `cssProfile` in `assets/data/popular-colleges.js` |
| Supplemental Essay Guides list (Seniors & Juniors pages) | `assets/data/essay-guides.js` |
| Colleges tracked for ACT/SAT ranges    | `scripts/tracked-colleges.json`        |
| Turn on visit counting for the calculators | `assets/js/calc-tracking.js`        |

You shouldn't need to touch `engine.js` or `site.js`.

In the class files, the top part is the college view and the `school:` block at
the bottom is the School & Academics view. Anything marked "Placeholder" is
waiting for real content.

To give sophomores or freshmen a left-side index like juniors and seniors,
add `layout: "indexed",` near the top of their file. Topic pages can do the
same (see Financial Aid); the HTML file also needs the `indexed-wrap` block
from `financial-aid.html`.

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
`moeller-app-tracker-v1`); nothing is sent anywhere. "Download Excel" builds a three-tab workbook of the student's
entries, loading SheetJS from cdnjs.cloudflare.com only when clicked. The
"Want your own Excel spreadsheet?" box links to an example tracker on OneDrive; that link is in
`app-tracker.html`.

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
- Each school takes one API request. After the first lookup, the update saves each school's
  `unitid` into `scripts/tracked-colleges.json` (the workflow commits it), so later runs skip
  the name search. If the API rate-limits (HTTP 429), the run waits and retries.
- If a school or value is missing, the old value is kept and the workflow log
  (and run summary) says which one.
- **Keeping your own ranges for a school:** in `assets/data/popular-colleges.js`,
  add `"useMyRanges": true,` to that school (right under its `"name"` line) and
  keep the `act` / `sat` ranges you want. The yearly update skips that school and
  the chart always shows your ranges, including the striped non-resident bar when
  `"nonResident": true`. Currently set for Auburn, Alabama, South Carolina, and
  Tennessee. To go back to Scorecard ranges, delete the line.

## Financial Aid (update every fall)

`financial-aid.html` gets its content from `YEARS["financial-aid"]` in
`assets/data/topics.js`. The grade pages link to its sections with links like
`financial-aid.html#fafsa`, so keep the section keys (`basics`, `cost`, `byGrade`,
`fafsa`, `css`, `grants`, `loans`, `scholarships`, `compare`, `questions`,
`aidTimeline`, `dates`, `recap`) the same.

The charts and interactive pictures on this page (the aid-source and cost circles,
the need chart, the FAFSA checklist, grant cards, the loans graphic, the scholarship
steps, and the aid timeline) are listed under `visuals:` in each section of
`YEARS["financial-aid"]`. Change their words and numbers there. The drawing code is
in `assets/js/fa-visuals.js` and `assets/css/fa-visuals.css`, which only this page
loads.

Each fall, once the new FAFSA opens:

- Update the facts listed in the comment above `YEARS["financial-aid"]`: form
  year, tax year, open dates, the federal deadline, CSS Profile fees, loan limits,
  and Ohio aid rules. Check them on studentaid.gov, cssprofile.collegeboard.org, and
  highered.ohio.gov.
- Replace the Key Dates timeline (`timeline` in the `dates` section; each date needs
  an `iso` date so past items dim automatically) and the Financial Aid Night recap.
- Check `cssProfile` for each school in `assets/data/popular-colleges.js` against
  College Board's participating list. College Board blocks automated access, so
  this check is done by hand.
