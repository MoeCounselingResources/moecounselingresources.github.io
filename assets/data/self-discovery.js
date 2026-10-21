/* =========================================================================
   SELF-DISCOVERY — every word on self-discovery.html lives in this file.
   (The logic is in assets/js/self-discovery.js and the look is in assets/css/self-discovery.css,
   so you should only ever need to edit this file.)

   HOW THE PAGE IS BUILT
   • There are two tracks: "9-10" (9th & 10th grade) and "11-12" (11th & 12th grade).
   • Each track has an intro and a list of SECTIONS. Each section has a list of EXERCISES.
   • Each exercise has a title, a time estimate, a short "why", and a list of BLOCKS (the things
     a student reads or fills in). Every exercise also gets the "Close it out" box at the end
     automatically (its three prompts are under closeOut, near the top of this file).

   TO EDIT WORDING: change the text between the quotation marks. Keep the quotation marks,
   commas, and braces. To use a quotation mark inside text, write \" instead of ".
   TO ADD AN EXERCISE: copy a whole { id: ..., title: ..., blocks: [...] } block inside a
   section's exercises list, paste it after a comma, and edit it.
   TO REORDER: cut and paste the blocks. The page shows them in the order written here.

   !! IDS ARE SAVED ANSWERS !! Every exercise has an id (like "virtues") and every block inside it
   has an id (like "picks"). Students' saved answers are filed under these ids. If you RENAME an
   id, anything students already saved under the old id disappears (it is not deleted, it just
   stops showing). Change wording freely, but leave ids alone. New exercises and blocks need
   new ids that nobody has used: exercise ids must be unique across BOTH tracks, and block ids
   must be unique within their exercise. Use lowercase letters and numbers only.

   BLOCK TYPES (the "type" of each block)
   • note      plain text.                          { type:"note", text:"..." }
               (Blank lines in text make new paragraphs.)
   • care      the gold "you're not alone" box with the house counselor list.  { type:"care" }
               (Its wording is under care, near the top of this file.)
   • text      one big writing box.                 { type:"text", id:"x", label:"...", hint:"...", rows:4 }
   • list      numbered one-line boxes.             { type:"list", id:"x", label:"...", hint:"...", count:6, addLabel:"Add another" }
   • pick      tappable chips.                      { type:"pick", id:"x", label:"...", options:"virtues", max:3, other:true }
               options can be "virtues" (the list below) or your own list ["A", "B"].
               max is how many can be picked (leave it out for no limit). other:true adds a
               "Something else?" box so a student can add their own.
   • perPick   one writing box for each thing picked in a pick block, so it follows the picks.
               { type:"perPick", id:"x", from:"<id of the pick block>", label:"A specific time I showed {x}" }
               ({x} becomes the picked word, in lowercase.)
   • table     rows and columns.                    { type:"table", id:"x", label:"...", hint:"...",
                 columns:[{key:"a", label:"Role"}, {key:"b", label:"How it's going", options:["Strong","Okay"]}],
                 rows:6, addRow:true }                 ← a set number of rows, plus an "Add a row" button
               or rowLabels:["Monday","Tuesday"] for rows that already have names (no "Add a row").
               When you use rowLabels, the FIRST column is the row name column (only its heading is
               used; students fill in the other columns).
               A column with options becomes a dropdown. Optional: rowPlaceholders:[...] gives
               example text for the first column's boxes.
   • script    fill-in-the-blanks message.          { type:"script", id:"x", label:"...",
                 fields:[{key:"who", label:"Who", placeholder:"..."}],
                 template:"Hi {who}, ..." }            ← {who} is replaced live as the student types
   • link      a link to another page on this site. { type:"link", text:"...", href:"essays.html" }
   ========================================================================= */

