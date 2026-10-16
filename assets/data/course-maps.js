/* =========================================================================
   COURSE MAPS — all wording for course-maps.html lives here.
   Page logic: assets/js/course-maps.js
   Styles:     assets/css/course-maps.css

   HOW TO EDIT EACH YEAR
   ─────────────────────
   PATHWAYS   Add or rename a pathway by editing the PATHWAYS array.
              Each pathway needs: id, name, color (hex), icon (single emoji),
              desc (one sentence), cocurr (co-curricular clubs as a string),
              and years (array of 4 arrays, one per grade 9–12).

              Each course in a year array is an object:
                { name: "Course name", type: "key" | "req" | "opt" }
              key  = pathway-defining course (highlighted in the pathway color)
              req  = required/core course (neutral style)
              opt  = elective option (dimmed)

   COURSES    Add or rename a course in the COURSES array.
              Each course needs: id (unique, no spaces), name, dept, grade
              (array of grades it can be taken in), prereq (array of course
              ids), and note (optional string for special requirements).

              Changing a course's id here has no other effect — this data
              file is self-contained and does not depend on courses.js or
              course-catalog.js.

   DEPARTMENTS  Colors are set in DEPT_COLORS. Change a hex there to
                recolor that department's nodes in the Course Web.

   WARNING: Do not rename a course id mid-year if students may have bookmarked
   a direct link — ids appear in the URL hash on the pathway explorer.
   ========================================================================= */

const DEPT_COLORS = {
  Mathematics:    '#2a78d6',
  Science:        '#1baf7a',
  English:        '#eb6834',
  Business:       '#eda100',
  Technology:     '#6250d6',
  Arts:           '#e87ba4',
  'Social Studies':'#008300',
  'World Language':'#e34948',
  Religion:       '#3a3a3a',
  Electives:      '#898781',
};

