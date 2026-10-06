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
    // Junior/sophomore/freshman: set layout to "indexed" for a left-side index, or delete it for stacked sections.
    order: ["research","essays","timeline","testing","financialAid"],
    sections: {
      research: {
        title: "College research tools",
        note: "Exploring, not deciding",
        desc: "Low-pressure ways to start noticing what you like.",
        items: [
          {title:"What makes a good college fit", desc:"Size, location, and program basics — the vocabulary you'll need later.", url:"#"},
          {title:"Exploring career interests", desc:"Tools that connect interests and strengths to possible fields of study.", url:"#"},
          {title:"Following colleges without committing", desc:"Signing up for mailing lists is a fine way to start paying attention.", url:"#"}
        ]
      },
      essays: {
        title: "Essay writing resources",
        note: "Building the habit",
        desc: "Nothing to submit yet — just building comfort with writing about yourself.",
        items: [
          {title:"Building a writing habit now", desc:"Short journaling and reflection exercises worth doing this year.", url:"#"},
          {title:"Reading essays that work", desc:"A few strong examples worth studying before you ever write your own.", url:"#"}
        ]
      },
      timeline: {
        title: "Application timeline & checklists",
        note: "Sophomore year",
        desc: "What's worth tracking now so junior year isn't a scramble.",
        items: [
          {title:"Sophomore year checklist", desc:"Coursework and activity planning for the year ahead.", url:"#"},
          {title:"Building your activities list", desc:"A simple way to start tracking involvement you'll need later.", url:"#"},
          {title:"PSAT prep basics", desc:"What the PSAT actually measures, and why it's worth taking seriously.", url:"#"}
        ]
      },
      testing: {
        title: "Testing resources",
        note: "Getting familiar",
        desc: "Low-stakes ways to understand testing before it matters.",
        items: [
          {title:"PSAT overview", desc:"Format, timing, and how to read your score report.", url:"#"},
          {title:"Should you test early", desc:"What to consider if you're thinking about an early SAT or ACT attempt.", url:"#"},
          {title:"Free & low-cost test prep options", desc:"Where to start if you want to get ahead without spending much.", url:"#"}
        ]
      },
      financialAid: {
        title: "Financial aid & FAFSA",
        note: "Just the basics",
        desc: "Nothing to act on yet — just a first look at how college costs actually work.",
        items: [
          {title:"What financial aid actually covers", desc:"A first look at grants, loans, work-study, and scholarships.", url:"#"},
          {title:"Scholarship searches worth starting early", desc:"Low-effort searches you can leave running in the background.", url:"#"},
          {title:"Starting the cost conversation with family", desc:"Why sophomore year is a good, low-pressure time to start.", url:"#"}
        ]
      }
    },

    // ---------- School & Academics view (School Counseling side) ----------
    school: {
      blurb: "Sophomore year is when good habits pay off. Here's the school-side support for this year.",
      order: ["studySkills","academicSupport","forParents"],
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
