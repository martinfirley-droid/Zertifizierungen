document.addEventListener('DOMContentLoaded',()=>{
initFinder();renderCatalog();renderTable();renderChart();renderPaths();initNav();initFadeIn();
});

/* NAV */
function initNav(){
const links=document.querySelectorAll('.nav-link');
const sections=document.querySelectorAll('section');
function update(){
let cur='';
sections.forEach(s=>{if(window.scrollY>=s.offsetTop-80)cur=s.id});
links.forEach(l=>{l.classList.toggle('active',l.getAttribute('href')==='#'+cur)});
}
window.addEventListener('scroll',update,{passive:true});
links.forEach(l=>l.addEventListener('click',e=>{e.preventDefault();
document.querySelector(l.getAttribute('href'))?.scrollIntoView({behavior:'smooth'})}));
}
function initFadeIn(){
const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.1});
document.querySelectorAll('.fade-in').forEach(el=>obs.observe(el));
}

/* FINDER */
let finderState={step:0,career:null,market:null,role:null};
function initFinder(){finderState={step:0,career:null,market:null,role:null};renderFinderStep()}
function goToStep(n){if(n<finderState.step){finderState.step=n;renderFinderStep()}}
function renderFinderStep(){
const dots=document.getElementById('finder-dots');
const content=document.getElementById('finder-content');
const results=document.getElementById('finder-results');
results.innerHTML='';
dots.innerHTML=[1,2,3].map((n,i)=>`<div class="finder-dot ${i<finderState.step?'done':i===finderState.step?'active':''}" ${i<finderState.step?`onclick="goToStep(${i})"`:''} title="${i<finderState.step?'Klick zum Ändern':''}">${i<finderState.step?'✓':n}</div>`).join('');
let bc='';
const clObj=CAREER_LEVELS.find(c=>c.id===finderState.career);
const mkObj=MARKETS.find(m=>m.id===finderState.market);
if(finderState.step>0){
bc='<div class="finder-breadcrumb">';
if(clObj)bc+=`<span>${clObj.label}</span>`;
if(mkObj)bc+=' → <span>'+mkObj.label+'</span>';
bc+='</div>';
}
if(finderState.step===0){content.innerHTML=bc+renderCareerStep()}
else if(finderState.step===1){content.innerHTML=bc+renderBackBtn()+renderMarketStep()}
else if(finderState.step===2){content.innerHTML=bc+renderBackBtn()+renderRoleStep()}
else{content.innerHTML='';showFinderResults(results)}
}
function renderBackBtn(){return `<button class="finder-back" onclick="goToStep(${finderState.step-1})">← Zurück</button>`}
function renderCareerStep(){
return `<div class="finder-step"><h3>Deine aktuelle Karrierestufe bei acterience?</h3><p>Wähle dein Level – die Empfehlung berücksichtigt deine Seniorität.</p><div class="finder-options">${CAREER_LEVELS.map((c,i)=>`<div class="finder-option" style="animation-delay:${i*0.05}s" onclick="selectCareer('${c.id}')"><div><div class="fo-label">${c.label}</div></div></div>`).join('')}</div></div>`;
}
function renderMarketStep(){
return `<div class="finder-step"><h3>In welchem Market arbeitest du vorrangig?</h3><p>Verschiedene Branchen haben unterschiedliche Anforderungen.</p><div class="finder-options">${MARKETS.map((m,i)=>`<div class="finder-option" style="animation-delay:${i*0.05}s" onclick="selectMarket('${m.id}')"><div><div class="fo-label">${m.label}</div></div></div>`).join('')}</div></div>`;
}
function renderRoleStep(){
return `<div class="finder-step"><h3>Welche PM-Rolle beschreibt dich am besten?</h3><p>So finden wir die passendste Zertifizierung für dein Aufgabenprofil.</p><div class="finder-options">${PM_ROLES.map((r,i)=>`<div class="finder-option" style="animation-delay:${i*0.05}s" onclick="selectRole('${r.id}')"><div><div class="fo-label">${r.label}</div></div></div>`).join('')}</div></div>`;
}
function selectCareer(id){finderState.career=id;finderState.step=1;renderFinderStep()}
function selectMarket(id){finderState.market=id;finderState.step=2;renderFinderStep()}
function selectRole(id){finderState.role=id;finderState.step=3;renderFinderStep()}
function showFinderResults(el){
const certIds=getFinderResults(finderState.career,finderState.market,finderState.role);
const certs=certIds.map(id=>CERTIFICATIONS.find(c=>c.id===id)).filter(Boolean);
const cl=CAREER_LEVELS.find(c=>c.id===finderState.career);
const mk=MARKETS.find(m=>m.id===finderState.market);
const rl=PM_ROLES.find(r=>r.id===finderState.role);
const pathMap = {'analyst':'einstieg', 'consultant':'agile-track', 'senior_consultant':'delivery', 'expert':'ki-track', 'manager':'governance', 'senior_expert':'ki-track', 'associate_partner':'governance'};
const pathMatch=DEVELOPMENT_PATHS.find(p=>p.id===pathMap[finderState.career]);
el.innerHTML=`<h3>🎯 Deine Top-Empfehlungen</h3><p class="profile">Basierend auf: ${cl?.label} · ${mk?.label} · ${rl?.label}</p>${certs.map((c,i)=>{
const costHtml = c.bookingOptions ? c.bookingOptions.map(opt => `<span title="${opt.label}">${opt.type==='self'?'📝 Nur Prüfung:':'👨‍🏫 Inkl. Kurs:'} ${opt.priceEur}</span>`).join(' <span style="opacity:0.5; margin:0 4px">|</span> ') : `<span>💰 ${c.costLabel}</span>`;
return `<div class="result-card" onclick="event.preventDefault(); scrollToCert('${c.id}'); const detail=document.getElementById('detail-${c.id}'); if(detail) detail.style.display='block';" style="display:flex; cursor:pointer" title="Zu den Details springen"><div class="result-rank">${i+1}</div><div class="result-info"><h4>${c.name}</h4><p>${c.shortDescription}</p><div class="result-meta" style="margin-top:8px">${costHtml} <span style="opacity:0.5; margin:0 4px">|</span> <span>⏱ ${c.effortWeeks}</span> <span style="opacity:0.5; margin:0 4px">|</span> <span>📊 Relevanz: ${c.relevance}/5</span></div></div></div>`}).join('')}${pathMatch?`<div onclick="event.preventDefault(); document.getElementById('path-${pathMatch.id}').classList.add('open'); document.getElementById('path-${pathMatch.id}').scrollIntoView({behavior:'smooth',block:'center'});" class="result-path" style="display:block; cursor:pointer;" onmouseover="this.style.borderColor='var(--red)'" onmouseout="this.style.borderColor='var(--border)'"><strong>🛤️ Empfohlener Entwicklungspfad: ${pathMatch.title}</strong><p style="color:var(--text-secondary)">${pathMatch.goal}</p><div style="margin-top:8px; font-size:12px; color:var(--red); font-weight:600">Zum Pfad →</div></div>`:''}<button class="finder-reset" onclick="initFinder()">↻ Nochmal starten</button>`;
}

