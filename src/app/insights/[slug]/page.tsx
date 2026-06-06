"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { use } from "react";
import { insights } from "../page";

export default function InsightDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const data = insights.find(p => p.slug === resolvedParams.slug);

  if (!data) return notFound();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Premium Hero Section */}
      <section className="relative px-6 pt-24 pb-12 md:pt-36 md:pb-20 overflow-hidden bg-gradient-to-b from-slate-50 via-indigo-50/20 to-white dark:from-brand-navy-950 dark:via-brand-navy-900 dark:to-brand-navy-950 border-b border-slate-200/50 dark:border-white/5">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] rounded-full bg-brand-blue-600/10 dark:bg-brand-blue-600/15 blur-[100px]" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-brand-blue-600/5 blur-[80px]" />
          <div className="absolute bottom-0 left-0 right-0 h-96 opacity-[0.03] dark:opacity-10 bg-[radial-gradient(#1E6FD9_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <Link href="/insights" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white mb-10 transition-colors font-bold tracking-wide uppercase text-[10px]">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Insights
          </Link>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] mb-8"
          >
            <span className="text-brand-blue-600 dark:text-brand-blue-400 px-3 py-1 rounded-md bg-brand-blue-50/80 dark:bg-brand-blue-600/10 border border-brand-blue-100 dark:border-brand-blue-600/20 backdrop-blur-md">{data.category}</span>
            <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400"><Calendar className="w-3.5 h-3.5" /> {data.date}</span>
            <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400"><Clock className="w-3.5 h-3.5" /> {data.readTime}</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-slate-900 dark:text-white tracking-tight mb-8 leading-[1.1] italic"
          >
            {data.title}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl font-medium leading-relaxed"
          >
            {data.excerpt}
          </motion.p>
        </div>
      </section>

      <section className="pb-24 pt-16 bg-white dark:bg-black/20">
        <div className="max-w-3xl mx-auto px-4 w-full">


        <article className="prose prose-lg dark:prose-invert prose-brand max-w-none text-slate-600 dark:text-slate-400">
          {resolvedParams.slug === "building-california-future-billion-dollar-opportunity" ? (
            <>
              <p>
                At <strong>Stronger Built</strong>, we believe in more than just high-quality construction; we believe in being a reliable partner for the infrastructure that powers our state. We recently tuned into the <em>Welcome to State Contracting</em> series by <strong>Angela Shell</strong>, Chief Procurement Officer for the State of California, to ensure our operations are perfectly aligned with the state&apos;s mission.
              </p>

              <div className="my-12 aspect-video rounded-[2rem] overflow-hidden shadow-2xl border border-white/10">
                <iframe 
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/tbJ0rAzqY6w" 
                  title="Welcome to State Contracting"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
              
              <p>
                Here is a look at the scale of the opportunity in California and how Stronger Built is positioned to deliver.
              </p>

              <h3>1. The Scale of the Mission: $12 Billion Annually</h3>
              <p>
                The State of California is one of the largest purchasers in the world. According to the DGS, the state spends between <strong>$10 billion and $12 billion each year</strong> on goods and services.
              </p>
              <p>
                To ensure this spending supports the local economy, the state is mandated to direct:
              </p>
              <ul>
                <li><strong>25%</strong> of those funds to Small Businesses (SB).</li>
                <li><strong>3%</strong> of those funds to Disabled Veteran Business Enterprises (DVBE).</li>
              </ul>
              <p>
                As a certified DVBE, Stronger Built is proud to be part of the <strong>$3.5 billion</strong> that has gone to certified businesses every year since 2020. This isn&apos;t just about contracts; it’s about driving economic recovery and growth in our communities.
              </p>

              <h3>2. Speaking the Language: UNSPSC Codes</h3>
              <p>
                A critical takeaway from the DGS is the importance of <strong>UNSPSC codes</strong> (United Nations Standard Products and Services Code). The state uses these 8-digit codes to identify exactly what a business provides.
              </p>
              <p>
                We have optimized our profiles to align with these standards, ensuring that when state buyers search for &quot;General Building Construction&quot; or &quot;Technical Site Services,&quot; Stronger Built appears as a qualified, ready-to-work match.
              </p>

              <h3>3. The Power of &quot;Commercially Useful Function&quot; (CUF)</h3>
              <p>
                The DGS Chief Procurement Officer emphasized that success in state contracting requires performing a <strong>Commercially Useful Function</strong>. This means a business must actually execute, manage, and supervise the work—not just act as a &quot;pass-through.&quot;
              </p>
              <p>
                At Stronger Built, our <strong>Class B General Contractor license</strong> and our hands-on project management style are the foundations of our CUF compliance. We take full responsibility for every distinct element of our projects, from initial price negotiation to final quality checks.
              </p>

              <h3>4. Beyond the Bid: Emergency Readiness</h3>
              <p>
                The state highlights an often-overlooked opportunity: the <strong>Emergency Registry</strong>. When disaster strikes, the state relies on registered contractors to bypass traditional long-form bidding for urgent repairs and debris removal.
              </p>
              <p>
                Because we maintain a fleet of equipment and a ready-to-deploy team, we are committed to being part of California’s emergency response network, providing &quot;drop-of-a-hat&quot; service when the state needs us most.
              </p>

              <div className="mt-16 p-8 md:p-12 bg-brand-navy-900 rounded-[2.5rem] text-white not-prose relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue-600/10 rounded-full blur-[80px]" />
                <h3 className="text-2xl md:text-3xl font-serif mb-6 italic relative z-10">Looking to Partner?</h3>
                <p className="text-slate-300 text-lg mb-10 relative z-10">
                  Whether you are a state advocate seeking a reliable DVBE partner or a prime contractor looking for a subcontractor who understands the rigors of state compliance, Stronger Built is ready to build.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                  <Link 
                    href="/government/capabilities-statement" 
                    className="inline-flex items-center justify-center gap-3 bg-brand-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-brand-blue-600/20"
                  >
                    Download Capability Statement
                  </Link>
                  <Link 
                    href="/contact" 
                    className="inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all backdrop-blur-md"
                  >
                    Request a Consultation
                  </Link>
                </div>
              </div>
            </>
          ) : resolvedParams.slug === "how-were-building-california-state-contracting-guide" ? (
            <>
              <p>
                At <strong>Stronger Built</strong>, we believe in more than just high-quality construction; we believe in being a reliable partner for the infrastructure that powers our state. We recently tuned into a detailed briefing by the <em>California DGS Office of Small Business and DVBE Services</em> regarding how businesses can effectively support State of California projects.
              </p>
              
              <div className="my-12 aspect-video rounded-[2rem] overflow-hidden shadow-2xl border border-white/10">
                <iframe 
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/9KbqN7buWwQ" 
                  title="How We’re Building California"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>

              <p>
                Here is a look at what it takes to do business with the State, and how Stronger Built is positioned to meet those needs.
              </p>

              <h3>1. Understanding the &quot;Gold Standard&quot; of Certification</h3>
              <p>
                The State of California is committed to economic diversity, specifically through the <strong>Small Business (SB)</strong> and <strong>Disabled Veteran Business Enterprise (DVBE)</strong> programs. These aren&apos;t just labels—they are a mandate (under Prop AB19) to ensure at least 25% of state contract dollars go to small businesses and 3% to disabled veteran-owned firms.
              </p>
              <p>
                As a <Link href="/government" className="text-brand-blue-600 font-bold no-underline hover:underline">DVBE-certified contractor</Link>, Stronger Built is proud to help state agencies meet these goals while delivering the specialized expertise required for complex general contracting projects.
              </p>

              <h3>2. Speaking the Language: UNSPSC Codes</h3>
              <p>
                One of the most critical takeaways from the DGS briefing was the importance of <strong>UNSPSC codes</strong> (United Nations Standard Products and Services Code). Unlike the federal government’s NAICS codes, the State uses these 8-digit codes to identify exactly what a business provides.
              </p>
              <p>
                We have optimized our profiles and our service offerings to align with these standards, ensuring that when state buyers look for &quot;General Building Construction&quot; or specialized &quot;Site Preparation,&quot; Stronger Built appears as a qualified match.
              </p>

              <h3>3. The Power of &quot;Commercially Useful Function&quot; (CUF)</h3>
              <p>
                A major focus of the state’s presentation was <strong>CUF</strong>. This ensures that certified businesses are actually performing the work they are contracted for—managing, supervising, and executing the project rather than acting as a &quot;pass-through.&quot;
              </p>
              <p>
                At Stronger Built, our <strong>Class B General Contractor license (#1057434)</strong> is the foundation of our CUF compliance. We take full responsibility for the distinct elements of our work, from negotiating price to determining quality and executing the build.
              </p>

              <h3>4. Beyond the Bid: Emergency Readiness</h3>
              <p>
                The DGS highlighted an often-overlooked opportunity: the <strong>Emergency Registry</strong>. When disaster strikes—whether it’s fire, flood, or infrastructure failure—the state bypasses the traditional long-form bidding process to call on registered contractors who are ready to move at a moment’s notice.
              </p>
              <p>
                Because we maintain a fleet of equipment and a ready-to-deploy team, we are committed to being part of California’s emergency response network, providing &quot;drop-of-a-hat&quot; service when the community needs it most.
              </p>

              <div className="mt-16 p-8 md:p-12 bg-brand-navy-900 rounded-[2.5rem] text-white not-prose relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue-600/10 rounded-full blur-[80px]" />
                <h3 className="text-2xl md:text-3xl font-serif mb-6 italic relative z-10">Looking to Partner?</h3>
                <p className="text-slate-300 text-lg mb-10 relative z-10">
                  Whether you are a state advocate looking for a reliable DVBE partner or a prime contractor seeking a subcontractor who understands the rigors of state compliance, Stronger Built is ready.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                  <Link 
                    href="/government/capabilities-statement" 
                    className="inline-flex items-center justify-center gap-3 bg-brand-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-brand-blue-600/20"
                  >
                    Download Capability Statement
                  </Link>
                  <Link 
                    href="/contact" 
                    className="inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all backdrop-blur-md"
                  >
                    Request a Consultation
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <>
              <p>
                The government contracting landscape in California is inherently complex. Understanding the specific compliance regulations, reporting requirements, and threshold parameters is critical to long-term success whether you are a prime contractor bidding on state mega-projects or an agency facility director maintaining critical infrastructure.
              </p>
              <h2>Navigating Compliance Requirements</h2>
              <p>
                State agencies mandate strict tracking of Commercially Useful Function (CUF) elements when selecting DVBE firms. Brokers that do not actually manage their own labor or handle their own procurement are constantly audited and rejected. Stronger Built Group bypasses this by utilizing our Class B license to actively self-perform and strictly control all deployed specialty trades.
              </p>
              <blockquote>
                &quot;True partnerships aren&apos;t just about meeting diversity percentages; they are about executing flawless construction and facilities management securely and transparently.&quot;
              </blockquote>
              <h2>The Path Forward</h2>
              <p>
                To leverage these strategies, prime contractors and agencies alike must vet their partners immediately at the RFQ stage. Ensuring your partners have their DIR Registration, CSLB bonds, and proper insurance limits drastically decreases the friction of award validation.
              </p>
            </>
          )}
        </article>

        </div>
      </section>
    </div>
  );
}
