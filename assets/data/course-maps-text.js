/* =========================================================================
   COURSE TIMELINES AND CONNECTIONS — the words on course-maps.html (the pathway explorer now lives in the Course Planner) (tab names, buttons, help text).
   The courses and pathways themselves are in assets/data/course-maps.js (instructions at the top of that file).
   Logic: assets/js/course-maps.js · Look: assets/css/course-maps.css

   TO EDIT WORDING: change the text between the quotation marks. Keep the quotation marks, commas, and braces.
   To use a quotation mark inside text, write \" instead of ".
   Nothing on this page saves anything. {n}-style words in braces are filled in by the page; leave them as they are.
   ========================================================================= */

const CM_TEXT = {
  title: "Course timelines and connections",
  stage: "School Counseling",
  footer: "Course information comes from the Curriculum Guide. Always check with your counselor before you register.",

  intro: "See how courses connect and browse pathway timelines.",
  planner: { text: "Ready to build your plan? Open the Course Planner.", href: "course-planner.html" },

  tabs: [
    { id: "web", label: "Course web", area: "course web" },
    { id: "cards", label: "Timeline cards", area: "timeline cards" }
  ],
  tabBarLabel: "Views",
  tabSelectLabel: "Choose a view",

  expand: "Expand",
  collapse: "Collapse",
  expandAria: "{action} the {area} area",
  print: "Print",
  printLegendTitle: "Course key (the numbers on the circles)",
  printAria: "Print the {area}",

  gradeNames: ["Grade 9", "Grade 10", "Grade 11", "Grade 12"],
  legend: {
    label: "How courses are shown",
    key: "Key course for this pathway",
    req: "Required or core course",
    opt: "Elective option"
  },
  keyWord: "Key course",
  optWord: "Elective",
  cocurrTitle: "Co-curricular clubs",

  web: {
    heading: "Course web",
    help: "Each circle is a course. A bigger circle unlocks more courses. Tap a circle, or pick a course from the list, to see what it needs and what it leads to.",
    filterLabel: "Show one department",
    all: "All departments",
    pickLabel: "Pick a course to see what it needs and unlocks",
    pickNone: "No course picked",
    reset: "Start over",
    mapLabel: "Course map. Circles are courses, arranged by the grade they are first taken. Use the course picker above to explore with a keyboard or screen reader.",
    scrollLabel: "Course map, scrolls sideways and up and down",
    cleared: "Selection cleared.",
    gradeLevel: "Grade level",
    dept: "Department",
    prereq: "Needs first",
    unlocks: "Unlocks",
    none: "Nothing listed",
    noPrereq: "Nothing listed",
    note: "Note",
    bigger: "Bigger circle = unlocks more courses. Colors show departments (see the buttons above). Tap empty space or press Start over to clear."
  },

  cards: {
    heading: "Timeline cards",
    help: "One card per pathway. Use the buttons to show only the pathways you want, then print the set.",
    filterLabel: "Show these pathways",
    showAll: "Show all pathways",
    allShown: "Showing all {n} pathways.",
    someShown: "Showing {n} of {total} pathways.",
    badge: "{n} of {total} shown",
    cardsLabel: "Pathway cards"
  }
};
