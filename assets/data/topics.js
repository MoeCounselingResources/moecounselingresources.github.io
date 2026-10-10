/* =========================================================================
   TOPIC PAGES — the pages each dashboard box opens.
   Each block works exactly like a grade page's sections: a title, a short
   description, and items with title / desc / url. Everything marked
   "Placeholder" is waiting for your real content.
   "hub" decides which hub the page belongs to ("school" or "college").
   ========================================================================= */

function placeholderSection(title, desc){
  return {
    title: title,
    note: "Placeholder",
    desc: desc,
    items: [
      {title:"Resource title", desc:"Placeholder — a one-line description of this resource.", url:"#"},
      {title:"Resource title", desc:"Placeholder — a one-line description of this resource.", url:"#"}
    ]
  };
}

/* ---------------- School Counseling topics ---------------- */

YEARS["study-tips"] = {
  hub: "school",
  label: "Study Tips & How to Study",
  blurb: "Ways to study smarter, take better notes, and walk into tests prepared.",
  order: ["howToStudy","notes","tests"],
  sections: {
    howToStudy: placeholderSection("How to study", "Study methods that work, and how to build a routine."),
    notes: placeholderSection("Note-taking", "Methods for taking notes you'll actually use later."),
    tests: placeholderSection("Preparing for tests", "Planning your review in the days and weeks before an exam.")
  }
};

YEARS["parent-education"] = {
  hub: "school",
  label: "Education for Parents",
  blurb: "Guidance, sessions, and resources to help families support their students at every stage.",
  order: ["sessions","supporting","resources"],
  sections: {
    sessions: placeholderSection("Parent sessions & nights", "Upcoming and recorded sessions for families."),
    supporting: placeholderSection("Supporting your student", "Practical ways to help with school, stress, and planning."),
    resources: placeholderSection("Helpful resources", "Articles, guides, and tools for families.")
  }
};

YEARS["academic-support"] = {
  hub: "school",
  label: "Academic Support",
  blurb: "Study groups, Chem Block, and the tutors available to you in school.",
  order: ["groups","chem","tutors"],
  sections: {
    groups: placeholderSection("Study groups", "When and where study groups meet, by subject."),
    chem: placeholderSection("Chem Block", "Extra help time for chemistry students."),
    tutors: placeholderSection("Tutors in school", "Peer and teacher tutoring, and how to sign up.")
  }
};

/* ---------------- College Counseling topics ---------------- */

YEARS["college-exploration"] = {
  hub: "college",
  label: "College Exploration",
  blurb: "Researching schools, visiting campuses, and building a list that fits you.",
  order: ["lists","research","visits","list"],
  sections: {
    lists: {
      title: "School lists",
      note: "Three lists to browse",
      desc: "Three lists of schools, each on its own tab. Use them to find schools you haven't heard of yet and to see the range of sizes and types out there.",
      type: "schoolLists",
      lists: ["goldilocks", "liberalArts", "engineering"],
      items: []
    },
    research: placeholderSection("Researching colleges", "Tools for comparing schools, majors, and costs."),
    visits: placeholderSection("Campus & rep visits", "Getting the most from a visit, in person or virtual."),
    list: placeholderSection("Building your list", "Reach, target, and likely schools, and how to balance them.")
  }
};

/* ---------------- Military Options (main page + 3 sub-pages) ----------------
   military.html is the main page. Each option has its own page:
     service-academies.html, senior-military-colleges.html, rotc.html
   "parent" makes the back link on a sub-page return to Military Options.
   Deadlines and score minimums change every year. Re-check them each spring. */

YEARS["military"] = {
  hub: "college",
  label: "Military Options for Students",
  blurb: "Three ways to combine college with a path to serving as a military officer. Choose an option to see the schools, links, and deadlines.",
  order: ["options","compare"],
  sections: {
    options: {
      title: "Your options",   // not shown (hideHeading)
      hideHeading: true,
      stacked: true,
      items: [
        {title:"United States Service Academies", desc:"Five federal colleges for the Army, Navy and Marine Corps, Air Force and Space Force, Coast Guard, and Merchant Marine. Tuition-free and highly selective, and four of the five require a congressional nomination. Graduates serve as officers.", url:"service-academies.html", bullets:[
          {text:"Air Force Academy", url:"https://www.usafa.edu/admissions/", after:" admissions website"},
          {text:"Coast Guard Academy", url:"https://uscga.edu/admissions/", after:" admissions website"},
          {text:"Merchant Marine Academy", url:"https://www.usmma.edu/admissions", after:" admissions website"},
          {text:"Military Academy (Army - West Point)", url:"https://www.westpoint.edu/admissions", after:" admissions website"},
          {text:"Naval Academy", url:"https://www.usna.edu/Admissions/index.php", after:" admissions website"}
        ]},
        {title:"Senior Military Colleges / Corps of Cadets", desc:"A traditional college experience inside a structured cadet corps, at six schools designated by federal law. At most of them, students choose whether to commission after graduation.", url:"senior-military-colleges.html"},
        {title:"Reserve Officers' Training Corps (ROTC)", desc:"Officer training at a regular college, with national scholarships from the Army, Navy and Marine Corps, and Air Force and Space Force. The scholarship application is separate from your college applications.", url:"rotc.html"}
      ]
    },
    compare: {
      title: "Side by side",
      desc: "A quick comparison. Details are on each option's page.",
      items: [],
      table: {
        headers: ["", "Service Academies", "Senior Military Colleges", "ROTC"],
        rows: [
          ["Cost", "Tuition-free", "Regular college costs", "Scholarships available"],
          ["Service after college", "Required, usually 5+ years", "Optional", "Required once you contract"],
          ["When to start", "Spring of junior year", "Senior fall", "Summer before senior year"]
        ]
      }
    }
  }
};

