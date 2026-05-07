// PM-Zertifizierungsdaten für acterience 2026
const CATEGORIES = {
  classic: { id: 'classic', label: 'Klassisch & Hybrid', color: '#4A90D9', emoji: '🔵' },
  agile: { id: 'agile', label: 'Agile & Delivery', color: '#E8873A', emoji: '🟠' },
  pmo: { id: 'pmo', label: 'PMO & Governance', color: '#4CAF50', emoji: '🟢' },
  ki: { id: 'ki', label: 'KI & Innovation', color: '#9C27B0', emoji: '🟣' }
};

const RECOMMENDATION_LEVELS = {
  musthave: { label: 'Must-have', color: '#4CAF50', icon: '✅' },
  empfohlen: { label: 'Empfohlen', color: '#2196F3', icon: '👍' },
  strategisch: { label: 'Strategisch', color: '#FF9800', icon: '🎯' },
  spezialrolle: { label: 'Spezialrolle', color: '#9C27B0', icon: '🔮' },
  optional: { label: 'Optional', color: '#78909C', icon: '➕' }
};

const CERTIFICATIONS = [
  {
    id: 'pmp',
    name: 'PMP',
    fullName: 'Project Management Professional',
    category: 'classic',
    recommendation: 'musthave',
    targetGroup: 'Senior Consultants, Manager, Directors',
    shortDescription: 'Wichtigster internationaler Senioritätsnachweis im Projektmanagement.',
    costMin: 2000, costMax: 3500, costLabel: '2.000–3.500 €',
    effortHours: 120, effortLabel: '100–150 Stunden',
    effortWeeks: '8–12 Wochen',
    relevance: 5,
    provider: 'PMI / KAYENTA',
    benefits: [
      'Globale Anerkennung und Reputationsgewinn',
      'Nachweis strategischer PM-Kompetenz',
      'Anschlussfähigkeit bei internationalen Kunden',
      'Potenzial für höhere Tagessätze'
    ],
    special2026: 'Ab 9. Juli 2026 stärkere Ausrichtung auf Value Delivery, KI-Integration, Nachhaltigkeit.',
    recertification: 'Alle 3 Jahre, 60 PDUs',
    examDetails: '180 szenariobasierte Fragen, 230 Minuten',
    suitable: ['senior', 'lead'],
    focus: ['classic', 'hybrid'],
    environment: ['international', 'konzern', 'dach']
  },
  {
    id: 'psm1',
    name: 'PSM I / PSPO I',
    fullName: 'Professional Scrum Master / Product Owner (Scrum.org)',
    category: 'agile',
    recommendation: 'musthave',
    targetGroup: 'Analysten, Consultants, Teilprojektleiter:innen, Product-Owner-nahe Rollen',
    shortDescription: 'Agiles Basisfundament mit sehr hohem ROI – dauerhaft gültig.',
    costMin: 150, costMax: 400, costLabel: 'ca. 200 USD je Prüfung',
    effortHours: 20, effortLabel: '1–2 Wochen Selbststudium',
    effortWeeks: '1–2 Wochen',
    relevance: 5,
    provider: 'Scrum.org / Selbststudium',
    benefits: [
      'Gemeinsames agiles Vokabular',
      'Schnelle Einsatzfähigkeit in agilen Kundenprojekten',
      'Hoher Nutzen bei IT- und Transformationsmandaten',
      'Sehr gutes Kosten-Nutzen-Verhältnis'
    ],
    recertification: 'Nicht erforderlich – dauerhaft gültig',
    suitable: ['junior', 'senior', 'lead'],
    focus: ['agile'],
    environment: ['international', 'konzern', 'it']
  },
  {
    id: 'cpmai',
    name: 'PMI-CPMAI',
    fullName: 'Certified Professional in Managing AI',
    category: 'ki',
    recommendation: 'strategisch',
    targetGroup: 'Data & AI Project Leads, Senior Consultants, KI-nahe Projektleiter:innen',
    shortDescription: 'Starkes Differenzierungsmerkmal für professionelle KI-Projektsteuerung.',
    costMin: 1000, costMax: 1500, costLabel: '1.000–1.500 €',
    effortHours: 70, effortLabel: '5–8 Wochen',
    effortWeeks: '5–8 Wochen',
    relevance: 5,
    provider: 'PMI / spezialisierte ATPs',
    benefits: [
      'Differenzierungsmerkmal im KI-Consulting',
      'Steuerung komplexer KI-Projekte',
      'Data Governance, AI Ethics, Model Drift',
      'Starkes Kundensignal bei KI-Investitionen'
    ],
    examDetails: '120 szenariobasierte Fragen, 160 Minuten',
    suitable: ['senior', 'lead'],
    focus: ['ki'],
    environment: ['international', 'konzern', 'it']
  },
  {
    id: 'ipma',
    name: 'IPMA Level C/B',
    fullName: 'IPMA / GPM Level C oder B',
    category: 'classic',
    recommendation: 'strategisch',
    targetGroup: 'Erfahrene Projektleiter:innen, Manager, PMO-/Turnaround-Rollen',
    shortDescription: 'Besonders wertvoll für DACH-Markt, Public Sector und Automotive.',
    costMin: 5000, costMax: 8000, costLabel: '5.000–8.000 €',
    effortHours: 120, effortLabel: 'Sehr hoch (Reports + Assessment)',
    effortWeeks: '3–6 Monate',
    relevance: 4,
    provider: 'PM-ZERT / Decisio / PS Consult / Haufe Akademie',
    benefits: [
      'Hohe Akzeptanz im DACH-Raum',
      'Nachweis echter Führungskompetenz',
      'Stark in Public Sector, Automotive, Maschinenbau',
      'Kompetenzbasiert statt nur wissensbasiert'
    ],
    recertification: 'Alle 5 Jahre',
    suitable: ['senior', 'lead'],
    focus: ['classic', 'leadership'],
    environment: ['dach', 'public']
  },
  {
    id: 'pmocp',
    name: 'PMI-PMOCP',
    fullName: 'PMI PMO Certified Professional',
    category: 'pmo',
    recommendation: 'spezialrolle',
    targetGroup: 'PMO Leads, Governance-Rollen, Principal Consultants',
    shortDescription: 'Modernes PMO-Zertifikat: Value Delivery, strategisches Alignment, PMO of the Future.',
    costMin: 1500, costMax: 2000, costLabel: '1.500–2.000 €',
    effortHours: 50, effortLabel: 'Moderat, 3–4 Wochen',
    effortWeeks: '3–4 Wochen',
    relevance: 3,
    provider: 'PMI / autorisierte Anbieter',
    benefits: [
      'Beratungsprodukt für PMO-Aufbau und -Sanierung',
      'C-Level Advisory Grundlage',
      'Strategisches Alignment und Wertbeitrag',
      'Zukunftsfähiger als bürokratische PMO-Frameworks'
    ],
    suitable: ['senior', 'lead'],
    focus: ['pmo', 'governance'],
    environment: ['konzern', 'dach']
  },
  {
    id: 'prince2',
    name: 'PRINCE2 Agile',
    fullName: 'PRINCE2 / PRINCE2 Agile',
    category: 'classic',
    recommendation: 'empfohlen',
    targetGroup: 'Consultants in regulierten Kundenumfeldern',
    shortDescription: 'Governance-Struktur + agile Ausführung für regulierte Umfelder.',
    costMin: 1500, costMax: 2500, costLabel: '1.500–2.500 €',
    effortHours: 40, effortLabel: '3–5 Tage Training + Prüfung',
    effortWeeks: '1–2 Wochen',
    relevance: 4,
    provider: 'SERVIEW München / Remote',
    benefits: [
      'Passend zu Konzern-, Public-Sector-, Pharma- und Finanzumfeldern',
      'Klare Rollen, Phasen, Eskalationswege',
      'Schnelle Integration in bestehende Kundenmethodiken',
      'Hilfreich bei stark auditierbaren Projekten'
    ],
    recertification: 'Abhängig vom Level',
    suitable: ['senior', 'lead'],
    focus: ['classic', 'governance'],
    environment: ['konzern', 'public', 'dach']
  },
  {
    id: 'safe',
    name: 'SAFe',
    fullName: 'SAFe Advanced Scrum Master',
    category: 'agile',
    recommendation: 'spezialrolle',
    targetGroup: 'Consultants in großen Enterprise-Transformationen',
    shortDescription: 'Enterprise Agile – Skalierung über Teams, Release Trains und Portfolio.',
    costMin: 850, costMax: 1150, costLabel: '850–1.150 €',
    effortHours: 25, effortLabel: '2 Tage Training + Prüfung',
    effortWeeks: '1 Woche',
    relevance: 3,
    provider: 'Scaled Agile / SERVIEW',
    benefits: [
      'Anschlussfähigkeit an DAX- und Großkonzernumfelder',
      'PI Planning, Release Trains, Lean Portfolio Management',
      'Nützlich bei großen Transformationsprogrammen'
    ],
    recertification: 'Jährlich / laufende Weiterbildung',
    suitable: ['senior', 'lead'],
    focus: ['agile', 'skalierung'],
    environment: ['konzern', 'international']
  },
  {
    id: 'pmiacp',
    name: 'PMI-ACP',
    fullName: 'Agile Certified Practitioner',
    category: 'agile',
    recommendation: 'empfohlen',
    targetGroup: 'Erfahrenere agile Consultants',
    shortDescription: 'Breites agiles Methodenverständnis: Kanban, Lean, XP, TDD.',
    costMin: 425, costMax: 675, costLabel: '425–675 USD',
    effortHours: 50, effortLabel: 'Mittel',
    effortWeeks: '3–4 Wochen',
    relevance: 3,
    provider: 'PMI / ATPs',
    benefits: [
      'Breiteres agiles Methodenverständnis',
      'Nützlich für Umfelder ohne eindeutiges Scrum-Setup',
      'Gute Ergänzung für hybride und agile Senior-Profile'
    ],
    suitable: ['senior'],
    focus: ['agile'],
    environment: ['international', 'it']
  },
  {
    id: 'aipm',
    name: 'APMG AIPM',
    fullName: 'AI-Driven Project Manager',
    category: 'ki',
    recommendation: 'empfohlen',
    targetGroup: 'Breite Consultant-Gruppe',
    shortDescription: 'Quick Win: KI effizient im PM-Alltag nutzen – geringer Aufwand, hoher Impact.',
    costMin: 300, costMax: 400, costLabel: 'ca. 400 USD',
    effortHours: 15, effortLabel: '1–2 Wochen',
    effortWeeks: '1–2 Wochen',
    relevance: 4,
    provider: 'APMG International',
    benefits: [
      'Effizienzgewinn bei Statusberichten, Protokollen, Analysen',
      'Verbesserte Risikoanalysen und Stakeholderkommunikation',
      'Schnell anwendbar im Projektalltag',
      'Geringer Aufwand und niedrige Einstiegshürde'
    ],
    suitable: ['junior', 'senior', 'lead'],
    focus: ['ki'],
    environment: ['international', 'konzern', 'dach', 'it']
  },
  {
    id: 'p3o',
    name: 'P3O',
    fullName: 'Portfolio, Programme and Project Offices',
    category: 'pmo',
    recommendation: 'optional',
    targetGroup: 'PMO-Rollen in stark prozessualen Umfeldern',
    shortDescription: 'Klassisches PMO-Governance-Framework für formale Umfelder.',
    costMin: 1500, costMax: 2000, costLabel: '1.500–2.000 €',
    effortHours: 40, effortLabel: 'Mittel',
    effortWeeks: '2–3 Wochen',
    relevance: 3,
    provider: 'Axelos / PeopleCert',
    benefits: [
      'Nützlich bei Behörden, Banken, stark hierarchischen Organisationen',
      'Blaupause für Governance- und Assurance-Strukturen',
      'Ergänzend zu PMI-PMOCP'
    ],
    suitable: ['senior', 'lead'],
    focus: ['pmo', 'governance'],
    environment: ['public', 'konzern']
  },
  {
    id: 'capm',
    name: 'CAPM',
    fullName: 'Certified Associate in Project Management',
    category: 'classic',
    recommendation: 'optional',
    targetGroup: 'Junior-Profile, PM-Einsteiger:innen',
    shortDescription: 'Methodisches PM-Grundvokabular ohne umfangreiche Führungserfahrung.',
    costMin: 200, costMax: 400, costLabel: '200–400 USD',
    effortHours: 30, effortLabel: 'Moderat',
    effortWeeks: '2–4 Wochen',
    relevance: 2,
    provider: 'PMI / ATPs',
    benefits: [
      'Niedrigschwelliger Einstieg in PM-Methodik',
      'Gute Vorbereitung auf späteren PMP',
      'International anerkannt'
    ],
    suitable: ['junior'],
    focus: ['classic'],
    environment: ['international', 'konzern']
  },
  {
    id: 'fraunhofer',
    name: 'Fraunhofer KI-Manager',
    fullName: 'Fraunhofer Zertifizierter KI-Manager',
    category: 'ki',
    recommendation: 'spezialrolle',
    targetGroup: 'Partner, Principals, KI-Strategieberatung',
    shortDescription: 'Reputationsstark im deutschen Markt – für strategische KI-Transformation.',
    costMin: 3000, costMax: 5000, costLabel: 'Vor Buchung prüfen',
    effortHours: 80, effortLabel: 'Hoch, mehrwöchig',
    effortWeeks: '6–10 Wochen',
    relevance: 4,
    provider: 'Fraunhofer IAIS / FIT',
    benefits: [
      'Hohe Glaubwürdigkeit im deutschen Markt',
      'Vertrauensanker im C-Level-Umfeld',
      'Geeignet für unternehmensweite KI-Transformation',
      'Strategische KI-Beratung'
    ],
    suitable: ['lead'],
    focus: ['ki', 'strategie'],
    environment: ['dach']
  }
];

