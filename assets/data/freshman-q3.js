/* =========================================================================
   FRESHMAN FOUNDATIONS, QUARTER 3 — every word on freshman-foundations-q3.html lives in this file.
   (The logic is assets/js/freshman-q3.js; the look is assets/css/freshman-q1.css plus freshman-q3.css.)

   TO EDIT WORDING: change the text between the quotation marks. Keep the quotation marks, commas, and
   braces. To use a quotation mark inside text, write \" instead of ".

   FACTS ABOUT COURSES are NOT in this file. The registration steps, academic levels, graduation minimums,
   and planning rules are read from assets/data/course-rules.js (COURSE_RULES), which comes from the
   Curriculum Guide. Change them there so every page stays in step.

   SAVED ANSWERS: the "Before your registration meeting" checklist saves in the student's own browser
   under the key in checklist.key ("moeller-ex-q3-checklist"). Don't change the key, or saved checks
   disappear. Nothing is ever sent anywhere.
   ========================================================================= */

const FRESHMAN_Q3 = {

  title: "Freshman Foundations, Quarter 3: Course Registration and Planning",
  stage: "Freshman Foundations",
  back: { text: "← Back to Freshmen page", href: "freshmen.html" },
  footerBack: { text: "Back to the Freshmen page", href: "freshmen.html" },

  yearAhead: {
    title: "The year ahead",
    youAreHere: "You are here",
    quarters: [
      { label: "1st Quarter", text: "Study Skills and Adjusting to Life in High School" },
      { label: "2nd Quarter", text: "Self-Discovery and Exploring Post-secondary Opportunities" },
      { label: "3rd Quarter", text: "Course Registration Presentation and SCOIR Course Planner" },
      { label: "4th Quarter", text: "Mental Health Presentation" }
    ],
    current: 2
  },

  // Shown instead of the three guide-based sections if course-rules.js fails to load.
  rulesMissing: "The course rules could not be loaded, so the registration steps, levels, and requirements are not showing right now. Ask your counselor or check the Curriculum Guide.",
  guideSource: "Source: Curriculum Guide p.{page}",

  // ---------- 1. How registration works ----------
  registration: {
    title: "How registration works",
    lead: "Every year you choose next year's classes with your counselor. Here is how it goes from start to finish.",
    timelineLabel: "Registration timeline",
    timeline: [
      { label: "January", text: "Presentation, then your one-on-one meeting" },
      { label: "March", text: "Your family reviews your final requests" },
      { label: "After the deadline", text: "Changes generally are not allowed" }
    ],
    stepsTitle: "The steps",
    tip: "Teachers may suggest you move up or down a level based on how you are doing in their class right now. Your counselor talks that through with you."
  },

  // ---------- 2. Levels explained ----------
  levels: {
    title: "Levels explained",
    lead: "Moeller offers the same subject at different levels so the class fits you. You can mix levels, like Honors in one subject and CP1 in another.",
    pageNote: "Levels are described in the Curriculum Guide on p.4."
  },

  // ---------- 3. Your requirements at a glance ----------
  requirements: {
    title: "Your requirements at a glance",
    lead: "You need {total} credits to graduate. MoeTerm is also required, but it is pass/fail and is not counted in the {total} credits. Most year-long classes are worth 1 credit and semester classes are worth half a credit.",
    tableCaption: "Minimum credits for a diploma",
    colSubject: "Subject",
    colCredits: "Credits",
    totalRow: "Total credits",
    moeTermRow: "MoeTerm",
    moeTermShort: "Pass/fail, not counted in your 25 credits",
    rulesTitle: "Rules to remember",
    perYearTitle: "Credits each year",
    perYearLead: "Plan at least this many credits each year. Everyone takes seven classes each semester.",
    perYearLabel: "{grade}th grade",
    perYearValue: "{n} credits",
    ruleNeed: "Must include {list}.",
    ruleOneOf: "Plus one of: {list}.",
    ruleLang: "Take {years} years of the same world language. {encouraged} years is encouraged.",
    listAnd: " and ",
    cite: "Curriculum Guide p.6"
  },

  // ---------- 4. Course Planner ----------
  planner: {
    title: "Try the Course Planner",
    lead: "The Course Planner lets you map out all four years, see how your choices add up, and spot gaps before your registration meeting.",
    button: "Open the Course Planner",
    href: "course-planner.html",
    howTitle: "How to use it",
    steps: [
      "Pick your graduation year and the levels you expect to take.",
      "Start from the typical plan, then make it yours.",
      "Add or swap courses for each year.",
      "Watch the requirement tracker fill in as you go.",
      "Print your plan and bring it to your meeting."
    ],
    note: "The planner is for practice. Your official requirements come from the Curriculum Guide and your counselor."
  },

  // ---------- 5. Before your registration meeting ----------
  checklist: {
    title: "Before your registration meeting",
    key: "moeller-ex-q3-checklist",
    lead: "Check each one off as you get it done. Your checks stay on this device.",
    items: [
      { id: "plan", label: "Plan next year's classes in the Course Planner" },
      { id: "reqs", label: "Check your requirements and find any gaps" },
      { id: "pathway", label: "Look at one pathway that interests you" },
      { id: "questions", label: "Write down questions for your counselor" }
    ],
    progress: "{n} of {total} done",
    allDone: "All done. You are ready for your meeting.",
    print: "Print my checklist",
    clear: "Clear my checks",
    cleared: "Checks cleared.",
    saved: "Saved on this device.",
    blocked: "This browser is blocking saving, so your checks will be lost when you close this page.",
    privacy: "Your checks are saved in this browser on this device. Anyone who uses this same browser can see them. Use Clear my checks when you are done on a shared computer.",
    printTitle: "Before your registration meeting",
    printDone: "Done",
    printTodo: "To do",
    printNotes: "My questions for my counselor:"
  },

  // ---------- 6. Keep exploring ----------
  links: {
    title: "Keep exploring",
    intro: "These pages go with what you learned this quarter.",
    items: [
      { text: "Course Planner", desc: "Map out all four years and track your requirements.", href: "course-planner.html" },
      { text: "GPA Calculator", desc: "See how grades and levels add up.", href: "gpa-calculator.html" },
      { text: "CCP and AP", desc: "How to earn college credit while at Moeller.", href: "ccp-ap.html" },
      { text: "Know Yourself, Exercise 4", desc: "What fires you up? Use it to pick electives.", href: "know-yourself.html#fires" },
      { text: "Career Exploration", desc: "Match interests to careers and the classes that lead there.", href: "career-exploration.html" }
    ]
  }
};
