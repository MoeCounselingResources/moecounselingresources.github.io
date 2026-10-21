/* =========================================================================
   EDUCATION FOR PARENTS — hub wording, the list of guides, books, and shared wording.
   (Logic: assets/js/parent-education.js. Look: assets/css/how-to-learn.css plus assets/css/parent-education.css.
   Research claims and sources live ONLY in assets/data/pe-evidence.js. Each guide's wording is in assets/data/pe-<guide>.js.)

   TO EDIT WORDING: change the text between the quotation marks. Keep the quotation marks, commas, and
   braces. To use a quotation mark inside text, write \" instead of ".
   TO HIDE A GUIDE while you edit it: set built: false on its line in "modules".
   TO ADD A PARENT NIGHT: copy the example line in "sessions" and remove the two slashes in front of it.
   Nothing on these pages is saved. The tools keep what parents type only until they leave the page.
   ========================================================================= */

const PARENT_ED = {
  title: "Education for Parents",
  stage: "School Counseling",
  back: { text: "← Back to School Counseling", href: "school-counseling.html" },
  intro: "Short guides for families on helping your son become an independent learner, and why a frustrating homework night, a forgotten assignment, or a B can be part of that.",
  privacy: "Nothing on these pages is collected or saved. The tools keep what you type only until you leave the page.",
  counselor: "This is general information, not medical or mental-health advice. If you are worried about your son, call his counselor. You don't need to be sure something is wrong to ask.",

  beliefTitle: "What these guides are about",
  belief: [
    "Not every student is meant to be a straight-A student, and that's okay.",
    "What helps most at home is support, not doing the work: clear expectations, real conversations, and coaching on how to plan and follow through.",
    "Struggle that he can work through is how learning happens. Making school as easy as possible isn't always the kind thing to do."
  ],

  troubleTitle: "Which sounds like your house?",
  troubleIntro: "Tap the one that fits best. You'll see the guide that fits it.",
  troubleTry: "A good place to start:",
  trouble: [
    { text: "I check the grade portal more than he does.", module: "role" },
    { text: "Homework night turns into an argument at the kitchen table.", module: "role" },
    { text: "When he gets frustrated, I jump in and fix it.", module: "struggle" },
    { text: "I still wake him up, track his due dates, and email his teachers.", module: "coach" },
    { text: "He gets anxious, and I end up doing the hard thing for him.", module: "worry" },
    { text: "He's a B and C student, and I worry that's not enough.", module: "pressure" },
    { text: "I can't tell if he needs space or real help.", module: "stepin" }
  ],

  modulesTitle: "The six guides",
  modulesIntro: "Each guide takes about ten minutes and has one small thing to try this week. Start anywhere.",
  soonLabel: "Coming soon",
  evidenceLabel: "Evidence:",
  timeLabel: "About 10 min",
  modules: [
    { id: "role", n: 1, title: "Your role in high school: what actually helps", blurb: "The kind of involvement that helps changes in the teen years. Small swaps that keep you involved without doing the work.", evidence: ["involvement", "autonomy"], file: "pe-your-role.html", built: true },
    { id: "struggle", n: 2, title: "The learning space: why frustration is part of learning", blurb: "What to do in the first minute after he gets frustrated, and why rescuing can backfire.", evidence: ["learningSpace", "difficulties"], file: "pe-learning-space.html", built: true },
    { id: "coach", n: 3, title: "Coach, don't carry: building executive skills", blurb: "Planning and organization are still developing. Plan a four-week handoff of one job you do for him.", evidence: ["skills", "autonomy"], file: "pe-coach.html", built: true },
    { id: "worry", n: 4, title: "When stepping back is hard: worry and accommodation", blurb: "Why helping him avoid what he fears can keep the fear going, and what to say instead.", evidence: ["overparenting", "accommodation"], file: "pe-stepping-back.html", built: true },
    { id: "pressure", n: 5, title: "Average is okay: grades, pressure, and what matters", blurb: "What protects teens under pressure, and a quick check on what your questions tell him you value.", evidence: ["pressure"], file: "pe-pressure.html", built: true },
    { id: "stepin", n: 6, title: "When struggle isn't working: knowing when to step in", blurb: "How to tell productive struggle from a student who needs more help, and who to call.", evidence: ["difficulties"], file: "pe-step-in.html", built: true }
  ],

  // Parent nights. Leave the list empty to hide this section.
  // Each line: { date: "Tuesday, January 12, 7:00 p.m.", title: "...", desc: "...", url: "https://..." }  (url is optional)
  sessionsTitle: "Parent nights",
  sessions: [
    // { date: "Tuesday, January 12, 7:00 p.m.", title: "Coach, don't carry", desc: "Building independence in the teen years. Commons.", url: "" },
  ],

  booksTitle: "Books for going deeper",
  booksIntro: "Optional reading that matches these guides. You don't need any of them to use the guides.",
  books: [
    { title: "Good Inside", author: "Dr. Becky Kennedy", desc: "Warm, steady parenting, including how to help kids tolerate frustration." },
    { title: "Smart but Scattered Teens", author: "Richard Guare, Peg Dawson, and Colin Guare", desc: "A step-by-step program for building planning and organization skills." },
    { title: "Never Enough", author: "Jennifer Breheny Wallace", desc: "Achievement pressure, and helping teens feel they matter beyond their results." },
    { title: "The Gift of Failure", author: "Jessica Lahey", desc: "A teacher's case for letting kids fail at small things so they can learn." },
    { title: "How to Raise an Adult", author: "Julie Lythcott-Haims", desc: "A former Stanford dean on overparenting and building independence." },
    { title: "The Self-Driven Child", author: "William Stixrud and Ned Johnson", desc: "Giving teens more say over their own lives, and why it helps motivation." },
    { title: "Breaking Free of Child Anxiety and OCD", author: "Eli Lebowitz", desc: "The parent-based SPACE approach for families of anxious kids." }
  ],

  forStudentsTitle: "For your son",
  forStudents: { text: "How to Learn", href: "how-to-learn.html", note: "Short, research-checked lessons for students on memory, focus, sleep, and planning. The planners in Module 10 pair well with Guide 3." },

  sourcesLink: "Sources",
  sourcesBlurb: "Every source behind these guides, what kind of study it is, and how strong the evidence is.",
  bylineText: "Research sources and evidence labels — ",
  bylineLink: "Sources page",
  siteFooter: "Built for our students and families, edited every year. Have a broken link or a resource we should add? Tell your son's counselor.",

  // shared guide-page wording
  m: {
    back: { text: "← Back to Education for Parents", href: "parent-education.html" },
    guideWord: "Guide",
    of: "of",
    hook: "Sound familiar?",
    quick: "Which sounds like you?",
    idea: "The idea",
    try: "Try it",
    week: "This week",
    supports: "Words and habits that help",
    research: "What the research says",
    reflection: "Think about it",
    sources: "Sources",
    reviewed: "Sources checked on",
    prev: "Previous guide",
    next: "Next guide",
    opensNew: "(opens in a new tab)",
    print: "Print",
    printing: "Opening the print window.",
    noSave: "Nothing you type here is saved. When you leave this page, it's gone.",
    counselor: "This is general information, not medical or mental-health advice. If you are worried about your son, call his counselor."
  },

  // sources page
  src: {
    title: "Sources for parents",
    intro: "These are the only sources behind the research claims in the parent guides. Each claim has an evidence label, explained below. Links open in a new tab.",
    how: "How we checked: every research claim comes from a source listed here, linked directly. We say when the research has limits, and we say 'linked to' when a study shows a link but not a cause.",
    legendTitle: "What the labels mean",
    legend: [
      { label: "Strong", text: "Many studies and reviews agree." },
      { label: "Moderate", text: "Good support, with real limits we explain." },
      { label: "Mixed", text: "Studies disagree, or effects are small." },
      { label: "Not supported", text: "It was tested and did not hold up." }
    ],
    reviewed: "Sources checked on",
    back: { text: "← Back to Education for Parents", href: "parent-education.html" }
  }
};
