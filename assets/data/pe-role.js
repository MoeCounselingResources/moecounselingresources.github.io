/* =========================================================================
   PARENT GUIDE 1: YOUR ROLE IN HIGH SCHOOL — all wording for pe-your-role.html.
   (Logic: assets/js/parent-education.js. Research claims and sources come from assets/data/pe-evidence.js.)
   The "swaps" tool: each card has grades (which grades it fits best; [] means every grade),
   instead (what many parents do), try (the swap), and why (one sentence).
   TO EDIT WORDING: change the text between the quotation marks; keep quotation marks, commas, braces.
   ========================================================================= */

const PE_MODULE = {
  id: "role",
  n: 1,
  title: "Your role in high school: what actually helps",
  evidence: ["involvement", "autonomy"],
  prev: null,
  next: "struggle",

  hook: "In grade school, you checked his folder, quizzed him on spelling words, and knew every due date. Now he has seven or eight teachers, an online grade portal, and homework you may not remember how to do. It's hard to know where you fit.",

  quick: {
    question: "Which of these sounds most like you right now?",
    options: [
      { text: "I check the grade portal every day.", fix: "Knowing his grades is fine. Try checking less often and letting him tell you first. A weekly check-in that he leads gives him the job of keeping track, which is the skill he needs." },
      { text: "I sit with him and help with homework most nights.", fix: "In the teen years, homework help isn't linked to better grades. Try being nearby instead of beside him, and ask what his plan is when he's stuck." },
      { text: "We mostly talk about grades and scores.", fix: "Talking about school matters a lot. The talk most linked to doing well is about why it matters and where it leads. Try the swaps below." },
      { text: "I've stepped back completely. He's on his own.", fix: "Stepping back from the work is right. Staying connected still matters: clear expectations, conversations about the future, and noticing his effort. Stepping back from the work doesn't mean stepping out." }
    ]
  },

  idea: {
    text: "As students get older, the kind of involvement that helps changes. A review of 50 studies found that the strongest link with doing well in school came from what researchers call academic socialization: talking about why school matters, connecting his classes to his plans, and holding clear expectations while leaving the work itself to him. Direct help with homework was the one kind of involvement not linked to higher achievement. Harvard researcher Nancy Hill calls the goal scaffolding independence: let him try to solve it first, and support him as he does.",
    exampleLabel: "Everyday example",
    example: "Instead of asking \"Did you finish your homework?\" every night, ask once on Sunday: \"What's the hardest thing due this week, and what's your plan for it?\""
  },

  try: {
    type: "swaps",
    title: "Try it: small swaps",
    intro: "Each card is something many parents do, with a swap that keeps you involved while handing him the job. Pick his grade to see the swaps that fit best.",
    filterLabel: "Show swaps for",
    all: "Every grade",
    gradeNames: { 9: "Freshman", 10: "Sophomore", 11: "Junior", 12: "Senior" },
    insteadLabel: "Instead of",
    tryLabel: "Try",
    whyLabel: "Why",
    shown: "Showing {n} swaps.",
    printBtn: "Print these swaps",
    printTitle: "Small swaps: your role in high school",
    cards: [
      { grades: [], instead: "Checking the grade portal every day", try: "Agree on one weekly check-in that he leads. He pulls up his grades and tells you what he sees.", why: "Keeping track of his own grades is the skill. Daily checking keeps that job yours." },
      { grades: [], instead: "Reminding him about every due date", try: "Ask him to show you where he keeps track of what's due. Then let the planner, not you, be the reminder.", why: "Your reminders work only while you're there to give them." },
      { grades: [], instead: "Asking \"What did you get?\"", try: "Ask \"What was the hardest part?\" or \"What would you do differently next time?\"", why: "Questions about how it went keep the talk on learning, not just the score." },
      { grades: [9, 10], instead: "Sitting beside him while he does homework", try: "Be in the same room doing your own thing. Be available, not in charge.", why: "Help with homework isn't linked to better grades at this age. Being nearby keeps support without taking over." },
      { grades: [9, 10], instead: "Emailing a teacher when there's a problem", try: "Help him write the email himself. Read it before he sends it, if he wants you to.", why: "Talking with adults is a skill he'll need in college and at work, and teachers usually like hearing from students directly." },
      { grades: [10, 11], instead: "Choosing his classes for him", try: "Ask what interests him, what he's heard about the class, and what his counselor suggests. Then let him decide within limits you agree on.", why: "Real choices within clear limits are linked to stronger motivation." },
      { grades: [11, 12], instead: "Building his college list or application timeline for him", try: "Ask him to walk you through his plan and deadlines. Offer to be a sounding board.", why: "Seniors who own the process are better prepared for the independence that comes next." },
      { grades: [], instead: "Saving talk about the future for college applications", try: "Talk now about what he enjoys, what he's good at, and what paths look interesting. Connect a class to something he cares about.", why: "Linking school to future plans is one of the parent habits most linked to doing well." }
    ]
  },

  week: "Pick one swap. Tell your son what you're changing and why, for example: \"I'm going to stop checking your grades every day. On Sundays, show me where things stand.\"",

  supports: [
    "\"What's your plan for that?\"",
    "\"What have you tried so far?\"",
    "\"Who could you ask?\"",
    "\"That sounds hard. I think you can figure it out. Tell me if you want to talk it through.\"",
    "\"What's one thing from this week you're proud of?\""
  ],

  research: {
    intro: "Here is what the research says, and what it does not say.",
    extra: "None of this means you should never help. It means the help that matters most at this age is expectations, conversation, and support, not doing the work."
  },

  reflection: [
    "Which school job are you still doing that he could start doing this year?",
    "When did you last talk with him about where school is leading, not just about grades?"
  ]
};
