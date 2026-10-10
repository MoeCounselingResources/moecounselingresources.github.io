/* =========================================================================
   JUNIORS — College Knowledge + School & Academics
   This one file feeds the Juniors page in BOTH hubs.
     • Top half of the block (sections)  → the "College Knowledge" view
     • "school:" block at the bottom     → the "School & Academics" view
   Each year: update classOf + label, then refresh the content.
   ========================================================================= */

YEARS.junior = {
    classOf: "2028",
    tabLabel: "Junior",
    label: "Class of 2028",
    stage: "Juniors",
    blurb: "This year is about understanding the process and building your list, not finishing it. By spring, you'll start your Common App essay ahead of applying next fall.",
    collegeLabel: "College Knowledge",
    // Junior/sophomore/freshman: set layout to "indexed" for a left-side index, or delete it for stacked sections.
    layout: "indexed",
    order: ["research","exploration","essays","essayGuides","timeline","testing","financialAid","military"],
    sections: {
      exploration: {
        navLabel: "College Exploration",
        title: "College exploration",
        note: "Building your list",
        desc: "Three lists of schools, each on its own tab. Use them to find schools you haven't heard of yet and to make sure your list has a mix of sizes and types.",
        type: "schoolLists",
        lists: ["goldilocks", "liberalArts", "engineering"],
        // Optional: add more exploration resources here and they show below the lists.
        items: []
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
          {title:"Building a balanced college list", desc:"What \"reach, target, and likely\" actually mean, and how to sort your list into them.", url:"#"},
          {title:"Getting the most from a campus visit", desc:"What to look for beyond the tour, virtual or in person.", url:"#"},
          {title:"Comparing majors & programs", desc:"How to research a school's actual offerings, not just its ranking.", url:"#"},
          {title:"Moeller Popular Colleges", desc:"Test ranges, deadlines, and requirements for the schools Moeller students apply to most.", url:"popular-colleges.html"}
        ]
      },
      essays: {
        navLabel: "Essay Writing",
        title: "Essay writing resources",
        note: "Starting to think ahead",
        desc: "You don't need a draft yet — these are for getting familiar with what's coming.",
        items: [
          {title:"This year's Common App prompts", desc:"An early look at the prompts you'll choose from next fall.", url:"#"},
          {title:"Brainstorming your story", desc:"Exercises for finding a topic before junior spring, without pressure.", url:"#"},
          {title:"Why starting a draft in spring matters", desc:"How a head start in May changes your senior fall.", url:"#"}
        ]
      },
      essayGuides: {
        navLabel: "Supplemental Essay Guides",
        title: "Supplemental Essay Guides",
        note: "A preview",
        type: "essayGuides",
        desc: "Some colleges ask for extra essays beyond the Common App essay. Look up the schools you're considering to see what they've been asking, so nothing surprises you next fall.",
        tips: [
          "These guides cover this year's prompts. Most colleges post next year's prompts over the summer, and many stay the same or change only a little.",
          "Notice which schools on your list ask the most. That's useful to know when you're deciding where to apply and how much time to save.",
          "Your Common App essay comes first. Start it this spring, then tackle supplements in the summer before senior year."
        ]
      },
      timeline: {
        navLabel: "Junior Timeline",
        title: "Application timeline & checklists",
        note: "Junior year",
        desc: "A month-by-month view of what matters this year.",
        items: [
          {title:"Junior year planning checklist", desc:"What to handle this fall, winter, and spring — in order.", url:"#"},
          {title:"Setting up your Common App account", desc:"Creating your account early and exploring the format before you need it.", url:"#"},
          {title:"Requesting letters of recommendation", desc:"Who to ask, and when, so it's done before senior year gets busy.", url:"#"}
        ]
      },
      testing: {
        navLabel: "Testing",
        title: "Testing resources",
        note: "This year's calendar",
        desc: "Test dates, formats, and how scores work.",
        items: [
          {title:"SAT & ACT test dates", desc:"This year's full testing calendar for juniors.", url:"#"},
          {title:"Which test fits you", desc:"A side-by-side comparison of the SAT and ACT formats.", url:"#"},
          {title:"Score release dates & superscoring", desc:"When scores post, and how schools combine sittings.", url:"#"}
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
