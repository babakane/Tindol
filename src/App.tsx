import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  DraftingCompass, 
  Search, 
  Microscope, 
  LayoutGrid, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight,
  X,
  Send,
  Users,
  Briefcase,
  Cpu,
  Stethoscope,
  Banknote,
  Leaf,
  Sprout,
  Building2,
  Factory,
  GraduationCap,
  Palmtree,
  Shield,
  Zap,
} from "lucide-react";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

const INDUSTRY_SECTORS = [
  { name: "Technology & Innovation", icon: Cpu, desc: "Tech trends, startup ecosystems, and digital transformation." },
  { name: "Healthcare & Life Sciences", icon: Stethoscope, desc: "Pharmaceuticals, medical devices, and healthcare policy." },
  { name: "Financial Services", icon: Banknote, desc: "FinTech innovation, banking analysis, and regulatory compliance." },
  { name: "Energy & Sustainability", icon: Leaf, desc: "Renewables, ESG reporting, and green tech frameworks." },
  { name: "Agriculture", icon: Sprout, desc: "Agribusiness market research and sustainable farming documentation." },
  { name: "Real Estate", icon: Building2, desc: "Property markets, construction research, and urban planning." },
  { name: "Manufacturing", icon: Factory, desc: "Industry 4.0, supply chain optimization, and quality control." },
  { name: "Education", icon: GraduationCap, desc: "EdTech research, pedagogy analysis, and curriculum development." },
  { name: "Tourism", icon: Palmtree, desc: "Hospitality market research and travel industry analysis." },
];

const METHODOLOGY_PHASES = [
  { id: "01", title: "Discovery", desc: "Client needs assessment, research objectives definition, and success criteria establishment." },
  { id: "02", title: "Design", desc: "Methodology selection (Quant/Qual/Mixed), data collection planning, and quality standards." },
  { id: "03", title: "Analysis", desc: "Primary research execution, secondary data integration, and statistical triangulation." },
  { id: "04", title: "Synthesis", desc: "Pattern identification, trend analysis, and strategic implication development." },
  { id: "05", title: "Delivery", desc: "Content strategy, report writing, and rigorous quality assurance protocols." },
];

const MODULES = [
  {
    category: "RESEARCH",
    title: "Strategic Writing",
    description: "Premium freelance writing services specializing in business research and data-driven content.",
    items: ["Strategic Context", "Data-Driven Approach"],
    icon: DraftingCompass,
  },
  {
    category: "STRATEGY",
    title: "Business Planning",
    description: "Market entry strategies, competitive analysis frameworks, and business model innovation.",
    items: ["Market Entry", "Competitive Analysis"],
    icon: TrendingUp,
  },
  {
    category: "ANALYSIS",
    title: "Financial Intelligence",
    description: "Financial modeling, ROI calculation frameworks, and investment pitch documentation.",
    items: ["ROI Modeling", "Pitch Assets"],
    icon: Banknote,
  },
];

const TUTORIALS = [
  {
    category: "METHODOLOGY",
    title: "How to Securely Store API Keys in Vite + React",
    description: "Mastering environment variable isolation and production build hardening for modern web applications.",
  },
  {
    category: "TECH STACK",
    title: "Building a Single-File Python App for Network Isolation",
    description: "Strategic approach to creating portable, self-contained tools for intelligence gathering in air-gapped environments.",
  },
  {
    category: "INFRASTRUCTURE",
    title: "Offline-First PWAs: Running Locally Without a Server",
    description: "Deploying resilient data-driven dashboards that maintain operational capacity during communication blackout.",
  },
];