const DEVELOPMENT_PATHS = [
  {
    id: 'junior',
    title: 'Junior Analyst / Junior Consultant',
    badge: 'EINSTIEG',
    badgeColor: '#4CAF50',
    target: '0–2 Jahre Erfahrung, Junior Consultants, Analysten, PM-Einsteiger:innen',
    goal: 'Solides PM-Handwerkszeug, agiles Grundverständnis, effiziente Nutzung von KI.',
    steps: [
      { certId: 'capm', benefit: 'Methodisches Grundvokabular' },
      { certId: 'psm1', benefit: 'Agile Anschlussfähigkeit in Delivery-Teams' },
      { certId: 'aipm', benefit: 'Produktiver Einsatz von KI im PM-Alltag' }
    ]
  },
  {
    id: 'senior-it',
    title: 'Senior IT & Transformation Consultant',
    badge: 'DELIVERY SENIOR',
    badgeColor: '#E8873A',
    target: '3–5 Jahre Erfahrung, Senior Consultants, Transformation Consultants, IT-Projektleitungen',
    goal: 'Projektführung, hybride Steuerung und Enterprise Transformation.',
    steps: [
      { certId: 'pmp', benefit: 'Strategische PM-Seniorität' },
      { certId: 'prince2', benefit: 'Governance plus agile Ausführung' },
      { certId: 'safe', benefit: 'Skalierung oder agile Methodenbreite' }
    ]
  },
  {
    id: 'strategy-pmo',
    title: 'Strategy & PMO Lead',
    badge: 'GOVERNANCE / C-LEVEL',
    badgeColor: '#4CAF50',
    target: 'Manager, Principals, PMO Leads, Governance-Rollen',
    goal: 'C-Level Advisory, PMO-Aufbau, Governance und Value Delivery.',
    steps: [
      { certId: 'ipma', benefit: 'Führungs- und Sozialkompetenz im DACH-Markt' },
      { certId: 'pmocp', benefit: 'Modernes PMO of the Future' },
      { certId: 'p3o', benefit: 'Ergänzend für klassische Governance-Umfelder' }
    ]
  },
  {
    id: 'data-ai',
    title: 'Data & AI Project Lead',
    badge: 'ZUKUNFTSPROFIL 2026',
    badgeColor: '#9C27B0',
    target: 'Senior Consultants, Data & AI Project Leads, KI-nahe Projektleiter:innen',
    goal: 'Steuerung komplexer KI- und Data-Science-Projekte.',
    steps: [
      { certId: 'pmp', benefit: 'Solide PM-Governance' },
      { certId: 'cpmai', benefit: 'Methodische Steuerung von KI-Projekten' },
      { certId: 'fraunhofer', benefit: 'Strategische KI-Beratung im deutschen Markt' }
    ]
  },
  {
    id: 'agile-delivery',
    title: 'Agile Delivery & Product Focus',
    badge: 'AGILE DELIVERY',
    badgeColor: '#E8873A',
    target: 'Consultants in agilen IT-, Produkt- und Transformationsprojekten',
    goal: 'Agile Teams, Product Ownership und schnelle Delivery.',
    steps: [
      { certId: 'psm1', benefit: 'Scrum-Grundverständnis' },
      { certId: 'psm1', benefit: 'Product- und Value-Fokus (PSPO I)', altName: 'PSPO I' },
      { certId: 'pmiacp', benefit: 'Methodenbreite oder Skalierung' }
    ]
  }
];

