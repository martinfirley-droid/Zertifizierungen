// ===== PM-Zertifizierungslandschaft App =====

document.addEventListener('DOMContentLoaded', () => {
  initFinder();
  initCertCards();
  initFilters();
  initPaths();
  initProviders();
  initStrategy();
  initChart();
  initScrollAnimations();
  initNavHighlight();
});

// ===== FINDER =====
let finderState = { step: 1, experience: null, focus: null, environment: null };

function initFinder() {
  renderFinderStep();
}

function renderFinderStep() {
  const container = document.getElementById('finder-content');
  const dotsContainer = document.getElementById('finder-dots');
  const resultsEl = document.getElementById('finder-results');
  resultsEl.classList.remove('visible');

  // Update dots
  dotsContainer.innerHTML = [1,2,3].map(n => {
    let cls = 'finder-step-dot';
    if (n < finderState.step) cls += ' done';
    else if (n === finderState.step) cls += ' active';
    return `<div class="${cls}">${n < finderState.step ? '✓' : n}</div>`;
  }).join('');

  const questions = {
    1: {
      q: 'Wie viel Projekterfahrung hast du?',
      options: [
        { value: 'junior', emoji: '🌱', label: 'Junior', sub: '0–2 Jahre' },
        { value: 'senior', emoji: '🚀', label: 'Senior', sub: '3–5 Jahre' },
        { value: 'lead', emoji: '👑', label: 'Lead / Principal', sub: '5+ Jahre' }
      ]
    },
    2: {
      q: 'Was ist dein methodischer Fokus?',
      options: [
        { value: 'classic', emoji: '🔵', label: 'Klassisches PM', sub: 'Wasserfall, Hybrid' },
        { value: 'agile', emoji: '🟠', label: 'Agile Delivery', sub: 'Scrum, Kanban, SAFe' },
        { value: 'pmo', emoji: '🟢', label: 'PMO & Governance', sub: 'Portfolio, Programme' },
        { value: 'ki', emoji: '🟣', label: 'KI & Innovation', sub: 'AI, Data Science' }
      ]
    },
    3: {
      q: 'In welchem Kundenumfeld bist du primär unterwegs?',
      options: [
        { value: 'international', emoji: '🌍', label: 'International / Konzern', sub: 'DAX, Fortune 500' },
        { value: 'dach', emoji: '🏔️', label: 'DACH Mittelstand', sub: 'Automotive, Maschinenbau' },
        { value: 'public', emoji: '🏛️', label: 'Public Sector', sub: 'Behörden, Banken, Pharma' },
        { value: 'it', emoji: '💻', label: 'IT & Digital', sub: 'Software, Transformation' }
      ]
    }
  };

  if (finderState.step > 3) {
    container.innerHTML = '';
    showFinderResults();
    return;
  }

  const q = questions[finderState.step];
  container.innerHTML = `
    <p class="finder-question">${q.q}</p>
    <div class="finder-options">
      ${q.options.map(o => `
        <div class="finder-option" data-value="${o.value}" onclick="selectFinderOption('${o.value}')">
          <span class="option-emoji">${o.emoji}</span>
          <strong>${o.label}</strong>
          <div style="font-size:12px;color:var(--text-muted);margin-top:4px">${o.sub}</div>
        </div>
      `).join('')}
    </div>
  `;
}

function selectFinderOption(value) {
  const keys = ['', 'experience', 'focus', 'environment'];
  finderState[keys[finderState.step]] = value;

  // Animate selection
  document.querySelectorAll('.finder-option').forEach(el => {
    if (el.dataset.value === value) el.classList.add('selected');
  });

  setTimeout(() => {
    finderState.step++;
    renderFinderStep();
  }, 300);
}

