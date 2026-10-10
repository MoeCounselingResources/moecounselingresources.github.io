/* =========================================================================
   JUNIORS — College Knowledge + School & Academics
   This one file feeds the Juniors page in BOTH hubs.
     • Top half of the block (sections)  → the "College Knowledge" view
     • "school:" block at the bottom     → the "School & Academics" view
   Each year: update classOf + label, then refresh the content.
   ========================================================================= */

/* =========================================================================
   JUNIOR KEY DATES AND COLLEGE KNOWLEDGE MEETINGS — UPDATE EVERY SCHOOL YEAR
   These two lists feed the "Junior Timeline" key dates and the "Junior Checklist"
   below. Past dates stay on the page (dimmed) until you change them, so next fall:
     • change each date, its "iso" date (YYYY-MM-DD), and "isoEnd" for a span
     • check the College Knowledge meeting topics and descriptions
   Each key date also shows in the checklist under its "m" month (1 = January).
   Dates below are for the Class of 2028 (2026–27 school year).
   ========================================================================= */
const JUNIOR_KEY_DATES = [
  {date:"Sept. 30", iso:"2026-09-30", m:9, title:"College Fair", detail:"Talk with a wide range of schools in one place. No registration needed."},
  {date:"Oct. 12", iso:"2026-10-12", m:10, title:"PSAT/NMSQT", detail:"Moeller's testing day. It's good SAT practice, and it's the qualifying test for the National Merit Scholarship Program."},
  {date:"Oct. 13", iso:"2026-10-13", m:10, title:"Junior Parent Night", detail:"An evening session for the parents and guardians of juniors."},
  {date:"Jan. – May", iso:"2027-01-01", isoEnd:"2027-05-31", m:1, title:"Junior Family College Planning Meetings", detail:"A one-on-one meeting with your counselor about your college plans. Meetings run from January through May."},
  {date:"February", iso:"2027-02-01", isoEnd:"2027-02-28", m:2, title:"College list building begins", detail:"Start turning what you've learned into a list of schools."},
  {date:"March", iso:"2027-03-01", isoEnd:"2027-03-31", m:3, title:"Request your teacher recommendation", detail:"Fill out the Microsoft Form in College Knowledge and list your top 2 or 3 teachers. You'll receive 1 teacher letter."},
  {date:"Mar. 23", iso:"2027-03-23", m:3, title:"School-day SAT", detail:"Taken at school. You'll fill in your registration information at the February College Knowledge meeting."},
  {date:"April", iso:"2027-04-01", isoEnd:"2027-04-30", m:4, title:"Complete your recommendation questionnaire", detail:"A Microsoft Form that helps your counselor and teacher write your letter."},
  {date:"April", iso:"2027-04-01", isoEnd:"2027-04-30", m:4, title:"Create your Common App account", detail:"Use a personal email address, not your Moeller email."}
];

// College Knowledge class meetings, one per month. "topics" is the official title; "detail" is the student-friendly summary.
const JUNIOR_MEETINGS = [
  {m:9, label:"September", months:[9], topics:"Understanding Fit, College Research & Application Timeline, SCOIR", detail:"Learn what makes a college a good fit for you, how the college search and application timeline work, and how to use SCOIR to keep track of your colleges."},
  {m:10, label:"October", months:[10], topics:"Mock Admissions Activity with Admissions Reps", detail:"Play the admissions committee alongside real admissions representatives and see how applications get read and decisions get made."},
  {m:11, label:"November", months:[11], topics:"The College Search, College Visits & Resume Writing", detail:"Learn how to search for colleges, get more out of a visit, and start a resume that tracks your activities and accomplishments."},
  {m:12, label:"December", months:[12], topics:"Preparing for the ACT & SAT (Compass Education presentation)", detail:"A presentation from Compass Education on how the ACT and SAT work and how to prepare for them."},
  {m:1, label:"January", months:[1], topics:"Course Registration & Exploring College Majors", detail:"Sign up for next year's courses and start exploring majors that match your interests."},
  {m:2, label:"February", months:[2], topics:"College Research & List Building, Teacher Recommendations; Financial Aid presentation; SAT pre-administration for the March 23 SAT", detail:"Start building your college list, learn how teacher recommendations work, and hear an introduction to financial aid. You'll also fill in your registration information for the March 23 SAT."},
  {m:3, label:"March", months:[3], topics:"The College Essay Panel", detail:"Hear a panel talk about the college essay and how to approach writing yours."},
  {m:4, label:"April", months:[4,5,6,7,8], topics:"The College Application", detail:"Walk through what a college application includes and how the pieces fit together."}
];

