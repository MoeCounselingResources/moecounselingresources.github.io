/* =========================================================================
   SOPHOMORES — Future Focus + School & Academics
   This one file feeds the Sophomores page in BOTH hubs.
     • Top half of the block (sections)  → the "Future Focus" view
     • "school:" block at the bottom     → the "School & Academics" view
   Each year: update classOf + label, then refresh the content.
   ========================================================================= */

YEARS.sophomore = {
    classOf: "2029",
    tabLabel: "Sophomore",
    label: "Class of 2029",
    stage: "Sophomores",
    blurb: "There's no rush yet. This year is about figuring out what you're interested in and building habits that make junior year easier.",
    collegeLabel: "Future Focus",
    // Left-side index, like Seniors and Juniors.
    layout: "indexed",
    // Card style, same as Juniors (see "Card options" at the top of junior.js): balanced cards, gold accents,
    // "Go to ..." labels on internal links, "Show more" panels, gold tip boxes.
    compactCards: true,
    accentCards: true,
    goLabels: true,
    order: ["research","exploration","essays","futureFocus","timeline","testing","financialAid"],
    sections: {
      exploration: {
        navLabel: "College Exploration",
        title: "College exploration",
        note: "Exploring, not deciding",
        desc: "Three lists of schools to browse, each on its own tab. Nothing to decide yet. Notice which kinds of schools catch your eye and look a few of them up.",
        type: "schoolLists",
        lists: ["goldilocks", "liberalArts", "engineering"],
        // Optional: add more exploration resources here and they show below the lists.
        items: [
          {title:"Opportunities Board", desc:"College fairs, programs, career exploration, and jobs shared with Moeller counseling.", url:"opportunities.html"}
        ]
      },
      research: {
        navLabel: "College Research",
        title: "College research tools",
        note: "Exploring, not deciding",
        desc: "Low-pressure ways to start noticing what you like.",
        items: [
          {title:"What makes a good college fit", desc:"Size, location, and program basics — the vocabulary you'll need later.", url:"popular-colleges.html", go:"Go to Moeller Popular Colleges", bullets:[
            {text:"College Visit 101: Tips & Questions", url:"college-exploration.html#visitGuide"}
          ], panels:[
            {text:"Moeller Popular Colleges shows the schools Moeller students apply to most, with test ranges, deadlines, and requirements. College Visit 101 shows what to look for and what to ask when you visit a campus."}
          ]},
          {title:"Exploring career interests", desc:"Tools that connect interests and strengths to possible fields of study.", url:"career-exploration.html#assessments", go:"Go to Career Exploration assessments", panels:[
            {text:"Log in to SCOIR and take the Career Interest Assessment (what you like to do) and PrinciplesYou (how you think, work, and interact with others). The Career Exploration page explains both."}
          ]},
          {title:"Following colleges without committing", desc:"In SCOIR, you can add colleges to Following to keep track of schools you're curious about.", panels:[
            {text:"Following a college doesn't commit you to anything, and it doesn't mean you're applying. It just keeps the schools you're curious about in one place, so your college search can start slowly and you can come back to them when you build your list."}
          ]}
        ]
      },
      essays: {
        navLabel: "Essays",
        title: "Essay writing resources",
        note: "Building the habit",
        desc: "Nothing to submit yet — just building comfort with writing about yourself.",
        items: [
          {title:"Building a writing habit now", desc:"Short journaling and reflection exercises worth doing this year.", url:"essays.html", go:"Go to Essays", panels:[
            {text:"There's no pressure to write a college essay yet. Writing a little about what matters to you now makes it easier later."}
          ]},
          {title:"Reading essays that work", desc:"A few strong examples worth studying before you ever write your own.", url:"essays.html", go:"Go to Essays", panels:[
            {text:"You don't need to write one yet. Reading how other students tell their stories is a good way to see what works."}
          ]}
        ]
      },
      futureFocus: {
        navLabel: "Future Focus Checklist",
        title: "Future Focus Checklist",
        note: "Check items off as you go",
        desc: "Your four Future Focus sessions, one each quarter. Checking a box just marks it for you in this browser. It won't affect anyone else's view.",
        type: "checklist",
        // "months" decides which quarter opens by default (the current one). Adjust them to the school calendar.
        groups: [
          {label:"Quarter 1", months:[8,9,10], items:[
            {text:"Future Focus session: Career Assessments", detail:"Log in to SCOIR and take two career assessments: the quick Career Interest Assessment (what you like to do) and PrinciplesYou (how you think, work, and interact with others). Then review your career matches.", tip:"Save at least 3 careers before retaking the interest assessment, since retaking replaces your matches."}
          ]},
          {label:"Quarter 2", months:[11,12], items:[
            {text:"Future Focus session: Understanding Your Results", detail:"Explore your PrinciplesYou archetypes, what they say about your strengths and growth areas, and how your results connect to careers and the education they require.", tip:"Your full report is saved in SCOIR under Profile → Drive."}
          ]},
          {label:"Quarter 3", months:[1,2,3], items:[
            {text:"Future Focus session: Exploring College Admissions", detail:"Find out what colleges look for in a holistic review, what your transcript shows now versus when you apply, and how Moeller’s weighted GPA works.", tip:"Every grade counts toward your GPA, starting now."}
          ]},
          {label:"Quarter 4", months:[4,5,6,7], items:[
            {text:"Future Focus session: Future Focus Wrap-Up & Building a Resume", detail:"Start a brag sheet in SCOIR by adding your activities and achievements. Then review your PreACT and Diagnostic SAT results and preview junior year’s College Knowledge sessions.", tip:"You don’t need to start testing until junior year."}
          ]}
        ]
      },
      timeline: {
        navLabel: "Timeline & Checklists",
        title: "Application timeline & checklists",
        note: "Sophomore year",
        desc: "What's worth tracking now so junior year isn't a scramble.",
        items: [
          {title:"Sophomore year checklist", desc:"Your Future Focus sessions, one each quarter, with checkboxes that save on your device.", url:"#futureFocus", go:"Go to the Future Focus Checklist"},
          {title:"Building your activities list", desc:"A simple way to start tracking involvement you'll need later.", panels:[
            {text:"In SCOIR, start a brag sheet under Activities & Achievements. Add what you do and what you earn as it happens. It's much easier than trying to remember everything in junior or senior year."}
          ]}
        ]
      },
      testing: {
        navLabel: "Testing",
        title: "Testing resources",
        note: "Getting familiar",
        desc: "Low-stakes ways to understand testing before it matters.",
        items: [
          {title:"PreACT & Diagnostic SAT overview", desc:"Moeller sophomores take the PreACT and a Diagnostic SAT. Score reports come from Compass by email.", panels:[
            {text:"Use your results to see your strengths and growth areas: look at which sections you did best on, and which ones to keep working on. These are practice tests, so use them to plan, not to judge yourself."}
          ]},
          {title:"Should you test early", desc:"It isn't necessary to start testing until junior year.", url:"act-sat.html#recommendations", go:"Go to Moeller's testing recommendations", panels:[
            {bullets:[
              "Students who've completed Algebra II can start in the fall of junior year.",
              "Students taking Algebra II as juniors should start with Moeller's state SAT in March.",
              "Juniors take the PSAT in October and the state SAT in March at Moeller, plus an at-home practice ACT in November.",
              "Moeller recommends the ACT with Science and skipping the optional writing section.",
              "Colleges have no preference between the ACT and SAT.",
              "Finish testing by early October of senior year."
            ]}
          ]},
          {title:"Free & low-cost test prep options", desc:"Where to start if you want to get ahead without spending much.", url:"act-sat.html#prep", go:"Go to Test Prep Resources"}
        ]
      },
      financialAid: {
        navLabel: "Financial Aid",
        title: "Financial aid & FAFSA",
        note: "Just the basics",
        desc: "Nothing to act on yet — just a first look at how college costs actually work.",
        items: [
          {title:"What financial aid actually covers", desc:"A first look at grants, loans, work-study, and scholarships.", url:"financial-aid.html#basics"},
          {title:"Scholarship searches worth starting early", desc:"Low-effort searches you can leave running in the background.", url:"financial-aid.html#scholarships"},
          {title:"Starting the cost conversation with family", desc:"Why sophomore year is a good, low-pressure time to start.", url:"financial-aid.html#byGrade"}
        ]
      }
    },

    // ---------- School & Academics view (School Counseling side) ----------
    school: {
      blurb: "Sophomore year is when good habits pay off. Here's the school-side support for this year.",
      order: ["studySkills","academicSupport","selfDiscovery","forParents"],
      sections: {
        studySkills: {
          title: "Study skills for sophomore year",
          note: "Placeholder",
          desc: "Replace these with sophomore-specific study tips.",
          items: [
            {title:"Building a weekly study routine", desc:"Placeholder — a simple routine that sticks.", url:"study-tips.html"},
            {title:"Taking notes that help later", desc:"Placeholder — note-taking methods worth trying.", url:"study-tips.html"}
          ]
        },
        academicSupport: {
          title: "Academic support",
          note: "Placeholder",
          desc: "Study groups, Chem Block, and tutoring available to sophomores.",
          items: [
            {title:"Study groups & Chem Block", desc:"Placeholder — when and where they meet.", url:"academic-support.html"},
            {title:"Peer & teacher tutoring", desc:"Placeholder — how to sign up.", url:"academic-support.html"},
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
          desc: "Ways families can support sophomores this year.",
          items: [
            {title:"Supporting your sophomore", desc:"Placeholder — parent guidance for sophomore year.", url:"parent-education.html"}
          ]
        }
      }
    }
  };
