/* =========================================================================
   HOW TO LEARN, MODULE 4: SPACING — all wording for how-to-learn-spacing.html.
   (Logic: assets/js/how-to-learn.js and assets/js/htl-spacing.js. Research claims and sources come from
   assets/data/evidence.js; do not retype them here.)

   The review-calendar planner saves a plan ONLY in the student's own browser under "moeller-ex-htl-calendar".
   TO EDIT WORDING: change the text between the quotation marks; keep quotation marks, commas, braces.
   ========================================================================= */

const HTL_MODULE = {
  id: "spacing",
  n: 4,
  title: "Spread it out: spacing",
  evidence: ["spacing"],
  prev: "retrieval",
  next: "interleaving",

  hook: "Two students study the same amount for the same test. One does it all in one long night. The other splits it into short sessions across the week. Who do you think remembers more a month from now?",

  quick: {
    question: "Which of these sounds like you?",
    options: [
      { text: "I study the night before. That's when I get focused.", fix: "Lots of students do. The idea below is to move some of that work earlier, into a few shorter sessions." },
      { text: "I study a lot right before the test, then forget it all.", fix: "Spreading your practice over several days is the fix to try. The planner below turns it into dates you can check off." },
      { text: "I don't know when to start reviewing.", fix: "A planner can take care of that decision. Enter your test date below and pick how many short sessions you want." },
      { text: "I already review a little each week.", fix: "Good. Use the planner to line your sessions up with your next test." }
    ]
  },

  idea: {
    text: "Spacing means splitting your practice into several shorter sessions with time in between, instead of doing it all at once. Many studies find that people remember more when practice is spread out than when the same amount is crammed together. We do not know one best schedule, and few studies were done in real classrooms. So think of it as a direction to move in, not a rule to follow exactly.",
    exampleLabel: "Everyday example",
    example: "Instead of one two-hour session on Sunday night, try four 30-minute sessions spread over the week before the test."
  },

  try: {
    title: "Try it: plan your review sessions",
    intro: "Pick a test or exam, and this planner picks dates for short review sessions between today and the day before it. Then you can check them off as you go.",
    styleNote: "Research does not show that one schedule is best, so pick the one that feels easier to keep.",
    subjectLabel: "Subject or test (short)",
    subjectPlaceholder: "e.g. Biology unit test",
    examLabel: "Exam date",
    sessionsLabel: "How many review sessions?",
    sessionsOpts: ["3 sessions", "4 sessions", "5 sessions"],
    styleLabel: "Spacing style",
    styles: { even: "Evenly spread", close: "A bit closer to the exam" },
    make: "Make my plan",
    needSubject: "Type a short subject name first, like Biology or Spanish quiz.",
    needDate: "Choose your exam date first.",
    notFuture: "The exam date needs to be after today. Pick a later date.",
    planFor: "Review plan for {s}",
    examOn: "Exam: {d}",
    fewer: "Only {n} day(s) are left before the exam, so this plan has {n} session(s) instead of {want}. A short session is still worth doing.",
    full: "Your plan has {n} sessions.",
    session: "Session {i}: {d}",
    todayTag: " (today)",
    howTitle: "How to do each session",
    how: "Each session: close your notes and try to remember first. Then check what you missed. Twenty to thirty minutes is plenty.",
    left: "{n} of {total} done.",
    allDone: "All sessions done. Nice work.",
    printBtn: "Print my plan",
    printTitle: "Review plan",
    printSubject: "Subject",
    printExam: "Exam date",
    printDates: "Review dates",
    saved: "Saved on this device.",
    cleared: "Your plan was cleared.",
    blocked: "This browser is blocking saving, so your plan will be lost when you close this page.",
    clear: "Clear my data",
    clearAsk: "Clear your saved plan from this device?",
    clearYes: "Yes, clear it",
    clearNo: "Keep it",
    privacy: "Your plan is saved only in this browser on this device. Anyone who uses this browser can see it. Nothing is sent anywhere. Use Clear my data when you are done on a shared computer.",
    stale: "Your saved plan is for a test date that has passed. Pick a new date to make a new plan."
  },

  week: "Pick your next test, put one 20-minute review session on your calendar for the day after class, and when it starts, close your notes and write down what you remember first.",

  supports: [
    "The planner picks the dates, so you don't have to work them out.",
    "Each session is short. Twenty minutes counts.",
    "Check boxes show what is done and what is next.",
    "Print the plan and tape it where you study.",
    "If you miss a day, do the next session on the next day. Don't restart."
  ],

  research: {
    intro: "Here is what the research says, and what it does not say.",
    extra: "The dates this planner makes are examples, not a proven formula. Move them to fit your week."
  },

  reflection: [
    "Which test coming up could you space out, and what would your first session be?",
    "What might get in the way of a short review session, and how could you plan around it?"
  ]
};
