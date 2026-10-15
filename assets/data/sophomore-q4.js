/* =========================================================================
   SOPHOMORE FUTURE FOCUS, QUARTER 4 — every word on sophomore-future-focus-q4.html lives in this file.
   (The logic is assets/js/sophomore-q4.js; the look is assets/css/freshman-q1.css plus sophomore-q4.css.)

   TO EDIT WORDING: change the text between the quotation marks. Keep the quotation marks, commas, and
   braces. To use a quotation mark inside text, write \" instead of ". In text you can use **bold**.

   SAVED ROWS: the brag sheet drafter saves in the student's own browser under the key in brag.key
   ("moeller-ex-bragsheet"). Don't change the key, or saved rows disappear. Nothing is ever sent anywhere.
   ========================================================================= */

const SOPHOMORE_Q4 = {

  title: "Future Focus, Quarter 4: Wrap-up and Building a Resume",
  stage: "Future Focus",
  back: { text: "← Back to Sophomores page", href: "sophomores.html" },
  footerBack: { text: "Back to the Sophomores page", href: "sophomores.html" },

  yearAhead: {
    title: "The year ahead",
    youAreHere: "You are here",
    quarters: [
      { label: "1st Quarter", text: "Career Interests in SCOIR" },
      { label: "2nd Quarter", text: "Understanding Your Results" },
      { label: "3rd Quarter", text: "Exploring College Admissions" },
      { label: "4th Quarter", text: "Wrap-up and Building a Resume" }
    ],
    current: 3
  },

  // ---------- A. Brag sheet ----------
  brag: {
    title: "Create a brag sheet in SCOIR",
    paras: [
      "A brag sheet is a running list of what you do outside of class and what you have earned: clubs, sports, jobs, service, music, awards, and anything else you put real time into.",
      "Add your activities and achievements to SCOIR now, while they are fresh. When junior year starts, your list is ready for your resume, college applications, and the teachers who write about you."
    ],
    drafterTitle: "Draft it here first",
    drafterLead: "Use this drafter to get your list down. Then copy each row into SCOIR under Activities & Achievements when it is ready.",
    key: "moeller-ex-bragsheet",
    fields: [
      { id: "activity", label: "Activity", placeholder: "e.g. Robotics Club", wide: false },
      { id: "role", label: "Your role", placeholder: "e.g. Member, Captain, Volunteer", wide: false },
      { id: "years", label: "Years (grades)", placeholder: "e.g. 9–10", wide: false },
      { id: "hours", label: "Time per week", placeholder: "e.g. 3 hours", wide: false },
      { id: "did", label: "What you did or achieved", placeholder: "e.g. Built the drive train and placed 2nd at regionals", wide: true }
    ],
    rowLabel: "Activity {n}",
    addRow: "Add a row",
    removeRow: "Remove row {n}",
    removed: "Row removed.",
    added: "Row added.",
    maxRows: 30,
    maxLen: 400,
    full: "You have reached the limit of {max} rows. SCOIR is the best place for a longer list.",
    print: "Print my brag sheet",
    printTitle: "My brag sheet",
    printNote: "Drafted on the Moeller counseling site. Copy into SCOIR under Activities & Achievements.",
    nothing: "(blank)",
    clear: "Clear my data",
    clearAsk: "Clear every row from this browser? This cannot be undone.",
    clearYes: "Yes, clear it",
    clearNo: "Keep my rows",
    cleared: "Cleared. Your rows were removed from this browser.",
    saved: "Saved in this browser.",
    blocked: "This browser is blocking saving, so your rows will be lost when you close this page. Print or copy them into SCOIR before you leave.",
    privacy: "Your rows are saved in this browser on this device. Anyone using this browser can see them, so clear them when you finish on a shared computer. Nothing is sent anywhere.",
    scoirNote: "When a row is ready, copy it into SCOIR. SCOIR is the version your counselor and your future applications will use."
  },

  // ---------- B. ACT and SAT ----------
  tests: {
    title: "Understanding the ACT and SAT",
    paras: [
      "Colleges accept the ACT and the SAT equally. There is **no preference** for one test over the other, so pick the one that fits you better and focus on it.",
      "The best way to find your fit is to try both. Take a full practice test of each, under real timing, and compare how the scores and the experience felt."
    ],
    practice: { text: "Free practice tests for the ACT and SAT", href: "https://www.compassprep.com/practice-tests", note: "(opens in a new tab)" },
    page: { text: "Moeller's ACT and SAT page", href: "act-sat.html", desc: "Test dates, how to register, and prep resources." }
  },

  // ---------- C. PreACT and Diagnostic SAT ----------
  results: {
    title: "PreACT and the Diagnostic SAT",
    paras: [
      "This year you took the PreACT and a Diagnostic SAT. Both are practice versions of the real tests, so they are for planning, not for judging yourself.",
      "Your results show your strengths and your areas for growth in each section: reading, writing, math, and science. Look at which sections came easily and which ones need more practice.",
      "Understanding your results now helps you prepare for the tests that matter junior year. If one section lagged, that is the place to start your practice."
    ]
  },

  // ---------- D. Timeline ----------
  timeline: {
    title: "Recommended testing timeline",
    lead: "There is no need to begin testing until junior year. Here is the path most Moeller students follow.",
    steps: [
      { when: "Sophomore year", text: "No testing needed yet. Use your PreACT and Diagnostic SAT results to see where you stand." },
      { when: "Fall of junior year", text: "If you have already completed Algebra II, you can begin testing now." },
      { when: "October, junior year", text: "All juniors take the PSAT at Moeller." },
      { when: "November, junior year", text: "Take an at-home practice ACT." },
      { when: "March, junior year", text: "All juniors take the state SAT at Moeller. If you are taking Algebra II as a junior, this is your starting point." },
      { when: "Junior spring through senior fall", text: "Take either the ACT or the SAT 2–3 times, and no more than 4. Pick the test that fits you and stick with it." },
      { when: "Early October, senior year", text: "Finish testing so scores arrive before application deadlines." }
    ],
    notes: [
      "**ACT:** take it with the Science section. The optional writing section is not needed.",
      "Many colleges require test scores, so prepare for these tests and take them seriously."
    ]
  },

  // ---------- E. Junior year preview ----------
  next: {
    title: "Coming junior year: College Knowledge sessions",
    intro: "Junior year brings a series of College Knowledge sessions. Here is what they cover.",
    items: [
      "Understanding College Fit, College Research, Application Timeline, and SCOIR",
      "Mock Admissions Activity with Admissions Reps",
      "The College Search, College Visits, and Resume Writing",
      "Preparing for the ACT and SAT",
      "Course Registration and Exploring College Majors",
      "College Research and List Building, Teacher Recommendations",
      "SAT Pre-Administration and Understanding College Costs",
      "The College Essay",
      "The College Application"
    ],
    linksTitle: "Keep going",
    links: [
      { text: "Juniors page", href: "juniors.html", desc: "A preview of what junior year looks like." },
      { text: "Course Planner", href: "course-planner.html", desc: "Map out your classes for the next two years." },
      { text: "ACT and SAT page", href: "act-sat.html", desc: "Dates, registration, and prep options." }
    ]
  }
};
