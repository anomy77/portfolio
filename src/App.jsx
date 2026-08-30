import React, { useState } from 'react';
import { motion } from 'framer-motion';
import heroImage from '/hero-image.png?url';
import fynal1 from '/images/fynal-1.png?url';
import fynal2 from '/images/fynal-2.png?url';
import demoMapleads from '/videos/demo-3.mp4?url';
import demoTubebrief from '/videos/demo-1.mp4?url';
import demoMarkclip from '/videos/demo-2.mp4?url';

function App() {
  const [activeTab, setActiveTab] = useState('all');
  const [fynalTab, setFynalTab] = useState(0);

  const projects = [
    {
      id: 'fynal',
      name: 'FYNAL',
      subtitle: 'fynal.net — Production Web Platform & Systems Lab',
      desc: 'High-performance web architecture and digital systems deployment. Engineered for speed, clean aesthetics, and zero runtime overhead.',
      tag: 'FOUNDER & LIVE PLATFORM',
      url: 'https://fynal.net',
      type: 'image',
      media: fynal1,
      extraMedia: fynal2,
      metrics: ['100% Custom Stack', 'Sub-second Load', 'Production Deployed']
    },
    {
      id: 'mapleads',
      name: 'MAPLEADS',
      subtitle: 'Google Maps B2B Lead Extractor & Email Discovery',
      desc: 'High-throughput Manifest V3 prospecting tool with anti-stagnation DOM scrolling, 8x concurrent background email discovery, and Excel-ready CSV export.',
      tag: 'MV3 EXTENSION',
      url: 'https://github.com/anomy77/mapleads-lead-extractor',
      type: 'video',
      videoUrl: demoMapleads,
      metrics: ['8x Parallel Workers', '47%+ Email Yield', 'Zero API Fees']
    },
    {
      id: 'tubebrief',
      name: 'TUBEBRIEF AI',
      subtitle: 'In-Memory YouTube Caption Interceptor & LLM Synthesizer',
      desc: 'Extracts live caption tracks directly from YouTube DOM memory to bypass transcription latency. Streams synthesized briefs via Gemini 2.0 Flash in under 2 seconds.',
      tag: 'AI PIPELINE',
      url: 'https://github.com/anomy77/tubebrief-ai',
      type: 'video',
      videoUrl: demoTubebrief,
      metrics: ['<2s Latency', 'Gemini 2.0 Flash', 'Zero Server Costs']
    },
    {
      id: 'markclip',
      name: 'MARKCLIP',
      subtitle: 'Web-to-Markdown Knowledge Base Clipper',
      desc: 'Strips boilerplate, preserves structural headings and code fences, and converts full web articles into clean GitHub-flavored Markdown with automated metadata.',
      tag: 'AST PARSER',
      url: 'https://github.com/anomy77/markclip-extension',
      type: 'video',
      videoUrl: demoMarkclip,
      metrics: ['<8 KB Bundle', 'Obsidian Ready', 'Zero Dependencies']
    }
  ];

  return (
    <div className="bg-black text-white font-sans min-h-screen selection:bg-white selection:text-black">

      {/* ===== HERO: Full-Bleed Portrait (Clean Studio with Alpha Fade) ===== */}
      <section className="relative h-screen w-full overflow-hidden bg-white [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)]">

        {/* Portrait Image -- fills entire viewport with zero grey fog */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Gaurav Acharya"
            className="w-full h-full object-cover object-center grayscale contrast-105"
            style={{ objectPosition: '50% 15%' }}
          />
        </div>

        {/* Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-20 flex justify-between items-center px-8 md:px-12 py-6"
        >
          <span className="text-2xl font-black tracking-tight text-zinc-900">
            gaurav.
          </span>
          <div className="flex items-center gap-8">
            <a
              href="mailto:acryagaurav@gmail.com"
              className="text-sm font-medium text-zinc-900 hover:text-zinc-600 transition-colors"
            >
              Get In Touch
            </a>
          </div>
        </motion.nav>

        {/* Quote Statement -- transparent overlay on the right */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute right-8 md:right-16 bottom-24 md:bottom-32 z-20 max-w-sm md:max-w-md"
        >
          <p className="text-base md:text-lg leading-relaxed font-medium mb-4 text-zinc-900">
            Anyone can prompt a UI in 30 seconds. I'm the one who writes the code, breaks the hardware, and makes sure it actually runs.
          </p>
          <p className="text-sm font-bold tracking-wide text-zinc-700">— Gaurav Acharya</p>
        </motion.div>

        {/* Social Links -- right edge vertical stack */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-5"
        >
          <a href="https://github.com/anomy77" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-black/10 text-zinc-700 flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-sm">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
        </motion.div>

        {/* Bottom-left name label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="absolute bottom-8 left-8 md:left-12 z-20"
        >
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-zinc-700 mb-1">Systems & Browser Engineer</p>
          <p className="text-xs tracking-widest uppercase text-zinc-500">Kathmandu, Nepal</p>
        </motion.div>
      </section>

      {/* ===== SECTION 2: Value Proposition (Seamless Dark Flow) ===== */}
      <section className="relative bg-black text-white pt-24 pb-32 md:pt-36 md:pb-48 px-8 md:px-16 overflow-hidden">
        {/* Soft atmospheric ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-white/[0.03] to-transparent blur-3xl pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-7xl font-black tracking-tight leading-[1.05] mb-24 max-w-5xl uppercase text-white"
          >
            Software has limits.<br/>I design the autonomous systems that break them.
          </motion.h2>

          {/* Metrics row with soft gradient divider */}
          <div className="relative pt-12">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {[
                { label: 'FOUNDER', value: 'Fynal Technologies (fynal.net)' },
                { label: 'SYSTEMS', value: 'Manifest V3 & Scrapers' },
                { label: 'FOCUS', value: 'Autonomous Web & AI Pipelines' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 * (i + 1) }}
                  className="py-10 border-b md:border-b-0 md:border-r last:border-r-0 border-white/10 md:px-8 first:md:pl-0 last:md:pr-0"
                >
                  <p className="text-xs font-bold tracking-[0.2em] text-white/40 mb-3">{item.label}</p>
                  <p className="text-2xl font-black tracking-tight text-white">{item.value}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: Projects & Video Showcase ===== */}
      <section id="projects" className="relative bg-black text-white py-24 md:py-36 px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-between items-end mb-16"
          >
            <div>
              <p className="text-xs font-bold tracking-[0.3em] text-white/40 uppercase mb-2">Featured Systems & Demonstrations</p>
              <h3 className="text-3xl md:text-5xl font-black tracking-tight">Active Deployments</h3>
            </div>
          </motion.div>

          {/* Project Showcase Grid */}
          <div className="flex flex-col gap-24">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.9, delay: 0.1 * i }}
                className="group border border-white/10 bg-[#070709] rounded-none overflow-hidden transition-colors hover:border-white/25"
              >
                {/* Media Container: Video or Images */}
                <div className="relative w-full aspect-video bg-zinc-950 overflow-hidden border-b border-white/10">
                  {project.type === 'video' ? (
                    <video
                      src={project.videoUrl}
                      controls
                      playsInline
                      muted
                      autoPlay
                      loop
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    <div className="relative w-full h-full bg-zinc-950 flex flex-col justify-center items-center overflow-hidden">
                      <img
                        src={fynalTab === 0 ? project.media : project.extraMedia}
                        alt={fynalTab === 0 ? "Fynal Platform Overview" : "Fynal Studio IDE"}
                        className="w-full h-full object-contain object-center transition-all duration-300"
                      />
                      {/* Interactive View Switcher Tabs */}
                      <div className="absolute bottom-4 left-4 z-20 flex gap-1 bg-black/80 backdrop-blur-md p-1 border border-white/10">
                        <button
                          type="button"
                          onClick={() => setFynalTab(0)}
                          className={`px-3 py-1 text-[10px] font-bold tracking-wider uppercase transition-colors ${
                            fynalTab === 0 ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'
                          }`}
                        >
                          01 Platform Overview
                        </button>
                        <button
                          type="button"
                          onClick={() => setFynalTab(1)}
                          className={`px-3 py-1 text-[10px] font-bold tracking-wider uppercase transition-colors ${
                            fynalTab === 1 ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'
                          }`}
                        >
                          02 Studio IDE & Code
                        </button>
                      </div>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 text-[10px] font-bold tracking-[0.2em] text-white/70 border border-white/10 uppercase">
                    {project.tag}
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-8 md:p-12 flex flex-col justify-between">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                    <div>
                      <h4 className="text-3xl md:text-4xl font-black tracking-tight mb-2 group-hover:text-gray-300 transition-colors">
                        {project.name}
                      </h4>
                      <p className="text-sm font-medium text-white/50 mb-4">{project.subtitle}</p>
                      <p className="text-base text-zinc-400 max-w-2xl leading-relaxed">{project.desc}</p>
                    </div>

                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 self-start bg-white text-black px-6 py-3 text-xs font-bold tracking-widest uppercase hover:bg-zinc-200 transition-colors shrink-0"
                    >
                      <span>{project.type === 'image' ? 'Visit fynal.net' : 'View Source Code'}</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </a>
                  </div>

                  {/* Metrics Pills */}
                  <div className="flex flex-wrap gap-3 pt-6 border-t border-white/5">
                    {project.metrics.map((m) => (
                      <span key={m} className="text-xs font-mono text-zinc-400 bg-white/[0.03] border border-white/5 px-3 py-1">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="relative bg-black py-16 px-8 md:px-16 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <p className="text-2xl font-black tracking-tight mb-2">gaurav.</p>
              <p className="text-xs text-zinc-500 mb-1">Founder, Fynal Technologies</p>
              <a href="mailto:acryagaurav@gmail.com" className="text-white/40 hover:text-white transition-colors text-sm font-mono">acryagaurav@gmail.com</a>
            </div>
            <div className="flex gap-8">
              <a href="https://fynal.net" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors text-sm font-bold tracking-wide">FYNAL.NET</a>
              <a href="https://github.com/anomy77" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors text-sm font-bold tracking-wide">GITHUB</a>
              <a href="Gaurav_Acharya_Resume.pdf" target="_blank" className="text-white/40 hover:text-white transition-colors text-sm font-bold tracking-wide">RESUME</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
