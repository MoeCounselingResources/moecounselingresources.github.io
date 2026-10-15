/* =========================================================================
   HOW TO LEARN, MODULE 9: SLEEP AND LEARNING — all wording for how-to-learn-sleep.html.
   (Logic: assets/js/how-to-learn.js and assets/js/htl-sleep.js. Research claims and sources come from
   assets/data/evidence.js; do not retype them here.)
   Nothing in the bedtime tool is saved. This page is general information, not medical advice.
   TO EDIT WORDING: change the text between the quotation marks; keep quotation marks, commas, braces.
   ========================================================================= */

const HTL_MODULE = {
  id: "sleep",
  n: 9,
  title: "Sleep and learning",
  evidence: ["sleep"],
  prev: "focus",
  next: "executive",

  hook: "It is late. You have a test tomorrow, so you stay up to study. The next day you sit down for the test feeling foggy, and wish you had more hours in the night.",

  quick: {
    question: "Which of these sounds like you?",
    options: [
      { text: "I go to bed at a different time every night.", fix: "A same wake-up time is a good place to start. The tool below shows you a bedtime window that matches your wake-up time." },
      { text: "I stay up late on my phone or laptop.", fix: "Phones are not bad, but a few low-key wind-down habits can help you get to bed. Try the ideas below and pick one." },
      { text: "I think I can get by on very little sleep.", fix: "Many people feel that way. Teens need about 8 to 10 hours, so see where that lands for your schedule in the tool below." },
      { text: "I get enough sleep, but I still feel tired.", fix: "That is worth talking about with your counselor or a doctor. This page is general information and cannot tell you why you feel that way." }
    ]
  },

  idea: {
    text: "Teens aged 13 to 18 need about 8 to 10 hours of sleep. Sleep also goes along with school performance in a modest but reliable way. Modest means it is one piece, not the whole picture. Sleep will not fix grades on its own, and getting more of it does not guarantee a result. It is still a solid place to put some care, because it matters for your health too. A good way to plan sleep is to start from the time you have to wake up and count back.",
    exampleLabel: "Everyday example",
    example: "If you have to be up at 6:30 AM, then going to bed between 8:30 PM and 10:30 PM gives you 8 to 10 hours. Most people take a little while to fall asleep, so aim to be in bed a bit before."
  },

  try: {
    title: "Find your bedtime window",
    wakeLabel: "What time do you have to wake up?",
    wakeHelp: "Pick the time you usually need to be up on a school day.",
    empty: "Enter your wake-up time to see your bedtime window.",
    resultLead: "For 8 to 10 hours of sleep, your bedtime window is {from} to {to}.",
    resultWake: "Wake-up time: {wake}",
    daytimeNote: "That window lands in the afternoon. Check that the wake-up time is right, including AM or PM.",
    fallAsleep: "It takes time to fall asleep, so aim to be in bed a little before.",
    windDownTitle: "Wind-down ideas",
    windDownIntro: "Tap the ones you would like to try tonight. They are only ideas. Pick what fits you.",
    windDown: [
      "Dim your screens, or put them away, a little before bed.",
      "Set out tomorrow's stuff: bag, clothes, charger.",
      "Keep the same wake-up time, even on days off, as much as you can."
    ],
    picked: "Picked: {n} of {total}.",
    printBtn: "Print my plan",
    printTitle: "My bedtime window",
    printNoWake: "Wake-up time: ____________",
    printNoWindow: "Bedtime window: ____________  to  ____________",
    printWind: "Wind-down ideas I will try",
    printNoWind: "(none picked yet)",
    printNote: "General information only. Nothing on this sheet was saved or sent anywhere.",
    gentle: "If you often cannot sleep, or you feel exhausted no matter what, talk with your counselor or a doctor. This page is general information and cannot tell you what is going on for you."
  },

  week: "Pick one wind-down idea and try it tonight. Then write down your wake-up time and stick to it for the next three school days.",

  supports: [
    "The tool does the counting for you, so you do not have to do the math.",
    "Start with one wind-down idea, not all three.",
    "Set out tomorrow's stuff before bed so mornings are easier.",
    "Print the plan and put it where you will see it.",
    "A same wake-up time is a simple anchor to plan around."
  ],

  research: {
    intro: "Here is what the research says, and what it does not say.",
    extra: "This page is general information. It is not medical advice and it cannot tell you why you feel the way you do. The link between sleep and grades is modest, and no strategy here promises a grade."
  },

  reflection: [
    "What time do you have to wake up on most school days, and what bedtime does that point to?",
    "Which wind-down idea could you try tonight, and what would you need to get ready?"
  ]
};
