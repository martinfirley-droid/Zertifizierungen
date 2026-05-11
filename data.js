const CATEGORIES={classic:{id:'classic',label:'Klassisch & Hybrid',color:'#2B5F9E',emoji:'🔵'},agile:{id:'agile',label:'Agile & Delivery',color:'#D4782F',emoji:'🟠'},pmo:{id:'pmo',label:'PMO & Governance',color:'#2E8B57',emoji:'🟢'},ki:{id:'ki',label:'KI & Innovation',color:'#8B3A8B',emoji:'🟣'}};
const RECOMMENDATION_LEVELS={musthave:{label:'Must-have',color:'#2E8B57',icon:'✅'},empfohlen:{label:'Empfohlen',color:'#2B5F9E',icon:'👍'},strategisch:{label:'Strategisch',color:'#D4782F',icon:'🎯'},spezialrolle:{label:'Spezialrolle',color:'#8B3A8B',icon:'🔮'},optional:{label:'Optional',color:'#AAACAD',icon:'➕'}};
const CERTIFICATIONS=[
{id:'pmp',name:'PMP',fullName:'Project Management Professional',category:'classic',recommendation:'musthave',
targetGroup:'Senior Consultant, Manager, Associate Partner, Partner',
shortDescription:'Wichtigster internationaler Senioritätsnachweis im Projektmanagement.',
costMin:2000,costMax:3500,costLabel:'2.000–3.500 €',costDetail:'Prüfung: 405 USD (PMI-Mitglied) / 555 USD + Kurs ca. 1.500–2.500 €',
effortHours:120,effortLabel:'100–150 Stunden',effortWeeks:'8–12 Wochen',relevance:5,
provider:'KAYENTA (PMI ATP)',bookingUrl:'https://www.kayenta.de',
benefits:['Globale Anerkennung und Reputationsgewinn','Nachweis strategischer PM-Kompetenz','Anschlussfähigkeit bei internationalen Kunden','Potenzial für höhere Tagessätze'],
special2026:'Ab 9. Juli 2026 stärkere Ausrichtung auf Value Delivery, KI-Integration, Nachhaltigkeit.',
recertification:'Alle 3 Jahre, 60 PDUs',examDetails:'180 szenariobasierte Fragen, 230 Minuten',
suitable:['senior_consultant','manager','associate_partner','partner'],focus:['classic','hybrid'],environment:['international','konzern','dach']},

{id:'psm1',name:'PSM I / PSPO I',fullName:'Professional Scrum Master / Product Owner (Scrum.org)',category:'agile',recommendation:'musthave',
targetGroup:'Analyst, Consultant, Senior Consultant',
shortDescription:'Agiles Basisfundament mit sehr hohem ROI – dauerhaft gültig.',
costMin:150,costMax:400,costLabel:'200 USD je Prüfung',costDetail:'200 USD pro Prüfung, lebenslang gültig, keine Rezertifizierung',
effortHours:20,effortLabel:'1–2 Wochen Selbststudium',effortWeeks:'1–2 Wochen',relevance:5,
provider:'Scrum.org',bookingUrl:'https://www.scrum.org/assessments',
benefits:['Gemeinsames agiles Vokabular','Schnelle Einsatzfähigkeit in agilen Kundenprojekten','Hoher Nutzen bei IT- und Transformationsmandaten','Sehr gutes Kosten-Nutzen-Verhältnis'],
recertification:'Nicht erforderlich – dauerhaft gültig',
suitable:['analyst','consultant','senior_consultant','manager'],focus:['agile'],environment:['international','konzern','it']},

{id:'cpmai',name:'PMI-CPMAI',fullName:'Certified Professional in Managing AI',category:'ki',recommendation:'strategisch',
targetGroup:'Expert, Senior Expert, Senior Consultant (KI-Fokus)',
shortDescription:'Starkes Differenzierungsmerkmal für professionelle KI-Projektsteuerung.',
costMin:700,costMax:900,costLabel:'699–899 USD',costDetail:'699 USD (PMI-Mitglied) / 899 USD (Nicht-Mitglied) inkl. Prep Course',
effortHours:70,effortLabel:'5–8 Wochen',effortWeeks:'5–8 Wochen',relevance:5,
provider:'PMI',bookingUrl:'https://www.pmi.org/certifications/managing-ai-cpmai',
benefits:['Differenzierungsmerkmal im KI-Consulting','Steuerung komplexer KI-Projekte','Data Governance, AI Ethics, Model Drift','Starkes Kundensignal bei KI-Investitionen'],
examDetails:'120 szenariobasierte Fragen, 160 Minuten',
suitable:['senior_consultant','manager','expert','senior_expert'],focus:['ki'],environment:['international','konzern','it']},

{id:'ipma',name:'IPMA Level C/B',fullName:'IPMA / GPM Level C oder B',category:'classic',recommendation:'strategisch',
targetGroup:'Manager, Associate Partner, Partner',
shortDescription:'Besonders wertvoll für DACH-Markt, Public Sector und Automotive.',
costMin:5000,costMax:8000,costLabel:'5.000–8.000 €',costDetail:'Prüfung: 2.365–2.695 € + Lehrgang 3.000–5.000 €',
effortHours:120,effortLabel:'Sehr hoch (Reports + Assessment)',effortWeeks:'3–6 Monate',relevance:4,
provider:'PM-ZERT / Decisio',bookingUrl:'https://www.pm-zert.de',
benefits:['Hohe Akzeptanz im DACH-Raum','Nachweis echter Führungskompetenz','Stark in Public Sector, Automotive, Maschinenbau','Kompetenzbasiert statt nur wissensbasiert'],
recertification:'Alle 5 Jahre',
suitable:['manager','associate_partner','partner'],focus:['classic','leadership'],environment:['dach','public','automotive']},

{id:'pmocp',name:'PMI-PMOCP',fullName:'PMI PMO Certified Professional',category:'pmo',recommendation:'spezialrolle',
targetGroup:'Manager, Associate Partner (PMO-Fokus)',
shortDescription:'Modernes PMO-Zertifikat: Value Delivery, strategisches Alignment, PMO of the Future.',
costMin:1500,costMax:2000,costLabel:'1.500–2.000 €',costDetail:'ca. 1.500–2.000 € inkl. Vorbereitung',
effortHours:50,effortLabel:'Moderat, 3–4 Wochen',effortWeeks:'3–4 Wochen',relevance:3,
provider:'PMI',bookingUrl:'https://www.pmi.org/certifications/pmo-cp',
benefits:['Beratungsprodukt für PMO-Aufbau und -Sanierung','C-Level Advisory Grundlage','Strategisches Alignment und Wertbeitrag','Zukunftsfähiger als bürokratische PMO-Frameworks'],
suitable:['manager','associate_partner','partner'],focus:['pmo','governance'],environment:['konzern','dach']},

{id:'prince2',name:'PRINCE2 Agile',fullName:'PRINCE2 / PRINCE2 Agile',category:'classic',recommendation:'empfohlen',
targetGroup:'Senior Consultant, Manager',
shortDescription:'Governance-Struktur + agile Ausführung für regulierte Umfelder.',
costMin:1500,costMax:2500,costLabel:'1.500–2.500 €',costDetail:'Foundation + Practitioner Bundle ca. 1.500–2.500 €',
effortHours:40,effortLabel:'3–5 Tage Training + Prüfung',effortWeeks:'1–2 Wochen',relevance:4,
provider:'SERVIEW',bookingUrl:'https://www.serview.de',
benefits:['Passend zu Konzern-, Public-Sector-, Pharma- und Finanzumfeldern','Klare Rollen, Phasen, Eskalationswege','Schnelle Integration in bestehende Kundenmethodiken','Hilfreich bei stark auditierbaren Projekten'],
suitable:['senior_consultant','manager','associate_partner'],focus:['classic','governance'],environment:['konzern','public','dach','insurance']},

{id:'safe',name:'SAFe',fullName:'SAFe Advanced Scrum Master',category:'agile',recommendation:'spezialrolle',
targetGroup:'Senior Consultant, Manager (Enterprise-Kontext)',
shortDescription:'Enterprise Agile – Skalierung über Teams, Release Trains und Portfolio.',
costMin:950,costMax:1700,costLabel:'950–1.700 €',costDetail:'950–1.700 € inkl. Prüfung + 1 Jahr Mitgliedschaft',
effortHours:25,effortLabel:'2 Tage Training + Prüfung',effortWeeks:'1 Woche',relevance:3,
provider:'KEGON / SERVIEW',bookingUrl:'https://kegonacademy.com',
benefits:['Anschlussfähigkeit an DAX- und Großkonzernumfelder','PI Planning, Release Trains, Lean Portfolio Management','Nützlich bei großen Transformationsprogrammen'],
recertification:'Jährlich, ca. 295 USD/Jahr',
suitable:['senior_consultant','manager'],focus:['agile','skalierung'],environment:['konzern','international']},

{id:'pmiacp',name:'PMI-ACP',fullName:'Agile Certified Practitioner',category:'agile',recommendation:'empfohlen',
targetGroup:'Senior Consultant, Manager (agiler Fokus)',
shortDescription:'Breites agiles Methodenverständnis: Kanban, Lean, XP, TDD.',
costMin:435,costMax:495,costLabel:'435–495 USD',costDetail:'435 USD (PMI-Mitglied) / 495 USD (Nicht-Mitglied)',
effortHours:50,effortLabel:'Mittel',effortWeeks:'3–4 Wochen',relevance:3,
provider:'PMI / ATPs',bookingUrl:'https://www.pmi.org/certifications/agile-acp',
benefits:['Breiteres agiles Methodenverständnis','Nützlich für Umfelder ohne eindeutiges Scrum-Setup','Gute Ergänzung für hybride und agile Senior-Profile'],
suitable:['senior_consultant','manager'],focus:['agile'],environment:['international','it']},

{id:'aipm',name:'APMG AIPM',fullName:'AI-Driven Project Manager',category:'ki',recommendation:'empfohlen',
targetGroup:'Analyst bis Manager – breite Zielgruppe',
shortDescription:'Quick Win: KI effizient im PM-Alltag nutzen – geringer Aufwand, hoher Impact.',
costMin:400,costMax:700,costLabel:'400–700 USD',costDetail:'400–700 USD (Self-Paced + Exam)',
effortHours:15,effortLabel:'1–2 Wochen',effortWeeks:'1–2 Wochen',relevance:4,
provider:'APMG International',bookingUrl:'https://pmairevolution.com',
benefits:['Effizienzgewinn bei Statusberichten, Protokollen, Analysen','Verbesserte Risikoanalysen und Stakeholderkommunikation','Schnell anwendbar im Projektalltag','Geringer Aufwand und niedrige Einstiegshürde'],
suitable:['analyst','consultant','senior_consultant','manager','expert'],focus:['ki'],environment:['international','konzern','dach','it']},

{id:'p3o',name:'P3O',fullName:'Portfolio, Programme and Project Offices',category:'pmo',recommendation:'optional',
targetGroup:'Manager, Associate Partner (PMO-Governance)',
shortDescription:'Klassisches PMO-Governance-Framework für formale Umfelder.',
costMin:1500,costMax:2000,costLabel:'1.500–2.000 €',costDetail:'Foundation + Practitioner ca. 1.500–2.000 €',
effortHours:40,effortLabel:'Mittel',effortWeeks:'2–3 Wochen',relevance:3,
provider:'SERVIEW / Axelos',bookingUrl:'https://www.serview.de',
benefits:['Nützlich bei Behörden, Banken, stark hierarchischen Organisationen','Blaupause für Governance- und Assurance-Strukturen','Ergänzend zu PMI-PMOCP'],
suitable:['manager','associate_partner'],focus:['pmo','governance'],environment:['public','konzern','insurance']},

{id:'capm',name:'CAPM',fullName:'Certified Associate in Project Management',category:'classic',recommendation:'optional',
targetGroup:'Analyst, Consultant',
shortDescription:'Methodisches PM-Grundvokabular ohne umfangreiche Führungserfahrung.',
costMin:250,costMax:350,costLabel:'250–350 USD',costDetail:'250 USD (PMI-Mitglied) / 350 USD (Nicht-Mitglied)',
effortHours:30,effortLabel:'Moderat',effortWeeks:'2–4 Wochen',relevance:2,
provider:'PMI / KAYENTA',bookingUrl:'https://www.kayenta.de',
benefits:['Niedrigschwelliger Einstieg in PM-Methodik','Gute Vorbereitung auf späteren PMP','International anerkannt'],
suitable:['analyst','consultant'],focus:['classic'],environment:['international','konzern']},

{id:'fraunhofer',name:'Fraunhofer KI-Manager',fullName:'Fraunhofer Zertifizierter KI-Manager',category:'ki',recommendation:'spezialrolle',
targetGroup:'Associate Partner, Partner, Senior Expert',
shortDescription:'Reputationsstark im deutschen Markt – für strategische KI-Transformation.',
costMin:3950,costMax:3950,costLabel:'3.950 €',costDetail:'3.950 €, 3 Wochen Online-Format',
effortHours:80,effortLabel:'Hoch, 3 Wochen',effortWeeks:'3 Wochen',relevance:4,
provider:'Fraunhofer IAIS / FIT',bookingUrl:'https://www.academy.fraunhofer.de/',
benefits:['Hohe Glaubwürdigkeit im deutschen Markt','Vertrauensanker im C-Level-Umfeld','Geeignet für unternehmensweite KI-Transformation','Strategische KI-Beratung'],
suitable:['associate_partner','partner','senior_expert'],focus:['ki','strategie'],environment:['dach']}
];