/* CATALOG – grouped by category */
let activeFilters={category:null,recommendation:null};
const REC_ORDER=['musthave','empfohlen','strategisch','spezialrolle','optional'];
function renderCertCard(c){
const cat=CATEGORIES[c.category];const rec=RECOMMENDATION_LEVELS[c.recommendation];
const stars='★'.repeat(c.relevance)+'☆'.repeat(5-c.relevance);
const costLabel=c.bookingOptions.length>1?'ab '+c.bookingOptions[0].priceEur:c.bookingOptions[0].priceEur;
const bookingOptsHtml=c.bookingOptions.map(opt=>`
<div style="margin-top:12px; padding:12px; background:var(--bg); border-radius:var(--radius-md); border:1px solid var(--border)">
<div style="display:flex; justify-content:space-between; align-items:flex-start">
<div><strong style="font-size:13px">${opt.label}</strong><br><span style="font-size:11px; color:var(--text-muted)">Anbieter: ${opt.provider}</span></div>
<div style="text-align:right"><strong style="font-size:13px">${opt.priceEur}</strong><br>${opt.priceUsd?`<span style="font-size:10px; color:var(--text-muted)">${opt.priceUsd}</span>`:''}</div>
</div>
${opt.url?`<a href="${opt.url}" target="_blank" rel="noopener" class="cert-book-btn" style="margin-top:10px; padding:6px 12px; font-size:12px" onclick="event.stopPropagation()">→ ${opt.type==='self'?'Prüfung buchen':'Kurs buchen'}</a>`:''}
</div>`).join('');
return `<div class="cert-card" data-cat="${c.category}" data-rec="${c.recommendation}" id="card-${c.id}" onclick="toggleCert('${c.id}')">
<div class="cert-card-top" style="background:${cat.color}"></div>
<div class="cert-card-body">
<div class="cert-card-header"><h3>${c.name}</h3></div>
<div class="cert-sub">${cat.emoji} ${c.fullName}</div>
<div class="cert-desc">${c.shortDescription}</div>
<div class="cert-metrics">
<div><div class="cert-metric-label">Kosten</div><div class="cert-metric-value">${costLabel}</div></div>
<div><div class="cert-metric-label">Aufwand</div><div class="cert-metric-value">${c.effortWeeks}</div></div>
<div><div class="cert-metric-label">Relevanz</div><div class="cert-metric-value cert-stars">${stars}</div></div>
</div></div>
<div class="cert-detail" id="detail-${c.id}">
<h4>Strategischer Nutzen für acterience</h4>
<ul>${(c.benefits||[]).map(b=>`<li>${b}</li>`).join('')}</ul>
<div class="cert-detail-grid">
<div class="cert-detail-item"><label>Zielgruppe</label><p>${c.targetGroup}</p></div>
${c.recertification?`<div class="cert-detail-item"><label>Rezertifizierung</label><p>${c.recertification}</p></div>`:''}
${c.examDetails?`<div class="cert-detail-item"><label>Prüfung</label><p>${c.examDetails}</p></div>`:''}
</div>
${c.special2026?`<div class="cert-special"><p>⚡ ${c.special2026}</p></div>`:''}
<div style="margin-top:16px"><label style="font-size:10px;color:var(--text-muted);text-transform:uppercase;font-weight:600">Buchungsoptionen</label>${bookingOptsHtml}</div>
</div></div>`;
}
function renderCatalog(){
const grid=document.getElementById('cert-grid');
// Sort: by recommendation priority within each category
const sorted=[...CERTIFICATIONS].sort((a,b)=>REC_ORDER.indexOf(a.recommendation)-REC_ORDER.indexOf(b.recommendation));
// Group by category
const catOrder=['classic','agile','pmo','ki'];
let html='';
catOrder.forEach(catId=>{
const cat=CATEGORIES[catId];
const certs=sorted.filter(c=>c.category===catId);
if(!certs.length)return;
html+=`<div class="cert-group" data-group-cat="${catId}">
<div class="cert-group-header"><div class="cg-dot" style="background:${cat.color}"></div><h3>${cat.label}</h3><span class="cg-count">${certs.length} Zertifizierungen</span></div>
<div class="cert-grid">${certs.map(c=>renderCertCard(c)).join('')}</div></div>`;
});
grid.innerHTML=html;
document.querySelectorAll('.filter-btn').forEach(btn=>{
btn.addEventListener('click',()=>{
const type=btn.dataset.filterType;const val=btn.dataset.cat||btn.dataset.rec;
if(activeFilters[type]===val){activeFilters[type]=null;btn.classList.remove('active')}
else{document.querySelectorAll(`.filter-btn[data-filter-type="${type}"]`).forEach(b=>b.classList.remove('active'));activeFilters[type]=val;btn.classList.add('active')}
applyFilters()})});
applyFilters();
}
function resetAllFilters(){activeFilters={category:null,recommendation:null};document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));applyFilters()}
function applyFilters(){
let shown=0,total=CERTIFICATIONS.length;
// Filter individual cards
document.querySelectorAll('.cert-card').forEach(card=>{
const cat=card.dataset.cat;const rec=card.dataset.rec;
const show=(!activeFilters.category||cat===activeFilters.category)&&(!activeFilters.recommendation||rec===activeFilters.recommendation);
card.style.display=show?'':'none';if(show)shown++});
// Show/hide category groups
document.querySelectorAll('.cert-group').forEach(group=>{
const groupCat=group.dataset.groupCat;
if(activeFilters.category&&groupCat!==activeFilters.category){group.style.display='none';return}
const visibleCards=group.querySelectorAll('.cert-card[style=""], .cert-card:not([style])');
const hasVisible=[...group.querySelectorAll('.cert-card')].some(c=>c.style.display!=='none');
group.style.display=hasVisible?'':'none';
});
// Filter summary
let existing=document.getElementById('filter-summary');
if(activeFilters.category||activeFilters.recommendation){
const catLabel=activeFilters.category?CATEGORIES[activeFilters.category].label:'';
const recLabel=activeFilters.recommendation?RECOMMENDATION_LEVELS[activeFilters.recommendation].label:'';
const text=[catLabel,recLabel].filter(Boolean).join(' + ');
if(!existing){existing=document.createElement('div');existing.id='filter-summary';existing.className='filter-summary';
document.getElementById('cert-grid').before(existing)}
existing.innerHTML=`Zeige: <strong>${text}</strong> (${shown} von ${total}) <button class="filter-reset-all" onclick="resetAllFilters()">Alle zurücksetzen</button>`;
}else if(existing){existing.remove()}
}
function toggleCert(id){
document.getElementById('detail-'+id).classList.toggle('visible');
}

