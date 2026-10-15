/* =========================================================================
   HOW TO LEARN — hub wording and the list of modules. (Logic: assets/js/how-to-learn.js; look:
   assets/css/how-to-learn.css. Research claims and sources live ONLY in assets/data/evidence.js.)

   TO EDIT WORDING: change the text between the quotation marks. Keep the quotation marks, commas, and
   braces. To use a quotation mark inside text, write \" instead of ".
   TO ADD A FINISHED MODULE: set built: true on its line in "modules" (its page must exist).
   ========================================================================= */

const HOW_TO_LEARN = {
  title: "How to Learn",
  stage: "School Counseling",
  back: { text: "← Back to School Counseling", href: "school-counseling.html" },
  intro: "Short modules on how memory and focus work, with tools you can use today. Every claim about research is labeled with how strong the evidence is, and every source is listed.",
  privacy: "Nothing on these pages is collected or sent anywhere. Anything that saves stays in this browser on this device, and each tool has a button to clear it.",
  counselor: "This is general information, not medical or mental-health advice. If studying feels really hard even when you try strategies like these, talk with your counselor.",

  troubleTitle: "Which sentence sounds like you?",
  troubleIntro: "Tap the one that fits best. You will see the idea that fits it, and a place to start.",
  troubleTry: "A good place to start:",
  troubleSoon: "This module is coming soon.",
  trouble: [
    { text: "I read my notes again and again, and I still blank on the test.", module: "retrieval" },
    { text: "Everything looked familiar, so I thought I knew it.", module: "myths" },
    { text: "I always start studying the night before.", module: "spacing" },
    { text: "I practice one kind of problem at a time, then forget how to tell them apart.", module: "interleaving" },
    { text: "Sometimes I feel like I'm just not good at this, so why try?", module: "mindset" },
    { text: "I keep saying I'll start, and then I don't.", module: "habits" },
    { text: "My phone keeps pulling me away.", module: "focus" },
    { text: "I'm tired all the time, and my brain feels foggy.", module: "sleep" },
    { text: "I lose track of what's due and where my stuff is.", module: "executive" },
    { text: "I've heard a lot of brain facts and I'm not sure which are true.", module: "brain" }
  ],

  modulesTitle: "The ten modules",
  builtLabel: "Open the module",
  soonLabel: "Coming soon",
  evidenceLabel: "Evidence:",
  modules: [
    { id: "brain", n: 1, title: "How your brain learns", blurb: "Your brain keeps changing with practice. What that does and does not mean.", evidence: ["brain"], file: "how-to-learn-brain.html", built: true },
    { id: "myths", n: 2, title: "Learning myths: styles and illusions of knowing", blurb: "Why \"I know it when I see it\" can fool you, and what to do about learning styles.", evidence: ["styles", "illusions"], file: "how-to-learn-myths.html", built: false },
    { id: "retrieval", n: 3, title: "Study like it counts: retrieval practice", blurb: "Close the page and try to remember. Why it works and a self-quiz tool.", evidence: ["retrieval"], file: "how-to-learn-retrieval.html", built: true },
    { id: "spacing", n: 4, title: "Spread it out: spacing", blurb: "Spreading study over several days works better than cramming. Plan your reviews.", evidence: ["spacing"], file: "how-to-learn-spacing.html", built: true },
    { id: "interleaving", n: 5, title: "Making it hard in the right way: interleaving and productive struggle", blurb: "When mixing it up helps, and when struggle is just struggle.", evidence: ["interleaving"], file: "how-to-learn-interleaving.html", built: true },
    { id: "mindset", n: 6, title: "Can you improve? Mindset, honestly", blurb: "What the research says about mindset, and why strategies matter.", evidence: ["mindset"], file: "how-to-learn-mindset.html", built: true },
    { id: "habits", n: 7, title: "Habits that stick: if-then plans", blurb: "Make starting easier with a plan for when and where.", evidence: ["habits"], file: "how-to-learn-habits.html", built: true },
    { id: "focus", n: 8, title: "Focus and digital distraction", blurb: "Low-cost ways to protect your attention, and what is still unproven.", evidence: ["focus"], file: "how-to-learn-focus.html", built: true },
    { id: "sleep", n: 9, title: "Sleep and learning", blurb: "How much sleep teens need and how it connects to school.", evidence: ["sleep"], file: "how-to-learn-sleep.html", built: true },
    { id: "executive", n: 10, title: "Planning and organization (executive skills)", blurb: "Printable planners and a task-breakdown template.", evidence: ["executive"], file: "how-to-learn-executive.html", built: true }
  ],

  sourcesLink: "Sources and how we checked",
  sourcesBlurb: "Every source, what kind of study it is, how strong the evidence is, and the date the sources were checked.",

  // shared module-page wording
  m: {
    back: { text: "← Back to How to Learn", href: "how-to-learn.html" },
    hook: "Sound familiar?",
    quick: "Which sounds like you?",
    idea: "The idea",
    try: "Try it",
    week: "This week",
    supports: "Make it easier",
    research: "What the research says",
    reflection: "Reflect",
    sources: "Sources",
    reviewed: "Sources checked on",
    prev: "Previous module",
    next: "Next module",
    soon: "(coming soon)",
    opensNew: "(opens in a new tab)",
    counselor: "This is general information, not medical or mental-health advice. If studying feels really hard even when you try strategies like these, talk with your counselor."
  },

  // sources page
  src: {
    title: "Sources and how we checked",
    intro: "These are the only sources behind the research claims on these pages. Each claim is tied to an evidence label, and the label is explained below. Links open in a new tab.",
    how: "How we checked: every research claim comes from the sources listed here. Sources are research papers and expert guidance, linked directly. We state limits when the research has them, and we never say something works when the research says it does not.",
    legendTitle: "What the labels mean",
    legend: [
      { label: "Strong", text: "Many studies and reviews agree." },
      { label: "Moderate", text: "Good support, with real limits we explain." },
      { label: "Mixed", text: "Studies disagree, or effects are small." },
      { label: "Not supported", text: "It was tested and did not hold up." }
    ],
    typeLabel: "Type",
    reviewed: "Sources checked on"
  }
};
