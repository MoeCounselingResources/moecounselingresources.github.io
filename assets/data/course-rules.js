/* =========================================================================
   COURSE RULES for the Course Planner: graduation requirements, sequences, pathways, programs.
   Source: Archbishop Moeller Curriculum Guide 2026-2027 (page numbers are the guide's printed pages)
   plus the counselors' worksheet (per-year minimums and the notes under the student sheet).
   Course ids refer to assets/data/course-catalog.js. Wherever a list holds { choose:[ids], label }
   the student picks ONE of the ids. A { title:"..." } entry is a course the guide names but the catalog
   does not hold (for example "Organic Chem" on p.60).

   TO UPDATE EACH YEAR: check p.6 (credits and footnotes), p.7-8 (state requirements, honors diplomas,
   service hours, NCAA), p.9 (typical plan), p.10 (Latin Honors), p.11 (registration), p.31 and p.39
   (math and science sequences), p.55 (Global Scholars), pp.56-57 (hub charts), pp.58-61 (pathways),
   p.64 (PE waiver sports list). Keep the ids in sync with the catalog.
   ========================================================================= */

const COURSE_RULES = {

  // MoeTerm is a separate graduation requirement — pass/fail, not counted in the 25.
  totalCredits: 25,
  totalCreditsPage: 6,

  minimums: {
    "Religion": 4, "English": 4, "Mathematics": 4, "Science": 3, "Social Studies": 3,
    "World Language": 2, "Fine Arts": 1, "Electives": 2, "Financial Literacy": 0.5,
    "Health": 0.5, "Oral Communications": 0.5, "Physical Education": 0.5
  },
  minimumsPage: 6,

  moeTerm: {
    perYear: 0.25,
    byGradYear: { 2027: 0.5, 2028: 0.75, default: 1 },
    note: "MoeTerm is a pass/fail graduation requirement. It is not counted in your 25 credits and does not affect your GPA. You earn 0.25 MoeTerm credit for each academic year at Moeller. The Class of 2027 needs 0.5, the Class of 2028 needs 0.75, and the Class of 2029 and later need 1. Transfer students do not make up missed MoeTerm credits.",
    page: 6
  },

  perYearMin: { 9: 7, 10: 7, 11: 6, 12: 6 },
  perYearMinNote: "Minimum credits each year from the counselors' worksheet (7, 7, 6, 6).",
  perYearMinSource: "worksheet",
  classesPerSemester: 7,
  classesPerSemesterPage: 9,

  rules: [
    { id: "mathEveryYear", text: "Take a math class every year. Four math credits are required.", page: 6, source: "worksheet note and p.6" },
    { id: "scienceCore", need: ["Biology", "Chemistry"], oneOf: ["Physics", "Earth Science"], text: "Biology, Chemistry, and Physics or Earth Science are required for the three science credits. Colleges generally recommend a sequence of biology, chemistry, and physics.", page: 6, source: "worksheet note, p.6 footnote, p.39 chart" },
    { id: "ssCore", need: ["US History", "World History", "Government"], text: "US History, World History, and Government are required for the three social studies credits.", page: 9, source: "worksheet note and p.9 plan" },
    { id: "worldLangSame", years: 2, encouraged: 3, text: "Two years of the same world language are required. Three years are highly encouraged, and colleges generally recommend three credits in the same language.", page: 6 },
    { id: "oralCommRequired", text: "Oral Communications is a graduation requirement for the Class of 2027 and beyond. It does not count as an English credit.", page: 29 },
    { id: "freshmanFineArts", text: "Starting in 2026-27, freshmen complete the Fine Arts requirement with Band I, Chorus I, or Studio Art I for the full year, or one of two semester pairings: Music Technology with Art & Pop Culture, or Beginning Instrumental Music with 3D Art, Design and Sculpture.", page: 15 },
    { id: "electivesCount", text: "Courses the guide says do not meet a department's requirement (for example Oral Communications, Podcasting, Yearbook, Statistical Reasoning in Sports, Mathematical Modeling, Photography, Sports Management, Design Thinking) still count toward the two elective credits.", page: 6 },
    { id: "cancellation", text: "Courses can be cancelled when too few students request them, when schedules conflict, or when the schedule changes.", page: 11 }
  ],

  peWaiver: {
    text: "Students need 0.5 credit of Physical Education. Instead of the classes, a student can earn a PE waiver with two full seasons of a Moeller sport (they can be two different sports in one year, for example football and baseball), or with marching band for two school years. Marching band cannot be combined with a sport or a PE class, and only one waiver can be earned. Once the seasons are done, the waiver request goes to the school counseling office.",
    sports: ["Baseball", "Basketball", "Bowling", "Cross Country", "eSports", "Football", "Golf", "Hockey", "Lacrosse", "Tennis", "Track and Field", "Rugby", "Rugby 7s", "Soccer", "Swim/Dive", "Ultimate Frisbee", "Volleyball", "Wrestling"],
    bandRule: "Marching band for two school years also earns the waiver. It can't be combined with a sport or a PE class.",
    noMixing: "Students cannot satisfy the PE graduation requirement by earning a high school credit for one PE class combined with one sport/activity.",
    onlyOne: "Only one PE Waiver can be earned.",
    page: 64,
    alsoPages: [6, 36]
  },

  sequences: {
    math: {
      page: 31,
      note: "Most students start in Algebra I. Each track is read left to right, freshman to senior. Alternative sequences and summer options are below.",
      tracks: [
        { id: "honors-ode-tested-out", track: "Honors (tested out of Algebra I and Geometry, reaching Ordinary Differential Equations)", level: "Honors", years: { 9: ["alg2-trig-h"], 10: ["precalc-bc-h"], 11: ["ap-calc-bc"], 12: ["multivariable-calc-ccp", "ode-ccp"] } },
        { id: "honors-ode-summer-geo", track: "Honors (tested out of Algebra I, Summer Geometry, reaching Ordinary Differential Equations)", level: "Honors", years: { 9: ["alg2-trig-h", "summer-geometry-h"], 10: ["precalc-bc-h"], 11: ["ap-calc-bc"], 12: ["multivariable-calc-ccp", "ode-ccp"] } },
        { id: "honors-bc-tested-out", track: "Honors (tested out of Algebra I, reaching AP Calculus BC)", level: "Honors", years: { 9: ["alg2-trig-h"], 10: ["geometry-h"], 11: ["precalc-bc-h"], 12: ["ap-calc-bc"] } },
        { id: "honors-bc-summer-geo", track: "Honors (Summer Geometry, reaching AP Calculus BC)", level: "Honors", years: { 9: ["alg1-h", "summer-geometry-h"], 10: ["alg2-trig-h"], 11: ["precalc-bc-h"], 12: ["ap-calc-bc"] } },
        { id: "honors-bc-doubling", track: "Honors (doubling up sophomore year, reaching AP Calculus BC)", level: "Honors", years: { 9: ["alg1-h"], 10: ["geometry-h", "alg2-trig-h"], 11: ["precalc-bc-h"], 12: [{ choose: ["ap-calc-bc", "ap-calc-ab"], label: "AP Calculus BC or AB" }] } },
        { id: "honors-ab", track: "Honors (reaching AP Calculus AB)", level: "Honors", years: { 9: ["alg1-h"], 10: ["geometry-h"], 11: ["alg2-trig-h"], 12: [{ choose: ["ap-calc-ab", "calculus-cp1"], label: "AP Calculus AB or Calculus CP1" }] } },
        { id: "cp1", track: "College Prep 1", level: "CP1", years: { 9: ["alg1-cp1"], 10: ["geometry-cp1"], 11: ["alg2-trig-cp1"], 12: [{ choose: ["calculus-cp1", "precalc-cp1"], label: "Calculus CP1 or Pre-Calculus CP1" }] } },
        { id: "cp1-level1", track: "College Prep 1 Level 1", level: "CP1 Level 1", years: { 9: ["alg1-cp1-l1"], 10: ["geometry-cp1-l1"], 11: ["alg2-cp1-l1"], 12: [{ choose: ["trig-cp1-l1", "college-algebra-cp2"], label: "Trigonometry CP1 Level 1 or College Algebra CP2" }] } },
        { id: "cp2", track: "College Prep 2", level: "CP2", years: { 9: ["alg1-cp2"], 10: ["geometry-cp2"], 11: ["alg2-cp2"], 12: [{ choose: ["trig-cp1-l1", "college-algebra-cp2"], label: "Trigonometry CP1 Level 1 or College Algebra CP2" }] } }
      ],
      electives: ["ap-statistics", "math-modeling-h", "stat-reasoning-sports-cp1"],
      notes: [
        "Summer Geometry Honors is an online course (p.31; online Geometry Honors needs 93% or above in Algebra I Honors and a teacher recommendation, p.33). Taking it the summer after Algebra I Honors moves a student one year ahead, toward AP Calculus BC; combined with testing out of Algebra I it reaches Ordinary Differential Equations.",
        "Summer Pre-Calculus/Trigonometry for Advancement (honors weight) appears on the counselors' worksheet but not on the guide's sequence chart; ask the math department.",
        "Doubling up Geometry Honors and Algebra II and Trigonometry Honors in sophomore year also reaches AP Calculus BC (p.31).",
        "Mathematical Modeling Honors and Statistical Reasoning in Sports CP1 are electives that do not meet the Mathematics requirement (pp.34-35)."
      ]
    },
    science: {
      page: 39,
      note: "Read left to right, freshman to senior. Junior year on the Honors and CP1 tracks is an elective chosen from the list.",
      tracks: [
        { id: "honors", track: "Honors", level: "Honors", years: { 9: ["bio-h"], 10: ["chem-h"], 11: [{ choose: ["anatomy-physiology-cp1", "ap-environmental-science", "ap-biology", "ap-chemistry", "eng-design1-ccp", "eng-design2-ccp", "molecular-bio-research-hp", "ap-physics-1"], label: "Science elective" }], 12: ["ap-physics-1"] } },
        { id: "cp1", track: "College Prep 1", level: "CP1", years: { 9: ["bio-cp1"], 10: ["chem-cp1"], 11: [{ choose: ["anatomy-physiology-cp1", "ap-environmental-science", "ap-biology", "ap-chemistry", "eng-design1-ccp", "eng-design2-ccp", "molecular-bio-research-hp", "ap-physics-1"], label: "Science elective" }], 12: ["physics-cp1"] } },
        { id: "cp2", track: "College Prep 2", level: "CP2", years: { 9: ["bio-cp2"], 10: [], 11: ["chem-cp2"], 12: ["earth-science-cp2"] } }
      ],
      electivesByYear: {
        10: ["anatomy-physiology-cp1", "ap-environmental-science"],
        11: ["anatomy-physiology-cp1", "ap-environmental-science", "ap-biology", "ap-chemistry", "eng-design1-ccp", "eng-design2-ccp", "molecular-bio-research-hp", "ap-physics-1"],
        12: ["anatomy-physiology-cp1", "ap-environmental-science", "ap-biology", "ap-chemistry", "eng-design1-ccp", "eng-design2-ccp", "molecular-bio-research-hp", "ap-physics-c"]
      },
      notes: [
        "The CP2 track has no science in sophomore year on the p.39 chart; Chemistry CP2 is a junior course and Earth Science CP2 a senior course.",
        "Design Thinking and Design + Build Lab I are listed as science electives but do not meet the Science requirement (pp.41-42)."
      ]
    }
  },

  typicalPlan: {
    page: 9,
    note: "A typical sequence for a student in CP1 courses (p.9). Students take seven classes each semester; counselors build each plan individually. Religion I, Oral Communications, and Health and Wellness are the worksheet's freshman presets.",
    9: ["rel1-cp1", "eng1-cp1", "alg1-cp1", "bio-cp1",
        { choose: ["french-1-cp1", "german-1-cp1", "latin-1-cp1", "spanish-1-cp1"], label: "World Language I" },
        "oral-comm-cp1", "health-wellness-cp1",
        { choose: ["band-instrumental-h", "band-percussion-h", "chorus-1-cp1", "studio-art-1-cp1", "fr-arts-option-1", "fr-arts-option-2"], label: "Fine Arts" }],
    10: ["rel2-cp1",
        { choose: ["eng2-cp1", "eng2-ap-seminar"], label: "English II or AP Seminar" },
        "geometry-cp1", "chem-cp1",
        { choose: ["us-history-cp1", "ap-us-history"], label: "US History (CP or AP)" },
        { choose: ["french-2-cp1", "german-2-cp1", "latin-2-cp1", "spanish-2-cp1"], label: "World Language II" },
        "financial-literacy-cp1"],
    11: ["rel3-cp1",
        { choose: ["eng3-cp1", "ap-english-lit"], label: "English III or AP Literature" },
        "alg2-trig-cp1",
        { choose: ["anatomy-physiology-cp1", "ap-environmental-science", "ap-biology", "ap-chemistry", "eng-design1-ccp", "eng-design2-ccp", "molecular-bio-research-hp", "ap-physics-1"], label: "Science elective" },
        { choose: ["world-history-cp1", "ap-world-history"], label: "World History (CP or AP)" },
        { choose: ["french-3-h", "german-3-h", "latin-3-h", "spanish-3-h"], label: "World Language III (Honors)" }],
    12: [{ choose: ["rel4-community-service-cp1", "rel4-religious-themes-fiction-h", "rel4-spirituality-cp1", "world-religions-cp1", "phil-religion-h"], label: "Religion IV electives or Philosophy of Religion (H)" },
        { choose: ["eng4-comedy-satire-cp1", "eng4-contemporary-fiction-cp1", "eng4-creative-writing-cp1", "eng4-epic-fantasy-cp1", "eng4-gothic-horror-cp1", "eng4-journalism-cp1", "eng4-postmodern-lit-cp1", "eng4-sci-fi-cp1", "eng4-sports-writing-cp1", "ap-english-lang"], label: "English IV electives or AP Language" },
        "calculus-cp1", "physics-cp1",
        { choose: ["us-gov-cp1", "ap-us-gov"], label: "Government and one elective, or AP Government" }]
  },

  pathways: [
    { id: "business-finance", name: "Finance", group: "Business", page: 58,
      years: { 9: ["oral-comm-cp1"], 10: ["financial-literacy-cp1"], "11-12": ["investment-research-h", "portfolio-mgmt-1-hp", "geopolitical-negotiations-h", "calculus-cp1", "ap-microeconomics", "ap-psychology", "ap-statistics", { choose: ["ap-english-lit", "ap-english-lang"], label: "AP English" }] },
      clubs: ["Finance and Investment Club", "Speech and Debate Team", "Sports Analytics Club"] },
    { id: "business-general", name: "General Business", group: "Business", page: 58,
      years: { 9: ["oral-comm-cp1"], 10: ["financial-literacy-cp1", "business-apps-cp1", "design-thinking-cp1"], "11-12": ["entrepreneurship-cp1", "student-run-business-cp1", "art-pop-culture-cp1", "realab-business-cp1", "ap-microeconomics", "ap-psychology", "ap-statistics", { choose: ["ap-english-lit", "ap-english-lang"], label: "AP English" }] },
      clubs: ["Finance and Investment Club", "Speech and Debate Team", "Sports Analytics Club"] },
    { id: "communications", name: "Communications", group: "Communications", page: 58,
      years: { 9: ["oral-comm-cp1"], 10: ["geopolitical-negotiations-h", "eng2-ap-seminar"], "11-12": ["moeller-media-production-cp1", "podcasting-cp1", "eng4-creative-writing-cp1", { choose: ["ap-english-lit", "ap-english-lang"], label: "AP English" }, "eng4-journalism-cp1"] },
      clubs: ["Speech and Debate Team", "Squire (Creative Writing Club)", "Theatre"] },
    { id: "computer-science-it", name: "Computer Science and IT", group: "Computer Science / Info Tech", page: 59,
      years: { 9: [], 10: ["design-thinking-cp1", "hci-cp1", { choose: ["ai-uses-cp1", "intro-ai-ccp"], label: "Intro to AI" }, "business-apps-cp1"], "11-12": ["fundamentals-it-ccp", "game-design-ccp", "robotics-cp1", "fundamentals-web-dev-ccp", "computer-networking-ccp", "computer-programming-1-ccp", "database-mgmt-ccp", "sys-admin-ccp"] },
      clubs: ["IT Club", "Robotics Club", "3D Printing Club"] },
    { id: "engineering", name: "Engineering", group: "Engineering / Industrial Design", page: 59,
      years: { 9: [], 10: ["fundamentals-it-ccp", "design-thinking-cp1", { choose: ["chem-cp1", "chem-h"], label: "Chemistry" }, "design-build-lab1-cp1"], "11-12": ["ap-environmental-science", "anatomy-physiology-cp1", "ap-chemistry", "realab-design-build2-cp1", "eng-design1-ccp", "eng-design2-ccp", "calculus-cp1", "physics-cp1"] },
      clubs: ["Engineering Club", "Robotics Club", "3D Printing and Microelectronics Club"] },
    { id: "industrial-design", name: "Industrial Design", group: "Engineering / Industrial Design", page: 59,
      years: { 9: ["studio-art-1-cp1"], 10: ["studio-art-2-h", "digital-design-1-cp1", "design-thinking-cp1"], "11-12": ["design-build-lab1-cp1", "fundamentals-it-ccp", "3d-art-cp1", "realab-design-build2-cp1", "eng-design1-ccp", "robotics-cp1"] },
      clubs: ["Engineering Club", "Robotics Club", "3D Printing and Microelectronics Club"] },
    { id: "performing-arts", name: "Performing Arts", group: "Performing Arts", page: 60,
      years: { 9: ["chorus-1-cp1", { choose: ["band-instrumental-h", "band-percussion-h"], label: "Band" }, { choose: ["fr-arts-option-1", "fr-arts-option-2"], label: "Freshman Art Options" }], 10: ["chorus-2-cp1", { choose: ["band-instrumental-h", "band-percussion-h"], label: "Band" }, "guitar-cp1"], 11: ["chorus-3-cp1", { choose: ["band-instrumental-h", "band-percussion-h"], label: "Band" }, "moeller-media-production-cp1"], 12: ["varsity-singers-h", { choose: ["band-instrumental-h", "band-percussion-h"], label: "Band" }, "advanced-media-production-cp1"] },
      clubs: ["Marching Band", "Mass Band", "Theatre"] },
    { id: "life-science", name: "Life Science", group: "Sciences", page: 60,
      years: { 9: [{ choose: ["bio-cp1", "bio-h"], label: "Biology" }], 10: [{ choose: ["chem-cp1", "chem-h"], label: "Chemistry" }], 11: ["psychology-cp1", "anatomy-physiology-cp1", "ap-environmental-science"], 12: [{ choose: ["physics-cp1", "ap-physics-1"], label: "Physics (CP1 or AP)" }, "ap-biology", { title: "Organic Chem" }] },
      clubs: ["Bring Change to Mind Club", "Molecular Modeling Club", "Medical Sciences Club"] },
    { id: "physical-science", name: "Physical Science", group: "Sciences", page: 60,
      years: { 9: [{ choose: ["bio-cp1", "bio-h"], label: "Biology" }], 10: [{ choose: ["chem-cp1", "chem-h"], label: "Chemistry" }], 11: ["ap-environmental-science", "ap-chemistry"], 12: [{ choose: ["physics-cp1", "ap-physics-1"], label: "Physics (CP1 or AP)" }, "calculus-cp1", "ap-statistics"] },
      clubs: ["Bring Change to Mind Club", "Molecular Modeling Club", "Medical Sciences Club"] },
    { id: "social-sciences", name: "Social Sciences", group: "Social Sciences", page: 61,
      years: { 9: [], 10: ["anatomy-physiology-cp1", "ap-us-history"], "11-12": ["sociology-cp1", "ap-human-geography", "ap-world-history", "psychology-cp1", "ap-us-gov", "ap-statistics", { choose: ["ap-french", "ap-german", "ap-latin", "ap-spanish"], label: "AP World Language" }, { choose: ["world-religions-cp1"], label: "Catholic Teaching in a Contemporary World or World Religions" }] },
      clubs: ["Academic Team", "Bring Change to Mind Club", "Speech and Debate Team"] },
    { id: "graphic-communication", name: "Graphic Communication", group: "Visual Arts", page: 61,
      years: { 9: ["oral-comm-cp1"], 10: ["art-pop-culture-cp1", "digital-design-1-cp1", "hci-cp1"], "11-12": ["moeller-media-production-cp1", "eng4-creative-writing-cp1", "psychology-cp1", "advanced-media-production-cp1", { choose: ["yearbook1-cp1", "yearbook1-sem-cp1"], label: "Yearbook" }, "ap-2d-design-digital"] },
      clubs: ["Photography Club"] },
    { id: "studio-arts", name: "Studio Arts", group: "Visual Arts", page: 61,
      years: { 9: ["studio-art-1-cp1"], 10: ["studio-art-2-h", "digital-design-1-cp1", "design-thinking-cp1"], "11-12": ["ap-2d-design-digital", "photography-cp1", "3d-art-cp1", "ap-2d-design-studio", "ap-drawing"] },
      clubs: ["Photography Club"] }
  ],
  pathwaysNote: "The sample pathways are a guide for course planning. Students must meet the prerequisites for any course and should discuss their choices with their school counselor (p.58). Where the guide shows one 'Junior and/or Senior' column, those courses are listed under the key \"11-12\".",

  hubCharts: [
    { id: "business", title: "Business Pathways", page: 56,
      legend: "The charts have no printed key. Solid arrows connect a course to one that lists it as a prerequisite; dashed arrows show recommended or related next steps.",
      nodes: [
        { course: "financial-literacy-cp1", grades: [10, 11, 12] },
        { course: "investment-research-h", grades: [11, 12], prereq: ["Financial Literacy", "Honors Math", "Teacher recommendation"], group: "Student-Run Endowment" },
        { course: "portfolio-mgmt-1-hp", title: "Portfolio Management Honors I", grades: [11, 12], prereq: ["Investment Research", "Teacher recommendation"], group: "Student-Run Endowment" },
        { course: "business-apps-cp1", grades: [10, 11, 12], prereq: ["Sophomores with teacher approval"] },
        { course: "entrepreneurship-cp1", grades: [10, 11, 12], prereq: ["Sophomores with application and teacher approval"] },
        { course: "stat-reasoning-sports-cp1", grades: [11, 12], prereq: ["Algebra II"] },
        { course: "realab-business-cp1", grades: [11, 12], prereq: ["Business Applications", "One other business course", "Teacher recommendation"], note: "This course will pair with the other REALabs to create business recommendations for the associated product solutions." },
        { course: "student-run-business-cp1", title: "Student-Run Business (year)", grades: [10, 11, 12], prereq: ["Interview", "Other recommended courses"] },
        { course: "geopolitical-negotiations-h", grades: [10, 11, 12], prereq: ["Oral Communications"] },
        { course: "business-leadership-h", title: "Business Leadership Honors (year)", grades: [11, 12], prereq: ["Student Run Business"] },
        { course: "art-pop-culture-cp1", grades: [10, 11, 12], prereq: ["Design Thinking"] },
        { course: "design-thinking-cp1", grades: [10, 11, 12] }
      ],
      edges: [
        ["financial-literacy-cp1", "investment-research-h", "solid"],
        ["investment-research-h", "portfolio-mgmt-1-hp", "solid"],
        ["financial-literacy-cp1", "entrepreneurship-cp1", "dashed"],
        ["investment-research-h", "entrepreneurship-cp1", "dashed"],
        ["business-apps-cp1", "entrepreneurship-cp1", "solid"],
        ["business-apps-cp1", "student-run-business-cp1", "dashed"],
        ["design-thinking-cp1", "business-apps-cp1", "dashed"],
        ["design-thinking-cp1", "entrepreneurship-cp1", "dashed"],
        ["design-thinking-cp1", "student-run-business-cp1", "dashed"],
        ["art-pop-culture-cp1", "student-run-business-cp1", "dashed"],
        ["art-pop-culture-cp1", "entrepreneurship-cp1", "dashed"],
        ["entrepreneurship-cp1", "student-run-business-cp1", "dashed"],
        ["entrepreneurship-cp1", "realab-business-cp1", "dashed"],
        ["student-run-business-cp1", "business-leadership-h", "solid"]
      ],
      colorKey: ["The Arts", "Physical Prod/Science/Applied Tech", "Digital Products/IT/Applied Tech", "English", "Business", "Math"] },

    { id: "digital", title: "Digital Product Development Pathways", page: 56,
      legend: "The charts have no printed key. Solid arrows connect a course to one that lists it as a prerequisite; dashed arrows show recommended or related next steps.",
      nodes: [
        { course: "design-thinking-cp1", grades: [10, 11, 12] },
        { course: "hci-cp1", grades: [10, 11, 12], prereq: ["Design Thinking or Fundamentals of IT"] },
        { course: "fundamentals-it-ccp", title: "Fundamentals of IT (FIT) CCP", grades: [10, 11, 12] },
        { course: "fundamentals-web-dev-ccp", grades: [10, 11, 12], prereq: ["HCI or Fundamentals of IT"] },
        { course: "ai-uses-cp1", grades: [10, 11, 12], recommended: ["HCI or Fundamentals of IT"] },
        { course: "game-design-ccp", grades: [11, 12], recommended: ["HCI", "FIT"] },
        { course: "computer-programming-1-ccp", grades: [10, 11, 12], prereq: ["Fundamentals of IT"] },
        { course: "robotics-cp1", grades: [11, 12], prereq: ["HCI or Fundamentals of IT"] }
      ],
      edges: [
        ["design-thinking-cp1", "hci-cp1", "solid"],
        ["design-thinking-cp1", "fundamentals-web-dev-ccp", "dashed"],
        ["design-thinking-cp1", "fundamentals-it-ccp", "dashed"],
        ["fundamentals-it-ccp", "hci-cp1", "dashed"],
        ["fundamentals-it-ccp", "fundamentals-web-dev-ccp", "dashed"],
        ["fundamentals-it-ccp", "ai-uses-cp1", "dashed"],
        ["hci-cp1", "fundamentals-web-dev-ccp", "solid"],
        ["fundamentals-web-dev-ccp", "ai-uses-cp1", "solid"],
        ["hci-cp1", "game-design-ccp", "dashed"],
        ["hci-cp1", "computer-programming-1-ccp", "dashed"],
        ["hci-cp1", "robotics-cp1", "dashed"],
        ["fundamentals-web-dev-ccp", "robotics-cp1", "dashed"],
        ["ai-uses-cp1", "robotics-cp1", "dashed"]
      ],
      notes: ["The dashed line between Design Thinking and Fundamentals of IT has no arrowhead on the chart."],
      colorKey: ["The Arts", "Physical Prod/Science/Applied Tech", "Digital Products/IT/Applied Tech", "English", "Business"] },

    { id: "multimedia", title: "Multimedia Pathways", page: 57,
      legend: "The charts have no printed key. Solid arrows connect a course to one that lists it as a prerequisite; dashed arrows show recommended or related next steps. Arrows with heads at both ends are listed in both directions.",
      nodes: [
        { course: "moeller-media-production-cp1", grades: [10, 11, 12], recommended: ["Oral Communications", "Design Thinking"], note: "Formerly Video Production." },
        { course: "advanced-media-production-cp1", title: "Advanced Moeller Media Production", grades: [10, 11, 12], prereq: ["Video Production or Moeller Media Production"] },
        { course: "sportscasting-cp1", grades: [10, 11, 12], prereq: ["Moeller Media Production"] },
        { course: "design-thinking-cp1", grades: [10, 11, 12] },
        { course: "digital-design-1-cp1", title: "Digital Design (year)", grades: [9, 10, 11, 12] },
        { course: "art-pop-culture-cp1", grades: [10, 11, 12] },
        { course: "music-tech-cp1", grades: [10, 11, 12] },
        { course: "geopolitical-negotiations-h", grades: [10, 11, 12], prereq: ["Oral Communications"] },
        { course: "podcasting-cp1", grades: [11, 12], prereq: ["Intro to Moeller Media"] },
        { course: "yearbook1-cp1", title: "Yearbook I (year)", grades: [10, 11, 12] },
        { course: "eng4-journalism-cp1", title: "Journalism I", grades: [11, 12] },
        { course: "eng4-creative-writing-cp1", title: "Creative Writing", grades: [12] }
      ],
      edges: [
        ["design-thinking-cp1", "moeller-media-production-cp1", "dashed"],
        ["digital-design-1-cp1", "moeller-media-production-cp1", "dashed"],
        ["art-pop-culture-cp1", "moeller-media-production-cp1", "dashed"],
        ["music-tech-cp1", "moeller-media-production-cp1", "dashed"],
        ["moeller-media-production-cp1", "advanced-media-production-cp1", "dashed"],
        ["advanced-media-production-cp1", "sportscasting-cp1", "dashed"],
        ["moeller-media-production-cp1", "geopolitical-negotiations-h", "dashed"],
        ["geopolitical-negotiations-h", "moeller-media-production-cp1", "dashed"],
        ["moeller-media-production-cp1", "podcasting-cp1", "dashed"],
        ["podcasting-cp1", "moeller-media-production-cp1", "dashed"],
        ["advanced-media-production-cp1", "podcasting-cp1", "dashed"],
        ["podcasting-cp1", "advanced-media-production-cp1", "dashed"],
        ["moeller-media-production-cp1", "eng4-journalism-cp1", "dashed"],
        ["eng4-journalism-cp1", "moeller-media-production-cp1", "dashed"]
      ],
      notes: ["Yearbook I and Creative Writing appear on the chart with no arrows."],
      colorKey: ["The Arts", "Physical Prod/Science/Applied Tech", "Digital Products/IT/Applied Tech", "English", "Business"] },

    { id: "physical", title: "Physical Product Development Pathways", page: 57,
      legend: "The charts have no printed key. Solid arrows connect a course to one that lists it as a prerequisite; dashed arrows show recommended or related next steps. Arrows with heads at both ends are listed in both directions.",
      nodes: [
        { course: "3d-art-cp1", title: "Intro to 3D Art, Design and Sculpture", grades: [10, 11, 12] },
        { course: "design-build-lab1-cp1", grades: [10, 11, 12], prereq: ["Design Thinking"] },
        { course: "robotics-cp1", grades: [10, 11, 12], prereq: ["Design Thinking"] },
        { course: "math-modeling-h", title: "Mathematical Modeling CP1", grades: [11, 12], prereq: ["Algebra I", "Geometry"] },
        { course: "realab-design-build2-cp1", title: "REALab: Design + Build II", grades: [11, 12], prereq: ["Design Build Lab I or Engineering CCP"] },
        { course: "eng-design1-ccp", title: "Engineering CCP", grades: [11, 12], coreq: ["Pre-Calculus"], recommended: ["Design Thinking"] },
        { course: "design-thinking-cp1", grades: [10, 11, 12] }
      ],
      edges: [
        ["design-thinking-cp1", "3d-art-cp1", "dashed"],
        ["design-thinking-cp1", "design-build-lab1-cp1", "solid"],
        ["design-thinking-cp1", "robotics-cp1", "dashed"],
        ["design-thinking-cp1", "eng-design1-ccp", "dashed"],
        ["design-build-lab1-cp1", "realab-design-build2-cp1", "solid"],
        ["robotics-cp1", "eng-design1-ccp", "dashed"],
        ["realab-design-build2-cp1", "eng-design1-ccp", "dashed"],
        ["eng-design1-ccp", "realab-design-build2-cp1", "dashed"]
      ],
      notes: ["Mathematical Modeling appears on the chart with no arrows and is labeled CP1 there; the Mathematics section (p.34) lists it as Honors."],
      colorKey: ["The Arts", "Physical Prod/Science/Applied Tech", "Digital Products/IT/Applied Tech", "English", "Business", "Math"] }
  ],
  hubIntro: "The Burns Innovation Hub coordinates immersive, interdisciplinary learning. The courses on these charts were created or modified to use the Hub's resources, and more are expected (p.14).",

  programs: [
    { id: "global-scholars", title: "Chaminade Global Scholars", page: 55,
      summary: "Students who keep an unweighted GPA of 3.7 or higher during the first quarter of their honors-level freshman courses may apply after the first quarter of freshman year. Scholars take honors, AP, and CCP classes (up to 40+ college credits possible), complete a Capstone project in junior year, are encouraged to take four years of a world language and join a Moeller travel program, and take part in service, networking, and leadership activities. Participants are recognized at the academic awards ceremony and at graduation. Completing the Capstone with a weighted GPA of 4.5 or higher earns Summa Cum Laude with High Honors (p.10)." },
    { id: "honors-diplomas", title: "Ohio High School Honors Diplomas", page: 8,
      summary: "Ohio recognizes students who go beyond the state's graduation requirements with an honors diploma. Moeller students can pursue one of four: Academic Honors, STEM Honors, Arts Honors, or Social Science and Civic Engagement Honors. Students are responsible for knowing the requirements and choosing courses that meet them.",
      link: "https://education.ohio.gov/Topics/Ohio-s-Graduation-Requirements/Honors-Diplomas/Academic-Honors-Diploma" },
    { id: "ohio-seals", title: "Ohio graduation: competency and diploma seals", page: 7,
      summary: "Besides Moeller's 25 credits, Ohio requires students to show competency by passing the Math and English sections of the IOWA exam (students who do not pass get extra support and retake it), and to earn two diploma seals, at least one of them an Ohio seal: OhioMeansJobs Readiness, Industry-Recognized Credential, College-Ready (remediation-free ACT or SAT scores), Military Enlistment, Citizenship (Moeller students earn it by passing the American History and American Government sections of the IOWA exam), Science (passing the Biology section of the IOWA exam), Seal of Biliteracy, Technology, or the local Community Service seal (Moeller's service hours)." },
    { id: "latin-honors", title: "Latin Honors (in place of class rank)", page: 10,
      summary: "Recognition at graduation and the Senior Awards Ceremony is based on cumulative weighted GPA: Summa Cum Laude with High Honors is 4.5 or higher plus completion of the Chaminade Global Scholars Capstone; Summa Cum Laude is 4.5 or higher; Magna Cum Laude is 4.25 to 4.49; Cum Laude is 4.0 to 4.24. Honor roll uses unweighted GPA each quarter: first honors 3.8 to 4.0, second honors 3.4 to 3.79, with no class failures." },
    { id: "ncaa", title: "NCAA eligibility for student athletes", page: 8,
      summary: "Students who hope to play Division I or II college sports must meet NCAA rules. Register with the NCAA Eligibility Center (eligibilitycenter.org) at the end of junior year or in the fall of senior year, then ask the counseling office to send transcripts after junior and senior year. Eligibility uses 16 approved core courses with a minimum core GPA of 2.3 for Division I or 2.2 for Division II. Athletes should meet with their counselor early to plan course selection.",
      link: "https://www.eligibilitycenter.org" },
    { id: "service-hours", title: "Service hours", page: 8,
      summary: "All students complete at least 65 community service hours before graduation: 10 hours freshman year, 10 sophomore year, 10 junior year (blue or gold hours), and 35 gold hours senior year. Blue hours are service to Moeller or the Church; gold hours are service outside Moeller or the Church.",
      byYear: { 9: 10, 10: 10, 11: 10, 12: 35 }, total: 65 },
    { id: "ccp-early-it", title: "College Credit Plus and the Early IT Program", page: 4,
      summary: "CCP is Ohio's dual enrollment system; Moeller partners with the University of Cincinnati, and state funding covers the course cost for private school students. To earn college credit a student registers for CCP through the Ohio Department of Education and is accepted by UC. Students who complete the Early IT courses with a C or better are automatically admitted to UC's Information Technology program (p.5).",
      link: "https://cech.uc.edu/schools/it/early-it.html" },
    { id: "credit-flex", title: "Credit Flexibility", page: 5,
      summary: "Students can earn credit for learning done outside the classroom, most often service learning and language or travel immersion trips. Students talk with their counselor and the flex credit advisor, and the Provost approves every application (template on pp.62-63)." }
  ],

  levels: [
    { code: "Honors", name: "Honors / AP / CCP", plain: "Fast-paced, demanding courses. Honors courses prepare students for AP and CCP courses, which can earn college credit." },
    { code: "AP", name: "Advanced Placement", plain: "College-level courses approved by the College Board. Students are strongly encouraged to take the AP exam in May; many colleges give credit for good scores." },
    { code: "CCP", name: "College Credit Plus", plain: "College courses taken through the University of Cincinnati while in high school. They earn both high school and college credit." },
    { code: "CP1", name: "College Prep I", plain: "Above grade level. Most Moeller courses are CP1." },
    { code: "CP1 Level 1", name: "College Prep I, Level 1", plain: "A CP1 math course that covers the same topics at a slightly slower pace." },
    { code: "CP2", name: "College Prep II", plain: "At grade level. Builds the foundation in a subject while confidence grows." },
    { code: "Honors+", name: "Honors Plus", plain: "Advanced honors-weight courses such as Molecular Biology Research, Portfolio Management, and Latin V." },
    { code: "PF", name: "Pass / Fail", plain: "Graded pass or fail (Recreational Fitness for Life and MoeTerm)." }
  ],
  levelsNote: "Students can mix levels across subjects, for example honors in one subject and college prep in another, and can move up or down levels during high school so they are always in the right class. Freshmen are placed using HSPT results, grade school teacher recommendations, and Moeller placement tests in math and world languages.",
  levelsPage: 4,

  apFee: { text: "AP exam fees are charged to student accounts through total registration; the expected rate is $105 per AP exam.", page: 4 },
  ccp: { text: "College Credit Plus is Ohio's dual enrollment program: high school students take college-level courses for college credit. Moeller's partner is the University of Cincinnati, and state funding covers the cost for private school students. To earn college credit a student registers for CCP through the Ohio Department of Education and is accepted by UC. Talk with your counselor about deadlines and application materials.", page: 4 },

  registration: {
    steps: [
      "In January, attend the course registration presentation for your class to learn the graduation requirements, how scheduling works, and next year's course offerings.",
      "Teachers recommend a level for each of your courses before your registration meeting. They may suggest moving up or down a level based on how you are doing now.",
      "Meet one-on-one with your school counselor to enter course requests in MoeCampus. Requests are based on graduation requirements, your ability, and your college and career interests.",
      "In March, families review the final course requests. There is a deadline in March to ask for changes, and after it change requests are denied. More details on the exact deadline will be announced each year.",
      "The master schedule is built from these requests, so changes after it is made are limited. Schedule changes are not made because of dissatisfaction with a course or teacher, academic difficulty (except in limited cases), or a change of mind.",
      "After the second full week of the school year (or of the semester for a semester course), no schedule change can be made without approval from parents, teachers, and the Provost."
    ],
    timeline: [
      { when: "In January", what: "Teachers make course recommendations in MoeCampus, and each class attends its registration presentation. Details will be announced each year." },
      { when: "In January", what: "Registration meetings with counselors begin, starting with the oldest class. Details will be announced each year." },
      { when: "In February", what: "Registration meetings with counselors continue for the younger classes. Details will be announced each year." },
      { when: "In March", what: "Counselors review and finalize course requests. Details will be announced each year." },
      { when: "In March", what: "Deadline to change course requests. More details on the exact deadline will be announced each year." }
    ],
    page: 11,
    timelinePage: 12
  },

  disclaimer: "This is a planning tool. Your official requirements come from the Curriculum Guide and your counselor. Courses can be cancelled for low enrollment or scheduling conflicts, and teachers recommend levels each year."
};
