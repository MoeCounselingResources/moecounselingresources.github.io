/* =========================================================================
   PARENT GUIDE 4: WHEN STEPPING BACK IS HARD — all wording for pe-stepping-back.html.
   (Logic: assets/js/parent-education.js. Research claims and sources come from assets/data/pe-evidence.js.)
   The "script" tool builds a supportive statement from three lines. {situation} and {habit} are filled in.
   Each habit has text (what the parent picks) and line (how it reads inside "I'm not going to ...").
   TO EDIT WORDING: change the text between the quotation marks; keep quotation marks, commas, braces.
   ========================================================================= */

const PE_MODULE = {
  id: "worry",
  n: 4,
  title: "When stepping back is hard: worry and accommodation",
  evidence: ["overparenting", "accommodation"],
  prev: "coach",
  next: "pressure",

  hook: "He's dreading a class presentation, so you write the teacher to ask if he can present privately. He's nervous about calling to make an appointment, so you call. Each time, his relief is instant. So is yours.",

  quick: {
    question: "Which of these sounds like you?",
    options: [
      { text: "I'd rather help him avoid it than watch him panic.", fix: "That's the trap: avoiding brings relief right away, so it gets repeated, and the fear stays the same size or grows. Try support and confidence instead of rescue." },
      { text: "I answer the same worried questions over and over.", fix: "Repeated reassurance is one of the most common kinds of accommodation. It calms him for a moment, then he needs it again. Try answering once, then saying you're confident he can handle not knowing." },
      { text: "If I stop helping, he'll be angry with me.", fix: "He may be, at first. In a study of this approach, parents worried the relationship would suffer, and it improved. Warmth is what keeps it from feeling like rejection." },
      { text: "He's struggling a lot, not just nervous sometimes.", fix: "If worry is keeping him from school, friends, or sleep, or he seems sad or hopeless, talk with his counselor. This guide is for everyday worry, not a substitute for care." }
    ]
  },

  idea: {
    text: "Psychologists call it accommodation: the things parents do to spare a child distress, like answering the same worried question again and again, speaking for him, or helping him avoid what he fears. It comes from love, and it works in the moment. Over time, it's linked to worse anxiety, because he never gets to find out that he can cope. Studies of teens and college students also link doing too much for them with more anxiety and less confidence. The answer isn't to pull away. It's support with two parts: say that what he feels makes sense, and say that you're confident he can handle it.",
    exampleLabel: "Everyday example",
    example: "Instead of calling the doctor's office for him: \"I know calling feels awkward, and it makes sense to be nervous. I'm sure you can do it. I'll be right here while you call.\""
  },

  try: {
    type: "script",
    title: "Try it: build a supportive statement",
    intro: "Pick what your son is facing and what you usually do to help. The tool builds a statement with two parts, understanding and confidence. Change any words so it sounds like you.",
    situationLabel: "What is he facing?",
    situationPlaceholder: "or type your own, e.g. a job interview",
    situations: ["giving a presentation", "calling or emailing an adult", "a big test", "going somewhere new", "asking a teacher for help", "talking to his coach"],
    habitLabel: "What do you usually do?",
    habits: [
      { text: "Do it for him", line: "do it for you" },
      { text: "Let him skip it", line: "let you skip it" },
      { text: "Answer the same worry again and again", line: "keep answering the same question" },
      { text: "Speak for him", line: "speak for you" },
      { text: "Stay with him the whole time", line: "stay with you the whole time" }
    ],
    lines: [
      "I can see you're really worried about {situation}. That makes sense. It feels hard.",
      "I'm not going to {habit}, because I know you can handle this.",
      "I'll be here, and we can talk about how it went."
    ],
    lineNoHabit: "I know you can handle this.",
    build: "Build my statement",
    need: "Pick or type what he's facing first.",
    outLabel: "Your statement (you can edit it)",
    copy: "Copy",
    copied: "Copied.",
    copyFail: "Copying didn't work in this browser. Select the text and copy it.",
    tip: "Say it calmly and say it once. Tell him ahead of time when something is changing, not in the middle of a hard moment."
  },

  week: "Pick one small accommodation you could cut back this week. Tell your son ahead of time what's changing and why, using the statement above.",

  supports: [
    "Start with the smallest change, not the biggest fear.",
    "Tell him ahead of time what you're changing.",
    "Expect him to be upset at first. Stay warm and steady.",
    "Notice when he copes: \"You were nervous, and you did it anyway.\"",
    "If it isn't getting better, or he seems truly overwhelmed, talk with his counselor."
  ],

  research: {
    intro: "Here is what the research says, and what it does not say.",
    extra: "The SPACE program studied here is run by trained clinicians, mostly with younger children who have anxiety disorders. This guide explains the idea for everyday worry. It is not a treatment."
  },

  reflection: [
    "What's one thing you do for your son because he gets nervous, that he could start doing himself?",
    "How do you handle your own worry when he's struggling?"
  ]
};
