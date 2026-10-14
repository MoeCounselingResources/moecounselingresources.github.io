/* =========================================================================
   JUNIORS — College Knowledge + School & Academics
   This one file feeds the Juniors page in BOTH hubs.
     • Top half of the block (sections)  → the "College Knowledge" view
     • "school:" block at the bottom     → the "School & Academics" view
   Each year: update classOf + label, then refresh the content.
   ========================================================================= */

/* =========================================================================
   CARD OPTIONS (used by the cards in the sections below; the same options work on any class page)
     title, desc     the card's name and a one- or two-line summary
     url             the card's main link. External links show "Open ↗"; internal links show
                     "Go to <title>" (set go:"Go to ..." to use different words)
     bullets         up to 2-3 short links (or short facts) shown on the card
     panels          closed-by-default "Show more" sections inside the card:
                     [{title (default "Show more"), text, bullets, miniGuide}]
     tip             a gold highlighted note: {label, text}
     miniGuide       a step-by-step guide (also allowed inside a panel)
   Page style flags (set once on the page object): compactCards, accentCards, goLabels, maxCardLinks
   (default 2: extra links move into a "More links" panel), indexGroups, anchorAliases.
   ========================================================================= */

/* =========================================================================
   JUNIOR KEY DATES AND COLLEGE KNOWLEDGE MEETINGS — UPDATE EVERY SCHOOL YEAR
   These two lists feed the "Junior Timeline" key dates and the "Junior Checklist"
   below. Past dates stay on the page (dimmed) until you change them, so next fall:
     • change each date, its "iso" date (YYYY-MM-DD), and "isoEnd" for a span
     • check the College Knowledge meeting topics and descriptions
   Each key date also shows in the checklist under its "m" month (1 = January).
   Dates below are for the Class of 2028 (2026–27 school year).
   ========================================================================= */
const JUNIOR_KEY_DATES = [
  {date:"Sept. 30", iso:"2026-09-30", m:9, title:"College Fair", detail:"Talk with a wide range of schools in one place. No registration needed."},
  {date:"Oct. 12", iso:"2026-10-12", m:10, title:"PSAT/NMSQT", detail:"Moeller's testing day. It's good SAT practice, and it's the qualifying test for the National Merit Scholarship Program."},
  {date:"Oct. 13", iso:"2026-10-13", m:10, title:"Junior Parent Night", detail:"An evening session for the parents and guardians of juniors."},
  {date:"Jan. – May", iso:"2027-01-01", isoEnd:"2027-05-31", m:1, title:"Junior Family College Planning Meetings", detail:"A one-on-one meeting with your counselor about your college plans. Meetings run from January through May."},
  // College visit days. UPDATE EVERY YEAR from the school calendar: the days off listed below, and the "iso"/"isoEnd" span.
  {date:"Days off", iso:"2027-01-18", isoEnd:"2027-04-19", title:"College visit days", detail:"Days off school are great times to visit colleges. This year’s days off: Jan. 18, Feb. 12, Feb. 15, Feb. 18, Mar. 15, Mar. 29–Apr. 2, and Apr. 19. Juniors and seniors also get 2 excused days for college visits, with a note from the college."},
  {date:"February", iso:"2027-02-01", isoEnd:"2027-02-28", m:2, title:"College list building begins", detail:"Start turning what you've learned into a list of schools."},
  {date:"March", iso:"2027-03-01", isoEnd:"2027-03-31", m:3, title:"Request your teacher recommendation", detail:"Fill out the Microsoft Form in College Knowledge and list your top three teachers. You'll receive 1 teacher letter."},
  {date:"Mar. 23", iso:"2027-03-23", m:3, title:"School-day SAT", detail:"Taken at school. You'll fill in your registration information at the February College Knowledge meeting."},
  {date:"April", iso:"2027-04-01", isoEnd:"2027-04-30", m:4, title:"Complete your recommendation questionnaire", detail:"A Microsoft Form that helps your counselor and teacher write your letter."},
  {date:"April", iso:"2027-04-01", isoEnd:"2027-04-30", m:4, title:"Create your Common App account", detail:"Use a personal email address, not your Moeller email."}
];