export default function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [activePhase, setActivePhase] = useState("01");

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const titleChars = "Minden".split("");

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30 scroll-smooth">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-outline-variant/30 px-margin-md lg:px-margin-lg py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center relative">
          <div className="flex items-center gap-8">
            <span 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-2xl font-serif text-primary font-bold tracking-tight cursor-pointer hover:opacity-80 transition-opacity"
            >
              Minden
            </span>
            <div className="hidden md:flex gap-8">
              {[
                { name: "Methodology", id: "methodology" },
                { name: "Expertise", id: "modules" },
                { name: "Intelligence", id: "intelligence" },
                { name: "Engagement", id: "proposals" }
              ].map((item) => (
                <button 
                  key={item.name} 
                  onClick={() => scrollTo(item.id)}
                  className="text-[10px] font-bold text-on-surface-variant hover:text-primary transition-colors uppercase tracking-[0.2em] cursor-pointer"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <AnimatePresence mode="wait">
              {isSearchOpen ? (
                <motion.div 
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "300px", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="absolute right-12 md:right-32 flex items-center bg-surface-container-high rounded-full px-4 py-1.5 border border-outline-variant/50"
                >
                  <Search className="w-4 h-4 text-primary mr-2" />
                  <input 
                    autoFocus
                    type="text"
                    placeholder="Search intelligence..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent border-none outline-none text-sm w-full text-on-surface placeholder:text-on-surface-variant/50"
                  />
                  <button onClick={() => setIsSearchOpen(false)} className="ml-2 hover:text-primary cursor-pointer">
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              ) : (
                <button 
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 hover:bg-surface-container-high rounded-full transition-colors group cursor-pointer"
                >
                  <Search className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-transform group-hover:scale-110" strokeWidth={1.5} />
                </button>
              )}
            </AnimatePresence>
            
            <button className="hidden sm:block text-[10px] font-bold tracking-[0.2em] uppercase border border-outline-variant px-6 py-2.5 rounded hover:bg-surface-container-high hover:border-primary/50 transition-all cursor-pointer">
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative w-full py-28 md:py-40 px-margin-md md:px-margin-lg bg-surface-container-low overflow-hidden">
        <div className="max-w-4xl relative z-10 mx-auto">
          {/* Stage Indicator */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-10"
          >
            <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-primary tracking-[0.15em] uppercase">Service Protocol Active</span>
            </div>
            <div className="h-px w-10 bg-outline-variant" />
            <span className="text-[10px] font-bold text-on-surface-variant/40 tracking-[0.15em] uppercase">Minden.Freelance_Methodology.v1.0</span>
          </motion.div>

          <div className="flex flex-col gap-6 mb-12">
            <h1 className="text-7xl md:text-9xl font-serif text-primary tracking-tighter leading-[0.9]">
              {titleChars.map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 50, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.8, ease: "circOut" }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="text-2xl md:text-4xl text-on-surface font-serif italic text-balance leading-tight border-l-4 border-primary/30 pl-8 py-4"
            >
              "Premium writing for a data-driven world. Strategic research for decisive minds."
            </motion.p>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-lg md:text-xl text-on-surface-variant font-sans leading-relaxed max-w-2xl mb-12"
          >
            Minden provides intellectually rigorous freelance writing services specializing in 
            strategic business research. We translate raw data into authoritative content, 
            providing analysts and executives with the cognitive architecture for supremacy.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <button 
              onClick={() => scrollTo('methodology')}
              className="bg-primary-container text-on-primary-container font-bold text-xs tracking-widest uppercase px-12 py-5 rounded-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-[0_0_40px_-10px_rgba(245,158,11,0.5)] flex items-center justify-center gap-3"
            >
              Examine Our Methodology
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => scrollTo('proposals')}
              className="border-2 border-outline-variant text-on-surface font-bold text-xs tracking-widest uppercase px-12 py-5 rounded-lg hover:bg-surface-container-high hover:border-primary/50 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
            >
              Hire Engagement Team
            </button>
          </motion.div>
        </div>

        {/* Dynamic Architectural Grid Background */}
        <motion.div 
          animate={{ opacity: [0.02, 0.05, 0.02] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-0 right-0 w-3/4 h-full pointer-events-none hidden lg:block text-primary"
        >
           <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
             <defs>
               <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                 <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" strokeWidth="0.2"/>
                 <circle cx="0" cy="0" r="0.5" fill="currentColor" opacity="0.5" />
               </pattern>
             </defs>
             <rect width="100%" height="100%" fill="url(#grid)" />
           </svg>
        </motion.div>
      </header>

      {/* STRATEGIC METHODOLOGY SECTION */}
      <section id="methodology" className="py-32 px-margin-md md:px-margin-lg bg-surface-container-high relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Navigation / TOC */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
              <span className="text-[10px] font-bold tracking-[0.3em] text-primary mb-6 block uppercase">Operational Core</span>
              <h2 className="text-5xl md:text-6xl font-serif mb-10 text-on-surface leading-tight">Business Research<br/>Methodology</h2>
              
              <div className="space-y-4">
                {METHODOLOGY_PHASES.map(phase => (
                  <button
                    key={phase.id}
                    onClick={() => setActivePhase(phase.id)}
                    className={`w-full flex items-center gap-6 p-4 rounded-lg border transition-all text-left group ${
                      activePhase === phase.id 
                      ? "bg-primary text-on-primary border-primary" 
                      : "bg-surface-container border-outline-variant/30 hover:border-primary/50 text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    <span className={`text-xl font-serif ${activePhase === phase.id ? "opacity-100" : "opacity-40"}`}>{phase.id}</span>
                    <span className="font-bold tracking-widest uppercase text-[10px]">{phase.title}</span>
                    <ArrowRight className={`w-4 h-4 ml-auto transition-transform ${activePhase === phase.id ? "translate-x-0" : "-translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Content Display */}
            <div className="lg:col-span-8 space-y-24">
              
              {/* Active Phase Detail */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePhase}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-background p-12 border border-primary/20 rounded-2xl shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute -top-10 -right-10 text-[200px] font-serif opacity-[0.03] select-none pointer-events-none">
                    {activePhase}
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className="text-4xl font-serif text-primary mb-8 underline decoration-primary/30 underline-offset-8">
                      Phase {activePhase}: {METHODOLOGY_PHASES.find(p => p.id === activePhase)?.title}
                    </h3>
                    <p className="text-2xl text-on-surface font-sans leading-relaxed mb-12">
                      {METHODOLOGY_PHASES.find(p => p.id === activePhase)?.desc}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 border-t border-outline-variant/20 italic">
                       <div>
                         <h4 className="text-[10px] font-bold tracking-[0.2em] text-primary mb-4 uppercase">Industry Integrants</h4>
                         <p className="text-sm text-on-surface-variant/70 leading-relaxed">
                           Recursive data scoping and objectives definition ensures every research project begins with absolute tactical alignment.
                         </p>
                       </div>
                       <div>
                         <h4 className="text-[10px] font-bold tracking-[0.2em] text-primary mb-4 uppercase">Protocol Outputs</h4>
                         <p className="text-sm text-on-surface-variant/70 leading-relaxed">
                           Delivery of high-fidelity studies that synthesize pattern recognition with actionable strategic implications.
                         </p>
                       </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Research Sector Verticals */}
              <div>
                <div className="flex items-center gap-6 mb-12">
                  <h3 className="text-3xl font-serif text-on-surface whitespace-nowrap">Specialized Research Verticals</h3>
                  <div className="h-px w-full bg-outline-variant/30" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {INDUSTRY_SECTORS.map((sector, i) => (
                    <motion.div
                      key={sector.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="p-8 bg-surface-container border border-outline-variant/30 hover:border-primary transition-all group rounded-xl"
                    >
                      <sector.icon className="w-10 h-10 text-primary/40 mb-6 group-hover:text-primary transition-colors group-hover:scale-110" strokeWidth={1.5} />
                      <h4 className="text-xl font-serif mb-3 group-hover:text-primary transition-colors">{sector.name}</h4>
                      <p className="text-sm text-on-surface-variant/70 leading-relaxed">
                        {sector.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Operational Framework Matrix */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-10 bg-background border border-primary/10 rounded-2xl hover:border-primary/40 transition-colors">
                  <Shield className="w-8 h-8 text-primary mb-6" />
                  <h4 className="text-2xl font-serif mb-4">Quality Standards</h4>
                  <p className="text-sm text-on-surface-variant italic mb-6">"Reliability, Validity, Objectivity, Transparency."</p>
                  <ul className="space-y-3 text-xs font-bold tracking-widest text-on-surface/50 uppercase">
                    <li className="flex gap-3 items-center"><div className="w-1 h-1 bg-primary rounded-full" /> Fact-Checked Info</li>
                    <li className="flex gap-3 items-center"><div className="w-1 h-1 bg-primary rounded-full" /> Plagiarism Detection</li>
                    <li className="flex gap-3 items-center"><div className="w-1 h-1 bg-primary rounded-full" /> Clear Methodology</li>
                  </ul>
                </div>
                <div className="p-10 bg-background border border-primary/10 rounded-2xl hover:border-primary/40 transition-colors">
                  <Zap className="w-8 h-8 text-primary mb-6" />
                  <h4 className="text-2xl font-serif mb-4">Technology Stack</h4>
                  <p className="text-sm text-on-surface-variant italic mb-6">"Advanced data analysis and market intelligence integration."</p>
                  <ul className="space-y-3 text-xs font-bold tracking-widest text-on-surface/50 uppercase">
                    <li className="flex gap-3 items-center"><div className="w-1 h-1 bg-primary rounded-full" /> R / Python / Tableau</li>
                    <li className="flex gap-3 items-center"><div className="w-1 h-1 bg-primary rounded-full" /> IBISWorld / Statista</li>
                    <li className="flex gap-3 items-center"><div className="w-1 h-1 bg-primary rounded-full" /> Academic Databases</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE EXPERTISE MODULES */}
      <section id="modules" className="py-24 px-margin-md md:px-margin-lg max-w-7xl mx-auto">
        <div className="mb-20 flex flex-col md:flex-row items-baseline gap-6">
          <div className="border-l-4 border-primary pl-8">
            <h2 className="text-4xl md:text-5xl font-serif mb-3 text-on-surface">Service Delivery Matrix</h2>
            <p className="text-on-surface-variant font-sans text-lg italic uppercase tracking-widest">Optimized for high-impact content outcomes.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {MODULES.map((module, idx) => (
            <motion.div
              key={module.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onMouseEnter={() => setActiveTooltip(module.title)}
              onMouseLeave={() => setActiveTooltip(null)}
              className="bg-secondary-container p-10 border border-outline-variant hover:border-primary transition-all group relative overflow-hidden flex flex-col h-full"
            >
              <div className="absolute top-6 right-6 z-20 cursor-help">
                <div className="p-3 bg-background/20 rounded-lg group-hover:bg-primary/10 transition-colors">
                  <module.icon className="w-10 h-10 text-on-surface-variant group-hover:text-primary transition-all group-hover:scale-110" strokeWidth={1} />
                </div>
                <AnimatePresence>
                  {activeTooltip === module.title && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, x: 20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap bg-primary text-on-primary font-bold text-[10px] tracking-widest uppercase px-4 py-2 rounded shadow-xl pointer-events-none z-30"
                    >
                      {module.title} Core Competency
                      <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-primary rotate-45" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <span className="text-[10px] font-bold tracking-[0.2em] text-primary mb-6 font-sans uppercase">{module.category}</span>
              <h3 className="text-3xl font-serif mb-4 text-on-surface">{module.title}</h3>
              <p className="text-on-surface-variant mb-10 font-sans text-lg leading-relaxed flex-grow opacity-80 group-hover:opacity-100 transition-opacity">
                {module.description}
              </p>
              
              <div className="space-y-4 mt-auto">
                <div className="h-px w-full bg-outline-variant/30" />
                <ul className="text-xs font-bold tracking-wider text-on-surface/60 font-sans uppercase">
                  {module.items.join(" • ")}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Field Intelligence - Tutorials */}
      <section id="intelligence" className="py-24 px-margin-md md:px-margin-lg bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-serif mb-4 text-on-surface">Intelligence Node</h2>
              <p className="text-on-surface-variant font-sans text-lg">Applied methodologies for technical advantage in digital and operational theaters.</p>
            </div>
            <a href="#" className="text-primary text-[10px] font-bold tracking-[0.25em] uppercase hover:tracking-[0.3em] transition-all flex items-center gap-3 group whitespace-nowrap bg-surface-container-high px-8 py-4 rounded border border-outline-variant/50">
              Explore Repository
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {TUTORIALS.map((tutorial, idx) => (
              <motion.div
                key={tutorial.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-surface p-10 border border-outline-variant hover:border-primary/50 shadow-sm hover:shadow-2xl transition-all cursor-pointer group flex flex-col h-full"
              >
                <div className="inline-block px-3 py-1 bg-secondary-container/50 text-[10px] font-bold tracking-widest text-on-surface-variant rounded mb-8 uppercase border border-outline-variant/30">
                  {tutorial.category}
                </div>
                <h3 className="text-2xl font-serif mb-6 leading-tight group-hover:text-primary transition-colors flex-grow">
                  {tutorial.title}
                </h3>
                <p className="text-sm text-on-surface-variant font-sans mb-10 line-clamp-3 leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">
                  {tutorial.description}
                </p>
                <div className="flex items-center gap-3 text-primary text-[10px] font-bold tracking-[0.2em] uppercase">
                  <span>View Manuscript</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STRATEGIC ENGAGEMENT SECTION */}
      <section id="proposals" className="py-24 px-margin-md md:px-margin-lg max-w-7xl mx-auto">
        <div className="bg-surface-container border border-primary/20 rounded-2xl overflow-hidden shadow-2xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-10 md:p-16 border-b lg:border-b-0 lg:border-r border-outline-variant/30">
              <span className="text-[10px] font-bold tracking-[0.3em] text-primary mb-6 block uppercase">Engagement Division</span>
              <h2 className="text-4xl md:text-5xl font-serif mb-8 text-on-surface">Initiate Strategic Briefing</h2>
              <p className="text-lg text-on-surface-variant mb-12 leading-relaxed font-sans">
                Our consultancy is available for high-stakes research programs and strategic content partnerships. 
                We operate across tiers of pricing scaled to complexity and expertise required.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <h4 className="text-[10px] font-bold tracking-widest text-primary uppercase">Pricing Tiers</h4>
                  <ul className="space-y-4">
                    <li className="flex flex-col">
                      <span className="font-serif text-lg">Starter</span>
                      <span className="text-xs text-on-surface-variant opacity-60">$500 - $2,000 / Case Study</span>
                    </li>
                    <li className="flex flex-col">
                      <span className="font-serif text-lg">Professional</span>
                      <span className="text-xs text-on-surface-variant opacity-60">$2k - $10k / Research Program</span>
                    </li>
                    <li className="flex flex-col">
                      <span className="font-serif text-lg">Enterprise</span>
                      <span className="text-xs text-on-surface-variant opacity-60">$10k+ / Custom Partnership</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-6">
                  <h4 className="text-[10px] font-bold tracking-widest text-primary uppercase">Target Segments</h4>
                  <ul className="space-y-2 text-xs font-bold tracking-wider text-on-surface/50 uppercase">
                    <li>• Startups (Planning)</li>
                    <li>• SMEs (Growth Strategy)</li>
                    <li>• Corporations (Intelligence)</li>
                    <li>• Investment Firms (Due Diligence)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-10 md:p-16 bg-surface-container-high">
              <h3 className="text-2xl font-serif mb-8 text-primary uppercase tracking-widest">Proposal Submission</h3>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold tracking-widest text-on-surface-variant/70 uppercase">Full Name</label>
                    <input type="text" className="w-full bg-background border border-outline-variant/30 focus:border-primary/50 text-sm p-4 rounded-lg outline-none transition-all" placeholder="Enter name..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold tracking-widest text-on-surface-variant/70 uppercase">Organization</label>
                    <input type="text" className="w-full bg-background border border-outline-variant/30 focus:border-primary/50 text-sm p-4 rounded-lg outline-none transition-all" placeholder="Enter org..." />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest text-on-surface-variant/70 uppercase">Strategic Need</label>
                  <select className="w-full bg-background border border-outline-variant/30 focus:border-primary/50 text-sm p-4 rounded-lg outline-none transition-all appearance-none cursor-pointer">
                    <option>Research-Intensive Content</option>
                    <option>Strategic Business Documentation</option>
                    <option>Ongoing Content Partnership</option>
                    <option>Rapid Research Briefing</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest text-on-surface-variant/70 uppercase">Project Brief / Objectives</label>
                  <textarea rows={4} className="w-full bg-background border border-outline-variant/30 focus:border-primary/50 text-sm p-4 rounded-lg outline-none transition-all resize-none" placeholder="Provide context for our research team..."></textarea>
                </div>
                <button className="w-full bg-primary text-on-primary font-bold text-xs tracking-[0.3em] py-5 rounded-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3 uppercase shadow-xl">
                  Initiate Operational Request
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-background py-24 px-margin-md lg:px-margin-lg border-t border-outline-variant/20 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 md:col-span-2 space-y-10">
              <span className="text-5xl font-serif text-primary font-bold tracking-tight">Minden</span>
              <p className="text-2xl text-on-surface-variant/70 max-w-sm font-serif italic text-balance leading-tight">
                "Intelligence is the ultimate competitive advantage. We build the documentation for that war."
              </p>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary underline underline-offset-4">Intelligence</h4>
              <nav className="flex flex-col gap-4">
                {["Methodology", "Expertise", "Repository", "Briefings"].map(link => (
                  <a key={link} href="#" className="text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors">{link}</a>
                ))}
              </nav>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary underline underline-offset-4">Operational</h4>
              <nav className="flex flex-col gap-4">
                {["Pricing Models", "Security Assets", "Client Portals", "Privacy Protocol"].map(link => (
                  <a key={link} href="#" className="text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors">{link}</a>
                ))}
              </nav>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10 border-t border-outline-variant/10">
            <p className="text-[10px] font-bold text-on-surface-variant/30 tracking-[0.2em] uppercase">
              © {new Date().getFullYear()} Minden High-Stakes Strategic Intelligence. All Rights Reserved.
            </p>
            <div className="flex gap-8">
              {["System: Operational", "Auth: Alpha-4", "Channel: Encrypted"].map(stat => (
                <span key={stat} className="text-[10px] font-bold text-on-surface-variant/20 tracking-[0.1em] uppercase">{stat}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
