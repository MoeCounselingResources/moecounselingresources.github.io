/* =========================================================================
   HOW TO LEARN, MODULE 1: HOW YOUR BRAIN LEARNS — all wording for how-to-learn-brain.html.
   (Logic: assets/js/how-to-learn.js and assets/js/htl-brain.js. Research claims and sources come from
   assets/data/evidence.js; do not retype them here.)

   The practice-step planner saves NOTHING. What a student types stays on the page until they leave it.
   TO EDIT WORDING: change the text between the quotation marks; keep quotation marks, commas, braces.
   ========================================================================= */

const HTL_MODULE = {
  id: "brain",
  n: 1,
  title: "How your brain learns",
  evidence: ["brain"],
  prev: null,
  next: "myths",

  hook: "Think of something you can do now that you could not do a few years ago. Maybe it is typing without looking, a tricky skateboard move, or a kind of math problem. Nobody was born able to do it.",

  quick: {
    question: "Which of these sounds like you?",
    options: [
      { text: "I'm just not a math person (or a writing person, or a sports person).", fix: "Where you are today is a starting point. Research supports the idea that the brain keeps changing with experience and practice. A good place to begin is one small practice step, like the one you can plan below." },
      { text: "I read a cool brain fact online, and I'm not sure it's true.", fix: "Good instinct. Many popular brain stories are simplified, so be a little careful with catchy brain facts. The big idea is the safe one: the brain keeps changing with experience and practice." },
      { text: "I want to get better at something, but I don't know where to start.", fix: "Start tiny. The activity below helps you pick one skill and one small first step." },
      { text: "I get discouraged when I don't improve right away.", fix: "That is a common feeling. A small, specific step you can check later gives you something real to look at besides the feeling. Try the planner below." }
    ]
  },

  idea: {
    text: "Research supports the idea that your brain keeps changing with experience and practice. So what you can do today is a starting point, not a fixed limit. You will also hear catchy stories about exactly what happens inside your head when you learn. Many of those stories are simplified, and this page leaves them out on purpose. The useful part is simple: pick a skill, and give it small, regular practice. Then check what changed.",
    exampleLabel: "Everyday example",
    example: "Someone who wants to write more clearly does not start with a whole essay. They pick one small thing, like writing one clear opening sentence each day, and look back at it on Friday."
  },

  try: {
    title: "Try it: pick one skill and its first small practice step",
    intro: "This takes about five minutes. Pick one skill you want to improve, then fill in three short steps. Keep each step small.",
    privacy: "Nothing you type here is saved or sent anywhere. If you close or refresh this page, it is gone. Use Print if you want to keep your plan.",
    skillTitle: "1. Pick a skill",
    starterTitle: "Not sure? Tap a starter:",
    starters: [
      "Writing clearly",
      "Reading and remembering more",
      "Solving math problems",
      "Learning vocabulary",
      "Playing an instrument",
      "Getting better at a sport"
    ],
    skillLabel: "The skill I want to improve",
    skillPlaceholder: "e.g. Writing clearly",
    stepsTitle: "2. Plan your first step",
    steps: [
      { id: "practice", label: "What I will practice", hint: "Make it small enough to start in two minutes.", placeholder: "e.g. Write one clear opening sentence" },
      { id: "when", label: "When I will do it", hint: "Pick a day and a time, not \"sometime.\"", placeholder: "e.g. Tuesday after dinner, 10 minutes" },
      { id: "check", label: "How I will check it", hint: "How will you know whether it went well?", placeholder: "e.g. Reread it on Friday and mark the clearest one" }
    ],
    show: "Show my plan",
    needSkill: "Pick or type a skill first.",
    planTitle: "Your plan",
    planSkill: "Skill",
    blank: "(still to decide)",
    planShown: "Your plan is shown below.",
    planTip: "Small and specific is a good place to start. You can change any step above and tap Show my plan again.",
    chosen: "Skill chosen. Now fill in the three steps.",
    printBtn: "Print my plan",
    printTitle: "My first practice step",
    printCheck: "Look back on:",
    clear: "Clear everything",
    cleared: "Everything was cleared."
  },

  week: "Do the first step from your plan once this week, for about ten minutes. Afterward, write down one thing you noticed.",

  supports: [
    "Tap a starter skill if you can't think of one.",
    "Make the first step small enough to start in two minutes.",
    "Give the step a specific day and time, not \"sometime.\"",
    "Print the plan and put it where you will see it.",
    "You can leave a step blank and come back to it."
  ],

  research: {
    intro: "Here is what the research says, and what it does not say.",
    extra: "We kept this module to the big idea on purpose. We are not claiming anything about specific parts of the brain or how they work, because popular versions of those stories are often simplified."
  },

  reflection: [
    "What is something you can do now that you could not do before, and what did it take?",
    "Which small step from your plan will you do first, and what will you do if you skip a day?"
  ]
};
