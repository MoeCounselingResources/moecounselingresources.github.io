/* =========================================================================
   PARENT GUIDE 6: WHEN STRUGGLE ISN'T WORKING — all wording for pe-step-in.html.
   (Logic: assets/js/parent-education.js. Research claims and sources come from assets/data/pe-evidence.js.)
   The "check" tool: three levels, in order. The result shows the highest level with anything checked.
   COUNSELING TEAM: verify the crisis line wording in "urgent" before launch (see TODO.md).
   TO EDIT WORDING: change the text between the quotation marks; keep quotation marks, commas, braces.
   ========================================================================= */

const PE_MODULE = {
  id: "stepin",
  n: 6,
  title: "When struggle isn't working: knowing when to step in",
  evidence: ["difficulties"],
  prev: "pressure",
  next: null,

  hook: "You've been stepping back, and most nights it works. But this week he's been stuck on the same thing for days, his grades are slipping in more than one class, and he seems different. Is this the struggle that helps, or something more?",

  quick: {
    question: "Which of these sounds like you?",
    options: [
      { text: "I'm afraid stepping in will undo everything.", fix: "Stepping in when he's truly stuck isn't rescuing. The goal was never struggle for its own sake. It was struggle he can get through." },
      { text: "He says he's fine, but something seems off.", fix: "Trust that feeling enough to ask, gently and more than once. If it continues, call his counselor. You don't need to be sure to reach out." },
      { text: "He's working hard and still failing.", fix: "Hard work that doesn't pay off is a sign he needs a different strategy or more support, not more effort. Start with his teacher and Academic Support." },
      { text: "I don't know who to call at school.", fix: "Start with his counselor. Counselors can connect you with his teachers, Academic Support, and other help." }
    ]
  },

  idea: {
    text: "Productive struggle has a limit. The research on desirable difficulties is clear that difficulty helps only when the learner can work through it, usually with feedback. When a student is stuck for a long time, working hard without making progress, or showing signs of real distress, more struggle won't teach him anything. Stepping in at that point isn't rescuing. Good stepping in usually means helping him find the right help, like his teacher, Academic Support, or his counselor, not doing the work for him.",
    exampleLabel: "Everyday example",
    example: "\"You've been stuck on this for three days. That tells me you need a different kind of help. Who could you ask tomorrow, your teacher or Academic Support?\""
  },

  try: {
    type: "check",
    title: "Try it: what are you seeing?",
    intro: "Check anything you've noticed in the past couple of weeks. The tool suggests a next step. It's a guide, not a diagnosis, and when in doubt, call.",
    urgentTitle: "If you are worried about his safety",
    urgent: "If your son talks about hurting himself or not wanting to be alive, don't wait. Call or text 988, the Suicide & Crisis Lifeline, any time. In an emergency, call 911.",
    levels: [
      { id: "coach", label: "Normal struggle: coach and wait", items: [
        "He's frustrated with one assignment or one class",
        "He complains but keeps working",
        "He had one bad grade or one bad week",
        "He's nervous about something new"
      ], advice: "This sounds like the learning space. Name the feeling, show you believe he can handle it, and help him find a small first step.", links: [ { text: "Guide 2: The learning space", href: "pe-learning-space.html" } ] },
      { id: "help", label: "Needs a hand: help him find help", items: [
        "He's been stuck on the same thing for days",
        "He's working hard and his grades still aren't moving",
        "His grades are dropping in more than one class",
        "He's avoiding a class or a teacher",
        "He's up very late most nights finishing work"
      ], advice: "Effort without progress means he needs a different strategy or more support. Help him plan a conversation with his teacher and try Academic Support. If it continues, call his counselor.", links: [ { text: "Academic Support at Moeller", href: "academic-support.html" } ] },
      { id: "counselor", label: "Talk with his counselor", items: [
        "He seems sad, irritable, or withdrawn most days",
        "He's pulling away from friends or things he used to enjoy",
        "His sleep or eating has changed a lot",
        "He's avoiding school or asking to stay home often",
        "Worry is getting in the way of everyday life",
        "He says things like \"What's the point?\""
      ], advice: "These are signs to reach out, not to wait out. Call or email his counselor this week. You don't need to be sure something is wrong to ask.", links: [ { text: "Find his counselor", href: "school-counseling.html#counselors" } ] }
    ],
    show: "Show a next step",
    none: "Check anything you've noticed first.",
    resultTitle: "A suggested next step",
    clear: "Clear my checks",
    cleared: "Checks cleared."
  },

  week: "Ask your son one open question this week, like \"How are things really going?\" Listen without fixing. If anything on the checklist fits, call his counselor.",

  supports: [
    "You don't need to be sure something is wrong to call his counselor.",
    "Helping him find help still counts as him handling it.",
    "Ask, \"What kind of help would be useful?\"",
    "If he wants support, go to the teacher with him, not instead of him.",
    "Struggle that helps comes with progress, even slow progress."
  ],

  research: {
    intro: "Here is what the research says, and what it does not say.",
    extra: "The checklist above is general guidance, not a screening tool. When in doubt, call his counselor."
  },

  reflection: [
    "What signs would tell you he's past productive struggle?",
    "Who at school would you call first, and do you have their contact information?"
  ]
};
