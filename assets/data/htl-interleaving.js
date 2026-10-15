/* =========================================================================
   HOW TO LEARN, MODULE 5: INTERLEAVING AND PRODUCTIVE STRUGGLE — all wording for how-to-learn-interleaving.html.
   (Logic: assets/js/how-to-learn.js and assets/js/htl-interleaving.js. Research claims and sources come from
   assets/data/evidence.js; do not retype them here.)

   The practice mixer keeps everything in memory only. Nothing you type is saved.
   TO EDIT WORDING: change the text between the quotation marks; keep quotation marks, commas, braces.
   ========================================================================= */

const HTL_MODULE = {
  id: "interleaving",
  n: 5,
  title: "Making it hard in the right way: interleaving and productive struggle",
  evidence: ["interleaving"],
  prev: "spacing",
  next: "mindset",

  hook: "Your homework is ten problems that all use the same method. By problem four, you stop thinking and just copy the pattern. Then the test mixes everything together, and you can't tell which method to use.",

  quick: {
    question: "Which of these sounds like you?",
    options: [
      { text: "I do all the problems of one type, then move on to the next type.", fix: "That feels smooth, and it is a fine way to learn something new. Once you know each type, try the mixing activity below for practice." },
      { text: "I can do the homework, but on tests I can't tell which method to use.", fix: "Mixing problem types makes you choose the method each time, like a test that mixes problem types. Try the mixing activity below." },
      { text: "If something feels hard, I think I'm doing it wrong.", fix: "Some difficulty can help, when you get the answer or some teaching afterward. It is not true that harder is always better. If you are stuck for a long time, ask for help." },
      { text: "I give up when I don't know how to start.", fix: "A short try before you look at the answer can be useful, as long as you do check it afterward. Set a short time limit, then ask or look." }
    ]
  },

  idea: {
    text: "Interleaving means mixing different types of problems in one practice session, instead of doing one type at a time. Studies find it helps more for some subjects, like math, than for others, and it does not clearly help with reading texts. A little struggle can also help, like trying a problem before it is taught, as long as you get feedback or teaching after. It is best supported in high school science, technology, engineering, and math classes. Struggle is not always good, so stop and ask for help if you are stuck.",
    exampleLabel: "Everyday example",
    example: "In math, you could mix three kinds of problems in one set and check each answer right after you finish it."
  },

  try: {
    title: "Try it: mix your practice set",
    intro: "Type two to four problem types from one class. Choose how many practice problems of each. The tool shows two orders: blocked (one type at a time) and mixed.",
    typeLabel: "Problem type {i}",
    typePlaceholders: ["e.g. solving one-step equations", "e.g. graphing lines", "e.g. finding slope", "e.g. simplifying fractions"],
    countLabel: "How many (type {i})",
    addType: "Add another type",
    remove: "Remove",
    removeType: "Remove type {i}",
    minTypes: "Keep at least two types so there is something to mix.",
    maxTypes: "Four types is the most this tool uses.",
    added: "Type {n} added.",
    removed: "Type removed.",
    make: "Build my practice set",
    needTypes: "Type at least two problem types first.",
    dupTypes: "Two of your types have the same name. Make each one different so there is something to mix.",
    blockedTitle: "Blocked order",
    blockedNote: "All of one type, then all of the next.",
    mixedTitle: "Mixed order",
    mixedNote: "Types are shuffled so the same type does not come twice in a row when that is possible.",
    mixedNoteHard: "One type has too many problems to keep it from repeating, so a few repeats are unavoidable.",
    reshuffle: "Reshuffle",
    reshuffled: "Mixed order reshuffled.",
    built: "Practice set built: {n} problems.",
    problemLine: "Problem {i}: {t}",
    feedbackTitle: "After each problem, check the answer.",
    feedback: "Check your answer against your notes, an answer key, or your teacher right after each problem, before moving on. Feedback is a key part of making extra effort pay off.",
    whenHard: "If a problem feels hard, a short try is fine. If you are stuck for a few minutes, look at a worked example or ask for help.",
    printBtn: "Print the mixed list",
    printTitle: "Mixed practice list",
    printDone: "Done",
    noSave: "Nothing you type here is saved. When you leave this page it is gone."
  },

  week: "Pick one class where problems come in types, such as math or science. At your next study session, mix three types in one set, and check each answer right after you finish it.",

  supports: [
    "The tool does the shuffling, so you don't have to plan the order.",
    "Start with just two problem types and two problems each.",
    "Print the list and cross off each problem as you go.",
    "Write the answer check on the page, so it's built in.",
    "If you get stuck, look at an example or ask for help. That is part of the plan."
  ],

  research: {
    intro: "Here is what the research says, and what it does not say.",
    extra: "Practice that feels harder is not automatically better. The helpful kind comes with feedback or teaching."
  },

  reflection: [
    "Which subject have you practiced one type at a time that you could mix up next time?",
    "When you get stuck, what is a sensible point to stop and ask for help?"
  ]
};
