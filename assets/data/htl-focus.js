/* =========================================================================
   HOW TO LEARN, MODULE 8: FOCUS AND DIGITAL DISTRACTION — all wording for how-to-learn-focus.html.
   (Logic: assets/js/how-to-learn.js and assets/js/htl-focus.js. Research claims and sources come from
   assets/data/evidence.js; do not retype them here.)
   The study-spot checklist is NOT saved anywhere. Ticks live in memory only.
   TO EDIT WORDING: change the text between the quotation marks; keep quotation marks, commas, braces.
   ========================================================================= */

const HTL_MODULE = {
  id: "focus",
  n: 8,
  title: "Focus and digital distraction",
  evidence: ["focus"],
  prev: "habits",
  next: "sleep",

  hook: "You sit down to study for ten minutes. A message buzzes. You check it, and then check one more thing. Suddenly twenty minutes are gone and you have not started.",

  quick: {
    question: "Which of these sounds like you?",
    options: [
      { text: "My phone is always within reach when I study.", fix: "A simple place to start is moving it out of reach for one short study block. The activity below walks you through that and a few other easy setup steps." },
      { text: "I keep lots of tabs open and jump between them.", fix: "Try keeping only the tabs you need for this task. It is a small change, and the checklist below includes it." },
      { text: "I get started, but I lose my place after a break.", fix: "Setting out one thing on your desk and picking a start time can make it easier to begin again. Both are on the checklist below." },
      { text: "I do not think my phone is the problem.", fix: "That is fair. Phones are useful, and the research here is mixed. Pick only the steps that seem worth a try for you, and skip the rest." }
    ]
  },

  idea: {
    text: "Phones are not the enemy. They are also how you reach people and get things done. Still, when you study, it can be easier to focus if the easy distractions are a little harder to reach. Keeping your phone out of reach is a low-cost habit worth trying. Some studies link a lot of screen-switching with lower performance, but that does not show one causes the other, and the evidence is mixed. The idea that a phone nearby drains your brain did not hold up when other researchers tried to repeat it.",
    exampleLabel: "Everyday example",
    example: "Before a reading assignment, you put your phone in your bag across the room, close all but one tab, and set a start time. When the timer ends, you take a short break and check your messages."
  },

  try: {
    title: "Set up your study spot",
    intro: "Here are eight small steps. Tick the ones you are ready to try. You do not need all of them. Pick what fits you. Nothing you tick here is saved.",
    groupLabel: "Study spot steps",
    steps: [
      { label: "Put your phone in another room or in your bag", why: "A little distance may make it easier to stay with the task. You can still check it on your break." },
      { label: "Turn off notifications for your study time", why: "Fewer buzzes may mean fewer chances to get pulled away in the middle of a thought." },
      { label: "Keep open only the tabs you need", why: "A clean screen makes it easier to see what you are supposed to be doing." },
      { label: "Get water and your materials ready", why: "If you do not have to get up to find a pencil, it is easier to keep going." },
      { label: "Pick a visible start time", why: "A clear start time takes away the question of when to begin. Write it where you can see it." },
      { label: "Plan one short break", why: "Knowing a break is coming can make it easier to keep working until then." },
      { label: "Put one thing on the desk to work on", why: "One thing is easier to start than a pile. Do the others later." },
      { label: "Tell someone at home when you will be done", why: "It helps others know when you will be free, and gives you a finish line." }
    ],
    countLabel: "Steps ready",
    of: "of",
    countSr: "Steps ready: {n} of {total}.",
    none: "Tick any step that you are ready to try.",
    some: "Nice. You are set up for a start.",
    all: "All set. Your study spot is ready.",
    printBtn: "Print my checklist",
    printTitle: "My study spot checklist",
    printNote: "Start time: ____________   Break at: ____________",
    printPrivacy: "General study tips. Nothing on this sheet was saved or sent anywhere."
  },

  week: "Pick one study session this week. Before you start, put your phone out of reach and set a start time. Then notice how it felt.",

  supports: [
    "The checklist gives you the steps, so you do not have to remember them.",
    "Start with one or two steps. A short list you actually use beats a long one you skip.",
    "Print the checklist and keep it where you study.",
    "Say your start time out loud or write it down so it is easy to see.",
    "Plan your break before you begin, so you know when you can check messages."
  ],

  research: {
    intro: "Here is what the research says, and what it does not say.",
    extra: "In plain words: keeping your phone out of reach is a reasonable thing to try, and it costs nothing. The research does not show that phones harm your brain, and it does not promise better grades."
  },

  reflection: [
    "Which one or two steps would be easiest for you to try first?",
    "What usually pulls your attention away when you study, and what could make that a little harder to reach?"
  ]
};
