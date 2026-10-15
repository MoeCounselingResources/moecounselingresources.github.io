/* =========================================================================
   KNOW YOURSELF — know-yourself.html (College Counseling). Four short exercises that feed essays and
   college lists. The exercises' wording lives in assets/data/exercises.js; this file only says which
   exercises appear, in what order, and what the page says at the top.
   Anchors other pages link to: #roles, #loveknow, #values, #fires.
   ========================================================================= */

YEARS["know-yourself"] = {
  hub: "college",
  label: "Know Yourself",
  blurb: "Four short exercises to help you see who you are, what you care about, and what gets you fired up. What you find here feeds your essays and your college list.",
  pointer: {text: "Looking for exercises on habits, goals, and asking for help?", linkText: "Try Self-Discovery.", url: "self-discovery.html"},
  layout: "indexed",
  order: ["roles","loveknow","values","fires"],
  sections: {
    roles: {navLabel: "What role do you play?", title: "What role do you play?", note: "Exercise 1", type: "exercise", exercise: "roles"},
    loveknow: {navLabel: "I love / I know", title: "I love / I know", note: "Exercise 2", type: "exercise", exercise: "loveknow"},
    values: {navLabel: "Your top 3 values", title: "Your top 3 values", note: "Exercise 3", type: "exercise", exercise: "values"},
    fires: {navLabel: "What fires you up?", title: "What fires you up?", note: "Exercise 4", type: "exercise", exercise: "fires"}
  }
};
