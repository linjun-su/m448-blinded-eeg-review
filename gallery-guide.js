/* Presentation only. Existing EEG assets, counts and alarm labels are unchanged. */
const SOURCE_GUIDES = {
  A01: {role:'Finding — compare A02',file:'chb02 / chb02_29.edf',seconds:'3094–3096',relative:'−16 to −14 s',pair:'A02',group:1,
    look:'FP1–F7 (row 1): 102 consecutive zero codes (~0.40 s) within this excerpt, extending to its right edge. Other checked channels also exceed EDF header-declared limits; this alone does not prove clipping.',
    question:'Could the constant segment reflect acquisition or export processing? Which intervals remain interpretable?'},
  A02: {role:'Comparison for A01 — not another confirmed abnormality',file:'chb02 / chb02_29.edf',seconds:'2974–2976',relative:'−16 to −14 s',pair:'A01',group:1,
    look:'FP1–F7 (row 1), 120 s before A01. Longest repeated value: 4 samples; longest zero-code run: 1 sample. No comparable long zero run in this excerpt.',
    question:'What distinguishes this excerpt from A01? This comparison is not a certified normal EEG.'},
  A03: {role:'Finding — compare A04',file:'chb04 / chb04_28.edf',seconds:'2685–2687',relative:'−15 to −13 s',pair:'A04',group:3,
    look:'P4–O2 (row 2) and P8–O2 (row 6): 485 and 446 consecutive zero codes (~1.89 / 1.74 s). Both are flat from the left edge, then change near the right edge. Other channels still vary.',
    question:'How would you interpret these channel-specific constant segments? Is more recording context or acquisition information needed?'},
  A04: {role:'Comparison for A03 — smooth does not mean zero',file:'chb04 / chb04_28.edf',seconds:'4857–4859',relative:'−13 to −11 s',pair:'A03',group:1,
    look:'P7–O1 (row 4): longest repeated value 5 samples; zero-code run 2 samples. This is a later, different-lead morphology comparison, not a matched same-channel normal control.',
    question:'Is this rounded / smooth activity different from the constant segments in A03? Do not infer a model effect from the pair.'},
  A05: {role:'Additional finding — no paired control here',file:'chb13 / chb13_58.edf',seconds:'3352.5–3354.5',relative:'−57.5 to −55.5 s',pair:null,group:1,
    look:'Across all 18 leads, 12 have zero-code runs of 21–97 samples (~0.08–0.38 s) in this excerpt. The first six leads are shown here; all three groups are available below. Do not expect the whole EEG to be flat.',
    question:'Are these brief constant portions synchronous across channels? What could explain them, and what remains uncertain?'}
};
function renderGuide(c) {
  const $ = id => document.getElementById(id), g = SOURCE_GUIDES[c.case_id];
  $('guideTitle').textContent = c.case_id + ' · ' + g.role;
  $('guideSource').textContent = 'Source: ' + g.file + ' · ' + g.seconds + ' s from EDF start · viewer: ' + g.relative;
  $('guideLook').textContent = 'Look here: ' + g.look;
  $('guideQuestion').textContent = 'Question: ' + g.question;
  const nav = [];
  for (const [label, ids] of [['Pair 1', ['A01','A02']], ['Pair 2', ['A03','A04']], ['Additional', ['A05']]]) {
    const span = document.createElement('span');span.style.marginRight='18px';span.textContent=label+'  ';
    for (const id of ids) {
      const button=document.createElement('button');button.type='button';
      button.textContent=id+(['A02','A04'].includes(id)?' · comparison':' · finding');
      button.disabled=id===c.case_id;button.onclick=()=>setCase(DATA.cases.findIndex(v=>v.case_id===id));span.appendChild(button);
    } nav.push(span);
  }
  $('pairNavigation').replaceChildren(...nav);
  const ids = g.pair ? (['A02','A04'].includes(c.case_id) ? [g.pair,c.case_id] : [c.case_id,g.pair]) : [c.case_id];
  $('pairEvidence').replaceChildren(...ids.map(id=>{
    const info=SOURCE_GUIDES[id],figure=document.createElement('figure');figure.style.margin='0';
    const caption=document.createElement('figcaption');caption.textContent=id+' · '+info.role+' | '+info.file+' | '+info.relative+' | '+info.look;
    const a=document.createElement('a');a.href='native/'+id+'_'+info.group+'.png';a.target='_blank';a.rel='noopener';
    const img=document.createElement('img');img.src=a.href;img.alt=caption.textContent;img.style.width='100%';a.appendChild(img);
    figure.appendChild(caption);figure.appendChild(a);return figure;
  }));
  $('title').textContent=c.case_id+' · '+g.role;
  $('questionPrompt').textContent='Source review — no true/false decision required';
  for (const option of $('case').options) {const item=DATA.cases[Number(option.value)];if(item)option.textContent=item.case_id+' · '+SOURCE_GUIDES[item.case_id].role;}
}
