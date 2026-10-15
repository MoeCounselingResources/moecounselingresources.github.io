/* =========================================================================
   FRESHMAN FOUNDATIONS, QUARTER 4: MENTAL HEALTH — every word on freshman-foundations-q4.html lives in this
   file, including every phone number. (Logic: assets/js/freshman-q4.js. Look: freshman-q1.css + freshman-q4.css.)

   PRIVACY RULE FOR THIS PAGE: students may be on a shared or family device. This page has NO text boxes,
   NO inputs that store anything, and NEVER uses localStorage, sessionStorage, IndexedDB, or cookies.
   It makes no tracking or external requests. Please keep it that way when you edit.

   TO EDIT WORDING: change the text between the quotation marks. Keep the quotation marks, commas, and braces.
   To use a quotation mark inside text, write \" instead of ".
   Phone numbers: each "actions" line below has a "label" (button words) and an "href" (what the phone dials
   or texts: tel:... to call, sms:... to text). Change a number in BOTH its "text" and its "href".
   The support box is drawn twice (top of the page and near the end) from the single "support" block.
   The five gray "Content coming from the Quarter 4 presentation" boxes are placeholders: replace the
   "note" line with real content when the presentation is final.
   ========================================================================= */

const FRESHMAN_Q4 = {

  title: "Freshman Foundations, Quarter 4: Mental Health",
  stage: "Freshman Foundations",
  back: { text: "← Back to Freshmen page", href: "freshmen.html" },
  footerBack: { text: "Back to the Freshmen page", href: "freshmen.html" },

  // ---------- Support box (shown at the top and again, in a compact form, near the end) ----------
  support: {
    title: "Need to talk to someone now?",
    lines: [
      { text: "Call or text 988 (Suicide & Crisis Lifeline)",
        actions: [ { label: "Call 988", href: "tel:988" }, { label: "Text 988", href: "sms:988" } ] },
      { text: "Text HOME to 741741 (Crisis Text Line)",
        actions: [ { label: "Text HOME to 741741", href: "sms:741741?&body=HOME" } ] },
      { text: "Call 911 in an emergency",
        actions: [ { label: "Call 911", href: "tel:911" } ] }
    ],
    housesTitle: "Your house counselor",
    housesNote: "Find your house below. Your house counselor is glad to hear from you.",
    walkIn: "You can always walk into the counseling office."
  },

  // ---------- Year ahead ----------
  yearAhead: {
    title: "The year ahead",
    youAreHere: "You are here",
    quarters: [
      { label: "1st Quarter", text: "Study Skills and Adjusting to Life in High School" },
      { label: "2nd Quarter", text: "Self-Discovery and Exploring Post-secondary Opportunities" },
      { label: "3rd Quarter", text: "Course Registration Presentation and SCOIR Course Planner" },
      { label: "4th Quarter", text: "Mental Health Presentation" }
    ],
    current: 3
  },

  // ---------- Placeholder sections (no presentation content yet) ----------
  placeholderBadge: "Placeholder",
  placeholderNote: "Content coming from the Quarter 4 presentation.",
  sections: [
    { id: "understanding", title: "Understanding mental health",
      intro: "Everyone has hard days, and that is a normal part of being a person. Reaching out when something feels heavy is a sign of strength. Support works, and there are people at Moeller who want to help." },
    { id: "stress", title: "Stress and anxiety" },
    { id: "self-care", title: "Taking care of yourself" },
    { id: "friend", title: "Supporting a friend" },
    { id: "who-helps", title: "Who can help at Moeller" }
  ]
};
