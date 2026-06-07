export interface IndustryData {
  slug: string;
  title: string;
  industryName: string;
  lead: string;
  whyBidsWonLost: string;
  whatWeDo: string;
  whoWeHelp: string;
  naics: string;
  unspsc: string;
  faqs: { question: string; answer: string }[];
}

export const INDUSTRIES_DATA: Record<string, IndustryData> = {
  "janitorial-services": {
    slug: "janitorial-services",
    title: "Win Janitorial & Custodial Government Contracts",
    industryName: "janitorial and custodial",
    lead: "Government agencies, school districts, and facilities award janitorial and custodial contracts every day — and they're won or lost on the proposal, not the mop. Stronger Built helps janitorial and facilities-services companies find, write, and win those bids nationwide. We handle the entire proposal end to end, and with Pay-When-You-Win, you mostly pay when you win.",
    whyBidsWonLost: "Custodial RFPs hinge on details most companies underestimate: a compliant staffing and coverage plan, the right certifications and insurance, prevailing-wage and labor compliance, green-cleaning and safety standards, a defensible price, and documented past performance. Miss one required form or scoring criterion and you're disqualified before price is even read.",
    whatWeDo: "We find qualifying janitorial and custodial opportunities across federal, state, county, city, and school-district portals; build a complete compliance matrix; write the technical approach, staffing plan, and management narrative; help you price to win; and submit on time through the buyer's portal — all under your company's name.",
    whoWeHelp: "Janitorial, custodial, and facilities-maintenance companies — from first-time bidders to crews that bid regularly and want to win more.",
    naics: "561720",
    unspsc: "76111501",
    faqs: [
      { question: "How do I find government janitorial contracts?", answer: "They're posted on federal, state, and local procurement portals; our Bid Finder searches them nationwide and surfaces the ones worth pursuing." },
      { question: "Do I need certifications to win janitorial bids?", answer: "Often, set-aside contracts require them (small business, veteran-owned, etc.); we'll tell you which opportunities you qualify for." },
      { question: "What does it cost?", answer: "A low bid writing fee plus a success fee only if you win. See our pricing page for details." }
    ]
  },
  "security-services": {
    slug: "security-services",
    title: "Win Security & Guard Government Contracts",
    industryName: "security services",
    lead: "Federal, state, and municipal agencies procure security guard and surveillance services continuously. Stronger Built helps private security firms find, write, and win these lucrative government contracts nationwide. We handle the proposal end to end, and with Pay-When-You-Win, you mostly pay when you win.",
    whyBidsWonLost: "Security bids are won and lost on strict compliance: guard licensing, clear background checks, continuous training protocols, emergency response times, supervisor-to-guard ratios, and liability insurance. Evaluators look for absolute operational readiness; any gap in certification or standard operating procedures means instant disqualification.",
    whatWeDo: "We search nationwide for active security contracts, translate complex security requirements into a compliance matrix, author your complete management and operations plan, write standard training narratives, and handle final portal submissions.",
    whoWeHelp: "Armed and unarmed security firms, executive protection agencies, and patrol companies looking to expand their public sector footprint.",
    naics: "561612",
    unspsc: "46171600",
    faqs: [
      { question: "How do security companies qualify for government bids?", answer: "Agencies require active state guard licenses (like BSIS in CA), proof of commercial liability insurance, and clear staff training standards. We analyze each RFP to ensure you meet all prerequisites before bidding." },
      { question: "Are there set-aside contracts for veteran-owned security firms?", answer: "Yes, many state and federal security contracts are set aside for SDVOSBs, DVBEs, and small businesses. We'll identify these and help you leverage your status." }
    ]
  },
  "it-software": {
    slug: "it-software",
    title: "Win IT & Software Government Contracts",
    industryName: "IT and software",
    lead: "Government agencies are rapidly modernizing their software, infrastructure, and IT services. Stronger Built helps GovTech, SaaS, and IT service providers find, write, and win government contracts nationwide. We handle the proposal end to end, and with Pay-When-You-Win, you mostly pay when you win.",
    whyBidsWonLost: "IT solicitations require technical precision: cybersecurity standards (FedRAMP, NIST, CJIS), data privacy, SLA guarantees, scalability plans, and detailed system architecture. Evaluators score heavily on compliance with security frameworks; vague explanations or missing certifications will sink your proposal.",
    whatWeDo: "We monitor all government portals for software, SaaS, and IT development opportunities. We write your security, management, and technical responses, ensuring clear communication of complex tech to procurement officers.",
    whoWeHelp: "Software startups, cybersecurity consultants, managed service providers (MSPs), and SaaS platforms pursuing government agency clients.",
    naics: "541511",
    unspsc: "81111500",
    faqs: [
      { question: "Do I need FedRAMP or SOC 2 compliance to bid?", answer: "Many federal and state IT contracts require specific security compliance. We help you review these requirements to ensure your software or service is ready for evaluation." },
      { question: "How do we compete against legacy IT giants?", answer: "Many contracts require small business participation or set-asides. We help you highlight your agility, cost-effectiveness, and compliance to stand out." }
    ]
  },
  "healthcare-staffing": {
    slug: "healthcare-staffing",
    title: "Win Healthcare & Medical Staffing Government Contracts",
    industryName: "healthcare and staffing",
    lead: "From correctional facilities to veteran clinics, government bodies are among the largest buyers of medical staffing and healthcare services. Stronger Built helps staffing agencies find, write, and win public sector contracts nationwide. We handle the proposal end to end, and with Pay-When-You-Win, you mostly pay when you win.",
    whyBidsWonLost: "Healthcare bids demand rigorous compliance: provider credentialing, background checks, shift coverage ratios, licensing verification, and quality assurance programs. Evaluators require proof that you can reliably supply qualified personnel without operational gaps.",
    whatWeDo: "We source medical staffing opportunities, outline the credentialing verification workflows, structure your recruitment and retention narratives, and submit compliant proposals under your agency's name.",
    whoWeHelp: "Nursing agencies, locum tenens firms, medical supply companies, and wellness program administrators targeting public contracts.",
    naics: "561320",
    unspsc: "85101601",
    faqs: [
      { question: "How do agencies verify healthcare provider credentials?", answer: "Agencies require a primary source verification plan in your proposal. We write compliant workflows demonstrating how you verify licensing, education, and background checks." },
      { question: "Do you help healthcare suppliers bid on medical equipment?", answer: "Yes, we help medical supply distributors respond to government solicitations for equipment, consumables, and logistics support." }
    ]
  },
  "professional-services": {
    slug: "professional-services",
    title: "Win Professional Services Government Contracts",
    industryName: "professional services",
    lead: "Agencies frequently contract out professional services, from marketing and design to auditing, legal, and management consulting. Stronger Built helps consulting firms find, write, and win government RFPs nationwide. We handle the proposal end to end, and with Pay-When-You-Win, you mostly pay when you win.",
    whyBidsWonLost: "Professional service bids are won on methodologies and past performance. Evaluators score heavily on your proposed work plan, the experience of key personnel (resumes), clear deliverables, and relevant case studies.",
    whatWeDo: "We match your firm to high-value professional service RFPs, draft the project management and methodology sections, format personnel resumes to match scoring rubrics, and ensure compliance with all forms.",
    whoWeHelp: "Marketing agencies, financial consultants, legal advisors, engineering designers, and management consulting firms.",
    naics: "541611",
    unspsc: "80101500",
    faqs: [
      { question: "How important are key personnel resumes in professional services bids?", answer: "Critical. Evaluators score bids based on the qualifications and years of experience of your proposed team. We tailor resume highlights to align directly with RFP requirements." },
      { question: "Can we use subcontractors to boost our bid's qualifications?", answer: "Yes. Partnering with diverse subcontractors (like DVBEs or WOSBs) often increases your score and helps you meet mandatory participation goals. We help structure these partnerships." }
    ]
  },
  "education-training": {
    slug: "education-training",
    title: "Win Education & Training Government Contracts",
    industryName: "education and training",
    lead: "School districts, universities, and federal agencies spend millions on educational materials, training programs, and curriculum development. Stronger Built helps educational service companies find, write, and win these contracts nationwide. We handle the proposal end to end, and with Pay-When-You-Win, you mostly pay when you win.",
    whyBidsWonLost: "Education RFPs are evaluated on curriculum alignment, trainer credentials, measurable learning outcomes, and student support. Missing administrative compliance or background check agreements (e.g. fingerprinting) can get a proposal thrown out immediately.",
    whatWeDo: "We source contracts from school districts and higher education, write the technical approach and learning outcome methodologies, build compliance matrixes, and submit the proposal under your brand.",
    whoWeHelp: "Corporate trainers, educational software (EdTech) providers, curriculum designers, and professional development consultants.",
    naics: "611710",
    unspsc: "86132000",
    faqs: [
      { question: "Do school district bids require special background clearances?", answer: "Yes, almost all school district bids require fingerprinting and background checks (e.g., Live Scan) for personnel on site. We ensure these safety requirements are fully addressed in your proposal." },
      { question: "Can we bid on curriculum licensing?", answer: "Yes. Many educational institutions issue RFPs for licensing digital curricula or software. We help you write the technical specifications and licensing terms." }
    ]
  },
  "facility-maintenance": {
    slug: "facility-maintenance",
    title: "Win Facility Maintenance Government Contracts",
    industryName: "facility maintenance",
    lead: "Public buildings, transit systems, and commercial assets require continuous facility maintenance. Stronger Built helps maintenance companies find, write, and win government maintenance contracts nationwide. We handle the proposal end to end, and with Pay-When-You-Win, you mostly pay when you win.",
    whyBidsWonLost: "Maintenance bids turn on dispatch systems, preventive schedules, emergency response SLAs, and licensed oversight. If you cannot prove 24/7 reliability or omit proof of local operational capacity, your bid will be marked down.",
    whatWeDo: "We match you to local and federal facility maintenance bids, write the preventative schedules and SLA response narratives, construct clear staffing charts, and manage portal submission.",
    whoWeHelp: "Facility maintenance companies, property management firms, and multi-trade contractors.",
    naics: "561210",
    unspsc: "72101507",
    faqs: [
      { question: "What SLAs are typically required in government maintenance bids?", answer: "Agencies usually require emergency response within 2 to 4 hours. We help write narratives demonstrating your dispatch and technician staging to fulfill these terms." },
      { question: "How do we prove past performance on multi-trade contracts?", answer: "We compile detailed histories of your past work, demonstrating success in handling complex, multi-trade facilities under tight timelines." }
    ]
  },
  "construction-material-supply": {
    slug: "construction-material-supply",
    title: "Win Material Supply & Logistics Government Contracts",
    industryName: "material supply and logistics",
    lead: "Agencies buy concrete, steel, lumber, pipes, and bulk office goods on massive contracts. Stronger Built helps suppliers and distributors find, write, and win government material supply bids nationwide. We handle the proposal end to end, and with Pay-When-You-Win, you mostly pay when you win.",
    whyBidsWonLost: "Supply bids require firm delivery schedules, supply chain reliability, inventory validation, and pricing guarantees. Missing freight terms or showing an unstable supply partner will get your bid rejected.",
    whatWeDo: "We source supply opportunities, draft the delivery logistics narratives, detail supply chain backup plans, write compliance statements, and submit bids on your behalf.",
    whoWeHelp: "Wholesale distributors, manufacturers, material brokers, and logistical companies.",
    naics: "423390",
    unspsc: "30000000",
    faqs: [
      { question: "What is FOB Destination and why does it matter?", answer: "FOB Destination means you are responsible for the goods until they arrive at the buyer's site. We ensure your pricing and logistics narratives account for this correctly." },
      { question: "How do we document supply chain reliability?", answer: "We write detailed supplier validation summaries, showing you have guaranteed allocations and back-up partners to prevent delivery delays." }
    ]
  },
  "construction-consulting": {
    slug: "construction-consulting",
    title: "Win Construction Consulting Government Contracts",
    industryName: "construction consulting",
    lead: "Agencies hire external consultants for feasibility reviews, cost estimation, engineering, and inspections. Stronger Built helps construction consulting firms find, write, and win these proposals nationwide. We handle the proposal end to end, and with Pay-When-You-Win, you mostly pay when you win.",
    whyBidsWonLost: "Consulting proposals require proof of professional certifications, licensed engineering expertise, historical cost-model accuracy, and independent oversight. Ambiguity about your project management workflow or peer-review process results in scoring loss.",
    whatWeDo: "We find high-value consulting solicitations, write the independent QA/QC review narratives, format engineering resumes to match scoring grids, and file the bid packages.",
    whoWeHelp: "Cost estimators, constructability reviewers, value engineers, and owner representative agencies.",
    naics: "236220",
    unspsc: "80101601",
    faqs: [
      { question: "Do we need professional engineering (PE) licenses to bid?", answer: "Many construction consulting RFPs require a PE or AIA stamp. We check all RFP requirements to ensure your team's credentials meet the criteria." }
    ]
  },
  "project-management": {
    slug: "project-management",
    title: "Win Project Management Government Contracts",
    industryName: "project management",
    lead: "Public works and civil infrastructure projects require third-party schedule and quality oversight. Stronger Built helps project management consultants find, write, and win public RFPs nationwide. We handle the proposal end to end, and with Pay-When-You-Win, you mostly pay when you win.",
    whyBidsWonLost: "Project management bids are evaluated on scheduling precision (CPM), cost control methods, and safety records. Evaluators want to see a rigorous project management methodology that avoids delays.",
    whatWeDo: "We find matching PM opportunities, draft the scheduling and reporting workflows, outline risk management plans, and submit compliance paperwork.",
    whoWeHelp: "Construction management (CM) firms, scheduling consultants, and QA/QC inspection agencies.",
    naics: "236220",
    unspsc: "80101601",
    faqs: [
      { question: "What project management frameworks do agencies look for?", answer: "Evaluators expect scheduling methodologies based on Critical Path Method (CPM). We write detailed descriptions of your scheduling software and tracking methods." }
    ]
  },
  "subcontracting-services": {
    slug: "subcontracting-services",
    title: "Win Trade Subcontracting Government Contracts",
    industryName: "trade subcontracting",
    lead: "Prime contractors and public bodies require specialized trade partners. Stronger Built helps specialty subcontractors find, write, and win public trade contracts nationwide. We handle the proposal end to end, and with Pay-When-You-Win, you mostly pay when you win.",
    whyBidsWonLost: "Subcontracting bids require trade licenses, safety ratings (EMR), union/labor compliance, and prevailing-wage capability. Any licensing gap or high EMR safety score results in immediate disqualification.",
    whatWeDo: "We source public trade packages, draft the safety and execution narratives, verify labor compliance structures, and compile all necessary trade certifications.",
    whoWeHelp: "Electrical, plumbing, HVAC, painting, and general construction trade contractors.",
    naics: "238990",
    unspsc: "72101500",
    faqs: [
      { question: "How does the prevailing wage requirement affect my bid?", answer: "Prevailing wage requires paying specific wages and filing certified payroll reports. We help ensure your pricing models and administrative narratives reflect full compliance." }
    ]
  },
  "landscape-grounds-maintenance": {
    slug: "landscape-grounds-maintenance",
    title: "Win Landscape & Grounds Government Contracts",
    industryName: "landscape and grounds maintenance",
    lead: "Agencies manage thousands of acres of parks, public housing, and highway margins. Stronger Built helps landscaping companies find, write, and win public grounds maintenance contracts. We handle the proposal end to end, and with Pay-When-You-Win, you mostly pay when you win.",
    whyBidsWonLost: "Landscaping bids hinge on staffing numbers, equipment lists, pesticide licensing, water conservation plans, and seasonal schedules. Underestimating equipment needs or failing to supply chemical applicator licenses leads to rejection.",
    whatWeDo: "We find local and national landscaping solicitations, write pesticide and water safety narratives, list equipment capabilities, and submit completed bids.",
    whoWeHelp: "Commercial landscaping firms, tree services, and weed abatement contractors.",
    naics: "561730",
    unspsc: "70111706",
    faqs: [
      { question: "Do we need pesticide applicator licenses to bid?", answer: "For weed control and turf management, agencies require active state applicator licenses. We make sure all active certifications are attached and highlighted." }
    ]
  },
  "graffiti-abatement": {
    slug: "graffiti-abatement",
    title: "Win Graffiti Abatement & Washing Government Contracts",
    industryName: "graffiti abatement and washing",
    lead: "Cities and school districts issue frequent contracts for graffiti removal and pressure washing. Stronger Built helps abatement companies find, write, and win public washing bids. We handle the proposal end to end, and with Pay-When-You-Win, you mostly pay when you win.",
    whyBidsWonLost: "Abatement bids are evaluated on response speed, color-matching capabilities, environmental safety (wastewater recapture), and chemical storage. Failing to detail chemical containment or wastewater safety regulations will disqualify your bid.",
    whatWeDo: "We track municipal washing opportunities, write environmental compliance and response narratives, outline dispatch setups, and submit portals-ready bids.",
    whoWeHelp: "Pressure washing services, graffiti removal teams, and exterior restoration specialists.",
    naics: "561790",
    unspsc: "76111504",
    faqs: [
      { question: "What environmental rules apply to pressure washing bids?", answer: "Wastewater run-off must be recaptured and disposed of according to EPA guidelines. We write compliant run-off containment plans to pass evaluation." }
    ]
  },
  "parking-lot-striping": {
    slug: "parking-lot-striping",
    title: "Win Parking Lot Striping & Sealcoating Government Contracts",
    industryName: "parking lot striping and sealcoating",
    lead: "Maintaining public parking lots requires striping, sealcoating, and ADA updates. Stronger Built helps striping companies find, write, and win government parking lot contracts. We handle the proposal end to end, and with Pay-When-You-Win, you mostly pay when you win.",
    whyBidsWonLost: "Striping bids are won on ADA compliance knowledge, paint specifications, traffic management plans, and schedule duration. Minor errors in ADA space layouts will result in instant disqualification.",
    whatWeDo: "We source municipal asphalt maintenance bids, build the ADA compliance narratives, outline traffic flow plans during application, and submit proposals.",
    whoWeHelp: "Asphalt maintenance contractors, striping teams, and sealcoating operators.",
    naics: "238990",
    unspsc: "30121804",
    faqs: [
      { question: "How do we prove ADA compliance knowledge?", answer: "We write detailed compliance narratives citing specific ADA and state regulations (e.g. Title 24 in CA) to prove your paint layouts will meet legal inspection." }
    ]
  },
  "window-cleaning": {
    slug: "window-cleaning",
    title: "Win Commercial Window Cleaning Government Contracts",
    industryName: "commercial window cleaning",
    lead: "Courthouses, admin buildings, and schools require regular window cleaning services. Stronger Built helps window cleaning companies find, write, and win public window maintenance bids. We handle the proposal end to end, and with Pay-When-You-Win, you mostly pay when you win.",
    whyBidsWonLost: "Window cleaning RFPs focus heavily on safety plans, lift certification, OSHA compliance, building access schedules, and liability limits. Failing to provide a complete safety program is the primary reason bids are disqualified.",
    whatWeDo: "We track high-value window maintenance bids, write comprehensive OSHA-compliant safety manuals and fall-protection narratives, and submit final proposals.",
    whoWeHelp: "Commercial window cleaning businesses and high-rise maintenance crews.",
    naics: "561720",
    unspsc: "76111502",
    faqs: [
      { question: "What safety documentation is required for high-rise cleaning?", answer: "Agencies require a Fall Protection Plan and lift certifications. We compile and write these safety sections to ensure compliance with OSHA and evaluation rules." }
    ]
  },
  "painting-services": {
    slug: "painting-services",
    title: "Win Commercial Painting Government Contracts",
    industryName: "commercial painting",
    lead: "From school repaints to weatherproofing municipal facilities, painting contracts are constantly issued. Stronger Built helps commercial painting companies find, write, and win government painting contracts. We handle the proposal end to end, and with Pay-When-You-Win, you mostly pay when you win.",
    whyBidsWonLost: "Painting bids are won on surface preparation plans, paint manufacturer warranties, environmental regulations (VOC limits), and labor compliance. Failing to specify prep methods or paint types leads to scoring loss.",
    whatWeDo: "We track public painting RFPs, write detailed prep and application methodologies, verify lead-safety and VOC compliance narratives, and submit proposals.",
    whoWeHelp: "Commercial and industrial painting contractors, TI painters, and weatherproofing firms.",
    naics: "238320",
    unspsc: "72151300",
    faqs: [
      { question: "How do we address environmental paint regulations?", answer: "We write compliance statements detailing your use of Low-VOC and lead-safe paints that meet municipal and state environmental rules." }
    ]
  },
  "roofing-repair": {
    slug: "roofing-repair",
    title: "Win Commercial Roofing Government Contracts",
    industryName: "commercial roofing",
    lead: "Public school roofs and municipal offices require constant repairs and maintenance. Stronger Built helps commercial roofing contractors find, write, and win government roofing bids. We handle the proposal end to end, and with Pay-When-You-Win, you mostly pay when you win.",
    whyBidsWonLost: "Roofing bids require detailed warranty information, manufacturer authorizations (TPO/EPDM), weather safety plans, and safety ratings. Omit manufacturer authorization letters, and your bid is thrown out.",
    whatWeDo: "We source local roofing bids, compile manufacturer certifications, write detailed leak-detection and execution workflows, and handle submissions.",
    whoWeHelp: "Commercial roofing businesses, emergency patching contractors, and sheet metal installers.",
    naics: "238160",
    unspsc: "72152601",
    faqs: [
      { question: "Why do we need manufacturer authorization letters to bid?", answer: "Agencies require proof that you are certified to install specific roof membranes (like Johns Manville or Carlisle) to keep the warranty. We ensure these authorizations are attached." }
    ]
  },
  "hvac-maintenance": {
    slug: "hvac-maintenance",
    title: "Win HVAC & Mechanical Government Contracts",
    industryName: "HVAC and mechanical maintenance",
    lead: "Agencies require ongoing maintenance and emergency service for massive chillers, boilers, and RTUs. Stronger Built helps HVAC contractors find, write, and win municipal mechanical bids. We handle the proposal end to end, and with Pay-When-You-Win, you mostly pay when you win.",
    whyBidsWonLost: "HVAC bids require technicians' EPA licenses, maintenance schedules, emergency dispatch times, and parts availability. Failing to prove your crew is EPA certified will get your proposal disqualified immediately.",
    whatWeDo: "We find public HVAC opportunities, outline preventative maintenance schedules, compile EPA card verifications, write SLA response plans, and submit proposals.",
    whoWeHelp: "HVAC mechanical companies, refrigeration services, and boiler maintenance specialists.",
    naics: "238220",
    unspsc: "72101511",
    faqs: [
      { question: "What certification must be shown for HVAC technicians?", answer: "Bidders must provide EPA Section 608 certifications for all technicians handling refrigerants. We ensure these documents are compiled and formatted correctly." }
    ]
  },
  "electrical-repair": {
    slug: "electrical-repair",
    title: "Win Electrical & Power Government Contracts",
    industryName: "electrical and power services",
    lead: "Municipalities issue bids for street light retrofits, panel upgrades, and emergency power systems. Stronger Built helps electrical contractors find, write, and win public electrical contracts. We handle the proposal end to end, and with Pay-When-You-Win, you mostly pay when you win.",
    whyBidsWonLost: "Electrical bids turn on code compliance (NEC/Title 24), safety policies, journeyman certs, and utility partnership experience. If your bid lacks proof of electrical licenses or safety programs, it will be thrown out.",
    whatWeDo: "We source public electrical packages, write energy-efficiency and code-compliance plans, verify safety narratives, and submit the proposal package.",
    whoWeHelp: "Commercial electrical contractors, solar installers, and utility repair companies.",
    naics: "238210",
    unspsc: "72151500",
    faqs: [
      { question: "Are electrical bids evaluated on Title 24 compliance in California?", answer: "Yes. California public works electrical bids require strict adherence to Title 24 energy standards. We write compliance narratives proving your layouts conform." }
    ]
  },
  "plumbing-repair": {
    slug: "plumbing-repair",
    title: "Win Commercial Plumbing Government Contracts",
    industryName: "commercial plumbing",
    lead: "High-traffic public buildings require constant commercial plumbing upgrades and main-line repairs. Stronger Built helps commercial plumbers find, write, and win government plumbing bids. We handle the proposal end to end, and with Pay-When-You-Win, you mostly pay when you win.",
    whyBidsWonLost: "Plumbing bids require active plumbing licenses, equipment lists (jetters/cameras), disposal plans, and backflow testing certs. Missing disposal permits or backflow qualifications leads to immediate rejection.",
    whatWeDo: "We track public plumbing solicitations, write equipment and waste disposal narratives, compile backflow certifications, and submit proposals.",
    whoWeHelp: "Commercial plumbing contractors, hydro-jetting services, and mainline repair crews.",
    naics: "238220",
    unspsc: "72101510",
    faqs: [
      { question: "Do plumbing bids require water disposal compliance?", answer: "Yes, agencies require proof that you dispose of grease, roots, and wastewater in compliance with local environmental laws. We draft compliant waste disposal policies." }
    ]
  },
  "moving-relocation": {
    slug: "moving-relocation",
    title: "Win Moving & Relocation Government Contracts",
    industryName: "moving and relocation logistics",
    lead: "State offices, military bases, and schools relocate constantly. Stronger Built helps moving and relocation companies find, write, and win government moving bids nationwide. We handle the proposal end to end, and with Pay-When-You-Win, you mostly pay when you win.",
    whyBidsWonLost: "Moving bids are won on secure packing methodologies, fleet security, cargo insurance, inventory control, and chain-of-custody protocols for sensitive documents. Failing to document how you secure files or handle delicate IT hardware results in failure.",
    whatWeDo: "We find public relocations, write chain-of-custody and packing narratives, map inventory schedules, verify vehicle licensing and insurance limits, and submit proposals.",
    whoWeHelp: "Commercial moving companies, warehouse operators, and logistics businesses.",
    naics: "488991",
    unspsc: "78101804",
    faqs: [
      { question: "Do government moves require document security protocols?", answer: "Yes. Relocating public offices often involves HIPPA or personal records requiring background-checked staff and secure chain-of-custody. We write standard security protocols for your proposal." }
    ]
  },
  "website-build-redesign": {
    slug: "website-build-redesign",
    title: "Win GovTech & IT Web Government Contracts",
    industryName: "GovTech and IT web development",
    lead: "Cities, water districts, and counties issue constant RFPs to rebuild their websites and portals. Stronger Built helps digital agencies and software shops find, write, and win GovTech contracts. We handle the proposal end to end, and with Pay-When-You-Win, you mostly pay when you win.",
    whyBidsWonLost: "Web builds are won on ADA (WCAG 2.1 AA) compliance, API integration security, hosting uptime, mobile responsiveness, and project timelines. Evaluators disqualify agencies that do not supply a clear accessibility audit plan.",
    whatWeDo: "We source GovTech RFPs, author the accessibility audit policies and API security protocols, build the project timeline chart, and manage portal submission.",
    whoWeHelp: "Web agencies, software consultancies, UI/UX designers, and IT developers.",
    naics: "541511",
    unspsc: "81112101",
    faqs: [
      { question: "Are government websites legally required to be WCAG compliant?", answer: "Yes. Public sector sites must meet WCAG 2.1 AA accessibility standards by law. We write detailed testing and design methodologies proving your agency's code meets compliance." }
    ]
  },
  "strategic-bid-advisory": {
    slug: "strategic-bid-advisory",
    title: "Win Strategic Bid Management Contracts",
    industryName: "strategic bid management",
    lead: "High-precision proposal response and RFP compliance monitoring. Stronger Built helps specialized trade contractors find, write, and win multi-million dollar public sector bids. We handle the proposal end to end, and with Pay-When-You-Win, you mostly pay when you win.",
    whyBidsWonLost: "Strategic bids turn on detailed RFP compliance analysis, financial model precision, site walk data integration, and peer review. Any compliance error or missing signature results in instant disqualification.",
    whatWeDo: "We analyze target RFPs, construct a 100% compliant response matrix, draft technical narratives, represent clients at site walks, and review pricing to win.",
    whoWeHelp: "Specialized contractors and enterprises bidding on high-value government solicitations.",
    naics: "541611",
    unspsc: "80101500",
    faqs: [
      { question: "What is a compliance matrix?", answer: "A compliance matrix maps every single requirement in the government RFP to the exact page and section in your proposal to guarantee nothing is missed." }
    ]
  },
  "search-visibility-seo-aeo": {
    slug: "search-visibility-seo-aeo",
    title: "Win SEO & GovTech Digital Visibility Contracts",
    industryName: "SEO and digital visibility",
    lead: "Agencies and public developers require high-visibility information retrieval, SEO, and Answer Engine Optimization. Stronger Built helps digital search agencies find, write, and win public visibility contracts. We handle the proposal end to end, and with Pay-When-You-Win, you mostly pay when you win.",
    whyBidsWonLost: "Digital visibility bids are won on structured data implementation, search analytics dashboards, content safety guidelines, and semantic authority methodologies. Omit details about search crawler compliance, and you lose.",
    whatWeDo: "We source search visibility bids, author the search crawling compliance and json-ld schema integration plans, and submit compliant proposals.",
    whoWeHelp: "Digital marketing agencies, programmatic SEO platforms, and semantic search consultants.",
    naics: "541511",
    unspsc: "81112101",
    faqs: [
      { question: "How is AEO evaluated in public contracts?", answer: "Evaluators score your methodologies for appearing in direct answers. We outline semantic authority and structured schema plans to win." }
    ]
  }
};
