/* =========================================================================
   MOELLER POPULAR COLLEGES — data for the Popular Colleges page and the
   App Tracker's "add a college" autofill.
   Source: Moeller_Popular_Colleges_Spreadsheet.xlsx ("Top Schools" tab).

   To update for a new year: change DATA_CYCLE, then edit any school below.
   • act / sat: {low, high, label} — the middle 50% range. Use null if none.
   • testingPolicy: "Required", "Expected", "Optional", or "Optional*"
     (* = optional with conditions; explain in testingPolicyFull)
   • useMyRanges: true  → keep THIS school's act/sat ranges below (e.g. non-resident
     ranges). The yearly College Scorecard update will never replace them.
   • shortName (optional): how the school's name reads in the Seniors deadline notices
     (default: "University of" / "University" trimmed, e.g. "Michigan").
   • cssProfile: "Yes" if the school requires the CSS Profile for its own aid, else "No".
     Check once a year against College Board's list (it can't be pulled automatically):
     https://profile.collegeboard.org/PPI/participatingInstitutions.aspx
     Last checked October 2026 (Notre Dame and Michigan confirmed on their own aid sites).
   • plans: any of "Early Action", "Early Decision",
     "Restrictive Early Action", "Rolling", "Priority Deadline"
   ========================================================================= */

const POPULAR_COLLEGES_CYCLE = "2025–26 application cycle";

/* Schools that show on the Popular Colleges page only because their ACT/SAT ranges are
   tracked (scripts/tracked-colleges.json), with no entry below. List the ones that use the
   CSS Profile here so the "Uses CSS Profile" filter includes them; any not listed show "No".
   Check once a year against College Board's participating list. Last checked October 2026. */
const CSS_PROFILE_RANGE_ONLY = [
  "Brown University", "Case Western Reserve University", "Columbia University",
  "Cornell University", "Dartmouth College", "Harvard University", "Princeton University",
  "University of North Carolina at Chapel Hill", "University of Pennsylvania",
  "University of Virginia", "Yale University"
];

