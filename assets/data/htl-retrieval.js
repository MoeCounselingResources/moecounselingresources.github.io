/* =========================================================================
   HOW TO LEARN, MODULE 3: RETRIEVAL PRACTICE — all wording for how-to-learn-retrieval.html.
   (Logic: assets/js/how-to-learn.js and assets/js/htl-retrieval.js. Research claims and sources come from
   assets/data/evidence.js; do not retype them here.)

   The self-quiz tool saves a student's cards ONLY in their own browser under "moeller-ex-htl-quiz".
   TO EDIT WORDING: change the text between the quotation marks; keep quotation marks, commas, braces.
   ========================================================================= */

const HTL_MODULE = {
  id: "retrieval",
  n: 3,
  title: "Study like it counts: retrieval practice",
  evidence: ["retrieval", "illusions"],
  prev: "myths",
  next: "spacing",

  hook: "It's the night before a quiz. You read your notes twice and everything looks familiar. Then the quiz starts, and some of the answers just won't come.",

  quick: {
    question: "Which of these sounds like you?",
    options: [
      { text: "I reread my notes until they feel familiar.", fix: "This is the one to try. Feeling familiar and being able to remember are not the same thing. The activity below shows you the difference." },
      { text: "I know the answer when I see it, but I can't come up with it on my own.", fix: "That gap is exactly what retrieval practice trains. Start with the brain dump below." },
      { text: "I wait until the last minute to study.", fix: "Spreading study out is the bigger fix, and that module is coming soon. For now, retrieval still helps, even in a short session." },
      { text: "My phone keeps distracting me.", fix: "The focus module is coming soon. For now, try one short round of the self-quiz below, five minutes with your phone out of reach." }
    ]
  },

  idea: {
    text: "Retrieval practice means pulling an answer out of your memory instead of looking at it. When you reread, the page does the work. When you close the page and try to remember, your brain does the work, and that effort helps the memory last. Quizzing yourself also shows you what you really know, which rereading hides.",
    exampleLabel: "Everyday example",
    example: "Before a vocabulary test, cover the definitions on your list and say each one out loud. Then check. The words you missed are the ones to practice next."
  },

  try: {
    title: "Try it: two ways to practice recalling",
    dump: {
      title: "1. The brain dump (5 minutes)",
      steps: [
        "Pick one class. Close your notes and your book.",
        "Start the timer and write everything you remember about the last lesson. No peeking.",
        "Open your notes and check your list. Use a different color pen for what you missed.",
        "Circle the missed parts. Those are your starting point for the next round."
      ],
      boxLabel: "Your brain dump (this box is not saved)",
      boxPlaceholder: "Write what you remember. Short phrases are fine.",
      timerStart: "Start 5-minute timer",
      timerStop: "Stop timer",
      timerReset: "Reset",
      timerDone: "Time's up. Open your notes and check.",
      timerStarted: "Timer started.",
      timerStopped: "Timer stopped with {t} left.",
      timerLabel: "Time left",
      clearBox: "Clear this box"
    },
    quiz: {
      title: "2. Build a self-quiz",
      intro: "Make a few question-and-answer cards from your notes, then quiz yourself. Cards you miss come back.",
      starterTitle: "Not sure what to ask? Tap a starter question:",
      starters: [
        "What are the 3 main ideas from today's class?",
        "Explain the key term in your own words.",
        "Give one example of the idea from class.",
        "What is one thing that could be on the test?"
      ],
      qLabel: "Question or prompt",
      aLabel: "Answer",
      qPlaceholder: "e.g. What does a mitochondrion do?",
      aPlaceholder: "e.g. It makes most of the cell's energy.",
      add: "Add card",
      needBoth: "Add a question and an answer first.",
      added: "Card added.",
      removed: "Card removed.",
      tooMany: "That is the most cards this tool can hold (30). Remove one to add another.",
      yourCards: "Your cards",
      none: "No cards yet. Add one above. Three is plenty to start.",
      remove: "Remove",
      start: "Quiz me",
      needCards: "Add at least one card to start.",
      question: "Question",
      of: "of",
      think: "Say or write your answer first. Then tap Show the answer.",
      show: "Show the answer",
      gotIt: "I got it",
      notYet: "Not yet",
      doneTitle: "Round finished",
      doneText: "You got {n} on the first try out of {total}. The ones you missed came back until you got them.",
      again: "Quiz again",
      back: "Edit my cards",
      saved: "Saved on this device.",
      cleared: "Your cards were cleared.",
      blocked: "This browser is blocking saving, so your cards will be lost when you close this page.",
      clear: "Clear my data",
      clearAsk: "Clear all your cards from this device?",
      clearYes: "Yes, clear them",
      clearNo: "Keep them",
      privacy: "Your cards are saved only in this browser on this device. Anyone who uses this browser can see them. Nothing is sent anywhere. Use Clear my data when you are done on a shared computer.",
      printBtn: "Print my cards",
      printTitle: "My self-quiz cards"
    }
  },

  week: "After one class this week, close your notebook and write down three things you remember before you do anything else. Then check them. That's the whole thing.",

  supports: [
    "Start with just three cards. A short quiz you finish beats a long one you skip.",
    "Use the starter questions if you're not sure what to ask.",
    "The built-in timer tells you when to stop, so you don't have to keep track.",
    "Missed cards come back on their own, so you don't have to decide what to review.",
    "Say your answer out loud or write it. Either one counts."
  ],

  research: {
    intro: "Here is what the research says, and what it does not say.",
    extra: "Because most studies measure memory for facts, we are not claiming this builds deep understanding by itself. A good plan uses both: recall the facts, then practice using them."
  },

  reflection: [
    "Which class could you try this in first, and when?",
    "What did you notice when you could not remember something?"
  ]
};
