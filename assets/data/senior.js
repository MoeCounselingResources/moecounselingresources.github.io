/* =========================================================================
   SENIORS — Application Resources + School & Academics
   This one file feeds the Seniors page in BOTH hubs.
     • Top half of the block (sections)  → the "Application Resources" view
     • "school:" block at the bottom     → the "School & Academics" view
   Each year: update classOf + label, then refresh the content.
   ========================================================================= */

/* Common App's own guides — shown at the bottom of "How to Fill Out the Activities
   Section" and "Common App FAQs". Edit once here to update both. */
const COMMON_APP_RESOURCES = [
  {title:"Approaching the Activities Section", desc:"Common App's own guide to the section, with character limits and an example edit.", url:"https://www.commonapp.org/static/a5d59a915bdc2031e62c468ad35e0de9/Resource_FY_Activities_ENG_2025.06.25_0.pdf", source:"Common App"},
  {title:"Application Dictionary", desc:"Plain definitions of the terms you'll see across the application.", url:"https://www.commonapp.org/static/6ac5a0fbb2c8b4b7721999e09d38defc/Resource_FYTR_AppDictionary_ENG_2025.06.24_0_0.pdf", source:"Common App"},
  {title:"What Is Common App?", desc:"A one-page overview of what Common App is and how it works.", url:"https://www.commonapp.org/static/734a058f07c6f301dd582d3dcbe8e8e0/Resource_FY_WhatIsCA_ENG_2025.10.24.pdf", source:"Common App"}
];

