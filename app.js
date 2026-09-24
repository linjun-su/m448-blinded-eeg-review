'use strict';
const $=id=>document.getElementById(id), STORE='m678-expert-review-r01-20260923';
let M,mode='blind',idx=0,token=0,wave=null,asset=null,dirty=false;
let db={version:STORE,notes:[],galleryExposure:[],created:new Date().toISOString()};
try{const old=localStorage.getItem(STORE);if(old)db=JSON.parse(old);}catch(e){$('storage').textContent='Browser storage unavailable. Export notes before leaving. '+e.message;}
const list=()=>mode==='blind'?M.cases:M.gallery, current=()=>list()[idx];
const savedPre=()=>db.notes.some(n=>n.mode==='blind'&&n.id===current().id&&n.side==='pre');
function persist(){try{localStorage.setItem(STORE,JSON.stringify(db));return true;}catch(e){$('storage').textContent='Could not save in browser. Export now: '+e.message;return false;}}
function clearPlot(){const c=$('eeg'),x=c.getContext('2d');x.clearRect(0,0,c.width,c.height);}
function limits(){const lo=mode==='anomaly'?-120:($('side').value==='pre'?-60:0),hi=mode==='anomaly'?60:($('side').value==='pre'?0:20);return [lo,hi];}
function draw(){
 if(!wave||!asset)return;
 const dur=Number($('duration').value),[lo,hi]=limits();
 let start=Number($('start').value);if(!Number.isFinite(start))start=lo;
 start=Math.min(Math.max(start,lo),hi-dur);$('start').value=start;
 const chosen=$('group').value,leads=chosen==='all'?M.leads.map((_,i)=>i):Array.from({length:6},(_,i)=>Number(chosen)+i);
 const c=$('eeg');c.height=leads.length===18?1100:650;const ctx=c.getContext('2d');ctx.fillStyle='white';ctx.fillRect(0,0,c.width,c.height);
 const left=100,right=c.width-25,top=45,bottom=c.height-65,step=(bottom-top)/leads.length,spacing=Number($('scale').value),sy=step/spacing;
 ctx.font='14px Arial';ctx.lineWidth=1;
 for(let k=0;k<=10;k++){const x=left+(right-left)*k/10;ctx.strokeStyle='#e6e6e6';ctx.beginPath();ctx.moveTo(x,top-10);ctx.lineTo(x,bottom+10);ctx.stroke();ctx.fillStyle='#444';ctx.fillText((start+dur*k/10).toFixed(1),x-12,bottom+35);}
 const a=Math.max(0,Math.round((start-asset.start)*M.fs)),b=Math.min(asset.samples,Math.round((start+dur-asset.start)*M.fs));
 for(let row=0;row<leads.length;row++){
  const lead=leads[row],base=top+(row+.5)*step,offset=lead*asset.samples;let mean=0,count=0;
  for(let i=a;i<b;i++){const v=wave[offset+i];if(Number.isFinite(v)){mean+=v;count++;}}
  mean=$('center').checked&&count?mean/count:0;
  ctx.fillStyle='#333';ctx.fillText(M.leads[lead],5,base+4);ctx.strokeStyle='#ddd';ctx.beginPath();ctx.moveTo(left,base);ctx.lineTo(right,base);ctx.stroke();
  ctx.save();ctx.beginPath();ctx.rect(left,top-10,right-left,bottom-top+20);ctx.clip();ctx.strokeStyle='#242424';ctx.lineWidth=.65;ctx.beginPath();let connected=false;
  for(let i=a;i<b;i++){const v=wave[offset+i];if(!Number.isFinite(v)){connected=false;continue;}const x=left+((asset.start+i/M.fs-start)/dur)*(right-left),y=base-(v-mean)*sy;if(connected)ctx.lineTo(x,y);else ctx.moveTo(x,y);connected=true;}ctx.stroke();ctx.restore();
  if(!count){ctx.fillStyle='#777';ctx.fillText('No observed samples',left+20,base);}
 }
 if(start<=0&&start+dur>=0){const x=left+(-start/dur)*(right-left);ctx.strokeStyle='#777';ctx.setLineDash([5,4]);ctx.beginPath();ctx.moveTo(x,top);ctx.lineTo(x,bottom);ctx.stroke();ctx.setLineDash([]);}
 ctx.fillStyle='#333';ctx.fillText('Seconds relative to anchor (not seizure onset)',left,bottom+57);
 const cal=spacing/2;ctx.strokeStyle='#333';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(right-80,top+5);ctx.lineTo(right-80,top+5+cal*sy);ctx.stroke();ctx.fillText(cal+' µV',right-72,top+18);
 $('viewlabel').textContent=`${current().id} · ${start} to ${start+dur} s · 256 Hz · no filtering · ${$('center').checked?'constant visible-interval mean removed':'absolute calibrated values'} · ${mode==='anomaly'||$('side').value==='post'?'RETROSPECTIVE CONTEXT — unavailable at the anchor':'PRE-ANCHOR'}`;
}
async function load(){
 const t=++token;wave=null;asset=null;clearPlot();$('saved').textContent='';
 const c=current();$('side').disabled=mode==='anomaly';$('side').options[1].disabled=mode==='blind'&&!savedPre();
 if(mode==='blind'&&$('side').value==='post'&&!savedPre())$('side').value='pre';
 const p=mode==='anomaly'?c.raw:c[$('side').value];$('status').textContent='Loading '+c.id+'…';
 try{
  const r=await fetch(p.url);if(!r.ok)throw Error('HTTP '+r.status);const packed=await r.arrayBuffer();
  const digest=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',packed)),v=>v.toString(16).padStart(2,'0')).join('');if(digest!==p.sha256)throw Error('Asset hash mismatch');
  const stream=new Blob([packed]).stream().pipeThrough(new DecompressionStream('gzip'));const buf=await new Response(stream).arrayBuffer();
  if(buf.byteLength!==18*p.samples*4)throw Error('Incorrect sample count');if(t!==token)return;
  asset=p;wave=new Float32Array(buf);$('status').textContent=c.id+' · loaded; '+(100*p.observed_fraction).toFixed(1)+'% time support (missing leads may remain blank).';draw();
 }catch(e){if(t===token)$('status').textContent='Cannot load waveform: '+e.message;}
}
function fields(){return {observation:$('observation').value,interpretation:$('interpretation').value,request:$('request').value};}
function save(){
 const f=fields();if(!Object.values(f).some(s=>s.trim())){alert('Please enter an observation or state that the excerpt is uncertain.');return false;}
 db.notes.push({id:current().id,mode,side:mode==='anomaly'?'context':$('side').value,...f,saved:new Date().toISOString(),gallerySeen:db.galleryExposure.length>0,view:{start:Number($('start').value),duration:Number($('duration').value),group:$('group').value,spacing:Number($('scale').value),center:$('center').checked}});
 const ok=persist();dirty=false;$('saved').textContent=ok?'Saved in this browser. Export a backup.':'Saved in memory only — export now.';$('side').options[1].disabled=false;progress();return true;
}
function leave(){return !dirty||confirm('Unsaved notes: leave without saving?');}
function restoreFields(){
 const side=mode==='anomaly'?'context':$('side').value;const n=[...db.notes].reverse().find(n=>n.id===current().id&&n.mode===mode&&n.side===side);
 for(const k of ['observation','interpretation','request'])$(k).value=n?n[k]:'';dirty=false;
}
function progress(){const ids=new Set(db.notes.filter(n=>n.mode===mode).map(n=>n.id));$('progress').textContent=`${idx+1} / ${list().length} · ${ids.size} cases with saved notes`;}
function select(i){idx=i;$('case').value=String(idx);$('side').value='pre';$('start').value=mode==='anomaly'?current().focus:-20;$('duration').value=mode==='anomaly'?'2':'10';
 $('facts').hidden=mode!=='anomaly';if(mode==='anomaly'){const c=current();$('title').textContent=c.title;$('finding').textContent=c.facts;$('question').textContent='Question for reviewer: '+c.question;}
 restoreFields();progress();load();}