// College Knowledge class meetings, one per month. "topics" is the official title; "detail" is the student-friendly summary; "tip" is the short highlighted note under it.
const JUNIOR_MEETINGS = [
  {m:9, label:"September", months:[9], topics:"Understanding Fit, College Research & Application Timeline, SCOIR", detail:"Learn what makes a college a good fit academically, socially, and financially, and how to research beyond the rankings. We’ll walk through the junior-year timeline and get you started in SCOIR.", tip:"Over 100 colleges visit Moeller each fall. Sign up in SCOIR at least 2 days ahead and get your teacher’s permission to miss class."},
  {m:10, label:"October", months:[10], topics:"Mock Admissions Activity with Admissions Reps", detail:"Step into an admissions officer’s shoes. Alongside real admissions reps, you’ll review sample applications (transcript, test scores, activities, essay, and recommendation letters) and decide who to admit, deny, or defer.", tip:"Pay attention to what makes an application stand out. It’s often more than grades."},
  {m:11, label:"November", months:[11], topics:"The College Search, College Visits & Resume Writing", detail:"Learn the types of college visits, what to look for on campus, and how colleges track demonstrated interest. You’ll explore SCOIR’s search tools, start a resume in SCOIR that becomes your Common App Activities section, and set up your LinkedUp Connect profile.", tip:"Students, not parents, should contact colleges. Rep visits at Moeller and opening college emails can count as interest."},
  {m:12, label:"December", months:[12], topics:"Preparing for the ACT & SAT (Compass Education presentation)", detail:"Compass Education explains how the ACT and SAT work, how to decide which test fits you, and how to prepare. Start planning when you’ll test, especially if you’re taking Algebra II this year.", tip:"Pick one test and plan to take it 2–3 times."},
  {m:1, label:"January", months:[1], topics:"Course Registration & Exploring College Majors", detail:"You don’t need to know your major yet. Learn how students actually choose a major, when it helps to decide early (engineering, nursing, education), and how to use SCOIR’s career assessments. Choose senior courses that help you explore.", tip:"Narrow it to 2–3 areas of interest, then look up those majors at colleges you like."},
  {m:2, label:"February", months:[2], topics:"College Research & List Building, Teacher Recommendations; Financial Aid presentation; SAT pre-administration for the March 23 SAT", detail:"Start building your college list, learn how teacher recommendations work at Moeller, and get an introduction to paying for college: cost of attendance, net price calculators, the FAFSA, and scholarships. We’ll also complete pre-administration for the March 23 school-day SAT.", tip:"Talk with teachers in person now. You’ll pick your top three teachers in March."},
  {m:3, label:"March", months:[3], topics:"The College Essay Panel", detail:"Hear what makes a strong college essay, then brainstorm your own topic: a small, specific moment that shows how you think and what you value. You’ll also submit your teacher recommendation request, listing your top three teachers.", tip:"A specific scene beats a broad topic."},
  {m:4, label:"April", months:[4,5,6,7,8], topics:"The College Application", detail:"Learn what a complete application includes, how deadlines work (early action, early decision, regular, and rolling), and how to keep your list balanced. You’ll create your Common App account and complete the questionnaire for your recommendation teacher.", tip:"Use a personal email for Common App. Over the summer, narrow your list, update your resume, and keep working on your essay."}
];

