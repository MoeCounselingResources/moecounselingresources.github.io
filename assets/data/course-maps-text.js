/* =========================================================================
   EXPLORE COURSES AND PATHWAYS — the words on course-maps.html (tab names, buttons, help text).
   The courses and pathways themselves are in assets/data/course-maps.js (instructions at the top of that file).
   Logic: assets/js/course-maps.js · Look: assets/css/course-maps.css

   TO EDIT WORDING: change the text between the quotation marks. Keep the quotation marks, commas, and braces.
   To use a quotation mark inside text, write \" instead of ".
   Nothing on this page saves anything. {n}-style words in braces are filled in by the page; leave them as they are.
   ========================================================================= */

const CM_TEXT = {
  title: "Explore Courses and Pathways",
  stage: "School Counseling",
  footer: "Course information comes from the Curriculum Guide. Always check with your counselor before you register.",

  intro: "See how Moeller courses connect and what a four-year path can look like. Pathways are ideas, not requirements.",

  tabs: [
    { id: "explorer", label: "Pathway explorer", area: "pathway explorer" },
    { id: "web", label: "Course web", area: "course web" },
    { id: "cards", label: "Timeline cards", area: "timeline cards" }
  ],
  tabBarLabel: "Views",
  tabSelectLabel: "Choose a view",

  expand: "Expand",
  collapse: "Collapse",
  expandAria: "{action} the {area} area",
  print: "Print",
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

  explorer: {
    heading: "Pathway explorer",
    help: "Tap a pathway to see a four-year course sequence. Tap it again to close it.",
    opened: "{name} opened. The four-year plan is below.",
    closed: "{name} closed.",
    panelHint: "Four-year plan",
    tilesLabel: "Pathways"
  },

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
    cardsLabel: "Pathway cards"
  }
};