function showFinderResults() {
  const key = `${finderState.experience}|${finderState.focus}|${finderState.environment}`;
  const certIds = FINDER_LOGIC[key] || ['pmp', 'psm1', 'aipm'];
  const resultsEl = document.getElementById('finder-results');

  const certs = certIds.map(id => CERTIFICATIONS.find(c => c.id === id)).filter(Boolean);

  // Find matching development path
  const pathMap = { junior: 'junior', 'senior': 'senior-it', lead: 'strategy-pmo' };
  if (finderState.focus === 'ki') pathMap.senior = 'data-ai';
  if (finderState.focus === 'ki') pathMap.lead = 'data-ai';
  if (finderState.focus === 'agile') pathMap.senior = 'agile-delivery';
  if (finderState.focus === 'agile') pathMap.junior = 'agile-delivery';
  const pathId = pathMap[finderState.experience] || 'senior-it';
  const path = DEVELOPMENT_PATHS.find(p => p.id === pathId);

  resultsEl.innerHTML = `
    <p class="finder-results-title">🎯 Deine Top-Empfehlungen</p>
    <p class="finder-results-subtitle">Basierend auf deinem Profil: ${finderState.experience === 'junior' ? 'Junior' : finderState.experience === 'senior' ? 'Senior' : 'Lead/Principal'} · ${CATEGORIES[finderState.focus]?.label || ''} · ${finderState.environment === 'international' ? 'International' : finderState.environment === 'dach' ? 'DACH' : finderState.environment === 'public' ? 'Public Sector' : 'IT & Digital'}</p>
    ${certs.map((c, i) => `
      <div class="finder-result-card" onclick="scrollToCert('${c.id}')">
        <div class="finder-result-rank">${i + 1}</div>
        <div class="finder-result-info">
          <h3>${c.name}</h3>
          <p>${c.shortDescription}</p>
          <div class="finder-result-meta">
            <span>💰 ${c.costLabel}</span>
            <span>⏱ ${c.effortWeeks || c.effortLabel}</span>
            <span>📊 Relevanz: ${c.relevance}/5</span>
          </div>
        </div>
      </div>
    `).join('')}
    ${path ? `
      <div class="finder-path-box">
        <h4>🛤️ Empfohlener Entwicklungspfad: ${path.title}</h4>
        <p>${path.goal}</p>
      </div>
    ` : ''}
    <button class="finder-reset" onclick="resetFinder()">↺ Nochmal starten</button>
  `;
  resultsEl.classList.add('visible');

  // Update dots to all done
  document.getElementById('finder-dots').innerHTML = [1,2,3].map(n =>
    `<div class="finder-step-dot done">✓</div>`
  ).join('');
}

function resetFinder() {
  finderState = { step: 1, experience: null, focus: null, environment: null };
  renderFinderStep();
}

function scrollToCert(id) {
  const card = document.querySelector(`[data-cert-id="${id}"]`);
  if (card) {
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    card.classList.add('expanded');
    setTimeout(() => card.style.boxShadow = '0 0 30px var(--accent-glow)', 200);
    setTimeout(() => card.style.boxShadow = '', 2000);
  }
}

// ===== CERTIFICATION CARDS =====
function initCertCards() {
  const grid = document.getElementById('cert-grid');
  grid.innerHTML = CERTIFICATIONS.map(c => {
    const cat = CATEGORIES[c.category];
    return `
      <div class="cert-card" data-cert-id="${c.id}" data-category="${c.category}" data-rec="${c.recommendation}" onclick="toggleCertCard(this)">
        <div class="cert-card-top">
          <div class="cert-category-bar ${c.category}"></div>
          <div class="cert-card-header">
            <div>
              <div class="cert-card-name">${c.name}</div>
              <div class="cert-card-fullname">${cat.emoji} ${c.fullName}</div>
            </div>
            <span class="cert-badge ${c.recommendation}">${RECOMMENDATION_LEVELS[c.recommendation].label}</span>
          </div>
          <p class="cert-short-desc">${c.shortDescription}</p>
          <div class="cert-metrics">
            <div class="cert-metric">
              <div class="cert-metric-label">Kosten</div>
              <div class="cert-metric-value">${c.costLabel}</div>
            </div>
            <div class="cert-metric">
              <div class="cert-metric-label">Aufwand</div>
              <div class="cert-metric-value">${c.effortWeeks || c.effortLabel}</div>
            </div>
            <div class="cert-metric">
              <div class="cert-metric-label">Relevanz</div>
              <div class="cert-metric-value">${'★'.repeat(c.relevance)}${'☆'.repeat(5-c.relevance)}</div>
            </div>
          </div>
        </div>
        <div class="cert-details">
          <h4>Strategischer Nutzen für acterience</h4>
          <ul>${c.benefits.map(b => `<li>${b}</li>`).join('')}</ul>
          <div class="cert-details-grid">
            <div class="cert-detail-item">
              <div class="cert-detail-label">Zielgruppe</div>
              <div class="cert-detail-value">${c.targetGroup}</div>
            </div>
            <div class="cert-detail-item">
              <div class="cert-detail-label">Anbieter</div>
              <div class="cert-detail-value">${c.provider}</div>
            </div>
            ${c.recertification ? `
            <div class="cert-detail-item">
              <div class="cert-detail-label">Rezertifizierung</div>
              <div class="cert-detail-value">${c.recertification}</div>
            </div>` : ''}
            ${c.examDetails ? `
            <div class="cert-detail-item">
              <div class="cert-detail-label">Prüfung</div>
              <div class="cert-detail-value">${c.examDetails}</div>
            </div>` : ''}
            ${c.special2026 ? `
            <div class="cert-detail-item" style="grid-column:1/-1">
              <div class="cert-detail-label">⚡ Besonderheit 2026</div>
              <div class="cert-detail-value" style="color:#ffa726">${c.special2026}</div>
            </div>` : ''}
          </div>
        </div>
        <div class="cert-expand-hint">▾ Klick für Details</div>
      </div>
    `;
  }).join('');
}

