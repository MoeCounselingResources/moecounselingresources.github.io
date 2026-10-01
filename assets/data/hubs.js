/* =========================================================================
   HUB DASHBOARDS — the rectangular boxes on each hub's main page.
   • title / desc → what the box says
   • href         → where it goes (a page in this site, or a full https:// link)
   • leads        → the small "where this goes" line under the description
   To add a box, copy one { ... } line and edit it. Order here = order on screen.
   ========================================================================= */

const HUBS = {
  school: {
    title: "School Counseling",
    page: "school-counseling.html",
    blurb: "Support for how you learn and grow at Moeller — study skills, academic help, and resources for families.",
    boxes: [
      {title:"Study Tips & How to Study", desc:"Proven ways to study, take notes, and prepare for tests.", href:"study-tips.html"},
      {title:"Education for Parents", desc:"Guidance and sessions to help families support their students.", href:"parent-education.html"},
      {title:"Academic Support", desc:"Study groups, Chem Block, and the tutors we have in school.", href:"academic-support.html"}
    ],
    classHeading: "Your class",
    classIntro: "Each class page has a School & Academics view with support for that year.",
    cross: {
      heading: "From College Counseling",
      intro: "Planning what comes next works best alongside strong academics.",
      links: [
        {text:"College Counseling hub", href:"college-counseling.html", note:"Applications, exploration, testing, and more"},
        {text:"CCP & AP courses", href:"ccp-ap.html", note:"Earning college credit in high school"},
        {text:"Career Exploration", href:"career-exploration.html", note:"Connecting interests to future paths"}
      ]
    }
  },

  college: {
    title: "College Counseling",
    page: "college-counseling.html",
    blurb: "Everything you need to explore options and plan your path after Moeller, from first ideas to final applications.",
    boxes: [
      {title:"Application Resources", desc:"Checklists, the Common App cheat sheet, deadlines, essays, and fee waivers.", href:"seniors.html"},
      {title:"College Exploration", desc:"Researching schools, campus visits, and building a balanced list.", href:"college-exploration.html"},
      {title:"Military", desc:"Service academies, ROTC, and enlistment pathways.", href:"military.html"},
      {title:"CCP / AP", desc:"Earning college credit while you're still in high school.", href:"ccp-ap.html"},
      {title:"ACT / SAT", desc:"Test dates, prep resources, and how to send your scores.", href:"act-sat.html"},
      {title:"Career Exploration", desc:"Tools for connecting your interests and strengths to future careers.", href:"career-exploration.html"}
    ],
    classHeading: "Class of\u2026",
    hideClassPrograms: true,
    // Weekly newsletter box shown under "Announcements from School Counseling".
    // Update "week" and "items" each week. Each item is {title, text}.
    newsletter: {
      heading: "Announcements from School Counseling",
      week: "Week of October 5 (placeholder)",
      items: [
        {title:"Placeholder: weekly update", text:"Replace this with this week's news from School Counseling."},
        {title:"Placeholder: reminders", text:"Add reminders, deadlines, or shout-outs here."}
      ]
    }
  }
};