const SELF_DISCOVERY = {

  // ---------- Page wording ----------
  title: "Self-Discovery",
  pointer: { text: "Getting ready for essays and college lists?", linkText: "Try Know Yourself.", href: "know-yourself.html" },
  privacy: "Your answers save on this device only. Your counselor can't see them unless you choose to share them. Nothing is ever sent anywhere.",
  footer: "Private and self-paced. Nothing here is graded. Your answers are saved only on this device.",
  saved: "Saved on this device.",
  storageBlocked: "This browser is blocking saving, so your answers will be lost when you close this page. Use \"Download as text\" under My answers to keep a copy.",
  tabsLabel: "Choose your grade level",
  jumpLabel: "Jump to an exercise",
  mapTitle: "Your path",
  summaryTitle: "My answers",
  summaryEmpty: "You haven't answered anything on this track yet. Start with any exercise, and your answers will show up here.",

  // ---------- The gold "care" box (appears wherever a care block is used) ----------
  care: {
    text: "If something you wrote feels heavy, you don't have to carry it alone. Your counselor's door is open, no appointment needed. If you ever feel unsafe or in crisis, call or text 988, any time.",
    detailsTitle: "Find your house counselor"
  },

  // ---------- The navy "Close it out" box at the end of every exercise ----------
  closeOut: {
    tag: "Checkpoint",
    title: "Close it out",
    prompts: [
      { id: "close1", label: "Where did I notice something good about myself?" },
      { id: "close2", label: "What was hard or uncomfortable?" },
      { id: "close3", label: "One small next step" }
    ]
  },

  // ---------- The virtue list used by the pick blocks ----------
  virtues: [
    "Courage", "Honesty", "Loyalty", "Humility", "Patience", "Self-control", "Fairness", "Wisdom", "Faith", "Hope",
    "Charity", "Generosity", "Gratitude", "Kindness", "Respect", "Responsibility", "Forgiveness", "Perseverance", "Humor", "Curiosity",
    "Creativity", "Leadership", "Service", "Family", "Friendship", "Hard work", "Independence", "Excellence", "Adventure", "Peacemaking"
  ],

  tracks: {

    // =====================================================================
    "9-10": {
      label: "9th & 10th grade",
      intro: "Ten short exercises to help you figure out what you care about, what you're good at, and who's in your corner. Nobody grades this. Lists and half-thoughts count.",
      sections: [

        {
          title: "Know yourself",
          exercises: [
            {
              id: "topics", title: "Ten-Minute Topics", minutes: "10 min",
              why: "You know more than you think. Try this: what could you talk about for ten minutes with no notes? The things that come to mind first usually point at what you actually care about.",
              blocks: [
                { type: "list", id: "topics", label: "Eight things I could talk about for ten minutes with no notes", hint: "Examples: a game's storyline, fixing bikes, your grandpa's stories, the Bengals' offense.", count: 8, addLabel: "Add another" },
                { type: "text", id: "surprise", label: "Which of these would surprise people at Moeller? Why don't they know?", rows: 3 },
                { type: "text", id: "learnmore", label: "Which do you want to learn more about this year?", rows: 3 }
              ]
            },
            {
              id: "virtues", title: "Virtue Check", minutes: "20 min",
              why: "Virtues are habits of the heart: the kind of person you are when it counts. Moeller talks about them a lot. Here you pick the ones that sound like you, then back them up with real moments.",
              blocks: [
                { type: "pick", id: "picks", label: "Pick 3 virtues that sound like you on a good day", options: "virtues", max: 3, other: true },
                { type: "perPick", id: "times", from: "picks", label: "A specific time I showed {x}" },
                { type: "pick", id: "grow", label: "Pick 1 virtue you want to grow in", options: "virtues", max: 1, other: true },
                { type: "text", id: "practice", label: "One small way I can practice it this month", rows: 3 }
              ]
            },
            {
              id: "hats", title: "The Hats I Wear", minutes: "15 min",
              why: "You're a lot of things at once. Each role asks something different of you, and some days one hat gets heavy. Naming them helps you see where you're strong and where you're stretched.",
              blocks: [
                { type: "table", id: "roles", label: "My roles",
                  hint: "Examples: son, brother, teammate, student, employee, altar server.",
                  columns: [
                    { key: "role", label: "Role" },
                    { key: "asks", label: "What it asks of me" },
                    { key: "going", label: "How it's going", options: ["Strong", "Okay", "Stretched", "Struggling"] }
                  ],
                  rows: 6, addRow: true },
                { type: "text", id: "unseen", label: "Which role do people at Moeller rarely see?", rows: 3 },
                { type: "text", id: "grow", label: "Which role would you like to grow into?", rows: 3 }
              ]
            },
            {
              id: "frontback", title: "Front Room, Back Room", minutes: "25 min",
              why: "Think of your life as a house. Visitors see the front room. The back room holds your worries, your hopes, and the things you're proud of but don't mention.\n\nGuys often get the message that the back room should stay shut. It doesn't have to. You get to decide who comes in, and what you keep for yourself is fine too.",
              blocks: [
                { type: "list", id: "front", label: "Front room: 5 things people see in me", count: 5, addLabel: "Add another" },
                { type: "list", id: "back", label: "Back room: 5 things people don't usually see", hint: "Worries, hopes, things you're proud of, things you're still figuring out.", count: 5, addLabel: "Add another" },
                { type: "care" },
                { type: "text", id: "strength", label: "One back-room thing that's actually a strength", rows: 3 },
                { type: "text", id: "trust", label: "One person I'd trust with something from the back room", rows: 2 }
              ]
            }
          ]
        },

        {
          title: "Own your path",
          exercises: [
            {
              id: "scoreboard", title: "My Scoreboard", minutes: "15 min",
              why: "A win means something different in each part of your life. Decide what a win looks like for you, and notice whose goal you're really chasing.",
              blocks: [
                { type: "table", id: "board", label: "My scoreboard",
                  columns: [
                    { key: "area", label: "Part of my life" },
                    { key: "win", label: "A win looks like" },
                    { key: "whose", label: "Whose idea is this?", options: ["Mine", "Parents'", "Coach's", "Friends'", "A mix"] }
                  ],
                  rowLabels: ["School", "Faith", "Friendships", "Body and health", "Family", "Something just for me"] },
                { type: "text", id: "matters", label: "Which win matters most to you?", rows: 3 },
                { type: "text", id: "someoneelse", label: "Is anything here really someone else's goal? What do you think about that?", rows: 3 }
              ]
            }
          ]
        },

        {
          title: "Get it done",
          exercises: [
            {
              id: "firstmove", title: "First Move", minutes: "10 min",
              why: "Big things feel heavy because they're one big lump. Break one down, find a first step small enough to do today, and the lump gets a lot lighter.",
              blocks: [
                { type: "text", id: "thing", label: "The big thing hanging over me", rows: 2 },
                { type: "list", id: "steps", label: "Break it into 6 steps", hint: "Rough is fine. Just get the steps in order.", count: 6, addLabel: "Add another step" },
                { type: "text", id: "first", label: "A first move that takes under five minutes", rows: 2 },
                { type: "text", id: "when", label: "When and where I'll do it", rows: 2 }
              ]
            },
            {
              id: "weekplan", title: "Weekly Game Plan", minutes: "15–20 min",
              why: "A good plan isn't packed. It has room for work, for rest, and for the stuff that gets squeezed out. Sketch your week, then watch the film on last week.",
              blocks: [
                { type: "table", id: "week", label: "My week",
                  hint: "Locked in: things that happen no matter what (class, practice, work). Study block: when you'll work. Downtime: when you'll recharge.",
                  columns: [
                    { key: "day", label: "Day" },
                    { key: "locked", label: "Locked in" },
                    { key: "study", label: "Study block" },
                    { key: "down", label: "Downtime" }
                  ],
                  rowLabels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] },
                { type: "text", id: "film", label: "Film session: where did time slip away last week?", rows: 3 },
                { type: "text", id: "change", label: "One change I'll try this week", rows: 2 }
              ]
            }
          ]
        },

        {
          title: "Serve and lead",
          exercises: [
            {
              id: "gifts", title: "Gifts and Needs", minutes: "20 min",
              why: "Service starts where something you're good at meets something other people need. Look at both sides, then see where they overlap.",
              blocks: [
                { type: "list", id: "gifts", label: "6 gifts I have", hint: "Skills, strengths, things you enjoy, ways people count on you.", count: 6, addLabel: "Add another" },
                { type: "list", id: "needs", label: "6 needs I notice", hint: "In your school, parish, neighborhood, or family.", count: 6, addLabel: "Add another" },
                { type: "text", id: "meet", label: "Where do a gift and a need meet?", rows: 4 }
              ]
            },
            {
              id: "beyond", title: "Beyond the Hours", minutes: "20 min",
              why: "Service hours get logged and forgotten. The good part is what happens to you while you're doing it. Take one experience and look at it more closely.",
              blocks: [
                { type: "text", id: "did", label: "What I did", rows: 3 },
                { type: "text", id: "met", label: "Who I met", rows: 3 },
                { type: "text", id: "changed", label: "What changed in me", rows: 3 },
                { type: "text", id: "next", label: "What's next", rows: 3 }
              ]
            }
          ]
        },

        {
          title: "Ask for help",
          exercises: [
            {
              id: "corner", title: "My Corner Team", minutes: "20–25 min",
              why: "Every fighter has people in his corner. Asking for help isn't weakness. It's how strong people get stronger. Figure out who's in yours, and practice the ask.",
              blocks: [
                { type: "table", id: "team", label: "The people in my corner",
                  columns: [
                    { key: "person", label: "Person" },
                    { key: "help", label: "What they can help with" },
                    { key: "reach", label: "How to reach them" }
                  ],
                  rows: 5, addRow: true },
                { type: "pick", id: "hard", label: "What makes asking hard for me?", options: ["I don't want to look weak", "I don't want to bother people", "I'm not sure who to ask", "I'm afraid of the answer", "I think I should handle it alone", "I don't know what to say"], other: true },
                { type: "script", id: "ask", label: "Practice the ask",
                  fields: [
                    { key: "who", label: "Who", placeholder: "who" },
                    { key: "what", label: "What I'm having trouble with", placeholder: "what's going on" },
                    { key: "tried", label: "What I've tried", placeholder: "what I've tried" },
                    { key: "need", label: "What I need", placeholder: "what I need" }
                  ],
                  template: "Hi {who}, do you have a few minutes? I'm having trouble with {what}. I've tried {tried}. Could you help me {need}?" },
                { type: "text", id: "whenask", label: "When I'll make this ask", rows: 2 },
                { type: "care" }
              ]
            }
          ]
        }
      ]
    },

    // =====================================================================
    "11-12": {
      label: "11th & 12th grade",
      intro: "Seven exercises for the years when people start asking you to explain yourself: in essays, interviews, and conversations about what's next. Start anywhere.",
      sections: [

        {
          title: "Know your story",
          exercises: [
            {
              id: "thenandnow", title: "Then and Now", minutes: "15 min",
              why: "You're not the same guy who walked in as a freshman. Seeing how you've changed (and what hasn't) is the start of any good story about yourself.",
              blocks: [
                { type: "table", id: "compare", label: "Freshman year vs. now",
                  columns: [
                    { key: "area", label: "Question" },
                    { key: "then", label: "Freshman year" },
                    { key: "now", label: "Now" }
                  ],
                  rowLabels: ["What I cared about", "What I worried about", "Who my people were", "What I believed about myself", "How I spent free time"] },
                { type: "text", id: "biggest", label: "The biggest change", rows: 3 },
                { type: "text", id: "same", label: "What hasn't changed", rows: 3 }
              ]
            },
            {
              id: "turningpoints", title: "Turning Points", minutes: "20 min",
              why: "Most people's stories turn on a few moments, often small ones. List yours, then dig into one. It might be the start of an essay.",
              blocks: [
                { type: "list", id: "moments", label: "6 moments that changed something for me", hint: "A conversation, a loss, a win, a move, a mistake, a decision.", count: 6, addLabel: "Add another" },
                { type: "text", id: "happened", label: "Pick one. What happened?", rows: 4 },
                { type: "text", id: "did", label: "What did I do?", rows: 3 },
                { type: "text", id: "shows", label: "What does it show about me?", rows: 3 },
                { type: "link", text: "Ready to turn a moment into an essay? Go to Essays", href: "essays.html" }
              ]
            },
            {
              id: "values", title: "Values in Action", minutes: "20 min",
              why: "Saying you value something is easy. Showing it is what counts, and it's what colleges and employers look for. Find the places your values already show up.",
              blocks: [
                { type: "pick", id: "picks", label: "Pick 3 values that matter most to you", options: "virtues", max: 3, other: true },
                { type: "perPick", id: "where", from: "picks", label: "Where {x} shows up in my activities, job, or family life" },
                { type: "text", id: "conflict", label: "A time two of my values pulled against each other. What did I do?", rows: 4 }
              ]
            }
          ]
        },

        {
          title: "Look ahead",
          exercises: [
            {
              id: "paths", title: "Paths Worth Exploring", minutes: "20 min",
              why: "You don't have to know your major, your career, or your whole plan. You just need a few things you're curious about and a cheap way to test them.",
              blocks: [
                { type: "table", id: "paths", label: "Things I'm into and where they might lead",
                  columns: [
                    { key: "into", label: "Something I'm into" },
                    { key: "leads", label: "Field, major, or career it connects to" },
                    { key: "test", label: "One way to test it this year" }
                  ],
                  rows: 4, addRow: true },
                { type: "text", id: "ruleout", label: "One path I'm ruling out, and why", rows: 3 },
                { type: "link", text: "Go to Career Exploration", href: "career-exploration.html" }
              ]
            },
            {
              id: "nextroom", title: "The Next Room", minutes: "15 min",
              why: "After Moeller, you're walking into a new room. Think about what you want to carry in, what you'd rather leave in the hallway, and who'll be with you.",
              blocks: [
                { type: "text", id: "bring", label: "What I want to bring with me after Moeller", rows: 3 },
                { type: "text", id: "leave", label: "What I want to leave behind", rows: 3 },
                { type: "text", id: "nervous", label: "What I'm nervous about", rows: 3 },
                { type: "text", id: "corner", label: "Who will be in my corner next year?", rows: 3 }
              ]
            }
          ]
        },

        {
          title: "Lead and ask",
          exercises: [
            {
              id: "leaveit", title: "Leave It Better", minutes: "15 min",
              why: "Somebody made a difference for you. Now it's your turn to do that for the guys coming up behind you.",
              blocks: [
                { type: "text", id: "someone", label: "Someone who made a difference for me, and what they did", rows: 4 },
                { type: "text", id: "told", label: "What I wish I'd been told as a freshman", rows: 3 },
                { type: "text", id: "better", label: "One way I can leave my team or class better", rows: 3 }
              ]
            },
            {
              id: "biggerask", title: "The Bigger Ask", minutes: "20 min",
              why: "Letters, shadowing, references, advice. The people who help you most are the ones you ask. Pick one ask, and make it easy for them to say yes.",
              blocks: [
                { type: "pick", id: "kind", label: "What kind of ask is this?", options: ["A recommendation letter", "A job shadow", "A reference", "Advice on a big decision", "Something personal"], max: 1 },
                { type: "script", id: "ask", label: "Write the ask",
                  fields: [
                    { key: "who", label: "Who", placeholder: "who" },
                    { key: "why", label: "Why them", placeholder: "why I'm asking you" },
                    { key: "need", label: "What I need", placeholder: "what I need" },
                    { key: "when", label: "By when", placeholder: "by when" }
                  ],
                  template: "Hi {who}, I'm asking you because {why}. Would you be able to {need}? It would help to have it by {when}. Thank you for considering it." },
                { type: "text", id: "followup", label: "How I'll follow up and say thank you", rows: 3 }
              ]
            }
          ]
        }
      ]
    }
  }
};
