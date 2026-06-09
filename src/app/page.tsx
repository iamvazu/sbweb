"use client";

import { useState, useEffect } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  Building2, 
  Wrench, 
  Package, 
  ArrowUpRight, 
  Info, 
  ClipboardCheck, 
  Search, 
  LineChart, 
  Zap, 
  Clock, 
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  Shield,
  Briefcase,
  Users,
  Award,
  HelpCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import BidTicker from "@/components/market/bid-ticker";
import { JsonLd } from "@/components/seo/json-ld";


const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", damping: 20, stiffness: 100 } }
};

const STAGGER: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const AGENCIES = [
  { name: "DoD", logo: "/images/logos/dod.svg", category: "Federal" },
  { name: "DHS", logo: "/images/logos/dhs.svg", category: "Federal" },
  { name: "HHS", logo: "/images/logos/hhs.svg", category: "Federal" },
  { name: "DOE", logo: "/images/logos/doe.svg", category: "Federal" },
  { name: "DOJ", logo: "/images/logos/doj.svg", category: "Federal" },
  { name: "Army", logo: "/images/logos/army.svg", category: "Federal" },
  { name: "Air Force", logo: "/images/logos/airforce.svg", category: "Federal" },
  { name: "NASA", logo: "/images/logos/nasa.svg", category: "Federal" },
  { name: "California", logo: "/images/logos/california.svg", category: "State" },
  { name: "LA County", logo: "/images/logos/lacounty.svg", category: "Local" },
  { name: "LA City", logo: "/images/logos/lacity.svg", category: "Local" },
  { name: "San Francisco", logo: "/images/logos/sf.svg", category: "Local" },
  { name: "Caltrans", logo: "/images/logos/caltrans.svg", category: "State" },
];

const TESTIMONIALS = [
  {
    quote: "Stronger Built did an incredible job helping us secure the local county janitorial services contract for the sheriff's office. Their team guided us through the local business preference requirements, making our bid stand out. We couldn't have won this without their government contracting expertise.",
    name: "Latecia Maia",
    title: "Founder & CEO",
    company: "Dozeles Professional Cleaning"
  },
  {
    quote: "Winning the Caltrans maintenance project across the bay was a massive milestone for us. Stronger Built helped us leverage our SB and DVBE certifications to the fullest. Their meticulous bid preparation and compliance review ensured a flawless submission.",
    name: "Marcos Pericilin",
    title: "President",
    company: "Pericilin Janitorial Services"
  },
  {
    quote: "Thanks to Stronger Built, we successfully secured a major state-level Adobe licensing reseller contract. They mapped out every compliance matrix, managed our pricing sheet strategy, and handled the submission perfectly. Their Pay-When-You-Win model aligned perfectly with our growth goals.",
    name: "Haresh Vataliya",
    title: "President & CEO",
    company: "vTech Solution"
  }
];