/* TABLE – with integrated provider info */
let tableSortCol='relevance',tableSortAsc=false;
function renderTable(){
populateTableFilters();renderTableBody();
document.querySelectorAll('.cert-table th[data-sort]').forEach(th=>{
th.addEventListener('click',()=>{
const col=th.dataset.sort;
if(tableSortCol===col)tableSortAsc=!tableSortAsc;else{tableSortCol=col;tableSortAsc=true}
document.querySelectorAll('.cert-table th').forEach(h=>h.classList.remove('sorted'));
th.classList.add('sorted');renderTableBody()})});
document.getElementById('table-search').addEventListener('input',renderTableBody);
document.getElementById('table-cat-filter').addEventListener('change',renderTableBody);
document.getElementById('table-rec-filter').addEventListener('change',renderTableBody);
}
function populateTableFilters(){
const catSel=document.getElementById('table-cat-filter');
Object.values(CATEGORIES).forEach(c=>{const o=document.createElement('option');o.value=c.id;o.textContent=c.label;catSel.appendChild(o)});
const recSel=document.getElementById('table-rec-filter');
Object.values(RECOMMENDATION_LEVELS).forEach(r=>{const o=document.createElement('option');o.value=r.label;o.textContent=r.label;recSel.appendChild(o)});
}
function renderTableBody(){
const search=document.getElementById('table-search').value.toLowerCase();
const catF=document.getElementById('table-cat-filter').value;
const recF=document.getElementById('table-rec-filter').value;
let data=CERTIFICATIONS.filter(c=>{
const matchSearch=!search||c.name.toLowerCase().includes(search)||c.fullName.toLowerCase().includes(search);
const matchCat=!catF||c.category===catF;
const rec=RECOMMENDATION_LEVELS[c.recommendation];
const matchRec=!recF||rec.label===recF;
return matchSearch&&matchCat&&matchRec});
data.sort((a,b)=>{
let va,vb;
if(tableSortCol==='name'){va=a.name.toLowerCase();vb=b.name.toLowerCase()}
else if(tableSortCol==='category'){va=a.category;vb=b.category}
else if(tableSortCol==='recommendation'){va=REC_ORDER.indexOf(a.recommendation);vb=REC_ORDER.indexOf(b.recommendation)}
else if(tableSortCol==='cost'){va=a.costMin;vb=b.costMin}
else if(tableSortCol==='effort'){va=a.effortHours;vb=b.effortHours}
else if(tableSortCol==='relevance'){va=a.relevance;vb=b.relevance}
else{va=0;vb=0}
if(va<vb)return tableSortAsc?-1:1;if(va>vb)return tableSortAsc?1:-1;return 0});
const body=document.getElementById('cert-table-body');
body.innerHTML=data.map(c=>{
const cat=CATEGORIES[c.category];const rec=RECOMMENDATION_LEVELS[c.recommendation];
const stars='★'.repeat(c.relevance)+'☆'.repeat(5-c.relevance);
const effortDisplay=`${c.effortHours}h (${c.effortWeeks})`;
const costHtml=c.bookingOptions.map(opt=>`<div style="margin-bottom:8px"><strong>${opt.priceEur}</strong> ${opt.priceUsd?`<span style="font-size:10px;color:var(--text-muted)">(${opt.priceUsd})</span>`:''}<br><span style="font-size:10px;color:var(--text-muted)">${opt.label}</span></div>`).join('');
const provHtml=c.bookingOptions.map(opt=>`<div style="margin-bottom:8px;font-size:12px"><strong>${opt.provider}</strong></div>`).join('');
const bookHtml=c.bookingOptions.map(opt=>opt.url?`<div style="margin-bottom:8px"><a href="${opt.url}" target="_blank" rel="noopener" class="table-link" style="font-size:11px; padding:4px 8px; display:inline-block">${opt.type==='self'?'Prüfung →':'Kurs →'}</a></div>`:'-').join('');
return `<tr>
<td><strong>${c.name}</strong><br><span style="font-size:11px;color:var(--text-muted)">${c.fullName}</span></td>
<td><span class="cat-dot" style="background:${cat.color}"></span>${cat.label}</td>
<td><span class="cert-badge" style="background:${rec.color};color:#fff;font-size:10px">${rec.label}</span></td>
<td>${costHtml}</td>
<td>${effortDisplay}</td>
<td style="color:var(--red)">${stars}</td>
<td>${provHtml}</td>
<td>${bookHtml}</td>
</tr>`}).join('');
}

