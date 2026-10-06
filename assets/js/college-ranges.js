/* =========================================================================
   Merges the yearly College Scorecard ranges (assets/data/score-ranges.js)
   into POPULAR_COLLEGES. Load after both data files.
   • Scorecard ranges replace the ACT/SAT ranges in popular-colleges.js; a
     school with no Scorecard value keeps its old range. A school marked
     "useMyRanges": true in popular-colleges.js always keeps its own ranges.
   • Counselor notes, deadlines, and policies are never touched.
   • A tracked school that isn't in popular-colleges.js is added with just its
     ranges (it shows up in the chart and the tracker's "add a college" list).
   ========================================================================= */
(function(){
  if(typeof POPULAR_COLLEGES === 'undefined' || typeof SCORE_RANGES === 'undefined') return;
  const ranges = SCORE_RANGES.colleges || {};
  const key = s => String(s).trim().toLowerCase();
  const byName = new Map(POPULAR_COLLEGES.map(c => [key(c.name), c]));

  function blank(name){
    return {name:name, earlyType:'', plans:[], earlyDeadline:'', regularDeadline:'', stars:'', additional:'',
            act:null, sat:null, testingNotes:'', testingPolicyFull:'', testingPolicy:'', officialScores:'',
            superscore:'', notes:'', link:'', rangeOnly:true};
  }
  function apply(c, which, r){
    if(!r || typeof r.low !== 'number' || typeof r.high !== 'number') return;
    c[which] = {low:r.low, high:r.high, label:r.low + '-' + r.high, nonResident:false};
  }

  Object.keys(ranges).forEach(name => {
    const r = ranges[name];
    let c = byName.get(key(name));
    if(c && c.useMyRanges) return;   // counselor ranges are permanent
    if(!c){
      c = blank(name);
      POPULAR_COLLEGES.push(c);
      byName.set(key(name), c);
    }
    apply(c, 'act', r.act);
    apply(c, 'sat', r.sat);
  });
  POPULAR_COLLEGES.sort((a, b) => a.name.localeCompare(b.name));
})();