const CAREER_LEVELS=[
{id:'analyst',label:'Analyst',group:'einstieg'},
{id:'consultant',label:'Consultant',group:'einstieg'},
{id:'senior_consultant',label:'Senior Consultant',group:'aufbau'},
{id:'manager',label:'Manager',group:'erfahren'},
{id:'expert',label:'Expert',group:'spezialist'},
{id:'senior_expert',label:'Senior Expert',group:'spezialist'},
{id:'associate_partner',label:'Associate Partner',group:'senior'},
{id:'partner',label:'Partner',group:'senior'}
];

const MARKETS=[
{id:'healthcare',label:'Healthcare',icon:'🏥'},
{id:'cross_industries',label:'Cross Industries',icon:'🔄'},
{id:'mobility',label:'Mobility',icon:'🚗'},
{id:'public',label:'Public',icon:'🏛️'},
{id:'energy',label:'Energy',icon:'⚡'},
{id:'insurance',label:'Insurance',icon:'🛡️'},
{id:'automotive',label:'Automotive',icon:'🏭'}
];

const PM_ROLES=[
{id:'klassisch',label:'Klassische Projektleitung',icon:'📋'},
{id:'agile',label:'Agile Delivery / Scrum Master',icon:'🔄'},
{id:'product',label:'Product Owner',icon:'📦'},
{id:'pmo',label:'PMO / Governance',icon:'🏢'},
{id:'programm',label:'Programm-/Portfoliomanagement',icon:'📊'},
{id:'ki',label:'KI- / Data-Projektleitung',icon:'🤖'}
];

