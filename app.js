document.addEventListener('DOMContentLoaded',()=>{
initFinder();renderCatalog();renderTable();renderChart();renderPaths();renderProviders();initNav();initFadeIn();
});

/* ─── NAV ─── */
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

/* ─── FINDER ─── */
let finderState={step:0,career:null,market:null,role:null};
function initFinder(){finderState={step:0,career:null,market:null,role:null};renderFinderStep()}
function renderFinderStep(){
const dots=document.getElementById('finder-dots');
const content=document.getElementById('finder-content');
const results=document.getElementById('finder-results');
results.innerHTML='';
dots.innerHTML=[1,2,3].map((n,i)=>`<div class="finder-dot ${i<finderState.step?'done':i===finderState.step?'active':''}">${i<finderState.step?'✓':n}</div>`).join('');
if(finderState.step===0)renderCareerStep(content);
else if(finderState.step===1)renderMarketStep(content);
else if(finderState.step===2)renderRoleStep(content);
else{content.innerHTML='';showFinderResults(results)}
}
function renderCareerStep(el){
el.innerHTML=`<div class="finder-step"><h3>Deine aktuelle Karrierestufe bei acterience?</h3><p>Wähle dein Level – die Empfehlung berücksichtigt deine Seniorität.</p><div class="finder-options">${CAREER_LEVELS.map(c=>`<div class="finder-option" onclick="selectCareer('${c.id}')"><div><div class="fo-label">${c.label}</div></div></div>`).join('')}</div></div>`;
}
function renderMarketStep(el){
el.innerHTML=`<div class="finder-step"><h3>In welchem Market arbeitest du vorrangig?</h3><p>Verschiedene Branchen haben unterschiedliche Anforderungen an PM-Zertifizierungen.</p><div class="finder-options">${MARKETS.map(m=>`<div class="finder-option" onclick="selectMarket('${m.id}')"><div class="fo-icon">${m.icon}</div><div><div class="fo-label">${m.label}</div></div></div>`).join('')}</div></div>`;
}
function renderRoleStep(el){
el.innerHTML=`<div class="finder-step"><h3>Welche PM-Rolle beschreibt dich am besten?</h3><p>So können wir die passendste Zertifizierung für dein Aufgabenprofil empfehlen.</p><div class="finder-options">${PM_ROLES.map(r=>`<div class="finder-option" onclick="selectRole('${r.id}')"><div class="fo-icon">${r.icon}</div><div><div class="fo-label">${r.label}</div></div></div>`).join('')}</div></div>`;
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
const pathMatch=DEVELOPMENT_PATHS.find(p=>{const certSet=p.steps.map(s=>s.certId);return certIds.some(id=>certSet.includes(id))});
el.innerHTML=`<h3>🎯 Deine Top-Empfehlungen</h3><p class="profile">Basierend auf: ${cl?.label} · ${mk?.label} · ${rl?.label}</p>${certs.map((c,i)=>{const cat=CATEGORIES[c.category];return `<div class="result-card"><div class="result-rank">${i+1}</div><div class="result-info"><h4>${c.name}</h4><p>${c.shortDescription}</p><div class="result-meta"><span>💰 ${c.costLabel}</span><span>⏱ ${c.effortWeeks}</span><span>📊 Relevanz: ${c.relevance}/5</span></div></div></div>`}).join('')}${pathMatch?`<div class="result-path"><strong>🛤️ Empfohlener Entwicklungspfad: ${pathMatch.title}</strong><p>${pathMatch.goal}</p></div>`:''}<button class="finder-reset" onclick="initFinder()">↻ Nochmal starten</button>`;
}

