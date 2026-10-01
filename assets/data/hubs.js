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
      {title:"Application Resources", desc:"Checklists, the Common App cheat sheet, deadlines, essays, and fee waivers.", href:"seniors.html", leads:"Opens the Seniors page"},
      {title:"College Exploration", desc:"Researching schools, campus visits, and building a balanced list.", href:"college-exploration.html"},
      {title:"Military", desc:"Service academies, ROTC, and enlistment pathways.", href:"military.html"},
      {title:"CCP / AP", desc:"Earning college credit while you're still in high school.", href:"ccp-ap.html"},
      {title:"ACT / SAT", desc:"Test dates, prep resources, and how to send your scores.", href:"act-sat.html"},
      {title:"Career Exploration", desc:"Tools for connecting your interests and strengths to future careers.", href:"career-exploration.html"}
    ],
    classHeading: "Your class",
    classIntro: "Each class page has a college view built for where you are in the process.",
    cross: {
      heading: "From School Counseling",
      intro: "Strong study habits and support make every step of college planning easier.",
      links: [
        {text:"School Counseling hub", href:"school-counseling.html", note:"Study skills, academic support, parent education"},
        {text:"Academic Support", href:"academic-support.html", note:"Study groups, Chem Block, tutors"},
        {text:"Study Tips & How to Study", href:"study-tips.html", note:"Getting the grades that open doors"}
      ]
    }
  }
};