const DEVELOPMENT_PATHS=[
{id:'einstieg',title:'Analyst → Consultant',badge:'EINSTIEG',badgeColor:'#2E8B57',
target:'Analyst, Consultant – Berufseinsteiger:innen',
goal:'Solides PM-Handwerkszeug, agiles Grundverständnis, effiziente Nutzung von KI.',
steps:[{certId:'capm',benefit:'Methodisches Grundvokabular'},{certId:'psm1',benefit:'Agile Anschlussfähigkeit'},{certId:'aipm',benefit:'KI-Effizienz im PM-Alltag'}]},

{id:'delivery',title:'Senior Consultant → Manager (Delivery)',badge:'DELIVERY',badgeColor:'#D4782F',
target:'Senior Consultant, Manager – IT- & Transformationsprojekte',
goal:'Projektführung, hybride Steuerung und Enterprise Transformation.',
steps:[{certId:'pmp',benefit:'Strategische PM-Seniorität'},{certId:'prince2',benefit:'Governance + agile Ausführung'},{certId:'safe',benefit:'Skalierung / Methodenbreite'}]},

{id:'governance',title:'Manager → Associate Partner (Governance)',badge:'GOVERNANCE',badgeColor:'#2E8B57',
target:'Manager, Associate Partner – PMO- & Governance-Rollen',
goal:'C-Level Advisory, PMO-Aufbau, Governance und Value Delivery.',
steps:[{certId:'ipma',benefit:'Führungskompetenz im DACH-Markt'},{certId:'pmocp',benefit:'Modernes PMO of the Future'},{certId:'p3o',benefit:'Klassische Governance-Umfelder'}]},

{id:'ki-track',title:'Expert → Senior Expert (KI-Track)',badge:'KI & DATA',badgeColor:'#8B3A8B',
target:'Expert, Senior Expert – KI- & Data-Projektleitung',
goal:'Steuerung komplexer KI- und Data-Science-Projekte.',
steps:[{certId:'pmp',benefit:'Solide PM-Governance'},{certId:'cpmai',benefit:'KI-Projekte methodisch steuern'},{certId:'fraunhofer',benefit:'Strategische KI-Beratung'}]},

{id:'agile-track',title:'Consultant → Senior Consultant (Agile)',badge:'AGILE DELIVERY',badgeColor:'#D4782F',
target:'Consultant, Senior Consultant – Agile IT- & Produktprojekte',
goal:'Agile Teams, Product Ownership und schnelle Delivery.',
steps:[{certId:'psm1',benefit:'Scrum-Grundverständnis'},{certId:'psm1',benefit:'Product- & Value-Fokus (PSPO I)',altName:'PSPO I'},{certId:'pmiacp',benefit:'Methodenbreite / Skalierung'}]}
];