/* ─── CATALOG ─── */
let activeFilters={category:null,recommendation:null};
function renderCatalog(){
const grid=document.getElementById('cert-grid');
grid.innerHTML=CERTIFICATIONS.map(c=>{
const cat=CATEGORIES[c.category];const rec=RECOMMENDATION_LEVELS[c.recommendation];
const stars='★'.repeat(c.relevance)+'☆'.repeat(5-c.relevance);
return `<div class="cert-card" data-cat="${c.category}" data-rec="${c.recommendation}" id="card-${c.id}">
<div class="cert-card-top" style="background:${cat.color}"></div>
<div class="cert-card-body">
<div class="cert-card-header"><h3>${c.name}</h3><span class="cert-badge" style="background:${rec.color};color:#fff">${rec.label.toUpperCase()}</span></div>
<div class="cert-sub">${cat.emoji} ${c.fullName}</div>
<div class="cert-desc">${c.shortDescription}</div>
<div class="cert-metrics">
<div><div class="cert-metric-label">Kosten</div><div class="cert-metric-value">${c.costLabel}</div></div>
<div><div class="cert-metric-label">Aufwand</div><div class="cert-metric-value">${c.effortWeeks}</div></div>
<div><div class="cert-metric-label">Relevanz</div><div class="cert-metric-value cert-stars">${stars}</div></div>
</div></div>
<div class="cert-expand-trigger" onclick="toggleCert('${c.id}')">‣ Klick für Details</div>
<div class="cert-detail" id="detail-${c.id}">
<h4>Strategischer Nutzen für acterience</h4>
<ul>${(c.benefits||[]).map(b=>`<li>${b}</li>`).join('')}</ul>
<div class="cert-detail-grid">
<div class="cert-detail-item"><label>Zielgruppe</label><p>${c.targetGroup}</p></div>
<div class="cert-detail-item"><label>Anbieter</label><p>${c.provider}</p></div>
${c.recertification?`<div class="cert-detail-item"><label>Rezertifizierung</label><p>${c.recertification}</p></div>`:''}
${c.examDetails?`<div class="cert-detail-item"><label>Prüfung</label><p>${c.examDetails}</p></div>`:''}
</div>
${c.costDetail?`<div style="margin-top:12px"><label style="font-size:10px;color:var(--text-muted);text-transform:uppercase;font-weight:600">Kostendetail</label><p style="font-size:13px;margin-top:2px">${c.costDetail}</p></div>`:''}
${c.special2026?`<div class="cert-special"><p>⚡ ${c.special2026}</p></div>`:''}
${c.bookingUrl?`<a href="${c.bookingUrl}" target="_blank" rel="noopener" class="cert-book-btn">→ Jetzt buchen</a>`:''}
</div></div>`}).join('');
document.querySelectorAll('.filter-btn').forEach(btn=>{
btn.addEventListener('click',()=>{
const type=btn.dataset.filterType;const val=btn.dataset.cat||btn.dataset.rec;
if(activeFilters[type]===val){activeFilters[type]=null;btn.classList.remove('active')}
else{document.querySelectorAll(`.filter-btn[data-filter-type="${type}"]`).forEach(b=>b.classList.remove('active'));activeFilters[type]=val;btn.classList.add('active')}
applyFilters()})});
}
function applyFilters(){
document.querySelectorAll('.cert-card').forEach(card=>{
const cat=card.dataset.cat;const rec=card.dataset.rec;
const show=(!activeFilters.category||cat===activeFilters.category)&&(!activeFilters.recommendation||rec===activeFilters.recommendation);
card.style.display=show?'':'none'});
}
function toggleCert(id){
const el=document.getElementById('detail-'+id);
const trigger=el.previousElementSibling;
if(el.classList.contains('visible')){el.classList.remove('visible');trigger.textContent='‣ Klick für Details'}
else{el.classList.add('visible');trigger.textContent='‣ Weniger anzeigen'}
}

/* ─── TABLE ─── */
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
else if(tableSortCol==='recommendation'){va=a.recommendation;vb=b.recommendation}
else if(tableSortCol==='cost'){va=a.costMin;vb=b.costMin}
else if(tableSortCol==='effort'){va=a.effortHours;vb=b.effortHours}
else if(tableSortCol==='relevance'){va=a.relevance;vb=b.relevance}
else{va=0;vb=0}
if(va<vb)return tableSortAsc?-1:1;if(va>vb)return tableSortAsc?1:-1;return 0});
const body=document.getElementById('cert-table-body');
body.innerHTML=data.map(c=>{
const cat=CATEGORIES[c.category];const rec=RECOMMENDATION_LEVELS[c.recommendation];
const stars='★'.repeat(c.relevance)+'☆'.repeat(5-c.relevance);
return `<tr>
<td><strong>${c.name}</strong><br><span style="font-size:11px;color:var(--text-muted)">${c.fullName}</span></td>
<td><span class="cat-dot" style="background:${cat.color}"></span>${cat.label}</td>
<td><span class="cert-badge" style="background:${rec.color};color:#fff;font-size:10px">${rec.label}</span></td>
<td>${c.costLabel}</td>
<td>${c.effortWeeks}</td>
<td style="color:var(--red)">${stars}</td>
<td>${c.provider}</td>
<td>${c.bookingUrl?`<a href="${c.bookingUrl}" target="_blank" rel="noopener" class="table-link">Buchen →</a>`:'-'}</td>
</tr>`}).join('');
}

