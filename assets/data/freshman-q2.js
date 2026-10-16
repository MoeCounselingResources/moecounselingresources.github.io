/* =========================================================================
   FRESHMAN FOUNDATIONS, QUARTER 2 — every word on freshman-foundations-q2.html lives in this file.
   (The logic is assets/js/freshman-q2.js; the look is assets/css/freshman-q1.css plus freshman-q2.css.)

   TO EDIT WORDING: change the text between the quotation marks. Keep the quotation marks, commas, and
   braces. To use a quotation mark inside text, write \" instead of ". In text you can use **bold**.
   Glossary: add or change a { term: "...", def: "..." } line. The Bingo card is drawn from these same terms.
   Career game: each career names the right choice with "answer" (a number counting from 0 in "choices").
   Earnings chart: removed for now. The figures are saved in a comment inside the "why" section below.

   SAVED ANSWERS: the "How do you like to learn?" reflection saves in the student's own browser under the
   key in learn.key ("moeller-ex-learning"). Don't change the key, or saved answers disappear. Nothing is
   ever sent anywhere.
   ========================================================================= */

const FRESHMAN_Q2 = {

  title: "Freshman Foundations, Quarter 2: Self-Discovery and Exploring Post-secondary Opportunities",
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
    current: 1
  },

  // ---------- How do you like to learn? ----------
  learn: {
    title: "How do you like to learn?",
    key: "moeller-ex-learning",
    paras: [
      "Do some topics come more easily to you than others? Part of it is the topic, and part of it is what you already know and how much you care. Lots of people notice that they enjoy some ways of learning more than others: some like doing it, some like seeing it (videos, diagrams), and some like hearing it (podcasts, audiobooks, talking it through). It's fun to be curious about yours. A preference is just something you notice, and noticing it is real. It is not a rule about how you have to learn.",
      "What you like plays a part too. Some people focus better in a group, and others focus better on their own. Some work best with clear goals, and others work best when they really care about the outcome."
    ],
    stylesTitle: "Ways you might enjoy learning",
    styles: [
      { label: "Doing", text: "Hands-on practice, building, trying it yourself" },
      { label: "Seeing", text: "Videos, diagrams, color-coded notes" },
      { label: "Hearing", text: "Podcasts, audiobooks, talking it through" }
    ],
    gold: { title: "Here's the thing", text: "Your preferences are real, and they are fun to notice. But careful tests haven't shown that studying in the way you prefer helps you learn more, so \"learning styles\" is a myth we can let go of kindly. A better plan is to mix methods, like drawing a diagram, explaining it out loud, and quizzing yourself on what you know. Notice what you enjoy, then try something new. Want to know more? See the How to Learn module on learning myths." },
    quiz: { text: "Curious about your preferences? Try this learning preferences quiz just for fun", note: "(opens in a new tab; it's just for fun. It can't tell you how you should study.)", label: "Try this learning preferences quiz just for fun (opens in a new tab)", href: "https://www.learningstylequiz.com/" },
    reflectTitle: "Your reflection",
    fields: [
      { id: "easiest", label: "Which subjects come easiest to you right now?" },
      { id: "different", label: "What do you do differently in those subjects?" },
      { id: "newmethod", label: "What is one new study method you will try?" }
    ],
    placeholder: "Write a sentence or a few words.",
    privacy: "This is private. It saves only on this device, and no one else can see it unless you show them.",
    saved: "Saved on this device.",
    blocked: "This browser is blocking saving, so your answers will be lost when you close this page.",
    print: "Print my reflection",
    printTitle: "How do you like to learn?",
    nothing: "Nothing yet."
  },

  // ---------- Higher education basics ----------
  basics: {
    title: "Higher education basics",
    lead: "What will I do after high school? (And other important questions!)",
    whatTitle: "What is college?",
    what: [
      { title: "Learn more, earn more", text: "An opportunity to learn more and earn more" },
      { title: "Prepare for a specific career", text: "A place to study and learn for a specific career (like teacher or accountant)" },
      { title: "A broad education", text: "A broad education (liberal arts, business) that prepares you for success in many different careers" },
      { title: "Fun, friends, and hard work", text: "Fun, friends, and hard work!" }
    ]
  },

  // ---------- Why go to college? ----------
  why: {
    title: "Why should I go to college?",
    reasons: ["Earn more", "Live longer, healthier lives", "Less likely to be unemployed", "Less likely to be incarcerated", "Actively contribute to society"],
    /* EARNINGS CHART, REMOVED UNTIL THE SOURCE IS CONFIRMED (see TODO.md). To restore it, add these back to this
       "why" section as chartTitle, caption (with the real source and year), and earnings, then restore the chart
       code from git history (commit fc80333: the "Why" block in assets/js/freshman-q2.js and the .fq2-bar rules
       in assets/css/freshman-q2.css).
         chartTitle: "Earnings by education level",
         caption: "Typical yearly earnings by education level (source: [to confirm])",
         Yearly earnings by education level:
           Less than a high school diploma ........ $40,300
           High school graduate, no college ....... $51,896
           Some college, no degree ................ $58,032
           Associate degree (academic program) .... $58,552
           Associate degree (occupational program)  $61,984
           Bachelor's degree ...................... $88,764
           Master's degree ........................ $104,936
           Doctoral degree (e.g., PhD) ............ $130,832
           Professional degree (e.g., JD, MD) ..... $145,704
    */
    money: "Over a lifetime, a bachelor's degree can mean about $1 million or more in extra earnings compared with a high school diploma (estimates vary)."
  },

  // ---------- Degrees ----------
  degrees: {
    title: "Types of college degrees",
    lead: "The more you learn, the more you can earn. What level of education do you want to reach? It may depend on the job you want.",
    hint: "Tap a card to open it.",
    timelineTitle: "Years of school after high school",
    legend: [{ kind: "core", text: "Bachelor's years" }, { kind: "add", text: "Added years" }, { kind: "range", text: "Varies" }],
    scale: "Each bar is out of 10 years.",
    yearsLabel: "years",
    openAll: "Open all",
    closeAll: "Close all",
    cards: [
      {
        id: "associates", title: "Associate's degree", summary: "2 years",
        items: [
          "2-year degree from a college or university",
          "Can be a stepping-stone to a bachelor's degree",
          "Can also be a final goal for certain career paths",
          "Typically offered at community colleges or technical colleges",
          "Examples: Cincinnati State, UC Blue Ash, Miami regional campuses"
        ],
        segs: [{ years: 2, kind: "core", label: "Associate's" }]
      },
      {
        id: "bachelors", title: "Bachelor's degree", summary: "4 years",
        items: [
          "4-year degree",
          "Highest level of undergraduate education",
          "Students choose a major and also take classes outside it, which builds a well-rounded education and critical thinking skills",
          "Required before pursuing advanced degrees"
        ],
        segs: [{ years: 4, kind: "core", label: "Bachelor's" }]
      },
      {
        id: "masters", title: "Master's degree", summary: "About 6 years total",
        items: [
          "About 6 years total (4-year bachelor's plus a 2-year master's)",
          "Shows a higher level of understanding and expertise than a bachelor's",
          "Often requires specialized coursework, research projects, and sometimes a thesis"
        ],
        segs: [{ years: 4, kind: "core", label: "Bachelor's" }, { years: 2, kind: "add", label: "Master's" }]
      },
      {
        id: "doctorate", title: "Doctorate degree", summary: "2–6 more years after a bachelor's or master's",
        items: [
          "Can take 2–6 years of study and research after a bachelor's or master's",
          "Highest level of academic achievement in most fields",
          "PhD or applied/professional doctorates, like Doctor of Education (EdD) or Doctor of Business Administration (DBA)",
          "Usually involves coursework, research, and a dissertation or capstone project"
        ],
        segs: [{ years: 4, kind: "core", label: "Bachelor's" }, { years: 2, kind: "add", label: "Doctorate (2 years)" }, { years: 4, kind: "range", label: "up to 4 more years" }]
      },
      {
        id: "professional", title: "Professional degree", summary: "Usually 7–8+ years total",
        items: [
          "Usually 7–8+ years total (for example, 4 years of college plus 3 years of law school or 4 years of medical school)",
          "A graduate program that prepares you for a specific career",
          "Different from academic degrees, which focus more on research and theory",
          "Often includes hands-on training and applying knowledge to real situations"
        ],
        segs: [{ years: 4, kind: "core", label: "Bachelor's" }, { years: 3, kind: "add", label: "Professional school (3 years or more)" }, { years: 1, kind: "range", label: "up to 1 more year or longer" }]
      },
      {
        id: "other", title: "Other options: Military and trade school", summary: "Length varies",
        items: [
          "The military and trade school are other paths after high school",
          "Trade school and apprenticeships train you for a skilled career, and the length depends on the trade",
          "Learn more on the Military Options and College Exploration pages"
        ],
        links: [
          { text: "Military Options", href: "military.html" },
          { text: "College Exploration", href: "college-exploration.html" }
        ],
        segs: []
      }
    ]
  },

  // ---------- Career match ----------
  match: {
    title: "Career match game",
    intro: "Read the career, then tap the degree or path it typically needs. You'll find out right away.",
    note: "Some careers have more than one path. These are the most common ones.",
    choices: ["Trade school / apprenticeship", "Associate's", "Bachelor's", "Master's", "Doctorate", "Professional degree"],
    careers: [
      { name: "Electrician", answer: 0, why: "Electricians usually train at a trade school or through an apprenticeship, earning while they learn." },
      { name: "Dental hygienist", answer: 1, why: "Most dental hygienists earn an associate's degree." },
      { name: "Elementary teacher", answer: 2, why: "Teachers typically need a bachelor's degree in education." },
      { name: "Accountant", answer: 2, why: "Most accountants start with a bachelor's degree in accounting." },
      { name: "Engineer", answer: 2, why: "Engineers typically earn a bachelor's degree in engineering." },
      { name: "School counselor", answer: 3, why: "School counselors usually need a master's degree in counseling." },
      { name: "Physical therapist", answer: 4, why: "Physical therapists earn a doctorate (Doctor of Physical Therapy)." },
      { name: "College professor", answer: 4, why: "College professors usually have a doctorate, often a Ph.D." },
      { name: "Lawyer", answer: 5, why: "Lawyers earn a professional degree, the Juris Doctor (JD), from law school." },
      { name: "Doctor / physician", answer: 5, why: "Physicians earn a professional degree, such as an MD, from medical school." }
    ],
    questionLabel: "Career",
    of: "of",
    prompt: "Which degree or path does this career typically need?",
    right: "Right!",
    notQuite: "Not quite.",
    theAnswer: "Typically:",
    next: "Next career",
    results: "See my results",
    again: "Play again",
    scoreLine: "You matched {n} of {total}.",
    scoreHigh: "Nice work. You know your paths.",
    scoreLow: "Good start. Look back at the degree cards above and play again."
  },

  // ---------- Bingo + glossary ----------
  bingo: {
    title: "College Term Bingo",
    intro: "Make a card, then tap a square when you hear that word or learn what it means. The center square is free.",
    make: "Make my card",
    remake: "Make a new card",
    free: "FREE",
    freeLabel: "Free space, already marked",
    // Display-only soft line breaks so long terms wrap at syllables on phones (\u00AD = soft hyphen).
    breaks: {
      "Commencement": "Com\u00ADmence\u00ADment", "Application": "Appli\u00ADcation", "Community College": "Commu\u00ADnity College",
      "Prerequisite": "Pre\u00ADrequisite", "Scholarship": "Scholar\u00ADship", "Sophomore": "Sopho\u00ADmore", "Semesters": "Semes\u00ADters",
      "Certificate": "Certi\u00ADficate", "Associate's": "Associ\u00ADate's", "Resident Advisor/Assistant": "Resident Advisor/\u200BAssistant",
      "Financial Aid": "Finan\u00ADcial Aid", "Residence Halls": "Resi\u00ADdence Halls", "Professor": "Pro\u00ADfessor", "Transcript": "Trans\u00ADcript",
      "Adjunct Professor": "Ad\u00ADjunct Pro\u00ADfessor", "Board of Trustees": "Board of Trust\u00ADees", "Student Union": "Student Un\u00ADion"
    },
    win: "Bingo! You completed a row, a column, or a diagonal.",
    cardLabel: "College term bingo card",
    marked: "marked",
    glossaryTitle: "College term glossary",
    searchLabel: "Search the glossary",
    searchPlaceholder: "Type a word, like loan or major",
    count: "{n} of {total} terms",
    none: "No terms match. Try a different word."
  },

  // ---------- Make the most of high school ----------
  tips: {
    title: "Make the most of your high school years",
    lead: "Every grade you get counts toward your GPA. Challenge yourself in the classroom. This is important for college admission and scholarships.",
    cards: [
      { title: "Get involved", text: "Join clubs, teams, and activities." },
      { title: "Connect your interests", text: "Think about how your interests and abilities could become a college major or career." },
      { title: "Take college prep courses", text: "Challenge yourself with the courses that prepare you for college." },
      { title: "Plan all four years", text: "Talk to your counselor and plan all four years of classes." },
      { title: "Try summer programs", text: "Do summer enrichment programs." }
    ]
  },

  // ---------- Keep exploring ----------
  next: {
    title: "Keep exploring",
    intro: "Try these when you want to learn more about yourself and what comes after high school.",
    links: [
      { text: "Know Yourself: What role do you play?", href: "know-yourself.html#roles", desc: "Exercise 1" },
      { text: "Know Yourself: I love / I know", href: "know-yourself.html#loveknow", desc: "Exercise 2" },
      { text: "Know Yourself: What fires you up?", href: "know-yourself.html#fires", desc: "Exercise 4" },
      { text: "Self-Discovery", href: "self-discovery.html", desc: "Private, self-paced exercises on your habits, goals, and who's in your corner." },
      { text: "Career Exploration", href: "career-exploration.html", desc: "Explore careers that fit your interests." },
      { text: "College Exploration", href: "college-exploration.html", desc: "Learn about colleges and what to look for." },
      { text: "Military Options", href: "military.html", desc: "Explore service paths after high school." }
    ]
  },

  // ---------- Glossary (also the Bingo term list) ----------
  glossary: [] // filled in below
};

