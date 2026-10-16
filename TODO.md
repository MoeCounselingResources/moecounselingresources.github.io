# TODO

- Decide whether to link the junior recommendation request and questionnaire Microsoft Forms on the Juniors page.
- Add any test prep providers left out of this update (Torch Prep, Whiz, Mathnasium Blue Ash, NKY Tutoring).
- Confirm source and year for the Q2 earnings chart, then update the caption.
- Freshmen page, Quarter 4 support card ("You're not alone", in assets/data/freshman.js): counseling team to VERIFY every number and resource before launch:
  - 988 Suicide & Crisis Lifeline (call or text 988, any time)
  - Crisis Text Line (text HOME to 741741)
  - 911 in an emergency
  - NAMI link https://www.nami.org
  - "You can always walk into the counseling office." (confirm hours/location wording)
- Course Planner / Curriculum Guide items to confirm (found in review):
  - Registration dates: the Course Planner now says only "In January", "In February" and "In March" (no specific dates) with "Details will be announced each year." Guide p.12 prints specific dates for one year (and "March 23, 2026" for the change deadline, probably a typo for 2027).
  - PE waiver: guide p.6 and p.36 say "two seasons of marching band" but p.64 says "two school years". The planner follows p.64. Confirm which is right. (p.6 also points to p.63 for the sports list; the list is on p.64.)
  - Confirm whether the class of 2029+ total is 25 or 26 credits with MoeTerm. The planner uses 25 (one config value, `totalCredits` in assets/data/course-rules.js) and tracks MoeTerm separately.
  - Semester CCP courses are listed at 1 credit (from the worksheet; the guide gives no credit). Confirm.
  - Worksheet-only courses (not in the 2026-27 guide) are in the catalog with source "worksheet": ASL I/II, Fine Arts Survey, Men's Chorus I-III, Men's Vocal Ensemble, Health (summer), Business Management and Operations, Intro to AI CCP, Summer Pre-Calc. Confirm they should be offered.
  - The Social Sciences pathway (guide p.61) lists "Catholic Teaching in a Contemporary World"; the guide has no such course, so the planner shows the title only.
  - assets/data/courses.js (GPA Calculator list) differs from the new catalog: it has courses not in the guide (Catholic Teaching in the Contemporary World, English IV Contemporary Poetry / Cultural Criticism / Offbeat American Lit, Humanities, Philosophy and Literature, AP Art History, Spanish II CP2), lists semester CCP courses at 0.5 credit and PE I/II at 0.5 (the catalog has 1 and 0.25), and lists Studio Art II as H/CP1 and Marianist Community Development I as PF. Decide whether to merge the lists.

- How to Learn sources: Latimier 2021 (source 9 in assets/data/evidence.js) is a plain http link on a personal university page (lscp.net). Check once a year that it still loads. All other ledger links should be clicked through at the same time.