const PROVIDERS = [
  { name: 'KAYENTA', focus: 'PMP, CAPM, PMI-ACP', format: 'Live Online / Inhouse', note: 'PMI Authorized Training Partner', recommendation: 'sehr empfohlen' },
  { name: 'SERVIEW', focus: 'PRINCE2, ITIL, SAFe', format: 'München / Remote', note: 'Starke Didaktik, PeopleCert-Fokus', recommendation: 'sehr empfohlen' },
  { name: 'PM-ZERT', focus: 'IPMA / GPM Prüfung', format: 'Zertifizierungsstelle', note: 'Offizielle Prüfungsstelle IPMA DE', recommendation: 'notwendig' },
  { name: 'Decisio / PS Consult', focus: 'IPMA Vorbereitung', format: 'Remote / Präsenz', note: 'Intensive IPMA Level C/B Vorbereitung', recommendation: 'empfohlen' },
  { name: 'Haufe Akademie', focus: 'Breite PM-Trainings', format: 'München / Remote / Blended', note: 'Praxisnahe Trainingslandschaft', recommendation: 'empfohlen' },
  { name: 'Management Forum Starnberg', focus: 'Leadership, PMO, C-Level', format: 'Präsenz / Hybrid', note: 'Hochwertig für Senior-Formate', recommendation: 'empfohlen für Senior' },
  { name: 'Scrum.org', focus: 'PSM / PSPO', format: 'Online-Prüfung / Selbststudium', note: 'Sehr gutes Kosten-Nutzen-Verhältnis', recommendation: 'sehr empfohlen' },
  { name: 'PMI / PMI ATPs', focus: 'PMP, PMI-ACP, PMOCP, CPMAI', format: 'Online / ATP-Kurse', note: 'Globaler Standard', recommendation: 'sehr empfohlen' },
  { name: 'Fraunhofer IAIS/FIT', focus: 'KI-Management', format: 'Online / Blended', note: 'Hohe Reputation im deutschen Markt', recommendation: 'empfohlen für KI-Strategie' }
];

