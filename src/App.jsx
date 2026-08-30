import React from 'react';
import { motion } from 'framer-motion';
import heroDarkImage from '/hero-dark.png?url';

function App() {
  return (
    <div className="bg-[#030305] text-[#f1f5f9] font-sans min-h-screen selection:bg-[#38bdf8] selection:text-black antialiased">

      {/* ===== HERO: Full-Bleed Dark Portrait ===== */}
      <section className="relative h-screen w-full overflow-hidden bg-[#030305]">

        {/* Ambient Glows */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0284c7]/15 rounded-full blur-[140px] pointer-events-none z-0"></div>
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-[#38bdf8]/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

        {/* Portrait Image -- cleanly composited against pure dark background */}
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <img
            src={heroDarkImage}
            alt="Gaurav Acharya"
            className="w-full h-full object-cover object-top grayscale contrast-[1.15] brightness-[0.92] max-w-6xl mx-auto"
            style={{ objectPosition: '50% 12%' }}
          />
          {/* Edge Vignette & Lighting Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-transparent to-[#030305]/60 pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#030305]/80 via-transparent to-[#030305]/60 pointer-events-none"></div>
        </div>

        {/* Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-20 flex justify-between items-center px-8 md:px-14 py-7"
        >
          <a href="#" className="text-2xl font-black tracking-tight text-white flex items-center gap-1.5">
            gaurav<span className="text-[#38bdf8] text-3xl leading-none">.</span>
          </a>
          <div className="flex items-center gap-6">
            <a
              href="#projects"
              className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors hidden sm:block"
            >
              Projects
            </a>
            <a
              href="mailto:acryagaurav@gmail.com"
              className="bg-white text-black px-6 py-2.5 rounded-full text-xs font-black tracking-[0.1em] uppercase hover:bg-[#38bdf8] hover:text-black transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(56,189,248,0.5)]"
            >
              Get In Touch
            </a>
          </div>
        </motion.nav>

        {/* Quote Card -- Dark Glassmorphism Overlay */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute right-6 md:right-16 bottom-24 md:bottom-36 z-10 bg-[#0c0d14]/90 text-white p-7 md:p-9 max-w-sm md:max-w-md rounded-2xl border border-white/10 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
        >
          <div className="w-8 h-[2px] bg-[#38bdf8] mb-5"></div>
          <p className="text-sm md:text-base leading-relaxed font-normal text-gray-200 mb-6">
            Users leave. I design the reasons they stay. Anyone can generate the screens now. I design the decisions behind them, and ship the thing running.
          </p>
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#38bdf8]">
              — Gaurav Acharya
            </p>
            <span className="text-[10px] text-gray-500 font-mono">2026</span>
          </div>
        </motion.div>

        {/* Social Links -- Right Edge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute right-6 md:right-14 top-1/2 -translate-y-1/2 z-10 hidden sm:flex flex-col gap-4"
        >
          <a
            href="https://github.com/anomy77"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 hover:border-[#38bdf8]/50 hover:text-[#38bdf8] transition-all"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
          <a
            href="mailto:acryagaurav@gmail.com"
            title="Email"
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 hover:border-[#38bdf8]/50 hover:text-[#38bdf8] transition-all"
          >
            <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          </a>
        </motion.div>

        {/* Bottom-left metadata label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="absolute bottom-8 left-8 md:left-14 z-10"
        >
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-gray-300">Available for Contracts</p>
          </div>
          <p className="text-[11px] tracking-widest uppercase text-gray-500 font-mono">Systems & Browser Engineer &bull; Kathmandu, Nepal</p>
        </motion.div>
      </section>

      {/* ===== SECTION 2: Value Proposition (Dark Mode) ===== */}
      <section className="bg-[#08090f] text-white py-28 md:py-40 px-8 md:px-16 border-y border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#38bdf8]/5 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-xs font-mono font-bold tracking-[0.3em] uppercase text-[#38bdf8] mb-6"
          >
            // PHILOSOPHY & CAPABILITY
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-6xl font-black tracking-tight leading-[1.1] mb-20 max-w-4xl uppercase text-white"
          >
            Software has limits.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-[#38bdf8]">
              I design the physical capabilities that break them.
            </span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-white/10">
            {[
              { label: 'FOUNDER', value: 'Fynal Technologies', desc: 'Hardware & intelligent software research lab' },
              { label: 'CREATOR', value: 'REFLEX OS', desc: 'Low-latency spatial runtime & haptic integration' },
              { label: 'FOCUS', value: 'Spatial Computing & Haptics', desc: 'Embodied intelligence & autonomous browser systems' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 * (i + 1) }}
                className="py-10 border-b md:border-b-0 md:border-r last:border-r-0 border-white/10 md:px-8 first:md:pl-0 last:md:pr-0 group"
              >
                <p className="text-[11px] font-mono font-bold tracking-[0.2em] text-[#38bdf8] mb-2">{item.label}</p>
                <p className="text-xl md:text-2xl font-bold tracking-tight text-white mb-2 group-hover:text-[#38bdf8] transition-colors">{item.value}</p>
                <p className="text-xs text-gray-400 font-normal leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: Current Focus / Projects (Deep Obsidian) ===== */}
      <section id="projects" className="bg-[#030305] text-white py-28 md:py-40 px-8 md:px-16 relative">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-16 border-b border-white/10 pb-6">
            <div>
              <p className="text-xs font-mono font-bold tracking-[0.3em] uppercase text-[#38bdf8] mb-2">
                // ARCHITECTURE & BUILDS
              </p>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase text-white">
                Current Focus
              </h2>
            </div>
            <span className="text-xs font-mono text-gray-500 hidden sm:block">4 SYSTEMS DEPLOYED</span>
          </div>

          {/* Project Rows */}
          <div className="flex flex-col">
            {[
              {
                name: 'REFLEX OS',
                desc: 'Ultra-low latency runtime bridging spatial computing hardware with high-fidelity haptic feedback mechanisms.',
                tag: 'RUNTIME LAYER',
                meta: 'C++ / Rust / Spatial',
                url: '#'
              },
              {
                name: 'MAPLEADS',
                desc: 'Autonomous Google Maps prospector with 8x parallel background email discovery engine and stagnation detection.',
                tag: 'MV3 EXTENSION',
                meta: '300+ leads / batch',
                url: 'https://github.com/anomy77/mapleads-lead-extractor'
              },
              {
                name: 'TUBEBRIEF AI',
                desc: 'Direct in-memory subtitle track parser connected to Gemini 2.0 Flash REST endpoint for sub-2s video synthesis.',
                tag: 'LLM PIPELINE',
                meta: '< 2.1s Latency',
                url: 'https://github.com/anomy77/tubebrief-ai'
              },
              {
                name: 'MARKCLIP',
                desc: 'Lightweight web clipper extracting DOM trees into clean GitHub-flavored Markdown with automated YAML front matter.',
                tag: 'KNOWLEDGE PARSER',
                meta: 'Obsidian / Notion Ready',
                url: 'https://github.com/anomy77/markclip-extension'
              },
            ].map((project, i) => (
              <motion.a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.08 * i }}
                className="group flex flex-col md:flex-row md:items-center justify-between py-8 md:py-10 border-b border-white/10 hover:border-[#38bdf8]/40 hover:bg-white/[0.02] px-4 -mx-4 rounded-lg transition-all cursor-pointer"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-8">
                  <h3 className="text-2xl md:text-4xl font-black tracking-tight text-white group-hover:text-[#38bdf8] transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-400 font-normal max-w-md leading-relaxed">
                    {project.desc}
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-4 md:mt-0 justify-between md:justify-end">
                  <span className="text-[10px] font-mono font-bold tracking-[0.15em] text-[#38bdf8] bg-[#38bdf8]/10 border border-[#38bdf8]/20 px-3 py-1 rounded">
                    {project.tag}
                  </span>
                  <span className="text-xs text-gray-500 font-mono hidden lg:block">
                    {project.meta}
                  </span>
                  <span className="text-sm font-bold text-gray-400 group-hover:text-[#38bdf8] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">
                    &#8599;
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER: Dark Minimalist ===== */}
      <footer className="bg-[#020204] border-t border-white/10 py-16 px-8 md:px-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <p className="text-2xl font-black tracking-tight text-white mb-2">
              gaurav<span className="text-[#38bdf8]">.</span>
            </p>
            <a
              href="mailto:acryagaurav@gmail.com"
              className="text-gray-400 hover:text-[#38bdf8] transition-colors text-sm font-mono"
            >
              acryagaurav@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-8 text-xs font-mono font-bold uppercase tracking-wider">
            <a href="https://github.com/anomy77" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">GITHUB</a>
            <a href="Gaurav_Acharya_Resume.pdf" target="_blank" className="text-gray-400 hover:text-white transition-colors">RESUME (PDF)</a>
            <a href="mailto:acryagaurav@gmail.com" className="text-[#38bdf8] hover:underline">CONTACT</a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-[11px] font-mono text-gray-600 gap-2">
          <p>&copy; {new Date().getFullYear()} Gaurav Acharya. All rights reserved.</p>
          <p>Designed for physical & browser intelligence</p>
        </div>
      </footer>

    </div>
  );
}

export default App;
