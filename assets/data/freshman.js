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
    // Junior/sophomore/freshman: set layout to "indexed" for a left-side index, or delete it for stacked sections.
    order: ["research","essays","timeline","testing","financialAid"],
    sections: {
      research: {
        title: "College research tools",
        note: "Just getting oriented",
        desc: "A first, gentle look at what colleges consider.",
        items: [
          {title:"What colleges look for", desc:"A first look at GPA, coursework, and activities — no pressure yet.", url:"#"},
          {title:"Choosing courses with the future in mind", desc:"Course planning basics that keep options open.", url:"#"},
          {title:"Exploring interests freely", desc:"Trying activities without needing to commit to any of them.", url:"#"}
        ]
      },
      essays: {
        title: "Essay writing resources",
        note: "Way ahead of time",
        desc: "It's early — this is about noticing your own experiences, not writing essays.",
        items: [
          {title:"Why writing matters early", desc:"Building comfort with writing years before applications exist.", url:"#"},
          {title:"Keeping a running journal", desc:"A simple habit that gives future-you something to draw on.", url:"#"}
        ]
      },
      timeline: {
        title: "Application timeline & checklists",
        note: "Freshman year",
        desc: "The basics of how counseling support works here.",
        items: [
          {title:"Freshman year checklist", desc:"Foundational steps for the next four years, one at a time.", url:"#"},
          {title:"Meeting your counselor", desc:"How counseling support works at our school, and how to reach out.", url:"#"},
          {title:"Setting up your student account", desc:"Where you'll track courses, activities, and plans going forward.", url:"#"}
        ]
      },
      testing: {
        title: "Testing resources",
        note: "Not urgent yet",
        desc: "A first, low-stakes look at standardized testing.",
        items: [
          {title:"PSAT 8/9 overview", desc:"An early, low-stakes practice test — good exposure, nothing more.", url:"#"},
          {title:"Understanding the testing timeline", desc:"What to expect over the next four years, roughly.", url:"#"},
          {title:"Why test prep isn't urgent yet", desc:"It's genuinely fine to wait on this one.", url:"#"}
        ]
      },
      financialAid: {
        title: "Financial aid & FAFSA",
        note: "Way ahead of time",
        desc: "Purely optional reading — nothing here needs attention for years.",
        items: [
          {title:"How college costs really work", desc:"Sticker price vs. what families actually end up paying.", url:"#"},
          {title:"Why this isn't urgent yet", desc:"A quick note on why waiting is genuinely fine at this stage.", url:"#"},
          {title:"Saving & 529 basics", desc:"An optional read for families who want a head start.", url:"#"}
        ]
      }
    },

    // ---------- School & Academics view (School Counseling side) ----------
    school: {
      blurb: "Welcome to Moeller. Here's how to get settled, study well, and find help when you need it.",
      order: ["studySkills","academicSupport","forParents"],
      sections: {
        studySkills: {
          title: "Study skills for freshman year",
          note: "Placeholder",
          desc: "Replace these with freshman-specific study tips.",
          items: [
            {title:"How high school studying is different", desc:"Placeholder — what changes from middle school.", url:"study-tips.html"},
            {title:"Using a planner", desc:"Placeholder — keeping track of assignments and tests.", url:"study-tips.html"}
          ]
        },
        academicSupport: {
          title: "Academic support",
          note: "Placeholder",
          desc: "Study groups, Chem Block, and tutoring available to freshmen.",
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
          desc: "Ways families can support freshmen this year.",
          items: [
            {title:"Supporting your freshman", desc:"Placeholder — parent guidance for the transition to high school.", url:"parent-education.html"}
          ]
        }
      }
    }
  };
