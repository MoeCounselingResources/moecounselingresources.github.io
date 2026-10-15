/* =========================================================================
   FRESHMAN FOUNDATIONS, QUARTER 3 — every word on freshman-foundations-q3.html lives in this file.
   (The logic is assets/js/freshman-q3.js; the look is assets/css/freshman-q1.css plus freshman-q3.css.
   The list of courses comes from assets/data/courses.js.)

   TO EDIT WORDING: change the text between the quotation marks. Keep the quotation marks, commas, and
   braces. To use a quotation mark inside text, write \" instead of ".
   Placeholder sections: when the Quarter 3 presentation content is ready, replace the "lines" of a
   section with the real wording (and tell the developer, since the placeholder box styling is for
   unfinished sections only).

   SAVED COURSES: the four-year planner saves only the chosen courses (grade, course name, level) in the
   student's own browser under the key in planner.key ("moeller-ex-planner"). Don't change the key, or
   saved plans disappear. Nothing is ever sent anywhere.
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

  planningOnly: "This planner is for planning only. Official requirements come from the Curriculum Guide and your counselor.",
  planningOnlyLabel: "Planning only",

  planner: {
    title: "Four-year course planner",
    key: "moeller-ex-planner",
    intro: "Try out a plan for each year of high school. Pick a department, then a course, then add it. Nothing here is a requirement or a recommendation. It only adds up the courses you choose.",
    grades: [
      { id: "9", label: "9th grade" },
      { id: "10", label: "10th grade" },
      { id: "11", label: "11th grade" },
      { id: "12", label: "12th grade" }
    ],
    deptLabel: "Department",
    deptPlaceholder: "Choose a department",
    courseLabel: "Course",
    coursePlaceholder: "Choose a course",
    levelLabel: "Level",
    add: "Add course",
    addNeedsCourse: "Choose a department and a course first.",
    added: "Added: {course}.",
    duplicate: "{course} is already in {grade}.",
    removed: "Removed: {course}.",
    remove: "Remove",
    removeLabel: "Remove {course} from {grade}",
    empty: "No courses added yet.",
    creditsWord: "credits",
    creditWord: "credit",
    yearTotal: "Credits this year",
    allTotal: "Total credits across all four years",
    levels: {
      H: "Honors",
      HP: "Honors Plus",
      PF: "Pass/fail",
      L1: "CP1 Level 1 math"
    },
    clear: "Clear planner",
    clearAsk: "Remove every course from all four years?",
    clearYes: "Yes, clear it",
    clearNo: "Keep my plan",
    cleared: "Planner cleared.",
    saved: "Saved on this device.",
    blocked: "This browser is blocking saving, so your plan will be lost when you close this page.",
    unavailable: "The course list could not be loaded, so the planner is not available right now.",
    privacy: "Your plan saves only on this device, and no one else can see it unless you show them.",
    print: "Print my plan",
    printTitle: "My four-year course plan",
    printEmpty: "No courses added.",
    printTotal: "Total credits across all four years"
  },

  placeholders: {
    badge: "Placeholder",
    line: "Content coming from the Quarter 3 presentation.",
    sections: [
      { id: "grad", title: "Graduation requirements" },
      { id: "register", title: "How registration works" },
      { id: "levels", title: "Choosing levels (CP/Honors/AP)" },
      { id: "scoir", title: "Using the SCOIR Course Planner" }
    ]
  }
};