function toggleCertCard(card) {
  card.classList.toggle('expanded');
  const hint = card.querySelector('.cert-expand-hint');
  hint.textContent = card.classList.contains('expanded') ? '▴ Weniger anzeigen' : '▾ Klick für Details';
}

// ===== FILTERS =====
function initFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const filterType = btn.dataset.filterType;
      const value = btn.dataset.cat || btn.dataset.rec;

      // Toggle active state within group
      if (btn.classList.contains('active')) {
        btn.classList.remove('active');
        filterCards();
        return;
      }

      // Deactivate others in same group
      document.querySelectorAll(`.filter-btn[data-filter-type="${filterType}"]`).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterCards();
    });
  });
}

function filterCards() {
  const activeCat = document.querySelector('.filter-btn[data-filter-type="category"].active');
  const activeRec = document.querySelector('.filter-btn[data-filter-type="recommendation"].active');
  const catVal = activeCat?.dataset.cat;
  const recVal = activeRec?.dataset.rec;

  document.querySelectorAll('.cert-card').forEach(card => {
    let show = true;
    if (catVal && card.dataset.category !== catVal) show = false;
    if (recVal && card.dataset.rec !== recVal) show = false;
    card.classList.toggle('hidden', !show);
  });
}

// ===== CHART =====
function initChart() {
  const ctx = document.getElementById('bubbleChart');
  if (!ctx) return;

  const datasets = Object.entries(CATEGORIES).map(([key, cat]) => {
    const certs = CERTIFICATIONS.filter(c => c.category === key);
    return {
      label: cat.label,
      data: certs.map(c => ({
        x: (c.costMin + c.costMax) / 2,
        y: c.effortHours,
        r: c.relevance * 6,
        certName: c.name
      })),
      backgroundColor: cat.color + '66',
      borderColor: cat.color,
      borderWidth: 2,
      hoverBackgroundColor: cat.color + 'AA',
    };
  });

  new Chart(ctx, {
    type: 'bubble',
    data: { datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: '#94a3b8', font: { family: 'Inter', size: 12 }, padding: 20, usePointStyle: true, pointStyle: 'circle' }
        },
        tooltip: {
          backgroundColor: '#1a2035',
          titleColor: '#f1f5f9',
          bodyColor: '#94a3b8',
          borderColor: '#334155',
          borderWidth: 1,
          cornerRadius: 8,
          padding: 12,
          titleFont: { family: 'Inter', size: 14, weight: '700' },
          bodyFont: { family: 'Inter', size: 12 },
          callbacks: {
            title: (items) => items[0].raw.certName,
            label: (item) => [
              `Kosten: ca. ${item.raw.x.toLocaleString('de-DE')} €`,
              `Aufwand: ${item.raw.y} Stunden`,
              `Relevanz: ${Math.round(item.raw.r / 6)}/5`
            ]
          }
        }
      },
      scales: {
        x: {
          title: { display: true, text: 'Kosten (€)', color: '#64748b', font: { family: 'Inter', size: 13 } },
          grid: { color: 'rgba(148,163,184,0.08)' },
          ticks: { color: '#64748b', font: { family: 'Inter' }, callback: v => v.toLocaleString('de-DE') + ' €' }
        },
        y: {
          title: { display: true, text: 'Aufwand (Stunden)', color: '#64748b', font: { family: 'Inter', size: 13 } },
          grid: { color: 'rgba(148,163,184,0.08)' },
          ticks: { color: '#64748b', font: { family: 'Inter' }, callback: v => v + ' h' }
        }
      }
    }
  });
}