const PROVIDERS=[
{name:'KAYENTA',focus:'PMP, CAPM, PMI-ACP',format:'Live Online / Inhouse',note:'PMI Authorized Training Partner',recommendation:'sehr empfohlen',url:'https://www.kayenta.de'},
{name:'SERVIEW',focus:'PRINCE2, SAFe, ITIL',format:'München / Remote',note:'Starke Didaktik, PeopleCert-Fokus',recommendation:'sehr empfohlen',url:'https://www.serview.de'},
{name:'PM-ZERT (GPM)',focus:'IPMA Level D–A',format:'Zertifizierungsstelle',note:'Offizielle IPMA-Prüfungsstelle DE',recommendation:'notwendig',url:'https://www.pm-zert.de'},
{name:'Decisio',focus:'IPMA Vorbereitung',format:'Remote / Präsenz',note:'Intensive IPMA Level C/B Vorbereitung',recommendation:'empfohlen',url:'https://www.decisio.de'},
{name:'Haufe Akademie',focus:'Breite PM-Trainings',format:'München / Remote / Blended',note:'Praxisnahe Trainingslandschaft',recommendation:'empfohlen',url:'https://www.haufe-akademie.de'},
{name:'Scrum.org',focus:'PSM / PSPO',format:'Online-Prüfung / Selbststudium',note:'200 USD, lebenslang gültig',recommendation:'sehr empfohlen',url:'https://www.scrum.org/assessments'},
{name:'PMI',focus:'PMP, ACP, PMOCP, CPMAI',format:'Online / ATP-Kurse',note:'Globaler Standard',recommendation:'sehr empfohlen',url:'https://www.pmi.org/certifications'},
{name:'KEGON Academy',focus:'SAFe Trainings',format:'Remote / Präsenz',note:'Autorisierter SAFe Gold Partner',recommendation:'empfohlen',url:'https://www.kegon.de/safe-trainings'},
{name:'Fraunhofer IAIS/FIT',focus:'KI-Management',format:'3 Wochen Online',note:'3.950 €, hohe DACH-Reputation',recommendation:'empfohlen für KI-Strategie',url:'https://www.bigdata.fraunhofer.de/ki-manager'}
];

