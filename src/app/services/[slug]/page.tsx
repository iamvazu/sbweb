"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, ShieldCheck, MapPin, HelpCircle } from "lucide-react";
import { use } from "react";
import { SERVICE_FAQS } from "@/lib/data/faqs";
import { JsonLd } from "@/components/seo/json-ld";

const serviceData: Record<string, any> = {
  "construction-consulting": {
    title: "Construction Consulting Services",
    lead: "Navigate the complexities of California public and commercial construction with licensed expertise. We provide comprehensive consulting, from initial feasibility studies to final constructability reviews, ensuring your project is designed to be built efficiently, compliantly, and within budget.",
    included: ["Feasibility studies", "Cost estimation analysis", "Constructability review", "Value engineering", "Owner’s representative"],
    whoFor: "Municipal agencies, school districts, and private developers requiring deep local and state compliance oversight.",
    approach: "Self-performed by our experienced leadership team under our CSLB Class B license, ensuring transparent, unbiased guidance."
  },
  "project-management": {
    title: "Government & Commercial Project Management",
    lead: "Stronger Built Group delivers end-to-end project management services designed to mitigate risk and keep critical infrastructure projects on schedule. We integrate schedule oversight with stringent QA/QC to protect your investment.",
    included: ["Critical Path Method (CPM) scheduling", "Budget pacing and management", "Comprehensive QA/QC programs", "Stakeholder coordination", "Design-build oversight"],
    whoFor: "State agencies (e.g., DGS, Caltrans) and heavy commercial prime contractors needing reliable, licensed project control.",
    approach: "Directly managed by Stronger Built leadership, utilizing industry-standard oversight workflows tailored for government reporting requirements."
  },
  "subcontracting-services": {
    title: "Diverse Subcontracting Services (DVBE)",
    lead: "Partner with a certified Disabled Veteran Business Enterprise (DVBE) and Small Business (SB) for your subcontracting needs. Stronger Built Group directly coordinates a vetted network of specialized trades, helping prime contractors fulfill participation goals while executing high-quality work.",
    included: ["Coordination and management of licensed specialty trades", "C-10 Electrical", "C-20 HVAC", "C-33 Painting", "C-36 Plumbing"],
    whoFor: "Prime contractors on state/federal projects requiring DVBE/SB participation (e.g., Caltrans, CHP, local municipalities).",
    approach: "A hybrid delivery model. We self-perform scope where applicable and rigorously manage our curated network of certified, DIR-registered specialty subcontractors to deliver a commercially useful function (CUF)."
  },
  "facility-maintenance": {
    title: "Comprehensive Facility Maintenance",
    lead: "Keep your public buildings, transit centers, and commercial properties operational with our multi-trade facility maintenance programs. We provide rapid emergency response and ongoing preventative care to minimize downtime and extend asset lifecycles.",
    included: ["Multi-trade ongoing maintenance contracts", "Scheduled preventative maintenance programs", "Rapid emergency repair response", "Digital work order management"],
    whoFor: "Facilities directors, state and county property managers, and commercial building owners spanning California.",
    approach: "Managed centrally via our CSLB Class B license (#1057434), deploying both in-house technicians and specialized trade partners depending on the facility needs."
  },
  "janitorial-services": {
    title: "Professional Janitorial & Custodial Services",
    lead: "Maintain pristine, safe, and compliant facilities with Stronger Built Group’s DIR-registered janitorial operations. From high-traffic government buildings to sensitive operational hubs, we deliver consistent, verifiable cleanliness.",
    included: ["5-day commercial cleaning schedules", "Periodic deep cleaning/sanitization", "Hard floor care", "Carpet maintenance", "Restroom supply management"],
    whoFor: "High-footfall state/county offices, municipal complexes, and large-scale commercial property managers.",
    approach: "Self-performed by fully insured, background-checked, and DIR-registered personnel using state-approved green cleaning products and protocols."
  },
  "construction-material-supply": {
    title: "Construction Material Supply & Logistics",
    lead: "Secure your project’s supply chain while simultaneously hitting your DVBE/SB participation targets. We source and deliver bulk construction materials exactly when and where you need them.",
    included: ["Bulk material sourcing (lumber, concrete, drywall, steel)", "Site delivery logistics", "Just-in-time (JIT) fulfillment scheduling"],
    whoFor: "Prime contractors, heavy civil firms, and agency maintenance departments requiring reliable procurement coupled with diversity spend credit.",
  },
  "landscape-grounds-maintenance": {
    title: "Landscape & Grounds Maintenance",
    lead: "Maintain the exterior aesthetics, safety, and operational flow of your facilities. We handle everything from routine Caltrans right-of-way mowing to complex municipal park upkeep.",
    included: ["Scheduled mowing and edging", "Tree trimming and hazard removal", "Irrigation system maintenance", "Weed abatement (chemical and manual)", "Seasonal planting"],
    whoFor: "State agencies (Caltrans, DWR), county parks departments, and commercial property managers.",
    approach: "Delivered via C-27 licensed trade partners within our verified DVBE/SB network, managed strictly by Stronger Built to guarantee compliance."
  },
  "graffiti-abatement": {
    title: "Graffiti Abatement & Washing",
    lead: "Rapid response graffiti removal and industrial pressure washing services designed to preserve civic dignity and maintain high-traffic public spaces safely.",
    included: ["Emergency graffiti response (24-48 hours)", "Color-matched paint-overs", "Chemical removal from sensitive masonry", "High-heat pressure washing", "Anti-graffiti coating application"],
    whoFor: "City public works, school districts, and transit authorities facing constant urban wear.",
    approach: "Self-performed or subcontracted to local certified teams depending on geographic territory and emergency SLA requirements."
  },
  "parking-lot-striping": {
    title: "Parking Lot Striping & Sealcoating",
    lead: "Ensure ADA compliance and extend the lifecycle of your asphalt assets. Properly maintained parking infrastructure reduces liability and improves immediate public perception.",
    included: ["ADA compliance striping and signage", "Fire lane red curbing", "Asphalt sealcoating", "Crack filling and patching", "Directional arrow mapping"],
    whoFor: "DMV offices, county administrative complexes, school districts, and high-volume commercial centers.",
    approach: "Executed under our CSLB coordination model, utilizing specialized C-32 contractors to deliver high-quality traffic coatings."
  },
  "window-cleaning": {
    title: "Commercial Window Cleaning",
    lead: "Establish a clear, professional image for your facilities with regular interior and exterior window cleaning programs. Easily bundled with our janitorial scopes for single-vendor simplicity.",
    included: ["Multi-story exterior washing", "Interior glass sanitization", "Hard water stain removal", "Awning and canopy cleaning", "Post-construction window clearing"],
    whoFor: "Mid-to-high-rise state offices, municipal courthouses, and commercial real estate portfolios.",
    approach: "Self-performed by fully insured and safety-trained (OSHA compliant) technicians, often integrated directly into existing janitorial Master Service Agreements."
  },
  "painting-services": {
    title: "Commercial Painting Services",
    lead: "Protect and refresh your public and commercial infrastructure. From tenant improvements in active government buildings to exterior weatherproofing, we handle it all with minimal disruption.",
    included: ["Interior tenant improvement (TI) repaints", "Exterior elastomeric weatherproofing", "Epoxy floor coatings", "Lead-safe practices", "High-durability scuff resistant applications"],
    whoFor: "Agencies managing frequent office configurations, low-income housing authorities, and industrial facility owners.",
    approach: "Managed by Stronger Built using highly vetted C-33 Painting and Decorating contractors within our DVBE network."
  },
  "roofing-repair": {
    title: "Roofing Maintenance & Repair",
    lead: "Stop leaks before they compromise your operations. We provide rapid-response commercial roof repairs and scheduled preventative maintenance to maximize the lifespan of your roofing assets.",
    included: ["Emergency leak detection and patching", "TPO, PVC, and EPDM single-ply repair", "Built-up roofing (BUR) maintenance", "Gutter and downspout clearing", "Annual roof condition reporting"],
    whoFor: "School districts facing aging infrastructure and commercial facility managers requiring rapid weatherization.",
    approach: "Partnered strictly with fully insured C-39 Roofing contractors, carrying specific limits required for overhead public works."
  },
  "hvac-maintenance": {
    title: "HVAC Maintenance & Service",
    lead: "Optimize building climate control, improve indoor air quality, and reduce energy expenditures across your facility portfolio with tailored preventative maintenance contracts.",
    included: ["Quarterly filter replacement and coil cleaning", "Chiller and cooling tower maintenance", "Rooftop unit (RTU) servicing", "Duct inspection and sealing", "Emergency system failure response"],
    whoFor: "Large-scale government buildings, hospitals, and educational institutions where climate control is mission-critical.",
    approach: "Delivered exclusively by C-20 Warm-Air Heating, Ventilating and Air-Conditioning contractors under our rigorous quality oversight."
  },
  "electrical-repair": {
    title: "Electrical Repair & Installation",
    lead: "Ensure the safety and continuous operation of your facilities with licensed electrical services. From lighting retrofits to critical panel upgrades, we manage all power requirements.",
    included: ["LED lighting retrofits (Title 24 compliance)", "Panel and breaker replacements", "Dedicated circuit installations", "Exterior security lighting repair", "Emergency troubleshooting"],
    whoFor: "Municipalities upgrading to energy-efficient systems and commercial complexes requiring rapid fault resolution.",
    approach: "Subcontracted to state-certified, DIR-registered C-10 Electrical Contractors to ensure absolute safety and code compliance."
  },
  "plumbing-repair": {
    title: "Commercial Plumbing Services",
    lead: "Maintain sanitary and operational facilities. We cover everything from routine restroom fixture swaps to emergency mainline jetting to keep your buildings open to the public.",
    included: ["Emergency leak and clog resolution", "Commercial fixture replacement (touchless)", "Hydro-jetting and mainline clearing", "Backflow preventer testing", "Water heater / boiler servicing"],
    whoFor: "High-traffic facilities including DMVs, courthouses, public restrooms, and dense commercial properties.",
    approach: "Managed through our C-36 Plumbing subcontractor network, guaranteeing fully licensed remediation of all water and sanitary systems."
  },
  "moving-relocation": {
    title: "Moving & Relocation Services",
    lead: "Seamlessly transition state agencies or commercial offices to new facilities. We provide the logistics, labor, and project management required to minimize administrative downtime.",
    included: ["Internal office reconfigurations", "Full facility relocations", "IT equipment dismount and transport", "Furniture assembly / disassembly", "Secure document transport"],
    whoFor: "State agencies executing lease transitions, school districts moving campus footprints, and expanding commercial enterprises.",
    approach: "Self-performed via our internal logistics division utilizing insured fleets and background-checked personnel to secure sensitive chain-of-custody."
  },
  "website-build-redesign": {
    title: "Government Website Build & Redesign",
    lead: "High-performance, secure, and fully accessible digital infrastructure for local municipalities and public agencies. We build specialized web environments that meet WCAG 2.1 AA standards while serving as a credible gateway for your constituents.",
    included: ["WCAG 2.1 AA Accessibility compliance", "Secure Next.js/React architecture", "Automated deployment pipelines", "Constituent-focused UI/UX design", "Mobile-optimized responsive layouts"],
    whoFor: "Local city departments, municipal districts, and public-sector agencies requiring modernized digital front-ends.",
    approach: "Built using the same core technology powering Stronger Built's own infrastructure—Next.js, Tailwind CSS, and Vercel—ensuring elite performance and near-zero downtime."
  },
  "ai-bid-proposal-support": {
    title: "AI-Driven Bid & Proposal Support",
    lead: "Leveraging sophisticated AI analysis to navigate the complexities of government procurement. We assist fellow contractors and DVBE entities in identifying, parsing, and responding to RFPs with higher accuracy and efficiency.",
    included: ["AI-powered RFP analysis", "Compliance tracking & bid matching", "Document structure automation", "Technical writing support", "Competitor intelligence reporting"],
    whoFor: "DVBE/SB contractors, prime subcontractors, and firms looking to scale their public-sector bidding volume.",
    approach: "Combining expert general contracting insight with modern LLM analysis tools to surgically identify winnable opportunities and automate lower-level documentation."
  },
  "search-visibility-seo-aeo": {
    title: "Modern Search & Visibility (SEO/AEO/GEO)",
    lead: "Ensure your agency or real estate firm remains visible across all search paradigms. We optimize for traditional Google Search (SEO) as well as the emerging world of Answer Engines and Generative AI Search.",
    included: ["Programmatic SEO (PSEO) for local agencies", "Answer Engine Optimization (AEO)", "Generative Engine Optimization (GEO)", "Local San Diego search authority", "Digital footprint auditing"],
    whoFor: "Government agencies, municipal organizations, and real estate development firms needing high visibility in AI-driven search environments.",
    approach: "A data-first strategy that focuses on semantic authority and structured data (Schema), ensuring your information is correctly indexed by both traditional spiders and modern LLMs."
  }
};

