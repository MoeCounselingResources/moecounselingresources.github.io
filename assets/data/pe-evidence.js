/* =========================================================================
   PARENT GUIDES — EVIDENCE LEDGER. The ONLY place a research claim, its evidence label, and its sources
   live for the Education for Parents pages. Every guide draws its "What the research says" box and the
   Sources page (pe-sources.html) from this file, so a claim and its source can never drift apart.
   COUNSELING TEAM: these sources are new for this section. Approve them before launch (see TODO.md).
   Two sources (Sinha & Kapur 2021, Langberg et al. 2018) are already approved in assets/data/evidence.js.

   Labels (fixed, same as How to Learn): "Strong", "Moderate", "Mixed", "Not supported".
   Source types: "meta-analysis", "review", "RCT", "longitudinal study", "survey study", "guidance", "summary".

   Each entry: topic, label, labelNote, plain (one-sentence bottom line), says (2–4 sentences for parents),
   cautions (things the pages must NOT claim), sources [{ title, type, url }], lastReviewed (YYYY-MM-DD).
   TO EDIT WORDING: change the text between the quotation marks. Keep quotation marks, commas, and braces.
   ========================================================================= */

const PE_EVIDENCE_LAST_REVIEWED = "2026-10-16";

const PE_EVIDENCE = {

  involvement: {
    topic: "What kind of involvement helps",
    label: "Moderate",
    labelNote: "Moderate: a review of 50 studies and a large study of national data agree, but these studies show links, not proof of cause.",
    plain: "In the teen years, talking about goals and expectations is more closely linked to doing well in school than helping with homework.",
    says: "A review of 50 studies found that most kinds of parent involvement were linked to higher achievement in the middle school years. The strongest link was with what researchers call academic socialization: talking about why school matters, connecting it to future plans, and setting expectations while leaving the work to the student. Help with homework was the one kind of involvement not linked to higher achievement. A large study of national data through high school found much the same.",
    cautions: ["These studies show links, not cause. Parents often help more when a student is already struggling, which can make homework help look worse than it is.", "Never say that helping with homework harms students."],
    sources: [
      { title: "Hill & Tyson 2009, Developmental Psychology", type: "meta-analysis", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2782391/" },
      { title: "The Parental Involvement Puzzle (Harvard Graduate School of Education)", type: "summary", url: "https://www.gse.harvard.edu/ideas/usable-knowledge/09/10/parental-involvement-puzzle" },
      { title: "Robinson & Harris 2014, The Broken Compass", type: "longitudinal study", url: "https://www.hup.harvard.edu/books/9780674725102" }
    ],
    lastReviewed: PE_EVIDENCE_LAST_REVIEWED
  },

  autonomy: {
    topic: "Supporting independence",
    label: "Moderate",
    labelNote: "Moderate: many studies agree, but most are surveys, and support from teachers shows a stronger link than support from parents.",
    plain: "Teens tend to be more motivated when adults give real choices and explain their reasons instead of relying on pressure.",
    says: "Research on motivation finds that students are more motivated when the adults around them support their sense of choice, their feeling of being capable, and their connection to others. A review of 144 studies found that parent support for independence was linked to stronger motivation in school, though support from teachers showed the larger link.",
    cautions: ["Supporting independence does not mean having no rules or expectations.", "Surveys show links, not cause."],
    sources: [
      { title: "Bureau et al. 2022, Review of Educational Research", type: "meta-analysis", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8935530/" }
    ],
    lastReviewed: PE_EVIDENCE_LAST_REVIEWED
  },

  learningSpace: {
    topic: "Frustration and the learning space",
    label: "Moderate",
    labelNote: "Moderate: this is a clinical psychologist's way of explaining learning, and it fits the learning research below. It has not been tested as its own program.",
    plain: "Frustration is a normal part of learning something new, and teens build confidence by getting through it.",
    says: "Dr. Becky Kennedy, a clinical psychologist, describes a learning space between not knowing something and knowing it, where the usual feeling is frustration. Her advice is to coach a child through that feeling instead of removing it, because children build confidence by watching themselves get through hard things. This is expert guidance, not a tested treatment. The research on desirable difficulties gives the idea support.",
    cautions: ["Present this as expert guidance, not as a tested program.", "Do not make claims about brain chemistry."],
    sources: [
      { title: "Huberman Lab episode with Dr. Becky Kennedy, 2025", type: "summary", url: "https://www.hubermanlab.com/episode/dr-becky-kennedy-overcoming-guilt-building-tenacity-in-kids-adults" }
    ],
    lastReviewed: PE_EVIDENCE_LAST_REVIEWED
  },

  difficulties: {
    topic: "Desirable difficulties",
    label: "Strong",
    labelNote: "Strong for study methods like spacing and self-testing. Difficulty helps only when the student can work through it, often with feedback.",
    plain: "Learning that feels harder in the moment often lasts longer, as long as the student can get through it.",
    says: "Memory researchers Robert and Elizabeth Bjork found that some ways of studying slow progress in the moment but improve learning over time, such as spreading study out and testing yourself. Their key condition is that the learner must be able to overcome the difficulty. Trying a problem before being taught can also help, when teaching or feedback follows. Struggle that is far beyond a student's current skills does not help.",
    cautions: ["Never say harder is always better.", "Struggle needs feedback or help afterward."],
    sources: [
      { title: "Bjork & Bjork 2011, Making things hard on yourself, but in a good way", type: "review", url: "https://bjorklab.psych.ucla.edu/wp-content/uploads/sites/13/2016/04/EBjork_RBjork_2011.pdf" },
      { title: "Sinha & Kapur 2021", type: "meta-analysis", url: "https://eric.ed.gov/?id=EJ1308129" }
    ],
    lastReviewed: PE_EVIDENCE_LAST_REVIEWED
  },

  skills: {
    topic: "Executive skills in the teen years",
    label: "Moderate",
    labelNote: "Strong that these skills keep developing into the early twenties. Moderate for coaching: practicing in real life helps, and results vary.",
    plain: "Planning and organization skills are still growing through high school, and they grow through real practice.",
    says: "Harvard's Center on the Developing Child describes executive function as skills built through practice, not skills that appear on their own with age, and their growth continues into early adulthood. A trial of an organization-skills program for middle schoolers with ADHD found real gains in organization and homework. Coaching approaches give parents a way to support these skills without doing the work themselves.",
    cautions: ["This is not medical advice.", "Brain-training games do not transfer to schoolwork."],
    sources: [
      { title: "A Guide to Executive Function (Harvard Center on the Developing Child)", type: "guidance", url: "https://developingchild.harvard.edu/resource-guides/guide-executive-function/" },
      { title: "Langberg et al. 2018 (HOPS trial)", type: "RCT", url: "https://pubmed.ncbi.nlm.nih.gov/29172596/" },
      { title: "Guare, Dawson & Guare 2013, Smart but Scattered Teens", type: "guidance", url: "https://www.guilford.com/books/Smart-but-Scattered-Teens/Guare-Dawson-Guare/9781609182298" }
    ],
    lastReviewed: PE_EVIDENCE_LAST_REVIEWED
  },

  overparenting: {
    topic: "Doing too much",
    label: "Moderate",
    labelNote: "Moderate: studies keep finding the same links, but most are surveys of college students, so they show links, not cause. Links to grades are mixed.",
    plain: "Doing things for older teens that they could do themselves is linked to more anxiety and less confidence later.",
    says: "Studies of teens and college students link overparenting, often called helicopter parenting, with more anxiety and depression and with less confidence in their own abilities. A review of this research found these links again and again. Links with grades are less consistent. Most of this parenting comes from love and worry, not from a wish to control.",
    cautions: ["Say 'linked to,' not 'causes.'", "Do not shame parents."],
    sources: [
      { title: "Vigdal & Brønnick 2022, Frontiers in Psychology", type: "review", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9176408/" },
      { title: "Darlow, Norvilitis & Schuetze 2017, Journal of Child and Family Studies", type: "survey study", url: "https://link.springer.com/article/10.1007/s10826-017-0751-3" }
    ],
    lastReviewed: PE_EVIDENCE_LAST_REVIEWED
  },

  accommodation: {
    topic: "Accommodating worry",
    label: "Moderate",
    labelNote: "Moderate: one well-run trial and several smaller studies, mostly with children ages 7 to 14 who have anxiety disorders.",
    plain: "When parents slowly cut back on helping a child avoid his fears, while staying warm and confident, anxiety can go down.",
    says: "Accommodation means the changes parents make to spare a child distress, like answering the same worried question again and again or helping him avoid what he fears. It eases distress in the moment but is linked to worse anxiety over time. In a randomized trial, a program that worked only with parents (SPACE) reduced children's anxiety as much as therapy with the child. Parents worried the relationship would suffer, and it improved.",
    cautions: ["SPACE is a treatment delivered by trained clinicians. These pages explain the idea only.", "Cutting back without warmth can feel like rejection.", "If a student seems depressed or talks about self-harm, get professional help first."],
    sources: [
      { title: "Lebowitz et al. 2020, Journal of the American Academy of Child and Adolescent Psychiatry", type: "RCT", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6732048/" },
      { title: "Treating Anxiety in Kids by Working With Parents (Child Mind Institute)", type: "summary", url: "https://childmind.org/article/treating-anxiety-in-kids-by-working-with-parents/" }
    ],
    lastReviewed: PE_EVIDENCE_LAST_REVIEWED
  },

  pressure: {
    topic: "Achievement pressure",
    label: "Moderate",
    labelNote: "Moderate: findings repeat across several school communities, but they come from surveys, which show links, not cause. Most studies are of wealthier communities.",
    plain: "Students who feel their worth depends on achievement are more likely to struggle, and students who think their parents value kindness as much as grades tend to do well.",
    says: "Studies of students at high-achieving schools find higher-than-average rates of anxiety, depression, and substance use, and researchers now treat heavy pressure to achieve as a risk factor for teens. In one study of 506 sixth graders, students who believed their parents valued kindness as much as or more than achievement had better mental health, and they did at least as well in school. The researchers were clear that encouraging achievement is not the problem; it becomes harmful when it comes across as criticism or crowds out everything else.",
    cautions: ["Never say that caring about grades is bad.", "Surveys show links, not cause."],
    sources: [
      { title: "Luthar, Kumar & Zillmer 2020, American Psychologist", type: "review", url: "https://doi.org/10.1037/amp0000556" },
      { title: "Ciciolla et al. 2017, Journal of Youth and Adolescence", type: "survey study", url: "https://link.springer.com/article/10.1007/s10964-016-0596-x" },
      { title: "Study summary (ASU News)", type: "summary", url: "https://news.asu.edu/20161128-discoveries-parents-should-avoid-pressuring-young-children-over-grades-asu-study-says" }
    ],
    lastReviewed: PE_EVIDENCE_LAST_REVIEWED
  }
};
