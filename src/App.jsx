import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import heroImage from '/hero-image.png?url';
import heroCutout from '/hero-cutout.png?url';
import sunglassesImg from '/sunglasses.png?url';
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
import { Orbiting3DScene } from './components/Orbiting3DScene';
import { SystemsManifesto } from './components/SystemsManifesto';

function App() {
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 350]);

  const [isPortraitHovered, setIsPortraitHovered] = useState(false);
  const [isGlassesLocked, setIsGlassesLocked] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [fynalTab, setFynalTab] = useState(0);
  const [selectedLightboxProject, setSelectedLightboxProject] = useState(null);

  const isWearingGlasses = isPortraitHovered || isGlassesLocked;

  const toggleGlassesLock = (e) => {
    // Only toggle if not clicking on nav links or social icons
    if (e.target.closest('nav') || e.target.closest('a') || e.target.closest('button')) return;
    setIsGlassesLocked(prev => !prev);
  };

  const handleHeroMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

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
    <div className="bg-[#09090B] text-[#E4E4E7] font-sans min-h-screen selection:bg-white selection:text-black">

      {/* ===== SECTION 1: Full-Bleed Portrait Hero with True Z-Axis Depth ===== */}
      <section 
        ref={heroRef}
        onClick={toggleGlassesLock}
        onMouseEnter={() => setIsPortraitHovered(true)}
        onMouseLeave={() => setIsPortraitHovered(false)}
        onMouseMove={handleHeroMouseMove}
        className="relative h-screen w-full overflow-hidden bg-white [mask-image:linear-gradient(to_bottom,black_70%,rgba(0,0,0,0.6)_85%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_70%,rgba(0,0,0,0.6)_85%,transparent_100%)] flex items-center justify-center cursor-pointer"
      >

        {/* 3D Orbiting Objects (Z-8 Back / Z-26 Front) */}
        <Orbiting3DScene mousePos={mousePos} />

        {/* Massive Background Parallax Typography (Z-5) -- Zero Elevation on Hover */}
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0 z-5 flex items-center justify-center select-none pointer-events-none overflow-hidden"
        >
          <span 
            className="text-[25vw] font-bold tracking-[-0.04em] leading-none uppercase whitespace-nowrap select-none text-[#E4E4E7]"
            style={{
              fontFamily: "'Playfair Display', 'Newsreader', serif",
              WebkitTextStroke: '2px rgba(212, 212, 216, 0.9)',
              letterSpacing: '-0.04em'
            }}
          >
            SOLVE IT
          </span>
        </motion.div>

        {/* Constant #FFFFFF Perimeter Fade (Z-9) -- Gradual atmospheric aura radiating around portrait perimeter */}
        <div className="absolute inset-0 z-9 pointer-events-none flex items-center justify-center overflow-hidden">
          {/* Layer 1: Tight perimeter halo */}
          <img
            src={heroCutout}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center absolute inset-0"
            style={{
              objectPosition: '50% 15%',
              filter: 'brightness(0) invert(1) blur(10px)',
              opacity: 0.95
            }}
          />
          {/* Layer 2: Medium radius expansion */}
          <img
            src={heroCutout}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center absolute inset-0"
            style={{
              objectPosition: '50% 15%',
              filter: 'brightness(0) invert(1) blur(28px)',
              opacity: 0.8
            }}
          />
          {/* Layer 3: Wide ambient fade */}
          <img
            src={heroCutout}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center absolute inset-0"
            style={{
              objectPosition: '50% 15%',
              filter: 'brightness(0) invert(1) blur(60px)',
              opacity: 0.55
            }}
          />
          {/* Layer 4: Deep atmospheric falloff */}
          <img
            src={heroCutout}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center absolute inset-0"
            style={{
              objectPosition: '50% 15%',
              filter: 'brightness(0) invert(1) blur(110px)',
              opacity: 0.35
            }}
          />
        </div>

        {/* Portrait Cutout (Z-10) -- 100% Solid & Sharp (Zero Milky Fog) */}
        <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
          <img
            src={heroCutout}
            alt="Gaurav Acharya"
            className="w-full h-full object-cover object-center grayscale contrast-105"
            style={{ objectPosition: '50% 15%' }}
          />
        </div>

        {/* Foreground Laser Stencil Torch (Z-12) -- Projected cleanly over hair/face without fading photo */}
        {isPortraitHovered && (
          <motion.div
            style={{ 
              y: backgroundY,
              WebkitMaskImage: `radial-gradient(circle 220px at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 45%, rgba(0,0,0,0) 80%)`,
              maskImage: `radial-gradient(circle 220px at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 45%, rgba(0,0,0,0) 80%)`
            }}
            className="absolute inset-0 z-12 flex items-center justify-center select-none pointer-events-none overflow-hidden"
          >
            <span 
              className="text-[25vw] font-bold tracking-[-0.04em] leading-none uppercase whitespace-nowrap select-none text-transparent"
              style={{
                fontFamily: "'Playfair Display', 'Newsreader', serif",
                WebkitTextStroke: '1.5px #FFFFFF',
                letterSpacing: '-0.04em',
                filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.85)) drop-shadow(0 0 1px rgba(0,0,0,0.9))'
              }}
            >
              SOLVE IT
            </span>
          </motion.div>
        )}

        {/* 8-Bit Pixel Sunglasses (Z-25) -- High-Intensity Cursor Torch Reveal */}
        {(isPortraitHovered || isGlassesLocked) && (
          <div
            className="absolute inset-0 z-25 pointer-events-none select-none overflow-hidden"
            style={{
              WebkitMaskImage: isGlassesLocked
                ? 'none'
                : `radial-gradient(circle 360px at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 65%, rgba(0,0,0,0.6) 85%, rgba(0,0,0,0) 100%)`,
              maskImage: isGlassesLocked
                ? 'none'
                : `radial-gradient(circle 360px at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 65%, rgba(0,0,0,0.6) 85%, rgba(0,0,0,0) 100%)`
            }}
          >
            <div
              className="absolute left-[49.4%] top-[50.2%] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_10px_20px_rgba(0,0,0,0.85)]"
              style={{
                width: 'clamp(260px, 26vw, 380px)'
              }}
            >
              <img
                src={sunglassesImg}
                alt="Pixel Sunglasses"
                className="w-full h-auto"
                style={{ imageRendering: 'pixelated' }}
              />
            </div>
          </div>
        )}

        {/* Smooth bottom blend overlay (Z-15) */}
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#09090B] via-[#09090B]/70 to-transparent z-15 pointer-events-none"></div>

        {/* Navigation (Z-30) */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute top-0 inset-x-0 z-30 flex justify-between items-center px-8 md:px-12 py-6"
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

      {/* ===== SECTION 2: Systems Manifesto & Interactive Tactile Architecture ===== */}
      <SystemsManifesto />

      {/* ===== SECTION 3: Flagship Platform Spotlight (Fynal.net) ===== */}
      <section id="flagship" className="relative bg-[#09090B] text-[#E4E4E7] py-24 md:py-32 px-8 md:px-16 border-t border-[#27272A]/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 font-mono text-[11px] text-[#A1A1AA] tracking-[0.25em] uppercase mb-10"
          >
            <span className="text-[#71717A]">02 //</span>
            <span>FLAGSHIP INFRASTRUCTURE</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
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
                  <h3 className="text-2xl md:text-4xl font-extrabold tracking-[-0.035em] mb-2 text-[#E4E4E7]">
                    {flagshipProject.name}
                  </h3>
                  <p className="text-sm font-mono text-[#A1A1AA] mb-3">{flagshipProject.subtitle}</p>
                  <p className="text-base text-[#A1A1AA] max-w-3xl leading-relaxed">{flagshipProject.desc}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => setSelectedLightboxProject(flagshipProject)}
                    className="inline-flex items-center gap-2 bg-[#27272A]/60 hover:bg-[#27272A] text-[#E4E4E7] border border-[#3F3F46] px-5 py-2.5 text-xs font-mono tracking-wider uppercase transition-colors"
                  >
                    <span>Inspect</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 3h6m0 0v6m0-6L14 10M9 21H3m0 0v-6m0 6l7-7" />
                    </svg>
                  </button>

                  <a
                    href={flagshipProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#E4E4E7] text-[#09090B] px-5 py-2.5 text-xs font-mono font-bold tracking-wider uppercase hover:bg-white transition-colors"
                  >
                    <span>fynal.net</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Metrics Pills */}
              <div className="flex flex-wrap gap-2.5">
                {flagshipProject.metrics.map((m) => (
                  <span key={m} className="text-xs font-mono text-[#A1A1AA] bg-white/[0.02] border border-[#27272A] px-3 py-1">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== SECTION 4: Browser Engines & Extensions ===== */}
      <section id="projects" className="relative bg-[#09090B] text-[#E4E4E7] py-24 md:py-32 px-8 md:px-16 border-t border-[#27272A]/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 font-mono text-[11px] text-[#A1A1AA] tracking-[0.25em] uppercase mb-16"
          >
            <span className="text-[#71717A]">03 //</span>
            <span>SYSTEMS DEMONSTRATIONS & EXTENSIONS</span>
          </motion.div>

          <div className="flex flex-col gap-28">
            {extensionProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
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
                      <h4 className="text-2xl md:text-3xl font-extrabold tracking-[-0.035em] mb-2 text-[#E4E4E7]">
                        {project.name}
                      </h4>
                      <p className="text-sm font-mono text-[#A1A1AA] mb-3">{project.subtitle}</p>
                      <p className="text-base text-[#A1A1AA] max-w-3xl leading-relaxed">{project.desc}</p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        type="button"
                        onClick={() => setSelectedLightboxProject(project)}
                        className="inline-flex items-center gap-2 bg-[#27272A]/60 hover:bg-[#27272A] text-[#E4E4E7] border border-[#3F3F46] px-5 py-2.5 text-xs font-mono tracking-wider uppercase transition-colors"
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
                        className="inline-flex items-center gap-2 bg-[#E4E4E7] text-[#09090B] px-5 py-2.5 text-xs font-mono font-bold tracking-wider uppercase hover:bg-white transition-colors"
                      >
                        <span>Source</span>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* Metrics Pills */}
                  <div className="flex flex-wrap gap-2.5">
                    {project.metrics.map((m) => (
                      <span key={m} className="text-xs font-mono text-[#A1A1AA] bg-white/[0.02] border border-[#27272A] px-3 py-1">
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
      <footer className="relative bg-[#09090B] py-16 px-8 md:px-16 border-t border-[#27272A]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <p className="text-2xl font-extrabold tracking-tight mb-2 text-[#E4E4E7]">gaurav.</p>
              <p className="text-xs font-mono text-[#71717A] mb-1">Founder, Fynal Technologies</p>
              <a href="mailto:acryagaurav@gmail.com" className="text-[#A1A1AA] hover:text-[#E4E4E7] transition-colors text-sm font-mono">acryagaurav@gmail.com</a>
            </div>
            <div className="flex gap-8">
              <a href="https://fynal.net" target="_blank" rel="noopener noreferrer" className="text-[#A1A1AA] hover:text-[#E4E4E7] transition-colors text-xs font-mono tracking-widest uppercase">FYNAL.NET</a>
              <a href="https://github.com/anomy77" target="_blank" rel="noopener noreferrer" className="text-[#A1A1AA] hover:text-[#E4E4E7] transition-colors text-xs font-mono tracking-widest uppercase">GITHUB</a>
              <a href="Gaurav_Acharya_Resume.pdf" target="_blank" className="text-[#A1A1AA] hover:text-[#E4E4E7] transition-colors text-xs font-mono tracking-widest uppercase">RESUME</a>
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