YEARS["service-academies"] = {
  hub: "college",
  parent: "military",
  label: "United States Service Academies",
  blurb: "The five service academies offer a top-tier education combined with leadership and physical training, and a commitment to serve in the U.S. military after graduation. Admission is highly competitive, so start preparing early.",
  order: ["academies","benefits","nomination","nominators","moellerPolicy","summer"],
  sections: {
    academies: {
      title: "The five academies",
      desc: "Locations and admissions websites.",
      items: [
        {title:"U.S. Air Force Academy", desc:"Colorado Springs, CO. Graduates commission into the Air Force or Space Force.", url:"https://www.usafa.edu/admissions/"},
        {title:"U.S. Coast Guard Academy", desc:"New London, CT. The only academy that does not require a congressional nomination.", url:"https://uscga.edu/admissions/"},
        {title:"U.S. Merchant Marine Academy", desc:"Kings Point, NY. Graduates earn a merchant mariner license and a commission, usually in the Navy Reserve.", url:"https://www.usmma.edu/admissions"},
        {title:"U.S. Military Academy (West Point)", desc:"West Point, NY. Graduates commission into the Army.", url:"https://www.westpoint.edu/admissions"},
        {title:"U.S. Naval Academy", desc:"Annapolis, MD. Graduates commission into the Navy or Marine Corps.", url:"https://www.usna.edu/Admissions/index.php"}
      ]
    },
    benefits: {
      title: "Benefits",
      type: "responsibilities",
      groups: [
        {title:"What's covered", items:[
          "Tuition, room and board, textbooks, and uniforms",
          "A monthly stipend at four of the five academies. Merchant Marine midshipmen are paid only during their time at sea and pay some fees."
        ]},
        {title:"What you gain", items:[
          "Rigorous leadership and fitness training",
          "A guaranteed job as an officer after graduation"
        ]},
        {title:"What you commit to", items:[
          "Service after graduation, usually at least five years of active duty"
        ]}
      ]
    },
    nomination: {
      title: "The nomination process",
      desc: "A nomination is separate from the academy's own application. You need both.",
      type: "responsibilities",
      groups: [
        {title:"Who needs one", items:[
          "West Point, the Naval Academy, the Air Force Academy, and the Merchant Marine Academy all require a nomination.",
          "The Coast Guard Academy does not. Apply to it directly."
        ]},
        {title:"Who can nominate you", items:[
          "Both of your U.S. Senators",
          "Your U.S. Representative",
          "The Vice President, for West Point, Navy, and Air Force only (not Merchant Marine)",
          "Apply to every source you're eligible for. Each one is a separate chance."
        ]},
        {title:"When", items:[
          "Each office sets its own deadline and application. Ohio's offices are usually due in mid-September of senior year.",
          "Start gathering essays, letters, and test scores the summer after junior year."
        ]}
      ]
    },
    nominators: {
      title: "Ohio nominators for Moeller families",
      note: "Fall 2026 deadlines",
      desc: "These are the deadlines for the Class of 2027. Each office posts next year's dates in the spring, so juniors should check back then. Not sure which district you live in? Look up your representative by home address.",
      stacked: true,
      items: [
        {title:"U.S. Senator Bernie Moreno", desc:"Deadline: received by 5:00 PM, Friday, September 18, 2026. Coordinator: Hayden Ferguson (Hayden_Ferguson@Moreno.Senate.gov). Interviews September through November.", url:"https://www.moreno.senate.gov/services/academy-nominations/", bullets:[
          "Online application, essay, and resume",
          "Three signed letters of recommendation: one from an educator, two from people who know you but are not related. Use the same letters for Senator Husted.",
          "Official transcript",
          "Test scores sent from the testing agency, plus a copy of your score report"
        ]},
        {title:"U.S. Senator Jon Husted", desc:"Deadline: September 18, 2026 at 5:00 PM. Coordinator: Steven Cook (Steven_Cook@husted.senate.gov or ServiceAcademy@Husted.Senate.gov). Interviews in October and November.", url:"https://www.husted.senate.gov/services/academy-nominations/", bullets:[
          "Online application and essay",
          "Three signed letters of recommendation: one from an educator, two from people who know you. Use the same letters for Senator Moreno.",
          "Official transcript",
          "Test scores sent from the testing agency, plus a copy of your score report"
        ]},
        {title:"Representative Greg Landsman, 1st District", desc:"Deadline: Tuesday, September 15, 2026. Email submission strongly preferred: Landsman.ServiceAcademies@mail.house.gov", url:"https://landsman.house.gov/service-academy-nominations", bullets:[
          "Completed nomination application and a current photo",
          "High school transcript (unofficial is fine)",
          "SAT or ACT results (unofficial is fine; a screenshot must show your name and test date)",
          "Activities resume and an essay of 500 words or less on why you want to attend",
          "Two letters of recommendation"
        ]},
        {title:"Representative Dave Taylor, 2nd District", desc:"Deadline: postmarked by Friday, September 18, 2026. Mail to Office of Congressman Dave Taylor, Attn: Annie Cummins, 4350 Aicholtz Road, Ste. 110, Cincinnati, OH 45245. Questions: annie.cummins@mail.house.gov or 513-474-7777.", url:"https://taylor.house.gov/services/military-academy-nominations", bullets:[
          "Nomination application, current photo, and personal essay",
          "Official transcript with class rank",
          "Three letters of recommendation, each with the office's form. No letters from family members.",
          "Official SAT or ACT scores and a list of activities"
        ]},
        {title:"Representative Warren Davidson, 8th District", desc:"Deadline: Friday, October 30, 2026 at 4:00 PM, to the Butler County office. Request the application by sending the packet request form to Ben.Thaeler@mail.house.gov.", url:"https://davidson.house.gov/service-academy-nominations", bullets:[
          "Application and current photo",
          "High school transcript and ACT or SAT scores",
          "Activities resume and an essay of two pages or less",
          "Four letters of recommendation"
        ]},
        {title:"Find your U.S. Representative", desc:"Enter your home address to see which district you live in.", url:"https://www.house.gov/representatives/find-your-representative"},
        {title:"Vice Presidential nomination", desc:"Open to any eligible U.S. citizen, for West Point, Navy, and Air Force. Apply online between March 1 and January 31.", url:"https://www.whitehouse.gov/service-academy-nomination/"}
      ]
    },
    moellerPolicy: {
      title: "Transcripts and letters from Moeller",
      type: "callout",
      body: "Under FERPA, Moeller can't give official transcripts or teacher and counselor letters directly to students. Choose one: send us the nominator's email address and we'll email the letters and transcript to that office, or bring your completed packet to the Counseling Office in an addressed envelope and we'll add the letters and transcript and mail it for you."
    },
    summer: {
      title: "Summer programs for juniors",
      desc: "One-week programs the summer before senior year. Applications open in the winter of junior year, and several count as the first step of your academy application. The Merchant Marine Academy does not offer one.",
      items: [
        {title:"Air Force Academy Summer Seminar", desc:"Apply December 1 to January 15 of junior year. Decisions by early April.", url:"https://www.usafa.edu/admissions/summer-seminar/"},
        {title:"Naval Academy Summer Seminar", desc:"Apply January to March 31 of junior year. Your application also serves as your preliminary Naval Academy application.", url:"https://www.usna.edu/Admissions/Programs/NASS.php"},
        {title:"West Point Summer Leaders Experience", desc:"Apply February 15 to April 15 of junior year. About $495, with need-based scholarships available.", url:"https://www.westpoint.edu/admissions/summer-program"},
        {title:"Coast Guard Academy Introduction Mission (AIM)", desc:"Apply by April 1 of junior year. Held in July.", url:"https://uscga.edu/admissions/aim/"}
      ]
    }
  }
};