/* ─── CHART ─── */
function renderChart(){
const ctx=document.getElementById('bubbleChart');
if(!ctx)return;
const datasets=Object.values(CATEGORIES).map(cat=>{
const certs=CERTIFICATIONS.filter(c=>c.category===cat.id);
return{label:cat.label,backgroundColor:cat.color+'44',borderColor:cat.color,borderWidth:2,
data:certs.map(c=>({x:c.costMin,y:c.effortHours,r:c.relevance*6+4,certName:c.name,certCost:c.costLabel,certEffort:c.effortWeeks})),
datalabels:{display:true,color:cat.color,font:{weight:'bold',size:11},anchor:'end',align:'top',offset:4,
formatter:(_,ctx2)=>ctx2.dataset.data[ctx2.dataIndex].certName}
}});
const legend=document.getElementById('chart-legend');
legend.innerHTML=Object.values(CATEGORIES).map(c=>`<div class="chart-legend-item"><div class="chart-legend-dot" style="background:${c.color}"></div>${c.label}</div>`).join('');
new Chart(ctx,{type:'bubble',data:{datasets},
plugins:[ChartDataLabels],
options:{responsive:true,maintainAspectRatio:true,aspectRatio:1.6,
plugins:{legend:{display:false},datalabels:{},
tooltip:{callbacks:{title:items=>items[0]?.raw?.certName||'',
label:item=>[`Kosten: ${item.raw.certCost}`,`Aufwand: ${item.raw.certEffort}`,`Relevanz: ${Math.round((item.raw.r-4)/6)}/5`]}}},
scales:{x:{title:{display:true,text:'Kosten (€)',font:{weight:'bold'}},ticks:{callback:v=>v>=1000?v/1000+'k €':v+' €'},grid:{color:'#E2E2E2'}},
y:{title:{display:true,text:'Aufwand (Stunden)',font:{weight:'bold'}},grid:{color:'#E2E2E2'}}}}});
}

/* ─── PATHS ─── */
function renderPaths(){
const container=document.getElementById('paths-container');
container.innerHTML=DEVELOPMENT_PATHS.map(p=>{
return `<div class="path-card" id="path-${p.id}">
<div class="path-header" onclick="togglePath('${p.id}')">
<span class="path-badge" style="background:${p.badgeColor}">${p.badge}</span>
<div style="flex:1"><h3>${p.title}</h3><div class="path-meta">${p.target}</div></div>
<span class="path-chevron">▼</span>
</div>
<div class="path-body">
<div class="path-goal">🎯 ${p.goal}</div>
<div class="path-timeline">${p.steps.map((s,i)=>{
const cert=CERTIFICATIONS.find(c=>c.id===s.certId);
const name=s.altName||cert?.name||s.certId;
const color=cert?CATEGORIES[cert.category].color:'#999';
return `${i>0?'<div class="path-arrow">→</div>':''}
<div class="path-step">
<div class="path-step-circle" style="border-color:${color}" onclick="scrollToCert('${s.certId}')">${name}</div>
<div class="path-step-label">${s.benefit}</div>
</div>`}).join('')}</div>
</div></div>`}).join('');
}
function togglePath(id){document.getElementById('path-'+id).classList.toggle('open')}
function scrollToCert(id){const el=document.getElementById('card-'+id);if(el){el.scrollIntoView({behavior:'smooth',block:'center'});el.style.boxShadow='0 0 0 3px var(--red)';setTimeout(()=>el.style.boxShadow='',2000)}}

/* ─── PROVIDERS ─── */
function renderProviders(){
const grid=document.getElementById('providers-grid');
grid.innerHTML=PROVIDERS.map(p=>`<div class="provider-card">
<h3>${p.name}</h3>
<div class="prov-focus">${p.focus}</div>
<div class="prov-meta">
<span>📍 ${p.format}</span>
<span>📌 ${p.note}</span>
</div>
<a href="${p.url}" target="_blank" rel="noopener" class="prov-link">→ Website & Buchung</a>
</div>`).join('');
}