YEARS.junior = {
    classOf: "2028",
    tabLabel: "Junior",
    label: "Class of 2028",
    stage: "Juniors",
    blurb: "This year is about understanding the process and building your list, not finishing it. By spring, you'll start your Common App essay ahead of applying next fall.",
    collegeLabel: "College Knowledge",
    // Junior/sophomore/freshman: set layout to "indexed" for a left-side index, or delete it for stacked sections.
    layout: "indexed",
    order: ["research","exploration","essays","essayGuides","juniorChecklist","timeline","testing","financialAid","military"],
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
          {title:"Building a balanced college list", desc:"What \"reach, target (match), and likely (safety)\" actually mean, and how to start sorting the schools you're curious about into them.", url:"https://bigfuture.collegeboard.org/help-center/how-do-you-find-reach-match-and-safety-colleges", bullets:[
            {text:"Browse the three school lists", url:"#exploration"},
            {text:"See test ranges on Moeller Popular Colleges", url:"popular-colleges.html"}
          ]},
          {title:"Getting the most from a campus visit", desc:"What to look for beyond the tour, whether you visit in person or virtually. Spring and summer are good times to start.", url:"https://bigfuture.collegeboard.org/plan-for-college/find-your-fit/campus-visits-and-tours", bullets:[
            {text:"Campus Visit Checklist", url:"https://bigfuture.collegeboard.org/plan-for-college/find-your-fit/campus-visit-checklist", after:" from BigFuture"}
          ]},
          {title:"Comparing majors & programs", desc:"Look up what a school actually offers, not just its ranking. You don't have to pick a major yet, since many colleges let you decide later.", url:"https://nces.ed.gov/collegenavigator/", bullets:[
            {text:"BigFuture Majors Directory", url:"https://bigfuture.collegeboard.org/explore-careers/majors"}
          ]},
          {title:"IPEDS Find Your College", desc:"The U.S. Department of Education's free tools for looking up a college's size, programs, costs, and graduation rates.", url:"https://nces.ed.gov/ipeds/find-your-college/"},
          {title:"Moeller Popular Colleges", desc:"Test ranges, deadlines, and requirements for the schools Moeller students apply to most.", url:"popular-colleges.html"}
        ]
      },
      essays: {
        navLabel: "Essay Writing",
        title: "Essay writing resources",
        note: "Starting to think ahead",
        desc: "You don't need a draft yet — these are for getting familiar with what's coming.",
        items: [
          {title:"This year's Common App prompts", desc:"An early look at the seven prompts you'll choose from next fall. Your essay will be 250 to 650 words. Common App usually keeps the prompts the same from year to year, so this year's set is a good preview.", url:"seniors.html#essayPrompts", bullets:[
            {text:"Common App's official prompt page", url:"https://www.commonapp.org/apply/essay-prompts/"}
          ]},
          {title:"Brainstorming your story", desc:"Exercises for finding a topic before junior spring, without pressure. Answer a few questions, collect your ideas, and bring them to your counselor or English teacher. This is brainstorming, not writing.", url:"seniors.html#essayBrainstorm", bullets:[
            {text:"Common App First-Year Toolkit", url:"https://www.commonapp.org/apply/fy-toolkit/"}
          ]},
          {title:"Why starting a draft in spring matters", desc:"A head start in spring means a calmer senior fall. Start your Common App essay this spring, then tackle supplements in the summer.", url:"seniors.html#writingGuide", bullets:[
            {text:"Supplemental Essay Guides", url:"#essayGuides"}
          ]}
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
      juniorChecklist: {
        navLabel: "Junior Checklist",
        title: "Junior Year Checklist",
        note: "Check items off as you go",
        desc: "Your College Knowledge class meetings and key dates, month by month. Checking a box just marks it for you in this browser. It won't affect anyone else's view.",
        type: "checklist",
        groups: JUNIOR_MEETINGS.map(mt => ({
          label: mt.label,
          months: mt.months,
          items: [{text: "College Knowledge class meeting: " + mt.topics, detail: mt.detail}].concat(
            JUNIOR_KEY_DATES.filter(d => d.m === mt.m).map(d => ({text: d.title + " (" + d.date + ")", detail: d.detail})))
        }))
      },
      timeline: {
        navLabel: "Junior Timeline",
        title: "Application timeline & checklists",
        note: "Junior year",
        desc: "A month-by-month view of what matters this year.",
        timeline: JUNIOR_KEY_DATES,
        stacked: true,
        items: [
          {title:"Junior year planning checklist", desc:"Month-by-month steps for your College Knowledge class meetings and key dates, with checkboxes that save on your device.", url:"#juniorChecklist", bullets:[
            {text:"11th Grade College and Career Planning Checklist", url:"https://bigfuture.collegeboard.org/checklist", after:" from BigFuture"}
          ]},
          {title:"PSAT/NMSQT", desc:"The PSAT/NMSQT is a practice version of the SAT and the qualifying test for the National Merit Scholarship Program. Most students take it once, in junior year, and only junior-year scores count for National Merit. Moeller's testing day is listed in the key dates above.", url:"https://satsuite.collegeboard.org/in-school-assessments/scholarships-recognition/national-merit-scholarship-program", bullets:[
            {text:"PSAT/NMSQT FAQ", url:"https://bigfuture.collegeboard.org/plan-for-college/stand-out-in-high-school/faq-psat-nmsqt", after:" from BigFuture"}
          ]},
          {title:"Setting up your Common App account", desc:"You'll create your Common App account in April of junior year. Use a personal email address, not your Moeller email. School filters can block emails from colleges, and you lose access to your Moeller email after you graduate. Don't match your Common App to SCOIR yet. You'll do that, and waive FERPA, at a group meeting at the start of senior year.", url:"https://www.commonapp.org/apply/first-year-students/", bullets:[
            {text:"Create your Common App account", url:"https://apply.commonapp.org/createaccount"},
            {text:"See how seniors set up Common App & SCOIR", url:"seniors.html#moreEssentials"}
          ]},
          {title:"Requesting letters of recommendation", desc:"In March, you'll fill out a Microsoft Form in College Knowledge listing your top 2 or 3 teachers, and you'll receive 1 teacher letter. In April, you'll complete a recommendation questionnaire, also a Microsoft Form, that helps your counselor and teacher write your letter. Teachers who know you well, ideally from junior year, write the strongest letters.", url:"https://bigfuture.collegeboard.org/plan-for-college/apply-to-college/application-process/how-to-get-a-great-letter-of-recommendation", bullets:[
            {text:"Common App: the first-year recommendation process", url:"https://www.commonapp.org/static/088c92645a5827f61016fd81ac42b3f4/Resource_FY_RecProcess_ENG_2025.06.25_1.pdf", after:" (PDF)"},
            {text:"Common App: teacher brag sheet", url:"https://www.commonapp.org/static/7bc36ad35601e024c5ba48dcef1292e2/Resource_FY_TeacherBragSheet_ENG_2025.06.25_1.pdf", after:" (PDF)"},
            {text:"How seniors sign FERPA and add recommenders", url:"seniors.html#moreEssentials"}
          ]}
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
