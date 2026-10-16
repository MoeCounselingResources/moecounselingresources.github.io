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
    blurb: "With a best-in-class student to counselor ratio, the young men of Moeller build genuine relationships with their counselors over their four-year education journey. Moeller’s counseling program delivers holistic, individualized, data-driven counseling activities and interventions to support students in their social and emotional development, academic growth, and college and career planning. Counselors provide support for students who need help adjusting to high school, seek mental and emotional support, need strategies for managing stress, struggle with anxiety and depression, and/or experience sudden life changes.",
    cardBlurb: "Support for how you learn and grow at Moeller — study skills, academic help, and resources for families.",
    design: "cards",   // draws the School Counseling cards with the grade selector (assets/js/school-hub.js)
    // grades = which grades the card is most relevant to (shown as the small 9/10/11/12 tags and used by the grade selector).
    // accent = sky, gold, or navy (one color per card). icon = a name from assets/js/school-hub.js.
    boxes: [
      {title:"Self-Discovery", desc:"Private exercises on your values, your roles, and your goals.", href:"self-discovery.html", grades:[9,10,11,12], accent:"sky", icon:"compass"},
      {title:"How to Learn", desc:"Short, research-checked lessons on memory, focus, and sleep.", href:"how-to-learn.html", grades:[9,10,11,12], accent:"gold", icon:"brain"},
      {title:"Course Planner", desc:"Map out all four years and track your graduation requirements.", href:"course-planner.html", grades:[9,10,11,12], accent:"navy", icon:"map"},
      {title:"Explore courses and pathways", desc:"See how courses connect and what a four-year path can look like.", href:"course-maps.html", grades:[9,10,11,12], accent:"gold", icon:"web"},
      {title:"GPA Calculator", desc:"Figure your GPA and see where you stand for Latin Honors.", href:"gpa-calculator.html", grades:[9,10,11,12], accent:"sky", icon:"calc"},
      {title:"Honor Roll Calculator", desc:"Check whether your quarter grades earn First or Second Honors.", href:"honor-roll.html", grades:[9,10,11,12], accent:"gold", icon:"star"},
      {title:"Academic Support", desc:"Study groups, Chem Block, and tutoring in school.", href:"academic-support.html", grades:[9,10,11,12], accent:"navy", icon:"people"},
      {title:"Education for Parents", desc:"Guidance and sessions to help families support their students.", href:"parent-education.html", grades:[9,10,11,12], accent:"sky", icon:"home"}
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
    blurb: "Moeller offers a comprehensive college counseling program designed to guide students towards their academic and career goals. College and career planning begins as early as freshman year, providing students ample time to explore options and make informed decisions. Students participate in assessments and discussions to identify potential career paths that align with their interests and strengths. Counselors provide individual, small group, and classroom counseling sessions to assist students with college research, application processes, and essay writing. Counselors also meet with students and their families to generate college lists and discuss application best practices.",
    cardBlurb: "Everything you need to explore options and plan your path after Moeller, from first ideas to final applications.",
    boxes: [
      {title:"Application Resources", desc:"Checklists, the Common App cheat sheet, deadlines, essays, and fee waivers.", href:"seniors.html"},
      {title:"Moeller Popular Colleges", desc:"Test ranges, deadlines, and requirements for the schools Moeller students apply to most.", href:"popular-colleges.html"},
      {title:"Application Tracker", desc:"Track your colleges, deadlines, essays, and activities. Saves on your device.", href:"app-tracker.html"},
      {title:"Financial Aid", desc:"How aid works, the FAFSA and CSS Profile step by step, scholarships, and comparing award letters.", href:"financial-aid.html"},
      {title:"College Exploration", desc:"Researching schools, campus visits, and building a balanced list.", href:"college-exploration.html"},
      {title:"Military Options", desc:"Service academies, senior military colleges, and ROTC.", href:"military.html"},
      {title:"CCP / AP", desc:"Earning college credit while you're still in high school.", href:"ccp-ap.html"},
      {title:"ACT / SAT", desc:"Test dates, prep resources, and how to send your scores.", href:"act-sat.html"},
      {title:"Career Exploration", desc:"Tools for connecting your interests and strengths to future careers.", href:"career-exploration.html"},
      {title:"Essays", desc:"Common App prompts, a brainstorming tool, a writing guide, and supplemental essay guides for every grade.", href:"essays.html"},
      {title:"Know Yourself", desc:"Four short exercises on your roles, what you love, your values, and what fires you up. They feed your essays and your college list.", href:"know-yourself.html"},
      {title:"Using AI in Your College Process", desc:"What AI can and can't do for you, plus copy-and-paste prompts for every grade.", href:"ai.html"},
      {title:"Opportunities Board", desc:"College fairs, programs, career exploration, and jobs shared with Moeller counseling.", href:"opportunities.html"}
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
