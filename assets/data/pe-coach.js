/* =========================================================================
   PARENT GUIDE 3: COACH, DON'T CARRY — all wording for pe-coach.html.
   (Logic: assets/js/parent-education.js. Research claims and sources come from assets/data/pe-evidence.js.)
   The "handoff" tool: {task} in any line is replaced with the job the parent types or picks.
   TO EDIT WORDING: change the text between the quotation marks; keep quotation marks, commas, braces.
   ========================================================================= */

const PE_MODULE = {
  id: "coach",
  n: 3,
  title: "Coach, don't carry: building executive skills",
  evidence: ["skills", "autonomy"],
  prev: "struggle",
  next: "worry",

  hook: "You wake him up, remind him about the test, track the project due date, and email the teacher when something is missing. It works. His grades are fine. But what happens when you're not there to do it?",

  quick: {
    question: "Which of these sounds most like you?",
    options: [
      { text: "If I stop reminding him, his grades will drop.", fix: "They might, for a little while. A dip in sophomore year costs far less than a rough first semester of college. Hand jobs off one at a time, with a plan." },
      { text: "He's just lazy.", fix: "Often it isn't laziness. Planning, getting started, and keeping track of time are skills that keep developing into the early twenties. Skills grow with practice, and lectures don't count as practice." },
      { text: "I've told him a hundred times to use a planner.", fix: "Telling isn't teaching. Try showing him once, doing it together for a week, then checking in less and less." },
      { text: "He has ADHD or a learning difference.", fix: "These skills may take more practice and more support, and that's okay. The handoff still works; it just moves more slowly. Talk with his counselor about supports at school." }
    ]
  },

  idea: {
    text: "Executive skills are the skills for getting things done: planning, organizing, getting started on a task, managing time, and keeping track of things. They keep developing through high school and into the early twenties, and they grow through practice, not age alone. When a parent does these jobs for a teen, the jobs get done, but he doesn't get the practice. Dawson and Guare, authors of Smart but Scattered Teens, point out that some students keep their grades up only because a parent is quietly doing this work for them. The goal is to hand the work over a little at a time: you do it together, then he does it with you nearby, then on his own with a check-in.",
    exampleLabel: "Everyday example",
    example: "Instead of reminding him about Thursday's test, ask on Monday: \"What's coming up this week? When are you going to study for it?\" Then let Thursday happen."
  },

  try: {
    type: "handoff",
    title: "Try it: plan a four-week handoff",
    intro: "Pick one job you do for your son that he could start doing himself. The planner turns it into four weeks of gradual handoff. You can edit any line so it fits your family.",
    taskLabel: "The job you want to hand off",
    taskPlaceholder: "e.g. keeping track of due dates",
    startersLabel: "Or pick one:",
    starters: ["getting up on time", "keeping track of due dates", "packing his bag the night before", "emailing his teachers", "planning study time before tests", "scheduling his own appointments", "doing his own laundry"],
    go: "Build the plan",
    needTask: "Type or pick a job first.",
    built: "Plan built for: {task}.",
    youLabel: "You",
    himLabel: "Him",
    weekWord: "Week",
    stages: [
      { name: "Do it together", you: "Work on {task} together. Say out loud how you think about it, so he hears the steps.", him: "Watches, helps, and asks questions." },
      { name: "He does it, you're nearby", you: "Stay close while he handles {task}. Help only if he asks or gets stuck.", him: "Does it himself, with you nearby." },
      { name: "He does it, you check after", you: "Let him handle {task} on his own. Afterward, ask: \"How did it go? What would you change?\"", him: "Does it alone, then thinks about how it went." },
      { name: "He owns it", you: "Step back. A short weekly check-in is enough. If it slips, solve it together instead of taking it back.", him: "Owns {task} and asks for help when he needs it." }
    ],
    talkTitle: "How to start the conversation",
    talk: "\"I've been handling {task} for you, and I think you're ready to take it over. Here's the plan for the next month. What would help you?\"",
    slipTitle: "If it slips",
    slip: "Expect a few misses. Go back one week in the plan instead of taking the job back completely.",
    editHint: "Every line in the plan can be edited before you print.",
    printBtn: "Print the plan",
    printTitle: "Four-week handoff plan"
  },

  week: "Pick one job and tell your son you're handing it over. Use the planner above, and put the week 3 check-in on your calendar.",

  supports: [
    "Hand off one job at a time.",
    "Agree on what \"done\" looks like before you step back.",
    "Expect a few misses. Treat them as information, not failure.",
    "Check in instead of taking over: \"How's it going with your planner?\"",
    "Notice out loud when he handles it: \"You got that done without me.\""
  ],
  related: { text: "Your son can use the student planners in How to Learn, Module 10", href: "how-to-learn-executive.html" },

  research: {
    intro: "Here is what the research says, and what it does not say.",
    extra: "Coaching works best when your son agrees with the goal. Asking \"What would help you?\" does more than a new rule."
  },

  reflection: [
    "Which job could your son take over this month?",
    "If it went badly for a week, what would that week teach him?"
  ]
};
