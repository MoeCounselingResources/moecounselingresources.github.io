/* =========================================================================
   PARENT GUIDE 5: AVERAGE IS OKAY — all wording for pe-pressure.html.
   (Logic: assets/js/parent-education.js. Research claims and sources come from assets/data/pe-evidence.js.)
   The "questions" tool: each question has kind "results" or "person". Results questions have a swap.
   {r}, {p}, and {n} in resultLine are filled in. Nothing is saved or sent.
   TO EDIT WORDING: change the text between the quotation marks; keep quotation marks, commas, braces.
   ========================================================================= */

const PE_MODULE = {
  id: "pressure",
  n: 5,
  title: "Average is okay: grades, pressure, and what matters",
  evidence: ["pressure"],
  prev: "worry",
  next: "stepin",

  hook: "He's a solid B and C student. He mostly does the work. His friends are applying to schools he probably can't get into, and you catch yourself wondering if you should push harder, hire a tutor, or sign him up for one more thing.",

  quick: {
    question: "Which of these sounds like you?",
    options: [
      { text: "I worry B's and C's will limit his future.", fix: "Grades matter, and they aren't the whole story. Many good paths, including good colleges, the trades, the military, and careers, are open to steady B and C students. What goes with him is how he works, how he treats people, and how he handles setbacks." },
      { text: "I tell him to do his best, but we mostly talk about grades.", fix: "Many caring parents do this without noticing. Teens read our questions more than our speeches. The tool below helps you see the pattern." },
      { text: "He seems stressed all the time.", fix: "Steady stress with little rest is a real risk, not just a phase. Look at the whole week with him, and talk with his counselor if it doesn't ease." },
      { text: "He doesn't seem to care about grades at all.", fix: "That's a different problem than pressure. Start with connection and curiosity about what he does care about. If it's new or sudden, talk with his counselor." }
    ]
  },

  idea: {
    text: "Researchers who study high-achieving schools find higher-than-average rates of anxiety, depression, and substance use, and they now treat heavy pressure to achieve as a risk factor for teens. What seems to protect students is feeling valued for who they are, not only for what they achieve. Journalist Jennifer Breheny Wallace calls this mattering. In one study of 506 sixth graders, students who believed their parents valued kindness as much as or more than achievement had better mental health, and they did at least as well in school. Wanting him to do well isn't the problem. It becomes a problem when achievement is the main message he hears, or when encouragement comes across as criticism.",
    exampleLabel: "Everyday example",
    example: "Some nights, swap \"What did you get on the test?\" for \"What was the best part of your day?\" or \"Who did you help today?\""
  },

  try: {
    type: "questions",
    title: "Try it: what do your questions say?",
    intro: "Check the questions you ask your son most often. Nobody sees your answers. The tool shows how your questions balance between his results and him as a person.",
    groupLabel: "Questions I ask most often",
    items: [
      { q: "What did you get on the test?", kind: "results", swap: "How do you feel about how the test went?" },
      { q: "Did you finish your homework?", kind: "results", swap: "What's the hardest thing you're working on this week?" },
      { q: "What's your GPA now?", kind: "results", swap: "Which class do you like most right now, and why?" },
      { q: "How did your friends do?", kind: "results", swap: "How are your friends doing, really?" },
      { q: "Did you win?", kind: "results", swap: "What was the best moment of the game?" },
      { q: "Have you started your college list?", kind: "results", swap: "What kind of place can you picture yourself in after high school?" },
      { q: "What made you laugh today?", kind: "person" },
      { q: "Who did you help today, or who helped you?", kind: "person" },
      { q: "What are you looking forward to?", kind: "person" },
      { q: "What was hard today?", kind: "person" }
    ],
    show: "Show my balance",
    needOne: "Check at least one question first.",
    resultLine: "Of the {n} questions you checked, {r} focus on his results and {p} on him as a person.",
    allResults: "Every question you checked is about results. That doesn't mean you don't care about the rest. It means he may not hear it. Try a few of the swaps below this week.",
    mostResults: "Most of your questions are about results. Try mixing in one or two of the swaps below.",
    balanced: "You're already asking about him as a person, not just his results. Keep it up.",
    swapsTitle: "Swaps to try",
    swapArrow: "Try instead:",
    note: "Questions about results aren't bad. The goal is balance, so he hears that he matters beyond his grades."
  },

  week: "Once this week, tell your son something you appreciate about him that has nothing to do with grades, sports, or any result.",

  supports: [
    "Notice effort, kindness, and humor out loud.",
    "Ask him to help with something the family really needs. Being relied on is part of mattering.",
    "Keep one evening a week free of activities.",
    "After a bad grade, ask how he's doing before you ask what happened.",
    "Watch your tone. To a stressed teen, encouragement can sound like criticism."
  ],

  research: {
    intro: "Here is what the research says, and what it does not say.",
    extra: "Most of this research was done in wealthier, high-achieving communities, and it relies on surveys, which show links, not cause."
  },

  reflection: [
    "If your son had to guess what you value most for him, what would he say?",
    "What would \"enough\" look like for him, in his own words?"
  ]
};