YEARS["senior-military-colleges"] = {
  hub: "college",
  parent: "military",
  label: "Senior Military Colleges / Corps of Cadets",
  blurb: "If you want a traditional college experience combined with a military structure, a senior military college is a great option. These schools offer rigorous academics and leadership development within a corps of cadets.",
  order: ["about","schools","more"],
  sections: {
    about: {
      title: "How they work",
      type: "responsibilities",
      groups: [
        {title:"The experience", items:[
          "You live and train in a corps of cadets while earning a regular degree in the major you choose.",
          "Six schools hold this status under federal law. Some are entirely cadets; others have a corps inside a large university."
        ]},
        {title:"Commissioning", items:[
          "At most senior military colleges, you choose whether to commission into the military after graduation.",
          "The service obligation comes when you contract with ROTC, not when you join the corps."
        ]}
      ]
    },
    schools: {
      title: "The six senior military colleges",
      items: [
        {title:"Texas A&M University", desc:"College Station, TX. The largest corps of cadets outside the service academies, inside a large public university.", url:"https://corps.tamu.edu"},
        {title:"Virginia Tech", desc:"Blacksburg, VA. Cadets choose a military track or a civilian leadership track.", url:"https://vtcc.vt.edu"},
        {title:"Virginia Military Institute (VMI)", desc:"Lexington, VA. Every student is a cadet.", url:"https://www.vmi.edu"},
        {title:"The Citadel", desc:"Charleston, SC. All undergraduate day students are in the Corps of Cadets and take ROTC.", url:"https://www.citadel.edu"},
        {title:"Norwich University", desc:"Northfield, VT. A private university known as the birthplace of ROTC.", url:"https://www.norwich.edu"},
        {title:"University of North Georgia", desc:"Dahlonega, GA. The Military College of Georgia, with Army ROTC only.", url:"https://ung.edu/military-college-admissions/"}
      ]
    },
    more: {
      title: "Search military colleges",
      type: "callout",
      body: "The Association of Military Colleges and Schools of the United States lists the senior military colleges along with other military colleges and schools.",
      ctaText: "Browse military colleges ↗",
      ctaUrl: "https://amcsus.org/schools/?_school_type=senior-military-colleges"
    }
  }
};

YEARS["rotc"] = {
  hub: "college",
  parent: "military",
  label: "Reserve Officers' Training Corps (ROTC)",
  blurb: "ROTC programs at many colleges let you earn a commission as an officer while completing your degree. The ROTC scholarship application is separate from your college applications, but you can work on both at the same time.",
  order: ["branches","timing","armyGuide","campus"],
  sections: {
    branches: {
      title: "National scholarships by branch",
      desc: "Minimums are the floor to apply, not the scores of a typical winner.",
      stacked: true,
      items: [
        {title:"Army ROTC", desc:"The most common option at four-year colleges. You must submit SAT or ACT scores, but there is no minimum score. Unweighted GPA of at least 2.5.", url:"https://www.goarmy.com/careers-and-jobs/find-your-path/army-officers/rotc/scholarships", bullets:[
          "The application opens in June before senior year and must be started by March 4, 2027.",
          "Three selection boards meet in October, January, and March. A file finished in time for October is reviewed at every board after it.",
          "Pays tuition and fees or room and board, plus $420 a month and $1,200 a year for books."
        ]},
        {title:"Navy and Marine Corps ROTC", desc:"Not as widespread as Army. Navy option minimums: SAT 550 reading and writing and 540 math (1100 total), or ACT 22 English and 21 math. Marine option: SAT 1000 or ACT 22.", url:"https://www.netc.navy.mil/NSTC/NROTC/", bullets:[
          "The application opens April 1 of junior year and closes January 31 of senior year.",
          "Boards meet monthly starting in October, so a complete file earlier in the fall competes for more scholarships."
        ]},
        {title:"Air Force ROTC", desc:"The least common. Minimums: SAT 1310, ACT 28 (with the Science section), or CLT 93 from a single test date, plus a 3.3 unweighted GPA.", url:"https://www.afrotc.com/scholarships/", bullets:[
          "The 2026 application is open July 1 to December 11, 2026.",
          "Two boards, fall and winter. The fall board has the most scholarships available."
        ]},
        {title:"Space Force ROTC", desc:"Apply through Air Force ROTC. There is no separate Space Force scholarship board; Space Force selection happens during college.", url:"https://www.afrotc.com/scholarships/"}
      ]
    },
    timing: {
      title: "Deadlines",
      type: "callout",
      body: "Each branch has its own deadlines, and final deadlines run into the winter of senior year. The earliest boards (October for Army and Navy, fall for Air Force) have the most scholarships, so aim to finish your application in early fall."
    },
    armyGuide: {
      title: "Guide to the Army ROTC scholarship process",
      note: "Provided by University of Dayton Army ROTC",
      desc: "How the Army application works, start to finish.",
      type: "responsibilities",
      groups: [
        {title:"Minimum requirements", items:[
          "Unweighted high school GPA of 2.5 (grades 9 through 11)",
          "SAT or ACT score required, no minimum",
          "U.S. citizen, at least 17, and under 31 in the year you would commission",
          "Any civil infractions must be explained and granted a waiver"
        ]},
        {title:"Applying", items:[
          "Self-report your GPA, test scores, age, and citizenship, and list up to seven colleges.",
          "Give the email addresses of your counselor and a PE teacher or coach.",
          "Upload your transcript and SAT or ACT scores. Once they're validated, schedule an interview with a Professor of Military Science at any college with Army ROTC.",
          "Cadet Command then asks your counselor for class rank and course information, and asks your PE teacher or coach to give and report your Physical Fitness Assessment.",
          "At the interview, your height and weight are measured, and the interviewer assesses your potential as an Army officer."
        ]},
        {title:"How you're scored (1,400 points)", items:[
          "SAT or ACT score: 249",
          "Scholar, athlete, and leader activities: 201",
          "Interview: 200",
          "Physical Fitness Assessment: 150",
          "Cadet Background and Experience Form, part of the online application: 250",
          "Board members' assessment: 350"
        ]},
        {title:"After the board", items:[
          "Winners get a letter naming the school where the scholarship can be used and have 30 days to accept.",
          "If you're not selected, you stay in consideration for the next board. Applicants not selected by any board hear by mid-April and can pursue scholarships at their college's ROTC program.",
          "Some awards are two- or three-year scholarships, which pay the same benefits.",
          "You must meet medical and administrative requirements and sign a contract before benefits begin."
        ]}
      ]
    },
    campus: {
      title: "Campus-based scholarships",
      type: "callout",
      body: "Many colleges have their own ROTC program offices with campus-based scholarships. Once you know where you're applying, contact each school's ROTC unit directly for guidance."
    }
  }
};

