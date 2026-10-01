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
  order: ["research","visits","list"],
  sections: {
    research: placeholderSection("Researching colleges", "Tools for comparing schools, majors, and costs."),
    visits: placeholderSection("Campus & rep visits", "Getting the most from a visit, in person or virtual."),
    list: placeholderSection("Building your list", "Reach, target, and likely schools, and how to balance them.")
  }
};

YEARS["military"] = {
  hub: "college",
  label: "Military",
  blurb: "Service academies, ROTC scholarships, and enlistment pathways.",
  order: ["academies","rotc","enlistment"],
  sections: {
    academies: placeholderSection("Service academies", "Nomination timelines and application steps."),
    rotc: placeholderSection("ROTC", "ROTC scholarships and programs by branch."),
    enlistment: placeholderSection("Enlistment & ASVAB", "Talking with recruiters and preparing for the ASVAB.")
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
  order: ["dates","prep","scores"],
  sections: {
    dates: placeholderSection("Test dates & registration", "This year's ACT and SAT calendar."),
    prep: placeholderSection("Test prep", "Free and low-cost ways to prepare."),
    scores: placeholderSection("Sending scores", "How to send official scores, and test-optional decisions.")
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
