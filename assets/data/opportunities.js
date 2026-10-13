/* =========================================================================
   OPPORTUNITIES BOARD — every card on opportunities.html lives in this list.

   TO ADD AN ITEM: copy one { ... } block below, paste it at the end of the list, and edit.
   Fields (all optional except name and category):
     category   "fairs"   → College Fairs & Programs
                "careers" → Career Exploration
                "jobs"    → Jobs
     name       the title of the card
     org        the college or organization
     dates      when it happens, as you want it shown (for example "Sun., Oct. 18, 2026, 1–4 PM")
     where      the location
     deadline   an application or registration deadline, as you want it shown
     grades     who it's for (for example "All grades" or "Grades 11–12")
     desc       a short description: keep it to 2–3 sentences
     more       optional extra text, shown when a student clicks "Read more"
     links      [{text:"Register", url:"https://..."}]; use "mailto:name@school.org" for email
     showUntil  "YYYY-MM-DD": the card hides itself automatically after this date. Use the
                event date, or the application deadline if that comes first. Leave it out
                (jobs, rolling programs) and the card shows until you delete it.

   Cards in a category show soonest showUntil first; cards without one come last, in the
   order listed here. Past cards can stay in the list; they just stop showing.

   REFRESHING FROM THE EXCEL FILE: rebuild this list from the "College Fairs & Programs",
   "Career Exploration", and "JOBS" tabs. Ignore the "Past Programs" tab.
   ========================================================================= */

const OPPORTUNITIES = [
  {category:"fairs", name:"Cincinnati National College Fair", dates:"Sun., Oct. 18, 2026, 1–4 PM", where:"Fifth Third Center (525 Elm St.)", grades:"All grades", links:[{"text": "Fair details and registration", "url": "https://www.nacacattend.org/26GreaterCincinnati"}], showUntil:"2026-10-18"},
  {category:"fairs", name:"UC College of Medicine Connections BS/MD webinar", org:"University of Cincinnati", dates:"Aug. 28, 2026, 4–4:45 PM", grades:"All grades", desc:"Live webinar on UC’s Connections dual-admissions program for students interested in medicine.", links:[{"text": "Program details", "url": "https://med.uc.edu/connections-dual-admissions"}], showUntil:"2026-08-28"},
  {category:"fairs", name:"U.S. Service Academies & ROTC Information Fair", dates:"Sat., Sept. 12, 2026, 11 AM–3 PM", where:"Cincinnati Museum Center", grades:"All grades", links:[{"text": "Register", "url": "https://forms.gle/pvPbT4kNfEVwUuS39"}], showUntil:"2026-09-12"},
  {category:"fairs", name:"Notre Dame: ND on the Road", org:"University of Notre Dame", dates:"Tue., Sept. 15, 2026, 7 PM", where:"Mount Notre Dame High School", desc:"Academic, community, and spiritual life at Notre Dame, plus admissions and financial aid.", links:[{"text": "Register", "url": "https://enrollment.nd.edu/register/Cincinnati26"}], showUntil:"2026-09-15"},
  {category:"fairs", name:"UC Speech-Language-Hearing Sciences Showcase", org:"University of Cincinnati", dates:"Wed., Oct. 21, 2026, 5:30 PM", grades:"All grades, especially juniors and seniors", desc:"Explore speech-language pathology and audiology.", links:[{"text": "Register", "url": "https://admissions.catalyst.uc.edu/register/?id=9f664e8b-3bc4-4edf-bf04-8815a1fb11ae"}], showUntil:"2026-10-21"},
  {category:"fairs", name:"Turn Up Civic & Activism Remote Internship", dates:"Fully remote, flexible schedule. Start dates at the beginning of each month.", desc:"Students join remote teams working on youth civic engagement, with peer learning, expert speakers, and professional development.", links:[{"text": "Learn more", "url": "https://cjc8i.r.a.d.sendibm1.com/mk/cl/f/sh/1t6Af4OiGsFVLeelxBqTyuMOKB6nd1/DYUsEVY0AWtm"}]},
  {category:"fairs", name:"Southwest Ohio Regional College Fair", org:"Miami University Hamilton", dates:"Tue., Sept. 29, 2026, 6:30–8 PM", where:"Harry T. Wilks Conference Center, Miami University Hamilton", grades:"All grades", desc:"StriveScan fair: register for a barcode at StriveFair.com. A Financing Your Education session runs 6–6:30 PM in Mosler Hall 200.", links:[{"text": "Register for a barcode", "url": "https://www.StriveFair.com"}, {"text": "Fair details", "url": "https://miamioh.edu/regionals/admission/college-fair/"}], showUntil:"2026-09-29"},
  {category:"fairs", name:"University of Dayton Explore Engineering", org:"University of Dayton", dates:"Sat., Nov. 14, 2026, 1–5 PM (optional campus tour at 11 AM)", grades:"Grades 11–12", desc:"Hands-on labs and faculty and student panels for engineering, engineering technology, computer science, and physics. A spring event in February 2027 is for sophomores and juniors.", links:[{"text": "Event details", "url": "https://udayton.edu/calendar/2026/11/explore-engineering.php"}], showUntil:"2026-11-14"},
  {category:"careers", name:"Medical Explorers", org:"Mercy Health Fairfield HealthPlex", dates:"Begins Oct. 8, on select Wednesday evenings, 6–7:30 PM", deadline:"Sept. 23, 2026", grades:"Grades 11–12", desc:"Explore medical career pathways at Mercy Health Fairfield Hospital. To apply, email a typed personal essay on why you’re interested in medicine, plus the Permission and Consent form, to Mrs. Davies by Sept. 23, 2026.", links:[{"text": "Email Mrs. Davies", "url": "mailto:adavies@moeller.org"}], showUntil:"2026-09-23"},
  {category:"jobs", name:"Part-Time Shelving", org:"Madeira Public Library", desc:"Sort, arrange, and shelve returned materials at a branch location.", links:[{"text": "Apply", "url": "https://recruitingbypaycor.com/career/JobIntroduction.action?clientId=8a78826755712ad4015573d869f00055&id=8a7883ac9881bb700198c2823d886795&specialization=8a78826755712ad4015573dc5e0b0092&lang=en"}]},
  {category:"jobs", name:"Servers", org:"Tony’s Family Italian Restaurant (10764 Montgomery Rd.)", desc:"Call Tony at 513-376-6739."},
  {category:"jobs", name:"Lifeguard and other positions", org:"SwimSafe Pool Management", desc:"Hiring for the 2026 season. Lifeguards earn up to $15/hour.", links:[{"text": "Email hr@swimsafepool.com", "url": "mailto:hr@swimsafepool.com"}]},
  {category:"jobs", name:"Driver/Babysitter", desc:"Drive a 7th grader to and from the Mason Community Center and spend time with him on weekdays. Contact the counseling office for details."},
  {category:"jobs", name:"Route Delivery Driver", org:"Home City Ice", desc:"$15–$22/hour.", links:[{"text": "Apply at homecityice.com", "url": "https://www.homecityice.com"}]},
  {category:"jobs", name:"Part-Time Digital Marketing", org:"Tony’s Family Italian Restaurant", desc:"Help build the restaurant’s online presence. Contact Mike Monsere at 513-300-7848."}
];