YEARS["ccp-ap"] = {
  hub: "college",
  label: "CCP / AP",
  blurb: "Earning college credit while you're still at Moeller.",
  order: ["ccp","ap","choosing"],
  sections: {
    ccp: placeholderSection("College Credit Plus (CCP)", "How CCP works, eligibility, and deadlines."),
    ap: placeholderSection("Advanced Placement (AP)", "AP courses at Moeller and how AP credit transfers."),
    choosing: placeholderSection("Choosing between CCP and AP", "Which option fits your goals and schedule.")
  }
};

YEARS["act-sat"] = {
  hub: "college",
  label: "ACT / SAT",
  blurb: "Test dates, prep resources, and how to send your scores.",
  order: ["dates","prep","scores","testingResources"],
  sections: {
    dates: placeholderSection("Test dates & registration", "This year's ACT and SAT calendar."),
    prep: placeholderSection("Test prep", "Free and low-cost ways to prepare."),
    scores: placeholderSection("Sending scores", "How to send official scores, and test-optional decisions."),
    testingResources: {
      title: "Testing resources",
      desc: "Outside sites for checking college testing policies and score ranges.",
      items: [
        {title:"SAT & ACT policies and score ranges for popular colleges", desc:"Compass Prep's college profiles show testing policies and middle-50% score ranges.", url:"https://www.compassprep.com/college-profiles/"},
        {title:"Test-optional and test-free colleges, searchable list", desc:"FairTest's list is the place to check any college's current testing policy.", url:"https://fairtest.org/test-optional-list/"}
      ]
    }
  }
};

YEARS["career-exploration"] = {
  hub: "college",
  label: "Career Exploration",
  blurb: "Connecting your interests and strengths to future careers and majors.",
  order: ["assessments","explore","experience"],
  sections: {
    assessments: placeholderSection("Interest & strength assessments", "Tools that suggest fields based on what you enjoy."),
    explore: placeholderSection("Exploring careers", "Researching what jobs actually involve."),
    experience: placeholderSection("Getting experience", "Job shadowing, internships, and summer programs.")
  }
};

/* ---------------- Financial Aid ----------------
   layout: "indexed" gives this page a left-side index. Link to one section with
   financial-aid.html#key (for example financial-aid.html#fafsa). The grade pages do this.

   UPDATE EVERY YEAR (dates, form years, and rules change each cycle). Check these against
   studentaid.gov, cssprofile.collegeboard.org, and highered.ohio.gov:
   • FAFSA form year (2027–28), the tax year it uses (2025), the open date (Sept. 23, 2026),
     the federal deadline (June 30, 2028), and the next FAFSA's open date
   • CSS Profile year, open date (Oct. 1, 2026), and fees ($25 first college, $16 each
     additional, free up to $100,000 family income)
   • Loan limits: first-year federal student loan ($5,500), Parent PLUS caps
     ($20,000/year and $65,000 total per student, since July 1, 2026)
   • Ohio OCOG: SAI of $3,750 or less, household income of $96,000 or less, Oct. 1 deadline,
     and the most you can get by college type ($4,000 / $5,000 / $2,000 for 2026–27)
   • Grants: Pell maximum ($7,395 for 2026–27) and TEACH Grant ($4,000 a year)
   • Federal Loans visual: interest rate (6.52% for 2026–27, set each July) and yearly
     limits ($5,500 / $6,500 / $7,500)
   • Cost & Need: the example college costs in the need chart
   • Governor's Merit Scholarship rules (set in the state budget)
   • Financial Aid Night recap (date and takeaways)
   All links are filled in. Links were last checked in October 2026; check them again each fall.
   ------------------------------------------------ */

