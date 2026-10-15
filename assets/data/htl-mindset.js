/* =========================================================================
   HOW TO LEARN, MODULE 6: CAN YOU IMPROVE? MINDSET, HONESTLY — all wording for how-to-learn-mindset.html.
   (Logic: assets/js/how-to-learn.js and assets/js/htl-mindset.js. Research claims and sources come from
   assets/data/evidence.js; do not retype them here.)

   The "not yet" card tool saves NOTHING. What a student types stays on the page and disappears on reload.
   TO EDIT WORDING: change the text between the quotation marks; keep quotation marks, commas, braces.
   ========================================================================= */

const HTL_MODULE = {
  id: "mindset",
  n: 6,
  title: "Can you improve? Mindset, honestly",
  evidence: ["mindset"],
  prev: "interleaving",
  next: "habits",

  hook: "You get a quiz back and the grade is lower than you hoped. A voice in your head says, \"Forget it, this class just isn't for me.\" What do you do with that voice?",

  quick: {
    question: "Which of these sounds like you?",
    options: [
      { text: "When a topic gets hard, I want to skip it.", fix: "That is a very normal reaction. A good place to start is to shrink the topic to one small piece and work on only that. The activity below helps you pick a first step." },
      { text: "A low grade makes me want to stop trying in that class.", fix: "One grade tells you how one task went. It does not settle what you can learn next. A concrete next step, like asking for an example, usually beats a big promise to try harder." },
      { text: "I work hard, but I'm not sure my way of studying is working.", fix: "That is worth noticing. The idea in this module is to pair believing you can improve with a specific strategy. The activity below walks you through picking one." },
      { text: "People tell me to \"just believe in yourself,\" and it doesn't help.", fix: "That makes sense. Belief on its own is not a plan. The research is about belief plus real strategies, so that is what the activity below asks you to build." }
    ]
  },

  idea: {
    text: "A growth mindset is the idea that skills can grow with good strategies, practice, and help from other people. Researchers have tested short programs that teach this idea. The results are mixed. One large study found a modest rise in grades for students who were struggling, in supportive schools. Across many studies, the average effect is small. So this is not a magic trick, and believing is not a promise of better grades. What seems to matter is pairing the belief with real strategies. Adding the word \"yet\" is a small reminder to go find the next strategy to try.",
    exampleLabel: "Everyday example",
    example: "\"I can't do word problems\" turns into \"I can't do word problems yet. Tonight I'll ask my teacher to show me one worked example.\" The second sentence gives you something to do."
  },

  try: {
    title: "Try it: add a strategy to your \"not yet\"",
    intro: "Pick one thing that feels hard right now. You will turn it into a \"not yet\" and choose one small thing to try. It takes about five minutes.",
    privacy: "Nothing you type here is saved or sent anywhere. It disappears when you reload or leave this page.",
    step1: "1. Something that feels hard",
    hardLabel: "I can't ____",
    hardPlaceholder: "e.g. solve two-step equations",
    hardHelp: "Finish the sentence with a skill or task. You do not need the \"I can't\" part.",
    step2: "2. One strategy to try",
    stratLegend: "Pick one, or write your own below",
    strategies: [
      "Quiz myself first, before I look at my notes",
      "Ask for an example and study how it works",
      "Break it into smaller parts and do the first part",
      "Work on it with a classmate",
      "Ask my teacher one specific question",
      "Spread my practice over a few days"
    ],
    ownLabel: "Or type your own strategy",
    ownPlaceholder: "e.g. watch one short video, then try a problem",
    step3: "3. When I'll try it",
    whenLabel: "When will you try it?",
    whenPlaceholder: "e.g. tomorrow during study hall",
    make: "Make my card",
    needHard: "Add the thing that feels hard first.",
    needStrat: "Pick a strategy or type your own.",
    needWhen: "Add when you'll try it.",
    made: "Your card is ready below.",
    cardTitle: "My \"not yet\" card",
    cantYet: "I can't {x} yet.",
    tryLine: "Strategy I'll try",
    whenLine: "When I'll try it",
    cardNote: "A plan is a start. If it doesn't help, try a different strategy or ask for help.",
    printBtn: "Print my card (1 page)",
    again: "Start over",
    cleared: "Cleared. You can build another card.",
    printTitle: "My \"not yet\" card",
    printFoot: "Not saved anywhere. This page printed only because you pressed Print."
  },

  week: "Pick one thing that feels hard this week and do the strategy you chose, once, for ten minutes. Afterward, ask yourself what helped and what didn't. If it didn't help, pick a different strategy.",

  supports: [
    "Choose from the strategy list if you are not sure where to start.",
    "Make the hard thing smaller. One part of a problem counts.",
    "Write down when you will try it, so you don't have to decide in the moment.",
    "Asking one specific question is easier than asking for help with everything.",
    "If a strategy doesn't help, swap it for another one. That is part of the process."
  ],

  research: {
    intro: "Here is what the research says, and what it does not say.",
    extra: "We are not saying that believing you can improve will raise your grades. The honest version is smaller: the belief may help a little in supportive settings, and it works best alongside concrete strategies and good support."
  },

  reflection: [
    "What is one thing that feels hard right now, and what is one small step you could take on it?",
    "Who or what could support you with that step?"
  ]
};