/* CHART */
function renderChart(){
const ctx=document.getElementById('bubbleChart');
if(!ctx)return;
const labelConfig={
'PMP':{anchor:'end',align:'right',offset:6},
'PSM I / PSPO I':{anchor:'start',align:'left',offset:4},
'CAPM':{anchor:'end',align:'bottom',offset:4},
'APMG AIPM':{anchor:'start',align:'bottom',offset:6},
'SAFe':{anchor:'end',align:'right',offset:6},
'PMI-ACP':{anchor:'start',align:'top',offset:6},
'PMI-CPMAI':{anchor:'end',align:'top',offset:6},
'PMI-PMOCP':{anchor:'end',align:'top',offset:6},
'PRINCE2 Agile':{anchor:'end',align:'right',offset:6},
'P3O':{anchor:'start',align:'bottom',offset:6},
'IPMA Level C/B':{anchor:'start',align:'bottom',offset:6},
'Fraunhofer KI-Manager':{anchor:'start',align:'bottom',offset:6}
};
const datasets=Object.values(CATEGORIES).map(cat=>{
const certs=CERTIFICATIONS.filter(c=>c.category===cat.id);
return{label:cat.label,backgroundColor:cat.color+'66',borderColor:cat.color,borderWidth:2,
data:certs.map(c=>({x:c.costMin,y:c.effortHours,r:c.relevance*3+6,certName:c.name,certCost:c.bookingOptions.length>1?'ab '+c.bookingOptions[0].priceEur:c.bookingOptions[0].priceEur,certEffort:c.effortWeeks})),
datalabels:{display:true,color:'#111',backgroundColor:'#ffffffcc',borderRadius:4,padding:{top:3,bottom:3,left:5,right:5},
font:{weight:'bold',size:10,family:'"Segoe UI", sans-serif'},
formatter:(_,ctx2)=>ctx2.dataset.data[ctx2.dataIndex].certName,
anchor:function(ctx2){const name=ctx2.dataset.data[ctx2.dataIndex].certName;return labelConfig[name]?.anchor||'end'},
align:function(ctx2){const name=ctx2.dataset.data[ctx2.dataIndex].certName;return labelConfig[name]?.align||'top'},
offset:function(ctx2){const name=ctx2.dataset.data[ctx2.dataIndex].certName;return labelConfig[name]?.offset||4}
}
}});
const legend=document.getElementById('chart-legend');
legend.innerHTML=Object.values(CATEGORIES).map(c=>`<div class="chart-legend-item"><div class="chart-legend-dot" style="background:${c.color}"></div>${c.label}</div>`).join('');
new Chart(ctx,{type:'bubble',data:{datasets},
plugins:[ChartDataLabels],
options:{responsive:true,maintainAspectRatio:true,aspectRatio:1.8,
layout:{padding:{top:40,right:50,bottom:20,left:20}},
plugins:{legend:{display:false},
tooltip:{backgroundColor:'rgba(255,255,255,0.95)',titleColor:'#111',bodyColor:'#333',borderColor:'#e2e2e2',borderWidth:1,padding:12,boxPadding:6,
callbacks:{title:items=>items[0]?.raw?.certName||'',
label:item=>[`Kosten: ${item.raw.certCost}`,`Aufwand: ${item.raw.certEffort}`,`Relevanz: ${Math.round((item.raw.r-6)/3)}/5`]}}},
scales:{x:{title:{display:true,text:'Kosten (€)',font:{weight:'bold',family:'"Segoe UI", sans-serif'}},ticks:{callback:v=>v>=1000?v/1000+'k €':v+' €',font:{family:'"Segoe UI", sans-serif'}},grid:{color:'#f0f0f0'},min:0,max:5500},
y:{title:{display:true,text:'Aufwand (Stunden)',font:{weight:'bold',family:'"Segoe UI", sans-serif'}},grid:{color:'#f0f0f0'},min:0,max:150}}}});
}

