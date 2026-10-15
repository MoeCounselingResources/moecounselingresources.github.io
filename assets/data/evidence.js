/* =========================================================================
   EVIDENCE LEDGER — the ONLY place a research claim, its evidence label, and its sources live.
   Every How to Learn page draws its "What the research says" box and the Sources page from this file,
   so a claim and its source can never drift apart. Add NO source that is not already approved by the
   counseling team, and use the links exactly as written.

   Labels (fixed): "Strong", "Moderate", "Mixed", "Not supported".
     • Strong  = many studies and reviews agree.   • Moderate = good support with real limits.
     • Mixed   = studies disagree or effects are small.   • Not supported = tested, and it did not hold up.
   Source types: "meta-analysis", "review", "RCT", "replication", "observational study", "guidance", "summary".
   typeNeedsCheck: true marks a type the editor should double-check against the paper itself.

   Each entry:  id, topic (short name), label, plain (one plain-language sentence, the "bottom line"),
   says (2–3 sentences for students: what is and isn't known), cautions (things we must NOT claim),
   sources [{ title, type, url, typeNeedsCheck? }], lastReviewed (YYYY-MM-DD).
   ========================================================================= */

const EVIDENCE_LABELS = ["Strong", "Moderate", "Mixed", "Not supported"];
const EVIDENCE_LAST_REVIEWED = "2026-10-15";

