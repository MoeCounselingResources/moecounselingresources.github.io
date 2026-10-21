/* =========================================================================
   ACADEMIC SUPPORT — every word on academic-support.html lives in this file.
   (The logic is assets/js/academic-support.js and the look is assets/css/academic-support.css.)

   TO EDIT WORDING: change the text between the quotation marks. Keep the quotation marks, commas, and braces.
   To use a quotation mark inside text, write \" instead of ".
   To add a study group or a tutoring card, copy one { ... } line and edit it.

   CHEM BLOCK TABLE (the "chem.rows" list), one line per session:
     q       the quarter, 1 to 4
     chapter the chapter name as students know it ("Ch2", "Ch3-4", "EOY")
     test    the projected test day as text ("Sep 3"). For the final exam, write "Exam".
     session the Chem Block date as "Mon D" ("Aug 31"). The page figures out the year from the school year
             (August to December = the year the school year starts, January to July = the next year).
     topic   what the session covers
   The page highlights the next session that has not passed yet, using the date on the student's own device.
   Nothing on this page is saved anywhere.
   ========================================================================= */

const ACADEMIC_SUPPORT = {
  title: "Academic Support",
  stage: "School Counseling",
  back: { text: "← Back to School Counseling", href: "school-counseling.html" },
  intro: "Study groups, Chem Block, and the tutors available to you in school. All of it is free.",
  footer: "Built for our students, edited every year. Have a broken link or a resource we should add? Tell your counselor.",

  groups: {
    title: "Study groups",
    intro: "Drop in before a test or quiz. No sign-up needed.",
    when: "Meets every M-Block.",
    cards: [
      { subject: "Spanish", where: "Mr. Vitolo's room", time: "M-Block, Room 25" },
      { subject: "English / Writing Center", where: "CLC (Cardinal Learning Center)", time: "M-Block, CLC" },
      { subject: "Chemistry", where: "Miller and Conlon", time: "M-Block, Rooms 306 and 308" },
      { subject: "Math", where: "Kruger", time: "M-Block, Room 223" }
    ]
  },

  chem: {
    title: "Chem Block",
    intro: "Extra help sessions tied to your Chemistry test schedule. Sessions run during M-Block, before each projected test.",
    filterLabel: "Show one quarter",
    all: "All",
    status: "Showing {n} of {total} sessions.",
    next: "Next session: {date}, {topic}.",
    none: "There are no more Chem Block sessions this school year.",
    nextBadge: "Next session",
    tableLabel: "Chem Block schedule",
    columns: { quarter: "Quarter", chapter: "Chapter", test: "Projected Test Day", session: "Chem Block Date", topic: "Topic" },
    note: "Dates may shift slightly. Check with your Chemistry teacher for the most current schedule.",
    rows: [
      { q: 1, chapter: "Ch2", test: "Sep 3", session: "Aug 31", topic: "Dimensional Analysis" },
      { q: 1, chapter: "Ch3-4", test: "Sep 24", session: "Sep 21", topic: "Ions and Isotopes" },
      { q: 1, chapter: "Ch5", test: "Oct 9", session: "Oct 6", topic: "Naming" },
      { q: 2, chapter: "Ch6-7", test: "Nov 2", session: "Oct 19", topic: "Balancing" },
      { q: 2, chapter: "Ch6-7", test: "Nov 2", session: "Oct 30", topic: "Predicting Products" },
      { q: 2, chapter: "Ch8", test: "Nov 19", session: "Nov 12", topic: "Mole Conversions" },
      { q: 2, chapter: "Ch9", test: "Dec 10", session: "Dec 7", topic: "Stoichiometry" },
      { q: 3, chapter: "Ch10", test: "Jan 26", session: "Jan 19", topic: "Calorimetry" },
      { q: 3, chapter: "Ch11", test: "Feb 17", session: "Feb 8", topic: "Electron Configurations" },
      { q: 3, chapter: "Ch12", test: "Mar 11", session: "Mar 4", topic: "VSEPR" },
      { q: 4, chapter: "Ch14", test: "Mar 24", session: "Mar 19", topic: "Heating and Cooling Curves" },
      // VERIFY: confirm this early session date is intentional. (Mar 24 is about 5 weeks before the Apr 28 test.)
      { q: 4, chapter: "Ch13", test: "Apr 28", session: "Mar 24", topic: "Gas Laws" },
      // VERIFY: session date may be wrong — it falls after the test. (Session May 14, test May 11.)
      { q: 4, chapter: "Ch15", test: "May 11", session: "May 14", topic: "Solution Stoichiometry" },
      { q: 4, chapter: "EOY", test: "Exam", session: "May 19", topic: "EOY Dimensional Analysis" }
    ]
  },

  tutors: {
    title: "Tutors in school",
    intro: "Free tutoring from students and teachers. No sign-up needed. Just show up.",
    cards: [
      { title: "Peer tutors (NHS tutoring)", text: "National Honor Society members offer free peer tutoring. Ask your counselor or check the main office for the current schedule and subjects." },
      { title: "Teacher availability", text: "Most teachers offer help during M-Block. Check with your teacher directly for their availability this quarter." }
    ]
  },

  tools: {
    title: "Study tools",
    cards: [
      // The page checks that "href" really exists on the site. Until it does, the button shows "soon" and is not a link.
      { title: "Flashcard Studio", text: "Turn your notes into flashcards — coming soon.", textLive: "Turn your notes into flashcards.", href: "flashcard-studio.html", go: "Open", soon: "Coming soon" }
    ]
  }
};
