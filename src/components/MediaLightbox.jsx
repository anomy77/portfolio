import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function MediaLightbox({ project, onClose, fynalTab, setFynalTab }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [isHovered, setIsHovered] = useState(false);

  // Real-time Canvas Ambient Glow for Lightbox
  useEffect(() => {
    if (project.type !== 'video') return;

    let animId;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const ctx = canvas.getContext('2d', { alpha: false });

    const renderAmbientGlow = () => {
      if (video && !video.paused && !video.ended) {
        try {
          ctx.drawImage(video, 0, 0, 32, 18);
        } catch (e) {
          // ignore
        }
      }
      animId = requestAnimationFrame(renderAmbientGlow);
    };

    animId = requestAnimationFrame(renderAmbientGlow);
    return () => cancelAnimationFrame(animId);
  }, [project.type]);

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

      if (canvasRef.current && videoRef.current) {
        try {
          const ctx = canvasRef.current.getContext('2d', { alpha: false });
          ctx.drawImage(videoRef.current, 0, 0, 32, 18);
        } catch (e) {}
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(formatTime(videoRef.current.duration));
    }
  };

  const togglePlay = (e) => {
    e?.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = (e) => {
    e?.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleSeek = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * videoRef.current.duration;
    videoRef.current.currentTime = newTime;
  };

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-3xl flex items-center justify-center p-4 md:p-12 cursor-pointer"
        onClick={onClose}
      >
        {/* Minimal Floating Close Button (SVG Only) */}
        <button
          type="button"
          onClick={onClose}
          title="Close (ESC)"
          className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-all border border-white/20 flex items-center justify-center shadow-2xl"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Center Floating Viewport */}
        <div 
          className="relative w-full max-w-6xl aspect-video cursor-default flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {project.type === 'video' ? (
            <div className="relative w-full h-full flex items-center justify-center">
              
              {/* Soft Ambient Glow */}
              <canvas
                ref={canvasRef}
                width={32}
                height={18}
                className="absolute inset-[-8%] w-[116%] h-[116%] z-0 blur-3xl opacity-45 saturate-125 pointer-events-none transition-opacity duration-700"
              />

              {/* Floating Screen */}
              <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden bg-black border border-white/15 shadow-2xl flex items-center justify-center">
                <video
                  ref={videoRef}
                  src={project.videoUrl}
                  playsInline
                  autoPlay
                  muted={isMuted}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onClick={togglePlay}
                  className="w-full h-full object-cover cursor-pointer"
                />

                {/* Minimalist Floating Controls on Hover */}
                <div className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-5 transition-opacity duration-300 z-20 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                  {/* Progress Line */}
                  <div 
                    className="relative w-full h-1 bg-white/20 hover:h-2 transition-all cursor-pointer mb-3 rounded-full overflow-hidden"
                    onClick={handleSeek}
                  >
                    <div 
                      className="h-full bg-white transition-all duration-75"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  {/* Icon Only Controls */}
                  <div className="flex justify-between items-center text-xs font-mono text-zinc-300">
                    <div className="flex items-center gap-4">
                      {/* Play/Pause Icon */}
                      <button
                        type="button"
                        onClick={togglePlay}
                        className="text-white hover:text-zinc-300 transition-colors"
                        title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
                      >
                        {isPlaying ? (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        )}
                      </button>

                      {/* Mute/Unmute Icon */}
                      <button
                        type="button"
                        onClick={toggleMute}
                        className="text-white hover:text-zinc-300 transition-colors"
                        title={isMuted ? 'Unmute' : 'Mute'}
                      >
                        {isMuted ? (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                          </svg>
                        )}
                      </button>

                      {/* Time Counter */}
                      <span className="text-[11px] text-zinc-400 font-mono">
                        {currentTime} <span className="text-zinc-600">/</span> {duration}
                      </span>
                    </div>

                    {/* Minimal Outbound Link (SVG Only) */}
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Open Source"
                      className="text-white hover:text-zinc-300 transition-colors flex items-center gap-1.5 text-xs font-mono tracking-wider"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative w-full h-full flex flex-col items-center justify-center">
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black border border-white/15 shadow-2xl p-2 flex items-center justify-center">
                <img
                  src={fynalTab === 0 ? project.media : project.extraMedia}
                  alt={fynalTab === 0 ? "Fynal Overview" : "Fynal Studio IDE"}
                  className="w-full h-full object-contain"
                />

                {/* Minimal Tab Switcher inside Image Lightbox */}
                <div className="absolute bottom-4 left-4 z-20 flex gap-1 bg-black/80 backdrop-blur-md p-1 border border-white/15">
                  <button
                    type="button"
                    onClick={() => setFynalTab(0)}
                    className={`px-3 py-1 text-[10px] font-bold tracking-wider uppercase transition-colors ${
                      fynalTab === 0 ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    01
                  </button>
                  <button
                    type="button"
                    onClick={() => setFynalTab(1)}
                    className={`px-3 py-1 text-[10px] font-bold tracking-wider uppercase transition-colors ${
                      fynalTab === 1 ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    02
                  </button>
                </div>

                {/* Minimal Outbound Link (SVG Only) */}
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Visit Website"
                  className="absolute bottom-4 right-4 z-20 w-8 h-8 rounded-full bg-black/80 hover:bg-white text-white hover:text-black transition-all border border-white/20 flex items-center justify-center shadow-lg"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
