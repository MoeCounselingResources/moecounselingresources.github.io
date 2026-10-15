/* =========================================================================
   SOPHOMORE FUTURE FOCUS, QUARTER 3 — every word on sophomore-future-focus-q3.html lives in this file.
   (The logic is assets/js/sophomore-q3.js; the look is assets/css/freshman-q1.css plus sophomore-q3.css.)

   TO EDIT WORDING: change the text between the quotation marks. Keep the quotation marks, commas, and
   braces. To use a quotation mark inside text, write \" instead of ". In text you can use **bold**.
   The ranking activity draws its eight cards from "factors" below, in the order listed. Students reorder
   them on the page. NOTHING ON THIS PAGE SAVES: there is no browser storage and nothing is sent anywhere.
   ========================================================================= */

const SOPHOMORE_Q3 = {

  title: "Future Focus, Quarter 3: Exploring College Admissions",
  stage: "Future Focus",
  back: { text: "← Back to Sophomores page", href: "sophomores.html" },
  footerBack: { text: "Back to the Sophomores page", href: "sophomores.html" },

  yearAhead: {
    title: "The year ahead",
    youAreHere: "You are here",
    quarters: [
      { label: "Quarter 1", text: "Career Interests in SCOIR" },
      { label: "Quarter 2", text: "Understanding Your Results" },
      { label: "Quarter 3", text: "Exploring College Admissions" },
      { label: "Quarter 4", text: "Future Focus Wrap-Up & Building a Resume" }
    ],
    current: 2
  },

  // ---------- A. What's important to a college? ----------
  important: {
    title: "What's important to a college?",
    paras: [
      "When a college reads your application, it uses something called **holistic review**. That means the admissions office looks at the whole student, not one number. A GPA or a test score is only part of the picture.",
      "Readers want to understand what you have done with the chances you had, what you care about, and how you might add to their campus. Most colleges weigh the eight factors below."
    ],
    factorsTitle: "The eight factors",
    factorsLead: "These are the pieces of an application that most colleges pay attention to.",
    // Each factor: a short name and a plain-language note. Keep exactly eight; the ranking activity uses them too.
    factors: [
      { id: "rigor",      name: "Rigor of classes and strength of schedule", note: "Did you take challenging classes when you could, like honors and AP? Did you stick with a strong schedule all four years?" },
      { id: "grades",     name: "Grades earned (GPA)",                       note: "The grades on your transcript, class by class and year by year." },
      { id: "tests",      name: "ACT or SAT scores",                         note: "Some colleges require scores, some make them optional. You will not test until junior year." },
      { id: "essay",      name: "Essay(s)",                                  note: "Your chance to speak in your own voice about who you are." },
      { id: "activities", name: "Extracurricular activities",                note: "Clubs, sports, music, theater, faith life, and anything else you do outside class." },
      { id: "work",       name: "Work and volunteer experiences",            note: "Jobs, service hours, and ways you have helped out at home or in your community." },
      { id: "leadership", name: "Leadership experiences",                    note: "Times you led a team, a project, or a group, even in a small way." },
      { id: "awards",     name: "Awards and honors",                         note: "Recognition you have earned in or out of school." }
    ]
  },

  // ---------- B. Interactive ranking ----------
  rank: {
    title: "What matters to colleges?",
    intro: "Here are the same eight factors in a mixed-up order. Rank them the way you think a college would, from most important at the top to least important at the bottom. Use the arrow buttons to move a card, or drag it with your mouse.",
    listLabel: "Your ranking of the eight factors",
    positionLabel: "Rank",
    moveUp: "Move \"{name}\" up",
    moveDown: "Move \"{name}\" down",
    moved: "{name} is now number {pos} of {total}.",
    atTop: "{name} is already at the top.",
    atBottom: "{name} is already at the bottom.",
    reset: "Start over",
    resetDone: "The cards are back in a mixed-up order.",
    show: "Show me",
    hide: "Hide the answer",
    revealTitle: "So what is the real order?",
    revealParas: [
      "There is no single right answer. Every college weighs these factors a little differently, and that is exactly what holistic review means. A small arts college and a big state university are looking for different things.",
      "Still, two factors sit near the top of the list at almost every college: **the grades you earn in challenging classes** and **the strength of your schedule**. Colleges want to see that you chose rigorous classes and did well in them, year after year."
    ],
    revealYou: "You placed these two factors at",
    revealAnd: "and",
    // The two factor ids the reveal points out.
    topIds: ["rigor", "grades"],
    reflectTitle: "Think about it",
    reflectLead: "Talk these over with a classmate or just think them through. Nothing here is collected.",
    prompts: [
      "Which factors surprised you?",
      "Which can you start building now?"
    ]
  },

  // ---------- C. Your high school transcript ----------
  transcript: {
    title: "Your high school transcript",
    lead: "Your transcript is the record colleges will read most closely. Here is how to find yours and what it shows.",
    findTitle: "Find it in MoeCampus",
    steps: [
      "Log in to MoeCampus.",
      "Open the **Progress** tab.",
      "Select your transcript."
    ],
    whatTitle: "What it shows",
    facts: [
      { title: "Every class and grade", text: "Your transcript is a record of the classes you take and the grades you earn, sorted by school year." },
      { title: "GPA on a 4.0 scale", text: "Your GPA is reported two ways, unweighted and weighted, both by year and cumulative (all years added together)." },
      { title: "What weighted means", text: "Weighting adds quality points to your grade for honors and AP classes. The same letter grade is worth more in a harder class, so your weighted GPA can be higher than your unweighted GPA." }
    ],
    gold: {
      title: "Starting now",
      text: "Every grade you earn from here on becomes part of the transcript colleges will see. Sophomore year counts."
    },
    links: [
      { text: "GPA Calculator", href: "gpa-calculator.html", desc: "See how your weighted and unweighted GPA are figured." },
      { text: "Course Planner", href: "course-planner.html", desc: "Plan a schedule that shows colleges your best work" }
    ]
  },

  // ---------- D. Keep exploring ----------
  next: {
    title: "Keep exploring",
    intro: "Try these when you want to go a step further.",
    links: [
      { text: "GPA Calculator", href: "gpa-calculator.html", desc: "Try out how different grades change your GPA." },
      { text: "Course Planner", href: "course-planner.html", desc: "Map out your classes for the rest of high school." },
      { text: "College Exploration", href: "college-exploration.html", desc: "Learn about colleges and what to look for." },
      { text: "Know Yourself", href: "know-yourself.html", desc: "Exercises on your strengths, values, and interests." }
    ]
  }
};
