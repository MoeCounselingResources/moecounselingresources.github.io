/* =========================================================================
   SHARED CONTENT — used on every page. Edit once here.
     • COUNSELORS      → "Your Counseling Team" panel
     • ANNOUNCEMENTS   → "Upcoming Events" box
     • MODALS          → pop-ups (STARS list, Courses & Grades list)
     • COMMON_APP_GUIDE_STEPS → the step-through Common App guide
   ========================================================================= */

// Every page's content registers itself in here (grade pages and topic pages).
const YEARS = {};

// Small custom icon set used by mini-guides below (plain SVG line icons — no screenshots).
const STEP_ICONS = {
  login: '<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/>',
  checklist: '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
  profile: '<circle cx="12" cy="7" r="4"/><path d="M5.5 21a6.5 6.5 0 0 1 13 0"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  pen: '<path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>'
};

// Queue used to wire up mini-guide steppers right after their HTML is inserted.
let PENDING_MINI_GUIDES = [];

// Shared Common App How-To Guide data — used on both the Common App Cheat
// Sheet page and the Common App FAQs page (same steps, no duplication).
const COMMON_APP_GUIDE_STEPS = {
        "title": "Common App How-To Guide",
        "subtitle": "Step through each section of the Common App, in order, with a real screenshot alongside what to enter.",
        "steps": [
                {
                        "title": "Dashboard",
                        "image": "assets/img/common-app-step-01.png",
                        "body": "The Dashboard is where you monitor your Common Application and My Colleges \u2014 deadlines, requirements, and progress all in one place. The menu on the left takes you to every part of the application, and Help & Support is on the right if you need it."
                },
                {
                        "title": "My Common Application",
                        "image": "assets/img/common-app-step-02.png",
                        "body": "Clicking \u201cMy Common Application\u201d shows every section you need to complete \u2014 these are shared with each school you apply to through the Common App. A green check mark means a section is done."
                },
                {
                        "title": "Profile",
                        "image": "assets/img/common-app-step-03.png",
                        "bullets": [
                                "Personal Information: make sure your first and last name match your official documents (birth certificate, College Board/ACT account) \u2014 mismatches can cause problems matching your application to other materials.",
                                "Address: use the permanent home address where you want to receive mailings from colleges.",
                                "Contact details: use the phone number where colleges can best reach you about missing materials.",
                                "Demographics: optional \u2014 answer as you see fit.",
                                "Language: if you speak a language other than English at home, note your proficiency and check the right boxes.",
                                "Geography and Nationality: note any time spent living outside the U.S. here. U.S. citizens must enter their Social Security Number if planning to file the FAFSA.",
                                "Common App Fee Waiver: talk to your counselor directly if you think you qualify."
                        ]
                },
                {
                        "title": "Family",
                        "image": "assets/img/common-app-step-04.png",
                        "bullets": [
                                "You may need to check with your parent(s)/guardian(s) for some of these answers.",
                                "Household: answer the required questions.",
                                "Parent 1 / Parent 2 (if applicable): enter their information.",
                                "Sibling: enter info for each; more than five siblings go in \u201cAdditional Information.\u201d"
                        ]
                },
                {
                        "title": "Education",
                        "image": "assets/img/common-app-step-05.png",
                        "bullets": [
                                "Current or most recent secondary school: Archbishop Moeller (CEEB Code: 361033).",
                                "Date of entry: August 2023. Graduation date: May 2027.",
                                "Check \u201cNo change in progression\u201d unless something applies to you.",
                                "Other Secondary/High Schools: select \u201c0\u201d if you've been at Moeller since freshman year; otherwise fill in transfer info.",
                                "Colleges & Universities: answer YES if you've taken a CCP class for UC credit or any summer college-credit course (APs don't count) \u2014 this prompts colleges to look for a college transcript.",
                                "Grades: graduating class size 208. Class rank reporting = None. GPA Scale Reporting = 4. Report your WEIGHTED GPA exactly as it appears on your transcript (not the unweighted one). GPA weighting = Weighted.",
                                "Current/Most Recent Year Courses: scheduling system = Semester. List course titles exactly as on your transcript. Mark a course \u201cCollege Prep\u201d unless it's labeled Honors, CCP, or AP (CCP = Dual Enrollment).",
                                "Honors: list up to five academic awards or Honor Roll quarters here (some students put Honor Societies here too, to save room in Activities).",
                                "Community-Based Organizations: enter \u201c0\u201d unless you're working with a group like Jack Kent Cooke, ABC, or POSSE.",
                                "Future Plans: select \u201cApplying as a first-year student, plan to start college in 2027,\u201d your intended highest degree, and a career interest if you have one (\u201cUndecided\u201d is at the bottom)."
                        ]
                },
                {
                        "title": "Testing",
                        "image": "assets/img/common-app-step-06.png",
                        "bullets": [
                                "Self-report SAT, ACT, and/or AP scores here if you'd like.",
                                "Report any AP score of 4 or 5.",
                                "Not sure about reporting scores for a test-optional school? Talk with your counselor.",
                                "Select each test you want to report, then enter the scores \u2014 double check against your official score report.",
                                "Remember: it's the student's responsibility to send official scores to schools that require them (through your ACT or College Board account). Not every school accepts self-reported scores."
                        ]
                },
                {
                        "title": "Activities",
                        "image": "assets/img/common-app-step-07.png",
                        "bullets": [
                                "Mark that you want to report activities, then list up to 10.",
                                "List the ones you value most at the top.",
                                "150 characters for the description \u2014 describe what YOU accomplished.",
                                "50 characters for Position/Leadership, 100 for the Organization name \u2014 use the space wisely.",
                                "Use your best estimate for time spent during the busiest part of the year.",
                                "Be consistent with capitalization, punctuation, and style throughout.",
                                "More than 10 activities can go in \u201cAdditional Information.\u201d",
                                "Responsibilities and Circumstances: check whatever boxes apply to your experience."
                        ]
                },
                {
                        "title": "Writing",
                        "image": "assets/img/common-app-step-08.png",
                        "bullets": [
                                "Personal essay: check \u201cI understand\u201d that it may be sent to colleges even where not required.",
                                "Select a prompt, then paste your essay in \u2014 scroll down to confirm the whole thing made it into the box.",
                                "You can edit between submissions, but it's not recommended \u2014 it can introduce errors.",
                                "Additional Information: use sparingly, and only to explain something that doesn't fit elsewhere (scheduling issues, learning differences, health info) \u2014 not a second essay."
                        ]
                },
                {
                        "title": "Courses & Grades \u2014 getting started",
                        "image": "assets/img/common-app-step-09.png",
                        "bullets": [
                                "Not every school requires this section \u2014 Common App will only let you fill it out if at least one school on your list needs it.",
                                "Have a copy of your transcript handy before you start; this section takes time.",
                                "Select \u201cYes\u201d for \u201cI can access a copy of my official transcript,\u201d then click Continue."
                        ]
                },
                {
                        "title": "Courses & Grades \u2014 entering courses",
                        "image": "assets/img/common-app-step-10.png",
                        "bullets": [
                                "Click \u201cAdd 9th grade\u201d (then 10th, then 11th) and enter every course, grade, and credit exactly as it appears on your transcript.",
                                "School Year: 9th = 2023\u20132024, 10th = 2024\u20132025, 11th = 2025\u20132026. For 12th grade, select \u201cNo.\u201d",
                                "Select the subject that best matches each course, and write the full course name as it appears on your transcript.",
                                "Mark a course \u201cCollege Prep\u201d unless it's labeled Honors, Advanced, AP, or CCP (CCP = Dual Enrollment).",
                                "Semester classes: enter credits as \u201c0.5.\u201d"
                        ]
                },
                {
                        "title": "My Colleges",
                        "image": "assets/img/common-app-step-11.png",
                        "body": "\u201cMy Colleges\u201d is where you'll complete school-specific questions for each college you plan to apply to \u2014 available starting August 1."
                },
                {
                        "title": "College Search",
                        "image": "assets/img/common-app-step-12.png",
                        "bullets": [
                                "Use \u201cCollege Search\u201d (the magnifying glass icon) to find a school by name or city.",
                                "Use \u201cMore filters\u201d to search by specific criteria instead."
                        ]
                },
                {
                        "title": "Adding a college",
                        "image": "assets/img/common-app-step-13.png",
                        "body": "Results populate as you type. Click the blue \u201cAdd\u201d button next to a school to add it to My Colleges."
                },
                {
                        "title": "College Information",
                        "image": "assets/img/common-app-step-14.png",
                        "body": "Once a college is added, review its \u201cCollege Information\u201d section for deadlines and important details \u2014 plus its Application, Recommenders & FERPA, and Review & Submit steps, and a separate Writing Supplement section if the school has one."
                },
                {
                        "title": "Application",
                        "image": "assets/img/common-app-step-15.png",
                        "body": "This section is specific to each college \u2014 even similar-looking questions go directly to that school, so answer thoroughly and accurately every time. Watch closely: some colleges hide an extra writing supplement in here."
                },
                {
                        "title": "FERPA release authorization",
                        "image": "assets/img/common-app-step-16.png",
                        "body": "Click \u201cRelease Authorization,\u201d read the explanation, and check the box confirming you've read it. Continue, authorize every school to receive materials, then choose whether to waive your right to review recommendations \u2014 this cannot be changed once you sign, so get it right the first time."
                },
                {
                        "title": "Recommenders and FERPA",
                        "image": "assets/img/common-app-step-17.png",
                        "bullets": [
                                "Invite Recommenders: Moeller sends teacher and counselor letters through SCOIR \u2014 do NOT enter Moeller teacher or counselor emails in this section.",
                                "Other recommenders: only use this for a non-Moeller letter (coach, instructor, boss, etc.).",
                                "Advisor: add anyone you want to be able to review your application (parent, outside college counselor, trusted friend)."
                        ]
                },
                {
                        "title": "Review and Submit",
                        "body": "Complete every section before you can review it here. Check carefully for errors \u2014 you'll also be prompted to pay, so have a credit card ready. Once it's in: congratulations, you're done!"
                }
        ]
};

