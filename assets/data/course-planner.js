/* =========================================================================
   COURSE PLANNER — every word on course-planner.html lives in this file.
   (The logic is assets/js/course-planner.js; the look is assets/css/course-planner.css.
   The courses come from assets/data/course-catalog.js and the graduation rules, sequences,
   pathways, and programs come from assets/data/course-rules.js. Update those each year from
   the Curriculum Guide; this file is only the planner's own wording.)

   TO EDIT WORDING: change the text between the quotation marks. Keep the quotation marks, commas,
   and braces. To use a quotation mark inside text, write \" instead of ".
   Words in curly braces such as {course} or {grade} are filled in by the page; keep them.

   SAVED PLANS: the planner saves only the graduation year, the two starting levels, the PE waiver
   checkbox, and the chosen courses (grade + course id) in the student's own browser under the key in
   storage.key ("moeller-ex-course-plan"). Don't change the key, or saved plans disappear.
   Nothing is ever sent anywhere.
   ========================================================================= */

const COURSE_PLANNER_TEXT = {

  title: "Course Planner",
  stage: "Planning tool",
  back: { text: "← Back to School Counseling", href: "school-counseling.html" },
  intro: "Build your four-year plan, track your requirements, and explore pathways.",
  footer: "Based on the Moeller Curriculum Guide. This is a planning tool, not a schedule. Your plan is saved only on this device.",
  footerBack: { text: "Back to the School Counseling hub", href: "school-counseling.html" },

  jump: {
    label: "Jump to a section",
    items: [
      {id: "cp-start", text: "Start"},
      {id: "cp-grid-sec", text: "My plan"},
      {id: "cp-path-sec", text: "Explore pathways"},
      {id: "cp-conn-sec", text: "Connections"},
      {id: "cp-prog-sec", text: "Programs"}
    ]
  },
  disclaimerLabel: "Please read",
  missingData: "The course list has not loaded, so the planner cannot start. Reload the page, or ask the counseling office if this keeps happening.",

  /* ---------- Start ---------- */
  start: {
    title: "Start your plan",
    gradYearLabel: "Graduation year",
    mathLabel: "Starting math level (9th grade)",
    scienceLabel: "Starting science level (9th grade)",
    trackOption: "{track} track",
    typical: "Start from a typical plan",
    blank: "Start blank",
    typicalHint: "A typical plan fills every year with the usual courses at the levels you picked. Groups such as a world language become a choice for you to make.",
    replaceConfirm: "This replaces the courses already in your plan. Continue?",
    replaceYes: "Yes, replace my plan",
    replaceNo: "Keep my plan",
    typicalDone: "Typical plan loaded. {n} courses added; {c} choices are waiting for you in the grid.",
    blankDone: "Plan cleared. Add courses from the grid.",
    yearChanged: "Graduation year set to {year}.",
    levelChoice: "{subject} ({track} track)"
  },

  /* ---------- Grid ---------- */
  grid: {
    title: "My four-year plan",
    intro: "Each row is a graduation requirement, each column a year. Use Add to pick a course; tap a course to see what it needs and where it leads.",
    levelsBtn: "?",
    levelsBtnLabel: "What do the course levels mean?",
    levelsTitle: "Levels explained",
    levelsClose: "Close",
    statusHead: "Status",
    scrollHint: "Swipe the grid sideways (or use the arrow keys) to see all four years. The Subject and Status columns stay in view.",
    dotsHint: "A dot turns green when you have planned enough credits and any required core courses for that subject.",
    subjectHead: "Subject",
    gradeHead: "{n}th grade",
    gradeHeadShort: "Grade {n}",
    minHead: "Minimum",
    totalHead: "My total",
    yearTabsLabel: "Choose a year to view",
    yearTab: "{n}th",
    rows: [
      { key: "Religion", label: "Religion" },
      { key: "English", label: "English" },
      { key: "Mathematics", label: "Math" },
      { key: "Science", label: "Science" },
      { key: "Social Studies", label: "Social Studies" },
      { key: "World Language", label: "World Language" },
      { key: "Fine Arts", label: "Fine Arts" },
      { key: "Financial Literacy", label: "Financial Literacy" },
      { key: "Oral Communications", label: "Oral Communications" },
      { key: "Health", label: "Health & Wellness" },
      { key: "Physical Education", label: "Physical Education (or waiver)" },
      { key: "Electives", label: "Electives" }
    ],
    otherRow: { key: "__other", label: "Extra courses (not counted in the 25)" },
    add: "Add",
    addLabel: "Add a {subject} course for {grade}",
    choose: "Choose: {label}",
    chooseLabel: "Choose a course for {label} in {grade}",
    chipLabel: "{course}, {level}, {credits}. Open details",
    remove: "Remove",
    removeLabel: "Remove {course} from {grade}",
    removed: "Removed {course} from {grade}.",
    added: "Added {course} to {grade}.",
    duplicate: "{course} is already in your plan for {grade}.",
    yearTotal: "Credits this year",
    yearTotalRow: "Total credits per year",
    yearMin: "Minimum of {n} credits",
    credits: "{n} credits",
    credit1: "1 credit",
    waiverCell: "Met by waiver",
    flagMark: "Needs a look",
    flagged: "{course} has a note. See Connections below."
  },

  /* ---------- Picker ---------- */
  picker: {
    title: "Add a course for {grade}",
    titleChoice: "{label} for {grade}",
    deptLabel: "Department",
    allDepts: "All departments",
    eligibleLabel: "Only show courses open to {grade}",
    rowOnlyLabel: "Only show courses that count toward {subject}",
    searchLabel: "Search by course name",
    searchPlaceholder: "Type part of a name",
    count: "{n} courses",
    count1: "1 course",
    none: "No courses match. Try another department or turn off the grade filter.",
    addBtn: "Add",
    addBtnLabel: "Add {course} ({level}) to {grade}",
    inPlan: "In plan",
    gradesLine: "Open to grades {grades}",
    close: "Close",
    hint: "Courses are listed as they appear in the Curriculum Guide. Levels are decided with teachers each year."
  },

  /* ---------- Details ---------- */
  details: {
    level: "Level",
    credits: "Credits",
    term: "Term",
    terms: { year: "Full year", semester: "One semester", summer: "Summer", online: "Online" },
    grades: "Open to",
    counts: "Counts toward",
    countsNone: "Does not count toward a graduation requirement",
    countsMoeTerm: "MoeTerm (pass/fail, not counted in your 25 credits)",
    requires: "Requires",
    requiresNone: "No prerequisite listed",
    requiresAny: "Requires one of",
    recommended: "Recommended first",
    coreqAny: "Taken with one of",
    online: "(online)",
    coreq: "Taken with",
    leadsTo: "What this leads to",
    leadsToNone: "Nothing in the catalog lists this course as a prerequisite.",
    page: "Curriculum Guide page {n}",
    planned: "In your plan for {grade}",
    remove: "Remove from {grade}",
    close: "Close"
  },

  /* ---------- Tracker ---------- */
  tracker: {
    title: "Graduation requirements",
    intro: "Updates as you add courses. Counts credits only; your counselor confirms what you have actually earned.",
    total: "Total credits: {have} of {need}",
    totalDone: "Total credits: {have} of {need}. You have reached the minimum.",
    totalOver: "Total credits: {have} of {need}. Planning more than the minimum is normal.",
    row: "{subject}: {have} of {need}",
    rowDone: "{subject}: {have} of {need}, done",
    rowWaiver: "Physical Education: met by waiver",
    stillNeed: "still need {n} more",
    stillNeedList: "still need {list}",
    statusDone: "Done",
    statusOpen: "Still needed",
    yearsTitle: "Credits each year",
    year: "{grade}: {have} of {need}",
    yearDone: "{grade}: {have} of {need}, done",
    yearShort: "{grade}: {have} of {need}, still need {n}",
    classesPerSemester: "Students take {n} classes each semester.",
    rulesTitle: "Specific rules",
    mathEveryYear: { ok: "Math every year: done.", missing: "Math every year: no math planned for {grades}." },
    scienceCore: { ok: "Science core: Biology, Chemistry, and Physics or Earth Science are all planned.", missing: "Science core: still need {list}." },
    ssCore: { ok: "Social Studies core: US History, World History, and Government are all planned.", missing: "Social Studies core: still need {list}." },
    worldLang: { ok: "World language: {n} years of {lang}.", encouraged: "World language: {n} years of {lang}; a third year is encouraged.", missing: "World language: {n} year of {lang} so far; two years of the same language are required.", none: "World language: none planned yet; two years of the same language are required." },
    or: "or",
    moeTermTitle: "MoeTerm",
    moeTerm: "MoeTerm (pass/fail, not counted in your 25 credits): {have} of {need}, based on the {n} years in this plan ({per} each year).",
    moeTermDone: "MoeTerm (pass/fail, not counted in your 25 credits): {have} of {need}, done.",
    waiverTitle: "PE waiver",
    waiverLabel: "I plan to use the PE waiver (two full seasons of a Moeller sport, or marching band for two school years)",
    waiverSports: "Sports and activities that qualify:",
    waiverPage: "Curriculum Guide page {n}",
    rulePage: "(p. {n})"
  },

  /* ---------- Connections ---------- */
  connections: {
    title: "Connections",
    intro: "Nothing here blocks you. These are things to ask a counselor about before registration.",
    notesTitle: "Notes from the guide",
    none: "No notes. Every planned course has what it needs in an earlier year and is open to that grade.",
    prereqMissing: "{course} ({grade}) lists {prereq} as a prerequisite, but {prereq} is not in your plan.",
    prereqLate: "Plan {prereq} before {course} ({grade}). Right now {prereq} is in {prereqGrade}.",
    prereqNote: "{course}: {note}",
    prereqAnyMissing: "{course} ({grade}) needs one of {list} first, but none of them is in your plan.",
    prereqAnyLate: "{course} ({grade}) needs one of {list} in an earlier year, but none of them is planned before it.",
    gradeOff: "{course} is planned for {grade}, but the guide lists it for {grades}.",
    nextTitle: "What usually comes next",
    nextIntro: "From the math and science sequences in the guide, based on the courses in your plan.",
    nextNone: "Add a math or science course and suggestions will appear here.",
    nextLine: "After {course} in {grade}: {next} in {nextGrade}.",
    nextAdd: "Add {course} to {grade}",
    sequenceNotes: "Sequence notes"
  },

  /* ---------- Pathways ---------- */
  pathways: {
    title: "Pathway explorer",
    intro: "Curious about a field? Pick an interest to see a sample course path from the guide, then add any of it to your plan.",
    pickLabel: "Interest",
    pickPlaceholder: "Choose an interest",
    addOne: "Add to my plan",
    addOneLabel: "Add {course} to {grade}",
    addOneTo: "Add to {grade}",
    rangeLabel: "{a} or {b}",
    juniorSenior: "Junior and/or Senior",
    addAll: "Add all to my plan",
    addedAll: "Added {n} courses from the {name} pathway. {skipped} were skipped: already planned, a choice to make yourself, or not in the course list. Courses listed for two years went in the first year they are open to.",
    clubs: "Co-curriculars",
    noCourses: "Nothing listed for this year.",
    unmatched: "{title} (not in the course list)",
    page: "Curriculum Guide page {n}",
    hubTitle: "Burns Innovation Hub course maps",
    hubIntro: "The guide shows these as charts. Here each course is a list item with what it needs first and where it leads.",
    hubGrades: "Grades {grades}",
    hubGroup: "Part of: {group}",
    hubPrereq: "Needs first: {list}",
    hubRecommended: "Recommended first: {list}",
    hubCoreq: "Taken with: {list}",
    hubLeads: "Leads to: {list}",
    hubLeadsOptional: "(optional path)",
    hubNone: "none"
  },

  /* ---------- Programs & levels ---------- */
  programs: {
    title: "Programs and recognitions",
    intro: "Some plans aim at more than the diploma. Each item names its Curriculum Guide page.",
    page: "p. {n}",
    link: "Open the state's page",
    levelsTitle: "Levels explained",
    apFee: "AP exam fee",
    ccp: "College Credit Plus",
    registrationTitle: "How registration works",
    registrationPage: "Curriculum Guide page {n}"
  },

  /* ---------- Hero requirement pills and the Status column ---------- */
  hero: {
    pillsLabel: "Requirement summary. Choose one to jump to its row in the grid.",
    pillLabel: "{name}: {state}. Jump to this row in the grid.",
    // rows = which grid rows the pill covers (keys from grid.rows); "Other" covers the smaller requirements together
    pills: [
      { label: "Religion", rows: ["Religion"] },
      { label: "English", rows: ["English"] },
      { label: "Math", rows: ["Mathematics"] },
      { label: "Science", rows: ["Science"] },
      { label: "Social Studies", rows: ["Social Studies"] },
      { label: "World Language", rows: ["World Language"] },
      { label: "Fine Arts", rows: ["Fine Arts"] },
      { label: "Other requirements", rows: ["Financial Literacy", "Oral Communications", "Health", "Physical Education", "Electives"] }
    ]
  },
  status: {
    met: "{subject}: requirement met",
    progress: "{subject}: requirement in progress",
    notMet: "{subject}: requirement not met",
    stateMet: "met",
    stateProgress: "in progress",
    stateNotMet: "not met yet",
    onTrack: "✓ On track",
    needed: "{n} credits needed",
    needed1: "1 credit needed",
    overall: "Overall status: {text}",
    none: "—",
    noneLabel: "No requirement for this row",
    overallPrefix: "Overall status:",
    stillNeeded: "Still needed: {list}",
    needLanguage: "{n} years of the same language",
    coreNeeded: "Core courses still needed"
  },

  /* ---------- Explore pathways (tiles, from assets/data/course-maps.js) ---------- */
  explore: {
    title: "Explore pathways",
    subtitle: "See what a four-year path looks like, then add courses to your plan.",
    tilesLabel: "Pathways",
    panelHint: "Four-year plan",
    gradeNames: ["Grade 9", "Grade 10", "Grade 11", "Grade 12"],
    keyWord: "Key course",
    optWord: "Elective",
    legendLabel: "How courses are shown",
    legendKey: "Key course for this pathway",
    legendReq: "Required or core course",
    legendOpt: "Elective option",
    clubs: "Co-curricular clubs",
    add: "Add to my plan",
    addLabel: "Add {course} to my plan",
    choose: "Choose…",
    chooseLabel: "Choose which {course} to add to my plan",
    chooseTitle: "{label} for {grade}",
    already: "Already planned",
    alreadyLabel: "{course} is already planned",
    noMatch: "Not in the planner's course list",
    breadcrumb: "Viewing: {name} pathway",
    breadcrumbClear: "Clear pathway",
    breadcrumbClearLabel: "Clear the {name} pathway",
    opened: "{name} pathway opened.",
    closed: "{name} pathway closed.",
    addedLive: "Added {course} to {grade}."
  },

  /* ---------- Course connection panel ---------- */
  panel: {
    label: "Course details",
    dept: "Department",
    level: "Level and credits",
    levelLine: "{level} · {credits}",
    prereq: "Prerequisites",
    prereqNone: "No prerequisite listed",
    prereqAny: "one of: {list}",
    unlocks: "What this course unlocks",
    unlocksNone: "Nothing in the course list requires this course.",
    pathways: "Pathways that include this course",
    pathwaysNone: "Not in any of the eight pathways.",
    planned: "In your plan for {grade}",
    remove: "Remove from plan",
    removeLabel: "Remove {course} from {grade}",
    close: "Close",
    closeLabel: "Close course details",
    handle: "Drag down to close",
    removedLive: "Removed {course} from {grade}."
  },

  /* ---------- Programs accordion ---------- */
  accordion: {
    hubTitle: "Burns Innovation Hub course maps",
    registrationTitle: "How registration works"
  },

  /* ---------- Matching pathway course names to the planner's course list ----------
     course-maps.js names courses in plain words; the planner's list (course-catalog.js) uses ids. Most names match on their
     own once level codes (CP1, CP2, CCP) and punctuation are ignored. This list covers the rest.
       "Name": "id"                      -> that one course
       "Name": ["id1", "id2"]            -> the same course at different levels; the first that fits the grade is added
       "Name": { choose: ["id1", ...] }  -> a real choice; the student picks from a short list
       "Name": { row: "Fine Arts" }      -> any course from that grid row; the picker opens for that grade
       "Name": null                      -> not in the planner's course list (shown as a note, no Add button)
     Keep the names exactly as they appear in assets/data/course-maps.js. */
  pathwayMatch: {
    "Business Applications": ["business-apps-cp1", "business-apps-h"],
    "Portfolio Management Honors": "portfolio-mgmt-1-hp",
    "Portfolio Management Honors II": "portfolio-mgmt-2-hp",
    "AP English": { choose: ["ap-english-lit", "ap-english-lang"] },
    "AP English Language": "ap-english-lang",
    "Art and Pop Culture: Design/Branding": "art-pop-culture-cp1",
    "Negotiations and Advanced Rhetoric": "geopolitical-negotiations-h",
    "AP Seminar": "eng2-ap-seminar",
    "Intro to Media Production": null,
    "Creative Writing": "eng4-creative-writing-cp1",
    "Journalism": "eng4-journalism-cp1",
    "Religion IV": { choose: ["rel4-community-service-cp1", "rel4-spirituality-cp1", "rel4-religious-themes-fiction-h"] },
    "Fine Arts": { row: "Fine Arts" },
    "Fundamentals of IT CCP": "fundamentals-it-ccp",
    "Fundamentals of Web Dev CCP": "fundamentals-web-dev-ccp",
    "AI: Uses and Applications": "ai-uses-cp1",
    "Database Management I CCP": "database-mgmt-ccp",
    "Intro to AI CCP": "intro-ai-ccp",
    "REALab: Design + Build Lab II": "realab-design-build2-cp1",
    "Engineering Design Thinking I CCP": "eng-design1-ccp",
    "Engineering Design Thinking II CCP": "eng-design2-ccp",
    "World Language I": { choose: ["spanish-1-cp1", "french-1-cp1", "german-1-cp1", "latin-1-cp1"] },
    "World Language II": { choose: ["spanish-2-cp1", "french-2-cp1", "german-2-cp1", "latin-2-cp1"] },
    "AP World Language": { choose: ["ap-spanish", "ap-french", "ap-german", "ap-latin"] },
    "Molecular Biology Research Honors": "molecular-bio-research-hp",
    "AP US History": "ap-us-history",
    "AP World History": "ap-world-history",
    "AP US Government": "ap-us-gov",
    "Catholic Teaching in a Contemporary World": null,
    "Studio Art I": "studio-art-1-cp1",
    "Studio Art II": "studio-art-2-h",
    "AP 2D Design": { choose: ["ap-2d-design-studio", "ap-2d-design-digital"] },
    "Photography": "photography-cp1",
    "AP Studio Art: Drawing": "ap-drawing",
    "Yearbook": ["yearbook1-cp1", "yearbook1-sem-cp1"]
  },

  /* ---------- Save, print, download ---------- */
  storage: {
    key: "moeller-ex-course-plan",
    saved: "Saved on this device.",
    blocked: "Saving is blocked in this browser, so your plan will disappear when you leave. You can still print or download it.",
    loaded: "Your saved plan is back. {n} courses.",
    dropped: "{n} saved courses were not in this year's course list and were left out.",
    privacy: "Your plan is saved in this browser on this device; anyone using this browser can see it. Your plan is never sent anywhere. The Excel download loads a spreadsheet tool from the internet when you click it.",
    clear: "Clear my data",
    clearConfirm: "Remove your whole plan from this device?",
    clearYes: "Yes, clear it",
    clearNo: "Keep it",
    cleared: "Your plan was cleared from this device."
  },
  actions: {
    print: "Print my plan",
    excel: "Download as Excel",
    excelBusy: "Preparing…",
    excelOffline: "The Excel download needs an internet connection. Try again, or use Print instead.",
    excelDone: "Spreadsheet downloaded.",
    excelFile: "My-Course-Plan.xlsx",
    sheetName: "Student Sheet"
  },
  sheet: {
    title: "My Four-Year Course Plan",
    nameLine: "Student name:",
    yearLine: "Expected graduation year:",
    subject: "Subject",
    gradeCol: "{n}th Grade",
    creditsCol: "{n}th Grade Credits",
    minCol: "Credits Required (min)",
    totalCol: "Student's Total",
    yearRow: "Total Credits/Year",
    yearMin: "Minimum of {n} credits required",
    waiver: "Waiver",
    minOrWaiver: "{n} or Waiver",
    moeTermRow: "MoeTerm (pass/fail, not counted in your 25 credits)",
    moeTermValue: "{have} of {need}",
    notes: "Notes:",
    levels: "Starting levels: math {math}, science {science}",
    empty: "—"
  }
};