// Finder logic: maps user choices to recommended certifications
const FINDER_LOGIC = {
  'junior|classic|international': ['capm', 'psm1', 'aipm'],
  'junior|classic|dach': ['capm', 'psm1', 'aipm'],
  'junior|classic|public': ['capm', 'psm1'],
  'junior|classic|it': ['psm1', 'capm', 'aipm'],
  'junior|agile|international': ['psm1', 'aipm'],
  'junior|agile|dach': ['psm1', 'aipm'],
  'junior|agile|public': ['psm1', 'aipm'],
  'junior|agile|it': ['psm1', 'aipm'],
  'junior|pmo|international': ['psm1', 'capm'],
  'junior|pmo|dach': ['psm1', 'capm'],
  'junior|pmo|public': ['psm1', 'capm'],
  'junior|pmo|it': ['psm1', 'capm'],
  'junior|ki|international': ['psm1', 'aipm'],
  'junior|ki|dach': ['psm1', 'aipm'],
  'junior|ki|public': ['psm1', 'aipm'],
  'junior|ki|it': ['psm1', 'aipm'],
  'senior|classic|international': ['pmp', 'prince2', 'psm1'],
  'senior|classic|dach': ['pmp', 'ipma', 'prince2'],
  'senior|classic|public': ['prince2', 'ipma', 'pmp'],
  'senior|classic|it': ['pmp', 'prince2', 'psm1'],
  'senior|agile|international': ['pmp', 'psm1', 'safe'],
  'senior|agile|dach': ['pmp', 'psm1', 'pmiacp'],
  'senior|agile|public': ['pmp', 'psm1', 'prince2'],
  'senior|agile|it': ['pmp', 'psm1', 'safe'],
  'senior|pmo|international': ['pmp', 'pmocp', 'prince2'],
  'senior|pmo|dach': ['ipma', 'pmocp', 'prince2'],
  'senior|pmo|public': ['prince2', 'ipma', 'pmocp'],
  'senior|pmo|it': ['pmp', 'pmocp', 'psm1'],
  'senior|ki|international': ['cpmai', 'pmp', 'aipm'],
  'senior|ki|dach': ['cpmai', 'aipm', 'pmp'],
  'senior|ki|public': ['cpmai', 'aipm', 'pmp'],
  'senior|ki|it': ['cpmai', 'aipm', 'pmp'],
  'lead|classic|international': ['pmp', 'ipma', 'prince2'],
  'lead|classic|dach': ['ipma', 'pmp', 'prince2'],
  'lead|classic|public': ['ipma', 'prince2', 'pmp'],
  'lead|classic|it': ['pmp', 'prince2', 'safe'],
  'lead|agile|international': ['pmp', 'safe', 'pmiacp'],
  'lead|agile|dach': ['pmp', 'safe', 'ipma'],
  'lead|agile|public': ['pmp', 'prince2', 'safe'],
  'lead|agile|it': ['pmp', 'safe', 'pmiacp'],
  'lead|pmo|international': ['pmocp', 'pmp', 'p3o'],
  'lead|pmo|dach': ['ipma', 'pmocp', 'p3o'],
  'lead|pmo|public': ['ipma', 'pmocp', 'prince2'],
  'lead|pmo|it': ['pmocp', 'pmp', 'psm1'],
  'lead|ki|international': ['cpmai', 'fraunhofer', 'pmp'],
  'lead|ki|dach': ['cpmai', 'fraunhofer', 'aipm'],
  'lead|ki|public': ['cpmai', 'fraunhofer', 'pmp'],
  'lead|ki|it': ['cpmai', 'fraunhofer', 'aipm']
};
