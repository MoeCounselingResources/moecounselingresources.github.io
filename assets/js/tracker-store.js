/* =========================================================================
   APP TRACKER STORAGE — saves a student's tracker in THIS browser only
   (localStorage). Nothing is sent anywhere. Used by app-tracker.html and
   by the "Add to my App Tracker" button on popular-colleges.html.
   ========================================================================= */

const TRACKER_KEY = 'moeller-app-tracker-v1';

function trackerUid(){
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function trackerDefaults(){
  return {
    colleges: [],
    essays: [
      {id: trackerUid(), college: 'Common App', deadline: '', platform: 'Common App', prompt: 'Main Personal Statement', limit: '650 words', progress: 'Not started', notes: ''},
      {id: trackerUid(), college: 'Common App', deadline: '', platform: 'Common App', prompt: 'Common App Activities List', limit: '150 characters each', progress: 'Not started', notes: ''},
      {id: trackerUid(), college: 'Common App', deadline: '', platform: 'Common App', prompt: 'Additional Information (if needed)', limit: '650 words', progress: 'Not started', notes: ''}
    ],
    activities: [],
    updated: null
  };
}

function trackerLoad(){
  try{
    const raw = localStorage.getItem(TRACKER_KEY);
    if(!raw) return trackerDefaults();
    const data = JSON.parse(raw);
    const base = trackerDefaults();
    return {
      colleges: Array.isArray(data.colleges) ? data.colleges : [],
      essays: Array.isArray(data.essays) ? data.essays : base.essays,
      activities: Array.isArray(data.activities) ? data.activities : [],
      updated: data.updated || null
    };
  }catch(e){
    return trackerDefaults();
  }
}

function trackerSave(data){
  try{
    data.updated = new Date().toISOString();
    localStorage.setItem(TRACKER_KEY, JSON.stringify(data));
    return true;
  }catch(e){
    return false;
  }
}

function trackerBlankCollege(name){
  return {
    id: trackerUid(), name: name || 'New college', status: 'Researching',
    major: '', gpa: '', testRange: '', fit: '', acceptance: '',
    appType: '', deadlineType: '', deadline: '', deadlineNote: '',
    srar: '', recs: '', transcript: '', testingRequired: '', testPlan: '',
    special: '', aidApps: '', aidDeadlines: '', scholarships: '',
    notes: '', link: '',
    checks: {}
  };
}

/* Build a college entry, pre-filled from the Moeller Popular Colleges data when it matches. */
function trackerCollegeFromName(name){
  const c = trackerBlankCollege(name);
  const list = (typeof POPULAR_COLLEGES !== 'undefined') ? POPULAR_COLLEGES : [];
  const p = list.find(x => x.name.toLowerCase() === String(name).trim().toLowerCase());
  if(!p) return c;
  c.name = p.name;
  const ranges = [];
  if(p.act) ranges.push('ACT ' + p.act.label);
  if(p.sat) ranges.push('SAT ' + p.sat.label);
  c.testRange = ranges.join(' / ');
  const dl = [];
  if(p.earlyType) dl.push(p.earlyType + (p.earlyDeadline ? ': ' + p.earlyDeadline : ''));
  if(p.regularDeadline) dl.push('Regular: ' + p.regularDeadline);
  c.deadlineNote = dl.join(' · ');
  c.testingRequired = p.testingPolicyFull || p.testingPolicy || '';
  c.srar = p.stars === 'Yes' ? 'Yes' : (p.stars === 'No' ? 'No' : (p.stars || ''));
  c.special = p.additional || '';
  c.link = p.link || '';
  if(p.notes) c.notes = 'Counselor note: ' + p.notes;
  return c;
}

function trackerHasCollege(data, name){
  return data.colleges.some(c => c.name.toLowerCase() === String(name).trim().toLowerCase());
}
