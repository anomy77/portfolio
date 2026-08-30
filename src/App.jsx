import React, { useState } from 'react';
import { motion } from 'framer-motion';
import heroImage from '/hero-image.png?url';
import fynal1 from '/images/fynal-1.png?url';
import fynal2 from '/images/fynal-2.png?url';
import demoMapleads from '/videos/demo-3.mp4?url';
import demoTubebrief from '/videos/demo-1.mp4?url';
import demoMarkclip from '/videos/demo-2.mp4?url';
import thumbMapleads from '/images/demo-3-thumb.jpg?url';
import thumbTubebrief from '/images/demo-1-thumb.jpg?url';
import thumbMarkclip from '/images/demo-2-thumb.jpg?url';

import { ProjectMedia } from './components/ProjectMedia';
import { MediaLightbox } from './components/MediaLightbox';

function App() {
  const [fynalTab, setFynalTab] = useState(0);
  const [selectedLightboxProject, setSelectedLightboxProject] = useState(null);

  const flagshipProject = {
    id: 'fynal',
    name: 'FYNAL TECHNOLOGIES',
    subtitle: 'fynal.net — Production Web Platform & Systems Lab',
    desc: 'Founded to build high-performance web architecture from scratch. Clean aesthetics, zero runtime dependencies, and sub-second execution across live production deployments.',
    tag: 'FLAGSHIP PLATFORM',
    url: 'https://fynal.net',
    type: 'image',
    media: fynal1,
    extraMedia: fynal2,
    metrics: ['Custom Stack Architecture', 'Sub-second Load', 'Live in Production']
  };

  const extensionProjects = [
    {
      id: 'mapleads',
      name: 'MAPLEADS',
      subtitle: 'Google Maps B2B Lead Extractor & Email Discovery',
      desc: 'Lead providers charge $300/mo for basic Google Maps scraping. I built an in-browser Manifest V3 worker engine that auto-scrolls virtualized DOMs, spawns 8 parallel background scrapers, and extracts clean verified emails directly to CSV with zero external API fees.',
      tag: 'MV3 EXTENSION',
      url: 'https://github.com/anomy77/mapleads-lead-extractor',
      type: 'video',
      videoUrl: demoMapleads,
      poster: thumbMapleads,
      metrics: ['Anti-Stagnation DOM Observer', '8x Background Workers', 'Zero API Fees']
    },
    {
      id: 'tubebrief',
      name: 'TUBEBRIEF AI',
      subtitle: 'In-Memory YouTube Caption Interceptor & LLM Synthesizer',
      desc: 'Whisper audio transcription pipelines take 45+ seconds per video. TubeBrief intercepts YouTube\'s live caption tracks directly from browser memory and streams an instant synthesis via Gemini 2.0 Flash in under 1.8 seconds.',
      tag: 'AI PIPELINE',
      url: 'https://github.com/anomy77/tubebrief-ai',
      type: 'video',
      videoUrl: demoTubebrief,
      poster: thumbTubebrief,
      metrics: ['In-Memory Stream Hook', 'Gemini 2.0 Flash REST', '<1.8s Synthesis Latency']
    },
    {
      id: 'markclip',
      name: 'MARKCLIP',
      subtitle: 'Web-to-Markdown Knowledge Base Clipper',
      desc: 'Web clippers export cluttered HTML packed with tracking tags. MarkClip parses the DOM into clean GitHub/Obsidian Markdown in real-time within a 6.8 KB zero-dependency footprint.',
      tag: 'AST PARSER',
      url: 'https://github.com/anomy77/markclip-extension',
      type: 'video',
      videoUrl: demoMarkclip,
      poster: thumbMarkclip,
      metrics: ['DOM-to-AST Parser', 'Obsidian & GitHub Ready', '6.8 KB Total Bundle']
    }
  ];

  return (
    <div className="bg-black text-white font-sans min-h-screen selection:bg-white selection:text-black">

      {/* ===== SECTION 1: Full-Bleed Portrait Hero ===== */}
      <section className="relative h-screen w-full overflow-hidden bg-white [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)]">

        {/* Portrait Image */}
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
              className="text-sm font-semibold text-zinc-900 hover:text-zinc-600 transition-colors"
            >
              Get In Touch
            </a>
          </div>
        </motion.nav>

        {/* Quote Statement */}
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

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-5"
        >
          <a
            href="https://github.com/anomy77"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white border border-black/10 text-zinc-700 flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-sm"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        </motion.div>

        {/* Bottom-left label */}
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

      {/* ===== SECTION 2: Authentic Engineering Manifesto ===== */}
      <section className="relative bg-black text-white pt-24 pb-28 md:pt-36 md:pb-36 px-8 md:px-16 overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16"
          >
            <p className="text-xs font-mono tracking-[0.3em] text-white/40 uppercase mb-4">Engineering Philosophy</p>
            <h2 className="text-3xl md:text-6xl font-black tracking-tight leading-[1.1] max-w-4xl text-white">
              I write software from first principles. Fast engines, browser internals, and zero unnecessary dependencies.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="md:col-span-6 text-zinc-400 text-base md:text-lg leading-relaxed font-normal"
            >
              <p className="mb-6">
                Most web tools today are bloated wrappers layered over slow APIs and recurring server tolls.
              </p>
              <p>
                I focus on direct execution: in-memory stream interception, background worker concurrency, and lightweight local-first architecture that runs fast and costs nothing to maintain.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="md:col-span-6 flex flex-col gap-6"
            >
              <div className="bg-white/[0.02] border border-white/10 p-6">
                <p className="text-xs font-mono text-white/50 tracking-wider uppercase mb-1">01 • Browser Internals & MV3</p>
                <p className="text-sm text-zinc-300 font-medium leading-relaxed">
                  Reverse-engineering DOM virtualization and running parallel background workers directly inside Chrome.
                </p>
              </div>

              <div className="bg-white/[0.02] border border-white/10 p-6">
                <p className="text-xs font-mono text-white/50 tracking-wider uppercase mb-1">02 • Direct Stream Interception</p>
                <p className="text-sm text-zinc-300 font-medium leading-relaxed">
                  Bypassing heavy server transcription by reading live caption and data streams straight from memory.
                </p>
              </div>

              <div className="bg-white/[0.02] border border-white/10 p-6">
                <p className="text-xs font-mono text-white/50 tracking-wider uppercase mb-1">03 • Full-Stack Deployments</p>
                <p className="text-sm text-zinc-300 font-medium leading-relaxed">
                  Founder at Fynal Technologies (fynal.net), deploying clean digital platforms and bespoke tools.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: Flagship Platform Spotlight (Fynal.net) ===== */}
      <section id="flagship" className="relative bg-black text-white py-20 md:py-28 px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <p className="text-xs font-mono tracking-[0.3em] text-white/40 uppercase mb-2">Flagship Platform</p>
            <h3 className="text-3xl md:text-5xl font-black tracking-tight">Fynal Technologies</h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9 }}
            className="flex flex-col gap-8"
          >
            {/* Floating Media Screen Container */}
            <div className="relative w-full aspect-video">
              <ProjectMedia
                project={flagshipProject}
                fynalTab={fynalTab}
                setFynalTab={setFynalTab}
                onOpenLightbox={(proj) => setSelectedLightboxProject(proj)}
              />
            </div>

            {/* Floating Project Details */}
            <div className="flex flex-col gap-6 px-2 md:px-4">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div>
                  <h4 className="text-2xl md:text-3xl font-black tracking-tight mb-2">
                    {flagshipProject.name}
                  </h4>
                  <p className="text-sm font-medium text-white/50 mb-3">{flagshipProject.subtitle}</p>
                  <p className="text-base text-zinc-400 max-w-3xl leading-relaxed">{flagshipProject.desc}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => setSelectedLightboxProject(flagshipProject)}
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-3 text-xs font-bold tracking-widest uppercase transition-colors"
                  >
                    <span>Demo</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 3h6m0 0v6m0-6L14 10M9 21H3m0 0v-6m0 6l7-7" />
                    </svg>
                  </button>

                  <a
                    href={flagshipProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 text-xs font-bold tracking-widest uppercase hover:bg-zinc-200 transition-colors"
                  >
                    <span>Visit fynal.net</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Metrics Pills */}
              <div className="flex flex-wrap gap-2.5">
                {flagshipProject.metrics.map((m) => (
                  <span key={m} className="text-xs font-mono text-zinc-400 bg-white/[0.04] border border-white/10 px-3.5 py-1.5 rounded-none">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== SECTION 4: Browser Engines & Extensions ===== */}
      <section id="projects" className="relative bg-black text-white py-20 md:py-28 px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <p className="text-xs font-mono tracking-[0.3em] text-white/40 uppercase mb-2">Proof of Work</p>
            <h3 className="text-3xl md:text-5xl font-black tracking-tight">Browser Engines & Extensions</h3>
          </motion.div>

          <div className="flex flex-col gap-28">
            {extensionProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.9, delay: 0.1 * i }}
                className="group relative flex flex-col gap-8"
              >
                {/* Floating Media Screen Container */}
                <div className="relative w-full aspect-video">
                  <ProjectMedia
                    project={project}
                    onOpenLightbox={(proj) => setSelectedLightboxProject(proj)}
                  />
                </div>

                {/* Floating Project Details */}
                <div className="flex flex-col gap-6 px-2 md:px-4">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div>
                      <h4 className="text-3xl md:text-4xl font-black tracking-tight mb-2 group-hover:text-gray-300 transition-colors">
                        {project.name}
                      </h4>
                      <p className="text-sm font-medium text-white/50 mb-3">{project.subtitle}</p>
                      <p className="text-base text-zinc-400 max-w-3xl leading-relaxed">{project.desc}</p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        type="button"
                        onClick={() => setSelectedLightboxProject(project)}
                        className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-3 text-xs font-bold tracking-widest uppercase transition-colors"
                      >
                        <span>Demo</span>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 3h6m0 0v6m0-6L14 10M9 21H3m0 0v-6m0 6l7-7" />
                        </svg>
                      </button>

                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 text-xs font-bold tracking-widest uppercase hover:bg-zinc-200 transition-colors"
                      >
                        <span>Source Code</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* Metrics Pills */}
                  <div className="flex flex-wrap gap-2.5">
                    {project.metrics.map((m) => (
                      <span key={m} className="text-xs font-mono text-zinc-400 bg-white/[0.04] border border-white/10 px-3.5 py-1.5 rounded-none">
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

      {/* Interactive Lightbox Modal */}
      {selectedLightboxProject && (
        <MediaLightbox
          project={selectedLightboxProject}
          onClose={() => setSelectedLightboxProject(null)}
          fynalTab={fynalTab}
          setFynalTab={setFynalTab}
        />
      )}
    </div>
  );
}

export default App;
