/* =========================================================================
   COURSE LIST for the GPA and Honor Roll Calculators.
   One course per line:   Department|Course name|Levels|Credits
   • Levels (first one listed is the default, except CP1 is preferred when offered):
       CP2, L1 (CP1 Level 1 math), CP1, H (Honors), HP (Honors Plus), AP, CCP, PF (pass/fail)
     Separate several levels with commas, e.g.  English|English I|CP2,CP1,H|1
   • Credits: 1 for a full-year course, 0.5 for a semester course.
   Update this list each year from the Curriculum Guide. Order here = order in the menu.
   ========================================================================= */
const MOELLER_COURSES = `
Religion|Religion I|CP1|1
Religion|Religion II|CP1|1
Religion|Religion III|CP1|1
Religion|Philosophy of Religion|H|1
Religion|Religion IV: Community Service|CP1|0.5
Religion|Religion IV: Religious Themes in Fiction|H|0.5
Religion|Religion IV: Spirituality|CP1|0.5
Religion|World Religions|CP1|0.5
Religion|Catholic Teaching in the Contemporary World|CP1|0.5
English|English I|CP2,CP1,H|1
English|English II|CP2,CP1,H|1
English|English II Honors: AP Seminar|AP|1
English|English III|CP2,CP1|1
English|AP English Language and Composition|AP|1
English|AP English Literature and Composition|AP|1
English|English IV: Comedy and Satire|CP1|0.5
English|English IV: Contemporary Fiction|CP1|0.5
English|English IV: Contemporary Poetry|CP1|0.5
English|English IV: Creative Writing|CP1|0.5
English|English IV: Cultural Criticism|CP1|0.5
English|English IV: Epic Fantasy and Myth|CP1|0.5
English|English IV: Gothic and Horror Literature|CP1|0.5
English|English IV: Journalism|CP1|0.5
English|English IV: Offbeat American Literature|CP1|0.5
English|English IV: Postmodern Literature (Vonnegut and Friends)|CP1|0.5
English|English IV: Science Fiction and Science Practice|CP1|0.5
English|English IV: Sports Writing and Analysis|CP1|0.5
English|Humanities|CP1|0.5
English|Philosophy and Literature|CP1|0.5
English|Historical Foundations in Education CCP|CCP|0.5
English|Negotiations and Advanced Rhetoric|H|0.5
English|Oral Communications|CP1|0.5
English|Yearbook I / II|CP1|0.5
English|Global Scholars: Capstone Experience|H|0.5
Mathematics|Algebra I|CP2,L1,CP1,H|1
Mathematics|Geometry|CP2,L1,CP1,H|1
Mathematics|Algebra II|CP2,L1|1
Mathematics|Algebra II and Trigonometry|CP1,H|1
Mathematics|Trigonometry|L1|1
Mathematics|College Algebra|CP2|1
Mathematics|Pre-Calculus|CP1|1
Mathematics|Pre-Calculus BC|H|1
Mathematics|Calculus|CP1|1
Mathematics|AP Calculus AB|AP|1
Mathematics|AP Calculus BC|AP|1
Mathematics|AP Statistics|AP|1
Mathematics|Mathematical Modeling|H|0.5
Mathematics|Statistical Reasoning in Sports|CP1|0.5
Mathematics|Multivariable Calculus CCP|CCP|0.5
Mathematics|Ordinary Differential Equations CCP|CCP|0.5
Science|Biology|CP2,CP1,H|1
Science|Chemistry|CP2,CP1,H|1
Science|Physics|CP1|1
Science|Earth Science|CP2|1
Science|Anatomy and Physiology|CP1|1
Science|AP Biology|AP|1
Science|AP Chemistry|AP|1
Science|AP Environmental Science|AP|1
Science|AP Physics 1|AP|1
Science|AP Physics C|AP|1
Science|Foundations of Engineering Design Thinking I CCP|CCP|0.5
Science|Foundations of Engineering Design Thinking II CCP|CCP|0.5
Science|Molecular Biology Research Course|HP|1
Social Studies|U.S. History|CP2,CP1|1
Social Studies|AP U.S. History|AP|1
Social Studies|World History|CP2,CP1|1
Social Studies|AP Modern World History|AP|1
Social Studies|U.S. Government and Politics|CP1|0.5
Social Studies|AP U.S. Government and Politics|AP|1
Social Studies|American Civil War|CP1|0.5
Social Studies|Cincinnati History|CP1|0.5
Social Studies|European History CCP|CCP|0.5
Social Studies|History of World War II|H|0.5
Social Studies|Holocaust and Genocide Studies|H|0.5
Social Studies|AP Human Geography|AP|0.5
Social Studies|Psychology|CP1|0.5
Social Studies|AP Psychology|AP|1
Social Studies|Sociology|CP1|0.5
Social Studies|AP Art History|AP|1
World Languages|French I|CP1|1
World Languages|French II|CP1|1
World Languages|French III|H|1
World Languages|French IV/V|H|1
World Languages|AP French Language and Culture|AP|1
World Languages|German I|CP1|1
World Languages|German II|CP1|1
World Languages|German III|H|1
World Languages|German IV/V|H|1
World Languages|AP German Language and Culture|AP|1
World Languages|Latin I|CP1|1
World Languages|Latin II|CP1|1
World Languages|Latin III|H|1
World Languages|Latin IV|H|1
World Languages|AP Latin|AP|1
World Languages|Latin V|HP|1
World Languages|Spanish I|CP1|1
World Languages|Spanish II|CP1,CP2|1
World Languages|Spanish III|H|1
World Languages|Spanish IV/V|H|1
World Languages|AP Spanish Language and Culture|AP|1
The Arts|Band – Instrumental|H|1.5
The Arts|Band – Percussion|H|1.5
The Arts|Beginning Instrumental Music|CP1|0.5
The Arts|Chorus I|CP1|1
The Arts|Chorus II / III / IV|CP1|1
The Arts|Men's Chorus I–IV|CP1|1
The Arts|Men's Vocal Ensemble|H|1
The Arts|Varsity Singers|H|1
The Arts|Guitar I / II|CP1|0.5
The Arts|Music Technology|CP1|0.5
The Arts|Fine Arts Survey|CP1|1
The Arts|Studio Art and Design I|CP1|1
The Arts|Studio Art and Design II|H,CP1|1
The Arts|Digital Design I|CP1|1
The Arts|Photography|CP1|0.5
The Arts|3D Art, Design and Sculpture|CP1|0.5
The Arts|Art and Pop Culture: Design/Branding|CP1|0.5
The Arts|Design Thinking|CP1|0.5
The Arts|Design + Build Lab I|CP1|0.5
The Arts|REALab: Design + Build II|CP1,H|0.5
The Arts|AP 2D Art and Design – Digital|AP|1
The Arts|AP 2D Art and Design – Studio|AP|1
The Arts|AP Drawing|AP|1
Business & Technology|Financial Literacy|CP1|0.5
Business & Technology|Business Applications/Excel|CP1,H|0.5
Business & Technology|Entrepreneurship|CP1|0.5
Business & Technology|Student-Run Business|CP1|1
Business & Technology|Business Leadership|H|1
Business & Technology|REALab: Business|CP1,H|0.5
Business & Technology|Investment Research|H|0.5
Business & Technology|Portfolio Management I|HP,H|0.5
Business & Technology|Portfolio Management II|HP|0.25
Business & Technology|AP Microeconomics|AP|0.5
Business & Technology|Artificial Intelligence: Uses and Applications|CP1|0.5
Business & Technology|Human-Computer Interaction|CP1|0.5
Business & Technology|Robotics|CP1|0.5
Business & Technology|Fundamentals of Information Technology CCP|CCP|0.5
Business & Technology|Fundamentals of Web Development CCP|CCP|0.5
Business & Technology|Computer Programming I CCP|CCP|0.5
Business & Technology|Computer Networking CCP|CCP|0.5
Business & Technology|Database Management CCP|CCP|0.5
Business & Technology|System Administration CCP|CCP|0.5
Business & Technology|Game Design CCP|CCP|0.5
Business & Technology|Moeller Media Production|CP1|0.5
Business & Technology|Advanced Media Production|CP1|0.5
Business & Technology|Podcasting|CP1|0.5
Business & Technology|Sportscasting|CP1|0.5
Health & PE|Health and Wellness|CP1|0.5
Health & PE|Physical Education I / II|CP1|0.5
Health & PE|Recreational Fitness for Life I / II|PF|0.5
Health & PE|Sports Management|CP1|0.5
Student Support|Academic Development I–IV|CP2|1
Student Support|Reading Workshop|CP2|1
Student Support|Marianist Community Development I|PF|1
Student Support|Marianist Community Development II|CP1|1
Other|MoeTerm|PF|0.25
`;
