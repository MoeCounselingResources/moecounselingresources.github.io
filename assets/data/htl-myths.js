/* =========================================================================
   HOW TO LEARN, MODULE 2: LEARNING MYTHS (STYLES AND ILLUSIONS OF KNOWING) — all wording for how-to-learn-myths.html.
   (Logic: assets/js/how-to-learn.js and assets/js/htl-myths.js. Research claims and sources come from
   assets/data/evidence.js; do not retype them here.)

   The "Predict, then test" tool saves NOTHING. What a student types stays on the page until they leave it.
   TO EDIT WORDING: change the text between the quotation marks; keep quotation marks, commas, braces.
   ========================================================================= */

const HTL_MODULE = {
  id: "myths",
  n: 2,
  title: "Learning myths: styles and illusions of knowing",
  evidence: ["styles", "illusions"],
  prev: "brain",
  next: "retrieval",

  hook: "You read a page and think, \"Yep, I know this.\" Then someone asks you to explain it with the page closed, and it is harder than you expected.",

  quick: {
    question: "Which of these sounds like you?",
    options: [
      { text: "I'm a visual learner, so I only study with videos and diagrams.", fix: "Noticing what you enjoy is fine, and preferences are real. But studying in your preferred style has not been shown to help you learn more. Keep what you enjoy, and also try mixing in self-testing." },
      { text: "I reread my notes until they feel easy, so I must know them.", fix: "Easy to read is not the same as learned. Those feelings are often wrong, and trying to recall the material is a better check. The activity below lets you see this for yourself." },
      { text: "I'm sure I know this topic. I don't need to test myself.", fix: "Feeling sure is a feeling. Testing yourself is the best way to find out what you really know. It only takes a few minutes, so try the activity below." },
      { text: "I took an online quiz that told me my learning style.", fix: "Those quizzes can be fun to try. Just know that studying to match a style has not been shown to improve learning. A better plan is to mix methods and quiz yourself." }
    ]
  },

  idea: {
    text: "Two ideas can trip you up. First, learning styles. Most people can tell you how they like to learn, and that is real. But careful tests have not shown that studying to match a \"style\" helps you learn more. Many versions of the idea were never properly tested, which is different from proven wrong. Second, the feeling of knowing. When something is easy to read, it feels learned. Studies show that feeling is often wrong. Trying to recall it, with the page closed, is a better check.",
    exampleLabel: "Everyday example",
    example: "Reread a page three times and it feels smooth. Now close it and write what you remember. The gap between the two is what you needed to know, and rereading was hiding it."
  },

  try: {
    title: "Try it: predict, then test",
    intro: "First, guess how well you know something. Then test yourself and compare. This takes about five minutes.",
    privacy: "Nothing you type here is saved or sent anywhere. If you close or refresh this page, it is gone.",
    modeLegend: "1. Pick your questions",
    modeBuiltin: "Use 5 quick questions from this page",
    modeOwn: "Write 3 questions of my own",
    builtinTopic: "5 quick questions",
    topicLabel: "Topic (a class, a unit, anything)",
    topicPlaceholder: "e.g. Spanish vocabulary, unit 3",
    topicDefault: "My topic",
    ownIntro: "Write three questions about your topic, each with its answer, so you can check yourself. Short is fine.",
    qLabel: "Question {n}",
    aLabel: "Answer {n}",
    qPlaceholder: "e.g. What does \"biblioteca\" mean?",
    aPlaceholder: "e.g. Library",
    rateLegend: "2. Predict: how well do you think you know it?",
    rateNote: "1 means hardly at all. 5 means very well.",
    rateLabel: "{n} out of 5",
    start: "Start the test",
    needRate: "Pick a number from 1 to 5 first.",
    needTopic: "Type a topic first.",
    needOwn: "Fill in all three questions and answers first.",
    qOf: "Question {n} of {total}",
    think: "Say or write your answer first. Then tap Show the answer.",
    owning: "Mark what you really remembered. This is just for you.",
    show: "Show the answer",
    gotIt: "I got it",
    notYet: "Not quite",
    doneTitle: "Your result",
    youRated: "You rated how well you know \"{topic}\" a {r} out of 5.",
    youGot: "You got {n} out of {total} right.",
    got: "Got it",
    missed: "Not yet",
    over: "You felt pretty sure, and some answers did not come. That happens to a lot of people. It is the kind of surprise that testing is for, because now you know what to practice.",
    under: "You knew more than you guessed. Testing can show you that too, and it is useful to know what you can already do.",
    match: "Your guess and your result were close this time. Even so, a feeling is not a measurement. Testing is how you check.",
    takeaway: "Feeling sure and being right are different things. Testing shows which you have.",
    again: "Test again",
    startOver: "Start over",
    items: [
      { q: "What is the capital of France?", a: "Paris" },
      { q: "Which planet is closest to the Sun?", a: "Mercury" },
      { q: "How many sides does a hexagon have?", a: "Six" },
      { q: "What is the largest ocean on Earth?", a: "The Pacific Ocean" },
      { q: "Who wrote the play Romeo and Juliet?", a: "William Shakespeare" }
    ]
  },

  week: "Before your next quiz in any class, pick one topic and write down how well you think you know it, 1 to 5. Then close your notes and test yourself. Compare the two.",

  supports: [
    "The 5 built-in questions are there if you don't know where to start.",
    "Keep your own questions short, three is enough.",
    "Say your answers out loud if writing feels like too much.",
    "There is no wrong guess. The point is to compare, not to score well.",
    "Start with the topic you feel most sure about. It is a good one to check."
  ],

  research: {
    intro: "Here is what the research says, and what it does not say.",
    extra: "Your own preferences are worth noticing, and they are not a rule for how you must study. Also, how sure you feel does not tell you how well you know something, so a quick self-test is a better check."
  },

  reflection: [
    "Think of a time you felt sure you knew something and then did not. What did you notice?",
    "What is one way you could test yourself this week instead of rereading?"
  ]
};