export default function Home() {
  const [contractValue, setContractValue] = useState(1000000);

  const calcPricing = (v: number) => {
    const m = v / 1000000;
    let fee = 450;
    let rate = 1.00;
    if (m <= 1) {
      fee = 450;
      rate = 1.00;
    } else if (m <= 2) {
      fee = 750;
      rate = 0.90;
    } else if (m <= 3) {
      fee = 1000;
      rate = 0.80;
    } else if (m <= 4) {
      fee = 1250;
      rate = 0.70;
    } else if (m <= 5) {
      fee = 1500;
      rate = 0.60;
    } else {
      fee = 1500 + 250 * Math.ceil(m - 5);
      rate = 0.50;
    }
    return { fee, rate, success: (v * rate) / 100 };
  };

  const pricingResult = calcPricing(contractValue);

  const formatShortVal = (v: number) => {
    if (v >= 1000000) {
      const m = v / 1000000;
      const s = m % 1 === 0 ? m.toFixed(0) : m.toFixed(1);
      return { num: s, unit: "M" };
    }
    return { num: (v / 1000).toFixed(0), unit: "K" };
  };

  const shortVal = formatShortVal(contractValue);
  const money = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

  const [hiwInView, setHiwInView] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const el = document.querySelector('.hiw');
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setHiwInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHiwInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const svg = document.getElementById("sbmapSvg");
    if (!svg) return;

    const NS = "http://www.w3.org/2000/svg";

    // Clear any existing children to prevent duplicate drawing on hot-reload/re-mount
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }

    // Continental US outline, traced to real proportions (viewBox 600 x 380, y down = south)
    const US = [
      [38,44],[150,40],[260,38],[300,40],[330,46],[352,64],[372,58],[388,74],[418,82],[448,70],
      [478,58],[500,50],[516,44],[523,58],[512,72],[516,90],[506,104],[514,120],[504,138],[514,156],
      [508,174],[502,188],[508,200],[516,212],[517,232],[510,252],[503,260],[497,244],[496,224],[486,210],
      [462,206],[436,210],[430,220],[418,210],[398,208],[372,226],[350,250],[332,234],[312,220],[300,216],
      [300,224],[280,214],[240,210],[195,207],[150,205],[135,212],[118,193],[100,170],[82,142],[68,112],
      [56,84],[46,58]
    ];

    function el(t: string, a: Record<string, any>) {
      const e = document.createElementNS(NS, t);
      for (const k in a) e.setAttribute(k, String(a[k]));
      return e;
    }

    function pip(x: number, y: number, poly: number[][]) {
      let c = false;
      for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
        const xi = poly[i][0], yi = poly[i][1];
        const xj = poly[j][0], yj = poly[j][1];
        if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) c = !c;
      }
      return c;
    }

    const dStr = "M" + US.map((p) => p[0] + "," + p[1]).join(" L") + " Z";
    svg.appendChild(el("path", { d: dStr, class: "landfill" }));

    // sparse interior dot grid (subtle texture, clipped to land)
    for (let gy = 46; gy <= 255; gy += 15) {
      for (let gx = 40; gx <= 520; gx += 18) {
        if (pip(gx, gy, US)) {
          const d = el("circle", { cx: gx, cy: gy, r: 1.5, class: "griddot" });
          d.setAttribute("opacity", (0.18 + Math.random() * 0.18).toFixed(2));
          svg.appendChild(d);
        }
      }
    }

    svg.appendChild(el("path", { d: dStr, class: "border" }));

    // city hubs + sparse network
    const H: Record<string, number[]> = { 
      sea: [55, 70], sf: [88, 138], la: [118, 185], phx: [170, 196], 
      den: [250, 150], dal: [352, 212], chi: [400, 108], atl: [455, 186], 
      dc: [505, 108], mia: [505, 250] 
    };
    const L = [
      ["sea", "den"], ["sf", "den"], ["la", "phx"], ["phx", "den"], 
      ["den", "dal"], ["den", "chi"], ["chi", "dc"], ["dal", "atl"], 
      ["atl", "dc"], ["atl", "mia"]
    ];

    L.forEach((lk, i) => {
      const a = H[lk[0]], b = H[lk[1]];
      svg.appendChild(el("line", { x1: a[0], y1: a[1], x2: b[0], y2: b[1], class: "netline" }));
      const p = el("circle", { r: 2.4, class: "netdot" });
      
      const animX = el("animate", { attributeName: "cx", values: a[0] + ";" + b[0], dur: "3s", begin: (i * 0.35) + "s", repeatCount: "indefinite" });
      const animY = el("animate", { attributeName: "cy", values: a[1] + ";" + b[1], dur: "3s", begin: (i * 0.35) + "s", repeatCount: "indefinite" });
      const animOp = el("animate", { attributeName: "opacity", values: "0;1;1;0", dur: "3s", begin: (i * 0.35) + "s", repeatCount: "indefinite" });
      
      p.appendChild(animX);
      p.appendChild(animY);
      p.appendChild(animOp);
      svg.appendChild(p);
    });

    Object.keys(H).forEach((k) => {
      svg.appendChild(el("circle", { cx: H[k][0], cy: H[k][1], r: 6, class: "halo" }));
      svg.appendChild(el("circle", { cx: H[k][0], cy: H[k][1], r: 2.8, class: "hub" }));
    });
  }, []);


  const industries = [
    { name: "IT & Software", desc: "SaaS licenses, custom software development, cloud infrastructure, IT support, cybersecurity audits.", icon: Zap, image: "/images/industries/it.png" },
    { name: "Healthcare & Staffing", desc: "Medical supplies, nursing services, technical staff augmentation, wellness program administration.", icon: Users, image: "/images/industries/healthcare.png" },
    { name: "Professional Services", desc: "Management consulting, engineering, financial audits, marketing agencies, legal support services.", icon: Briefcase, image: "/images/industries/professional.png" },
    { name: "Security & Operations", desc: "Armed/unarmed guard services, surveillance installation, alarm monitoring, cybersecurity monitoring.", icon: Shield, image: "/images/industries/security.png" },
    { name: "Education & Training", desc: "Curriculum design, professional training, educational materials, school district supply services.", icon: Award, image: "/images/industries/education.png" },
    { name: "Facilities & Maintenance", desc: "Janitorial services, HVAC maintenance, commercial landscaping, multi-trade repairs, electrical audits.", icon: Wrench, image: "/images/industries/facilities.png" },
    { name: "Material Supply & Logistics", desc: "Bulk equipment sourcing, specialized materials, office supply networks, delivery services.", icon: Package, image: "/images/industries/logistics.png" }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative px-6 pt-24 pb-8 md:pt-28 md:pb-12 overflow-hidden sb-hero border-b border-slate-200/50 dark:border-white/5">
        {/* Background Decorative Gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] rounded-full bg-brand-blue-600/10 dark:bg-brand-blue-600/15 blur-[120px]" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-brand-blue-600/5 blur-[100px]" />
          <div className="absolute bottom-0 left-0 right-0 h-96 opacity-[0.03] dark:opacity-10 bg-[radial-gradient(#1E6FD9_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center text-left">
            {/* Left Column */}
            <motion.div 
              initial="hidden" 
              animate="show" 
              variants={STAGGER}
              className="lg:col-span-7 space-y-4"
            >
              <motion.div variants={FADE_UP} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue-50/80 dark:bg-brand-blue-500/10 border border-brand-blue-100 dark:border-brand-blue-500/20 backdrop-blur-md">
                <span className="text-[10px] font-black tracking-[0.25em] text-brand-blue-600 dark:text-brand-blue-400 uppercase">
                  Expert Proposal Consultants · Nationwide
                </span>
              </motion.div>
              
              <motion.h1 variants={FADE_UP} className="text-3xl sm:text-4xl md:text-5xl lg:text-[40px] xl:text-[46px] font-serif text-slate-900 dark:text-white tracking-tight leading-[1.15] font-bold">
                We win government bids for you. <br />
                <span className="italic text-brand-blue-600 dark:text-brand-blue-400 block mt-1">You mostly pay when you win.</span>
              </motion.h1>
              
              <motion.p variants={FADE_UP} className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed font-medium">
                Winning government contracts comes down to the details — the requirements, the compliance, the deadlines. Stronger Built's expert proposal consultants find the right RFPs, write the winning bid, and submit it on time, anywhere in the U.S. With Pay-When-You-Win, you cover a low bid writing fee and a success fee only if you're awarded — so you mostly pay when you win.
              </motion.p>
              
              <motion.div variants={FADE_UP} className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link href="/book-call" className="group relative inline-flex items-center justify-center gap-3 btn-primary-gradient px-8 py-3.5 rounded-full font-bold text-sm transition-all hover:-translate-y-1">
                  <span>Book a Free Consultation</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/open-bids" className="group inline-flex items-center justify-center gap-3 btn-ghost-custom border px-8 py-3.5 rounded-full font-bold text-sm transition-all hover:-translate-y-1">
                  <Search className="w-5 h-5 text-brand-blue-600 dark:text-brand-blue-400" />
                  <span>Search Open Bids — Free</span>
                </Link>
              </motion.div>

              <motion.div variants={FADE_UP} className="flex flex-wrap items-center gap-y-2 gap-x-5 pt-3 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-none">
                <div>Nationwide Coverage</div>
                <div className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                <div>All 50 States</div>
                <div className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                <div>No Long-term Contract</div>
                <div className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                <div>Veteran-Owned</div>
              </motion.div>
            </motion.div>

            {/* Right Column: Animated Proposal Builder Stage (US map outline) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
              className="lg:col-span-5 hidden lg:block"
            >
              <style dangerouslySetInnerHTML={{ __html: `
                .sbmap-stage {
                  --blue:#2563eb; --navy:#0b1736; --ink:#16233f; --line:#bcd2f5;
                  --dot:#9cbcff; --pulse:#3b82f6; --card-bd:#e6ecf6; --green:#34d27f;
                  position:relative; width:100%; max-width:660px; aspect-ratio:600 / 540;
                  margin:0 auto; container-type:inline-size; font-family:"Poppins",system-ui,sans-serif;
                }

                .sbmap-map   { position:absolute; inset:0; width:100%; height:100%; z-index:0; overflow:visible; }
                .sbmap-pop   { position:absolute; inset:0; z-index:1; pointer-events:none; }
                .sbmap-wires { position:absolute; inset:0; width:100%; height:100%; z-index:2; overflow:visible; }

                .sbmap-map .landfill { fill: rgba(47,107,255,.045); stroke:none; }
                .sbmap-map .border   { fill:none; stroke:#8fb4ff; stroke-width:1.5; stroke-linejoin:round; stroke-linecap:round; opacity:.7; }
                .sbmap-map .griddot  { fill: var(--dot); }
                .sbmap-map .netline  { stroke:#a9c6ff; stroke-width:1; stroke-dasharray:2 5; opacity:.7; }
                .sbmap-map .halo     { fill:#2f6bff; opacity:.16; }
                .sbmap-map .hub      { fill:#2f6bff; }
                .sbmap-map .netdot   { fill:var(--pulse); filter: drop-shadow(0 0 3px rgba(59,130,246,.9)); }

                /* centered data popups */
                .pop { position:absolute; transform:translate(-50%,-50%);
                  display:flex; align-items:center; gap:1.4cqw;
                  background:rgba(255,255,255,.95); backdrop-filter:blur(6px);
                  border:1px solid #d7e4fb; border-radius:99px; padding:1.3cqw 2.3cqw;
                  box-shadow:0 5cqw 13cqw -8cqw rgba(20,40,90,.45);
                  font-size:1.65cqw; font-weight:800; letter-spacing:.05em; text-transform:uppercase; color:var(--ink);
                  white-space:nowrap; opacity:0; }
                .pop .pd { width:1.7cqw; height:1.7cqw; border-radius:50%; background:var(--green); box-shadow:0 0 0 .6cqw rgba(52,210,127,.25); flex:none; }
                .pop.blue .pd { background:#2f6bff; box-shadow:0 0 0 .6cqw rgba(47,107,255,.25); }
                .pop.amber .pd{ background:#f59e0b; box-shadow:0 0 0 .6cqw rgba(245,158,11,.25); }
                .pop1 { animation: popCycle 9s ease-in-out infinite 0s; }
                .pop2 { animation: popCycle 9s ease-in-out infinite 3s; }
                .pop3 { animation: popCycle 9s ease-in-out infinite 6s; }
                @keyframes popCycle {
                  0%{opacity:0;transform:translate(-50%,-44%) scale(.96);}
                  6%{opacity:1;transform:translate(-50%,-50%) scale(1);}
                  27%{opacity:1;transform:translate(-50%,-50%) scale(1);}
                  34%{opacity:0;transform:translate(-50%,-56%) scale(.98);}
                  100%{opacity:0;}
                }

                .sbmap-wires path { fill:none; stroke:var(--line); stroke-width:2; stroke-dasharray:5 7; animation: sbFlow 1.4s linear infinite; }
                @keyframes sbFlow { to { stroke-dashoffset:-24; } }
                .sbmap-wires .sb-dot { fill:var(--pulse); filter:drop-shadow(0 0 3px rgba(59,130,246,.9)); }

                .sbmap-card { position:absolute; transform:translate(-50%,-50%); width:26cqw; z-index:3; }
                .sbmap-card .inner { background:#fff; border:1px solid var(--card-bd); border-radius:3cqw; padding:2.2cqw 2.4cqw;
                  box-shadow:0 4cqw 7cqw -3cqw rgba(20,40,90,.22); display:flex; align-items:center; gap:1.8cqw; animation: sbFloat 6s ease-in-out infinite; }
                .sbmap-chip { flex:none; width:6.4cqw; height:6.4cqw; border-radius:1.8cqw; display:grid; place-items:center; color:#fff; background:linear-gradient(150deg,#4f86ff,#1e54e6); }
                .sbmap-chip svg { width:3.6cqw; height:3.6cqw; }
                .sbmap-txt .ttl { font-size:2.25cqw; font-weight:700; color:var(--ink); line-height:1.15; }
                .sbmap-txt .tag { font-size:1.4cqw; font-weight:700; letter-spacing:.18em; color:#9aa8c0; text-transform:uppercase; margin-top:.4cqw; }
                .in { opacity:0; animation: sbIn .6s cubic-bezier(.2,.8,.25,1) forwards; }
                @keyframes sbIn { from{opacity:0;transform:translateY(2.2cqw) scale(.96);} to{opacity:1;transform:none;} }
                @keyframes sbFloat { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-1.4cqw);} }

                .sbmap-hub { position:absolute; left:50%; top:63%; transform:translate(-50%,-50%); width:21cqw; height:21cqw; border-radius:4.6cqw;
                  background:linear-gradient(160deg,#14275a,#0b1736); box-shadow:0 9cqw 20cqw -6cqw rgba(11,23,54,.6), inset 0 0 0 1px rgba(255,255,255,.06);
                  display:grid; place-items:center; z-index:4; }
                .sbmap-hub::before { content:""; position:absolute; inset:-2cqw; border-radius:6.6cqw;
                  background:conic-gradient(from 0deg, transparent 0 60%, rgba(59,130,246,.9) 78%, transparent 92%);
                  -webkit-mask:radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px));
                          mask:radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px)); animation: sbSpin 6s linear infinite; }
                @keyframes sbSpin { to { transform:rotate(360deg); } }
                .sbmap-mono { text-align:center; color:#fff; line-height:1; }
                .sbmap-mono b { display:block; font-size:7.4cqw; font-weight:800; letter-spacing:-.04em; }
                .sbmap-mono b span { color:#4f86ff; }
                .sbmap-mono small { display:block; font-size:1.4cqw; font-weight:600; letter-spacing:.2em; color:#93a6c9; margin-top:.9cqw; text-transform:uppercase; }

                /* OUTPUT — fixed badge layout */
                .sbmap-out { position:absolute; left:50%; top:88.5%; transform:translate(-50%,-50%); width:56cqw; z-index:5; }
                .sbmap-out .inner { background:linear-gradient(160deg,#12224d,#0b1736); border-radius:2.8cqw; padding:2.6cqw 3cqw;
                  box-shadow:0 7cqw 18cqw -6cqw rgba(11,23,54,.55); display:flex; align-items:center; gap:2.4cqw; border:1px solid rgba(255,255,255,.08); }
                .sbmap-out .medal { flex:none; width:7.4cqw; height:7.4cqw; border-radius:2.2cqw; display:grid; place-items:center; color:#fff;
                  background:linear-gradient(150deg,#2f6bff,#1741b6); box-shadow:0 0 0 .7cqw rgba(47,107,255,.18); }
                .sbmap-out .medal svg { width:4.2cqw; height:4.2cqw; }
                .sbmap-out .otext { display:flex; flex-direction:column; gap:1cqw; min-width:0; }
                .sbmap-out .ttl { font-size:2.8cqw; font-weight:800; color:#fff; line-height:1; }
                .sbmap-out .badges { display:flex; align-items:center; gap:1.4cqw; flex-wrap:wrap; }
                .sbmap-out .chip { font-size:1.45cqw; font-weight:800; letter-spacing:.1em; text-transform:uppercase; color:#0b1736;
                  background:var(--green); border-radius:99px; padding:.7cqw 1.6cqw; line-height:1; }
                .sbmap-out .sub { font-size:1.5cqw; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:#7fa6ff; }

                /* Dark mode specific additions for theme compatibility */
                .dark .sbmap-card .inner { background: #0d1a30; box-shadow: 0 4cqw 7cqw -3cqw rgba(0,0,0,.5); }
                .dark .sbmap-txt .ttl { color: #fff; }
                .dark .pop { background: rgba(13, 26, 48, 0.95); border-color: rgba(59, 130, 246, 0.2); color: #fff; }
                .dark .sbmap-stage { --line: rgba(59, 130, 246, 0.25); --card-bd: rgba(255, 255, 255, 0.08); }

                @media (prefers-reduced-motion: reduce) {
                  .sbmap-wires path,.sbmap-hub::before,.sbmap-card .inner,.sb-dot,.pop1,.pop2,.pop3,.netdot { animation:none !important; }
                  .in { opacity:1; animation:none; } .pop { opacity:1; }
                }
              ` }} />

              <div className="sbmap-stage" aria-label="Stronger Built finds and wins government bids nationwide">
                <svg className="sbmap-map" viewBox="0 0 600 380" preserveAspectRatio="xMidYMid meet" aria-hidden="true" id="sbmapSvg" />

                {/* data popups: centered over open map area */}
                <div className="sbmap-pop">
                  <div className="pop pop1 green" style={{ left: "50%", top: "9%" }}><span className="pd" />New RFP Posted</div>
                  <div className="pop pop2 blue"  style={{ left: "63%", top: "21%" }}><span className="pd" />Bid Submitted · On Time</div>
                  <div className="pop pop3 amber" style={{ left: "37%", top: "21%" }}><span className="pd" />Contract Awarded</div>
                </div>

                <svg className="sbmap-wires" viewBox="0 0 600 540" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                  <path id="m1" d="M170,165 C 250,190 250,300 300,335" />
                  <path id="m2" d="M160,272 C 240,288 250,318 300,335" />
                  <path id="m3" d="M175,388 C 245,378 255,350 300,335" />
                  <path id="m4" d="M430,165 C 350,190 350,300 300,335" />
                  <path id="m5" d="M440,272 C 360,288 350,318 300,335" />
                  <path id="m6" d="M425,388 C 355,378 345,350 300,335" />
                  <path id="m7" d="M300,402 L300,440" />
                  <circle className="sb-dot" r="4">
                    <animateMotion dur="2.6s" begin="0.2s" repeatCount="indefinite">
                      <mpath href="#m1"/>
                    </animateMotion>
                    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.15;.8;1" dur="2.6s" begin="0.2s" repeatCount="indefinite"/>
                  </circle>
                  <circle className="sb-dot" r="4">
                    <animateMotion dur="2.6s" begin="0.7s" repeatCount="indefinite">
                      <mpath href="#m2"/>
                    </animateMotion>
                    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.15;.8;1" dur="2.6s" begin="0.7s" repeatCount="indefinite"/>
                  </circle>
                  <circle className="sb-dot" r="4">
                    <animateMotion dur="2.6s" begin="1.2s" repeatCount="indefinite">
                      <mpath href="#m3"/>
                    </animateMotion>
                    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.15;.8;1" dur="2.6s" begin="1.2s" repeatCount="indefinite"/>
                  </circle>
                  <circle className="sb-dot" r="4">
                    <animateMotion dur="2.6s" begin="0.45s" repeatCount="indefinite">
                      <mpath href="#m4"/>
                    </animateMotion>
                    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.15;.8;1" dur="2.6s" begin="0.45s" repeatCount="indefinite"/>
                  </circle>
                  <circle className="sb-dot" r="4">
                    <animateMotion dur="2.6s" begin="0.95s" repeatCount="indefinite">
                      <mpath href="#m5"/>
                    </animateMotion>
                    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.15;.8;1" dur="2.6s" begin="0.95s" repeatCount="indefinite"/>
                  </circle>
                  <circle className="sb-dot" r="4">
                    <animateMotion dur="2.6s" begin="1.45s" repeatCount="indefinite">
                      <mpath href="#m6"/>
                    </animateMotion>
                    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.15;.8;1" dur="2.6s" begin="1.45s" repeatCount="indefinite"/>
                  </circle>
                  <circle className="sb-dot" r="4.4" style={{ fill: "var(--green)" }}>
                    <animateMotion dur="1.5s" begin="2s" repeatCount="indefinite">
                      <mpath href="#m7"/>
                    </animateMotion>
                    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.2;.8;1" dur="1.5s" begin="2s" repeatCount="indefinite"/>
                  </circle>
                </svg>

                <div className="sbmap-card in" style={{ left: "15.8%", top: "27.8%", animationDelay: ".05s" }}>
                  <div className="inner" style={{ animationDelay: "0s" }}>
                    <span className="sbmap-chip">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M14 3v5h5M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <path d="M8 13h8M8 17h6"/>
                      </svg>
                    </span>
                    <span className="sbmap-txt">
                      <span className="ttl">RFP Requirements</span>
                      <span className="tag">Input</span>
                    </span>
                  </div>
                </div>

                <div className="sbmap-card in" style={{ left: "14.2%", top: "50%", animationDelay: ".18s" }}>
                  <div className="inner" style={{ animationDelay: ".6s" }}>
                    <span className="sbmap-chip">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M3 21h18M5 21V7l7-4 7 4v14"/>
                        <path d="M9 21v-5h6v5"/>
                      </svg>
                    </span>
                    <span className="sbmap-txt">
                      <span className="ttl">Your Capabilities</span>
                      <span className="tag">Input</span>
                    </span>
                  </div>
                </div>

                <div className="sbmap-card in" style={{ left: "16.7%", top: "72.2%", animationDelay: ".31s" }}>
                  <div className="inner" style={{ animationDelay: "1.2s" }}>
                    <span className="sbmap-chip">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M9 11l3 3L22 4"/>
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                      </svg>
                    </span>
                    <span className="sbmap-txt">
                      <span className="ttl">Compliance Matrix</span>
                      <span className="tag">Input</span>
                    </span>
                  </div>
                </div>

                <div className="sbmap-card in" style={{ left: "84.2%", top: "27.8%", animationDelay: ".12s" }}>
                  <div className="inner" style={{ animationDelay: ".3s" }}>
                    <span className="sbmap-txt">
                      <span className="ttl">Pricing Strategy</span>
                      <span className="tag">Input</span>
                    </span>
                    <span className="sbmap-chip">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="sbmap-card in" style={{ left: "85.8%", top: "50%", animationDelay: ".25s" }}>
                  <div className="inner" style={{ animationDelay: ".9s" }}>
                    <span className="sbmap-txt">
                      <span className="ttl">Past Performance</span>
                      <span className="tag">Input</span>
                    </span>
                    <span className="sbmap-chip">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M8 21h8M12 17v4M7 4h10v4a5 5 0 0 1-10 0V4z"/>
                        <path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/>
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="sbmap-card in" style={{ left: "83.3%", top: "72.2%", animationDelay: ".38s" }}>
                  <div className="inner" style={{ animationDelay: "1.5s" }}>
                    <span className="sbmap-txt">
                      <span className="ttl">Win Strategy</span>
                      <span className="tag">Input</span>
                    </span>
                    <span className="sbmap-chip">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <circle cx="12" cy="12" r="9"/>
                        <circle cx="12" cy="12" r="5"/>
                        <circle cx="12" cy="12" r="1.4" fill="currentColor"/>
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="sbmap-hub in" style={{ animationDelay: ".5s" }}>
                  <div className="sbmap-mono">
                    <b>S<span>B</span></b>
                    <small>Built by experts</small>
                  </div>
                </div>

                <div className="sbmap-out in" style={{ animationDelay: ".85s" }}>
                  <div className="inner">
                    <span className="medal">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <circle cx="12" cy="9" r="6"/>
                        <path d="M9 14.5 8 22l4-2.2L16 22l-1-7.5"/>
                      </svg>
                    </span>
                    <span className="otext">
                      <span className="ttl">Winning Proposal</span>
                      <span className="badges">
                        <span className="chip">Compliant</span>
                        <span className="sub">On Time · Pay When You Win</span>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Strip - Continuous Infinite Marquee Ticker */}
      <section className="bg-white dark:bg-brand-navy-900 border-b border-gray-100 dark:border-white/10 relative z-20 shadow-sm overflow-hidden py-5">
        <div className="w-full relative flex items-center">
          <div className="sb-marquee-track flex whitespace-nowrap gap-16 items-center">
            {/* Duplicated sets of items for seamless infinite scrolling loop */}
            {Array(3).fill([
              "Serving clients in all 50 states",
              "Named consultant on every engagement",
              "On-time submission guaranteed",
              "Two-sets-of-eyes compliance review"
            ]).flat().map((text, i) => (
              <div key={i} className="flex items-center gap-3.5 shrink-0 px-4">
                <CheckCircle2 className="w-4.5 h-4.5 text-success shrink-0" />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-24 bg-slate-50 dark:bg-black/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] font-black text-amber-600 uppercase tracking-[0.25em]">
                Why this is hard
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-brand-navy-900 dark:text-white font-bold leading-tight">
                Winning government bids is a full-time job.
              </h2>
            </div>
            
            <div className="lg:col-span-7 space-y-6 text-slate-600 dark:text-slate-400 font-medium leading-relaxed text-base md:text-lg">
              <p>
                The opportunities are scattered across thousands of federal, state, county, and city sources. Every RFP is dozens of pages of requirements and formatting rules—and one missed checkbox gets you disqualified before anyone reads your price.
              </p>
              <p>
                Most businesses don't lose because they're the wrong vendor. They lose because bidding well takes time and expertise they can't spare.
              </p>
              <p className="text-brand-blue-600 dark:text-brand-blue-400 font-bold uppercase tracking-wider text-sm">
                That's the part we do.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* D differentiator Section */}
      <section className="py-24 bg-white dark:bg-brand-navy-900 overflow-hidden border-b border-slate-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative rounded-[3rem] bg-brand-navy-900 p-8 sm:p-12 md:p-16 text-white overflow-hidden shadow-2xl border border-white/5">
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue-600/10 rounded-full blur-[80px]" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-6">
                <span className="text-[10px] font-black text-amber-400 uppercase tracking-[0.25em]">
                  Pricing that's actually on your side
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight leading-tight">
                  Most consultants charge you whether you win or lose. <br />
                  <span className="italic text-brand-blue-400">We'd rather get paid when you win.</span>
                </h2>
              </div>
              <div className="space-y-6 text-slate-300 font-medium leading-relaxed">
                <p>
                  Choose <strong>Pay-When-You-Win</strong>: a low upfront to get started, plus a small percentage of the contract value only if you're awarded. Lose, and you've risked a fraction of what a flat-fee firm charges.
                </p>
                <p>
                  Win, and we both win—which is exactly the point. Prefer predictability? Pick a flat rate or a monthly retainer instead.
                </p>
                <div className="pt-2">
                  <Link href="/#pricing" className="inline-flex items-center gap-2 bg-brand-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5">
                    Compare Pricing Options
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Market Pulse / Bids Closing This Week */}
      <section className="py-24 bg-slate-50 dark:bg-brand-navy-900/40 overflow-hidden border-b border-slate-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <BidTicker />
        </div>
      </section>

      {/* The Opportunity Section */}
      <section className="py-24 bg-white dark:bg-brand-navy-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[10px] font-black text-brand-blue-600 uppercase tracking-[0.25em]">
                The big picture
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-brand-navy-900 dark:text-white font-bold leading-tight">
                The federal government alone spends $700+ billion a year.
              </h2>
              <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed text-base md:text-lg">
                The U.S. government is the largest buyer of goods and services on earth—and by law, a significant share is set aside for small businesses and veteran-owned firms. Add state, county, and city contracts on top, and the opportunity is enormous. The hard part isn't that the work isn't there. It's finding it and winning it. We do both.
              </p>
            </div>
            
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-8 rounded-3xl bg-white dark:bg-brand-navy-900 border border-gray-100 dark:border-white/5 shadow-xl sm:col-span-2">
                <div className="text-5xl font-black text-brand-navy-900 dark:text-white mb-2">$700B+</div>
                <div className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-2">Annual federal contract spending</div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                  Trillions more in state, county, city and municipal procurement processes across the United States.
                </p>
              </div>
              
              <div className="p-6 rounded-3xl bg-white dark:bg-brand-navy-900 border border-gray-100 dark:border-white/5 shadow-xl">
                <div className="text-3xl font-black text-brand-blue-600 mb-1">23%</div>
                <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Small Business Goal</div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                  Federal statutory target set aside for qualified small businesses.
                </p>
              </div>
              
              <div className="p-6 rounded-3xl bg-white dark:bg-brand-navy-900 border border-gray-100 dark:border-white/5 shadow-xl">
                <div className="text-3xl font-black text-brand-blue-600 mb-1">All 50</div>
                <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">States We Help In</div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                  Broad geographic coverage helping businesses target any locale.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Agencies Logos Section */}
      <section className="py-16 bg-[#0B1526] dark:bg-[#070e1b] border-t border-b border-white/5 relative overflow-hidden">
        {/* Subtle decorative elements matching premium dark theme */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        <div className="absolute -top-12 left-1/4 w-96 h-24 bg-brand-blue-600/10 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#7fa6ff] dark:text-brand-blue-400">
            PROPOSALS PREPARED FOR OPPORTUNITIES AT THESE AGENCIES
          </span>
          
          <div className="mt-10 flex flex-wrap items-center justify-center gap-5 md:gap-7 max-w-5xl mx-auto">
            {AGENCIES.map((agency) => (
              <div 
                key={agency.name}
                className="group relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-brand-navy-900/40 dark:bg-black/20 border border-white/10 dark:border-white/5 p-3.5 shadow-lg hover:border-[#7fa6ff]/40 hover:shadow-cyan-500/5 transition-all duration-300 hover:scale-105"
                title={`${agency.name} (${agency.category})`}
              >
                {/* Outer Glow Ring on Hover */}
                <div className="absolute inset-0 rounded-full bg-[#7fa6ff]/0 group-hover:bg-[#7fa6ff]/5 blur-md transition-all duration-300" />
                
                <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center">
                  <Image
                    src={agency.logo}
                    alt={`${agency.name} Logo`}
                    fill
                    sizes="(max-width: 768px) 48px, 64px"
                    className="object-contain filter group-hover:brightness-110 transition-all duration-300"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-relaxed">
            <div>+ USMC · Navy · USSOCOM · FBI · DISA · NRO · Caltrans · LA County · SF City · and 30 more</div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={cn("hiw", hiwInView && "in")} id="how-it-works">
        <div className="hiw-head">
          <span className="hiw-eyebrow">The Process</span>
          <h2>From <em>"where do I start"</em> to <em>"submitted on time."</em></h2>
        </div>

        <div className="hiw-track">
          <div className="hiw-line"><div className="fill"></div></div>
          <div className="hiw-pulse"></div>

          <div className="hiw-steps">

            {/* 01 FIND & QUALIFY */}
            <div className="step">
              <div className="tile" aria-hidden="true">
                <svg viewBox="0 0 48 48">
                  <circle className="fillp" cx="20" cy="20" r="12"/>
                  <circle className="linep" cx="20" cy="20" r="12"/>
                  <path className="linep" d="M29 29 L40 40"/>
                  <path className="linep" d="M15 20 l4 4 l7 -8"/>
                </svg>
              </div>
              <div className="step-body">
                <div className="step-num">01</div>
                <div className="step-title">Find &amp; Qualify</div>
                <p className="step-desc">We search opportunities nationwide and bring you only the ones worth your time — with an honest go/no-go before you spend a dollar.</p>
              </div>
            </div>

            {/* 02 STRATEGIZE */}
            <div className="step">
              <div className="tile" aria-hidden="true">
                <svg viewBox="0 0 48 48">
                  <circle className="fillp" cx="21" cy="24" r="14"/>
                  <circle className="linep" cx="21" cy="24" r="14"/>
                  <circle className="linep" cx="21" cy="24" r="7"/>
                  <circle className="dot" cx="21" cy="24" r="2.4"/>
                  <path className="linep" d="M21 24 L40 8"/>
                  <path className="linep" d="M40 8 l-6 .4 M40 8 l-.4 6"/>
                </svg>
              </div>
              <div className="step-body">
                <div className="step-num">02</div>
                <div className="step-title">Strategize</div>
                <p className="step-desc">A named consultant builds your win strategy — how to position your strengths, dodge disqualification traps, and price to win.</p>
              </div>
            </div>

            {/* 03 WRITE & BUILD (core) */}
            <div className="step core">
              <div className="tile" aria-hidden="true">
                <svg viewBox="0 0 48 48">
                  <path className="fillp" d="M12 6 h16 l8 8 v28 a0 0 0 0 1 0 0 H12 a0 0 0 0 1 0 0 Z"/>
                  <path className="linep" d="M28 6 v8 h8"/>
                  <path className="linep" d="M12 6 h16 l8 8 v28 H12 Z"/>
                  <path className="linep" d="M17 22 h10 M17 28 h14 M17 34 h8"/>
                  <path className="linep" d="M31 33 l8 -8 a2.1 2.1 0 0 1 3 3 l-8 8 l-4 1 z"/>
                </svg>
              </div>
              <div className="step-body">
                <div className="step-num">03</div>
                <div className="step-title">Write &amp; Build</div>
                <p className="step-desc">Expert writers produce the full proposal: every requirement mapped to a response, a complete compliance matrix, clean formatting — all under your company's name.</p>
              </div>
            </div>

            {/* 04 REVIEW & SUBMIT */}
            <div className="step">
              <div className="tile" aria-hidden="true">
                <svg viewBox="0 0 48 48">
                  <path className="fillp" d="M24 5 l15 6 v11 c0 11 -7 17 -15 20 c-8 -3 -15 -9 -15 -20 V11 Z"/>
                  <path className="linep" d="M24 5 l15 6 v11 c0 11 -7 17 -15 20 c-8 -3 -15 -9 -15 -20 V11 Z"/>
                  <path className="linep" d="M17 23 l5 5 l9 -11"/>
                </svg>
              </div>
              <div className="step-body">
                <div className="step-num">04</div>
                <div className="step-title">Review &amp; Submit</div>
                <p className="step-desc">Two sets of eyes check every requirement, then we file on time through the buyer's portal and confirm receipt.</p>
              </div>
            </div>

            {/* 05 DEBRIEF */}
            <div className="step">
              <div className="tile" aria-hidden="true">
                <svg viewBox="0 0 48 48">
                  <circle className="fillp" cx="24" cy="24" r="14"/>
                  <path className="linep" d="M38 18 a15 15 0 1 0 1.5 9"/>
                  <path className="linep" d="M38 9 v9 h-9"/>
                  <path className="linep" d="M18 25 l4 4 l9 -10"/>
                </svg>
              </div>
              <div className="step-body">
                <div className="step-num">05</div>
                <div className="step-title">Debrief</div>
                <p className="step-desc">Win or lose, we walk through the result with you — so the next bid is stronger than the last.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-slate-50 dark:bg-black/10 overflow-hidden border-b border-gray-100 dark:border-white/10">
        <div className="pf">
          <div className="pf-head">
            <span className="pf-eyebrow">Simple, aligned pricing</span>
            <h2>One model. <em>You mostly pay when you win.</em></h2>
            <p>A low bid writing fee to produce your proposal — plus a success fee charged only if you're awarded the contract. The bigger the contract, the lower the success rate.</p>
          </div>

          <div className="pf-grid">
            {/* REFERENCE TABLE */}
            <div className="pf-table">
              <div className="cap">Pricing structure</div>
              <div className="pf-row h">
                <div>Your contract is worth</div>
                <div>Bid Writing Fee</div>
                <div className="win" style={{ textAlign: "right" }}>Success Fee*</div>
              </div>
              <div className="pf-row d"><div className="tier">Up to $1 million</div><div className="fee">$450</div><div className="rate">1.00%</div></div>
              <div className="pf-row d"><div className="tier">Up to $2 million</div><div className="fee">$750</div><div className="rate">0.90%</div></div>
              <div className="pf-row d"><div className="tier">Up to $3 million</div><div className="fee">$1,000</div><div className="rate">0.80%</div></div>
              <div className="pf-row d"><div className="tier">Up to $4 million</div><div className="fee">$1,250</div><div className="rate">0.70%</div></div>
              <div className="pf-row d"><div className="tier">Up to $5 million</div><div className="fee">$1,500</div><div className="rate">0.60%</div></div>
              <div className="pf-row d">
                <div className="tier">Over $5 million</div>
                <div className="fee">$1,500<small className="block font-semibold text-[11px] text-slate-500 mt-1">+ $250 / add'l $1M</small></div>
                <div className="rate">0.50%</div>
              </div>
              <div className="pf-foot">*Success fee is charged <strong>only on an awarded contract</strong>. The bid writing fee covers requirement extraction, win strategy, full proposal writing, compliance review, and on-time submission.</div>
            </div>

            {/* INTERACTIVE ESTIMATOR */}
            <div className="pf-calc">
              <div className="cap">Estimate your cost</div>
              <h3>What will my bid cost?</h3>

              <div className="pf-cv">
                <span className="lbl">Contract value</span>
                <span className="val">${shortVal.num}<span>{shortVal.unit}</span></span>
              </div>
              <input 
                className="pf-slider" 
                type="range" 
                min={100000} 
                max={20000000} 
                step={100000} 
                value={contractValue} 
                onChange={(e) => setContractValue(Number(e.target.value))}
                style={{
                  background: `linear-gradient(90deg, #2563eb 0%, #2563eb ${((contractValue - 100000) / (20000000 - 100000)) * 100}%, rgba(255,255,255,0.14) ${((contractValue - 100000) / (20000000 - 100000)) * 100}%)`
                }}
              />
              <div className="pf-scale"><span>$100K</span><span>$10M</span><span>$20M</span></div>

              <div className="pf-out">
                <div className="pf-tile fee">
                  <div className="k">Bid Writing Fee</div>
                  <div className="v">{money(pricingResult.fee)}</div>
                  <div className="sub">due to start</div>
                </div>
                <div className="pf-tile win">
                  <div className="k">If you win, you pay</div>
                  <div className="v">{money(pricingResult.success)}</div>
                  <div className="sub">{pricingResult.rate.toFixed(2)}% success fee</div>
                </div>
              </div>

              <p className="pf-note">Lose, and you owe nothing beyond the bid writing fee.</p>
              <Link className="pf-cta" href="/book-call">
                Start My Bid — {money(pricingResult.fee)}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Operator Credibility */}
      <section className="py-24 bg-white dark:bg-brand-navy-900 overflow-hidden border-b border-slate-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[10px] font-black text-amber-600 uppercase tracking-[0.25em]">
                Why clients trust us with their bids
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-brand-navy-900 dark:text-white font-bold leading-tight">
                We've filed these bids ourselves. We know what gets you disqualified.
              </h2>
              <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed text-base md:text-lg">
                Stronger Built is a veteran-owned firm that has personally navigated government procurement portals and submitted winning bids. We know the requirements buyers actually enforce, the formatting that gets proposals tossed, and the deadlines that don't forgive. When you choose Pay-When-You-Win, our reward depends on your result—so we treat your bid like our own.
              </p>
            </div>
            
            <div className="lg:col-span-5 relative">
              {/* Background atmospheric glow */}
              <div className="absolute -inset-4 rounded-[3rem] bg-gradient-to-tr from-brand-blue-600/10 to-indigo-500/10 blur-xl opacity-80" />
              
              <div className="relative w-full aspect-[1000/534] rounded-[2rem] border border-slate-200/60 dark:border-white/10 shadow-2xl overflow-hidden bg-slate-50 dark:bg-white/5 group">
                <Image 
                  src="/images/projects/vetrenowned.png" 
                  alt="Stronger Built Veteran-Owned Team"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  priority
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Case Studies / Results */}
      <section className="py-24 bg-slate-50 dark:bg-black/10 overflow-hidden border-b border-gray-100 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <span className="text-[10px] font-black text-brand-blue-600 uppercase tracking-[0.25em]">
                The results speak for themselves
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-brand-navy-900 dark:text-white font-bold mt-2">
                Real bids. Real wins.
              </h2>
            </div>
            
            <Link href="/projects" className="text-brand-blue-600 font-bold hover:text-blue-700 flex items-center gap-2 group text-sm">
              <span>View Case Studies</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {[
              {
                slug: "case-study-1",
                industry: "Information Technology",
                client: "Federal Agency RFP",
                challenge: "RFP required complex cybersecurity clearances and strict compliance metrics on a 10-day turnaround.",
                outcome: "Won proposal. Secured $1.2M multi-year service contract under the Pay-When-You-Win model."
              },
              {
                slug: "case-study-2",
                industry: "Professional Staffing",
                client: "State Procurement Authority",
                challenge: "Highly competitive bid with a complex pricing sheet and strict small business set-aside requirements.",
                outcome: "Successfully qualified and selected as prime vendor. Estimated contract value of $2.4M."
              }
            ].map((study, i) => (
              <div key={i} className="flex flex-col rounded-[2.5rem] border border-gray-200 dark:border-white/10 bg-white dark:bg-brand-navy-900/50 p-8 sm:p-10 shadow-lg group hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-blue-600">{study.industry}</span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 px-3 py-1 rounded-full">
                    {study.client}
                  </span>
                </div>
                <div className="space-y-4 mb-8 flex-grow">
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    <strong className="text-brand-navy-900 dark:text-white text-sm block mb-1">Challenge:</strong>
                    {study.challenge}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    <strong className="text-brand-blue-600 dark:text-brand-blue-400 text-sm block mb-1">Result:</strong>
                    {study.outcome}
                  </div>
                </div>
                <Link href="/projects" className="inline-flex items-center gap-2 text-xs font-black text-brand-blue-600 uppercase tracking-widest group/link mt-auto">
                  <span>View Case Study details</span>
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto relative mt-16">
            <div className="relative overflow-hidden bg-white dark:bg-brand-navy-900 border border-gray-200 dark:border-white/10 rounded-[2.5rem] p-8 sm:p-12 shadow-xl">
              {/* Giant quote mark background */}
              <span className="absolute top-2 left-6 text-8xl font-serif text-brand-blue-500/10 pointer-events-none select-none">“</span>
              
              <div className="relative min-h-[180px] flex flex-col justify-center text-center px-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTestimonial}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="space-y-6"
                  >
                    <p className="text-base sm:text-lg md:text-xl text-slate-700 dark:text-slate-300 font-medium italic leading-relaxed">
                      "{TESTIMONIALS[currentTestimonial].quote}"
                    </p>
                    
                    <div>
                      <div className="text-sm font-bold text-brand-navy-900 dark:text-white uppercase tracking-wider">
                        {TESTIMONIALS[currentTestimonial].name}
                      </div>
                      <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">
                        {TESTIMONIALS[currentTestimonial].title} &middot; <span className="text-brand-blue-600 dark:text-brand-blue-400">{TESTIMONIALS[currentTestimonial].company}</span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Slider Controls */}
              <div className="flex items-center justify-center gap-4 mt-8 relative z-10">
                <button
                  onClick={() => setCurrentTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                  className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 dark:border-white/10 hover:border-brand-blue-600 hover:text-brand-blue-600 transition-colors text-slate-500 dark:text-slate-400 cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                <div className="flex items-center gap-2">
                  {TESTIMONIALS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentTestimonial(idx)}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all duration-300 cursor-pointer",
                        currentTestimonial === idx 
                          ? "bg-brand-blue-600 w-4" 
                          : "bg-slate-300 dark:bg-white/10"
                      )}
                      aria-label={`Go to testimonial ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length)}
                  className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 dark:border-white/10 hover:border-brand-blue-600 hover:text-brand-blue-600 transition-colors text-slate-500 dark:text-slate-400 cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section id="industries" className="py-24 bg-white dark:bg-brand-navy-900 overflow-hidden border-b border-slate-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-[10px] font-black text-brand-blue-600 uppercase tracking-[0.25em]">
              Wherever there's an RFP
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-brand-navy-900 dark:text-white font-bold mt-2">
              We go where your business goes.
            </h2>
            <p className="text-slate-500 font-medium mt-4">
              If there are government bids in your field, we have a way to win them—nationwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind, i) => (
              <div 
                key={i} 
                className={cn(
                  "relative rounded-[2rem] overflow-hidden group shadow-lg hover:shadow-2xl transition-all duration-500 min-h-[340px] flex flex-col justify-end p-8 border border-slate-200/60 dark:border-white/5",
                  i === 0 ? "lg:col-span-2" : "lg:col-span-1"
                )}
              >
                {/* Full-bleed background image */}
                <div className="absolute inset-0 z-0">
                  <Image 
                    src={ind.image} 
                    alt={ind.name}
                    fill
                    sizes={i === 0 ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 1024px) 100vw, 33vw"}
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* CSS overlay gradient (Scrim) */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0b1736]/15 via-[#0b1736]/65 to-[#0b1736]/90 transition-opacity duration-500 group-hover:opacity-95" />
                </div>

                {/* Frosted icon badge (Accent) */}
                <div className="absolute top-8 left-8 w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white z-10 transition-transform duration-500 group-hover:scale-110">
                  <ind.icon className="w-5 h-5" />
                </div>

                {/* Content aligned at the bottom scrim */}
                <div className="relative z-10 space-y-2 md:translate-y-6 md:group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-xl font-bold text-white uppercase tracking-tight">
                    {ind.name}
                  </h3>
                  <p className="text-xs text-slate-200 leading-relaxed font-semibold opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
                    {ind.desc}
                  </p>
                </div>
              </div>
            ))}
            
            {/* CTA card: solid brand-blue tile */}
            <div className="relative rounded-[2rem] overflow-hidden group shadow-lg hover:shadow-2xl transition-all duration-500 min-h-[340px] flex flex-col justify-between p-8 bg-brand-blue-600 text-white border border-transparent lg:col-span-1 md:col-span-2">
              {/* Subtle background decorative map pattern simulation */}
              <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
              
              <div className="relative z-10 w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                <HelpCircle className="w-5 h-5" />
              </div>
              
              <div className="relative z-10 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-2">
                    Don't see your industry?
                  </h3>
                  <p className="text-xs text-blue-100 leading-relaxed font-semibold">
                    We handle bids across almost all sectors. Let's discuss your specific RFP.
                  </p>
                </div>
                <div>
                  <Link href="/book-call" className="inline-flex items-center gap-2 text-xs font-black text-white bg-white/10 hover:bg-white/20 border border-white/20 px-6 py-3 rounded-full uppercase tracking-widest transition-all">
                    <span>Let's talk</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-slate-50 dark:bg-black/10 border-b border-gray-100 dark:border-white/5">
        {/* FAQ Schema for only the 6 visible questions */}
        <JsonLd 
          type="FAQPage" 
          data={[
            {
              question: "How does \"Pay When You Win\" work?",
              answer: "You pay a low bid writing fee to produce your proposal, plus a small success fee that's charged only if you're awarded the contract. If you don't win, you owe nothing beyond the bid writing fee."
            },
            {
              question: "How much does it cost to bid?",
              answer: "The bid writing fee starts at $450 for contracts up to $1 million and scales with contract size, plus a success fee charged only if you win — 1.0% up to $1M, stepping down to 0.5% above $5M."
            },
            {
              question: "Who actually writes my proposal?",
              answer: "A named human consultant and expert writer assigned to your engagement. Every word is written, reviewed, and owned by our team, and the proposal is submitted under your company's name."
            },
            {
              question: "Can you guarantee I'll win?",
              answer: "No — and anyone who promises a guaranteed win isn't being straight with you. What we guarantee is a high-quality, fully compliant, strategically written proposal submitted on time. And because of Pay-When-You-Win, we're financially invested in your result."
            },
            {
              question: "Do you work nationwide?",
              answer: "Yes. We help clients pursue federal, state, county, and city contracts in all 50 states."
            },
            {
              question: "How do I get started?",
              answer: "Book a free consultation. We'll review your opportunity, confirm pricing and timeline in writing, and get to work."
            }
          ]} 
        />

        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[10px] font-black text-amber-600 uppercase tracking-[0.25em]">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-brand-navy-900 dark:text-white font-bold mt-2">
              Common Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "How does \"Pay When You Win\" work?",
                a: "You pay a low bid writing fee to produce your proposal, plus a small success fee that's charged only if you're awarded the contract. If you don't win, you owe nothing beyond the bid writing fee."
              },
              {
                q: "How much does it cost to bid?",
                a: "The bid writing fee starts at $450 for contracts up to $1 million and scales with contract size, plus a success fee charged only if you win — 1.0% up to $1M, stepping down to 0.5% above $5M."
              },
              {
                q: "Who actually writes my proposal?",
                a: "A named human consultant and expert writer assigned to your engagement. Every word is written, reviewed, and owned by our team, and the proposal is submitted under your company's name."
              },
              {
                q: "Can you guarantee I'll win?",
                a: "No — and anyone who promises a guaranteed win isn't being straight with you. What we guarantee is a high-quality, fully compliant, strategically written proposal submitted on time. And because of Pay-When-You-Win, we're financially invested in your result."
              },
              {
                q: "Do you work nationwide?",
                a: "Yes. We help clients pursue federal, state, county, and city contracts in all 50 states."
              },
              {
                q: "How do I get started?",
                a: "Book a free consultation. We'll review your opportunity, confirm pricing and timeline in writing, and get to work."
              }
            ].map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>

          {/* CTA Block below the 6 questions */}
          <div className="text-center mt-12 space-y-4 border-t border-slate-200/60 dark:border-white/5 pt-10">
            <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold">
              Still have questions? We've answered the rest.
            </p>
            <div className="inline-flex gap-3 flex-wrap justify-center">
              <Link 
                href="/faqs" 
                className="inline-flex items-center justify-center gap-2 font-bold text-sm px-6 py-3.5 rounded-full bg-brand-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 hover:-translate-y-0.5 transition-all"
              >
                <span>View All FAQs</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/book-call" 
                className="inline-flex items-center justify-center gap-2 font-bold text-sm px-6 py-3.5 rounded-full bg-white dark:bg-slate-800 text-brand-navy-900 dark:text-white border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:-translate-y-0.5 transition-all shadow-sm"
              >
                <span>Book a Free Call</span>
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* Final CTA Section */}
      <section className="relative py-24 bg-brand-navy-900 overflow-hidden text-white border-t border-white/5">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10 space-y-8">
          <span className="text-[10px] font-black text-amber-400 uppercase tracking-[0.25em]">
            Ready to win?
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight leading-tight">
            Let's win your next bid.
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto font-medium leading-relaxed">
            Free consultation. Clear terms. And with Pay-When-You-Win, you don't carry the risk alone.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/book-call" className="group relative inline-flex items-center justify-center gap-3 bg-brand-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-sm transition-all shadow-xl hover:-translate-y-1">
              <span>Book a Free Consultation</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/open-bids" className="group inline-flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 text-white border border-white/20 px-8 py-4 rounded-full font-bold text-sm transition-all backdrop-blur-sm hover:-translate-y-1">
              <span>Search Open Bids — Free</span>
            </Link>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-center items-center gap-y-2 gap-x-8 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <div>📞 (831) 760-0806</div>
            <div className="hidden sm:block">·</div>
            <div>✉️ hello@strongerbuilt.xyz</div>
          </div>
        </div>
      </section>

    </div>
  );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 dark:border-white/10 rounded-[2rem] bg-white dark:bg-brand-navy-900/40 overflow-hidden transition-all hover:border-brand-blue-600/30 shadow-sm">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full px-8 py-6 flex items-center justify-between text-left group cursor-pointer"
      >
        <h3 className="text-base sm:text-lg font-bold text-brand-navy-900 dark:text-white group-hover:text-brand-blue-600 transition-colors">
          {question}
        </h3>
        <ChevronDown 
          className={cn(
            "w-5 h-5 text-slate-400 transition-transform duration-300 shrink-0 ml-4 motion-reduce:transition-none",
            isOpen && "rotate-180 text-brand-blue-600"
          )} 
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="motion-reduce:transition-none"
          >
            <div className="px-8 pb-8">
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