YEARS.senior = {
    classOf: "2027",
    tabLabel: "Senior",
    label: "Class of 2027",
    stage: "Seniors",
    blurb: "These resources will help you with college research, essay writing, and filling out your applications!",
    collegeLabel: "Application Resources",
    // Junior/sophomore/freshman: set layout to "indexed" for a left-side index, or delete it for stacked sections.
    order: ["feeWaivers","fallChecklist","applicationFaq","appTracker","appTypes","exploration","research","commonAppGuide","essayPrompts","commonAppFaq","essays","financialAid","decisionInfo","activities","military","scholarshipReporting","moreEssentials","responsibilities","essayGuides","testOptional","testing"],
    layout: "indexed",
    sections: {
      exploration: {
        navLabel: "College Exploration",
        title: "College exploration",
        note: "Checking your list",
        desc: "Three lists of schools, each on its own tab. Use them to check that your list is balanced, or to find one more school that fits.",
        type: "schoolLists",
        lists: ["goldilocks", "liberalArts", "engineering"],
        // Optional: add more exploration resources here and they show below the lists.
        items: []
      },
      military: {
        navLabel: "Military Options",
        title: "Military Options",
        note: "Academies, colleges & ROTC",
        desc: "Nominations and ROTC scholarships have their own deadlines, separate from your college applications, and many fall early in senior year.",
        items: [
          {title:"Military Options overview", desc:"Compare the three paths side by side.", url:"military.html"},
          {title:"Service Academies", desc:"The five academies, benefits, nominations, and Ohio nominator deadlines.", url:"service-academies.html"},
          {title:"Senior Military Colleges", desc:"Six colleges with a corps of cadets inside a regular college experience.", url:"senior-military-colleges.html"},
          {title:"ROTC", desc:"National scholarships by branch, minimums, and deadlines.", url:"rotc.html"}
        ]
      },
      fallChecklist: {
        navLabel: "Application Checklist",
        title: "Application Checklist",
        note: "Check items off as you go",
        desc: "The full August-through-spring checklist. Checking a box just marks it for you in this browser — it won't affect anyone else's view.",
        type: "checklist",
        groups: [
          {
            label: "August / September",
            months: [8, 9],
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
            months: [10, 11],
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
            months: [12, 1, 2],
            items: [
              "Keep applying for scholarships",
              "Work on applications with later deadlines",
              "Double check SCOIR & your school portals to confirm materials were sent and received",
              "Check your email for communications from colleges — follow up if needed"
            ]
          },
          {
            label: "Spring",
            months: [3, 4, 5, 6, 7],
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
      activities: {
        navLabel: "How to Fill Out the Activities Section",
        title: "How to Fill Out the Activities Section",
        note: "150 characters or less",
        desc: "The Activities section shows colleges who you are outside the classroom. Here's how to choose what to list, what each box asks for, and how to say a lot in a little space.",
        type: "activitiesGuide",
        why: [
          "It tells your story beyond grades and test scores.",
          "It shows your impact, your leadership, and what you'd add to a college campus.",
          "It helps colleges understand your interests and who you are outside of class.",
          "It helps you stand out among students with similar GPAs and test scores."
        ],
        choosing: [
          "You can list up to 10 activities, but you don't have to fill all 10. Choose the ones that tell your story best. Quality beats quantity.",
          "Combine related activities to save space, like “French Club President & French Honor Society Member.”",
          "Order matters. Put your most meaningful activity first and work down from there.",
          "When ranking, think about leadership roles, time commitment, impact on others, personal growth, and anything unique to you.",
          "Jobs, family responsibilities (like caring for siblings), and hobbies count too, not just school clubs and sports."
        ],
        fields: [
          {label:"Activity type", help:"Pick from the dropdown. If nothing fits, choose “Other Club/Activity” and explain in the boxes below."},
          {label:"Position / leadership", limit:50, help:"Your role: Captain, Founder, Member, Volunteer, Employee."},
          {label:"Organization name", limit:100, help:"The group's name. If a reader wouldn't know it, add a few words on what it is."},
          {label:"Description", limit:150, help:"What you did and what came of it. Details, honors, and results go here."},
          {label:"Grades and timing", help:"Which grades you took part in, and whether it was during the school year, during breaks, or all year."},
          {label:"Hours per week, weeks per year", help:"Your best estimate is fine if you don't know exactly."},
          {label:"Similar activity in college?", help:"A yes or no on whether you plan to keep doing something like it."}
        ],
        writing: [
          "Skip complete sentences and small words like “the,” “a,” and “an.” Semicolons and commas are your friends.",
          "Start with a strong action verb, like led, created, organized, or coordinated.",
          "Focus on what YOU did, not on what the club or team does.",
          "Show results and impact, with numbers when you can: “Founded recycling initiative; collected 2,000+ bottles monthly; reduced school waste by 30%.”",
          "Don't repeat what's already in another box. Your position, organization, and hours are reported elsewhere.",
          "Be specific. “Helped out” and “participated” don't tell a reader anything."
        ],
        examples: [
          {before:"Soccer team. Played forward and helped the team win games.", after:"4-year varsity soccer player; voted senior captain; led off season workouts, mentored younger teammates, organized service events"},
          {before:"Boy Scouts member; attended campouts and service projects; earned Eagle Scout rank", after:"Eagle Scout; led 15 Scouts in playground restoration project, organized volunteers/materials, mentored younger Scouts"},
          {before:"National Honor Society leader. Attended meetings and participated in service projects.", after:"Elected NHS officer; completed 20+ tutoring hours; coordinated peer tutoring program for entire student body"}
        ],
        entries: [
          {position:"Volunteer & Mentor", org:"Boys & Girls Club, youth tutoring/mentorship afterschool program", desc:"Served as mentor for K-8 grade kids; helped prepare lunch, entertain, and tutor students in math and science."},
          {position:"Student", org:"Georgetown U’s Medical Institute, intensive summer program for high schoolers interested in medicine", desc:"Studied medical techniques (took vital signs, drew blood, analyzed human cadavers) to prepare for clinical medicine career. Treated patient simulator."},
          {position:"Co-Head Coach", org:"AYSO Boys Soccer, rec soccer league for boys aged 6-12", desc:"Organized drills, modeled soccer technique, prepared line-ups, coached team, emailed parents to coordinate drop-offs and pickups."},
          {position:"Math Tutor", org:"Self-started tutoring business", desc:"Dedicated one-on-one tutoring for arithmetic/geometric sequences and series, trigonometry identities analysis, and factorial/exponential combinations."}
        ],
        verbs: [
          {group:"Leading", words:["Led","Captained","Directed","Founded","Organized","Ran","Started","Managed"]},
          {group:"Creating", words:["Built","Designed","Wrote","Composed","Produced","Launched","Invented","Programmed"]},
          {group:"Helping & teaching", words:["Tutored","Mentored","Coached","Trained","Volunteered","Supported","Cared for","Taught"]},
          {group:"Getting results", words:["Raised","Earned","Won","Grew","Increased","Improved","Completed","Reduced"]},
          {group:"Working with people", words:["Coordinated","Collaborated","Recruited","Represented","Presented","Promoted","Planned","Hosted"]}
        ],
        verbNote: "Use the verb that's true. “Led” beats a fancier word if leading is what you did, and plain words sound more like you.",
        honors: {
          intro: "Honors is a separate section from Activities. You can list up to 5, so put your strongest recognition there and leave Activities for what you did.",
          items: ["AP Scholar Awards","Honor societies","Language medals","Seal of Biliteracy","Honor Roll","National Merit recognition","Art and music awards","Publications and research","Competition awards","Department awards","Athletic scholar awards","Community service awards","Local, state, or national awards"]
        },
        resources: COMMON_APP_RESOURCES
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
          {iso:"2026-10-01", date:"Oct. 1", title:"FAFSA opens", detail:"Complete it with your parents once you've started submitting applications."}
        ],
        // Early-deadline notifications are built from popular-colleges.js (its earlyDeadline field).
        deadlineNotices: {
          dates: [{month:10, day:15}, {month:11, day:1}, {month:12, day:1}],
          note: "Deadlines can change. Confirm on each college's website."
        },
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
        navLabel: "Student Responsibilities",
        title: "Student Responsibilities",
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
        guide: COMMON_APP_GUIDE_STEPS,
        resources: COMMON_APP_RESOURCES
      },
      applicationFaq: {
        navLabel: "Application FAQs",
        title: "Application FAQs",
        note: "Common questions",
        desc: "Answers to questions seniors ask us most often while applying.",
        stacked: true,
        items: [
          {title:"What is demonstrated interest?", desc:"Demonstrated interest is how much a college pays attention to whether you've shown real interest in attending. Some colleges track the contact you have with them and factor it into their decision, because students who engage are more likely to enroll if admitted. Colleges report how much it matters on their Common Data Set as very important, important, considered, or not considered, so it counts heavily at some schools and not at all at others. Ways to show interest include:", bullets:[
            "Visiting campus or attending a virtual information session",
            "Interviewing, especially where interviews are recommended or encouraged",
            "Meeting the college rep when they visit Moeller — register in SCOIR at least 2 days ahead",
            "Talking with admission reps at college fairs and opening their emails",
            "Writing a specific, well-researched “Why this college?” supplemental essay",
            "Applying Early Decision, if that school is truly your first choice"
          ]},
          {title:"Which colleges consider demonstrated interest?", desc:"College Kickstart keeps a list of colleges where demonstrated interest is important or very important and that also offer, encourage, or require interviews. For each school it shows how much interviews matter and links to the college's interview page. Policies can vary by major, so always confirm on the college's own website.", url:"https://www.collegekickstart.com/blog/item/colleges-with-interviews-where-demonstrated-interest-is-important-class-of-2031"}
        ]
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
          {title:"Net price calculators", desc:"Every college is required to post one. Find any school's calculator here and compare your estimated cost after grants and scholarships, not the sticker price.", url:"https://collegecost.ed.gov/net-price"},
          {title:"College ROI rankings", desc:"Georgetown's ranking of 4,600 colleges by long-term earnings minus cost. Useful as one factor, not the deciding one: it's an average across all majors at a school.", url:"https://cew.georgetown.edu/cew-reports/roi2025/"},
          {title:"Confirming supplemental requirements", desc:"Common App's requirements grid shows each college's supplements, deadlines, and fees on one sheet. Then confirm in My Colleges inside your Common App, and check the college's own site if it isn't on Common App.", url:"https://content.commonapp.org/Files/ReqGrid.pdf"},
          {title:"Schools requiring STARS", desc:"Some colleges require or encourage a self-reported transcript (STARS). See which schools use it, then start STARS from the link in each college's applicant portal, not from a search engine.", url:"https://starsrecord.zendesk.com/hc/en-us/articles/35363280510235-Which-Colleges-Use-STARS"},
          {title:"College rep visits", desc:"Over 100 colleges visit Moeller each fall, and reps are often the ones reading your application. See upcoming visits in Upcoming Events at the top of this page, then register in SCOIR at least 2 days ahead.", url:"#updates-box"},
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
        navLabel: "Essay Writing Tips",
        title: "Essay Writing Tips",
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
      essayPrompts: {
        navLabel: "Common App Essay Prompts",
        title: "Common App Essay Prompts",
        note: "Pick one",
        desc: "Your Common App essay answers one of seven prompts, in 250 to 650 words. It's your chance to show colleges something about you beyond courses, grades, and test scores. Here's a short take on each prompt, with questions to get you thinking.",
        type: "essayPrompts",
        prompts: [
          {title:"Background, identity, interest, or talent", summary:"Share something so meaningful to you that your application would feel incomplete without it.",
            think:["Your community, family, culture, and where you come from","What you're curious about and how you spend your time","People and experiences that shaped you"],
            ask:["What's missing from the rest of my application?","What would help a college understand who I am?"]},
          {title:"A challenge, setback, or failure", summary:"Tell about a time something went wrong, how it affected you, and what you learned.",
            think:["Obstacles of any size, personal or bigger than you","Hard things your family or friends went through that touched you too","Challenges you're still working through"],
            ask:["How did I cope, and how did I grow?","Who helped me?"]},
          {title:"Questioning a belief or idea", summary:"Reflect on a time you challenged a belief or idea, what led you to it, and how it turned out.",
            think:["Anywhere you spend time: school, team, work, home, place of worship","Anyone you interact with: friends, teammates, family, teachers, coaches"],
            ask:["Did it clarify or change what I value?","How did it affect my relationships?","Did I surprise myself or anyone else?"]},
          {title:"Unexpected gratitude", summary:"Reflect on something someone did for you that made you thankful in a surprising way, and how it has motivated you since.",
            think:["Every kind of interaction: advice, support, a gift, even criticism","People who know you well and people who don't"],
            ask:["What made it surprising?","How did I feel, and how did I respond?"]},
          {title:"A moment of personal growth", summary:"Describe an accomplishment, event, or realization that helped you understand yourself or others in a new way.",
            think:["Achievements others saw and ones only you know about","Small, everyday moments that hit hard","Times you surprised yourself with what you learned"],
            ask:["How did I change?","How can I keep growing, and share what I learned?"]},
          {title:"Something you get lost in", summary:"Describe a topic or idea so engaging you lose track of time, why it grabs you, and where you go to learn more.",
            think:["How you spend your free time","Your hobbies and favorite classes","What you read, write, and make"],
            ask:["How did this interest start?","What does it say about me, to others and to myself?"]},
          {title:"Topic of your choice", summary:"Write about anything. It can be an essay you've already written, one that answers a different prompt, or one you design yourself.",
            think:["What you want to share, not what you think colleges want to hear","Topics that show who you are and what matters to you"],
            ask:["Does this tell my colleges something new?","Is anything important left unsaid in my application?"]}
        ],
        promptNote: "These are short summaries. Read each prompt's exact wording in Common App's guide below or in the Writing section of the application before you choose.",
        resources: [
          {title:"Telling Your Story: How to Approach the Essay", desc:"Common App's guide to all seven prompts, with the full wording and brainstorming questions for each.", url:"https://www.commonapp.org/static/ff69a4ea4ce044fe419826e26803aa65/Resource_FY_Essays_ENG_2025.06.25_0.pdf", source:"Common App"}
        ]
      },
      essayGuides: {
        navLabel: "Supplemental Essay Guides",
        title: "Supplemental Essay Guides",
        note: "School by school",
        type: "essayGuides",
        desc: "Many colleges ask for their own short essays on top of your Common App essay. Find your school below for a how-to guide with that school's prompts, strategy, and example essays.",
        tips: [
          "Open the Writing Supplement in the Common App for each school on your list first, so you know exactly which prompts you owe.",
          "Start with your earliest deadline, and look for prompts you can answer with one strong story, adjusted for each school.",
          "“Why us?” essays need specifics: a class, a program, a professor, something you saw on a visit. If a sentence could apply to any college, cut it."
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
        exploration: {
          title: "Exploration",
          note: "Placeholder",
          desc: "Exploration resources for seniors from School Counseling. Replace these with the real resources.",
          items: [
            {title:"Resource title", desc:"Placeholder — a one-line description of this resource.", url:"#"},
            {title:"Resource title", desc:"Placeholder — a one-line description of this resource.", url:"#"}
          ]
        },
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