const POPULAR_COLLEGES = [
  {
    "name": "Auburn University",
    "useMyRanges": true,
    "earlyType": "4 EA Rounds - Earlier the better!",
    "plans": [
      "Early Action"
    ],
    "earlyDeadline": "Sept 15, Oct 15, Nov 15, Dec 1",
    "regularDeadline": "Feb 1",
    "stars": "No",
    "cssProfile": "No",
    "additional": "",
    "act": {
      "low": 28,
      "high": 32,
      "label": "28-32 Non-Resident",
      "nonResident": true
    },
    "sat": {
      "low": 1280,
      "high": 1380,
      "label": "1280-1380 Non-Resident",
      "nonResident": true
    },
    "testingNotes": "",
    "testingPolicyFull": "Testing required",
    "testingPolicy": "Required",
    "officialScores": "Yes",
    "superscore": "Yes",
    "notes": "",
    "link": "https://www.auburn.edu/admissions/prospective-students/freshmen/index.php"
  },
  {
    "name": "Bowling Green State University",
    "earlyType": "Rolling",
    "plans": [
      "Rolling"
    ],
    "earlyDeadline": "",
    "regularDeadline": "Mar 1",
    "stars": "No",
    "cssProfile": "No",
    "additional": "",
    "act": null,
    "sat": null,
    "testingNotes": "",
    "testingPolicyFull": "Test Optional",
    "testingPolicy": "Optional",
    "officialScores": "Yes",
    "superscore": "Yes",
    "notes": "",
    "link": "https://www.bgsu.edu/admissions/apply-now/freshmen.html"
  },
  {
    "name": "Clemson University",
    "earlyType": "Early Action",
    "plans": [
      "Early Action"
    ],
    "earlyDeadline": "Oct 15",
    "regularDeadline": "Jan 1",
    "stars": "Yes",
    "cssProfile": "No",
    "additional": "STARS - Materials Deadline of 11/1; RD by 1/10",
    "act": {
      "low": 28,
      "high": 32,
      "label": "28-32",
      "nonResident": false
    },
    "sat": {
      "low": 1250,
      "high": 1400,
      "label": "1250-1400",
      "nonResident": false
    },
    "testingNotes": "",
    "testingPolicyFull": "Test Optional",
    "testingPolicy": "Optional",
    "officialScores": "Yes",
    "superscore": "Yes",
    "notes": "Majority of students must be in-state but no cap. Will read by major. Top major choice and a backup. All engineering and business is pre-engineering and pre-business.",
    "link": "https://www.clemson.edu/admissions/applying-to-clemson/freshman-students.html"
  },
  {
    "name": "Indiana University",
    "earlyType": "Early Action",
    "plans": [
      "Early Action"
    ],
    "earlyDeadline": "Nov 1",
    "regularDeadline": "Feb 1",
    "stars": "No",
    "cssProfile": "No",
    "additional": "For Direct Admission to Kelley - Students must complete Kelley Prospect Inventory (KPI) in your IU Portal by Nov. 15",
    "act": {
      "low": 29,
      "high": 33,
      "label": "29-33",
      "nonResident": false
    },
    "sat": {
      "low": 1250,
      "high": 1450,
      "label": "1250-1450",
      "nonResident": false
    },
    "testingNotes": "",
    "testingPolicyFull": "Test Optional",
    "testingPolicy": "Optional",
    "officialScores": "No",
    "superscore": "Yes",
    "notes": "",
    "link": "https://admissions.indiana.edu/apply/freshman/index.html#after"
  },
  {
    "name": "Kent State University",
    "earlyType": "Priority Deadline",
    "plans": [
      "Priority Deadline"
    ],
    "earlyDeadline": "Nov 1",
    "regularDeadline": "Apr 1",
    "stars": "No",
    "cssProfile": "No",
    "additional": "",
    "act": {
      "low": 20,
      "high": 26,
      "label": "20-26",
      "nonResident": false
    },
    "sat": {
      "low": 1040,
      "high": 1220,
      "label": "1040-1220",
      "nonResident": false
    },
    "testingNotes": "",
    "testingPolicyFull": "Test Optional",
    "testingPolicy": "Optional",
    "officialScores": "Yes",
    "superscore": "No",
    "notes": "Free app!",
    "link": "https://www.kent.edu/admissions/first-year-student-requirements"
  },
  {
    "name": "Loyola University Chicago",
    "earlyType": "Priority Deadline",
    "plans": [
      "Priority Deadline"
    ],
    "earlyDeadline": "Dec 1",
    "regularDeadline": "Rolling",
    "stars": "No",
    "cssProfile": "No",
    "additional": "",
    "act": {
      "low": 27,
      "high": 32,
      "label": "27-32",
      "nonResident": false
    },
    "sat": {
      "low": 1200,
      "high": 1370,
      "label": "1200-1370",
      "nonResident": false
    },
    "testingNotes": "",
    "testingPolicyFull": "Test Optional",
    "testingPolicy": "Optional",
    "officialScores": "No",
    "superscore": "Yes",
    "notes": "Free app!",
    "link": "https://www.luc.edu/undergrad/admissions/first-yearstudents/"
  },
  {
    "name": "Miami University",
    "earlyType": "Early Decision; Early Action 1; Early Action II",
    "plans": [
      "Early Action",
      "Early Decision"
    ],
    "earlyDeadline": "Early Decision - November 1; Early Action 1 - Nov. 1; Early Action II - Dec. 1",
    "regularDeadline": "Feb. 1",
    "stars": "No",
    "cssProfile": "No",
    "additional": "",
    "act": {
      "low": 25,
      "high": 31,
      "label": "25-31",
      "nonResident": false
    },
    "sat": {
      "low": 1220,
      "high": 1390,
      "label": "1220-1390",
      "nonResident": false
    },
    "testingNotes": "",
    "testingPolicyFull": "Test Optional",
    "testingPolicy": "Optional",
    "officialScores": "No",
    "superscore": "Yes",
    "notes": "Demonstrated Interest is IMPORTANT, especially in Farmers Business. VISIT!!!",
    "link": "https://miamioh.edu/admission-aid/apply/first-year-students/index.html"
  },
  {
    "name": "Mount St. Joseph University",
    "earlyType": "Rolling",
    "plans": [
      "Rolling"
    ],
    "earlyDeadline": "",
    "regularDeadline": "August",
    "stars": "No",
    "cssProfile": "No",
    "additional": "",
    "act": null,
    "sat": null,
    "testingNotes": "",
    "testingPolicyFull": "Test Optional",
    "testingPolicy": "Optional",
    "officialScores": "Yes",
    "superscore": "No",
    "notes": "",
    "link": "https://www.msj.edu/admission/high-school-students1/high-school-admission-requirements1/index.html"
  },
  {
    "name": "Northern Kentucky University",
    "earlyType": "Rolling",
    "plans": [
      "Rolling"
    ],
    "earlyDeadline": "",
    "regularDeadline": "August",
    "stars": "No",
    "cssProfile": "No",
    "additional": "",
    "act": null,
    "sat": null,
    "testingNotes": "Testing is used for placement, not admissions",
    "testingPolicyFull": "Test Optional",
    "testingPolicy": "Optional",
    "officialScores": "No",
    "superscore": "No",
    "notes": "Unweighted high school GPA of 2.75 or above will be directly admitted",
    "link": "https://www.nku.edu/admissions-aid/choose-your-path/undergraduate/admissions-process/index.html"
  },
  {
    "name": "Ohio State University",
    "earlyType": "Early Action",
    "plans": [
      "Early Action"
    ],
    "earlyDeadline": "Nov 1",
    "regularDeadline": "Jan 15",
    "stars": "No",
    "cssProfile": "No",
    "additional": "",
    "act": {
      "low": 28,
      "high": 33,
      "label": "28-33",
      "nonResident": false
    },
    "sat": {
      "low": 1360,
      "high": 1500,
      "label": "1360-1500",
      "nonResident": false
    },
    "testingNotes": "Oct. 3 SAT & Oct. 17 ACT are last test dates & must send scores when registering. We recommend you sending scores by October 16 if you wish to be considered for EA.",
    "testingPolicyFull": "Testing required",
    "testingPolicy": "Required",
    "officialScores": "Yes",
    "superscore": "Yes",
    "notes": "",
    "link": "https://undergrad.osu.edu/apply/freshmen-columbus/apply-step-by-step"
  },
  {
    "name": "Ohio University",
    "shortName": "Ohio University",
    "earlyType": "Early Action",
    "plans": [
      "Early Action"
    ],
    "earlyDeadline": "Nov 15",
    "regularDeadline": "Feb 1",
    "stars": "No",
    "cssProfile": "No",
    "additional": "",
    "act": {
      "low": 23,
      "high": 28,
      "label": "23-28",
      "nonResident": false
    },
    "sat": {
      "low": 1130,
      "high": 1300,
      "label": "1130-1300",
      "nonResident": false
    },
    "testingNotes": "",
    "testingPolicyFull": "Test Optional",
    "testingPolicy": "Optional",
    "officialScores": "Yes",
    "superscore": "SAT Only",
    "notes": "",
    "link": "https://www.ohio.edu/admissions/freshman/apply"
  },
  {
    "name": "Purdue University",
    "earlyType": "Early Action",
    "plans": [
      "Early Action"
    ],
    "earlyDeadline": "Nov. 1",
    "regularDeadline": "Jan 15",
    "stars": "Common App Courses & Grades section",
    "cssProfile": "No",
    "additional": "",
    "act": {
      "low": 28,
      "high": 34,
      "label": "28-34",
      "nonResident": false
    },
    "sat": {
      "low": 1220,
      "high": 1480,
      "label": "1220-1480",
      "nonResident": false
    },
    "testingNotes": "",
    "testingPolicyFull": "Testing is expected",
    "testingPolicy": "Expected",
    "officialScores": "No",
    "superscore": "Yes",
    "notes": "",
    "link": "https://admissions.purdue.edu/become-student/first-year-criteria/"
  },
  {
    "name": "Thomas More University",
    "earlyType": "Rolling",
    "plans": [
      "Rolling"
    ],
    "earlyDeadline": "May 1",
    "regularDeadline": "",
    "stars": "No",
    "cssProfile": "No",
    "additional": "",
    "act": null,
    "sat": null,
    "testingNotes": "",
    "testingPolicyFull": "Test Optional",
    "testingPolicy": "Optional",
    "officialScores": "Yes",
    "superscore": "No",
    "notes": "",
    "link": "https://www.thomasmore.edu/admissions/admissions-requirements/"
  },
  {
    "name": "University of Alabama",
    "useMyRanges": true,
    "earlyType": "Priority Deadline",
    "plans": [
      "Priority Deadline"
    ],
    "earlyDeadline": "Dec. 4",
    "regularDeadline": "Rolling",
    "stars": "No",
    "cssProfile": "No",
    "additional": "",
    "act": {
      "low": 26,
      "high": 33,
      "label": "26-33 Non-Resident",
      "nonResident": true
    },
    "sat": {
      "low": 1180,
      "high": 1410,
      "label": "1180-1410 Non-Resident",
      "nonResident": true
    },
    "testingNotes": "Test Required for WGPA below a 3.0; Scores needed for Scholarships; Will not superscore for scholarships",
    "testingPolicyFull": "Test Optional above a 3.0, but test scores are required for Scholarships",
    "testingPolicy": "Optional*",
    "officialScores": "No",
    "superscore": "Yes",
    "notes": "",
    "link": "https://admissions.ua.edu/freshman/requirements/"
  },
  {
    "name": "University of Cincinnati",
    "earlyType": "Early Action",
    "plans": [
      "Early Action"
    ],
    "earlyDeadline": "Nov 1",
    "regularDeadline": "Rolling",
    "stars": "No",
    "cssProfile": "No",
    "additional": "",
    "act": {
      "low": 24,
      "high": 29,
      "label": "24-29",
      "nonResident": false
    },
    "sat": {
      "low": 1160,
      "high": 1370,
      "label": "1160-1370",
      "nonResident": false
    },
    "testingNotes": "",
    "testingPolicyFull": "Test Optional",
    "testingPolicy": "Optional",
    "officialScores": "Yes",
    "superscore": "No",
    "notes": "",
    "link": "https://admissions.uc.edu/information/high-school/hs-faq.html"
  },
  {
    "name": "University of Dayton",
    "earlyType": "Early Action",
    "plans": [
      "Early Action"
    ],
    "earlyDeadline": "Nov 1",
    "regularDeadline": "Feb. 1",
    "stars": "No",
    "cssProfile": "No",
    "additional": "",
    "act": {
      "low": 24,
      "high": 29,
      "label": "24-29",
      "nonResident": false
    },
    "sat": {
      "low": 1130,
      "high": 1320,
      "label": "1130-1320",
      "nonResident": false
    },
    "testingNotes": "",
    "testingPolicyFull": "Test Optional",
    "testingPolicy": "Optional",
    "officialScores": "Yes",
    "superscore": "Yes",
    "notes": "",
    "link": "https://udayton.edu/apply/undergraduate/admission-process.php"
  },
  {
    "name": "University of Kentucky",
    "earlyType": "Early Action",
    "plans": [
      "Early Action"
    ],
    "earlyDeadline": "Dec 1",
    "regularDeadline": "Feb 15",
    "stars": "No",
    "cssProfile": "No",
    "additional": "",
    "act": {
      "low": 21,
      "high": 28,
      "label": "21-28",
      "nonResident": false
    },
    "sat": {
      "low": 1070,
      "high": 1290,
      "label": "1070-1290",
      "nonResident": false
    },
    "testingNotes": "",
    "testingPolicyFull": "Test Optional",
    "testingPolicy": "Optional",
    "officialScores": "Yes",
    "superscore": "No",
    "notes": "",
    "link": "https://admission.uky.edu/freshman/admission-checklist"
  },
  {
    "name": "University of Louisville",
    "earlyType": "Rolling",
    "plans": [
      "Rolling"
    ],
    "earlyDeadline": "",
    "regularDeadline": "Feb 15",
    "stars": "No",
    "cssProfile": "No",
    "additional": "",
    "act": {
      "low": 22,
      "high": 28,
      "label": "22-28",
      "nonResident": false
    },
    "sat": {
      "low": 1040,
      "high": 1270,
      "label": "1040-1270",
      "nonResident": false
    },
    "testingNotes": "",
    "testingPolicyFull": "Test Optional",
    "testingPolicy": "Optional",
    "officialScores": "Yes",
    "superscore": "No",
    "notes": "",
    "link": "https://louisville.edu/admissions/apply/program-specific-admissions-criteria"
  },
  {
    "name": "University of Michigan",
    "earlyType": "Early Action & Early Decision",
    "plans": [
      "Early Action",
      "Early Decision"
    ],
    "earlyDeadline": "Nov 1",
    "regularDeadline": "Feb 1",
    "stars": "No",
    "cssProfile": "Yes",
    "additional": "Ross: Portfolio",
    "act": {
      "low": 32,
      "high": 34,
      "label": "32-34",
      "nonResident": false
    },
    "sat": {
      "low": 1370,
      "high": 1530,
      "label": "1370-1530",
      "nonResident": false
    },
    "testingNotes": "",
    "testingPolicyFull": "Test Optional",
    "testingPolicy": "Optional",
    "officialScores": "No",
    "superscore": "Yes",
    "notes": "",
    "link": "https://admissions.umich.edu/apply/first-year-applicants/requirements-deadlines"
  },
  {
    "name": "University of Notre Dame",
    "earlyType": "Restrictive Early Action",
    "plans": [
      "Restrictive Early Action"
    ],
    "earlyDeadline": "Nov 1",
    "regularDeadline": "Jan 4",
    "stars": "No",
    "cssProfile": "Yes",
    "additional": "Writing Supplement",
    "act": {
      "low": 33,
      "high": 35,
      "label": "33-35",
      "nonResident": false
    },
    "sat": {
      "low": 1460,
      "high": 1540,
      "label": "1460-1540",
      "nonResident": false
    },
    "testingNotes": "Self-Report",
    "testingPolicyFull": "Test Optional",
    "testingPolicy": "Optional",
    "officialScores": "No",
    "superscore": "Yes",
    "notes": "No benefit to apply REA vs. RD; several short essays",
    "link": "https://admissions.nd.edu/apply/application-overview/"
  },
  {
    "name": "University of South Carolina",
    "useMyRanges": true,
    "earlyType": "Early Action",
    "plans": [
      "Early Action"
    ],
    "earlyDeadline": "Oct 15",
    "regularDeadline": "Dec 1",
    "stars": "No",
    "cssProfile": "No",
    "additional": "Student uploads unofficial transcript",
    "act": {
      "low": 28,
      "high": 33,
      "label": "28-33 Non-Resident",
      "nonResident": true
    },
    "sat": {
      "low": 1250,
      "high": 1380,
      "label": "1250-1380 Non-Resident",
      "nonResident": true
    },
    "testingNotes": "50% applicants submit test scores",
    "testingPolicyFull": "Test Optional",
    "testingPolicy": "Optional",
    "officialScores": "No",
    "superscore": "Yes",
    "notes": "43% out of state; read by major--can list a second choice. Does not look at 1st semester grades for EA or RD",
    "link": "https://sc.edu/about/offices_and_divisions/undergraduate_admissions/apply/for_freshmen/"
  },
  {
    "name": "University of Tennessee",
    "useMyRanges": true,
    "earlyType": "Early Action",
    "plans": [
      "Early Action"
    ],
    "earlyDeadline": "Nov. 1 (materials deadline of Nov. 15)",
    "regularDeadline": "Dec. 15 (materials deadline of Jan 15)",
    "stars": "Yes",
    "cssProfile": "No",
    "additional": "DO NOT look at legacy, donors, etc. Testing Required.",
    "act": {
      "low": 29,
      "high": 33,
      "label": "29-33 Non-Resident",
      "nonResident": true
    },
    "sat": {
      "low": 1330,
      "high": 1480,
      "label": "1330-1480 Non-Resident",
      "nonResident": true
    },
    "testingNotes": "Self-Report in SRAR or upload/self-report in portal",
    "testingPolicyFull": "Testing required",
    "testingPolicy": "Required",
    "officialScores": "No",
    "superscore": "Yes",
    "notes": "Recalculate GPA to UT Core GPA",
    "link": "https://admissions.utk.edu/undergraduate-application/first-year-student/"
  },
  {
    "name": "Xavier University",
    "earlyType": "Early Action",
    "plans": [
      "Early Action"
    ],
    "earlyDeadline": "Nov. 1",
    "regularDeadline": "Feb 1",
    "stars": "No",
    "cssProfile": "No",
    "additional": "",
    "act": {
      "low": 23,
      "high": 29,
      "label": "23-29",
      "nonResident": false
    },
    "sat": {
      "low": 1140,
      "high": 1310,
      "label": "1140-1310",
      "nonResident": false
    },
    "testingNotes": "",
    "testingPolicyFull": "Test Optional",
    "testingPolicy": "Optional",
    "officialScores": "Yes",
    "superscore": "No",
    "notes": "",
    "link": "https://www.xavier.edu/undergraduate-admission/admission-process/index"
  }
];