// Shared across every year — edit once.
// Pop-up modals, triggered anywhere on the page via a button with
// data-modal="<key>". Add a new key here to create a new pop-up.
const MODALS = {
  starsModal: {
    title: "What is STARS?",
    intro: "STARS (Self-Reported Transcript & Academic Record System) lets you self-report your grades and courses directly in an application instead of Moeller sending an official transcript for that step. Some schools require it, some highly encourage it — search your schools below to check.",
    searchPlaceholder: "Search for a college or university…",
    schools: [
      {name: "Baylor University", status: "encouraged"},
      {name: "Clemson University", status: "required"},
      {name: "Duquesne University", status: "encouraged"},
      {name: "Florida A&M University", status: "encouraged"},
      {name: "Florida Atlantic University", status: "required"},
      {name: "Florida Polytechnic University", status: "encouraged"},
      {name: "Florida State University", status: "required"},
      {name: "Kean University", status: "encouraged"},
      {name: "Louisiana State University", status: "encouraged"},
      {name: "Montclair State University", status: "encouraged"},
      {name: "New College of Florida", status: "encouraged"},
      {name: "New York University", status: "required"},
      {name: "Rutgers University", status: "required"},
      {name: "State University of New York - Buffalo", status: "encouraged"},
      {name: "Temple University", status: "required"},
      {name: "Texas A&M University", status: "required"},
      {name: "The Pennsylvania State University", status: "required"},
      {name: "United States Air Force Academy", status: "required"},
      {name: "University of Connecticut", status: "required"},
      {name: "University of Delaware", status: "required"},
      {name: "University of Florida", status: "required"},
      {name: "University of Massachusetts - Amherst", status: "encouraged"},
      {name: "University of Minnesota", status: "encouraged"},
      {name: "University of New Hampshire", status: "encouraged"},
      {name: "University of North Florida", status: "required"},
      {name: "University of Oregon", status: "required"},
      {name: "University of Pittsburgh", status: "required"},
      {name: "University of Rhode Island", status: "required"},
      {name: "University of South Florida", status: "required"},
      {name: "University of Tampa", status: "encouraged"},
      {name: "University of Tennessee", status: "required"},
      {name: "University of Texas - Arlington", status: "required"},
      {name: "University of Texas - San Antonio", status: "encouraged"},
      {name: "University of West Florida", status: "required"},
      {name: "Virginia Tech", status: "required"}
    ]
  },
  coursesGradesModal: {
    title: "Colleges & Universities That Require Courses & Grades Reports on Common App",
    intro: "These Fall 2026 schools require the Courses & Grades section of the Common App — where you self-report every course, grade, and credit from your transcript, one grade level at a time. Search your schools below to check.",
    searchPlaceholder: "Search for a college or university…",
    schools: [
      {name: "Allen University (SC)", status: "required"},
      {name: "Amherst College (MA)", status: "required"},
      {name: "Andrews University (IN)", status: "required"},
      {name: "Arizona State University", status: "required"},
      {name: "Ave Maria University (FL)", status: "required"},
      {name: "Baker College (MI)", status: "required"},
      {name: "Bethel University (TN)", status: "required"},
      {name: "Brescia University (KY)", status: "required"},
      {name: "Carl Sandburg College (IL)", status: "required"},
      {name: "Carnegie Mellon University (PA)", status: "required"},
      {name: "East Texas Baptist University", status: "required"},
      {name: "Elizabeth City State University (NC)", status: "required"},
      {name: "Eureka College (IL)", status: "required"},
      {name: "Goshen College (IN)", status: "required"},
      {name: "Hampton University (VA)", status: "required"},
      {name: "Jack Kent Cooke Foundation", status: "required"},
      {name: "Kettering University (MI)", status: "required"},
      {name: "Life University (GA)", status: "required"},
      {name: "Lincoln University of Pennsylvania", status: "required"},
      {name: "List College of JTSA (NY)", status: "required"},
      {name: "Loyola Marymount University (CA)", status: "required"},
      {name: "Manor College (PA)", status: "required"},
      {name: "McDaniel College (MD)", status: "required"},
      {name: "McKendree University (IL)", status: "required"},
      {name: "Methodist University (NC)", status: "required"},
      {name: "Midway University (KY)", status: "required"},
      {name: "Milligan University (TN)", status: "required"},
      {name: "Milwaukee Inst of Art/Design (WI)", status: "required"},
      {name: "Minerva University (CA)", status: "required"},
      {name: "Minneapolis College of Art/Design (MN)", status: "required"},
      {name: "Mississippi Valley State University (MS)", status: "required"},
      {name: "Montreat College (NC)", status: "required"},
      {name: "Morehouse College (GA)", status: "required"},
      {name: "Newberry College (SC)", status: "required"},
      {name: "North American University (TX)", status: "required"},
      {name: "Northern Arizona University", status: "required"},
      {name: "Oklahoma Baptist University", status: "required"},
      {name: "Oregon Tech", status: "required"},
      {name: "Prescott College (AZ)", status: "required"},
      {name: "Purdue University (IN)", status: "required"},
      {name: "Reinhardt University (GA)", status: "required"},
      {name: "Ripon College (WI)", status: "required"},
      {name: "Saint John’s College (MD)", status: "required"},
      {name: "Saint Vincent College (PA)", status: "required"},
      {name: "Sattler College (MA)", status: "required"},
      {name: "South Carolina State University", status: "required"},
      {name: "Springfield University (MA)", status: "required"},
      {name: "Stanford University (CA)", status: "required"},
      {name: "Sweet Briar College (VA)", status: "required"},
      {name: "University of Alaska Fairbanks", status: "required"},
      {name: "University of Arizona", status: "required"},
      {name: "University of Charleston (WV)", status: "required"},
      {name: "University of Minnesota Twin Cities", status: "required"},
      {name: "University of Missouri Kansas City", status: "required"},
      {name: "University of New Mexico", status: "required"},
      {name: "University of Oregon", status: "required"},
      {name: "University of Washington (Seattle, Tacoma)", status: "required"},
      {name: "University of Wisconsin (Madison)", status: "required"},
      {name: "Xavier University of Louisiana", status: "required"}
    ]
  }
};

