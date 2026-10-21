/* =========================================================================
   PARENT GUIDE 2: THE LEARNING SPACE — all wording for pe-learning-space.html.
   (Logic: assets/js/parent-education.js. Research claims and sources come from assets/data/pe-evidence.js.)
   The "scenarios" tool: each option has kind "rescue", "coach", or "away", the text, and feedback.
   There is no score. The kind names are in "kinds".
   TO EDIT WORDING: change the text between the quotation marks; keep quotation marks, commas, braces.
   ========================================================================= */

const PE_MODULE = {
  id: "struggle",
  n: 2,
  title: "The learning space: why frustration is part of learning",
  evidence: ["learningSpace", "difficulties"],
  prev: "role",
  next: "coach",

  hook: "It's 9:30 at night. He's stuck on a chemistry problem and getting louder. You could show him how to do it in two minutes, or look it up in thirty seconds. Everyone would feel better right away.",

  quick: {
    question: "What do you usually do when he's frustrated?",
    options: [
      { text: "I fix it, because I can't stand watching him struggle.", fix: "That's a loving instinct. The catch is that fixing it ends the struggle before he learns he can get through it. Try staying close and coaching instead." },
      { text: "I tell him to stop complaining and figure it out.", fix: "Expecting him to work through it is right. A few words that name the feeling, like \"This is frustrating,\" help him stay with it instead of shutting down." },
      { text: "I can't help anyway. I don't remember this stuff.", fix: "Good news: you don't need to. Your job isn't to know chemistry. It's to help him handle the frustration and find his next step." },
      { text: "He gives up the second it gets hard.", fix: "Some teens have had little practice staying with frustration. Start small: one more try, a short timer, then a plan for who to ask." }
    ]
  },

  idea: {
    text: "Dr. Becky Kennedy, a clinical psychologist, calls the space between not knowing something and knowing it the learning space. The feeling that comes with it is frustration. In her view, frustration isn't a sign that something is wrong; it's what learning feels like. When adults rush to remove the frustration, students lose the chance to watch themselves get through something hard, which is where confidence comes from. Memory research points the same way: practice that feels harder in the moment often lasts longer. There's one important limit. The struggle has to be something he can work through, with help if he needs it.",
    exampleLabel: "Everyday example",
    example: "Instead of \"Here, let me show you,\" try: \"This one's frustrating. That's what it feels like right before it clicks. What's the first thing you'd try?\""
  },

  try: {
    type: "scenarios",
    title: "Try it: rescue, coach, or step away?",
    intro: "Read each situation and pick what you'd most likely do. There's no score. Each answer explains what it teaches him.",
    kinds: { rescue: "Rescue", coach: "Coach", away: "Step away" },
    situationWord: "Situation",
    scenarios: [
      { situation: "He's stuck on a math problem and says, \"I don't get any of this.\"", options: [
        { kind: "rescue", text: "Sit down and work the problem for him so he can see how it's done.", feedback: "He finishes faster, but he learns that when it gets hard, someone else takes over." },
        { kind: "coach", text: "Say, \"That's frustrating. Which part do you get? Start there, and tell me where it stops making sense.\"", feedback: "You name the feeling and shrink the problem. He does the thinking." },
        { kind: "away", text: "Say, \"You'll figure it out,\" and leave the room.", feedback: "Confidence is good, but with no next step, a frustrated teen often just stops. Pair confidence with a place to start." }
      ]},
      { situation: "He forgot his project at home and texts you to bring it to school.", options: [
        { kind: "rescue", text: "Drop everything and bring it.", feedback: "The project gets turned in. The lesson about packing the night before gets lost." },
        { kind: "coach", text: "Reply, \"I can't bring it today. What can you do about it? Maybe talk to your teacher.\"", feedback: "He faces a small consequence and practices talking with an adult. This kind of failure is cheap now and much more expensive in college." },
        { kind: "away", text: "Don't reply.", feedback: "Silence can feel like punishment. A short, kind \"no\" with a nudge toward a plan teaches more." }
      ]},
      { situation: "He got a D on a test and he's upset.", options: [
        { kind: "rescue", text: "Email the teacher to ask about a retake or extra credit.", feedback: "Something may get fixed, but he misses the chance to speak up for himself, and the teacher hears from you instead of him." },
        { kind: "coach", text: "Say, \"That's disappointing. What do you think happened? What would you do differently?\" Then ask if he wants to talk to his teacher.", feedback: "You keep the focus on what he can control and leave the next step with him." },
        { kind: "away", text: "Say, \"Well, you should have studied.\"", feedback: "It may be true, but it adds shame to disappointment. He's more likely to hide the next bad grade." }
      ]},
      { situation: "Three weeks into the season, he wants to quit the team because he isn't starting.", options: [
        { kind: "rescue", text: "Let him quit right away so he isn't unhappy.", feedback: "Quitting can be the right call, but quitting the moment it gets hard can mean leaving the learning space before anything is learned." },
        { kind: "coach", text: "Say, \"Not starting is hard. Let's finish the season, then decide.\" Ask what he could work on in practice.", feedback: "He learns to stay with discomfort for a set time, and the final choice is still his." },
        { kind: "away", text: "Say, \"We don't quit in this family,\" and end the conversation.", feedback: "Holding a line can be fine, but ending the talk means you won't hear what's really going on." }
      ]},
      { situation: "He's nervous about asking his teacher a question after class.", options: [
        { kind: "rescue", text: "Email the teacher the question yourself.", feedback: "The question gets answered. The worry about talking to adults stays." },
        { kind: "coach", text: "Help him plan his first sentence: \"Want to practice what you'd say?\"", feedback: "You make the hard thing smaller without doing it for him." },
        { kind: "away", text: "Tell him it's no big deal and drop it.", feedback: "To him, it is a big deal. Brushing it off can feel like you don't understand." }
      ]}
    ],
    patternTitle: "The pattern",
    pattern: "The coaching answers have three parts: name the feeling, show you believe he can handle it, and point to a small next step. You don't need to know the material to do any of them."
  },

  week: "Once this week, when your son is frustrated, name the feeling and say you believe he can handle it. Then wait two full minutes before offering any help.",

  supports: [
    "\"This is hard. You can do hard things.\"",
    "\"That's what learning feels like.\"",
    "\"What's one small thing you could try?\"",
    "\"Let's make the first step smaller.\"",
    "\"Take a ten-minute break, then come back to it.\"",
    "\"Who could you ask tomorrow?\""
  ],

  research: {
    intro: "Here is what the research says, and what it does not say.",
    extra: "Struggle helps only when it's the right size. If he's stuck for a long time, the next step is help, not more struggle. Guide 6 covers how to tell the difference."
  },

  reflection: [
    "What do you usually do in the first minute after your son gets frustrated?",
    "What's one hard thing he got through on his own this year? Did you tell him you noticed?"
  ]
};
