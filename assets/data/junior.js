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
    order: ["research","essays","timeline","testing","financialAid"],
    sections: {
      research: {
        navLabel: "College Research",
        title: "College research tools",
        note: "Building your list",
        desc: "Start wide, then narrow — these help you figure out what actually fits.",
        items: [
          {title:"Building a balanced college list", desc:"What \"reach, target, and likely\" actually mean, and how to sort your list into them.", url:"#"},
          {title:"Getting the most from a campus visit", desc:"What to look for beyond the tour, virtual or in person.", url:"#"},
          {title:"Comparing majors & programs", desc:"How to research a school's actual offerings, not just its ranking.", url:"#"}
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
          {title:"Cost vs. sticker price", desc:"Why the listed price is rarely what a family actually pays.", url:"#"},
          {title:"Merit aid vs. need-based aid", desc:"The difference between the two, and how it can affect your list.", url:"#"},
          {title:"Getting ready for FAFSA", desc:"What to start gathering this year so senior fall is easier.", url:"#"}
        ]
      }
    },

    // ---------- School & Academics view (School Counseling side) ----------
    school: {
      blurb: "Junior year is often the heaviest academic year. Here's the school-side support to keep you on track.",
      order: ["studySkills","academicSupport","forParents"],
      sections: {
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
            {title:"GPA Calculator", desc:"Figure your yearly and cumulative GPA, weighted and unweighted, and see where you stand for Latin Honors.", url:"gpa-calculator.html"}
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
