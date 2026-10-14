/* =========================================================================
   ESSAYS — one shared page for every class (essays.html)
   The Seniors and Juniors pages each have a short "Essays" section that links here.
   Sections: Common App Essay Prompts, Essay Brainstorm (the interactive tool), Essay Writing
   Guide, Essay Writing Tips, and Supplemental Essay Guides (its school list is in essay-guides.js).

   SAVED WORK: the Essay Brainstorm tool saves in each student's browser under the key
   'moeller-essay-brainstorm-v1' (EB_KEY in engine.js). Don't change that key, or students'
   saved brainstorms will disappear. Nothing else on this page saves anything.
   ========================================================================= */

YEARS.essays = {
  hub: "college",
  label: "Essays",
  blurb: "Everything for the college essay in one place, for every grade: the Common App prompts, a brainstorming tool, a step-by-step writing guide, tips, and school-by-school supplemental essay guides.",
  layout: "indexed",
  order: ["essayPrompts","essayBrainstorm","montage","writingGuide","essays","essayGuides"],
  pointer: {text: "Thinking about using AI to brainstorm or get feedback on a draft?", linkText: "Read the ground rules first.", url: "ai.html#essay-feedback"},
  sections: {
      essayBrainstorm: {
        navLabel: "Essay Brainstorm",
        title: "Essay Brainstorm",
        note: "Saves on your device",
        type: "essayBrainstorm",
        desc: "Not sure which prompt to pick or what to write about? Answer a few quick questions, collect your ideas, and leave with a mind map and topic ideas to bring to your counselor or English teacher. This is for brainstorming, not writing.",
        // Each option lists the Common App prompt numbers (1-7) it points to; [] = none.
        quiz: [
          {q:"When friends come to you, it's usually because…", options:[
            {t:"You know a lot about something", p:[6]},
            {t:"You've been through something hard and get it", p:[2]},
            {t:"You'll say so when you disagree", p:[3]},
            {t:"You notice when someone needs help or thanks", p:[4]}]},
          {q:"Which sounds most like a story you'd tell?", options:[
            {t:"The time I failed and figured it out", p:[2]},
            {t:"The day I realized I'd been wrong", p:[3]},
            {t:"A moment I suddenly saw myself differently", p:[5]},
            {t:"Where I come from and why it matters", p:[1]}]},
          {q:"You lose track of time when you're…", options:[
            {t:"Going down a rabbit hole on a topic", p:[6]},
            {t:"With your family, community, or traditions", p:[1]},
            {t:"Working toward a goal", p:[5]},
            {t:"Debating ideas", p:[3]}]},
          {q:"What doesn't your application show yet?", options:[
            {t:"Part of my identity or background", p:[1]},
            {t:"A challenge that shaped me", p:[2]},
            {t:"An interest I pursue on my own", p:[6]},
            {t:"Something that doesn't fit any category", p:[7]}]},
          {q:"Someone surprised you by…", options:[
            {t:"Helping when they didn't have to", p:[4]},
            {t:"Challenging what I believed", p:[3]},
            {t:"Trusting me with something big", p:[5]},
            {t:"Nothing comes to mind", p:[]}]},
          {q:"Have you already written something you're proud of, like a class or scholarship essay, that says something real about you?", options:[
            {t:"Yes", p:[7]},
            {t:"No", p:[]}]},
          {q:"What do you most want a reader to take away?", options:[
            {t:"I bounce back", p:[2]},
            {t:"I'm curious", p:[6]},
            {t:"I think for myself", p:[3]},
            {t:"I'm grateful and give back", p:[4]},
            {t:"I know where I'm from", p:[1]},
            {t:"I've grown", p:[5]}]}
        ],
        values: ["Adventure","Belonging","Community","Creativity","Curiosity","Faith","Fairness","Family","Friendship","Growth","Honesty","Humor","Independence","Justice","Kindness","Leadership","Learning","Loyalty","Patience","Perseverance","Responsibility","Service","Teamwork","Tradition"],
        reflections: [
          {label:"An object that says something about you", hint:"A few words is enough"},
          {label:"A place that feels like yours", hint:"A few words is enough"},
          {label:"Something you do that no one asks you to", hint:"A few words is enough"},
          {label:"A topic you could talk about for an hour", hint:"A few words is enough"},
          {label:"A moment you'd replay, good or hard", hint:"A few words is enough"},
          {label:"Someone who changed how you see things", hint:"A few words is enough"},
          {label:"Three words your friends would use for you", hint:"A few words is enough"}
        ]
      ,
        linksTitle: "Start with these exercises",
        links: [
          {text: "What role do you play?", url: "know-yourself.html#roles"},
          {text: "I love / I know", url: "know-yourself.html#loveknow"},
          {text: "Your top 3 values", url: "know-yourself.html#values"},
          {text: "What fires you up?", url: "know-yourself.html#fires"}
        ]
      },
      montage: {
        navLabel: "One Thread, Many Moments",
        title: "One thread, many moments (the montage essay)",
        note: "Saves on your device",
        type: "exercise",
        exercise: "montage"
      },
      writingGuide: {
        navLabel: "Essay Writing Guide",
        title: "Essay Writing Guide",
        note: "Start here",
        desc: "A step-by-step guide to the Common App personal essay, from finding your material to the final read-through.",
        stacked: true,
        items: [
          {
            title:"How to Write Your Personal Essay",
            desc:"Step through the process at your own pace.",
            miniGuide: {
              steps: [
                {icon:"profile", title:"What the Essay Is For", bullets:[
                  "Colleges already have your grades, scores, and activities. The essay is the one place they hear from you directly.",
                  "They're reading for what you care about, how you think, and who you'd be on their campus.",
                  "A small, true story told well beats a big, impressive one told in general terms."
                ]},
                {icon:"checklist", title:"Find Your Material", bullets:[
                  "Start with values, not topics. Pick a few words for what matters most to you.",
                  "List specific details from your life, like objects, places, routines, and things you do without being asked.",
                  "Use the Essay Brainstorm in the index to turn those into topic ideas and a mind map."
                ]},
                {icon:"link", title:"Pick a Shape", bullets:[
                  "One story: something happened, you responded, and you changed. This works well for challenges and turning points.",
                  "Several moments: a few smaller examples connected by one thread, like a value or an object. This works well if nothing \u201cbig\u201d has happened to you, which is normal.",
                  "There's no right shape, only the one that fits your story."
                ]},
                {icon:"pen", title:"Write a First Draft", bullets:[
                  "Get it all down before you edit. Going over 650 words is fine for now.",
                  "Use details only you would know, like a name, a sound, or what someone said.",
                  "After each moment, say what it meant to you. That reflection is what readers remember.",
                  "Write the way you talk when you're being thoughtful. Skip the thesaurus."
                ]},
                {icon:"pen", title:"Revise", bullets:[
                  "Is every paragraph about you, not someone else?",
                  "Does each moment show something you value?",
                  "Could another student have written this? If so, add details only you know.",
                  "Cut it to 650 words, and remove anything that repeats your activities list."
                ]},
                {icon:"checklist", title:"Final Pass", bullets:[
                  "Read it out loud.",
                  "Get feedback from one or two trusted readers, not a committee.",
                  "Run through the Personal Statement Checklist in Essay Writing Tips."
                ]}
              ]
            }
          }
        ],
        resourcesHeading: "Go deeper",
        resources: [
          {title:"Free Guide to the Personal Statement", desc:"College Essay Guy's free exercises and examples for the personal essay.", url:"https://www.collegeessayguy.com/personal-statement-resources", source:"College Essay Guy", kind:""},
          {title:"College Essay Brainstorming Worksheet", desc:"QuestBridge's printable worksheet for reflecting, choosing a topic, and outlining.", url:"https://asset.questbridge.org/content/uploads/pdfs/College-Essay-Brainstorming-Worksheet.pdf", source:"QuestBridge", kind:"PDF"},
          {title:"Values-Focused Brainstorming Exercises", desc:"Four exercises for finding what you value and showing it with real examples.", url:"https://www.collegeessayguy.com/blog/4-values-focused-college-essay-topic-brainstorming", source:"College Essay Guy", kind:""}
        ]
      },
      essays: {
        navLabel: "Essay Writing Tips",
        title: "Essay Writing Tips",
        note: "Final pass",
        desc: "Tips for tightening what you've already drafted, not starting from scratch.",
        stacked: true,
        items: [
          {title:"Personal Statement Checklist", desc:"Run through this before you submit.", bullets:[
            "It answers the prompt you chose and stays between 250 and 650 words.",
            "It's about you. Someone who knows you would recognize your voice.",
            "It shows a specific moment or detail instead of summing yourself up.",
            "It doesn't repeat your activities list or transcript.",
            "You read it out loud, and someone you trust has read it.",
            "You pasted it into Common App and checked the preview for formatting."
          ]},
          {title:"Supplemental Essay Tracker", desc:"Use the Essays tab in the Application Tracker to list each college's prompts, word limits, and progress. It saves on your device.", url:"app-tracker.html"},
          {title:"Essay Writing Resources", desc:"Moeller's step-by-step guide, from finding your material to the final pass.", url:"#writingGuide"},
          {title:"Activities Writing Resources", desc:"How to choose what to list, what each box asks for, and how to say a lot in 150 characters.", url:"seniors.html#activities"},
          {title:"Asking for a Final Read", desc:"How to ask a teacher for feedback the right way.", bullets:[
            "Ask a teacher who knows your writing.",
            "Ask at least 3 to 4 weeks before your deadline.",
            "Share an editable copy with comments turned on.",
            "Tell them what you want feedback on, like \u201cDoes the ending land?\u201d",
            "Thank them, and let them know how it turned out."
          ]}
        ]
      },
      essayPrompts: {
        navLabel: "Common App Essay Prompts",
        title: "Common App Essay Prompts",
        note: "Pick one",
        desc: "Your Common App essay answers one of seven prompts, in 250 to 650 words. It's your chance to show colleges something about you beyond courses, grades, and test scores. Here's a short take on each prompt, with questions to get you thinking.",
        type: "essayPrompts",
        prompts: [
          {title:"Background, identity, interest, or talent", summary:"Share something so meaningful to you that your application would feel incomplete without it.",
            think:["Your community, family, culture, and where you come from","What you're curious about and how you spend your time","People and experiences that shaped you"],
            ask:["What's missing from the rest of my application?","What would help a college understand who I am?"]},
          {title:"A challenge, setback, or failure", summary:"Tell about a time something went wrong, how it affected you, and what you learned.",
            think:["Obstacles of any size, personal or bigger than you","Hard things your family or friends went through that touched you too","Challenges you're still working through"],
            ask:["How did I cope, and how did I grow?","Who helped me?"]},
          {title:"Questioning a belief or idea", summary:"Reflect on a time you challenged a belief or idea, what led you to it, and how it turned out.",
            think:["Anywhere you spend time: school, team, work, home, place of worship","Anyone you interact with: friends, teammates, family, teachers, coaches"],
            ask:["Did it clarify or change what I value?","How did it affect my relationships?","Did I surprise myself or anyone else?"]},
          {title:"Unexpected gratitude", summary:"Reflect on something someone did for you that made you thankful in a surprising way, and how it has motivated you since.",
            think:["Every kind of interaction: advice, support, a gift, even criticism","People who know you well and people who don't"],
            ask:["What made it surprising?","How did I feel, and how did I respond?"]},
          {title:"A moment of personal growth", summary:"Describe an accomplishment, event, or realization that helped you understand yourself or others in a new way.",
            think:["Achievements others saw and ones only you know about","Small, everyday moments that hit hard","Times you surprised yourself with what you learned"],
            ask:["How did I change?","How can I keep growing, and share what I learned?"]},
          {title:"Something you get lost in", summary:"Describe a topic or idea so engaging you lose track of time, why it grabs you, and where you go to learn more.",
            think:["How you spend your free time","Your hobbies and favorite classes","What you read, write, and make"],
            ask:["How did this interest start?","What does it say about me, to others and to myself?"]},
          {title:"Topic of your choice", summary:"Write about anything. It can be an essay you've already written, one that answers a different prompt, or one you design yourself.",
            think:["What you want to share, not what you think colleges want to hear","Topics that show who you are and what matters to you"],
            ask:["Does this tell my colleges something new?","Is anything important left unsaid in my application?"]}
        ],
        promptNote: "These are short summaries. Read each prompt's exact wording in Common App's guide below or in the Writing section of the application before you choose.",
        resources: [
          {title:"Telling Your Story: How to Approach the Essay", desc:"Common App's guide to all seven prompts, with the full wording and brainstorming questions for each.", url:"https://www.commonapp.org/static/ff69a4ea4ce044fe419826e26803aa65/Resource_FY_Essays_ENG_2025.06.25_0.pdf", source:"Common App"}
        ]
      },
      essayGuides: {
        navLabel: "Supplemental Essay Guides",
        title: "Supplemental Essay Guides",
        note: "School by school",
        type: "essayGuides",
        desc: "Many colleges ask for their own short essays on top of your Common App essay. Find your school below for a how-to guide with that school's prompts, strategy, and example essays.",
        tips: [
          "Open the Writing Supplement in the Common App for each school on your list first, so you know exactly which prompts you owe.",
          "Start with your earliest deadline, and look for prompts you can answer with one strong story, adjusted for each school.",
          "“Why us?” essays need specifics: a class, a program, a professor, something you saw on a visit. If a sentence could apply to any college, cut it."
        ]
      }
  }
};
