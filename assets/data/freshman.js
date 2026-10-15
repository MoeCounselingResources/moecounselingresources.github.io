/* =========================================================================
   FRESHMEN — Freshman Foundations + School & Academics
   This one file feeds the Freshmen page in BOTH hubs.
     • Top half of the block (sections)  → the "Freshman Foundations" view
     • "school:" block at the bottom     → the "School & Academics" view
   Each year: update classOf + label, then refresh the content.
   ========================================================================= */

YEARS.freshman = {
    classOf: "2030",
    tabLabel: "Freshman",
    label: "Class of 2030",
    stage: "Freshmen",
    blurb: "Welcome in. Nothing here is urgent — this is about understanding how the next four years fit together.",
    collegeLabel: "Freshman Foundations",
    // Left-side index, like Seniors and Juniors.
    layout: "indexed",
    // Card style, same as Juniors (see "Card options" at the top of junior.js): balanced cards, gold accents,
    // "Go to ..." labels on internal links, "Show more" panels, gold tip boxes.
    compactCards: true,
    accentCards: true,
    goLabels: true,
    order: ["research","essays","foundations","timeline","testing","financialAid"],
    sections: {
      research: {
        navLabel: "College Research",
        title: "College research tools",
        note: "Just getting oriented",
        desc: "A first, gentle look at what colleges consider.",
        items: [
          {title:"What colleges look for", desc:"A first look at GPA, coursework, and activities — no pressure yet.", url:"gpa-calculator.html", go:"Go to GPA Calculator", panels:[
            {text:"Every grade counts toward your GPA, so challenge yourself in class. The GPA Calculator shows your yearly and cumulative GPA as you go."}
          ]},
          {title:"Choosing courses with the future in mind", desc:"Course planning basics that keep options open.", panels:[
            {text:"Course registration happens each year. You can learn how it works and plan ahead using the SCOIR course planner."}
          ]},
          {title:"Exploring interests freely", desc:"Trying activities without needing to commit to any of them.", url:"military.html", go:"Go to Military Options", panels:[
            {text:"College isn’t the only path after high school. Degrees range from associate’s to professional, and there are other paths too, like the military and trade school."},
            {title:"Local examples", text:"Cincinnati State, UC Blue Ash, and Miami’s regional campuses."}
          ]},
          {title:"Opportunities Board", desc:"College fairs, programs, career exploration, and jobs shared with Moeller counseling.", url:"opportunities.html"},
          {title:"Know yourself", desc:"Short exercises on the roles you play, what you love, and what fires you up.", url:"know-yourself.html", go:"Go to Know Yourself", maxLinks:3, bullets:[
            {text:"What role do you play?", url:"know-yourself.html#roles"},
            {text:"I love / I know", url:"know-yourself.html#loveknow"},
            {text:"What fires you up?", url:"know-yourself.html#fires"}
          ]}
        ]
      },
      essays: {
        navLabel: "Essays",
        title: "Essay writing resources",
        note: "Way ahead of time",
        desc: "It's early — this is about noticing your own experiences, not writing essays.",
        items: [
          {title:"Why writing matters early", desc:"Building comfort with writing years before applications exist.", url:"essays.html", go:"Go to Essays", panels:[
            {text:"There's no college essay to write yet. The Essays page shows what's ahead, so you know it's something you can build up to."}
          ]},
          {title:"Keeping a running journal", desc:"A simple habit that gives future-you something to draw on.", url:"essays.html", go:"Go to Essays", panels:[
            {text:"There's no pressure and nothing to turn in. Jot down moments that mattered to you, and you'll have plenty to draw on later."}
          ]}
        ]
      },
      foundations: {
        navLabel: "Freshman Foundations Checklist",
        title: "Freshman Foundations Checklist",
        note: "Check items off as you go",
        desc: "Your four Freshman Foundations sessions, one each quarter. Checking a box just marks it for you in this browser. It won't affect anyone else's view.",
        type: "checklist",
        // "months" decides which quarter opens by default (the current one). Adjust them to the school calendar.
        groups: [
          {label:"Quarter 1", months:[8,9,10], items:[
            {text:"Freshman Foundations session: Study Skills & Adjusting to High School", detail:"Set goals for your 720 days of high school, get to know who’s here to support you, and build study skills that work: staying organized, managing your time, and active studying.", tip:"Start studying at least 2 days before a test (3–5 days for big ones), and quiz yourself instead of rereading notes.", link:{text:"Open the Quarter 1 page", url:"freshman-foundations-q1.html"}}
          ]},
          {label:"Quarter 2", months:[11,12], items:[
            {text:"Freshman Foundations session: Self-Discovery & Exploring Life After High School", detail:"Explore how you learn best, what college is, the types of degrees (from associate’s to professional), and other paths like the military and trade school.", tip:"Every grade counts toward your GPA, so challenge yourself in class.", links:[{text:"Open the Quarter 2 page", url:"freshman-foundations-q2.html"}, {text:"Exercise: What role do you play?", url:"know-yourself.html#roles"}, {text:"Exercise: I love / I know", url:"know-yourself.html#loveknow"}, {text:"Exercise: What fires you up?", url:"know-yourself.html#fires"}]}
          ]},
          {label:"Quarter 3", months:[1,2,3], items:[
            {text:"Freshman Foundations session: Course Registration and Planning", detail:"Learn how course registration works, what the levels mean, and how to map out all four years with the Course Planner.", tip:"Choose classes that challenge you and fit your interests.", links:[{text:"Open the Quarter 3 page", url:"freshman-foundations-q3.html"}, {text:"Open the Course Planner", url:"course-planner.html"}]}
          ]},
          {label:"Quarter 4", months:[4,5,6,7], items:[
            {text:"Freshman Foundations session: Mental Health", detail:"A presentation on taking care of your mental health and where to find support at Moeller. This session is presented in person.", tip:"If you’re struggling, reach out to your counselor, a teacher, your dean, or your mentor teacher.",
              card:{title:"You're not alone", intro:"If you're going through something hard, you don't have to handle it by yourself.",
                lines:[{text:"Call or text 988 (Suicide & Crisis Lifeline), any time.", href:"tel:988"}, {text:"Text HOME to 741741 (Crisis Text Line).", href:"sms:741741?&body=HOME"}, {text:"In an emergency, call 911.", href:"tel:911"}],
                counselors:true, note:"You can always walk into the counseling office.",
                links:[{text:"NAMI (National Alliance on Mental Illness)", url:"https://www.nami.org"}]}}
          ]}
        ]
      },
      timeline: {
        navLabel: "Timeline & Checklists",
        title: "Application timeline & checklists",
        note: "Freshman year",
        desc: "The basics of how counseling support works here.",
        items: [
          {title:"Freshman year checklist", desc:"Your Freshman Foundations sessions, one each quarter, with checkboxes that save on your device.", url:"#foundations", go:"Go to the Freshman Foundations Checklist"},
          {title:"Meeting your counselor", desc:"How counseling support works at our school, and how to reach out.", url:"#counselor-grid", go:"Go to the counseling team", panels:[
            {text:"Each house has its own counselor. Find yours on the counseling team list, and email them any time. You don't need an appointment."}
          ]},
          {title:"Setting up your student account", desc:"Where you'll track courses, activities, and plans going forward.", panels:[
            {text:"Log in to SCOIR, choose and save a password, and bookmark the site."}
          ]}
        ]
      },
      testing: {
        navLabel: "Testing",
        title: "Testing resources",
        note: "Not urgent yet",
        desc: "A first, low-stakes look at standardized testing.",
        items: [
          {title:"What’s ahead for testing at Moeller", desc:"Sophomores take the PreACT and a Diagnostic SAT. Juniors take the PSAT in October and the state SAT in March.", panels:[
            {text:"Nothing to do about testing now. This is just so you know what's coming."}
          ]},
          {title:"Understanding the testing timeline", desc:"What to expect over the next four years, roughly.", url:"act-sat.html#recommendations", go:"Go to Moeller's testing recommendations", panels:[
            {bullets:[
              "It isn't necessary to start testing until junior year.",
              "Students who've completed Algebra II can start in the fall of junior year.",
              "Students taking Algebra II as juniors should start with Moeller's state SAT in March.",
              "Juniors take the PSAT in October and the state SAT in March at Moeller, plus an at-home practice ACT in November.",
              "Moeller recommends the ACT with Science and skipping the optional writing section.",
              "Colleges have no preference between the ACT and SAT.",
              "Finish testing by early October of senior year."
            ]}
          ]},
          {title:"Why test prep isn't urgent yet", desc:"It isn't necessary to start testing until junior year, so focus on grades and strong study habits now."}
        ]
      },
      financialAid: {
        navLabel: "Financial Aid",
        title: "Financial aid & FAFSA",
        note: "Way ahead of time",
        desc: "Purely optional reading — nothing here needs attention for years.",
        items: [
          {title:"How college costs really work", desc:"Sticker price vs. what families actually end up paying.", url:"financial-aid.html#cost"},
          {title:"Why this isn't urgent yet", desc:"A quick note on why waiting is genuinely fine at this stage.", url:"financial-aid.html#byGrade"},
          {title:"Saving & 529 basics", desc:"An optional read for families who want a head start.", url:"financial-aid.html#byGrade"}
        ]
      }
    },

    // ---------- School & Academics view (School Counseling side) ----------
    school: {
      blurb: "Welcome to Moeller. Here's how to get settled, study well, and find help when you need it.",
      order: ["studySkills","academicSupport","selfDiscovery","forParents"],
      sections: {
        studySkills: {
          title: "Study skills for freshman year",
          note: "From Freshman Foundations",
          desc: "Habits that help you stay organized and focused, and strategies that research shows work.",
          compactCards: true,
          accentCards: true,
          items: [
            {title:"Moeller’s study skills from Freshman Foundations", desc:"Simple habits for staying organized and focused.", panels:[
              {title:"Show the habits", bullets:[
                "Use a planner.",
                "Turn on Moe Campus calendar reminders by email or text.",
                "Do a “Sunday reset”: preview your week.",
                "Organize your notes by subject.",
                "The 2-day rule: start studying at least 2 days before a test.",
                "Break big projects into weekly chunks.",
                "The 50-10 rule: 50 minutes of focus, then a 10-minute break.",
                "Put your phone in another room, and pick a focus spot that isn’t your bed."
              ]}
            ]},
            {title:"Six science-backed study strategies", desc:"Ways to study that research supports.", panels:[
              {title:"Show the strategies", bullets:[
                {label:"Retrieval practice:", text:"Quiz yourself instead of rereading."},
                {label:"Spaced practice:", text:"Study over several days, not all at once."},
                {label:"Elaboration:", text:"Explain ideas in your own words, asking why and how."},
                {label:"Concrete examples:", text:"Connect ideas to real examples."},
                {label:"Dual coding:", text:"Combine words with visuals, like diagrams or drawings."},
                {label:"Interleaving:", text:"Mix topics or problem types in one study session."}
              ]}
            ], tip:{text:"Research doesn’t support matching how you study to a “learning style.” These strategies work for everyone."}},
            {title:"The Learning Scientists", desc:"Free student materials on how to study.", url:"https://www.learningscientists.org/"}
          ]
        },
        academicSupport: {
          title: "Academic support",
          note: "Placeholder",
          desc: "Study groups, Chem Block, and tutoring available to freshmen.",
          items: [
            {title:"Study groups & Chem Block", desc:"Placeholder — when and where they meet.", url:"academic-support.html"},
            {title:"Peer & teacher tutoring", desc:"Placeholder — how to sign up.", url:"academic-support.html"},
            {title:"Course Planner", desc:"Map out all four years, watch your graduation requirements fill in, and explore pathways before your registration meeting.", url:"course-planner.html"},
            {title:"GPA Calculator", desc:"Figure your yearly and cumulative GPA, weighted and unweighted, and see where you stand for Latin Honors.", url:"gpa-calculator.html"},
            {title:"Honor Roll Calculator", desc:"Check whether your quarter grades put you on First or Second Honors.", url:"honor-roll.html"}
          ]
        },
        selfDiscovery: {
          title: "Self-discovery",
          note: "Any time",
          desc: "Private, self-paced exercises on your values, your roles, your goals, and who's in your corner. Nobody grades them.",
          items: [
            {title:"Self-Discovery", desc:"Short exercises that save on your device only. Start anywhere.", url:"self-discovery.html", go:"Start Self-Discovery"}
          ]
        },
        forParents: {
          title: "For parents",
          note: "Placeholder",
          desc: "Ways families can support freshmen this year.",
          items: [
            {title:"Supporting your freshman", desc:"Placeholder — parent guidance for the transition to high school.", url:"parent-education.html"}
          ]
        }
      }
    }
  };