const EVIDENCE = {

  brain: {
    topic: "How your brain learns",
    label: "Strong",
    labelNote: "Strong for the basic idea that the brain keeps changing with experience. Be careful with popular explanations of how.",
    plain: "The brain keeps changing with experience, but many popular stories about exactly how are simplified.",
    says: "Research supports the idea that the brain keeps changing with experience and practice. Many popular explanations of how it works are simplified, so treat catchy brain facts with some caution.",
    cautions: ["Do not state specific brain-science claims (such as myelin or synapse details) unless they are clearly called simplified.", "Do not say that effort 'creates new brain cells' as a rule."],
    sources: [
      { title: "Howard-Jones 2014, Nature Reviews Neuroscience", type: "review", url: "https://pubmed.ncbi.nlm.nih.gov/25315391/" },
      { title: "Dekker et al. 2012", type: "observational study", url: "https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2012.00429/full", typeNeedsCheck: true }
    ],
    lastReviewed: EVIDENCE_LAST_REVIEWED
  },

  styles: {
    topic: "Learning styles",
    label: "Not supported",
    labelNote: "Not supported: people have preferences, but matching how you study to a 'style' has not been shown to help you learn more.",
    plain: "People have learning preferences, but studying in your preferred style has not been shown to help you learn more.",
    says: "Most people can tell you how they like to learn. Careful tests, though, have not shown that teaching or studying to match a 'style' improves learning. Many versions of the idea have never been properly tested, which is different from being proven wrong.",
    cautions: ["Never say that matching a learning style works.", "Teach the idea as a myth, kindly: preferences are real, style-matching is not supported."],
    sources: [
      { title: "Pashler et al. 2008", type: "review", url: "https://bjorklab.psych.ucla.edu/wp-content/uploads/sites/13/2016/07/Pashler_McDaniel_Rohrer_Bjork_2009_PSPI.pdf" }
    ],
    lastReviewed: EVIDENCE_LAST_REVIEWED
  },

  illusions: {
    topic: "Illusions of knowing",
    label: "Strong",
    labelNote: "Strong: feeling fluent is not the same as knowing, and testing yourself is the best check.",
    plain: "Feeling like you know something is not the same as knowing it, and testing yourself is the best way to find out.",
    says: "When material feels easy to read, it is tempting to think you have learned it. Studies show these feelings are often wrong, and that trying to recall the material is a better check on what you really know.",
    cautions: ["Do not say that how confident you feel tells you how well you know something."],
    sources: [
      { title: "Bjork, Dunlosky & Kornell 2013", type: "review", url: "https://bjorklab.psych.ucla.edu/wp-content/uploads/sites/13/2016/07/RBjork_Dunlosky_Kornell_2013.pdf" },
      { title: "EEF Metacognition guidance (Education Endowment Foundation)", type: "guidance", url: "https://educationendowmentfoundation.org.uk/education-evidence/guidance-reports/metacognition" }
    ],
    lastReviewed: EVIDENCE_LAST_REVIEWED
  },

  retrieval: {
    topic: "Retrieval practice",
    label: "Strong",
    labelNote: "Strong: many studies, in classrooms and labs, find that recalling information helps you remember it later.",
    plain: "Trying to recall information from memory helps you remember it later.",
    says: "Many studies, some in real classrooms, find that quizzing yourself helps you remember more later. Most of these studies measure memory for facts, so less is known about how much it helps deep understanding. Checking your answers afterward is a sensible step.",
    cautions: ["Most studies measure factual recall; say so. Less is known for deep understanding.", "Do not promise a grade increase."],
    sources: [
      { title: "Agarwal et al. 2021", type: "review", url: "https://pdf.poojaagarwal.com/Agarwal_etal_2021_EDPR.pdf" },
      { title: "Donoghue & Hattie 2021", type: "meta-analysis", url: "https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2021.581216/full" }
    ],
    lastReviewed: EVIDENCE_LAST_REVIEWED
  },

  spacing: {
    topic: "Spacing your practice",
    label: "Strong",
    labelNote: "Strong that spreading study over time beats doing it all at once. There is no single perfect schedule.",
    plain: "Spreading practice over several days works better than cramming it into one sitting.",
    says: "Studies find that people remember more when practice is spread out over time than when the same amount is crammed together. We do not yet know a single best schedule, and few studies were done in real classrooms.",
    cautions: ["Do not state one 'perfect' review schedule.", "Few classroom studies; no clear winner between expanding and even spacing."],
    sources: [
      { title: "Cepeda et al. 2006", type: "review", url: "https://pubmed.ncbi.nlm.nih.gov/16719566/", typeNeedsCheck: true },
      { title: "Latimier et al. 2021", type: "meta-analysis", url: "http://www.lscp.net/persons/ramus/docs/EPR20.pdf" },
      { title: "IES Practice Guide (Institute of Education Sciences)", type: "guidance", url: "https://ies.ed.gov/ncee/wwc/Docs/PracticeGuide/20072004.pdf" }
    ],
    lastReviewed: EVIDENCE_LAST_REVIEWED
  },

  interleaving: {
    topic: "Interleaving and productive struggle",
    label: "Moderate",
    labelNote: "Moderate: some difficulty helps when it is the right kind and comes with feedback or teaching. It helps more for some materials than others.",
    plain: "Mixing up problem types and struggling a little first can help, when you get feedback afterward.",
    says: "Mixing problem types helps more for some subjects, like math, than for others, and it doesn't clearly help with reading. Trying a problem first and then being taught can help too, and this is best supported in high school science, technology, engineering, and math classes.",
    cautions: ["Never say that struggle is always good.", "Interleaving is not clearly helpful for texts."],
    sources: [
      { title: "Brunmair & Richter 2019", type: "meta-analysis", url: "https://www.psychologie.uni-wuerzburg.de/fileadmin/06020400/2019/Brunmair_Richter_in_press__2019_META-ANALYSIS_OF_INTERLEAVED_LEARNING.pdf" },
      { title: "Sinha & Kapur 2021", type: "meta-analysis", url: "https://eric.ed.gov/?id=EJ1308129" }
    ],
    lastReviewed: EVIDENCE_LAST_REVIEWED
  },

  mindset: {
    topic: "Growth mindset",
    label: "Mixed",
    labelNote: "Mixed: a short program modestly helped some students in supportive schools, and average effects across studies are small.",
    plain: "Believing you can improve may help a little in supportive settings, but it works best with real strategies.",
    says: "One large study found that a short mindset program modestly raised grades for students who were struggling, in supportive schools. Across many studies, the average effect is small. Believing you can improve works best when it comes with concrete strategies.",
    cautions: ["Never promise that believing you can improve raises your grades.", "Pair the belief with specific study strategies."],
    sources: [
      { title: "Yeager et al. 2019, Nature", type: "RCT", url: "https://www.nature.com/articles/s41586-019-1466-y" },
      { title: "Sisk et al. 2018", type: "meta-analysis", url: "https://englelab.gatech.edu/articles/2018/Sisk,%20Burgoyne%20et%20al.%20(2018)%20-%20Mindset%20and%20Academic%20Achievement.pdf" }
    ],
    lastReviewed: EVIDENCE_LAST_REVIEWED
  },

  habits: {
    topic: "Building habits",
    label: "Moderate",
    labelNote: "Moderate: doing something in the same place again and again makes it more automatic. How long that takes varies a lot. If-then plans help, with smaller effects than early claims.",
    plain: "Doing something in the same situation again and again makes it more automatic, and how long that takes varies a lot by person.",
    says: "Repeating a behavior in the same setting makes it more automatic over time. How long that takes varies a lot from person to person and from habit to habit. If-then plans can help, mostly when you already want to do the thing.",
    cautions: ["Do NOT say '21 days' or '66 days' as a rule.", "If-then plans have smaller effects than early claims, mainly when motivation is already there."],
    sources: [
      { title: "Lally et al. 2010", type: "observational study", url: "https://onlinelibrary.wiley.com/doi/abs/10.1002/ejsp.674", typeNeedsCheck: true }
    ],
    lastReviewed: EVIDENCE_LAST_REVIEWED
  },

  focus: {
    topic: "Focus and digital distraction",
    label: "Mixed",
    labelNote: "Mixed: keeping your phone out of reach is a reasonable habit, but the claim that a phone nearby drains your brain did not replicate.",
    plain: "Putting your phone out of reach is a low-cost habit, but the evidence on phones and the brain is mixed.",
    says: "Keeping your phone out of reach while you study is a reasonable, low-cost habit. Switching between screens a lot goes with lower performance in some studies, but that doesn't prove one causes the other, and the evidence is mixed. A well-known claim that just having a phone nearby drains your brain did not hold up when other researchers tried to repeat it.",
    cautions: ["Do NOT claim that the mere presence of a phone drains your brain (it did not replicate).", "Evidence on media multitasking is mostly correlational."],
    sources: [
      { title: "Uncapher & Wagner 2018", type: "review", url: "https://pubmed.ncbi.nlm.nih.gov/30275312/" },
      { title: "Ruiz Pardo & Minda 2022 (failed replication)", type: "replication", url: "https://www.sciencedirect.com/science/article/pii/S0001691822002323" }
    ],
    lastReviewed: EVIDENCE_LAST_REVIEWED
  },

  sleep: {
    topic: "Sleep and learning",
    label: "Strong",
    labelNote: "Strong for health. For grades, sleep is related to school performance in a modest but reliable way.",
    plain: "Teens need about 8 to 10 hours of sleep, and sleep is modestly but reliably related to school performance.",
    says: "Teens aged 13 to 18 need about 8 to 10 hours of sleep. Studies find that sleep is related to school performance in a modest but reliable way. The link is modest, and it does not mean sleep alone fixes grades.",
    cautions: ["Strong for health; modest for grades.", "Do not give medical advice."],
    sources: [
      { title: "Dewald et al. 2010", type: "meta-analysis", url: "https://pubmed.ncbi.nlm.nih.gov/20093054/" },
      { title: "Pediatrics 2022 school-start-time meta-analysis", type: "meta-analysis", url: "https://publications.aap.org/pediatrics/article/149/6/e2021054068/188062/School-Start-Times-Sleep-and-Youth-Outcomes-A-Meta" },
      { title: "APA summary (8–10 hours for ages 13–18)", type: "summary", url: "https://www.apa.org/topics/children/school-start-times" }
    ],
    lastReviewed: EVIDENCE_LAST_REVIEWED
  },

  executive: {
    topic: "Executive skills",
    label: "Moderate",
    labelNote: "Moderate: practicing specific skills in context helps. Generic brain-training games do not transfer.",
    plain: "Organization and planning skills improve by practicing them for real, not by playing brain-training games.",
    says: "You get better at planning by practicing it for real. For example, you can use a planner, break big jobs into steps, and keep a homework routine. Brain-training games have not been shown to help with schoolwork. School programs that teach organization help many students with ADHD, though not all, and the effects show up more in parent reports than in teacher reports.",
    cautions: ["Never present this as medical advice.", "Brain-training games do not transfer."],
    sources: [
      { title: "Melby-Lervåg et al. 2016", type: "meta-analysis", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4968033/" },
      { title: "Langberg et al. 2018 (HOPS trial)", type: "RCT", url: "https://pubmed.ncbi.nlm.nih.gov/29172596/", typeNeedsCheck: true },
      { title: "DuPaul et al. 2021", type: "meta-analysis", url: "https://www.sciencedirect.com/science/article/abs/pii/S0022440521000431", typeNeedsCheck: true }
    ],
    lastReviewed: EVIDENCE_LAST_REVIEWED
  }
};