/* PATHS */
function renderPaths(){
const container=document.getElementById('paths-container');
container.innerHTML=DEVELOPMENT_PATHS.map(p=>{
return `<div class="path-card" id="path-${p.id}">
<div class="path-header" onclick="togglePath('${p.id}')">
<div class="path-info"><h3>${p.title}</h3><div class="path-meta">${p.target}</div></div>
<span class="path-chevron">▼</span>
</div>
<div class="path-body">
<div class="path-goal">🎯 ${p.goal}</div>
<div class="path-timeline">${p.steps.map((s,i)=>{
const cert=CERTIFICATIONS.find(c=>c.id===s.certId);
const name=s.altName||cert?.name||s.certId;
const color=cert?CATEGORIES[cert.category].color:'#999';
return `<div class="path-step">
<div class="path-step-circle" style="border-color:${color}" onclick="scrollToCert('${s.certId}')">${name}</div>
<div class="path-step-label">${s.benefit}</div>
</div>`}).join('')}</div>
</div></div>`}).join('');
}
function togglePath(id){document.getElementById('path-'+id).classList.toggle('open')}
function scrollToCert(id){
resetAllFilters();
setTimeout(()=>{
const el=document.getElementById('card-'+id);
if(el){el.scrollIntoView({behavior:'smooth',block:'center'});el.style.boxShadow='0 0 0 3px var(--red)';setTimeout(()=>el.style.boxShadow='',2000)}
}, 50);
}
