/* =========================================================================
   AI PAGE — every word on ai.html ("Using AI in Your College Process") lives in this file.
   (The logic is assets/js/ai.js and the look is assets/css/ai.css.)

   TO EDIT WORDING: change the text between the quotation marks. Keep the quotation marks, commas, and
   braces. To use a quotation mark inside text, write \" instead of ". In text you can use **bold** and
   *italic*.

   THE PROMPT LIBRARY
   • Prompts are grouped by grade: "grades-9-10", "grade-11", "grade-12". Each prompt is one { ... } block.
     To add a prompt, copy a block and paste it after a comma.
   • text is the prompt students copy. [Square brackets] are fill-in blanks. They are highlighted on the
     page and copied as written. A new line in text is a new line in the copied prompt.
   • id is the link anchor (ai.html#decision opens the decision-matrix prompt). Other pages link to the ids
     "decision", "award-letter", "essay-feedback", "activities", "interview-me", and the grade ids,
     so don't rename those.
   • note (shown under the prompt), examples, reminder (a privacy reminder), link, and gold ("reality" puts
     the gold Reality check box right after this prompt) are all optional.
   • A prompt with subprompts shows a group of copyable prompts (used for essay feedback).
   ========================================================================= */

const AI_PAGE = {

  title: "Using AI in Your College Process",
  back: { text: "← Back to College Counseling", href: "college-counseling.html" },
  stage: "College Counseling",
  intro: "AI tools like ChatGPT can help you explore colleges, organize information, brainstorm, and prep for big moments. But **you're the author and the decision-maker.** Use AI to sharpen your own thinking, not to replace it. Colleges want to hear *your* voice, *your* story, and *your* reasons.",
  rule: "**The rule of thumb:** use AI as a *teammate* (it helps you do the work), not a *substitute* (it does the work for you).",

  doDont: {
    title: "Do and Don't",
    doLabel: "Do",
    dontLabel: "Don't",
    cards: [
      { topic: "Brainstorming", do: "Have AI ask you questions to dig up ideas and stories", dont: "Let AI pick your topic or tell you what you care about" },
      { topic: "Writing", do: "Ask for examples or a clearer way to say *your* sentence", dont: "Have AI write your essay, or big chunks of it" },
      { topic: "Editing", do: "Check grammar, spelling, and punctuation", dont: "Polish it so much it stops sounding like you" },
      { topic: "Research", do: "Summarize long articles and explain confusing terms", dont: "Trust facts, stats, or citations without checking them" },
      { topic: "Privacy", do: "Use tools that don't need your personal info", dont: "Paste in your full name, address, student ID, or anyone else's info" },
      { topic: "Honesty", do: "Tell colleges about AI use when they ask", dont: "Pass off AI-written content as your own" }
    ]
  },

  rules: {
    title: "Four rules that never change",
    items: [
      "**Check everything.** AI can sound confident and still be wrong, especially about deadlines, admit rates, costs, and links. Click every link before you trust it.",
      "**Protect your privacy.** No names, addresses, IDs, or details about other people.",
      "**Save your drafts** at each stage, so you can show how your work and ideas developed.",
      "**Know the line.** The Common App treats submitting AI-generated content as your own work as fraud. Some colleges also have their own AI policies, so read them."
    ]
  },

  youGoFirst: {
    title: "How to use it: you go first",
    youLabel: "You",
    aiLabel: "AI",
    rows: [
      { you: "Brainstorm and draft on your own first", ai: "Builds an outline from your ideas" },
      { you: "Reflect on the values you want to show", ai: "Asks you questions, one at a time" },
      { you: "Pick the story that shows those values", ai: "Gives feedback and takeaways" },
      { you: "Paste in *your* writing for feedback", ai: "Offers suggestions, not rewrites" },
      { you: "Edit so it sounds like you", ai: "" }
    ],
    after: "Before you submit anything, get feedback from a person who knows you: your counselor or an English teacher.",
    tipsTitle: "Prompting tips",
    tips: "Be specific. Don't ask for too much at once. Ask for what you need. Read AI's feedback critically, and only use suggestions that make your work more *you*."
  },

  reality: {
    title: "Reality check",
    text: "AI's guesses about your chances of getting in aren't reliable. For a better read, check your chances in **SCOIR**, which uses your GPA and test scores. Then talk it through with your counselor and look at Moeller's Popular Colleges data.",
    link: { text: "Moeller's Popular Colleges", href: "popular-colleges.html" }
  },

  library: {
    title: "Prompt library",
    intro: "Each prompt is a card with a Copy prompt button. Text in [brackets] is a blank for you to fill in.",
    copy: "Copy prompt",
    copied: "Copied!",
    copyFailed: "Press and hold to select the prompt, then copy it.",
    clickEvery: "Click every link to make sure it's real.",
    resumeReminder: "Before pasting your resume, remove your full name, address, phone number, and email.",
    groups: [

      // ================= GRADES 9-10 =================
      {
        id: "grades-9-10",
        label: "Grades 9–10",
        intro: "Follow each AI tool's age requirements and Moeller's technology policy.",
        prompts: [
          {
            id: "quiz-me", title: "Quiz me (study helper)",
            text: "I'm studying [topic] for [class]. Ask me 10 questions about it, one at a time. Wait for my answer each time, tell me if I'm right, and explain what I missed. At the end, tell me which ideas I should review.",
            note: "This is retrieval practice, one of the study strategies from Freshman Foundations."
          },
          {
            id: "explore-majors", title: "Explore majors",
            text: "You are an expert high school college counselor with 20 years of experience. I am a high school student exploring college majors that fit my interests and skills.\n\nAsk me questions one at a time to understand my personal interests, my strengths and skills, possible career goals, and how I like to learn and work. If my answers aren't thorough, ask follow-up questions. Before you finish, ask me if there's anything else important you haven't asked.\n\nThen give me a bulleted list of 5 majors that fit me. For each one, include: an overview, possible career paths, why it fits my interests, and colleges that offer it from three groups: admit rate below 30%, 30–60%, and above 60% (at least one from each). Include links to each college's page for that major.\n\nYou go first. Ask me one question at a time.",
            checkLinks: true
          }
        ]
      },

      // ================= GRADE 11 =================
      {
        id: "grade-11",
        label: "Grade 11",
        prompts: [
          {
            id: "quick-list", title: "Quick college list",
            text: "Please produce a list of colleges and universities within 4 hours of 45242 for a student with a [GPA] GPA who is interested in [major or interest]."
          },
          {
            id: "starter-list", title: "Build a starter college list", byline: "adapted from Jeff Neill's prompt",
            text: "You are an expert high school college counselor with 20 years of experience. I am a high school student developing an initial college list.\n\nI'm involved in these activities: [your activities]. I want to study [major or \"I'm undecided\"]. I have a weighted GPA of [GPA] on a 4.0 scale, and I scored [score] on the [SAT/ACT] (or \"I haven't tested yet\").\n\nAsk me 15 questions, one at a time, to understand my preferences: region, affordability, majors and programs, campus setting, size, and diversity. If my answers aren't thorough, ask follow-ups. Before you finish, ask if there's anything else important to my search.\n\nThen sort schools into LIKELY, TARGET, and REACH. Any school with an acceptance rate under 20% is always a REACH, no matter my profile.\n\nGive me a bulleted list of 11 colleges: 4 LIKELY, 4 TARGET, and 3 REACH, in that order, each labeled in parentheses. For each one, include the city and state, why it fits my criteria, its national admit rate, specific majors and programs that match my interests (with links when possible), and a link to a virtual tour.\n\nYou go first. Ask me one question at a time.",
            checkLinks: true,
            reality: true
          },
          {
            id: "visit-trip", title: "Plan a college visit trip",
            text: "I'm a high school junior from Cincinnati, Ohio, planning college visits on [dates]. I want to visit [colleges]. Build a day-by-day itinerary that includes drive times, official tour and information session times (tell me to confirm and register on each college's website), time to explore campus on my own, and meals. Keep each day realistic."
          },
          {
            id: "compare-colleges", title: "Compare colleges",
            text: "Compare [College A] and [College B] for a student interested in [major or interests]. Put it in a table covering: size, setting, cost of attendance, programs in my major, co-op or internship opportunities, and campus life. Then list 3 questions I should ask each school on a visit. Remind me to verify the numbers on each college's website."
          },
          {
            id: "interview-me", title: "Interview me (brainstorming)",
            text: "Ask me questions about my [interest, activity, job, or value], one at a time. Wait for my answer before asking the next question. Help me find specific moments and stories I could use in a college essay. Don't write anything for me. Just help me think.",
            examples: "\"my love for baseball\" · \"my summer job\" · \"my values\" · \"my family\""
          }
        ]
      },

      // ================= GRADE 12 =================
      {
        id: "grade-12",
        label: "Grade 12",
        prompts: [
          {
            id: "activities", title: "Activities section", byline: "inspired by College Essay Guy's BEABIES exercise",
            text: "You are an expert college application specialist, and I'm a high school student working on the Activities section of my Common App. Walk me through the BEABIES exercise for one activity at a time. Ask me one question at a time and wait for my reply.\n\nStart by asking which activity we're working on. Then ask about each of these, one at a time:\n1. What I did, day to day (including tasks outside my official role, and any awards)\n2. Problems I solved (for myself, my team, my school, or my community)\n3. Lessons I learned and skills I developed\n4. The impact I had on myself, my school, my community, or beyond\n5. How it applies to other parts of my life, and how I might continue it in college\n\nAsk follow-up questions on each before moving on. When we're done, suggest five different 150-character descriptions of this activity, based only on what I told you. Don't invent anything."
          },
          {
            id: "activity-description", title: "Quick activity description",
            text: "I'm a high school student applying to college. Help me write a short resume description for [activity or role, like \"varsity soccer captain\" or \"Environmental Club member\"]. Ask me a few questions first about what I actually did, and don't add anything I didn't tell you.",
            resumeReminder: true
          },
          {
            id: "resume-bullets", title: "Resume bullet points",
            text: "You are an expert resume writer, and I'm a high school student working on my first resume. Help me write bullet points using this structure: \"accomplished X, measured by Y, which resulted in Z.\" Example: \"Grew club membership by 20% by recruiting at freshman orientation.\" Keep each bullet under 50 words. If X, Y, or Z is missing, don't make anything up. Ask me questions one at a time, with example answers, until you have what you need. Keep working on each bullet until I type DONE, then move to the next one. Start by asking about my first activity.",
            resumeReminder: true
          },
          {
            id: "essay-feedback", title: "Essay feedback", byline: "a group of copyable prompts",
            subprompts: [
              { label: "Main message", text: "I'm working on making my main message clear. Does my central idea of [your idea] come through, and does it match the experiences I describe? [paste your essay]" },
              { label: "Transitions", text: "Can you suggest ways to make the transition between these two paragraphs smoother? [paste the paragraphs]" },
              { label: "Impact", text: "I've shared some personal moments. Are they specific and memorable enough? Which ones stand out, and which need more detail? [paste your essay]" },
              { label: "Grammar and word choice", text: "Please point out any grammar, spelling, or word-choice issues in my essay. Don't rewrite it. Just list what to fix. [paste your essay]" },
              { label: "Intro or conclusion", text: "For this college essay draft, suggest a few different ways I could open (or close) it, using only details already in my essay. [paste your essay]" },
              { label: "Overall impression", text: "What's your overall impression of this essay? What are the takeaways about me? What's the tone? Does it sound like a real person? [paste your essay]" },
              { label: "Suggestions, not a rewrite", text: "I'm not looking for a rewrite. Suggest ways I can strengthen this paragraph while keeping my voice. [paste the paragraph]" },
              { label: "Word count", text: "My essay is [number] words and needs to be under [limit]. Point out which sentences or phrases I could cut, but don't rewrite it. [paste your essay]" }
            ]
          },
          {
            id: "timeline", title: "My application timeline", byline: "Moeller's two-week rule",
            text: "I'm a high school senior applying to these colleges (with application round and deadline in parentheses):\n- [College (round, deadline)]\n- [College (round, deadline)]\n\nMoeller's two-week rule says to finish and submit every application two weeks before its deadline. Build me a schedule in a table with these columns: College, Phase, Start Date, Due Date, and Real Deadline. Phases are: Application, Supplemental Essays, Submission. The application takes about [number] days and supplements take about [number] days. I can start on [date]. I can't work on applications during: [practices, games, events]. Make sure every task is in order and every two-week deadline is met."
          },
          {
            id: "interview-prep", title: "Interview prep",
            text: "I'm a high school senior preparing for an interview with an admissions counselor at [college]. I'll paste my resume when you're ready, so you can tailor the questions. Ask me at least 5 interview questions, one at a time. After I've answered all of them, give me feedback on each answer and suggest stronger ways I could have answered.",
            note: "Don't have a resume? Download one from SCOIR using the Activities section you worked on in English last spring. Before pasting, remove your full name, address, phone number, and email."
          },
          {
            id: "interview-research", title: "Research before an interview",
            text: "I'm a high school senior preparing for an interview at [college]. I'll share my interests and activities. Find specific majors, programs, and organizations at [college] that match them, so I can ask good questions. Link to each program's page.",
            checkLinks: true
          },
          {
            id: "decision", title: "Decide between colleges", byline: "decision matrix",
            text: "Turn my decision between [colleges] into a clear decision matrix. My top priorities are [priorities]. Important details: [for example, \"I'm an Ohio resident and will get in-state tuition,\" a scholarship amount, a spot on a team, distance from home]. Point out risks, long-term consequences, and factors I might not be thinking about.",
            link: { before: "Not sure what your priorities are? Try ", text: "\"What do you actually need?\"", href: "seniors.html#decision" }
          },
          {
            id: "major-opportunities", title: "Opportunities in my major",
            text: "I plan to study [major] in college. What are the special opportunities and challenges in this major at [college]?"
          },
          {
            id: "award-letter", title: "Explain my financial aid letter",
            text: "Here's my financial aid award letter from [college], with my personal information removed: [paste]. Explain it in plain language: what's a grant or scholarship (free money), what's a loan (has to be paid back), and what's work-study. Then estimate what my family would actually pay for one year, and list questions I should ask the financial aid office. Remind me to confirm everything with the college.",
            link: { before: "", text: "Financial Aid page: Comparing award letters", href: "financial-aid.html#compare" }
          }
        ]
      }
    ]
  },

  credits: "Thanks to Jeff Neill and Rowland Hall's College Counseling Office for sharing their resources and ideas, and to College Essay Guy for the BEABIES activities exercise."
};
