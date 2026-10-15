/* =========================================================================
   FRESHMAN FOUNDATIONS, QUARTER 1 — every word on freshman-foundations-q1.html lives in this file.
   (The logic is assets/js/freshman-q1.js and the look is assets/css/freshman-q1.css.)

   TO EDIT WORDING: change the text between the quotation marks. Keep the quotation marks, commas, and
   braces. To use a quotation mark inside text, write \" instead of ". In text you can use **bold**.
   To add a quiz question, copy a whole { q: ..., options: [...], answer: ..., why: ... } block.
   (answer is the number of the correct option, counting from 0.)

   SAVED ANSWERS: the "720 Days" reflection saves in the student's own browser under the key written in
   days720.key ("moeller-ex-720days"). Don't change the key, or answers students already saved disappear.
   Nothing is ever sent anywhere.

   The "Who are your resources?" counselor list comes from COUNSELORS in assets/js/shared-content.js
   (every entry whose role contains "House"), so it never needs editing here.
   ========================================================================= */

const FRESHMAN_Q1 = {

  title: "Freshman Foundations, Quarter 1: Study Skills and Adjusting to Life in High School",
  stage: "Freshman Foundations",
  back: { text: "← Back to Freshmen page", href: "freshmen.html" },
  footerBack: { text: "Back to the Freshmen page", href: "freshmen.html" },

  // ---------- The year ahead ----------
  yearAhead: {
    title: "The year ahead",
    youAreHere: "You are here",
    quarters: [
      { label: "1st Quarter", text: "Study Skills and Adjusting to Life in High School" },
      { label: "2nd Quarter", text: "Self-Discovery and Exploring Post-secondary Opportunities" },
      { label: "3rd Quarter", text: "Course Registration Presentation and SCOIR Course Planner" },
      { label: "4th Quarter", text: "Mental Health Presentation" }
    ],
    current: 0
  },

  // ---------- 720 Days ----------
  days720: {
    title: "720 Days of High School",
    key: "moeller-ex-720days",
    prompt: "When I graduate in 4 years, this is how I hope I'll be described by:",
    fields: [
      { id: "friends", label: "Friends" },
      { id: "family", label: "Family" },
      { id: "teachers", label: "Teachers" },
      { id: "myself", label: "Myself" }
    ],
    placeholder: "Write a sentence or a few words.",
    privacy: "This is private. It saves only on this device, and no one else can see it unless you show them.",
    saved: "Saved on this device.",
    blocked: "This browser is blocking saving, so your answers will be lost when you close this page.",
    print: "Print my reflection",
    printTitle: "720 Days of High School",
    nothing: "Nothing yet."
  },

  // ---------- Who are your resources? ----------
  resources: {
    title: "Who are your resources?",
    intro: "You don't have to figure out high school alone. Start with your house counselor, then use these pages whenever you need them.",
    counselorsTitle: "Your house counselors",
    counselorsNote: "Every student is in a house, and every house has its own counselor.",
    links: [
      { text: "Academic Support", href: "academic-support.html", desc: "Study groups, Chem Block, and the tutors we have in school." },
      { text: "Study Tips", href: "study-tips.html", desc: "Proven ways to study, take notes, and prepare for tests." },
      { text: "Self-Discovery", href: "self-discovery.html", desc: "Private, self-paced exercises on your values, your roles, your goals, and who's in your corner." }
    ]
  },

  // ---------- Study skills ----------
  study: {
    title: "Study skills",
    heading: "What makes studying actually work?",
    question: "How many of you have \"studied\" for hours and still didn't pass your test?",
    egIntro: "Good study skills require executive function, aka the brain's management system that helps you:",
    eg: [
      "Plan what to study and when",
      "Organize your materials and information",
      "Focus when there are a million distractions",
      "Remember what you learned (and not just for 5 minutes)"
    ],
    realityTitle: "The reality check: high school is different than middle school",
    reality: [
      "More classes = more material to manage",
      "Less hand-holding = you need to pay attention and TRACK your own deadlines",
      "Tests cover MORE content = you can't cram the night before",
      "Grades matter for your future = time to lock in"
    ],
    realityClose: "Most importantly, executive functioning isn't just about \"being organized.\" It's about making your brain work smarter so studying pays off.",
    video: { text: "Watch the video on YouTube", note: "(opens in a new tab)", href: "https://www.youtube.com/watch?v=CPxSzxylRCI" },

    strategiesTitle: "Three strategies that work",
    strategiesHint: "Tap a card to open it.",
    expandAll: "Open all",
    collapseAll: "Close all",
    cards: [
      {
        id: "organization",
        title: "Organization = knowing what to study",
        lead: "You can't study what you can't find or don't know is due, and when.",
        strategiesLabel: "Strategies",
        items: [
          "Use a planner or something to write down assignments, test dates, and project deadlines: iCalendar, phone reminders, or a paper planner (whatever works for you!)",
          "Settings on Moe Campus let you opt in to calendar reminders sent to your email or cell number",
          "Every Sunday, look at the week ahead so you get an idea of what's coming up",
          "Organize your notes by subject: OneNote tabs for each class, physical paper notes, etc. Don't let \"mystery\" papers float around in your backpack."
        ]
      },
      {
        id: "time",
        title: "Time management = studying before it's an emergency",
        lead: "Cramming doesn't work for long-term learning. Your brain needs time to process information.",
        strategiesLabel: "Strategies",
        items: [
          "**The 2-Day Rule:** start studying at least 2 days before a test (ideally 3–5 days for big tests)",
          "**Break big projects into chunks.** Big paper coming due? Week 1: research and outline. Week 2: first draft. Week 3: revise and polish the final draft.",
          "**Create a study schedule:** block out specific times for specific subjects (Math on Monday/Wednesday, English on Tuesday/Thursday)",
          "**The 50-10 Rule:** study for 50 minutes, break for 10. Your brain needs rest to absorb information!"
        ]
      },
      {
        id: "focus",
        title: "Focus and active studying = actually learning (not just going through the motions)",
        lead: "",
        compare: [
          { label: "Passive", text: "Reading your notes over and over = passive studying" },
          { label: "Active", text: "Testing yourself = active studying" },
          { label: "Result", text: "Active studying = actually remembering things" }
        ],
        strategiesLabel: "Strategies",
        items: [
          "Leave your phone in another room (just like when you don't have it at school)",
          "Close all browser tabs except what you need",
          "Study in a specific spot your brain associates with focus (not your bed!)",
          "Use website blockers if needed to help you stay locked in",
          "Study actively: self-quizzing, flashcards (make them yourself), practice problems, teaching someone else (study groups)"
        ],
        gold: { title: "The retrieval practice trick", text: "Your brain remembers what it practices retrieving. So instead of just reviewing, close your notes and quiz yourself." }
      }
    ]
  },

  // ---------- Myths vs. truths ----------
  myths: {
    title: "Study skills reality check",
    hint: "Tap a card to flip it and see the truth.",
    mythLabel: "Myth",
    truthLabel: "Truth",
    tap: "Tap to reveal the truth",
    tapBack: "Tap to flip back",
    cards: [
      { myth: "I'm just bad at studying.", truth: "Nobody is born knowing how to study. It's a skill you build!" },
      { myth: "Studying more hours = better grades.", truth: "Studying smarter with active strategies beats hours of passive reviewing." },
      { myth: "\"I'll just remember it, I don't need to write it down.\"", truth: "Your brain is not a filing cabinet. You're human. Write it down." }
    ],
    close: "These skills take practice. You won't be perfect immediately, and that's okay!"
  },

  // ---------- Quiz yourself ----------
  quiz: {
    title: "Quiz yourself",
    intro: "Five quick questions. Trying to remember an answer is one of the best ways to learn it, so give each one your best shot before you look.",
    questionLabel: "Question",
    of: "of",
    right: "Right!",
    notQuite: "Not quite.",
    theAnswer: "The answer:",
    next: "Next question",
    results: "See my results",
    again: "Try again",
    scoreLine: "You got {n} of {total}.",
    scoreHigh: "Nice work. You've got the key ideas.",
    scoreLow: "Good start. Look back at the cards above and try again.",
    questions: [
      {
        q: "When should you start studying for a test?",
        options: ["The night before", "At least 2 days before (3–5 for big tests)", "The morning of the test", "Right after class on the day of the test"],
        answer: 1,
        why: "That's the 2-Day Rule. Cramming doesn't work for long-term learning, because your brain needs time to process information."
      },
      {
        q: "Which one is active studying?",
        options: ["Reading your notes over and over", "Watching your notes get highlighted", "Testing yourself with flashcards you made", "Copying your notes word for word"],
        answer: 2,
        why: "Testing yourself is active studying, and active studying is what helps you actually remember things. Reading notes over and over is passive."
      },
      {
        q: "What is the 50-10 Rule?",
        options: ["Study for 10 minutes, then rest for 50", "Study for 50 minutes, then take a 10-minute break", "Study 50 hours before a test", "Do 10 problems, then 50 more"],
        answer: 1,
        why: "Your brain needs rest to absorb information. Work for 50 focused minutes, then take a 10-minute break."
      },
      {
        q: "What's the best way to protect your focus while you study?",
        options: ["Keep your phone next to you, face down", "Study in bed so you're comfortable", "Leave your phone in another room and use a spot your brain connects with focus", "Keep ten browser tabs open in case you need them"],
        answer: 2,
        why: "Put distractions out of reach, close the tabs you don't need, and pick a specific study spot (not your bed!)."
      },
      {
        q: "What's the truth about studying more hours?",
        options: ["More hours always means better grades", "Studying smarter with active strategies beats hours of passive reviewing", "Studying is only for people who are born good at it", "You don't need to write anything down"],
        answer: 1,
        why: "Nobody is born knowing how to study. It's a skill you build, and active strategies beat hours of passive reviewing."
      }
    ]
  }
};
