/* =========================================================================
   EXERCISES — the wording for the seven interactive exercises.
   Know Yourself page (know-yourself.html): exercises 1-4.  Essays page: exercise 5.
   Seniors page: exercises 6 and 7.  (Each page's data file decides where an exercise shows up;
   the logic is assets/js/exercises.js and the look is assets/css/exercises.css.)

   TO EDIT WORDING: change the text between the quotation marks. Keep the quotation marks, commas,
   and braces. To use a quotation mark inside text, write \" instead of ".
   In text you can use **bold** and *italic*.

   !! SAVED ANSWERS !! Each exercise saves in the student's own browser under the key written in its
   "key" line (they all start with moeller-ex-). If you change a key, students' saved answers stop
   showing. The names of roles, values, and other list items are also part of what is saved, so if you
   RENAME an item, a student who already picked it will see it dropped. Adding new items is always safe.
   ========================================================================= */

const EXERCISES = {

  credits: {
    inspired: "Inspired by exercises from College Essay Guy (collegeessayguy.com).",
    murphyjitsu: "Adapted from Murphyjitsu, a planning technique from the Center for Applied Rationality, shared by College Essay Guy."
  },

  // Words used on every exercise
  ui: {
    print: "Print my answers",
    printTitle: "My answers",
    saved: "Saved on this device.",
    blocked: "This browser is blocking saving, so your answers will be lost when you close this page.",
    privacy: "Your answers save on this device only. Nothing is ever sent anywhere.",
    nothing: "Nothing yet."
  },

  // ---------------------------------------------------------------------
  roles: {
    key: "moeller-ex-roles",
    credit: "inspired",
    intro: [
      "Everybody plays roles: on a team, in a friend group, at home. These aren't job titles or activities. They're *how you show up*. Knowing yours helps you choose activities, answer \"Tell me about yourself,\" and find essay topics that sound like you."
    ],
    stepsTitle: "Here's what to do:",
    steps: [
      "Read through the roles below. Tap any role to see what it means.",
      "Pick the 5 that sound most like you. (No wrong answers, and it's OK if some surprise you.)",
      "For each one, write 2–3 real examples of where it shows up in your life."
    ],
    max: 5,
    items: [
      { name: "The Fixer", desc: "You figure out what's broken, whether it's a bike, a laptop, or a plan, and make it work." },
      { name: "The Planner", desc: "You like knowing what's next, and you're the one with the schedule." },
      { name: "The Comedian", desc: "You make people laugh, even when things are tense." },
      { name: "The Competitor", desc: "You love a challenge and hate losing, at anything." },
      { name: "The Mentor", desc: "Younger guys come to you, and you like helping them get better." },
      { name: "The Builder", desc: "You like making things, from projects to teams to ideas." },
      { name: "The Question-Asker", desc: "You always want to know why, and you're not afraid to ask." },
      { name: "The Peacemaker", desc: "When friends argue, you're the one who calms things down and finds middle ground." },
      { name: "The One Who Shows Up", desc: "People can count on you to be there, every time." },
      { name: "The Family Tech Support", desc: "When something won't connect at home, everyone calls you." },
      { name: "The Storyteller", desc: "You can turn anything into a great story." },
      { name: "The Strategist", desc: "You think a few moves ahead, in games and in life." },
      { name: "The Caretaker", desc: "You notice when someone's struggling and step in to help." },
      { name: "The Explorer", desc: "You want to try new places, foods, and ideas." },
      { name: "The Organizer", desc: "You get people and things in order so stuff actually gets done." },
      { name: "The Teammate", desc: "You put the group first and do whatever the team needs." },
      { name: "The Leader", desc: "People look to you to set the direction, and you step up." },
      { name: "The Listener", desc: "People open up to you because you actually listen." },
      { name: "The Tinkerer", desc: "You take things apart just to see how they work." },
      { name: "The Collector", desc: "You dig deep into the stuff you love, like cards, records, or facts." },
      { name: "The Debater", desc: "You love a good argument, and you back it up." },
      { name: "The Coach", desc: "You see what others could be and help them get there." },
      { name: "The Night Owl", desc: "Your best ideas show up after everyone else is asleep." },
      { name: "The Translator", desc: "You help people understand each other, across languages, ages, or ideas." },
      { name: "The Risk-Taker", desc: "You'd rather try and fail than never try." },
      { name: "The Problem-Solver", desc: "Give you a tough problem, and you won't let it go until it's solved." },
      { name: "The Hype Man", desc: "You bring the energy and make everyone around you play or work harder." },
      { name: "The Researcher", desc: "When you're curious, you dig until you really understand." },
      { name: "The Creator", desc: "You make things that didn't exist before: music, videos, art, or designs." },
      { name: "The Quiet Observer", desc: "You notice what other people miss, and you think before you talk." }
    ],
    exampleLabel: "Here's what it can look like:",
    example: "**The Fixer:** rebuilt the brakes on my bike · the guy teammates text when the speaker won't connect · set up my grandpa's new phone",
    writeTitle: "Where does each role show up in your life?",
    placeholder: "Where does this show up? Think about school, sports, home, work, friends, or church.",
    pickedLabel: "picked"
  },

  // ---------------------------------------------------------------------
  loveknow: {
    key: "moeller-ex-loveknow",
    credit: "inspired",
    intro: [
      "No filter, no wrong answers. Just write fast. Weird and specific is good. \"I love football\" is fine, but \"I love the sound of cleats on concrete before a game\" is better."
    ],
    target: 10,
    lists: [
      { id: "love", title: "I love…", label: "Something I love", examples: "the smell of a hockey rink · a close game in the 4th quarter · Sunday dinner at my aunt's · fixing something with my dad · a perfect playlist for a long drive" },
      { id: "know", title: "I know a lot about…", label: "Something I know a lot about", examples: "fantasy football stats · World War II planes · fixing a lawnmower · my grandma's recipes · building a gaming PC · the Reds' starting rotation" }
    ],
    aim: "aim for 10+",
    addLabel: "Add",
    doneLabel: "I'm done",
    starPrompt: "Star 2–3 items that surprised you or that you could talk about for 10 minutes. Those are your strongest essay starters."
  },

  // ---------------------------------------------------------------------
  values: {
    key: "moeller-ex-values",
    credit: "inspired",
    intro: [
      "Values are what matter most to you. They're the stuff you'd stand up for, the reasons behind your choices. When a decision gets hard, they help you figure out what you really want.",
      "**Step 1:** Tap the 10 that matter most to you. **Step 2:** Narrow to 5. **Step 3:** Pick your top 3."
    ],
    rounds: [10, 5, 3],
    roundTitles: ["Step 1: pick 10", "Step 2: narrow to 5", "Step 3: pick your top 3"],
    items: [
      { name: "Faith", desc: "Your relationship with God guides how you live." },
      { name: "Family", desc: "The people at home come first." },
      { name: "Loyalty", desc: "You stick with your people, no matter what." },
      { name: "Honesty", desc: "You tell the truth, even when it's hard." },
      { name: "Courage", desc: "You do the right thing even when you're scared." },
      { name: "Hard work", desc: "You earn it. No shortcuts." },
      { name: "Competition", desc: "You push yourself by testing yourself against others." },
      { name: "Excellence", desc: "If you're going to do it, you do it right." },
      { name: "Independence", desc: "You like making your own decisions and your own way." },
      { name: "Brotherhood", desc: "Having guys you'd do anything for, and who'd do the same for you." },
      { name: "Service", desc: "You find meaning in helping others." },
      { name: "Humor", desc: "Life's better when you can laugh." },
      { name: "Adventure", desc: "You want to see, try, and experience new things." },
      { name: "Creativity", desc: "You like making something new." },
      { name: "Respect", desc: "You treat people well, and expect the same." },
      { name: "Responsibility", desc: "When something's yours to handle, you handle it." },
      { name: "Growth", desc: "You want to keep getting better." },
      { name: "Curiosity", desc: "You want to understand how things work and why." },
      { name: "Leadership", desc: "You step up and help others move forward." },
      { name: "Fairness", desc: "Everyone should get a fair shot." },
      { name: "Health", desc: "You take care of your body and mind." },
      { name: "Balance", desc: "Work hard, but make time for what matters outside of it." },
      { name: "Financial security", desc: "You want stability for yourself and your family." },
      { name: "Tradition", desc: "You value what's been passed down to you." },
      { name: "Purpose", desc: "You want what you do to mean something." },
      { name: "Friendship", desc: "Good friends make everything better." },
      { name: "Discipline", desc: "You do what needs doing, even when you don't feel like it." },
      { name: "Kindness", desc: "You go out of your way to make someone's day better." },
      { name: "Freedom", desc: "You want room to choose your own path." },
      { name: "Making a difference", desc: "You want to leave things better than you found them." }
    ],
    momentsPrompt: "For each of your top 3, write one moment when you lived it.",
    momentsPlaceholder: "A moment when I lived this value…",
    topTitle: "Your top 3"
  },

  // ---------------------------------------------------------------------
  fires: {
    key: "moeller-ex-fires",
    credit: "inspired",
    intro: [
      "Some things you care about a little. Others get you fired up. Knowing the difference helps you choose service projects, activities, even a major, and gives your essays real energy.",
      "**Rate each one:** 1 = 💥 a small spark (meh) → 5 = 🔥 a big blaze (I'd give up a Saturday for this)"
    ],
    groups: [
      { id: "causes", title: "Causes", items: ["Kids who need mentors", "Veterans and military families", "Mental health", "The environment", "Hunger and food access", "Homelessness", "Sports access for kids", "People with disabilities", "Technology access", "Faith and community", "Elder care", "Animal welfare", "Education", "Disaster relief", "Addiction recovery"] },
      { id: "people", title: "People you want to help", items: ["My school", "My neighborhood", "Younger kids", "Guys my age", "Older people", "Veterans", "People with disabilities", "People struggling with mental health", "Immigrant and refugee families", "My parish or faith community", "Small business owners"] }
    ],
    scaleLow: "💥",
    scaleHigh: "🔥",
    resultsTitle: "Your fires 🔥",
    resultsEmpty: "Rate a few things 4 or 5 and your fires will show up here.",
    connectPrompt: "Connect one fire to one of your roles from \"What role do you play?\" For example, a Builder who cares about housing might volunteer with Habitat for Humanity, and a Coach who cares about kids might help run a youth camp.",
    fireLabel: "My fire",
    roleLabel: "My role",
    rolesFromEx1: "Your saved roles from \"What role do you play?\"",
    noRoles: "Want to pick from your roles? Do \"What role do you play?\" first.",
    connectLabel: "How could this fire and this role work together?",
    findOpportunities: "Find opportunities",
    opportunitiesHref: "opportunities.html"
  },

  // ---------------------------------------------------------------------
  montage: {
    key: "moeller-ex-montage",
    credit: "inspired",
    intro: [
      "Not every great essay is one big dramatic story. A montage essay links several small moments with one thread, like beads on a string. The thread can be almost anything, as long as it shows *different sides of you*."
    ],
    stepsTitle: "Steps",
    steps: [
      "Pick 3 threads (or invent your own).",
      "Under each, list 5 moments or memories.",
      "Pick the thread whose moments show the most *different* sides of you. That's your essay."
    ],
    exampleLabel: "Here's what it can look like:",
    example: "**Thread: jobs I've had.** Cutting grass at 12 (I learned to finish what I start) · busing tables (I learned to read people) · coaching a 3rd-grade team (I learned patience) · fixing my neighbor's fence (I learned I like building things)",
    threadsTitle: "Thread ideas",
    threads: ["every team I've played on", "my car", "jobs I've had", "things I've fixed", "my grandpa's toolbox", "what's in my backpack", "the walls of my room", "my playlist", "Sunday dinners", "places I feel at home", "scars and the stories behind them", "things I've changed my mind about", "being the oldest (or youngest) brother", "my bedroom bookshelf", "every pair of cleats I've owned"],
    maxThreads: 3,
    momentSlots: 5,
    writeOwn: "Write your own",
    addLabel: "Add",
    momentLabel: "Moment or memory",
    bestQuestion: "Which thread shows the most different sides of you?",
    nextStep: { text: "Next step: Essay Writing Guide", href: "essays.html#writingGuide" }
  },

  // ---------------------------------------------------------------------
  premortem: {
    key: "moeller-ex-premortem",
    credit: "murphyjitsu",
    intro: [
      "Most plans fail for boring reasons we saw coming. This 10-minute exercise helps you spot them early, while you can still do something about them."
    ],
    steps: [
      { title: "1. Name the plan.", text: "\"All my applications are submitted before Christmas break.\" (Or write your own, like \"My first early action app is in two weeks before its deadline.\")" },
      { title: "2. Fast-forward.", text: "It's January, and your apps aren't in. What happened? Be honest, and be specific.", examples: "My essay was stuck at 400 words for a month · I never asked my teacher for a rec letter · I didn't understand the fee waiver · Football and homework took every weeknight · I kept waiting until I \"felt ready\"" },
      { title: "3. Rate it.", text: "How surprised would you be if that really happened? 1 = not surprised at all → 10 = shocked." },
      { title: "4. Fix one thing this week.", text: "Pick one step that makes that failure less likely, and put it on your calendar *now*.", examples: "\"Essay stuck\" → \"Book a time with my English teacher this Thursday.\"" },
      { title: "Repeat", text: "until you'd be shocked (8 or higher) if the plan failed." }
    ],
    tips: "Get specific. \"I got busy\" is hard to fix, but \"I had practice every night until 7\" isn't. Look for the boring reasons, because that's usually where plans fail.",
    planLabel: "The plan",
    defaultPlan: "All my applications are submitted before Christmas break.",
    roundTitle: "Round",
    happenedLabel: "What happened",
    surpriseLabel: "How surprised would I be? (1–10)",
    fixLabel: "Fix this week",
    dateLabel: "Fix date",
    addRound: "Add a round",
    removeRound: "Remove round",
    calendar: "Add to calendar",
    calendarNeeds: "Add a fix and a date to add it to your calendar.",
    meterLabel: "How surprised I'd be",
    meterGood: "Shocked. That's a plan you can trust.",
    meterKeep: "Keep going: find another boring reason and fix it.",
    links: [
      { text: "Application Checklist", href: "seniors.html#fallChecklist" },
      { text: "App Tracker", href: "app-tracker.html" },
      { text: "App Fee Waivers", href: "seniors.html#feeWaivers" }
    ],
    counselorTitle: "A note for counselors",
    counselorNote: "Run it as a group in a senior meeting. Each guy writes one \"what went wrong\" reason on an index card, sort them together, then each picks one fix for this week. A week or two later, ask the group how surprised they'd be now if their apps weren't in by break."
  },

  // ---------------------------------------------------------------------
  needs: {
    key: "moeller-ex-needs",
    credit: "inspired",
    intro: [
      "When you're torn between two schools or two majors, or you and your parents see things differently, it usually comes down to different *needs*. Naming them makes the choice clearer and the conversations calmer."
    ],
    step1: "Step 1: Pick the 3 needs that matter most to you right now.",
    needs: ["Belonging", "Challenge", "Independence", "Stability", "Financial security", "Close to family", "A fresh start", "Room to grow", "A clear plan", "Faith community", "Adventure", "Feeling respected", "Rest and balance", "Purpose", "Brotherhood", "Opportunity"],
    max: 3,
    step2: "Step 2: Score your options.",
    step2Text: "Add 2–3 options (like a college or major). For each one, rate how well it meets each of your 3 needs, from 1 to 5.",
    optionLabel: "Option",
    optionPlaceholder: "A college or major",
    addOption: "Add an option",
    maxOptions: 3,
    totalLabel: "Total",
    scoreNote: "This is a starting point for a conversation, not a final answer.",
    step3: "Step 3: Talk it through.",
    step3Text: "Ask your parents to pick *their* top 3 for you. Compare. Where do you match? Where are you different?",
    parentButton: "Parent view",
    studentButton: "Back to my view",
    parentTitle: "Parent view",
    parentPrompt: "Parents: pick the 3 needs you think matter most for him right now.",
    compareTitle: "Side by side",
    studentColumn: "His top 3",
    parentColumn: "Parent's top 3",
    shared: "Shared",
    parentTipTitle: "Tip for parents",
    parentTip: "\"You have to apply to ___\" is a strategy. The need underneath might be security, pride, or wanting him close by. Naming the need first usually makes the conversation easier for everyone.",
    links: [
      { text: "AI decision-matrix prompt", href: "ai.html#decision" },
      { text: "Financial Aid: Comparing award letters", href: "financial-aid.html#compare" },
      { text: "Talk with your counselor", href: "#counselor-grid" }
    ]
  }
};