const COUNSELORS = [
  {role:"College Counseling Program Director", name:"Angela Davies", email:"adavies@moeller.org", crest:"assets/img/crest-college-director.png"},
  {role:"Counseling Administrative Assistant, Testing Coordinator", name:"Ann Niehaus", email:"aniehaus@moeller.org", crest:"assets/img/crest-admin-assistant.png"},
  {role:"Director of Happiness", name:"Sidon", crest:"assets/img/crest-sidon.png", moreInfo:"sidon.html"},
  {role:"Eveslage House", name:"Jessica Fager", email:"jfager@moeller.org", crest:"assets/img/crest-eveslage.png"},
  {role:"Pillar House", name:"Allison Oakley", email:"aoakley@moeller.org", crest:"assets/img/crest-pillar.png"},
  {role:"Quiroga House", name:"Catherine Allen", email:"callen@moeller.org", crest:"assets/img/crest-quiroga.png"},
  {role:"Trinity House", name:"Thomas Hertlein", email:"thertlein@moeller.org", crest:"assets/img/crest-trinity.png"},
  {role:"Zaragoza House", name:"Colleen Murray", email:"cmurray@moeller.org", crest:"assets/img/crest-zaragoza.png"},
  {role:"Zehler House", name:"Kristen Merica", email:"kmerica@moeller.org", crest:"assets/img/crest-zehler.png"}
];