FRESHMAN_Q2.glossary = [
  { term: "ACT/SAT", def: "The ACT and SAT are standardized college-entrance tests that many colleges use to compare students from different schools." },
  { term: "Adjunct Professor", def: "An adjunct professor is a part-time college teacher who is hired class by class rather than holding a full-time, permanent teaching job." },
  { term: "Advisor", def: "An advisor is a college staff member who helps you choose classes, stay on track to graduate, and make school plans." },
  { term: "Alumni", def: "Alumni are people who have graduated from a particular school or college." },
  { term: "Application", def: "An application is the set of information and materials you send to a college to ask to be admitted." },
  { term: "Audit", def: "To audit a class is to attend it to learn, usually without taking tests or earning a grade or credit." },
  { term: "Associate's", def: "An associate's is a two-year college degree, most often earned at a community college." },
  { term: "Bachelor's", def: "A bachelor's is a four-year college degree, usually earned at a college or university after high school." },
  { term: "Board of Trustees", def: "The Board of Trustees is the group of leaders who oversee a college and make its biggest decisions, such as budgets and policies." },
  { term: "Campus", def: "A campus is the land and buildings of a college, including classrooms, libraries, dorms, and fields." },
  { term: "Certificate", def: "A certificate is a short program of study, shorter than a degree, that teaches skills for a specific job or field." },
  { term: "Commencement", def: "Commencement is the graduation ceremony where students receive their degrees, not the start of the school year." },
  { term: "Community College", def: "A community college is a local school, usually with lower costs, that offers two-year degrees, certificates, and classes that can transfer to a four-year college." },
  { term: "Dean", def: "A dean is a college leader in charge of a particular area, such as a school within the university or student life." },
  { term: "Diploma", def: "A diploma is the official document that shows you have finished a level of school, such as high school or college." },
  { term: "Dorms", def: "Dorms are college buildings where students live, usually sharing rooms and bathrooms with other students." },
  { term: "FAFSA", def: "The Free Application for Federal Student Aid (FAFSA) is how families ask for federal money for college, and colleges use it to decide what aid you can get." },
  { term: "Fees", def: "Fees are extra charges colleges add on top of tuition to pay for things like labs, technology, or student activities." },
  { term: "Financial Aid", def: "Financial aid is money, such as grants, scholarships, loans, and work study, that helps pay for college." },
  { term: "Freshman", def: "A freshman is a student in the first year of high school or college." },
  { term: "Grade Point Average", def: "Grade Point Average, or GPA, is a number that shows your average grade across all your classes, often on a four-point scale." },
  { term: "Grant", def: "A grant is money for college that you do not have to pay back, usually given based on financial need." },
  { term: "Junior", def: "A junior is a student in the third year of high school or college." },
  { term: "Lectures", def: "Lectures are college classes where a professor mostly teaches by talking to a large group of students." },
  { term: "Loan", def: "A loan is borrowed money for college that you must pay back later, usually with extra interest added." },
  { term: "Major", def: "A major is the main subject you choose to study in college, such as biology or business." },
  { term: "Master's", def: "A master's is an advanced degree, usually about two years of study, that you can earn after finishing a bachelor's." },
  { term: "Minor", def: "A minor is a smaller area of study in college that takes fewer classes than a major." },
  { term: "NCAA", def: "The NCAA is the National Collegiate Athletic Association, the organization that sets rules for most college sports teams in the United States." },
  { term: "Office Hours", def: "Office hours are set times when a professor is available in their office or online to answer questions and help students one-on-one." },
  { term: "Personal Essay", def: "A personal essay is a short piece of writing in your own voice that tells a college about who you are." },
  { term: "Ph.D.", def: "A Ph.D. is one of the highest college degrees, earned after years of advanced study and original research in one subject." },
  { term: "Prerequisite", def: "A prerequisite is a class or requirement you must finish before you are allowed to take a more advanced class." },
  { term: "Professor", def: "A professor is a college teacher who is an expert in a subject and often also does research." },
  { term: "Quarters", def: "Quarters are a college calendar split into school terms of about ten weeks each, shorter than the terms in a semester calendar." },
  { term: "Register", def: "To register is to sign up for your college classes for an upcoming term." },
  { term: "Residence Halls", def: "Residence halls are the official name for college dorms, which are buildings where students live on campus." },
  { term: "Resident Advisor/Assistant", def: "A resident advisor or assistant, often called an RA, is an older student who lives in a dorm to help and support the students living there." },
  { term: "Room and Board", def: "Room and board is the cost of where you live and the meals you eat at college, separate from tuition." },
  { term: "Scholarship", def: "A scholarship is money for college that you do not have to pay back, usually earned for grades, talents, or other achievements." },
  { term: "Semesters", def: "Semesters are a college calendar with two main school terms a year, each about fifteen weeks long, longer than quarter terms." },
  { term: "Senior", def: "A senior is a student in the fourth and final year of high school or college." },
  { term: "Sophomore", def: "A sophomore is a student in the second year of high school or college." },
  { term: "Student Union", def: "A student union is a campus building where students gather to eat, relax, meet, and join activities." },
  { term: "Transcript", def: "A transcript is the official record of all the classes you have taken and the grades you earned." },
  { term: "Tuition", def: "Tuition is the price a college charges for your classes and teaching, not including housing, food, or books." },
  { term: "Tutor", def: "A tutor is a person who gives extra one-on-one or small-group help to students who want to better understand a subject." },
  { term: "University", def: "A university is a college, usually larger, that offers bachelor's degrees and advanced degrees like master's and Ph.D.s." },
  { term: "Work Study", def: "Work study is a part-time campus job, offered as part of financial aid, that lets you earn money you do not pay back." }
];
