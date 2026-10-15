# TODO

- Decide whether to link the junior recommendation request and questionnaire Microsoft Forms on the Juniors page.
- Add any test prep providers left out of this update (Torch Prep, Whiz, Mathnasium Blue Ash, NKY Tutoring).
- Confirm source and year for the Q2 earnings chart, then restore it (the figures and restore steps are in a comment in assets/data/freshman-q2.js).
- Link the Quarter 3 and Quarter 4 pages (freshman-foundations-q3.html, freshman-foundations-q4.html) from the Freshmen page only after the presentation content replaces the placeholders and you approve.
- Quarter 3: replace the four "Content coming from the Quarter 3 presentation" placeholders (graduation requirements, how registration works, choosing levels CP/Honors/AP, using the SCOIR Course Planner). Keep courses.js current from the Curriculum Guide each year.
- Quarter 4: replace the five "Content coming from the Quarter 4 presentation" placeholders, and have the counseling team review the intro paragraph under "Understanding mental health".
- Quarter 4: counseling team to VERIFY every number and resource before launch (all are in assets/data/freshman-q4.js):
  - 988 Suicide & Crisis Lifeline: call or text 988 (phone links tel:988 and sms:988)
  - Crisis Text Line: text HOME to 741741 (link sms:741741?&body=HOME; some older Android phones may not prefill HOME)
  - Emergency: call 911 (link tel:911)
  - "You can always walk into the counseling office." (confirm this is true for all hours and give hours or a location if wanted)
  - House counselor names and email addresses shown on the page come from COUNSELORS in assets/js/shared-content.js (Eveslage, Pillar, Quiroga, Trinity, Zaragoza, Zehler); confirm they are current.
- Quarter 4 (counseling team to decide): the owner-supplied line "You can always walk into the counseling office." reads as 24/7. The safe-messaging reviewer suggested "During the school day, you can walk into the counseling office. Outside school hours, call or text 988." Confirm office hours/location and the wording.
- Quarter 4 (counseling team to verify, optional additions): whether to say 988 is "free, confidential, available any time" and Crisis Text Line is free and 24/7; whether to say "If you are worried about a friend, tell a trusted adult" in the "Supporting a friend" section; test the Crisis Text Line text link (sms:741741?&body=HOME) on a real iPhone and Android phone.
- Quarter 3: the level codes CP1, CP2, AP, and CCP show as bare codes in the planner (courses.js only defines L1, H, HP, PF in words). Confirm the meanings before spelling them out.