export default function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const data = serviceData[resolvedParams.slug];

  if (!data) return notFound();

  return (
    <div className="min-h-screen pt-32 pb-24 bg-background-light dark:bg-black/20">
      <div className="max-w-4xl mx-auto px-4 w-full">
        
        <Link href="/services" className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-blue-600 mb-8 transition-colors font-bold tracking-wide uppercase text-xs">
          <ArrowLeft className="w-4 h-4" /> Back to Services
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-brand-navy-900 border border-gray-200 dark:border-white/10 rounded-[2.5rem] p-8 md:p-16 shadow-xl shadow-brand-blue-600/5 mb-12 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue-600/10 rounded-full blur-[80px]" />
          
          <h1 className="text-3xl md:text-5xl font-black text-brand-navy-900 dark:text-white mb-6 leading-[1.2] relative z-10">
            {data.title}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-12 relative z-10">
            {data.lead}
          </p>

          <JsonLd type="Service" data={{ title: data.title, description: data.lead }} />
          <JsonLd type="FAQPage" data={SERVICE_FAQS[resolvedParams.slug] || []} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10 mb-20">
            <div>
              <h3 className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-5 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-brand-blue-600" /> What's Included
              </h3>
              <ul className="space-y-4">
                {data.included.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-brand-navy-900 dark:text-white font-medium">
                    <span className="w-2 h-2 rounded-full bg-brand-blue-600 mt-2 shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-10">
              <div>
                <h3 className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-brand-blue-600" /> Who This Is For
                </h3>
                <p className="text-brand-navy-900 dark:text-slate-300 leading-relaxed">
                  {data.whoFor}
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-success" /> Our Approach
                </h3>
                <p className="text-brand-navy-900 dark:text-slate-300 leading-relaxed">
                  {data.approach}
                </p>
              </div>
            </div>
          </div>

          {/* Procurement FAQ Section for AEO */}
          {SERVICE_FAQS[resolvedParams.slug] && (
            <div className="mt-20 pt-20 border-t border-gray-100 dark:border-white/5 relative z-10">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-xl bg-brand-blue-600/10 flex items-center justify-center text-brand-blue-600">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-black text-brand-navy-900 dark:text-white uppercase tracking-tight">Procurement FAQ</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {SERVICE_FAQS[resolvedParams.slug].map((faq, i) => (
                  <div key={i} className="space-y-4 group">
                    <h3 className="text-lg font-bold text-brand-navy-900 dark:text-white group-hover:text-brand-blue-600 transition-colors leading-tight">
                      {faq.question}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        <div className="text-center">
          <Link href="/contact" className="inline-flex items-center gap-2 bg-brand-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-2xl font-bold transition-all shadow-xl shadow-brand-blue-600/30 hover:-translate-y-1">
            Request a Proposal for this Service
          </Link>
        </div>

      </div>
    </div>
  );
}