// Finder logic: career_group|market_group|pm_role -> cert IDs
function getFinderResults(careerLevel,market,pmRole){
  const cl=CAREER_LEVELS.find(c=>c.id===careerLevel);
  const group=cl?cl.group:'aufbau';
  // Market relevance mapping
  const govMarkets=['public','insurance'];
  const dachMarkets=['automotive','energy','public'];
  const intlMarkets=['cross_industries','mobility','healthcare'];
  const isGov=govMarkets.includes(market);
  const isDach=dachMarkets.includes(market);
  const isIntl=intlMarkets.includes(market);
  // Base recommendations by group+role
  const map={
    'einstieg|klassisch':['capm','psm1','aipm'],
    'einstieg|agile':['psm1','aipm','capm'],
    'einstieg|product':['psm1','aipm','capm'],
    'einstieg|pmo':['capm','psm1','aipm'],
    'einstieg|programm':['capm','psm1','aipm'],
    'einstieg|ki':['psm1','aipm','capm'],
    'aufbau|klassisch':['pmp','prince2','psm1'],
    'aufbau|agile':['psm1','pmp','pmiacp'],
    'aufbau|product':['psm1','pmp','aipm'],
    'aufbau|pmo':['pmp','prince2','pmocp'],
    'aufbau|programm':['pmp','prince2','ipma'],
    'aufbau|ki':['cpmai','aipm','pmp'],
    'erfahren|klassisch':['pmp','ipma','prince2'],
    'erfahren|agile':['pmp','safe','pmiacp'],
    'erfahren|product':['pmp','psm1','safe'],
    'erfahren|pmo':['pmocp','ipma','prince2'],
    'erfahren|programm':['ipma','pmp','pmocp'],
    'erfahren|ki':['cpmai','pmp','fraunhofer'],
    'spezialist|klassisch':['pmp','ipma','prince2'],
    'spezialist|agile':['safe','pmiacp','pmp'],
    'spezialist|product':['psm1','pmp','pmiacp'],
    'spezialist|pmo':['pmocp','p3o','ipma'],
    'spezialist|programm':['ipma','pmp','pmocp'],
    'spezialist|ki':['cpmai','fraunhofer','aipm'],
    'senior|klassisch':['ipma','pmp','prince2'],
    'senior|agile':['pmp','safe','ipma'],
    'senior|product':['pmp','psm1','ipma'],
    'senior|pmo':['ipma','pmocp','p3o'],
    'senior|programm':['ipma','pmp','pmocp'],
    'senior|ki':['fraunhofer','cpmai','pmp']
  };
  let key=group+'|'+pmRole;
  let certs=[...(map[key]||['pmp','psm1','aipm'])];
  // Market adjustments
  if(isGov&&!certs.includes('prince2')&&group!=='einstieg')certs.splice(1,0,'prince2');
  if(isDach&&!certs.includes('ipma')&&group!=='einstieg')certs.splice(Math.min(2,certs.length),0,'ipma');
  if(isIntl&&!certs.includes('pmp')&&group!=='einstieg')certs.unshift('pmp');
  // Deduplicate and limit to 3
  certs=[...new Set(certs)].slice(0,3);
  return certs;
}