function switchMode(m){if(!leave())return;if(m==='anomaly'&&mode!=='anomaly'){
  if(!confirm('This gallery contains interpreted, retrospectively selected examples. Seeing it may reveal or bias overlapping alarm cases. Complete masked review first if independent first-pass opinions are needed. Continue?'))return;
  db.galleryExposure.push(new Date().toISOString());persist();
 }mode=m;$('blind').classList.toggle('active',m==='blind');$('anomaly').classList.toggle('active',m==='anomaly');
 $('scope').textContent=m==='blind'?M.cohort+'. '+M.selection+' Outcomes are withheld. Save PRE observations before viewing POST. Short context is not enough to classify preictal physiology.': 'Source-anomaly gallery: observable findings and matched comparisons. Not a blinded test, not an estimate of anomaly prevalence, and not a validated true/false-alarm rule.';
 $('case').replaceChildren(...list().map((c,i)=>{const o=document.createElement('option');o.value=i;o.textContent=m==='blind'?c.id:c.id+' · '+c.title;return o;}));select(0);
}
$('blind').onclick=()=>switchMode('blind');$('anomaly').onclick=()=>switchMode('anomaly');$('case').onchange=()=>{const i=Number($('case').value);if(leave())select(i);else $('case').value=idx;};
$('prev').onclick=()=>{if(leave())select((idx+list().length-1)%list().length);};$('next').onclick=()=>{if(leave())select((idx+1)%list().length);};
$('side').onchange=()=>{if(!leave()){$('side').value=$('side').value==='pre'?'post':'pre';return;}if($('side').value==='post'&&!savedPre()){$('side').value='pre';return;}$('start').value=$('side').value==='pre'?-20:0;restoreFields();load();};
for(const id of ['duration','start','group','scale','center'])$(id).onchange=draw;
$('back').onclick=()=>{$('start').value=Number($('start').value)-Number($('duration').value);draw();};$('forward').onclick=()=>{$('start').value=Number($('start').value)+Number($('duration').value);draw();};
$('focus').onclick=()=>{$('start').value=current().focus;$('duration').value='2';draw();};$('save').onclick=save;
for(const id of ['observation','interpretation','request'])$(id).oninput=()=>{dirty=true;};
$('export').onclick=()=>{const b=new Blob([JSON.stringify({...db,exported:new Date().toISOString(),unsavedDraft:dirty?{id:current().id,mode,side:$('side').value,...fields()}:null},null,2)],{type:'application/json'}),url=URL.createObjectURL(b),a=document.createElement('a');a.href=url;a.download='M678-review-'+new Date().toISOString().replaceAll(':','-')+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),5000);};
$('import').onchange=async e=>{try{const f=e.target.files[0];if(!f)return;const v=JSON.parse(await f.text());if(v.version!==STORE||!Array.isArray(v.notes))throw Error('Wrong review version');const known=new Set(db.notes.map(n=>JSON.stringify(n)));for(const n of v.notes){if(!n||!['blind','anomaly'].includes(n.mode)||!['observation','interpretation','request'].every(k=>typeof n[k]==='string')||!(n.mode==='blind'?M.cases:M.gallery).some(c=>c.id===n.id))throw Error('Invalid note');if(!known.has(JSON.stringify(n)))db.notes.push(n);}db.galleryExposure=[...new Set([...db.galleryExposure,...(v.galleryExposure||[])])];persist();restoreFields();progress();alert('Imported notes; existing saved notes retained.');}catch(e){alert('Import failed: '+e.message);}};
window.addEventListener('beforeunload',e=>{if(dirty){e.preventDefault();e.returnValue='';}});
fetch('manifest.json').then(r=>{if(!r.ok)throw Error(r.status);return r.json();}).then(m=>{M=m;switchMode('blind');}).catch(e=>{$('status').textContent='Manifest unavailable: '+e.message;});
