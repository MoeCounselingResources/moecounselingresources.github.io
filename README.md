# Moeller Counseling Hub

One site, two teams. School Counseling and College Counseling each have a hub,
and both hubs share the same four class pages.

## How the pages fit together

```
index.html                  Moeller Counseling (main page)
├── school-counseling.html  School Counseling hub
│   ├── study-tips.html
│   ├── parent-education.html
│   └── academic-support.html
├── college-counseling.html College Counseling hub
│   ├── seniors.html  ← "Application Resources" box opens this
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
