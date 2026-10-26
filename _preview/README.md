# Design refresh preview (branch `design-refresh` only)

This folder holds full-page screenshots of every page at 1440px (laptop) and 375px (phone), taken from the
`design-refresh` branch. **It must not be merged into `main`.** GitHub Pages only publishes `main`, so these
are for review on the branch.

## How to view

- **On GitHub:** open the branch `design-refresh`, go to the `_preview` folder, and click `1440` or `375`.
  Click any `.jpg` to see it. (`index.html` can't be viewed as a page on github.com; open it locally as below.)
- **On your computer:** `git fetch && git checkout design-refresh`, then open `_preview/index.html` in a browser.
  It lists every page with both screenshots side by side.
- `ICONS.md`: which icon each card got, grouped by page.
- `checks.json`: the console-error and sideways-scroll check for every page at 1440, 1024 and 375px.

## Leaving it out of `main`

`_preview/` is only here for review. When `design-refresh` is approved, merge it with the folder removed
(`git rm -r _preview` in the merge, or merge a copy of the branch without it).
