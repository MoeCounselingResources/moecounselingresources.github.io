/* =========================================================================
   SENIORS — Application Resources + School & Academics
   This one file feeds the Seniors page in BOTH hubs.
     • Top half of the block (sections)  → the "Application Resources" view
     • "school:" block at the bottom     → the "School & Academics" view
   Each year: update classOf + label, then refresh the content.
   ========================================================================= */

YEARS.senior = {
    classOf: "2027",
    tabLabel: "Senior",
    label: "Class of 2027",
    stage: "Seniors",
    blurb: "These resources will help you with college research, essay writing, and filling out your applications!",
    collegeLabel: "Application Resources",
    // Junior/sophomore/freshman: set layout to "indexed" for a left-side index, or delete it for stacked sections.
    order: ["fallChecklist","appTypes","commonAppGuide","decisionInfo","moreEssentials","responsibilities","commonAppFaq","essays","testing","research","appTracker","financialAid","scholarshipReporting","testOptional","feeWaivers"],
    layout: "indexed",
    sections: {
      fallChecklist: {
        navLabel: "Application Checklist",
        title: "Application Checklist",
        note: "Check items off as you go",
        desc: "The full August-through-spring checklist. Checking a box just marks it for you in this browser — it won't affect anyone else's view.",
        type: "checklist",
        groups: [
          {
            label: "August / September",
            items: [
              "Get organized",
              "Register for the ACT/SAT",
              "Meet one-on-one with your counselor",
              "Build your list of colleges in Common App & SCOIR",
              "Work on your applications & essays",
              "Attend College Rep Visits (fall)"
            ]
          },
          {
            label: "October / November",
            items: [
              "Officially send your test scores to each college you're applying to with scores",
              "Research scholarships and start applying",
              "Finalize your essays",
              "Complete and submit your applications by the deadline",
              "Complete the FAFSA with your parents"
            ]
          },
          {
            label: "Winter",
            items: [
              "Keep applying for scholarships",
              "Work on applications with later deadlines",
              "Double check SCOIR & your school portals to confirm materials were sent and received",
              "Check your email for communications from colleges — follow up if needed"
            ]
          },
          {
            label: "Spring",
            items: [
              "Update SCOIR with decisions",
              "Keep working hard in your classes",
              "Attend Accepted Student events & revisit colleges as needed",
              "Evaluate your options and confirm your spot at your chosen college by May 1",
              "Withdraw your applications from your other schools",
              "Graduate — you did it! Congratulations!"
            ]
          }
        ]
      },
      appTypes: {
        navLabel: "Application Types & Deadlines",
        title: "Application Types & Deadlines",
        note: "Know what binds you",
        desc: "Each application type comes with a different deadline and a different level of commitment — check which your schools use.",
        stacked: true,
        items: [
          {title:"Rolling", desc:"Decisions are typically released 4–6 weeks after your application is complete."},
          {title:"Early Action / Priority", desc:"A non-binding agreement with an earlier deadline — can be tied to scholarships. Deadlines vary: Oct. 15, Nov. 1, Nov. 15, Dec. 1."},
          {title:"Early Decision I", desc:"A binding agreement, typically due Nov. 1 or 15. Talk with your counselor before applying. If accepted, you must withdraw all other applications and pay your deposit."},
          {title:"Early Decision II", desc:"A binding agreement, typically due Jan. 1–15. If you weren't accepted through ED I, you may apply ED II to a different college."},
          {title:"Restrictive Early Action", desc:"Used by Georgetown & Notre Dame. You may apply EA to other schools but not ED. If not admitted, you may still apply ED II and Regular Decision elsewhere."},
          {title:"Single-Choice Early Action", desc:"Used by Harvard, Princeton, Stanford & Yale. You may only apply to your chosen institution and to public schools."},
          {title:"Regular Decision", desc:"Due Jan. 1 or after, with no binding commitment."}
        ]
      },
      decisionInfo: {
        navLabel: "How Decisions Work",
        title: "How Decisions Work",
        note: "",
        type: "responsibilities",
        groups: [
          {title:"How Colleges Respond", body:"Early applications come back one of three ways: accepted, deferred (reconsidered in Regular Decision), or denied."},
          {title:"May 1st Decision Day", body:"By law, every student has until May 1 to deposit. A school can't require an earlier deposit unless you applied and were accepted through Early Decision."}
        ]
      },
      moreEssentials: {
        navLabel: "Setting Up Common App & SCOIR",
        title: "Setting Up Common App & SCOIR",
        note: "Senior year",
        desc: "Key dates plus account setup that don't fit neatly above. Past dates drop off this list automatically.",
        dates: [
          {iso:"2026-09-01", date:"Sept. 1", title:"Financial Aid Night", detail:"7:00–8:00 PM at Ursuline, for students and families of all grades. FAFSA opens October 1 — this session gets you ready."},
          {iso:"2026-09-03", date:"Sept. 3", title:"College rep visits begin", detail:"Over 100 colleges and universities visit Moeller each fall. Check SCOIR for the schedule and register at least 2 days ahead."},
          {iso:"2026-09-10", date:"Sept. 10", title:"MoeParent Night", detail:"An evening session for parents and guardians on the senior-year application process."},
          {iso:"2026-09-30", date:"Sept. 30", title:"College Fair", detail:"In the Gym, M-Block. A chance to talk to a wide range of schools in one place — no registration needed."},
          {iso:"2026-10-01", date:"Oct. 1", title:"FAFSA opens", detail:"Complete it with your parents once you've started submitting applications."},
          {iso:"2026-10-15", date:"Oct. 15", title:"Application deadline wave", detail:"Clemson, South Carolina, UNC, UGA, UT Austin, and more are due today."},
          {iso:"2026-11-01", date:"Nov. 1", title:"Application deadline wave", detail:"UC, OSU, Miami, UD, and many others are due today."}
        ],
        stacked: true,
        items: [
          {
            title:"Setting Up Common App & SCOIR",
            desc:"Log in to Common App, read the prompts, and select the response that applies to you. You'll confirm you're applying as a first-year student starting college in 2027, update which colleges to keep on your list, and confirm Moeller is your current high school.",
            miniGuide: {
              steps: [
                {icon:"login", title:"Log In & Answer the Prompt", bullets:[
                  "Log in to Common App and read the prompts.",
                  "Select \u201cApplying as a first-year student, plan to start college in 2027.\u201d",
                  "Forgot your password? Click \u201cforgot password\u201d to reset it."
                ]},
                {icon:"checklist", title:"Review Your College List", bullets:[
                  "Confirm which colleges you want to keep on your list.",
                  "Uncheck any schools you're no longer applying to."
                ]},
                {icon:"profile", title:"Confirm Your Account Details", bullets:[
                  "Confirm Archbishop Moeller High School is your current high school.",
                  "Answer the EU/UK residency question \u2014 most students select \u201cNo.\u201d"
                ]}
              ]
            }
          },
          {
            title:"Connecting Common App & SCOIR",
            desc:"Link your two accounts so your counselor's materials and your application stay in sync.",
            miniGuide: {
              steps: [
                {icon:"profile", title:"Open Your SCOIR Profile", bullets:[
                  "From your SCOIR account, click Me in the top right.",
                  "Select View Profile."
                ]},
                {icon:"link", title:"Connect Common App", bullets:[
                  "On your profile, find Connect Common App.",
                  "Click it to begin linking your accounts."
                ]},
                {icon:"login", title:"Sign In to Link the Accounts", bullets:[
                  "Sign into your Common App account when prompted.",
                  "Your SCOIR and Common App accounts are now connected."
                ]}
              ]
            }
          },
          {
            title:"Signing FERPA & Adding Recommenders",
            desc:"Grant your recommenders access before you request any letters \u2014 required for every school on your list.",
            miniGuide: {
              steps: [
                {icon:"shield", title:"Start on SCOIR", bullets:[
                  "Click Get Started on your SCOIR homepage (or go to Profile \u2192 \u201creview and sign\u201d).",
                  "Scroll and select Granted, then Sign & Continue.",
                  "Select Granted again, then Sign & Finish."
                ]},
                {icon:"checklist", title:"Add Your Colleges on Common App", bullets:[
                  "Add at least one school to My Colleges.",
                  "Go to Education and add Moeller as your high school."
                ]},
                {icon:"pen", title:"Complete the FERPA Release for Each School", bullets:[
                  "Under Recommenders and FERPA for each college, click Complete Release Authorization.",
                  "Check every box confirming you've read the explanation."
                ]},
                {icon:"shield", title:"Choose Your Waiver & Sign", bullets:[
                  "Choose whether to waive your right to review recommendations \u2014 most students waive.",
                  "This selection applies to every college on your list and can't be changed once signed \u2014 sign and date it carefully."
                ]}
              ]
            }
          },
          {title:"Second Letter of Recommendation Form", desc:"Only needed if a school requires more than one teacher letter. Get your teacher's signature in person \u2014 due to Counseling by Oct. 15."},
          {
            title:"College Rep Visits",
            desc:"Over 100 colleges and universities visit Moeller each fall.",
            bullets: [
              "Find upcoming visits on the TVs and in SCOIR.",
              "You'll need permission from your teacher to miss class.",
              "Register in SCOIR at least 2 days in advance.",
              "Can't make a visit? Email your counselor \u2014 they'll communicate your interest and get materials for you.",
              "These visits matter: the reps are often the ones reading your application."
            ]
          }
        ]
      },
      responsibilities: {
        navLabel: "Who's Responsible",
        title: "Who's Responsible for What",
        note: "",
        type: "responsibilities",
        groups: [
          {
            title: "Student Application Responsibilities",
            checkable: true,
            items: [
              "Attending your individual college counseling session",
              "Knowing your deadlines and staying organized",
              "Keeping “My Colleges” on SCOIR updated",
              "Filling out the FAFSA & other financial aid forms",
              "Reading emails — from colleges, and from us",
              "Registering for & attending College Rep Visits",
              {
                text: "Submitting a complete application by the deadline: application fee, main essay and any college-specific essays, supplemental materials (including STARS where required), SAT/ACT scores if sending them, and a student portal set up for each school after you apply",
                sub: [
                  {text: "What is STARS? Search which of your schools use it →", modal: "starsModal"},
                  {text: "Colleges & Universities That Require Courses & Grades Reports on Common App →", modal: "coursesGradesModal"}
                ]
              }
            ]
          },
          {
            title: "Parent Responsibilities",
            items: [
              "[Content to come]"
            ]
          },
          {
            title: "Counselor Responsibilities",
            items: [
              "Sending your official transcript with senior courses through SCOIR — ready by the end of September",
              "Sending the Moeller School Profile",
              "Sending your School Report",
              "Sending your Counselor Letter of Recommendation",
              "Sending Teacher Letter(s) of Recommendation — ready by early October",
              "Note: if a college isn't on your SCOIR list, we can't send your materials — keep it updated."
            ]
          }
        ]
      },
      commonAppFaq: {
        navLabel: "Common App FAQs",
        title: "Common App FAQs",
        note: "Class of 2027 Basic Info",
        desc: "The exact school info Common App asks for — use these values as written.",
        items: [
          {title:"CEEB code", desc:"361033"},
          {title:"Date of entry", desc:"August 2023"},
          {title:"Graduation date", desc:"May 2027"},
          {title:"Class size", desc:"208"},
          {title:"GPA scale", desc:"4.0 — report your weighted GPA exactly as it appears on your transcript."},
          {title:"Class rank", desc:"None"},
          {title:"Course scheduling system", desc:"Semester"},
          {title:"Course level key", desc:"", bullets:[
            "CP1, CP2, and CP1 Level 1 = College Prep",
            "Honors = Honors",
            "AP = Advanced Placement",
            "CCP = Dual Enrollment"
          ]}
        ],
        guide: COMMON_APP_GUIDE_STEPS
      },
      commonAppGuide: {
        navLabel: "Common App Cheat Sheet",
        title: "Common App Cheat Sheet",
        note: "",
        desc: "Step through every section of the Common App, in order, with a real screenshot alongside what to enter.",
        items: [],
        guide: COMMON_APP_GUIDE_STEPS
      },
      research: {
        navLabel: "College Research Tools",
        title: "College Research Tools",
        note: "Finalizing your list",
        desc: "Use these to confirm your final list and understand real cost before you commit.",
        items: [
          {title:"Net price calculators", desc:"Every school posts one — use it to compare real estimated cost, not sticker price.", url:"#"},
          {title:"Confirming supplemental requirements", desc:"Double-check each school's specific supplement before you submit.", url:"#"},
          {title:"Schools requiring STARS", desc:"Some schools require or encourage a Self-Reported Transcript & Academic Record — check if any of yours are on the list.", url:"#"},
          {title:"College rep visits", desc:"Over 100 colleges visit Moeller each fall — reps are often the ones reading your application. Register in SCOIR at least 2 days ahead.", url:"#"},
          {title:"Moeller Popular Colleges", desc:"Test ranges, deadlines, and requirements for the schools Moeller students apply to most.", url:"popular-colleges.html"},
          {title:"Application Tracker", desc:"Track your colleges, deadlines, essays, and activities. Saves on your device.", url:"app-tracker.html"}
        ]
      },
      appTracker: {
        navLabel: "Application Tracker",
        title: "Application Tracker",
        note: "Saves on your device",
        desc: "Keep every college, deadline, essay, and activity in one place. Your tracker saves automatically in this browser, and no one else can see it.",
        items: [
          {title:"Application Tracker", desc:"Track your colleges, deadlines, essays, and activities. Saves on your device.", url:"app-tracker.html"},
          {title:"Moeller Popular Colleges", desc:"Add schools to your tracker with test ranges, deadlines, and requirements filled in.", url:"popular-colleges.html"}
        ]
      },
      essays: {
        navLabel: "Writing Resources",
        title: "Essay Writing Resources",
        note: "Final pass",
        desc: "Tips for tightening what you've already drafted, not starting from scratch.",
        stacked: true,
        items: [
          {title:"Personal Statement Checklist", desc:"Last read-through points before you hit submit.", url:"#"},
          {title:"Supplemental Essay Tracker", desc:"A shared sheet to track prompts, word counts, and draft status by school.", url:"#"},
          {title:"Essay Writing Resources", desc:"General tips, structure, and examples for writing a strong personal essay.", url:"#"},
          {title:"Activities Writing Resources", desc:"Tips for writing strong, specific descriptions for your Activities list entries.", url:"#"},
          {title:"Asking for a Final Read", desc:"How to ask a teacher or counselor for feedback with short notice, well.", url:"#"}
        ]
      },
      testing: {
        navLabel: "Testing Resources",
        title: "Testing Resources",
        note: "Wrapping up",
        desc: "Score policies and remaining test dates for anyone still finishing testing.",
        table: {
          caption: "Final fall test dates",
          headers: ["", "ACT", "SAT"],
          rows: [
            ["For Oct. 15 / Nov. 1 deadlines", "Sept. 19 (maybe Oct. 17)", "Sept. 12 (maybe Oct. 3)"],
            ["For January deadlines", "Sept., Oct., Dec.", "Sept., Oct., Nov., Dec."]
          ]
        },
        tool: {
          title: "Should I Submit My Test Scores?",
          intro: "Not sure whether to send your scores to a test-optional school? Start by finding the school's middle 50% score range: search “[College Name] Common Data Set” (for example, “LSU Common Data Set”), open the latest report, and check Section C9 for the percentage of enrolled students who submitted scores and the 25th/50th/75th percentile ranges.",
          prompt: "Which of these is true for you?",
          options: [
            {label: "The college is test-required for admission and/or scholarships", result: "Submit your scores."},
            {label: "Your score is above the 75th percentile", result: "Submit your scores."},
            {label: "Your score falls in the middle 50% range", result: "Submit your scores. If your score is at the lower end of this range, you may opt to withhold it."},
            {label: "Your score is below the 25th percentile", result: "Apply without submitting test scores."}
          ],
          note: "Not every situation is the same — talk with your counselor if you're unsure, or if yours doesn't fit neatly into one of these."
        },
        items: [
          {title:"Sending your scores", desc:"Sending official scores is the student's responsibility — counselors do not send scores. Allow up to 2 weeks for processing and save your confirmation.", url:"#"},
          {title:"Testing policies by school", desc:"Which popular schools require official scores vs. allow self-reporting. See the Moeller Popular Colleges Spreadsheet for the full list.", url:"#"},
          {title:"Ohio State early action note", desc:"Send your scores by Oct. 16 if you want to be considered for Early Action.", url:"#"},
          {title:"AP score self-reporting", desc:"Self-report any AP score of 3, 4, or 5 directly in your Common App.", url:"#"},
          {title:"SAT & ACT policies and score ranges for popular colleges", desc:"Compass Prep's college profiles show testing policies and middle-50% score ranges.", url:"https://www.compassprep.com/college-profiles/"},
          {title:"Test-optional and test-free colleges, searchable list", desc:"FairTest's list is the place to check any college's current testing policy.", url:"https://fairtest.org/test-optional-list/"}
        ]
      },
      financialAid: {
        navLabel: "Financial Aid & FAFSA",
        title: "Financial Aid & FAFSA",
        note: "Don't skip this",
        desc: "Aid is separate from admissions — these deadlines matter just as much as your applications.",
        items: [
          {title:"FAFSA checklist", desc:"Opens October 1. Complete it with your parents once you've started submitting applications.", url:"#"},
          {title:"Financial Aid Night", desc:"September 1, 7:00–8:00 PM at Ursuline — for students and families.", url:"#"},
          {title:"CSS Profile", desc:"Which of your schools require it, and by when.", url:"#"},
          {title:"Comparing award letters", desc:"A framework for reading net cost side by side once offers arrive.", url:"#"}
        ]
      },
      scholarshipReporting: {
        navLabel: "Scholarship & Award Reporting",
        title: "Senior Scholarship & Award Reporting",
        note: "",
        desc: "Every student and family is expected to report every scholarship awarded — whether or not you plan to use it. This includes awards from every institution on your list, private scholarships, essay contests, and athletic awards. Report the full total value of each award.",
        type: "formEmbed",
        formUrl: "#",
        infoTitle: "What to include for each scholarship",
        infoItems: [
          "Awarding institution or organization (college, company, foundation, essay contest, etc.)",
          "Scholarship or award name",
          "Type — institutional, private, essay contest, athletic, or other",
          "Full total value of the award (not just one year's amount, if it's renewable)",
          "Whether it's renewable, and for how many years",
          "Whether you plan to accept and use it"
        ]
      },
      testOptional: {
        navLabel: "Test Optional List",
        title: "Test-Optional Policies (FairTest)",
        note: "",
        desc: "FairTest's full, regularly updated list of test-optional and test-blind colleges nationwide.",
        type: "callout",
        body: "FairTest maintains the most complete national list of which colleges require, recommend, or don't consider SAT/ACT scores — updated as schools change their policies each cycle. It's a good second check alongside the school-specific list in Testing Resources.",
        ctaText: "View the full FairTest list ↗",
        ctaUrl: "https://fairtest.org/test-optional-list/"
      },
      feeWaivers: {
        navLabel: "App Fee Waivers",
        title: "Known Application Fee Waivers",
        note: "",
        desc: "Confirmed fee waivers for this cycle. Check each school's application directly — offers and windows can change.",
        type: "feeWaivers",
        waivers: [
          {
            school: "Ohio State Regional Campuses: apply free through Dec. 1",
            code: "RCW2027",
            details: [
              "Ohio State is waiving the application fee for students who submit a complete application to one of its regional campuses (Lima, Mansfield, Marion, Newark, or Wooster ATI) by December 1.",
              "Applicants also get automatic scholarship consideration and a quick decision, typically in under three weeks.",
              "Enter fee waiver code RCW2027 when prompted in the application."
            ],
            link: {text: "Ohio State's regional campuses admissions page", url: "https://undergrad.osu.edu/regional-campuses/admission"}
          },
          {
            school: "University of Cincinnati",
            details: [
              "Aug. 1 – Sept. 8: Fees waived for students who select “Free Application Days” under the Fee Waiver question.",
              "Attend the Sept. 18, Oct. 3, or Oct. 17 Uptown (Main) campus Open House and register — attendees get a fee waiver.",
              "Oct. 19 – 25: Fees waived for Homecoming Week — select “Homecoming Week” under the Fee Waiver question.",
              "All UC CCP students have their application fee waived automatically."
            ]
          },
          {
            school: "High Point University",
            code: "PANTHER2BE"
          },
          {
            school: "University of Toledo",
            code: "Back2School",
            details: ["Works on both the Common App and the UToledo application. Live through the month of September."]
          }
        ]
      }
    },

    // ---------- School & Academics view (School Counseling side) ----------
    school: {
      blurb: "Finishing strong matters — colleges see your senior grades. Here's the school-side support for this year.",
      order: ["studySkills","academicSupport","forParents"],
      sections: {
        studySkills: {
          title: "Study skills for senior year",
          note: "Placeholder",
          desc: "Replace these with senior-specific study tips.",
          items: [
            {title:"Balancing applications and coursework", desc:"Placeholder — a plan for keeping grades up during application season.", url:"study-tips.html"},
            {title:"Avoiding senioritis", desc:"Placeholder — why second-semester grades still count.", url:"study-tips.html"}
          ]
        },
        academicSupport: {
          title: "Academic support",
          note: "Placeholder",
          desc: "Study groups, Chem Block, and tutoring available to seniors.",
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
          desc: "Ways families can support seniors this year.",
          items: [
            {title:"Supporting your senior", desc:"Placeholder — parent guidance for senior year.", url:"parent-education.html"}
          ]
        }
      }
    }
  };
