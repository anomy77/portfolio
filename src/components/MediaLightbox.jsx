import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function MediaLightbox({ project, onClose, fynalTab, setFynalTab }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [ambientMode, setAmbientMode] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  // Real-time Ambient Mode for Lightbox
  useEffect(() => {
    if (project.type !== 'video' || !ambientMode) return;

    let animId;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: false });

    const renderAmbientGlow = () => {
      if (video && !video.paused && !video.ended && video.readyState >= 2) {
        try {
          ctx.drawImage(video, 0, 0, 32, 18);
        } catch (e) {
          // Ignore transient cross-origin frame capture errors
        }
      }
      animId = requestAnimationFrame(renderAmbientGlow);
    };

    animId = requestAnimationFrame(renderAmbientGlow);
    return () => cancelAnimationFrame(animId);
  }, [project.type, ambientMode]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying]);

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration || 1;
      setProgress((current / total) * 100);
      setCurrentTime(formatTime(current));
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(formatTime(videoRef.current.duration));
      videoRef.current.playbackRate = playbackSpeed;
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const toggleAmbient = (e) => {
    e?.stopPropagation();
    setAmbientMode(!ambientMode);
  };

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const handleSeek = (e) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * videoRef.current.duration;
    videoRef.current.currentTime = newTime;
  };

  const skipSeconds = (sec) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, Math.min(videoRef.current.duration, videoRef.current.currentTime + sec));
    }
  };

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 md:p-8"
        onClick={onClose}
      >
        {/* Top Header Bar */}
        <div 
          className="flex justify-between items-center z-20 pb-4 border-b border-white/10"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-4">
            <h3 className="text-xl md:text-2xl font-black tracking-tight text-white">{project.name}</h3>
            <span className="text-[10px] font-mono tracking-widest text-zinc-400 border border-white/15 px-2.5 py-0.5 uppercase">
              {project.tag}
            </span>

            {project.type === 'video' && (
              <button
                type="button"
                onClick={toggleAmbient}
                className={`px-3 py-1 text-[10px] font-mono tracking-widest border uppercase transition-colors ${
                  ambientMode 
                    ? 'bg-amber-500/20 border-amber-500/40 text-amber-300' 
                    : 'bg-white/5 border-white/15 text-zinc-400 hover:text-white'
                }`}
              >
                AMBIENT GLOW: {ambientMode ? 'ON' : 'OFF'}
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[10px] font-mono text-zinc-500 hidden md:inline-block">PRESS ESC OR SPACE</span>
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-mono tracking-widest text-zinc-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 uppercase"
            >
              Close [ESC]
            </button>
          </div>
        </div>

        {/* Center Media Viewport */}
        <div 
          className="relative flex-1 flex items-center justify-center my-4 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {project.type === 'video' ? (
            <div className="relative w-full max-w-5xl aspect-video bg-zinc-950 border border-white/15 shadow-2xl overflow-visible flex items-center justify-center">
              
              {/* YouTube Ambient Glow Canvas */}
              {ambientMode && (
                <canvas
                  ref={canvasRef}
                  width={32}
                  height={18}
                  className="absolute inset-[-12%] w-[124%] h-[124%] -z-10 blur-3xl opacity-40 saturate-125 pointer-events-none transition-opacity duration-700"
                />
              )}

              <video
                ref={videoRef}
                src={project.videoUrl}
                playsInline
                autoPlay
                muted={isMuted}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onClick={togglePlay}
                className="relative z-10 w-full h-full object-contain cursor-pointer"
              />

              {/* Bottom Custom Controller Overlay in Modal */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-4 z-20">
                {/* Scrubbing bar */}
                <div 
                  className="relative w-full h-1.5 bg-white/20 hover:h-2.5 transition-all cursor-pointer mb-4 rounded-full overflow-hidden"
                  onClick={handleSeek}
                >
                  <div 
                    className="h-full bg-white transition-all duration-75"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="flex flex-wrap justify-between items-center gap-4 text-xs font-mono text-zinc-300">
                  {/* Left Controls: Play, Skip, Mute */}
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={togglePlay}
                      className="bg-white text-black px-4 py-1.5 font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors"
                    >
                      {isPlaying ? 'PAUSE' : 'PLAY'}
                    </button>
                    <button
                      type="button"
                      onClick={() => skipSeconds(-5)}
                      className="hover:text-white transition-colors"
                    >
                      -5s
                    </button>
                    <button
                      type="button"
                      onClick={() => skipSeconds(5)}
                      className="hover:text-white transition-colors"
                    >
                      +5s
                    </button>
                    <button
                      type="button"
                      onClick={toggleMute}
                      className="hover:text-white transition-colors flex items-center gap-1.5 ml-2"
                    >
                      {isMuted ? 'UNMUTE [AUDIO OFF]' : 'MUTE [AUDIO ON]'}
                    </button>
                  </div>

                  {/* Right Controls: Speed & Timecode */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 bg-white/5 border border-white/10 p-0.5">
                      {[1, 1.5, 2].map((spd) => (
                        <button
                          key={spd}
                          type="button"
                          onClick={() => handleSpeedChange(spd)}
                          className={`px-2 py-0.5 text-[10px] font-mono transition-colors ${
                            playbackSpeed === spd ? 'bg-white text-black font-bold' : 'text-zinc-400 hover:text-white'
                          }`}
                        >
                          {spd}x
                        </button>
                      ))}
                    </div>

                    <div className="text-zinc-400">
                      <span>{currentTime}</span>
                      <span className="text-zinc-600"> / </span>
                      <span>{duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative w-full max-w-5xl h-full flex flex-col items-center justify-center">
              <div className="relative w-full h-[70vh] bg-zinc-950 border border-white/15 p-2 flex items-center justify-center shadow-2xl">
                <img
                  src={fynalTab === 0 ? project.media : project.extraMedia}
                  alt={fynalTab === 0 ? "Fynal Platform Overview" : "Fynal Studio IDE"}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Tab Switcher in Lightbox */}
              <div className="flex gap-2 bg-black/90 p-1 border border-white/15 mt-4">
                <button
                  type="button"
                  onClick={() => setFynalTab(0)}
                  className={`px-4 py-1.5 text-xs font-bold tracking-wider uppercase transition-colors ${
                    fynalTab === 0 ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  01 Platform Landing View
                </button>
                <button
                  type="button"
                  onClick={() => setFynalTab(1)}
                  className={`px-4 py-1.5 text-xs font-bold tracking-wider uppercase transition-colors ${
                    fynalTab === 1 ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  02 Studio IDE & Code View
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Details Footer in Lightbox */}
        <div 
          className="pt-4 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 z-20"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-white/50 mb-1">{project.subtitle}</p>
            <p className="text-xs text-zinc-400 leading-relaxed">{project.desc}</p>
          </div>

          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-black px-6 py-2.5 text-xs font-bold tracking-widest uppercase hover:bg-zinc-200 transition-colors shrink-0"
          >
            <span>{project.type === 'image' ? 'Visit fynal.net' : 'View GitHub Repo'}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