YEARS.junior = {
    classOf: "2028",
    tabLabel: "Junior",
    label: "Class of 2028",
    stage: "Juniors",
    blurb: "This year is about understanding the process and building your list, not finishing it. By spring, you'll start your Common App essay ahead of applying next fall.",
    collegeLabel: "College Knowledge",
    // Junior/sophomore/freshman: set layout to "indexed" for a left-side index, or delete it for stacked sections.
    layout: "indexed",
    // Card style (see "Card options" above): balanced cards (equal height per row, links pinned to the
    // bottom), gold card accents, internal links that read "Go to ...", and cards can hold "Show more"
    // panels, gold tip boxes, and mini-guides. To use the same look on another class page, add
    // compactCards, accentCards and goLabels there.
    compactCards: true,
    accentCards: true,
    goLabels: true,
    // Links to sections that moved to the shared Essays page (essays.html) land on the short Essays section.
    anchorAliases: {essayPrompts:"essays", essayBrainstorm:"essays", writingGuide:"essays", essayGuides:"essays"},
    order: ["research","exploration","essays","juniorChecklist","timeline","testing","financialAid","military"],
    sections: {
      exploration: {
        navLabel: "College Exploration",
        title: "College exploration",
        note: "Building your list",
        desc: "Three lists of schools, each on its own tab. Use them to find schools you haven't heard of yet and to make sure your list has a mix of sizes and types.",
        type: "schoolLists",
        lists: ["goldilocks", "liberalArts", "engineering"],
        // Optional: add more exploration resources here and they show below the lists.
        items: [
          {title:"Opportunities Board", desc:"College fairs, programs, career exploration, and jobs shared with Moeller counseling.", url:"opportunities.html"}
        ]
      },
      military: {
        navLabel: "Military Options",
        title: "Military Options",
        note: "Plan ahead",
        desc: "Academy summer programs and nomination applications start in junior year. Look now so you don’t miss them.",
        items: [
          {title:"Military Options overview", desc:"Compare the three paths side by side.", url:"military.html"},
          {title:"Service Academies", desc:"The five academies, benefits, nominations, and Ohio nominator deadlines.", url:"service-academies.html"},
          {title:"Senior Military Colleges", desc:"Six colleges with a corps of cadets inside a regular college experience.", url:"senior-military-colleges.html"},
          {title:"ROTC", desc:"National scholarships by branch, minimums, and deadlines.", url:"rotc.html"}
        ]
      },
      research: {
        navLabel: "College Research",
        title: "College research tools",
        note: "Building your list",
        desc: "Start wide, then narrow — these help you figure out what actually fits.",
        items: [
          {title:"Getting the most from a campus visit", span:true, desc:"What to look for beyond the tour, in person or virtually.", bullets:[
            {parts:[{text:"College Visit 101: Tips & Questions", url:"college-exploration.html#visitGuide"}, " and ", {text:"virtual college tours", url:"college-exploration.html#visits"}, " for when you can’t get to campus."]}
          ], panels:[
            {title:"When to visit", bullets:[
              {parts:["Days off school are listed in ", {text:"Moeller’s key dates", url:"#timeline"}, ", plus 2 excused visit days with a note from the college."]}
            ]},
            {title:"Visit tips", bullets:[
              "Talk with current students and admissions officers.",
              "Visit the department for your intended major.",
              "Find the writing center, tutoring, and student activities.",
              "Look at bulletin boards and the student newspaper.",
              "Take notes and pictures, since visits run together.",
              "Be polite and stay off your phone, because admissions reps read applications.",
              {text:"Campus Visit Checklist", url:"https://bigfuture.collegeboard.org/plan-for-college/find-your-fit/campus-visit-checklist", after:" from BigFuture"},
              {text:"BigFuture: campus visits and tours", url:"https://bigfuture.collegeboard.org/plan-for-college/find-your-fit/campus-visits-and-tours"}
            ]}
          ], tip:{label:"Rep visits at Moeller:", text:"Sign up in SCOIR at least 2 days ahead, and get your teacher’s permission to miss class."}},
          {title:"Building a balanced college list", desc:"What \"reach, target (match), and likely (safety)\" actually mean, and how to start sorting the schools you're curious about into them.", url:"https://bigfuture.collegeboard.org/help-center/how-do-you-find-reach-match-and-safety-colleges", bullets:[
            {text:"Browse the three school lists", url:"#exploration"},
            {text:"See test ranges on Moeller Popular Colleges", url:"popular-colleges.html"}
          ]},
          {title:"Co-op vs. internship: what’s the difference?", desc:"Both let you gain real work experience in your field before you graduate.", bullets:[
            {text:"UC’s co-op vs. internship comparison", url:"https://www.uc.edu/blog/co-op-internship.html"}
          ], panels:[
            {bullets:[
              {label:"Co-op:", text:"You alternate semesters of school with semesters of full-time, paid work related to your major, often several rotations with the same or different employers. Co-ops are built into some programs and can add time to your degree. Cincinnati is home to the co-op: UC started the first co-op program in 1906."},
              {label:"Internship:", text:"Usually shorter, often one summer or a part-time role during the school year. It may be paid or unpaid, and you may earn credit."},
              {label:"Ask on college visits:", text:"Does this school offer co-ops or internships in my major? Are they required? Does a co-op add time to graduation?"}
            ]}
          ]},
          {title:"Comparing majors & programs", desc:"Look up what a school actually offers, not just its ranking. You don't have to pick a major yet, since many colleges let you decide later.", url:"https://nces.ed.gov/collegenavigator/", bullets:[
            {text:"BigFuture Majors Directory", url:"https://bigfuture.collegeboard.org/explore-careers/majors"}
          ]},
          {title:"IPEDS Find Your College", desc:"The U.S. Department of Education's free tools for looking up a college's size, programs, costs, and graduation rates.", url:"https://nces.ed.gov/ipeds/find-your-college/"},
          {title:"Moeller Popular Colleges", desc:"Test ranges, deadlines, and requirements for the schools Moeller students apply to most.", url:"popular-colleges.html"}
        ]
      },
      essays: {
        navLabel: "Essays",
        title: "Essays",
        note: "Starting to think ahead",
        desc: "You don't need a draft yet — these are for getting familiar with what's coming. Each card takes you to its part of the shared Essays page.",
        items: [
          {title:"This year's Common App prompts", desc:"An early look at the seven prompts you'll choose from next fall.", url:"essays.html#essayPrompts", go:"Go to Common App Essay Prompts", bullets:[
            {text:"Common App's official prompt page", url:"https://www.commonapp.org/apply/essay-prompts/"}
          ], panels:[
            {text:"Your essay will be 250 to 650 words. Common App usually keeps the prompts the same from year to year, so this year's set is a good preview."}
          ]},
          {title:"Brainstorming your story", desc:"Exercises for finding a topic before junior spring, without pressure.", url:"essays.html#essayBrainstorm", go:"Go to Essay Brainstorm", bullets:[
            {text:"Common App First-Year Toolkit", url:"https://www.commonapp.org/apply/fy-toolkit/"}
          ], panels:[
            {text:"Answer a few questions, collect your ideas, and bring them to your counselor or English teacher. This is brainstorming, not writing."}
          ]},
          {title:"Why starting a draft in spring matters", desc:"A head start in spring means a calmer senior fall. Start your Common App essay this spring, then tackle supplements in the summer.", url:"essays.html#writingGuide", go:"Go to Essay Writing Guide", bullets:[
            {text:"Supplemental Essay Guides", url:"essays.html#essayGuides"}
          ]}
        ]
      },
      juniorChecklist: {
        navLabel: "Junior Checklist",
        title: "Junior Year Checklist",
        note: "Check items off as you go",
        desc: "Your College Knowledge class meetings and key dates, month by month. Checking a box just marks it for you in this browser. It won't affect anyone else's view.",
        type: "checklist",
        groups: JUNIOR_MEETINGS.map(mt => ({
          label: mt.label,
          months: mt.months,
          items: [{text: "College Knowledge class meeting: " + mt.topics, detail: mt.detail, tip: mt.tip}].concat(
            JUNIOR_KEY_DATES.filter(d => d.m === mt.m).map(d => ({text: d.title + " (" + d.date + ")", detail: d.detail})))
        }))
      },
      timeline: {
        navLabel: "Junior Timeline",
        title: "Application timeline & checklists",
        note: "Junior year",
        desc: "A month-by-month view of what matters this year.",
        timeline: JUNIOR_KEY_DATES,
        stacked: true,
        items: [
          {title:"Junior year planning checklist", desc:"Month-by-month steps for your College Knowledge class meetings and key dates, with checkboxes that save on your device.", url:"#juniorChecklist", bullets:[
            {text:"11th Grade College and Career Planning Checklist", url:"https://bigfuture.collegeboard.org/checklist", after:" from BigFuture"}
          ]},
          {title:"PSAT/NMSQT", desc:"The PSAT/NMSQT is a practice version of the SAT and the qualifying test for the National Merit Scholarship Program.", url:"https://satsuite.collegeboard.org/in-school-assessments/scholarships-recognition/national-merit-scholarship-program", bullets:[
            {text:"PSAT/NMSQT FAQ", url:"https://bigfuture.collegeboard.org/plan-for-college/stand-out-in-high-school/faq-psat-nmsqt", after:" from BigFuture"}
          ], panels:[
            {text:"Most students take it once, in junior year, and only junior-year scores count for National Merit. Moeller's testing day is listed in the key dates above."}
          ]},
          {title:"Setting up your Common App account", desc:"You'll create your Common App account in April of junior year.", url:"https://www.commonapp.org/apply/first-year-students/", bullets:[
            {text:"Create your Common App account", url:"https://apply.commonapp.org/createaccount"},
            {text:"See how seniors set up Common App & SCOIR", url:"seniors.html#moreEssentials"}
          ], panels:[
            {text:"School filters can block emails from colleges, and you lose access to your Moeller email after you graduate. Don't match your Common App to SCOIR yet. You'll do that, and waive FERPA, at a group meeting at the start of senior year."}
          ], tip:{text:"Use a personal email address, not your Moeller email."}},
          {title:"Requesting letters of recommendation", desc:"Juniors get 1 core-class teacher letter (English, math, science, social studies, or world language) plus a counselor letter.", url:"https://bigfuture.collegeboard.org/plan-for-college/apply-to-college/application-process/how-to-get-a-great-letter-of-recommendation", bullets:[
            {text:"Common App: the first-year recommendation process", url:"https://www.commonapp.org/static/088c92645a5827f61016fd81ac42b3f4/Resource_FY_RecProcess_ENG_2025.06.25_1.pdf", after:" (PDF)"},
            {text:"Common App: teacher brag sheet", url:"https://www.commonapp.org/static/7bc36ad35601e024c5ba48dcef1292e2/Resource_FY_TeacherBragSheet_ENG_2025.06.25_1.pdf", after:" (PDF)"}
          ], panels:[
            {title:"How many letters", text:"Catino/Global Scholars get 2 core-class teacher letters. Service academy applicants need 2–3 teacher letters (usually math, English, and science), and it’s the student’s responsibility to know this."},
            {title:"Who to ask", bullets:[
              "A junior-year core-class teacher who has seen your growth, effort, and engagement.",
              "A subject related to your intended major, if you have one (for example, math or science for engineering).",
              "Not a mentor teacher, unless they’ve taught you in class."
            ]},
            {title:"Timeline: step by step", miniGuide:{steps:[
              {icon:"checklist", title:"February–March", bullets:["Talk with teachers in person."]},
              {icon:"checklist", title:"March College Knowledge", bullets:["Submit the request form with your top three teachers."]},
              {icon:"checklist", title:"March–April", bullets:["Counseling balances requests among teachers."]},
              {icon:"checklist", title:"April College Knowledge", bullets:["Complete the Teacher Questionnaire."]},
              {icon:"checklist", title:"April–October", bullets:["Teachers upload letters to SCOIR."]}
            ]}, bullets:[
              {text:"How seniors sign FERPA and add recommenders", url:"seniors.html#moreEssentials"}
            ]}
          ]}
        ]
      },
      testing: {
        navLabel: "Testing",
        title: "Testing resources",
        note: "This year's calendar",
        desc: "Test dates, formats, and how scores work.",
        stacked: true,
        items: [
          {title:"SAT & ACT test dates", desc:"Weekend SAT and national ACT dates for the year, plus Moeller's recommendations on when to start testing.", bullets:[
            {text:"SAT test dates", url:"https://satsuite.collegeboard.org/sat/dates-deadlines"},
            {text:"ACT test dates", url:"https://www.act.org/content/act/en/products-and-services/the-act/registration/test-dates.html"},
            {text:"All of Moeller's testing recommendations", url:"act-sat.html#recommendations"}
          ], panels:[
            {text:"Moeller's own testing days are in the key dates: the PSAT/NMSQT in October and the school-day SAT in March.", bullets:[
              "If you've already completed Algebra II, you may consider testing in the fall of junior year.",
              "If you're taking Algebra II this year, wait until the school-day SAT in the spring of junior year to begin testing, since Algebra II is tested on these exams.",
              "Pick one test (SAT or ACT) and plan to take it 2–3 times. Most students shouldn't take more than four tests total.",
              "Many colleges remain test-optional, but some (such as Ohio State) require ACT or SAT scores. Prepare and test as if you'll use your scores. Talk with your school counselor about a testing strategy, including when to report scores and when to withhold them.",
              {text:"Moeller's key dates", url:"#timeline"}
            ]}
          ]},
          {title:"Which test fits you", desc:"Compare the two tests side by side. Colleges accept both, so try a free practice test of each and focus on the one that fits you.", url:"https://bigfuture.collegeboard.org/plan-for-college/apply-to-college/sat/sat-vs-act", bullets:[
            {text:"ACT's own SAT vs. ACT comparison", url:"https://www.act.org/content/act/en/products-and-services/the-act/scores/act-vs-sat.html"},
            {text:"Compare your SAT and ACT scores with the converter", url:"act-sat.html#concordance"}
          ]},
          {title:"Test prep resources", desc:"Free practice tests, plus a list of test prep programs and tutoring in the Cincinnati area.", url:"act-sat.html#prep", bullets:[
            {text:"Test prep programs & tutoring", url:"act-sat.html#prepPrograms"}
          ]},
          {title:"Score release dates & superscoring", desc:"Scores usually arrive within a few weeks of test day.", url:"https://satsuite.collegeboard.org/scores/score-release-dates", bullets:[
            {text:"ACT Superscore FAQs", url:"https://www.act.org/content/act/en/students-and-parents/high-school-success/testing-advice-for-the-act/superscore-faqs.html"},
            {text:"SAT Score Choice", url:"https://satsuite.collegeboard.org/scores/sending-sat-scores/additional/score-choice"}
          ], panels:[
            {text:"Superscoring means a college combines your best section scores across test dates, but every college sets its own policy, so check them as you build your list.", bullets:[
              {text:"ACT scores", url:"https://www.act.org/content/act/en/products-and-services/the-act/scores.html"},
              {text:"Later: deciding whether to submit scores", url:"seniors.html#testing"},
              {text:"FairTest's test-optional list", url:"https://fairtest.org/test-optional-list/"},
              {text:"Moeller Popular Colleges", url:"popular-colleges.html"}
            ]}
          ]}
        ]
      },
      financialAid: {
        navLabel: "Financial Aid",
        title: "Financial aid & FAFSA",
        note: "Getting ready",
        desc: "You don't need to file anything yet — this is about understanding how cost works before senior year.",
        items: [
          {title:"Cost vs. sticker price", desc:"Why the listed price is rarely what a family actually pays.", url:"financial-aid.html#cost"},
          {title:"Is a college worth the cost?", desc:"How return on investment works, and why a two-year degree can look better at first while a bachelor's usually pays off more over a lifetime.", url:"https://cew.georgetown.edu/cew-reports/roi2025/"},
          {title:"Merit aid vs. need-based aid", desc:"The difference between the two, and how it can affect your list.", url:"financial-aid.html#basics"},
          {title:"Getting ready for FAFSA", desc:"What to start gathering this year so senior fall is easier.", url:"financial-aid.html#byGrade"}
        ]
      }
    },

    // ---------- School & Academics view (School Counseling side) ----------
    school: {
      blurb: "Junior year is often the heaviest academic year. Here's the school-side support to keep you on track.",
      order: ["studySkills","academicSupport","forParents"],
      sections: {
        exploration: {
          title: "Exploration",
          note: "Placeholder",
          desc: "Exploration resources for juniors from School Counseling. Replace these with the real resources.",
          items: [
            {title:"Resource title", desc:"Placeholder — a one-line description of this resource.", url:"#"},
            {title:"Resource title", desc:"Placeholder — a one-line description of this resource.", url:"#"}
          ]
        },
        studySkills: {
          title: "Study skills for junior year",
          note: "Placeholder",
          desc: "Replace these with junior-specific study tips.",
          items: [
            {title:"Managing a heavier course load", desc:"Placeholder — planning around AP/CCP and harder classes.", url:"study-tips.html"},
            {title:"Studying for cumulative exams", desc:"Placeholder — spacing out review before finals.", url:"study-tips.html"}
          ]
        },
        academicSupport: {
          title: "Academic support",
          note: "Placeholder",
          desc: "Study groups, Chem Block, and tutoring available to juniors.",
          items: [
            {title:"Study groups & Chem Block", desc:"Placeholder — when and where they meet.", url:"academic-support.html"},
            {title:"Peer & teacher tutoring", desc:"Placeholder — how to sign up.", url:"academic-support.html"},
            {title:"GPA Calculator", desc:"Figure your yearly and cumulative GPA, weighted and unweighted, and see where you stand for Latin Honors.", url:"gpa-calculator.html"},
            {title:"Honor Roll Calculator", desc:"Check whether your quarter grades put you on First or Second Honors.", url:"honor-roll.html"}
          ]
        },
        forParents: {
          title: "For parents",
          note: "Placeholder",
          desc: "Ways families can support juniors this year.",
          items: [
            {title:"Supporting your junior", desc:"Placeholder — parent guidance for junior year.", url:"parent-education.html"}
          ]
        }
      }
    }
  };