/* ── Pathways (used by Tab 1 and Tab 3) ─────────────────────────────────── */
const PATHWAYS = [
  {
    id: 'business-finance',
    icon: '💼',
    name: 'Business — Finance',
    color: '#eda100',
    desc: 'Build toward investment, entrepreneurship, and data-driven business decisions.',
    cocurr: 'Finance and Investment Club · Speech and Debate · Sports Analytics Club',
    years: [
      [
        { name: 'Oral Communications', type: 'req' },
        { name: 'Financial Literacy', type: 'req' },
        { name: 'English I', type: 'req' },
        { name: 'Algebra I', type: 'req' },
        { name: 'Biology', type: 'req' },
      ],
      [
        { name: 'Financial Literacy', type: 'req' },
        { name: 'Entrepreneurship', type: 'key' },
        { name: 'Business Applications', type: 'key' },
        { name: 'US History', type: 'req' },
      ],
      [
        { name: 'Investment Research Honors', type: 'key' },
        { name: 'Portfolio Management Honors', type: 'key' },
        { name: 'AP Microeconomics', type: 'key' },
        { name: 'AP English', type: 'opt' },
      ],
      [
        { name: 'Portfolio Management Honors II', type: 'key' },
        { name: 'AP Microeconomics', type: 'key' },
        { name: 'AP Psychology', type: 'opt' },
        { name: 'AP Statistics', type: 'opt' },
      ],
    ],
  },
  {
    id: 'business-general',
    icon: '📊',
    name: 'Business — General',
    color: '#ba7517',
    desc: 'Explore student-run business, design thinking, and marketing fundamentals.',
    cocurr: 'Finance and Investment Club · Speech and Debate',
    years: [
      [
        { name: 'Oral Communications', type: 'req' },
        { name: 'Financial Literacy', type: 'req' },
        { name: 'English I', type: 'req' },
        { name: 'Algebra I', type: 'req' },
        { name: 'Biology', type: 'req' },
      ],
      [
        { name: 'Financial Literacy', type: 'req' },
        { name: 'Business Applications', type: 'key' },
        { name: 'Design Thinking', type: 'key' },
        { name: 'US History', type: 'req' },
      ],
      [
        { name: 'Entrepreneurship', type: 'key' },
        { name: 'Student-Run Business', type: 'key' },
        { name: 'Art and Pop Culture: Design/Branding', type: 'opt' },
        { name: 'REALab: Business', type: 'key' },
        { name: 'AP Microeconomics', type: 'opt' },
      ],
      [
        { name: 'AP Microeconomics', type: 'key' },
        { name: 'AP Psychology', type: 'opt' },
        { name: 'AP Statistics', type: 'opt' },
        { name: 'AP English', type: 'opt' },
        { name: 'REALab: Business', type: 'key' },
      ],
    ],
  },
  {
    id: 'communications',
    icon: '🎙️',
    name: 'Communications',
    color: '#eb6834',
    desc: 'Develop skills in journalism, podcasting, media production, and public speaking.',
    cocurr: 'Speech and Debate · Squire (Creative Writing) · Theatre',
    years: [
      [
        { name: 'Oral Communications', type: 'req' },
        { name: 'English I', type: 'req' },
        { name: 'Algebra I', type: 'req' },
        { name: 'Biology', type: 'req' },
      ],
      [
        { name: 'Negotiations and Advanced Rhetoric', type: 'key' },
        { name: 'AP Seminar', type: 'key' },
        { name: 'Intro to Media Production', type: 'opt' },
        { name: 'US History', type: 'req' },
      ],
      [
        { name: 'Moeller Media Production', type: 'key' },
        { name: 'Podcasting', type: 'key' },
        { name: 'Creative Writing', type: 'opt' },
        { name: 'AP English Language', type: 'opt' },
      ],
      [
        { name: 'Advanced Media Production', type: 'key' },
        { name: 'Journalism', type: 'key' },
        { name: 'AP English Language', type: 'opt' },
        { name: 'Religion IV', type: 'req' },
      ],
    ],
  },
  {
    id: 'cs-it',
    icon: '💻',
    name: 'Computer Science / IT',
    color: '#6250d6',
    desc: 'Pursue programming, networking, game design, and AI from sophomore year on.',
    cocurr: 'IT Club · Robotics Club · 3D Printing Club',
    years: [
      [
        { name: 'English I', type: 'req' },
        { name: 'Algebra I', type: 'req' },
        { name: 'Biology', type: 'req' },
        { name: 'Fine Arts', type: 'req' },
      ],
      [
        { name: 'Design Thinking', type: 'key' },
        { name: 'Human-Computer Interaction', type: 'key' },
        { name: 'Fundamentals of IT CCP', type: 'key' },
        { name: 'US History', type: 'req' },
      ],
      [
        { name: 'Computer Programming I CCP', type: 'key' },
        { name: 'Fundamentals of Web Dev CCP', type: 'key' },
        { name: 'Game Design CCP', type: 'opt' },
        { name: 'AI: Uses and Applications', type: 'opt' },
        { name: 'Robotics', type: 'opt' },
      ],
      [
        { name: 'Computer Networking CCP', type: 'key' },
        { name: 'Database Management I CCP', type: 'key' },
        { name: 'Intro to AI CCP', type: 'key' },
        { name: 'AP English', type: 'opt' },
      ],
    ],
  },
  {
    id: 'engineering',
    icon: '⚙️',
    name: 'Engineering',
    color: '#1baf7a',
    desc: 'Follow a path through design thinking, REALab, and engineering CCP courses.',
    cocurr: 'Engineering Club · Robotics Club · 3D Printing Club',
    years: [
      [
        { name: 'English I', type: 'req' },
        { name: 'Algebra I Honors', type: 'req' },
        { name: 'Biology Honors', type: 'req' },
        { name: 'Fine Arts', type: 'req' },
      ],
      [
        { name: 'Design Thinking', type: 'key' },
        { name: 'Fundamentals of IT CCP', type: 'key' },
        { name: 'Chemistry Honors', type: 'req' },
        { name: 'Geometry Honors', type: 'req' },
        { name: 'US History', type: 'req' },
      ],
      [
        { name: 'Design + Build Lab I', type: 'key' },
        { name: 'REALab: Design + Build Lab II', type: 'key' },
        { name: 'AP Environmental Science', type: 'opt' },
        { name: 'Algebra II and Trigonometry Honors', type: 'req' },
      ],
      [
        { name: 'Engineering Design Thinking I CCP', type: 'key' },
        { name: 'Engineering Design Thinking II CCP', type: 'key' },
        { name: 'Physics', type: 'req' },
        { name: 'AP Calculus BC', type: 'opt' },
      ],
    ],
  },
  {
    id: 'sciences',
    icon: '🔬',
    name: 'Sciences',
    color: '#2a78d6',
    desc: 'Pursue advanced biology, chemistry, and physics through AP and CCP courses.',
    cocurr: 'Molecular Modeling Club · Medical Sciences Club · Bring Change to Mind',
    years: [
      [
        { name: 'Biology Honors', type: 'req' },
        { name: 'English I', type: 'req' },
        { name: 'Algebra I Honors', type: 'req' },
        { name: 'Fine Arts', type: 'req' },
      ],
      [
        { name: 'Chemistry Honors', type: 'req' },
        { name: 'Geometry Honors', type: 'req' },
        { name: 'World Language II', type: 'req' },
        { name: 'US History', type: 'req' },
      ],
      [
        { name: 'AP Biology', type: 'key' },
        { name: 'AP Chemistry', type: 'key' },
        { name: 'AP Environmental Science', type: 'opt' },
        { name: 'Anatomy and Physiology', type: 'opt' },
      ],
      [
        { name: 'AP Physics 1', type: 'key' },
        { name: 'Molecular Biology Research Honors', type: 'key' },
        { name: 'AP Statistics', type: 'opt' },
        { name: 'AP Calculus BC', type: 'opt' },
      ],
    ],
  },
  {
    id: 'social-sciences',
    icon: '🌍',
    name: 'Social Sciences',
    color: '#008300',
    desc: 'Build toward AP social science, global studies, and civic engagement.',
    cocurr: 'Academic Team · Speech and Debate · Bring Change to Mind',
    years: [
      [
        { name: 'English I', type: 'req' },
        { name: 'Algebra I', type: 'req' },
        { name: 'Biology', type: 'req' },
        { name: 'World Language I', type: 'req' },
      ],
      [
        { name: 'AP US History', type: 'key' },
        { name: 'Anatomy and Physiology', type: 'opt' },
        { name: 'World Language II', type: 'req' },
        { name: 'Geometry', type: 'req' },
      ],
      [
        { name: 'AP World History', type: 'key' },
        { name: 'AP Human Geography', type: 'key' },
        { name: 'Psychology CP1', type: 'opt' },
        { name: 'Sociology', type: 'opt' },
      ],
      [
        { name: 'AP US Government', type: 'key' },
        { name: 'AP World Language', type: 'opt' },
        { name: 'Catholic Teaching in a Contemporary World', type: 'opt' },
        { name: 'AP Psychology', type: 'opt' },
      ],
    ],
  },
  {
    id: 'arts',
    icon: '🎨',
    name: 'Visual and Performing Arts',
    color: '#e87ba4',
    desc: 'Explore studio art, graphic design, digital media, photography, and performance.',
    cocurr: 'Photography Club · Theatre · Marching Band',
    years: [
      [
        { name: 'Studio Art I', type: 'key' },
        { name: 'English I', type: 'req' },
        { name: 'Algebra I', type: 'req' },
        { name: 'Biology', type: 'req' },
      ],
      [
        { name: 'Studio Art II', type: 'key' },
        { name: 'Digital Design I', type: 'key' },
        { name: 'Intro to Media Production', type: 'opt' },
        { name: 'US History', type: 'req' },
      ],
      [
        { name: 'AP 2D Design', type: 'key' },
        { name: 'Photography', type: 'opt' },
        { name: 'Moeller Media Production', type: 'opt' },
        { name: 'Creative Writing', type: 'opt' },
      ],
      [
        { name: 'AP Studio Art: Drawing', type: 'key' },
        { name: 'Advanced Media Production', type: 'opt' },
        { name: 'Yearbook', type: 'opt' },
        { name: 'AP English', type: 'opt' },
      ],
    ],
  },
];