YEARS["financial-aid"] = {
  hub: "college",
  label: "Financial Aid",
  blurb: "How paying for college works, from the FAFSA and CSS Profile to scholarships and comparing aid offers, written for families who are new to this.",
  layout: "indexed",
  order: ["basics","cost","byGrade","fafsa","css","grants","loans","scholarships","compare","questions","aidTimeline","dates","recap"],
  sections: {
    basics: {
      navLabel: "How Financial Aid Works",
      title: "How Financial Aid Works",
      desc: "Financial aid is any money that helps pay for college. Some of it is free, and some of it has to be paid back.",
      visuals: [
        {kind:"hub", heading:"Where aid comes from", center:"Financial Aid", prompt:"Tap a circle to see what each source offers.", items:[
          {label:"Federal Government", text:"Pell Grants, work-study, and federal student loans. You apply with the FAFSA.", link:{text:"Federal grants, loans, and work-study", url:"https://studentaid.gov/understand-aid/types/"}},
          {label:"State Government", text:"In Ohio: the Ohio College Opportunity Grant and the Governor's Merit Scholarship.", link:{text:"See Grants & Ohio Aid", url:"#grants"}},
          {label:"Colleges & Universities", text:"Merit scholarships and need-based grants from the college itself."},
          {label:"Private Sources", text:"Scholarships from community groups, foundations, churches, and businesses.", link:{text:"See Scholarships", url:"#scholarships"}},
          {label:"Employers", text:"Some parents' employers offer scholarships or tuition benefits. Ask your human resources office."}
        ]},
        {kind:"defs", heading:"Two kinds of aid", items:[
          {tone:"navy", title:"Need-Based", text:"Based on what your family can afford, as measured by the FAFSA (and the CSS Profile at some colleges)."},
          {tone:"gold", title:"Merit-Based", text:"Based on grades, talents, activities, or other accomplishments. Family income doesn't matter."}
        ]}
      ],
      items: [
        {title:"Free money vs. money you repay", desc:"Grants and scholarships don't have to be paid back. Loans do, with interest. When you read an aid offer, keep the two apart."},
        {title:"Work-study", desc:"A part-time job, usually on campus, for students who qualify based on need. Students earn it through a paycheck during the year, so it doesn't lower the bill you pay at the start of each term."}
      ]
    },
    cost: {
      navLabel: "Cost & Need",
      title: "Cost of Attendance & Financial Need",
      desc: "What a year of college really costs, and how colleges figure out how much help you need.",
      visuals: [
        {kind:"hub", heading:"What's in the cost of attendance", center:"Cost of Attendance", prompt:"Tap a cost, or choose direct or indirect costs.",
          groups:[
            {key:"direct", label:"Direct costs", tone:"gold", text:"These show up on the college's bill: tuition and fees, plus housing and meals if you live on campus."},
            {key:"indirect", label:"Indirect costs", tone:"sky", text:"Real costs that aren't on the bill. You pay them yourself, and colleges include an estimate."}
          ],
          items:[
            {label:"Tuition & Fees", group:"direct", tone:"gold", text:"What the college charges for classes and student fees."},
            {label:"Housing & Meals", group:"direct", tone:"gold", text:"Your room and meal plan. On the bill if you live on campus."},
            {label:"Books & Supplies", group:"indirect", tone:"sky", text:"Textbooks, a laptop, and supplies for class."},
            {label:"Transportation", group:"indirect", tone:"sky", text:"Getting to campus, trips home, and getting around."},
            {label:"Personal Expenses", group:"indirect", tone:"sky", text:"Phone, laundry, toiletries, and other everyday costs."}
          ]},
        {kind:"needChart", heading:"How financial need works", sai:12000, saiMax:40000,
          note:"Example costs. Your SAI is the same at every college, so your need is bigger where the cost is higher.",
          colleges:[
            {label:"Private 4-year", cost:45080},
            {label:"Public 4-year", cost:29770},
            {label:"Public 2-year", cost:10818}
          ]}
      ],
      items: [
        {title:"Sticker price vs. what you actually pay", desc:"Your net price is the cost of attendance minus grants and scholarships. That's the number to compare, and every college has a net price calculator that estimates it for your family.", url:"https://collegecost.ed.gov/net-price"}
      ]
    },
    byGrade: {
      navLabel: "Getting Ready by Grade",
      title: "Getting Ready, Grade by Grade",
      desc: "Families don't file anything until the fall of senior year. Here's what's useful to know, or do, along the way.",
      items: [
        {title:"Freshman year: why there's no rush", desc:"Nothing about financial aid needs attention yet. The FAFSA uses tax information from two years before college starts, so the income that counts is from the calendar year that begins in January of sophomore year. For now, the most useful step is simply learning how college costs work."},
        {title:"Saving and 529 plans", desc:"A 529 plan is a savings account for education. Money in it grows without federal tax when it's used for qualified school costs. On the FAFSA, a 529 owned by a parent counts as a parent asset, which affects aid far less than money in the student's own name.", url:"https://www.consumerfinance.gov/ask-cfpb/what-is-a-529-savings-plan-en-2074/"},
        {title:"Sophomore year: start the cost conversation", desc:"This is a relaxed time to talk as a family about what you can contribute, how much borrowing you'd consider, and how much cost should shape the college list. Students who know the budget early build better lists."},
        {title:"Junior year: try net price calculators", desc:"Pick a few colleges and run their net price calculators together. You'll see an estimated cost for your family before your son applies, and you'll learn which schools tend to give merit aid and which give need-based aid.", url:"https://collegecost.ed.gov/net-price"},
        {title:"Summer before senior year: get ready to file", desc:"Create StudentAid.gov accounts for the student and each parent who will fill out the FAFSA, find your tax return from two years ago, and make a list of colleges you're considering. Then the FAFSA goes quickly once it opens.", url:"https://studentaid.gov/fsa-id/create-account"}
      ]
    },
    fafsa: {
      navLabel: "FAFSA Step by Step",
      title: "FAFSA Step by Step",
      desc: "The FAFSA is the free federal form for federal grants, loans, and work-study, Ohio's need-based grant, and most colleges' own aid. Students file it every year of college. The 2027–28 FAFSA, for students starting college in fall 2027, is open now.",
      stacked: true,
      visuals: [
        {kind:"checklist", key:"fafsa-ready", heading:"Before you start: what you'll need", note:"Your checks are saved only in this browser.", items:[
          "The student, with a StudentAid.gov account",
          "Each parent who fills it out, with their own account",
          "Social Security numbers",
          "2025 federal tax returns",
          "2025 W-2 forms",
          "Records of untaxed income (like child support)",
          "Current bank balances and investments",
          "Your list of colleges (up to 20)",
          "A computer or tablet",
          "Patience"
        ]}
      ],
      items: [
        {title:"1. Create StudentAid.gov accounts", desc:"The student and every parent who has to provide information (the form calls them contributors) each need their own account, with their own email address. You can sign the FAFSA right after creating an account, but the full identity check with Social Security records can take one to three days, so set up accounts early.", url:"https://studentaid.gov/fsa-id/create-account"},
        {title:"2. Figure out which parent fills it out", desc:"If parents are divorced or separated, the parent who gave the student more financial support over the past 12 months completes the FAFSA. That isn't always the parent the student lives with. Federal Student Aid has a short tool that walks you through it.", url:"https://studentaid.gov/fafsa-apply/parents"},
        {title:"3. Gather what you'll need", desc:"Use the checklist above. The 2027–28 FAFSA uses 2025 taxes, and most tax information transfers straight from the IRS once each contributor agrees to share it.", url:"https://studentaid.gov/articles/things-you-need-for-fafsa/"},
        {title:"4. Fill out the form and list your colleges", desc:"The student starts the FAFSA at StudentAid.gov and invites parents to complete their part. You can list up to 20 colleges and add more later. List every school you're applying to, even before you're admitted.", url:"https://studentaid.gov/h/apply-for-aid/fafsa"},
        {title:"5. Everyone signs and gives consent", desc:"Each contributor signs with their own account and agrees to let the IRS share tax information. If anyone skips that consent, the student can't receive federal aid."},
        {title:"6. Check your FAFSA Submission Summary", desc:"After the form is processed, you'll get an email with your FAFSA Submission Summary and your Student Aid Index (SAI), the number colleges use to measure need. Check it for mistakes and fix them at StudentAid.gov. Colleges may ask for extra documents, so watch email and each college's portal."},
        {title:"File early, before the earliest deadline", desc:"The federal deadline is June 30, 2028, but colleges set much earlier priority deadlines, and some aid goes to early filers first. Find the earliest priority deadline among your colleges and file before it. File even if you don't expect to qualify: many colleges require the FAFSA for any aid, and it's the only way to get federal student loans."},
        {title:"Big J's Very Brief Guide to the FAFSA & CSS Profile", desc:"A short, plain-language guide to both forms.", url:"https://drive.google.com/file/d/1nfPyYXHACThnNcRkFLbJiclN-phJr2fm/view"},
        {title:"Federal Student Aid's how-to videos", desc:"Short videos from Federal Student Aid about filling out the FAFSA.", url:"https://studentaid.gov/apply-for-aid/fafsa/filling-out/help/videos-infographics-list"}
      ]
    },
    css: {
      navLabel: "CSS Profile",
      title: "CSS Profile",
      desc: "The CSS Profile is a second financial aid form, run by College Board, that some colleges use to award their own money. It's in addition to the FAFSA, not instead of it.",
      items: [
        {title:"What it is and why you might need it", desc:"It asks for more detail than the FAFSA, such as home equity, and some colleges also ask a divorced or separated parent who doesn't live with the student to fill one out. Colleges use it to decide how much of their own grant money to offer. If a college on your list requires it and you skip it, you could miss out on that aid.", url:"https://cssprofile.collegeboard.org/"},
        {title:"Which colleges use it", desc:"College Board keeps the official, up-to-date list of colleges and scholarship programs that use the CSS Profile. Requirements can differ by applicant, so also check each college's financial aid page.", url:"https://profile.collegeboard.org/PPI/participatingInstitutions.aspx"},
        {title:"Moeller's popular colleges that use it", desc:"On our Popular Colleges page, turn on the \u201cUses CSS Profile\u201d filter to see which of the schools Moeller students apply to most require it.", url:"popular-colleges.html"},
        {title:"What it costs", desc:"$25 for the first college and $16 for each additional one. It's free for U.S. undergraduate students whose family income is up to $100,000, and that fee waiver is applied automatically based on your answers."},
        {title:"When to file", desc:"The 2027–28 CSS Profile is open now. Each college sets its own deadline, often near its early or regular application deadline, so check every school that requires it."},
        {title:"Big J's Very Brief Guide to the FAFSA & CSS Profile", desc:"A short, plain-language guide to both forms.", url:"https://drive.google.com/file/d/1nfPyYXHACThnNcRkFLbJiclN-phJr2fm/view"}
      ]
    },
    grants: {
      navLabel: "Grants & Ohio Aid",
      title: "Grants & Ohio Aid",
      desc: "Grants and scholarships don't have to be paid back. The FAFSA is your application for all three grants.",
      visuals: [
        {kind:"grants", items:[
          {icon:"federal", title:"Federal Pell Grant", amount:"Up to $7,395 a year (2026–27)", bullets:[
            "For students with high financial need",
            "The amount depends on your SAI and the college's cost",
            "Doesn't have to be repaid"
          ], link:{text:"Federal grants at StudentAid.gov", url:"https://studentaid.gov/understand-aid/types/"}},
          {icon:"ohio", title:"Ohio College Opportunity Grant (OCOG)", bullets:[
            "For Ohio residents with high need: an SAI of $3,750 or less and household income of $96,000 or less",
            {text:"The most you can get depends on the type of Ohio college (2026–27):", sub:[
              {label:"Public university main campus", value:"$4,000/year"},
              {label:"Private nonprofit college", value:"$5,000/year"},
              {label:"Private for-profit college", value:"$2,000/year"}
            ]},
            "Ohio's FAFSA deadline is October 1, but your colleges' deadlines come first"
          ], link:{text:"OCOG at the Ohio Department of Higher Education", url:"https://highered.ohio.gov/educators/financial-aid/sgs/ocog/ocog"}},
          {icon:"teach", title:"Federal TEACH Grant", amount:"Up to $4,000 a year", bullets:[
            "For students preparing to become teachers",
            "Actual awards are a little less, because of a federal budget rule",
            "You agree to teach full time for 4 years in a high-need subject at a low-income school",
            "You have 8 years after leaving college to finish those 4 years"
          ], warning:"If you don't finish the teaching service, the grant turns into a loan you repay with interest.",
          link:{text:"TEACH Grants at StudentAid.gov", url:"https://studentaid.gov/understand-aid/types/grants/teach"}},
          {icon:"merit", title:"Ohio Governor's Merit Scholarship", bullets:[
            "For top-ranked graduates who attend an eligible Ohio college",
            "No application: the high school identifies who qualifies",
            "The state notifies students during senior year",
            "The amount and class-rank cutoff are set in the state budget"
          ], warning:"Only for Ohio colleges. It doesn't follow you out of state.",
          link:{text:"Governor's Merit Scholarship at the Ohio Department of Higher Education", url:"https://highered.ohio.gov/students/pay-for-college/ohio-grants-scholarships/gms/gms"}}
        ]}
      ]
    },
    loans: {
      navLabel: "Federal Loans",
      title: "Federal Loans",
      desc: "Loans have to be paid back, with interest. Federal student loans are in the student's name and don't need a credit check.",
      visuals: [
        {kind:"loans", center:"Federal Direct Loans",
          sub:"The government pays the interest while you're in school. For students with financial need.",
          unsub:"Interest starts adding up right away, and you're responsible for all of it.",
          rate:"6.52%", rateNote:"fixed rate for 2026–27 loans; a new rate starts each July 1",
          limitsCaption:"The most a dependent student can borrow each year",
          years:[
            {year:"First year", total:"$5,500", sub:"up to $3,500 subsidized"},
            {year:"Second year", total:"$6,500", sub:"up to $4,500 subsidized"},
            {year:"Third year and on", total:"$7,500", sub:"up to $5,500 subsidized"}
          ],
          footnote:"Repayment starts six months after you leave school or drop below half-time."}
      ],
      items: [
        {title:"Subsidized vs. unsubsidized loans", desc:"Federal Student Aid's explanation of the two loan types and how much you can borrow.", url:"https://studentaid.gov/understand-aid/types/loans/subsidized-unsubsidized"},
        {title:"Parent PLUS loans", desc:"Federal loans that parents can take out for a dependent student. They require a credit check, and the parent is responsible for repaying them. Since July 1, 2026, new Parent PLUS borrowing is limited to $20,000 per student each year and $65,000 per student in total."},
        {title:"Private student loans", desc:"Loans from banks and other lenders. Rates and terms vary, and they usually don't have the protections federal loans have, so most families use federal loans first.", url:"https://www.consumerfinance.gov/ask-cfpb/what-are-private-student-loans-en-2136/"}
      ]
    },
    scholarships: {
      navLabel: "Scholarships",
      title: "Scholarships",
      desc: "Scholarships don't have to be paid back. Most are based on merit, and some also consider need.",
      visuals: [
        {kind:"flow", heading:"Where to look", prompt:"Tap a step to see how.", items:[
          {label:"Your school counselor", text:"Ask your counselor about local scholarships."},
          {label:"Your colleges", text:"Check each college's scholarship page. Some need a separate application or have an early deadline. Add those deadlines to your Application Tracker.", link:{text:"Open the Application Tracker", url:"app-tracker.html"}},
          {label:"Community groups & employers", text:"Civic clubs, churches, foundations, and parents' employers often offer awards. Local ones usually have fewer applicants."},
          {label:"Free online searches", text:"Search sites like BigFuture and Fastweb match you with awards. Never pay to search or apply.", link:{text:"BigFuture Scholarship Search", url:"https://bigfuture.collegeboard.org/scholarship-search"}}
        ]}
      ],
      items: [
        {title:"Outside awards can change your aid", desc:"Tell your college about any outside scholarship you receive. It can change the rest of your aid offer.", url:"https://studentaid.gov/understand-aid/types/scholarships"},
        {title:"Avoiding scams", desc:"Real scholarships never charge a fee, ask for bank account numbers, or guarantee you'll win. The FAFSA itself is always free at StudentAid.gov."},
        {title:"Seniors: report your scholarships", desc:"Moeller asks seniors to report every award offered, whether or not they'll use it.", url:"seniors.html#scholarshipReporting"}
      ]
    },
    compare: {
      navLabel: "Comparing Award Letters",
      title: "Comparing Award Letters",
      desc: "Aid offers (often called award letters) arrive after admission, and every college lays them out differently. Line them up the same way before you decide.",
      stacked: true,
      items: [
        {title:"Six steps to compare offers", desc:"Do this for each college, then put the results side by side.", numbered:true, bullets:[
          {label:"Start with the full cost.", text:"Use the college's total cost of attendance for one year, not just tuition."},
          {label:"Subtract free money.", text:"Subtract only grants and scholarships. What's left is your net price."},
          {label:"List loans separately.", text:"Loans have to be paid back, so they don't lower the cost. Note the type and amount of each one."},
          {label:"Set work-study aside.", text:"It's earned during the year, so it doesn't lower the first bill."},
          {label:"Check what renews.", text:"Ask what GPA keeps a merit scholarship and whether need-based aid is figured again each year."},
          {label:"Think in four years.", text:"A $5,000 difference each year is $20,000 by graduation."}
        ]},
        {title:"How to compare aid offers", desc:"Federal Student Aid's guide to reading an aid offer, telling grants from loans, and figuring out your net price at each college.", url:"https://studentaid.gov/articles/evaluating-financial-aid-offers/"},
        {title:"Watch for gaps", desc:"Some offers leave a gap between the net price and what your family can pay, and suggest filling it with Parent PLUS or private loans. Parent PLUS loans are now capped at $20,000 per student each year, so plan for how a gap would be covered all four years."},
        {title:"If an offer isn't enough, ask for a review", desc:"If your family's finances have changed since the tax year the FAFSA used, such as a job loss, high medical bills, or a divorce, contact the financial aid office and ask for a review. Bring documents. Some colleges will also look at a better offer from another school, but policies vary."},
        {title:"Decide by May 1", desc:"Students have until May 1 to choose a college and pay a deposit, unless they were admitted Early Decision.", url:"seniors.html#decisionInfo"}
      ]
    },
    questions: {
      navLabel: "Questions to Ask Colleges",
      title: "Questions to Ask Colleges",
      desc: "Bring these to a financial aid office, a college visit, or an admitted-student day.",
      type: "responsibilities",
      groups: [
        {title:"About cost", items:[
          "What is the total cost of attendance, and what does it include?",
          "How much did costs go up last year, and what should we expect over four years?",
          "Are there fees that aren't included in the cost of attendance?"
        ]},
        {title:"About aid", items:[
          "Which forms do you require (FAFSA, CSS Profile, your own form), and by when?",
          "Are merit scholarships automatic, or is there a separate application or deadline?",
          "What does a student need to do to keep merit aid each year?",
          "Is need-based aid figured again every year?",
          "Do you meet full demonstrated need? If not, how much on average?"
        ]},
        {title:"About changes and payment", items:[
          "How do outside scholarships affect my aid offer?",
          "How do we ask for a review if our finances change?",
          "Is there a monthly payment plan, and when is the first bill due?"
        ]}
      ]
    },
    aidTimeline: {
      navLabel: "Aid Timeline",
      title: "Financial Aid Timeline",
      desc: "How the aid year goes for a senior, from filing to the first bill. Tap a step, or use Next.",
      visuals: [
        {kind:"stepper", steps:[
          {when:"Oct – Dec", title:"File the FAFSA", text:"List every college you're applying to. File the CSS Profile too if any of your colleges require it."},
          {when:"", title:"Check your FAFSA Submission Summary", text:"Look it over for mistakes and fix them at StudentAid.gov."},
          {when:"Mar – Apr", title:"Aid offers arrive", text:"Each college that admits you sends an aid offer."},
          {when:"", title:"Accept or decline aid", text:"You can turn down loans or work-study you don't need."},
          {when:"", title:"Send any documents colleges ask for", text:"Watch your email and each college's portal."},
          {when:"May 1", title:"Choose your college", text:"Pay your deposit by May 1."},
          {when:"Summer", title:"Register for classes", text:"Your college will walk you through it."},
          {when:"", title:"Aid goes toward your bill", text:"It's applied to your first bill, usually shortly before classes start. If aid is more than the bill, the extra comes back to you as a refund."},
          {when:"Next fall", title:"Reapply every year", text:"File a new FAFSA each year of college to keep getting aid."}
        ]}
      ]
    },
    dates: {
      navLabel: "Key Dates",
      title: "Key Dates",
      desc: "Dates for seniors starting college in fall 2027. Colleges set their own aid deadlines, so always check each college's financial aid page.",
      // Timeline: dates whose "iso" (or "isoEnd" for a span) has passed are dimmed and marked
      // "Passed"; the first one still ahead gets an "Up next" (or "Now") tag. Update every year.
      timeline: [
        {date:"Sept. 23, 2026", iso:"2026-09-23", title:"The 2027–28 FAFSA opened", detail:"File at StudentAid.gov before your earliest college deadline."},
        {date:"Oct. 1, 2026", iso:"2026-10-01", title:"The 2027–28 CSS Profile opened", detail:"Only for colleges that require it."},
        {date:"Fall – winter", iso:"2026-10-01", isoEnd:"2027-02-28", title:"College aid deadlines", detail:"Often close to each college's Early Action, Early Decision, or Regular Decision deadline. Check every college on your list."},
        {date:"Senior spring", iso:"2027-03-01", isoEnd:"2027-04-30", title:"Aid offers arrive", detail:"Usually with or soon after admission decisions. Compare them side by side."},
        {date:"May 1, 2027", iso:"2027-05-01", title:"Decision day", detail:"Choose a college and pay a deposit."},
        {date:"Oct. 1, 2027", iso:"2027-10-01", title:"Ohio grant deadline", detail:"Last day to file the 2027–28 FAFSA for the Ohio College Opportunity Grant."},
        {date:"By Oct. 1, 2027", iso:"2027-10-01", title:"The 2028–29 FAFSA opens", detail:"Students file again every year of college."},
        {date:"June 30, 2028", iso:"2028-06-30", title:"Federal FAFSA deadline", detail:"The last day for the 2027–28 FAFSA. Don't wait this long; college deadlines come much sooner."}
      ]
    },
    recap: {
      navLabel: "Financial Aid Night Recap",
      title: "Financial Aid Night Recap",
      note: "Held September 1, 2026",
      desc: "Missed Financial Aid Night, or want a refresher? Here are the main takeaways.",
      items: [
        {title:"File the FAFSA early", desc:"The 2027–28 FAFSA is open. Find each college's priority filing deadline and submit before the earliest one.", url:"#fafsa"},
        {title:"Every contributor needs an account", desc:"The student and each parent who fills out the FAFSA need their own StudentAid.gov account. Divorced or separated families should check which parent counts.", url:"#fafsa"},
        {title:"Some colleges also need the CSS Profile", desc:"Check which of your colleges require it, and file it by each school's deadline.", url:"#css"},
        {title:"Know your loan options", desc:"Federal student loans come first. Learn the difference between subsidized and unsubsidized loans, and how private loans differ.", url:"#loans"},
        // Posted with Miami University's permission (October 2026). Replace with next year's slides.
        {title:"Financial Aid Night presentation", desc:"The slides from the evening, shared with permission from Miami University.", url:"https://acrobat.adobe.com/id/urn:aaid:sc:US:3ec5f3eb-e976-4e99-a315-2333e5913b41"}
      ]
    }
  }
};
