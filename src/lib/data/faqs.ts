export interface FAQItem {
  question: string;
  answer: string;
}

export const SERVICE_FAQS: Record<string, FAQItem[]> = {
  "construction-consulting": [
    { question: "How do I hire a DVBE for construction consulting?", answer: "You can hire us directly through our DVBE certification. We help you with cost estimates and project reviews. This helps you meet state diversity spending goals easily." },
    { question: "What is your CSLB license number?", answer: "Stronger Built Group is a licensed General Building Contractor, CSLB #1057434. We also hold specialty licenses in cabinet work and plumbing." },
    { question: "Do you provide feasibility studies?", answer: "Yes. We review your project before it starts. We check for building code issues and help set a realistic budget for California public works." }
  ],
  "project-management": [
    { question: "Can you manage Caltrans projects?", answer: "Yes. We understand Caltrans reporting and safety rules. We keep your project on track and handle all the paperwork for state and county agencies." },
    { question: "How do you handle project scheduling?", answer: "We use professional scheduling tools to track every step of the build. We make sure all trades work together so you don't have delays or extra costs." },
    { question: "What is your DVBE status?", answer: "We are a certified Disabled Veteran Business Enterprise (DVBE) and a Small Business (SB) in the state of California." }
  ],
  "subcontracting-services": [
    { question: "Do you meet Commercially Useful Function (CUF) requirements?", answer: "Yes. We manage our own crew and materials. We don't just act as a broker. This is vital for meeting state DVBE participation rules." },
    { question: "What trades do you provide as a subcontractor?", answer: "We provide electrical, plumbing, painting, and HVAC services. We use our own vetted network of licensed specialty partners across California." },
    { question: "Are you registered with the DIR?", answer: "Yes. Stronger Built Group is a DIR-registered contractor. This allows us to perform public works projects for state and local agencies." }
  ],
  "facility-maintenance": [
    { question: "Do you offer emergency repair services?", answer: "Yes. We offer rapid response for plumbing, electrical, and structural issues. Our team is available to fix problems before they shut down your facility." },
    { question: "Can I bundle multiple trades in one contract?", answer: "Yes. We handle multi-trade maintenance. You only need to talk to one person for your plumbing, HVAC, and general repair needs." },
    { question: "Do you work with school districts?", answer: "Yes. We maintain campuses and administrative buildings. We ensure all work is safe for students and staff." }
  ],
  "janitorial-services": [
    { question: "Are you a DIR registered janitorial firm?", answer: "Yes. We are fully registered with the DIR for public works janitorial services. We help agencies meet labor compliance while staying clean." },
    { question: "What cleaning standards do you follow?", answer: "We follow state-approved green cleaning protocols. We use safe chemicals to protect the health of your staff and the public." },
    { question: "Do you provide floor care services?", answer: "Yes. We provide deep cleaning for carpets and hard floors. We help extend the life of your facility's flooring through regular maintenance." }
  ],
  "construction-material-supply": [
    { question: "Can I get DVBE credit for material supply?", answer: "Yes. Purchasing materials through a certified DVBE like us counts toward your state diversity goals. We handle the sourcing and delivery logic for you." },
    { question: "What materials do you source?", answer: "We source lumber, concrete, steel, and electrical supplies. We work with large manufacturers to get the best prices for your government project." },
    { question: "Do you provide site delivery?", answer: "Yes. We coordinate all logistics. We make sure your materials arrive exactly when your crew needs them to avoid site overcrowding." }
  ],
  "landscape-rounds-maintenance": [
    { question: "Do you maintain Caltrans right-of-ways?", answer: "Yes. We handle mowing and weed control along state roads. We follow all safety rules and traffic control requirements." },
    { question: "Can you manage irrigation systems?", answer: "Yes. We fix leaks and set timers to save water. We make sure your landscaping stays green while following local water rules." },
    { question: "Do you offer tree trimming?", answer: "Yes. We remove hazardous branches and maintain tree health. This protects your property and the public from falling debris." }
  ],
  "graffiti-abatement": [
    { question: "How fast can you remove graffiti?", answer: "We offer 24-48 hour response for most removals. We match the paint color exactly to keep your walls looking professional and clean." },
    { question: "Do you use safe removal chemicals?", answer: "Yes. We use eco-friendly products that remove paint without damaging the brick or concrete underneath." },
    { question: "Can you apply anti-graffiti coatings?", answer: "Yes. We can put a clear coat on your walls that makes future graffiti easy to wash off with just water." }
  ],
  "parking-lot-striping": [
    { question: "Are your parking lots ADA compliant?", answer: "Yes. We know all the state rules for disabled parking. We make sure your signs and blue paint are in the right spots to avoid fines." },
    { question: "How often should I sealcoat my lot?", answer: "In California, most lots should be sealcoated every 3-5 years. This prevents cracks and makes the asphalt look like new for longer." },
    { question: "Do you do fire lane curbing?", answer: "Yes. We paint bright red curbs and 'No Parking' signs to keep your facility safe and meet fire department rules." }
  ],
  "window-cleaning": [
    { question: "Do you clean high-rise windows?", answer: "Yes. Our team is trained for multi-story window cleaning. we follow all OSHA safety rules for working at heights." },
    { question: "Can window cleaning be part of a janitorial contract?", answer: "Yes. Most clients add window washing to their yearly cleaning schedule. This saves money and keeps your office bright." },
    { question: "Do you remove hard water stains?", answer: "Yes. We use special tools to remove mineral spots from sprinklers or rain. We leave your glass clear and streak-free." }
  ],
  "painting-services": [
    { question: "Are you a licensed C-33 painting contractor?", answer: "Yes. We work with C-33 licensed partners to provide high-quality painting. We handle interior offices and large exterior walls." },
    { question: "Do you use low-odor paints?", answer: "Yes. We use Low-VOC paints. This means your staff can keep working without being bothered by strong paint smells." },
    { question: "Can you do epoxy floor coatings?", answer: "Yes. We provide durable floor paint for garages and warehouses. It handles heavy traffic and resists oil stains." }
  ],
  "roofing-repair": [
    { question: "Do you offer emergency leak repair?", answer: "Yes. If a storm damages your roof, we can patch it fast. This prevents water from damaging the inside of your building." },
    { question: "Can you maintain flat commercial roofs?", answer: "Yes. We clean gutters and check for cracks in TPO or PVC roofs. Regular checks stop small problems from becoming big leaks." },
    { question: "Do you work with school roofing?", answer: "Yes. We handle roofing for public schools. We make sure all work is done during breaks to keep students safe." }
  ],
  "hvac-maintenance": [
    { question: "How often should I change facility air filters?", answer: "We recommend changing commercial filters every 3 months. This keeps the air clean and stops your AC from breaking down." },
    { question: "Do you fix rooftop AC units?", answer: "Yes. Our team services large rooftop units (RTUs). We fix motors, fans, and coolant lines to keep your building cool." },
    { question: "Do you offer seasonal HVAC checks?", answer: "Yes. We check your heater in the fall and your AC in the spring. This finds problems before the weather gets too hot or cold." }
  ],
  "electrical-repair": [
    { question: "Can you do LED lighting retrofits?", answer: "Yes. We help you switch to LED lights. This saves California agencies a lot of money on their monthly power bills." },
    { question: "Do you fix exterior security lights?", answer: "Yes. We ensure your parking lots and doors are well-lit at night. This keeps your staff and property safe." },
    { question: "Are you a licensed C-10 electrical contractor?", answer: "We work with C-10 licensed trades within our DVBE network to handle all high-voltage repairs and new wiring." }
  ],
  "plumbing-repair": [
    { question: "Do you fix commercial water leaks?", answer: "Yes. We fix pipes, toilets, and water heaters. We act fast to stop water damage in your government office or school." },
    { question: "What is a hydro-jetting service?", answer: "It is a high-pressure water spray that clears blocked drains. It removes grease and roots that cause backups in large buildings." },
    { question: "Do you test backflow preventers?", answer: "Yes. We make sure your building's water doesn't flow back into the city pipes. This is required by California state law." }
  ],
  "moving-relocation": [
    { question: "Do you move state government offices?", answer: "Yes. We help agencies move to new buildings. We handle everything from the desks to the sensitive IT equipment." },
    { question: "Can you help with office setup?", answer: "Yes. We put together new desks and cubicles. We make sure your new office is ready for work the next day." },
    { question: "Do you move secure documents?", answer: "Yes. We have background-checked staff and secure trucks. We keep your sensitive files safe during the entire move." }
  ],
  "website-build-redesign": [
    { question: "Are your websites ADA and WCAG compliant?", answer: "Yes. We build sites that everyone can use, including people with vision or hearing issues. This is required for California government sites." },
    { question: "Do you redesign old government sites?", answer: "Yes. We take old, slow websites and make them fast and easy to use on phones. We follow all state digital safety rules." },
    { question: "How do I get a tech quote?", answer: "You can send us a request through our contact page. As a DVBE, we offer a specialized edge for municipal and state IT projects." }
  ],
  "strategic-bid-advisory": [
    { question: "How does Strategic Bid Management differ from basic consulting?", answer: "We provide high-precision, executive-led oversight by Roy Krautstrunk. We combine advanced data analytics with deep DIR compliance knowledge to build winnable, low-risk proposals that secure multi-million dollar contracts." },
    { question: "Do you represent clients at mandatory site walks?", answer: "Yes. Both our Growth and Enterprise tracks include mandatory site walk representation by Roy Krautstrunk or our senior technical lead to ensure all site-specific risks are accounted for in the bid." },
    { question: "How do the deposit payments work?", answer: "Clients pay a 50% deposit (Growth or Enterprise track) to secure Roy's advisory time. The remaining 50% is due once the full bid package is ready for submission." }
  ],
  "search-visibility-seo-aeo": [
    { question: "What is AEO for government agencies?", answer: "Answer Engine Optimization (AEO) helps your agency appear in direct answers when people ask questions on Google or AI like ChatGPT." },
    { question: "How do I get my service business on AI search?", answer: "We use structured data called JSON-LD. This tells AI exactly what services you offer and which counties you serve." },
    { question: "Do you help with local search?", answer: "Yes. We help people find your local office when they search for services in San Diego, Sacramento, or other California cities." }
  ]
};
