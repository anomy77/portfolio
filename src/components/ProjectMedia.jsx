import React, { useState, useRef, useEffect } from 'react';

export function ProjectMedia({ project, fynalTab, setFynalTab, onOpenLightbox }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [ambientMode, setAmbientMode] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [isHovered, setIsHovered] = useState(false);

  // Real-time Canvas Ambient Glow Renderer
  useEffect(() => {
    if (project.type !== 'video' || !ambientMode) return;

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
  }, [project.type, ambientMode]);

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

      // Also ensure canvas draws on timeupdate
      if (ambientMode && canvasRef.current && videoRef.current) {
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

  const toggleAmbient = (e) => {
    e?.stopPropagation();
    setAmbientMode(!ambientMode);
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

  if (project.type === 'image') {
    return (
      <div 
        className="relative w-full aspect-video bg-zinc-950 flex flex-col justify-center items-center overflow-hidden cursor-pointer group/img"
        onClick={() => onOpenLightbox(project)}
      >
        <img
          src={fynalTab === 0 ? project.media : project.extraMedia}
          alt={fynalTab === 0 ? "Fynal Platform Overview" : "Fynal Studio IDE"}
          className="w-full h-full object-contain object-center transition-transform duration-500 group-hover/img:scale-[1.01]"
        />

        {/* Top Left Tag */}
        <div className="absolute top-4 left-4 z-20 pointer-events-none">
          <div className="bg-black/80 backdrop-blur-md px-2.5 py-1 border border-white/10 text-[9px] font-mono tracking-widest text-white/70 uppercase flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            <span>PLATFORM SHOWCASE</span>
          </div>
        </div>

        {/* Interactive View Switcher Tabs */}
        <div 
          className="absolute bottom-4 left-4 z-20 flex gap-1 bg-black/80 backdrop-blur-md p-1 border border-white/10"
          onClick={(e) => e.stopPropagation()}
        >
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

        {/* Tag badge */}
        <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1 text-[10px] font-bold tracking-[0.2em] text-white/70 border border-white/10 uppercase">
          {project.tag}
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full aspect-video bg-zinc-950 group/vid cursor-pointer p-2 md:p-4 flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onOpenLightbox(project)}
    >
      {/* YouTube-Style Ambient Glow Canvas that radiates around the video */}
      {ambientMode && (
        <canvas
          ref={canvasRef}
          width={32}
          height={18}
          className="absolute inset-[-10%] w-[120%] h-[120%] z-0 blur-3xl opacity-85 saturate-200 pointer-events-none transition-opacity duration-700"
        />
      )}

      {/* Video Container Box */}
      <div className="relative z-10 w-full h-full overflow-hidden bg-black border border-white/10 shadow-2xl flex items-center justify-center">
        <video
          ref={videoRef}
          src={project.videoUrl}
          poster={project.poster}
          playsInline
          muted={isMuted}
          autoPlay
          loop
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          className="w-full h-full object-cover object-center"
        />

        {/* Top Bar Indicators inside player */}
        <div className="absolute top-3 inset-x-3 flex justify-between items-center z-20 pointer-events-none">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-black/80 backdrop-blur-md px-2.5 py-1 border border-white/15">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[9px] font-mono tracking-widest text-white/70 uppercase">LIVE CAPTURE</span>
            </div>

            {/* Ambient Mode Badge Toggle */}
            <button
              type="button"
              onClick={toggleAmbient}
              className={`pointer-events-auto backdrop-blur-md px-2.5 py-1 text-[9px] font-mono tracking-widest border uppercase transition-colors ${
                ambientMode 
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 font-bold' 
                  : 'bg-black/80 border-white/15 text-zinc-400 hover:text-white'
              }`}
            >
              AMBIENT: {ambientMode ? 'ON' : 'OFF'}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenLightbox(project);
              }}
              className="pointer-events-auto bg-black/80 hover:bg-white hover:text-black transition-colors backdrop-blur-md px-3 py-1 text-[10px] font-bold tracking-widest text-white border border-white/20 uppercase flex items-center gap-1.5"
            >
              <span>EXPAND</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 3h6m0 0v6m0-6L14 10M9 21H3m0 0v-6m0 6l7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Center Play/Pause Overlay Cue on Hover */}
        <div className={`absolute inset-0 z-20 transition-opacity duration-200 flex items-center justify-center pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button
            type="button"
            onClick={togglePlay}
            className="pointer-events-auto w-12 h-12 rounded-full bg-black/80 hover:bg-white text-white hover:text-black border border-white/20 flex items-center justify-center shadow-2xl transition-all hover:scale-105"
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
        </div>

        {/* Bottom Controls Bar */}
        <div className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-3 transition-opacity duration-200 z-20 ${isHovered ? 'opacity-100' : 'opacity-85'}`}>
          {/* Progress Scrubber */}
          <div 
            className="relative w-full h-1 bg-white/20 hover:h-2 transition-all cursor-pointer mb-2.5 rounded-full overflow-hidden"
            onClick={handleSeek}
          >
            <div 
              className="h-full bg-white transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-[11px] font-mono text-zinc-300">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={togglePlay}
                className="hover:text-white transition-colors"
              >
                {isPlaying ? 'PAUSE' : 'PLAY'}
              </button>
              <button
                type="button"
                onClick={toggleMute}
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                {isMuted ? (
                  <>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                    <span>UNMUTE</span>
                  </>
                ) : (
                  <>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                    <span>MUTE</span>
                  </>
                )}
              </button>
            </div>

            <div>
              <span>{currentTime}</span>
              <span className="text-zinc-600"> / </span>
              <span>{duration}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