/* ── Courses (used by Tab 2: Course Web) ────────────────────────────────── */
const COURSES = [
  { id: 'alg1',     name: 'Algebra I',                   dept: 'Mathematics',    grade: [9],       prereq: [] },
  { id: 'geom',     name: 'Geometry',                     dept: 'Mathematics',    grade: [10],      prereq: ['alg1'] },
  { id: 'alg1h',    name: 'Algebra I Honors',             dept: 'Mathematics',    grade: [9],       prereq: [] },
  { id: 'geomh',    name: 'Geometry Honors',              dept: 'Mathematics',    grade: [10],      prereq: ['alg1h'] },
  { id: 'alg2',     name: 'Algebra II and Trig',          dept: 'Mathematics',    grade: [11],      prereq: ['geom'] },
  { id: 'alg2h',    name: 'Algebra II and Trig Honors',   dept: 'Mathematics',    grade: [10,11],   prereq: ['geomh'] },
  { id: 'calc',     name: 'Calculus CP1',                 dept: 'Mathematics',    grade: [12],      prereq: ['alg2'] },
  { id: 'precalc',  name: 'Pre-Calculus BC Honors',       dept: 'Mathematics',    grade: [11],      prereq: ['alg2h'] },
  { id: 'apcalcbc', name: 'AP Calculus BC',               dept: 'Mathematics',    grade: [11,12],   prereq: ['precalc'] },
  { id: 'apcalcab', name: 'AP Calculus AB',               dept: 'Mathematics',    grade: [12],      prereq: ['alg2h'] },
  { id: 'apstats',  name: 'AP Statistics',                dept: 'Mathematics',    grade: [11,12],   prereq: ['alg2'] },
  { id: 'bio',      name: 'Biology CP1',                  dept: 'Science',        grade: [9],       prereq: [] },
  { id: 'bioh',     name: 'Biology Honors',               dept: 'Science',        grade: [9],       prereq: [], note: 'Honors placement' },
  { id: 'chem',     name: 'Chemistry CP1',                dept: 'Science',        grade: [10],      prereq: ['bio'] },
  { id: 'chemh',    name: 'Chemistry Honors',             dept: 'Science',        grade: [10],      prereq: ['bioh'], note: 'Req: Honors Algebra I and Biology Honors' },
  { id: 'apchem',   name: 'AP Chemistry',                 dept: 'Science',        grade: [11,12],   prereq: ['chemh'], note: 'Req: teacher recommendation' },
  { id: 'phys',     name: 'Physics CP1',                  dept: 'Science',        grade: [12],      prereq: ['chem'] },
  { id: 'apphys1',  name: 'AP Physics 1',                 dept: 'Science',        grade: [11,12],   prereq: ['chemh'] },
  { id: 'apbio',    name: 'AP Biology',                   dept: 'Science',        grade: [11,12],   prereq: ['bioh', 'chemh'], note: 'Req: Honors Biology and Chemistry' },
  { id: 'apenvs',   name: 'AP Environmental Science',     dept: 'Science',        grade: [11,12],   prereq: ['bio'] },
  { id: 'anatphys', name: 'Anatomy and Physiology',       dept: 'Science',        grade: [11,12],   prereq: ['bio'] },
  { id: 'molbio',   name: 'Molecular Biology Research',   dept: 'Science',        grade: [11,12],   prereq: ['bioh'], note: 'Req: Biology Honors and teacher recommendation' },
  { id: 'eng1',     name: 'English I',                    dept: 'English',        grade: [9],       prereq: [] },
  { id: 'eng2',     name: 'English II',                   dept: 'English',        grade: [10],      prereq: ['eng1'] },
  { id: 'eng3',     name: 'English III',                  dept: 'English',        grade: [11],      prereq: ['eng2'] },
  { id: 'eng4',     name: 'English IV electives',         dept: 'English',        grade: [12],      prereq: ['eng3'] },
  { id: 'apsem',    name: 'AP Seminar',                   dept: 'English',        grade: [10],      prereq: ['eng1'], note: 'Honors placement' },
  { id: 'aplang',   name: 'AP English Language',          dept: 'English',        grade: [11],      prereq: ['apsem'] },
  { id: 'aplit',    name: 'AP English Literature',        dept: 'English',        grade: [12],      prereq: ['aplang'] },
  { id: 'finlit',   name: 'Financial Literacy',           dept: 'Business',       grade: [10,11,12], prereq: [] },
  { id: 'busapp',   name: 'Business Applications',        dept: 'Business',       grade: [10,11,12], prereq: [] },
  { id: 'entrep',   name: 'Entrepreneurship',             dept: 'Business',       grade: [10,11,12], prereq: ['finlit', 'busapp'], note: 'Req: application and teacher approval' },
  { id: 'studbiz',  name: 'Student-Run Business',         dept: 'Business',       grade: [10,11,12], prereq: ['entrep'], note: 'Req: teacher recommendation' },
  { id: 'invres',   name: 'Investment Research Honors',   dept: 'Business',       grade: [11,12],   prereq: ['finlit', 'busapp'], note: 'Req: Honors Math and teacher recommendation' },
  { id: 'portmgmt', name: 'Portfolio Management Honors',  dept: 'Business',       grade: [11,12],   prereq: ['invres'] },
  { id: 'portmgmt2',name: 'Portfolio Management II',      dept: 'Business',       grade: [12],      prereq: ['portmgmt'] },
  { id: 'apmicro',  name: 'AP Microeconomics',            dept: 'Business',       grade: [11,12],   prereq: ['finlit'] },
  { id: 'realabbiz', name: 'REALab: Business',            dept: 'Business',       grade: [11,12],   prereq: ['busapp'], note: 'Req: teacher recommendation' },
  { id: 'bizlead',  name: 'Business Leadership Honors',   dept: 'Business',       grade: [11,12],   prereq: ['studbiz'] },
  { id: 'designthink', name: 'Design Thinking',           dept: 'Technology',     grade: [10,11,12], prereq: [] },
  { id: 'hci',      name: 'Human-Computer Interaction',   dept: 'Technology',     grade: [10,11,12], prereq: ['designthink'] },
  { id: 'fundit',   name: 'Fundamentals of IT CCP',       dept: 'Technology',     grade: [10,11,12], prereq: [] },
  { id: 'fundweb',  name: 'Fundamentals of Web Dev CCP',  dept: 'Technology',     grade: [10,11,12], prereq: ['hci', 'fundit'] },
  { id: 'comprog',  name: 'Computer Programming I CCP',   dept: 'Technology',     grade: [10,11,12], prereq: ['fundit'] },
  { id: 'gamedesign', name: 'Game Design CCP',            dept: 'Technology',     grade: [11,12],   prereq: ['hci', 'fundit'] },
  { id: 'robotics', name: 'Robotics',                     dept: 'Technology',     grade: [10,11,12], prereq: ['hci', 'fundit'] },
  { id: 'ai',       name: 'AI: Uses and Applications',    dept: 'Technology',     grade: [11,12],   prereq: [] },
  { id: 'introai',  name: 'Intro to AI CCP',              dept: 'Technology',     grade: [11,12],   prereq: ['hci', 'fundit'] },
  { id: 'dbmgmt',   name: 'Database Management I CCP',    dept: 'Technology',     grade: [10,11,12], prereq: ['fundit'] },
  { id: 'compnet',  name: 'Computer Networking CCP',      dept: 'Technology',     grade: [10,11,12], prereq: ['fundit'] },
  { id: 'studioart1', name: 'Studio Art I',               dept: 'Arts',           grade: [9,10],    prereq: [] },
  { id: 'studioart2', name: 'Studio Art II',              dept: 'Arts',           grade: [10,11],   prereq: ['studioart1'] },
  { id: 'ap2d',     name: 'AP 2D Design',                 dept: 'Arts',           grade: [11,12],   prereq: ['studioart2'] },
  { id: 'digdes1',  name: 'Digital Design I',             dept: 'Arts',           grade: [10,11,12], prereq: [] },
  { id: 'photo',    name: 'Photography',                  dept: 'Arts',           grade: [11,12],   prereq: [] },
  { id: 'mediaprodintr', name: 'Intro to Media Production', dept: 'Arts',         grade: [10,11,12], prereq: [] },
  { id: 'mediaprod', name: 'Moeller Media Production',    dept: 'Arts',           grade: [10,11,12], prereq: ['mediaprodintr'] },
  { id: 'advmedia', name: 'Advanced Media Production',    dept: 'Arts',           grade: [11,12],   prereq: ['mediaprod'] },
  { id: 'podcast',  name: 'Podcasting',                   dept: 'Arts',           grade: [10,11,12], prereq: ['mediaprodintr'] },
  { id: 'ush',      name: 'US History',                   dept: 'Social Studies', grade: [10],      prereq: [] },
  { id: 'apush',    name: 'AP US History',                dept: 'Social Studies', grade: [10],      prereq: [], note: 'Honors placement' },
  { id: 'worldh',   name: 'World History',                dept: 'Social Studies', grade: [11],      prereq: ['ush'] },
  { id: 'apworldh', name: 'AP World History',             dept: 'Social Studies', grade: [11],      prereq: ['apush'] },
  { id: 'govt',     name: 'Government',                   dept: 'Social Studies', grade: [12],      prereq: ['worldh'] },
  { id: 'apgov',    name: 'AP US Government',             dept: 'Social Studies', grade: [12],      prereq: ['apworldh'] },
  { id: 'psych',    name: 'Psychology CP1',               dept: 'Social Studies', grade: [11,12],   prereq: [] },
  { id: 'appsych',  name: 'AP Psychology',                dept: 'Social Studies', grade: [11,12],   prereq: [], note: 'Req: teacher recommendation' },
  { id: 'soc',      name: 'Sociology',                    dept: 'Social Studies', grade: [11,12],   prereq: [] },
  { id: 'aphuman',  name: 'AP Human Geography',           dept: 'Social Studies', grade: [10,11,12], prereq: [] },
  { id: 'wl1',      name: 'World Language I',             dept: 'World Language', grade: [9],       prereq: [], note: 'French, German, Latin, or Spanish' },
  { id: 'wl2',      name: 'World Language II',            dept: 'World Language', grade: [10],      prereq: ['wl1'] },
  { id: 'wl3h',     name: 'World Language III Honors',    dept: 'World Language', grade: [11],      prereq: ['wl2'] },
  { id: 'apwl',     name: 'AP World Language',            dept: 'World Language', grade: [12],      prereq: ['wl3h'] },
  { id: 'rel1',     name: 'Religion I',                   dept: 'Religion',       grade: [9],       prereq: [] },
  { id: 'rel2',     name: 'Religion II',                  dept: 'Religion',       grade: [10],      prereq: ['rel1'] },
  { id: 'rel3',     name: 'Religion III',                 dept: 'Religion',       grade: [11],      prereq: ['rel2'] },
  { id: 'rel4',     name: 'Religion IV',                  dept: 'Religion',       grade: [12],      prereq: ['rel3'] },
  { id: 'oralcomm', name: 'Oral Communications',          dept: 'Electives',      grade: [9],       prereq: [], note: 'Required for graduation' },
  { id: 'health',   name: 'Health and Wellness',          dept: 'Electives',      grade: [9],       prereq: [], note: 'Required for graduation' },
  { id: 'finearts', name: 'Fine Arts',                    dept: 'Electives',      grade: [9,10,11,12], prereq: [] },
  { id: 'reallabdb', name: 'REALab: Design + Build Lab I', dept: 'Electives',     grade: [11,12],   prereq: ['designthink'], note: 'Req: Design Thinking and teacher recommendation' },
  { id: 'reallabdb2', name: 'REALab: Design + Build Lab II', dept: 'Electives',  grade: [11,12],   prereq: ['reallabdb'] },
  { id: 'engdesign1', name: 'Engineering Design Thinking I CCP', dept: 'Electives', grade: [11,12], prereq: [] },
  { id: 'engdesign2', name: 'Engineering Design Thinking II CCP', dept: 'Electives', grade: [11,12], prereq: ['engdesign1'] },
  { id: 'podcast2', name: 'Podcasting',                   dept: 'Electives',      grade: [10,11,12], prereq: ['mediaprodintr'] },
  { id: 'negrheto', name: 'Negotiations and Advanced Rhetoric', dept: 'Electives', grade: [10,11,12], prereq: [] },
  { id: 'appsychel', name: 'AP Psychology',               dept: 'Electives',      grade: [11,12],   prereq: [], note: 'Req: teacher recommendation' },
  { id: 'cinchist', name: 'Cincinnati History',           dept: 'Electives',      grade: [10,11,12], prereq: [] },
  { id: 'acivwar',  name: 'American Civil War',           dept: 'Electives',      grade: [10,11,12], prereq: [] },
  { id: 'eurchist', name: 'European History I CCP',       dept: 'Electives',      grade: [10,11,12], prereq: [] },
  { id: 'acad1',    name: 'Academic Development I',       dept: 'Electives',      grade: [9],       prereq: [] },
  { id: 'acad2',    name: 'Academic Development II',      dept: 'Electives',      grade: [10],      prereq: [] },
  { id: 'acad3',    name: 'Academic Development III',     dept: 'Electives',      grade: [11],      prereq: [] },
  { id: 'acad4',    name: 'Academic Development IV',      dept: 'Electives',      grade: [12],      prereq: [] },
  { id: 'marcom1',  name: 'Marianist Community Development I', dept: 'Electives', grade: [9],       prereq: [] },
  { id: 'marcom2',  name: 'Marianist Community Development II', dept: 'Electives', grade: [10],     prereq: [] },
];
