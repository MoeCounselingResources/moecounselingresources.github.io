/* =========================================================================
   HOW TO LEARN, MODULE 7: HABITS THAT STICK: IF-THEN PLANS — all wording for how-to-learn-habits.html.
   (Logic: assets/js/how-to-learn.js and assets/js/htl-habits.js. Research claims and sources come from
   assets/data/evidence.js; do not retype them here.)

   The if-then plan builder saves NOTHING. What a student types stays on the page and disappears on reload.
   TO EDIT WORDING: change the text between the quotation marks; keep quotation marks, commas, braces.
   ========================================================================= */

const HTL_MODULE = {
  id: "habits",
  n: 7,
  title: "Habits that stick: if-then plans",
  evidence: ["habits"],
  prev: "mindset",
  next: "focus",

  hook: "You promise yourself you'll start studying \"later.\" Later comes, and so does everything else. The plan was good. It just had no place to happen.",

  quick: {
    question: "Which of these sounds like you?",
    options: [
      { text: "I mean to study, but I never decide when.", fix: "That is where an if-then plan helps. It ties the action to a moment that already happens in your day. The builder below walks you through it." },
      { text: "I start strong for a few days and then it fades.", fix: "That happens to a lot of people. Doing something in the same setting again and again makes it more automatic, and how long that takes varies a lot. A small action is easier to repeat." },
      { text: "My plans are too big, like \"study for two hours.\"", fix: "Try making the action smaller. The builder below has a hint that helps you shrink it." },
      { text: "I miss a day and then feel like I've blown it.", fix: "One missed day does not undo the rest. Just restart at the next chance. Missing some days is normal." }
    ]
  },

  idea: {
    text: "A habit is something you do without having to decide each time. Research finds that repeating an action in the same setting makes it more automatic over time. How long that takes varies a lot from person to person and from habit to habit. An if-then plan links a moment to a small action: \"When I sit down at my desk, I will open my planner.\" These plans can help, though the effect is smaller than some early claims, and they work mostly when you already want to do the thing. You will miss some days. That is normal. Just restart.",
    exampleLabel: "Everyday example",
    example: "\"When the bell rings for study hall, I will take out my planner and pick my first task.\" The bell is the cue, and the action is small enough to do even on a tired day."
  },

  try: {
    title: "Try it: build an if-then plan",
    intro: "A plan has two parts: a moment in your day, and one small action. Pick from the chips or write your own. You can build up to three plans.",
    privacy: "Nothing you type here is saved or sent anywhere. It disappears when you reload or leave this page.",
    honest: "Plans work best when you already want to do the thing. Some days you'll miss. That's normal. Just restart the next time the moment comes.",
    whenTitle: "When (the moment)",
    whenChips: [
      "I get home and eat a snack",
      "the bell rings for study hall",
      "I sit down at my desk",
      "dinner is over"
    ],
    whenLabel: "When ...",
    whenPlaceholder: "e.g. I get on the bus",
    actionTitle: "I will (one small action)",
    actionChips: [
      "write 3 things I remember from today's class",
      "put my phone in another room",
      "open my planner",
      "do 5 minutes of the hardest subject"
    ],
    actionLabel: "I will ...",
    actionPlaceholder: "e.g. take out my math notebook",
    smallHint: "Make it smaller: that is a big step. Try the first two minutes of it, like \"open my math notebook.\"",
    add: "Add this plan",
    needBoth: "Fill in both a moment and an action first.",
    added: "Plan added.",
    removed: "Plan removed.",
    tooMany: "That is the most plans this tool holds (3). Remove one to add another.",
    yourPlans: "Your plans",
    none: "No plans yet. Start with one.",
    remove: "Remove",
    planLine: "When {w}, I will {a}.",
    printBtn: "Print my plans (1 page)",
    needPlan: "Add at least one plan to print.",
    clear: "Start over",
    cleared: "Cleared.",
    printTitle: "My if-then plans",
    printFoot: "Not saved anywhere. This page printed only because you pressed Print."
  },

  week: "Pick one plan and try it the next time that moment comes. If you miss it, that is fine. Do it the next time the moment comes around.",

  supports: [
    "Use the chips if you are not sure what to write.",
    "Keep the action small enough to finish in a couple of minutes.",
    "Tie the plan to something that already happens every day.",
    "Write the plan down and put it where you will see it, like on your planner.",
    "If you miss a day, restart the next time. You do not have to make it up."
  ],

  research: {
    intro: "Here is what the research says, and what it does not say.",
    extra: "We are not giving you a number of days, because there is no one number that fits everyone. A plan is a helpful nudge, not a guarantee."
  },

  reflection: [
    "Which moment in your day could hold one small study action?",
    "What will you do if you miss a day?"
  ]
};
