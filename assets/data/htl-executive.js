/* =========================================================================
   HOW TO LEARN, MODULE 10: PLANNING AND ORGANIZATION — all wording for how-to-learn-executive.html.
   (Logic: assets/js/how-to-learn.js and assets/js/htl-executive.js. Research claims and sources come from
   assets/data/evidence.js; do not retype them here.)

   The tools save a student's task steps and weekly plan ONLY in their own browser under "moeller-ex-htl-planner".
   TO EDIT WORDING: change the text between the quotation marks; keep quotation marks, commas, braces.
   ========================================================================= */

const HTL_MODULE = {
  id: "executive",
  n: 10,
  title: "Planning and organization (executive skills)",
  evidence: ["executive"],
  prev: "sleep",
  next: null,

  hook: "You have a big project due Friday. It's Wednesday night, and you are staring at the screen, not sure where to even begin.",

  quick: {
    question: "Which of these sounds like you?",
    options: [
      { text: "A big task feels like one giant lump, so I put it off.", fix: "Try the task breakdown below. Cutting a big job into small steps is a skill, and it is a skill you can practice." },
      { text: "I forget what's due, or I find out the night before.", fix: "A weekly planner is a good place to start. Write down what's due each day, then add a plan. The planner below prints on one page." },
      { text: "I never know how long things will take.", fix: "Guess a number of minutes for each step, then notice how close you were. Noticing how close you were can help you plan next time." },
      { text: "I sit down to work and can't get started.", fix: "Pick the smallest step and run the 5-minute timer. You only have to start. You can stop when it ends, or keep going if it's working." }
    ]
  },

  idea: {
    text: "Planning is a skill, and skills get better when you practice them in real situations. That means using a planner for your actual assignments, breaking a real project into steps, and keeping a homework routine. Playing brain games does not take the place of this. A good plan has small steps, a rough time for each, and a place to write them down. When you're stuck, start with the smallest step. Starting is often the hardest part, and a small step makes it easier.",
    exampleLabel: "Everyday example",
    example: "A history essay is due in a week. Instead of writing \"essay\" on Monday, you write four steps: read the prompt, pick a topic, make an outline, write the first paragraph. Now Monday has a job that takes 10 minutes."
  },

  try: {
    title: "Try it: break a task down, then plan your week",
    task: {
      title: "1. Task breakdown",
      intro: "Type a big task and when it's due. Then tap Break it down. You can change anything.",
      taskLabel: "Big task",
      taskPlaceholder: "e.g. Science project on ecosystems",
      dueLabel: "Due date (optional)",
      go: "Break it down",
      needTask: "Type a task first.",
      made: "Made {n} steps. Change them any way you like.",
      scratch: "Start my own list",
      // {task} is the student's task, used inside these generated step names
      stepTemplates: [
        { t: "Gather what I need for {task}", m: 10 },
        { t: "Do the first small piece", m: 20 },
        { t: "Do the next piece", m: 20 },
        { t: "Check it against the directions", m: 10 },
        { t: "Put it somewhere I won't forget it", m: 5 }
      ],
      stepsTitle: "Your steps",
      stepLabel: "Step {n}",
      minLabel: "About how many minutes (5 to 120)",
      minShort: "Minutes",
      doneLabel: "Done",
      up: "Move up",
      down: "Move down",
      remove: "Remove",
      upL: "Move step {n} up",
      downL: "Move step {n} down",
      removeL: "Remove step {n}",
      add: "Add a step",
      added: "Step added.",
      removed: "Step removed.",
      moved: "Step moved to position {n}.",
      tooMany: "That is the most steps this tool can hold (10).",
      empty: "No steps yet. Tap Break it down, or add a step.",
      smallestBadge: "Smallest step",
      smallestLine: "Start with the smallest step: \"{t}\" (about {m} minutes).",
      noMinutes: "Add minutes to your steps and this tool will point to the smallest one.",
      allDone: "Every step is checked off. Nice work.",
      progress: "{d} of {n} steps done.",
      daysLeft: "{d} days until it's due.",
      dayLeft: "1 day until it's due.",
      dueToday: "It's due today.",
      pastDue: "That date has passed.",
      starterTitle: "Not sure where to begin? Tap one to add it as a step:",
      starters: [
        "Gather what I need",
        "Do the first small piece",
        "Check it against the directions",
        "Ask someone one question about it",
        "Make a short outline"
      ],
      timerTitle: "Just start: 5 minutes",
      timerHelp: "Pick one step, start the timer, and work on only that. When it ends, you can stop or keep going.",
      timerLabel: "Time left",
      timerStart: "Start 5-minute timer",
      timerStop: "Stop timer",
      timerReset: "Reset",
      timerStarted: "Timer started. Five minutes.",
      timerStopped: "Timer stopped with {t} left.",
      timerDone: "Time's up. You started. Stop here, or keep going if it's working."
    },
    week: {
      title: "2. Weekly planner",
      intro: "Fill in what's due each day and a short plan. Then print one page for your wall or folder. You can also print a blank copy and fill it in by hand.",
      dayNames: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      dueLabel: "What's due",
      planLabel: "My plan",
      duePlaceholder: "e.g. Math worksheet",
      planPlaceholder: "e.g. 20 min after dinner",
      topTitle: "My top 3 for the week",
      topLabel: "Top priority {n}",
      topPlaceholder: "The most important thing",
      print: "Print my week",
      printBlank: "Print a blank copy",
      printTitle: "My week",
      printTop: "Top 3 this week",
      printNote: "Week of: ____________________"
    },
    shared: {
      saved: "Saved on this device.",
      blocked: "This browser is blocking saving, so your work will be lost when you close this page.",
      clear: "Clear my data",
      clearAsk: "Clear your task, steps and weekly plan from this device?",
      clearYes: "Yes, clear them",
      clearNo: "Keep them",
      cleared: "Your data was cleared.",
      privacy: "Your task, steps and plan are saved only in this browser on this device. Anyone who uses this browser can see them. Nothing is sent anywhere. Please don't type private information like passwords, phone numbers or home addresses. School tasks and plans are fine. Use Clear my data when you are done on a shared computer."
    }
  },

  week: "Tonight, pick one assignment that is due soon. Write three steps for it, then do the smallest one for five minutes.",

  supports: [
    "Tap a starter chip if you don't know what the first step should be.",
    "Start with the smallest step, even if it feels too small to count.",
    "Use the timer. Five minutes is enough to get going.",
    "Add a rough number of minutes to each step. The guess does not have to be right.",
    "Print the weekly planner and put it where you will see it every day."
  ],

  research: {
    intro: "Here is what the research says, and what it does not say.",
    extra: "This page is general learning advice. It is not medical advice."
  },

  reflection: [
    "Which big task could you break into steps first?",
    "What is one small step that would make starting easier?"
  ]
};