// ===== DEVELOPMENT PATHS =====
function initPaths() {
  const container = document.getElementById('paths-container');
  container.innerHTML = DEVELOPMENT_PATHS.map(path => {
    const stepsHtml = path.steps.map((step, i) => {
      const cert = CERTIFICATIONS.find(c => c.id === step.certId);
      const cat = cert ? CATEGORIES[cert.category] : null;
      const name = step.altName || cert?.name || '';
      const connector = i < path.steps.length - 1 ? '<div class="path-connector"></div>' : '';
      return `
        <div class="path-step">
          <div class="path-step-circle" style="border-color:${cat?.color || 'var(--border)'}" onclick="scrollToCert('${step.certId}')" title="${name}">
            ${name}
          </div>
          <div class="path-step-benefit">${step.benefit}</div>
        </div>
        ${connector}
      `;
    }).join('');

    return `
      <div class="path-card" onclick="togglePath(this)">
        <div class="path-header">
          <span class="path-badge" style="background:${path.badgeColor}22;color:${path.badgeColor}">${path.badge}</span>
          <div style="flex:1">
            <div class="path-title">${path.title}</div>
            <div class="path-target">${path.target}</div>
          </div>
          <span class="path-chevron">▾</span>
        </div>
        <div class="path-body">
          <div class="path-goal">🎯 ${path.goal}</div>
          <div class="path-steps">${stepsHtml}</div>
        </div>
      </div>
    `;
  }).join('');
}

function togglePath(card) {
  // Close event propagation issue - prevent toggle when clicking step circle
  if (event.target.closest('.path-step-circle')) return;
  card.classList.toggle('open');
}

// ===== PROVIDERS =====
function initProviders() {
  const grid = document.getElementById('providers-grid');
  grid.innerHTML = PROVIDERS.map(p => `
    <div class="provider-card">
      <div class="provider-name">${p.name}</div>
      <div class="provider-focus">${p.focus}</div>
      <div class="provider-meta">📍 ${p.format}</div>
      <div class="provider-meta" style="margin-top:4px">ℹ️ ${p.note}</div>
      <span class="provider-rec">${p.recommendation}</span>
    </div>
  `).join('');
}

// ===== STRATEGY =====
function initStrategy() {
  const pillars = [
    { title: 'Klassische & hybride PM-Seniorität', desc: 'PMP, PRINCE2 Agile, IPMA', color: 'var(--classic)' },
    { title: 'Agile Delivery-Kompetenz', desc: 'Scrum.org, PMI-ACP, SAFe', color: 'var(--agile)' },
    { title: 'PMO- & Governance-Fähigkeit', desc: 'PMI-PMOCP, P3O', color: 'var(--pmo)' },
    { title: 'KI-Kompetenz im PM', desc: 'APMG AIPM, PMI-CPMAI, Fraunhofer', color: 'var(--ki)' }
  ];

  document.getElementById('strategy-pillars').innerHTML = pillars.map((p, i) => `
    <div class="pillar-card" style="border-left-color:${p.color}">
      <div class="pillar-number">${i + 1}</div>
      <div class="pillar-title">${p.title}</div>
      <div class="pillar-desc">${p.desc}</div>
    </div>
  `).join('');

  const actions = [
    'Vorhandene Zertifizierungen im Team erfassen',
    'Zertifizierungs- und Lerninteressen über Microsoft Forms abfragen',
    'Zielprofile und Entwicklungspfade mit Focus Line Owner abstimmen',
    'Erste Quick-Win-Lerngruppe für Scrum.org PSM I / PSPO I starten',
    'PMP-Kandidaten für 2026 identifizieren',
    'KI-Zertifizierungen AIPM und CPMAI für Pilotgruppe prüfen',
    'Anbieter und konkrete Kostenangebote validieren',
    'Review-Termin für Zertifizierungsstrategie festlegen'
  ];

  document.getElementById('action-list').innerHTML = actions.map(a => `
    <li class="action-item">
      <div class="action-check">✓</div>
      <span class="action-text">${a}</span>
    </li>
  `).join('');
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ===== NAV HIGHLIGHT =====
function initNavHighlight() {
  const sections = document.querySelectorAll('.section, .hero');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(s => { if (s.id) observer.observe(s); });
}
