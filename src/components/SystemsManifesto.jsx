import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

// Floating Narrative Pillar in Dark Space
function FloatingPillar({ item }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative py-8 md:py-10 border-b border-white/[0.08] first:border-t transition-all duration-300 ${
        isHovered ? 'translate-x-1.5' : ''
      }`}
    >
      {/* Oversized Background Watermark Numeral */}
      <span
        className={`pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 font-serif font-black select-none transition-all duration-500 leading-none ${
          isHovered
            ? 'opacity-[0.06] text-white text-8xl md:text-9xl translate-x-2'
            : 'opacity-[0.025] text-white text-8xl md:text-9xl'
        }`}
        style={{ fontFamily: "'Newsreader', 'Playfair Display', serif" }}
      >
        {item.index}
      </span>

      {/* Content Stack */}
      <div className="relative z-10 flex flex-col gap-3.5">
        
        {/* Top Header: Clean Typographic Metadata */}
        <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-zinc-400">
          <div className="flex items-center gap-2.5">
            <span className="font-semibold text-zinc-400 group-hover:text-white transition-colors">
              {item.index}
            </span>
            <span className="text-zinc-600">/</span>
            <span className="font-medium tracking-wider text-zinc-300">
              {item.craftLevel}
            </span>
          </div>

          <span className="text-[11px] text-zinc-500 group-hover:text-zinc-300 font-mono tracking-wider transition-colors">
            {item.specSub}
          </span>
        </div>

        {/* Expressive Editorial Headline */}
        <h3
          className="font-serif text-xl md:text-2xl font-normal text-[#F4F4F5] group-hover:text-white mt-1 tracking-[-0.02em] leading-[1.2] transition-colors"
          style={{ fontFamily: "'Newsreader', 'Playfair Display', serif" }}
        >
          {item.narrativeTitle}
        </h3>

        {/* Humanized Narrative Body Copy */}
        <p className="leading-relaxed transition-colors max-w-2xl text-sm md:text-[15px] text-[#A1A1AA] group-hover:text-[#D4D4D8] font-normal">
          {item.narrativeBody}
        </p>

        {/* Clean Spec Metric */}
        <div className="pt-1.5 flex items-center justify-between text-xs font-mono">
          <span className="font-medium tracking-wide text-zinc-300 group-hover:text-white transition-colors">
            {item.specMetric}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function SystemsManifesto() {
  const sectionRef = useRef(null);
  const [sectionSpotlight, setSectionSpotlight] = useState({ x: -1000, y: -1000 });

  const handleSectionMouseMove = (e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setSectionSpotlight({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const systemsPillars = [
    {
      index: '01',
      craftLevel: 'BROWSER INTERNALS',
      narrativeTitle: 'Direct DOM state parsing and parallel worker concurrency.',
      narrativeBody:
        'Instead of relying on heavy third-party scrapers that trigger bot detections and drag down performance, I build custom MV3 extensions that orchestrate parallel workers in memory with zero external API fees.',
      specMetric: '< 0.4ms Task Latency',
      specSub: 'MV3 Concurrency'
    },
    {
      index: '02',
      craftLevel: 'STREAM INTERCEPTION',
      narrativeTitle: 'Intercepting live binary buffers straight from memory.',
      narrativeBody:
        'Cloud audio transcription pipelines often take 45+ seconds per video. By intercepting YouTube\'s live caption tracks directly from browser memory, TubeBrief synthesizes summaries via Gemini 2.0 Flash in under 1.8 seconds.',
      specMetric: '< 1.8s Synthesis Latency',
      specSub: 'Direct Memory Hook'
    },
    {
      index: '03',
      craftLevel: 'FULL-STACK LABS',
      narrativeTitle: 'High-performance digital platforms with zero runtime bloat.',
      narrativeBody:
        'As founder of Fynal Technologies (fynal.net), I architect production systems with sub-second load times. Clean aesthetics, zero unnecessary dependencies, and code built to run reliably on the metal.',
      specMetric: 'Sub-Second Production',
      specSub: 'fynal.net'
    }
  ];

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      className="relative bg-[#09090B] text-[#E4E4E7] pt-24 pb-32 md:pt-32 md:pb-40 px-8 md:px-16 transition-colors duration-500 overflow-hidden"
    >
      {/* Background Radiant Cursor Spotlight */}
      <div
        className="pointer-events-none absolute -inset-0 transition-opacity duration-700 select-none"
        style={{
          background: `radial-gradient(850px circle at ${sectionSpotlight.x}px ${sectionSpotlight.y}px, rgba(255,255,255,0.035), transparent 75%)`
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-between pb-8 border-b border-white/[0.08] mb-14 md:mb-20"
        >
          {/* Section Terminal Tag */}
          <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.25em] uppercase">
            <span className="text-zinc-500 font-semibold">01 //</span>
            <span className="text-zinc-300">
              SYSTEMS SPECIFICATION & ARCHITECTURE
            </span>
          </div>
        </motion.div>

        {/* Main Grid: Humanized Editorial Manifesto + Floating Objects */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Humanized Editorial Narrative Headline & Manifesto */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col gap-8"
          >
            {/* Expressive Editorial Headline */}
            <div className="space-y-4">
              <h2
                className="text-3xl md:text-5xl lg:text-[48px] font-normal text-[#F4F4F5] tracking-[-0.03em] leading-[1.06]"
                style={{ fontFamily: "'Newsreader', 'Playfair Display', serif" }}
              >
                I write software from first principles.{' '}
                <span className="italic font-light text-white decoration-1 underline-offset-8 underline decoration-white/20">
                  Fast engines
                </span>
                , browser internals, and zero unnecessary dependencies.
              </h2>
            </div>

            {/* Humanized Copy */}
            <div className="space-y-4 text-[#A1A1AA] text-base leading-relaxed font-normal">
              <p>
                Most modern web software is bloated with vendor dependencies, heavy SaaS wrappers, and recurring API tolls.
              </p>
              <p>
                I focus on direct execution: in-memory stream interception, background worker concurrency, and lightweight local-first architecture that runs with sub-millisecond execution.
              </p>
            </div>

            {/* Floating Tactile Systems Flow Illustration */}
            <div className="pt-6 relative select-none">
              <svg
                viewBox="0 0 440 140"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto text-white"
              >
                <defs>
                  <filter id="streamGlowBright" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <linearGradient id="streamGradBright" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                    <stop offset="50%" stopColor="rgba(255,255,255,0.6)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
                  </linearGradient>
                  <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.05)" />
                    <stop offset="50%" stopColor="rgba(212,212,216,0.5)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
                  </linearGradient>
                </defs>

                {/* Grid Guide Matrix */}
                <path
                  d="M 10 70 H 430 M 110 10 V 130 M 220 10 V 130 M 330 10 V 130"
                  stroke="rgba(255,255,255,0.04)"
                  strokeWidth="1"
                  strokeDasharray="2 4"
                />

                {/* Primary Data Conduits */}
                <path
                  d="M 30 70 C 90 70, 120 25, 220 25 S 330 115, 410 70"
                  stroke="url(#streamGradBright)"
                  strokeWidth="2.2"
                  strokeDasharray="8 6"
                />
                <path
                  d="M 30 70 C 90 70, 120 115, 220 115 S 330 25, 410 70"
                  stroke="rgba(255,255,255,0.35)"
                  strokeWidth="1.8"
                />
                <path
                  d="M 70 70 Q 220 -10, 370 70"
                  stroke="url(#accentGrad)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />

                {/* Live Animated Photons Gliding Along the Conduits */}
                <circle r="4" fill="#FFFFFF" filter="url(#streamGlowBright)">
                  <animateMotion
                    path="M 30 70 C 90 70, 120 25, 220 25 S 330 115, 410 70"
                    dur="3.2s"
                    repeatCount="indefinite"
                  />
                </circle>

                <circle r="3.5" fill="#E4E4E7" filter="url(#streamGlowBright)">
                  <animateMotion
                    path="M 30 70 C 90 70, 120 115, 220 115 S 330 25, 410 70"
                    dur="4.5s"
                    repeatCount="indefinite"
                  />
                </circle>

                {/* Tactile System Terminal Nodes */}
                {/* Node 1: DOM / RUNTIME */}
                <g transform="translate(10, 50)">
                  <rect width="48" height="40" rx="8" fill="#121216" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                  <text x="24" y="24" fill="#FFFFFF" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold" letterSpacing="0.05em">V8</text>
                </g>

                {/* Node 2: UPPER BUFFER */}
                <g transform="translate(196, 5)">
                  <rect width="48" height="40" rx="8" fill="#121216" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                  <text x="24" y="24" fill="#FFFFFF" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold" letterSpacing="0.05em">STREAM</text>
                </g>

                {/* Node 3: LOWER MEMORY */}
                <g transform="translate(196, 95)">
                  <rect width="48" height="40" rx="8" fill="#121216" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                  <text x="24" y="24" fill="#D4D4D8" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold" letterSpacing="0.05em">MEMORY</text>
                </g>

                {/* Node 4: ZERO-OVERHEAD OUTPUT */}
                <g transform="translate(382, 50)">
                  <rect width="48" height="40" rx="8" fill="#121216" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                  <text x="24" y="24" fill="#FFFFFF" fontSize="8.5" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold" letterSpacing="0.05em">EXEC</text>
                </g>
              </svg>
            </div>
          </motion.div>

          {/* Right Column: Floating Narrative Components */}
          <div className="lg:col-span-7 flex flex-col">
            {systemsPillars.map((pillar) => (
              <FloatingPillar
                key={pillar.index}
                item={pillar}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
