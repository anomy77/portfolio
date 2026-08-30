import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Cpu, Layers, Box } from 'lucide-react';

function App() {
  const { scrollY } = useScroll();
  
  // Parallax effects
  const heroTextY = useTransform(scrollY, [0, 1000], [0, 400]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <div className="bg-background text-foreground font-sans min-h-screen selection:bg-white selection:text-black">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-8 md:px-16 py-6 mix-blend-difference text-white">
        <div className="font-bold tracking-widest text-lg uppercase">
          G.A.
        </div>
        <div className="hidden md:flex items-center gap-12 font-medium tracking-wide uppercase text-sm">
          <a href="#projects" className="hover:opacity-70 transition-opacity">Projects</a>
          <a href="#process" className="hover:opacity-70 transition-opacity">Process</a>
          <a href="mailto:acryagaurav@gmail.com" className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2 font-bold">
            Initialize Contact <ArrowRight size={16} />
          </a>
        </div>
      </nav>

      {/* Section 1: Cinematic Hero */}
      <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-black">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero-image.png" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-40 grayscale contrast-125 mix-blend-luminosity"
          />
          {/* Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] opacity-80"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-90"></div>
        </div>

        {/* Hero Content */}
        <motion.div 
          className="relative z-10 flex flex-col items-center w-full px-4 text-center mt-20"
          style={{ y: heroTextY, opacity: heroOpacity }}
        >
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[12vw] md:text-[14vw] leading-[0.8] font-black tracking-tighter uppercase mb-8"
          >
            Gaurav<br/>Acharya
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-2xl font-medium max-w-4xl tracking-tight text-gray-300"
          >
            Cinematic engineering at the edge of the physical world. Building embodied intelligence, not generic SaaS wrappers.
          </motion.p>
        </motion.div>
      </section>

      {/* Section 2: Value Proposition */}
      <section className="bg-white text-black py-32 md:py-48 px-8 md:px-16 relative z-20">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-7xl font-black tracking-tight leading-[1.1] mb-24 max-w-5xl uppercase"
          >
            Software has limits.<br/>I design the physical capabilities that break them.
          </motion.h2>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-black pt-16">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex flex-col"
            >
              <Box className="w-10 h-10 mb-6" strokeWidth={1.5} />
              <h3 className="text-xl font-bold uppercase tracking-wider mb-2">Founder</h3>
              <p className="text-gray-600 font-medium">Fynal Technologies</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col"
            >
              <Cpu className="w-10 h-10 mb-6" strokeWidth={1.5} />
              <h3 className="text-xl font-bold uppercase tracking-wider mb-2">Creator</h3>
              <p className="text-gray-600 font-medium">REFLEX OS</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col"
            >
              <Layers className="w-10 h-10 mb-6" strokeWidth={1.5} />
              <h3 className="text-xl font-bold uppercase tracking-wider mb-2">Focus</h3>
              <p className="text-gray-600 font-medium">Spatial Computing & Haptics</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3: Project Architecture */}
      <section id="projects" className="bg-black text-white py-32 md:py-48 px-8 md:px-16 relative z-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex items-end justify-between mb-24 border-b border-white/20 pb-8"
          >
            <h2 className="text-2xl md:text-4xl font-bold tracking-widest uppercase">Current Focus</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* REFLEX OS Card */}
            <motion.a 
              href="#"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="group relative block aspect-square md:aspect-[4/3] bg-[#0a0a0a] border border-white/10 overflow-hidden"
            >
              {/* Hover schematic overlay */}
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 p-8">
                <pre className="text-[10px] md:text-xs text-green-500 font-mono opacity-80 whitespace-pre-wrap">
{`struct ReflexRuntime {
  haptic_engine: HardwareInterface,
  spatial_map: PointCloud3D,
  latency: ms_target(1.2)
}

fn initialize_kinematics() -> Result<(), Error> {
  // Syncing with physical actuators
  System::override_limits(true);
  Ok(())
}`}
                </pre>
              </div>

              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between z-0 transition-transform duration-700 group-hover:scale-105">
                <div className="flex justify-between items-start">
                  <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight">REFLEX OS</h3>
                  <ArrowRight className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-4 group-hover:translate-x-0" />
                </div>
                <div>
                  <p className="text-gray-400 font-medium text-lg uppercase tracking-widest mb-2">Runtime Layer</p>
                  <p className="text-sm text-gray-500 max-w-sm">A low-latency operating system designed specifically for bridging spatial computing hardware with high-fidelity haptic feedback mechanisms.</p>
                </div>
              </div>
            </motion.a>

            {/* Fynal Technologies Card */}
            <motion.a 
              href="#"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="group relative block aspect-square md:aspect-[4/3] bg-[#0a0a0a] border border-white/10 overflow-hidden"
            >
              {/* Hover schematic overlay */}
              <div className="absolute inset-0 bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 p-8">
                 <div className="w-full h-full border border-black/20 flex flex-col items-center justify-center">
                    <div className="w-32 h-32 border-2 border-black rounded-full mb-8 relative animate-[spin_10s_linear_infinite]">
                      <div className="absolute top-0 left-1/2 w-2 h-2 bg-black transform -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
                    </div>
                    <p className="font-mono text-sm font-bold uppercase tracking-widest">Actuator Alignment</p>
                 </div>
              </div>

              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between z-0 transition-transform duration-700 group-hover:scale-105">
                <div className="flex justify-between items-start">
                  <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight">Fynal Tech</h3>
                  <ArrowRight className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-4 group-hover:translate-x-0" />
                </div>
                <div>
                  <p className="text-gray-400 font-medium text-lg uppercase tracking-widest mb-2">Hardware Lab</p>
                  <p className="text-sm text-gray-500 max-w-sm">Designing and manufacturing the next generation of wearable intelligence. Focusing on extreme durability and tactile integration.</p>
                </div>
              </div>
            </motion.a>
            
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-black text-white border-t border-white/10 py-16 px-8 md:px-16 text-center">
        <p className="text-gray-600 text-sm font-mono uppercase tracking-widest">&copy; {new Date().getFullYear()} Gaurav Acharya. Engineered in Kathmandu.</p>
      </footer>
    </div>
  );
}

export default App;
