import React from 'react';
import { motion } from 'framer-motion';
import heroImage from '/hero-image.png?url';

function App() {
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
              className="bg-white text-zinc-900 border border-black/15 px-6 py-2.5 rounded-full text-sm font-bold tracking-wide shadow-sm hover:bg-black hover:text-white transition-all"
            >
              Get In Touch
            </a>
          </div>
        </motion.nav>

        {/* Quote Card -- positioned on the right, overlaying the portrait */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute right-8 md:right-16 bottom-24 md:bottom-32 z-20 bg-white text-black p-8 md:p-10 max-w-sm md:max-w-md shadow-2xl border border-black/5"
        >
          <p className="text-base md:text-lg leading-relaxed font-medium mb-6 text-zinc-800">
            Users leave. I design the reasons they stay. Anyone can generate the screens now. I design the decisions behind them, and ship the thing running.
          </p>
          <p className="text-sm font-bold tracking-wide text-zinc-900">— Gaurav Acharya</p>
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
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-black/10 text-zinc-700 flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-sm">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
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
            Software has limits.<br/>I design the physical capabilities that break them.
          </motion.h2>

          {/* Metrics row with soft gradient divider */}
          <div className="relative pt-12">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {[
                { label: 'FOUNDER', value: 'Fynal Technologies' },
                { label: 'CREATOR', value: 'REFLEX OS' },
                { label: 'FOCUS', value: 'Spatial Computing & Haptics' },
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

      {/* ===== SECTION 3: Projects (Seamless Flow) ===== */}
      <section id="projects" className="relative bg-black text-white py-24 md:py-36 px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-xs font-bold tracking-[0.3em] text-white/40 mb-16 uppercase"
          >
            Current Focus
          </motion.p>

          {/* Project rows with soft top gradient line */}
          <div className="relative flex flex-col">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            {[
              { name: 'REFLEX OS', desc: 'Low-latency runtime for spatial computing hardware & haptic feedback', tag: 'RUNTIME', url: '#' },
              { name: 'MAPLEADS', desc: 'B2B lead extractor with 8x parallel email discovery engine', tag: 'MV3 EXTENSION', url: 'https://github.com/anomy77/mapleads-lead-extractor' },
              { name: 'TUBEBRIEF AI', desc: 'Sub-2s video transcript synthesis via Gemini 2.0 Flash', tag: 'LLM PIPELINE', url: 'https://github.com/anomy77/tubebrief-ai' },
              { name: 'MARKCLIP', desc: 'DOM serialization to clean GitHub-flavored Markdown', tag: 'PARSER', url: 'https://github.com/anomy77/markclip-extension' },
            ].map((project, i) => (
              <motion.a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.05 * i }}
                className="group flex flex-col md:flex-row md:items-center justify-between py-10 border-b border-white/10 hover:border-white/30 transition-colors cursor-pointer"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
                  <h3 className="text-3xl md:text-5xl font-black tracking-tight group-hover:text-gray-400 transition-colors">{project.name}</h3>
                  <p className="text-sm text-white/40 font-medium md:max-w-sm">{project.desc}</p>
                </div>
                <div className="flex items-center gap-6 mt-4 md:mt-0">
                  <span className="text-[10px] font-bold tracking-[0.15em] text-white/30 border border-white/10 px-3 py-1">{project.tag}</span>
                  <span className="text-sm font-bold text-white/50 group-hover:text-white transition-colors">&#8599;</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="relative bg-black py-16 px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent mb-12"></div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <p className="text-2xl font-black tracking-tight mb-2">gaurav.</p>
              <a href="mailto:acryagaurav@gmail.com" className="text-white/40 hover:text-white transition-colors text-sm font-mono">acryagaurav@gmail.com</a>
            </div>
            <div className="flex gap-8">
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