// College rep visits are NOT listed here. They load from assets/data/rep-visits.js,
// which a weekly GitHub Action rebuilds from the Outlook rep-visits calendar.
// Upcoming Events — shown at the top of every tab.
// Each one is its OWN individual event: a "date" (YYYY-MM-DD, shown in the
// badge), a headline, and a body sentence or two. "expires" is the last day
// it's still relevant — for a one-day event this is the same as "date"; for
// something that runs several days (like a conference) set it to the last
// day. Once "expires" passes, the entry disappears automatically — no
// manual cleanup needed. Add new events at the bottom any time; order
// doesn't matter, they're always shown soonest-first.
const ANNOUNCEMENTS = [
  {
    date: "2026-09-30", expires: "2026-09-30",
    title: "College Fair",
    body: "Gym, M-Block — 45 colleges in one place. No registration needed."
  },
  {
    date: "2026-10-02", expires: "2026-10-02",
    title: "Teacher Letters of Recommendation Due",
    body: "Due to Counseling today."
  },
  {
    date: "2026-10-06", expires: "2026-10-06",
    title: "Junior Mental Health Session",
    body: "11th grade, M-Block, by house."
  },
  {
    date: "2026-10-08", expires: "2026-10-08",
    title: "College Application Office Hours",
    body: "Drop-in help with your applications, M-Block."
  },
  {
    date: "2026-10-08", expires: "2026-10-10",
    title: "NACAC National Conference",
    body: "Your counselors are attending in Minneapolis, MN, through Oct. 10."
  },
  {
    date: "2026-10-12", expires: "2026-10-12",
    title: "College Application Office Hours",
    body: "Drop-in help with your applications, M-Block."
  },
  {
    date: "2026-10-13", expires: "2026-10-13",
    title: "Junior Parent Night",
    body: "An evening session for parents of juniors on the college process ahead."
  },
  {
    date: "2026-10-14", expires: "2026-10-14",
    title: "Testing Day",
    body: "A schoolwide testing day — check with your teachers for your schedule."
  },
  {
    date: "2026-10-15", expires: "2026-10-15",
    title: "Application Deadline Wave",
    body: "Clemson, South Carolina, UNC, UGA, UT Austin, and more are due today."
  },
  {
    date: "2026-10-18", expires: "2026-10-18",
    title: "Cincinnati National College Fair",
    body: "A citywide fair with a wide range of colleges — no registration needed."
  },
  {
    date: "2026-10-19", expires: "2026-10-19",
    title: "College Knowledge Session #2",
    body: "M-Block, by house."
  },
  {
    date: "2026-10-26", expires: "2026-10-26",
    title: "College Application Office Hours",
    body: "Drop-in help with your applications, M-Block."
  },
  {
    date: "2026-11-01", expires: "2026-11-01",
    title: "Application Deadline Wave",
    body: "UC, OSU, Miami, UD, and many others are due today."
  }
];
