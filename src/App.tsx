"use client";

import { useState, useEffect, useRef } from "react";
import { useDesktopState } from "./usedesktop";
import { AnimatePresence, motion } from "framer-motion";
import FolderIcon from "./FolderIcon";
import Window from "./window";
import About from "./About";
import Experience from "./Experience";
import CaseStudies from "./CaseStudies";
import Skills from "./skills";
import Resume from "./Resume";
import Contact from "./Contact";

const APPS_LIST = [
  { id: "about", label: "À Propos", icon: "👤" },
  { id: "experience", label: "Expérience", icon: "💼" },
  { id: "cases", label: "Études de cas", icon: "📊" },
  { id: "skills", label: "Compétences", icon: "🛠️" },
  { id: "resume", label: "CV", icon: "📄" },
  { id: "contact", label: "Contact", icon: "📬" },
];

export default function Desktop() {
  const ds = useDesktopState();
  const hasOpenWindow = ds.openApps.length > 0;
  const currentActiveApp = ds.openApps[ds.openApps.length - 1];

  const [currentTime, setCurrentTime] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  
  // --- ÉTATS DE CHARGEMENT & INTERACTION ---
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  // --- GESTION DE LA MUSIQUE LOFI ---
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // --- REFERENCES POUR LA GESTION DU DECOUPLAGE DU MENU ---
  const startMenuRef = useRef<HTMLDivElement>(null);
  const startButtonRef = useRef<HTMLButtonElement>(null);

  // 1. Initialisation de l'audio au montage
  useEffect(() => {
    const audio = new Audio("/mondamusic-lofi-lofi-chill-lofi-girl-491690.mp3");
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;

    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  // 2. Gestion de la barre de progression (seulement après le clic d'entrée)
  useEffect(() => {
    if (!hasInteracted) return;

    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500); // Petit délai pour le style
          return 100;
        }
        return prev + 4; // Vitesse du chargement
      });
    }, 100);

    return () => clearInterval(interval);
  }, [hasInteracted]);

  // Fonction déclenchée quand on clique sur "Entrer"
  const handleStartExperience = () => {
    setHasInteracted(true);
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsMuted(false))
        .catch((err) => console.log("Audio bloqué :", err));
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.play();
      setIsMuted(false);
    } else {
      audioRef.current.pause();
      setIsMuted(true);
    }
  };

  // Horloge numérique
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      );
    };
    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Fermeture du menu démarrer au clic extérieur (en excluant le bouton Start)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        startMenuRef.current && 
        !startMenuRef.current.contains(target) &&
        startButtonRef.current && 
        !startButtonRef.current.contains(target)
      ) {
        setIsStartMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    const matchedApp = APPS_LIST.find(app => app.label.toLowerCase() === value.trim().toLowerCase());
    if (matchedApp) {
      ds.open(matchedApp.id as any);
      setSearchQuery("");
    }
  };

  // Variantes d'animation pour l'apparition en cascade (Stagger effect)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 }
    }
  };

  return (
    <motion.main 
      animate={{
        background: [
          "linear-gradient(to bottom, #2e1065, #6366f1, #f472b6)",
          "linear-gradient(to bottom, #1e1b4b, #4f46e5, #ec4899)",
          "linear-gradient(to bottom, #3b0764, #4338ca, #d946ef)",
          "linear-gradient(to bottom, #2e1065, #6366f1, #f472b6)"
        ]
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }}
      className="relative min-h-dvh w-full overflow-hidden p-4 md:p-8 flex items-center justify-center"
    >
      
      {/* ================= ÉCRAN DE CHARGEMENT INTÉGRAL (LOADING) ================= */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 bg-[#1e1b4b] z-[100] flex flex-col items-center justify-center p-6 font-mono select-none"
          >
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="w-full max-w-md bg-white border-4 border-slate-900 rounded-2xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center"
            >
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-wider mb-2">Sara-Folio</h2>
              <p className="text-xs font-bold text-slate-500 mb-6">Chargement de mon univers PM / PO</p>

              {!hasInteracted ? (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleStartExperience}
                  className="w-full py-4 bg-pink-500 hover:bg-pink-600 text-white font-black uppercase text-sm rounded-xl border-4 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all cursor-pointer"
                >
                  Entrer
                </motion.button>
              ) : (
                <div className="w-full">
                  <div className="w-full h-8 bg-slate-100 border-4 border-slate-900 rounded-xl p-1 overflow-hidden relative">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-sm"
                      style={{ width: `${loadingProgress}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-3 text-xs font-bold text-slate-700">
                    <span>{loadingProgress < 100 ? "Loading_Assets..." : "Ready !"}</span>
                    <span>{loadingProgress}%</span>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= BACKGROUND GRAPHICS LAYER ================= */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        {/* Animated Background Orbs */}
        <motion.div 
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -60, 30, 0],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-pink-300/15 blur-3xl" 
        />
        <motion.div 
          animate={{
            x: [0, -30, 30, 0],
            y: [0, 40, -40, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[20%] left-[20%] w-[400px] h-[400px] rounded-full bg-indigo-400/10 blur-3xl" 
        />

        {/* Ambient Moving Stars */}
        <div className="absolute inset-0 top-0 h-[60vh]">
          <motion.div animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.1, 0.9] }} transition={{ duration: 3, repeat: Infinity }} className="absolute top-[8%] left-[12%] text-white text-xl font-serif">✦</motion.div>
          <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }} className="absolute top-[6%] left-[28%] text-pink-100/80 text-sm">✦</motion.div>
          <motion.div animate={{ opacity: [0.2, 0.9, 0.2] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }} className="absolute top-[14%] left-[40%] text-white/90 text-lg">✦</motion.div>
          <motion.div animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-[11%] left-[72%] text-white text-2xl font-serif">✦</motion.div>
        </div>

        {/* Retro Mountains Layer */}
        {!isLoading && (
          <motion.div 
            initial={{ y: 200, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute bottom-0 left-0 right-0 h-[45vh] bg-[#4f46e5]/15" style={{ clipPath: 'polygon(0 60%, 15% 45%, 35% 65%, 55% 35%, 75% 55%, 90% 40%, 100% 55%, 100% 100%, 0 100%)' }} />
            <div className="absolute bottom-0 left-0 right-0 h-[35vh] bg-[#4338ca]/20 backdrop-blur-[0.5px]" style={{ clipPath: 'polygon(0 70%, 25% 40%, 45% 65%, 65% 45%, 85% 70%, 100% 50%, 100% 100%, 0 100%)' }} />
            <div className="absolute bottom-0 left-0 right-0 h-[22vh] bg-[#312e81]/40" style={{ clipPath: 'polygon(0 80%, 15% 60%, 35% 75%, 50% 55%, 70% 75%, 90% 60%, 100% 75%, 100% 100%, 0 100%)' }} />
          </motion.div>
        )}
      </div>

      {/* ================= MASTER WORKSPACE LAYER ================= */}
      {!isLoading && (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 w-full h-[82vh] flex items-center justify-center"
        >
          
          {/* DOSSIERS DU BUREAU */}
          <AnimatePresence>
            {!hasOpenWindow && (
              <div className="absolute inset-0 pointer-events-none">
                <motion.div variants={itemVariants} className="absolute top-6 left-[10%] md:left-[18%] pointer-events-auto transform scale-110 md:scale-125 transition-all duration-300 hover:-translate-y-1">
                  <FolderIcon label="À Propos" onOpen={() => ds.open("about")} />
                </motion.div>
                
                <motion.div variants={itemVariants} className="absolute top-[38%] left-[5%] md:left-[10%] pointer-events-auto transform scale-110 md:scale-125 transition-all duration-300 hover:-translate-y-1">
                  <FolderIcon label="Études de cas" onOpen={() => ds.open("cases")} />
                </motion.div>
                
                <motion.div variants={itemVariants} className="absolute top-[65%] left-[8%] md:left-[12%] pointer-events-auto transform scale-110 md:scale-125 transition-all duration-300 hover:-translate-y-1">
                  <FolderIcon label="Compétences" onOpen={() => ds.open("skills")} />
                </motion.div>

                <motion.div variants={itemVariants} className="absolute top-2 left-1/2 -translate-x-1/2 pointer-events-auto transform scale-110 md:scale-125 transition-all duration-300 hover:-translate-y-1">
                  <FolderIcon label="Expérience" onOpen={() => ds.open("experience")} />
                </motion.div>

                <motion.div variants={itemVariants} className="absolute top-6 right-[10%] md:right-[18%] pointer-events-auto transform scale-110 md:scale-125 transition-all duration-300 hover:-translate-y-1">
                  <FolderIcon label="CV" onOpen={() => ds.open("resume")} />
                </motion.div>
                
                <motion.div variants={itemVariants} className="absolute top-[48%] right-[5%] md:right-[12%] pointer-events-auto transform scale-110 md:scale-125 transition-all duration-300 hover:-translate-y-1">
                  <FolderIcon label="Contact" onOpen={() => ds.open("contact")} />
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Carte de Présentation Profil Principale Harmonisée */}
          <motion.div 
            variants={itemVariants}
            layout 
            transition={{ type: "spring", stiffness: 150, damping: 22 }}
            className={`absolute z-10 w-full bg-white/95 backdrop-blur-md border-4 border-indigo-950 rounded-3xl shadow-[6px_6px_0px_0px_rgba(30,27,75,1)] flex flex-col overflow-hidden transition-all duration-500 ${
              hasOpenWindow 
                ? "max-w-xs md:max-w-sm xl:max-w-md left-4 md:left-8 lg:left-16 xl:left-24 translate-x-0 hidden lg:flex" 
                : "max-w-xl left-1/2 -translate-x-1/2"
            }`}
          >
            <div className="bg-indigo-950 px-4 py-3 flex items-center justify-between text-indigo-100 border-b-2 border-indigo-950">
              <span className="text-xs font-mono tracking-wider font-bold opacity-90">C:/PORTFOLIO/home</span>
              <div className="flex gap-1.5 opacity-60">
                <div className="w-3 h-3 rounded-full border-2 border-white bg-transparent" />
                <div className="w-3 h-3 rounded-full border-2 border-white bg-transparent" />
                <div className="w-3 h-3 rounded-full border-2 border-white bg-transparent" />
              </div>
            </div>

            <div className="p-6 md:p-8 flex flex-col items-center">
              <div className="flex items-center justify-between w-full gap-4 mb-6">
                <div className="text-left">
                  <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900">Sara Yeo</h1>
                  <h2 className="text-sm md:text-md font-extrabold text-indigo-600 mt-1 uppercase tracking-wide">Product Manager / Product Owner</h2>
                </div>
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border-4 border-indigo-950 bg-indigo-50 overflow-hidden shadow-md shrink-0 flex items-center justify-center">
                  <img src="/photo-profil.jpg" alt="Sara Yeo" className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="relative mb-8 w-full">
                <p className="w-full rounded-2xl border-2 border-slate-900 bg-white px-4 py-2.5 text-xs md:text-sm font-bold text-slate-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-center">
                  Je transforme les insights en résultats mesurables
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2.5 w-full mt-2">
                <div className="relative bg-violet-100 border-2 border-slate-900 p-2 md:p-3 rounded-md text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] -rotate-2">
                  <p className="text-[9px] md:text-[10px] uppercase tracking-wider font-black text-slate-600">Activation</p>
                  <p className="text-base md:text-lg font-black text-slate-900 mt-0.5">+18%</p>
                </div>
                <div className="relative bg-emerald-100 border-2 border-slate-900 p-2 md:p-3 rounded-md text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rotate-3">
                  <p className="text-[9px] md:text-[10px] uppercase tracking-wider font-black text-slate-600">Time-To-Value</p>
                  <p className="text-base md:text-lg font-black text-slate-900 mt-0.5">-22%</p>
                </div>
                <div className="relative bg-pink-100 border-2 border-slate-900 p-2 md:p-3 rounded-md text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] -rotate-1">
                  <p className="text-[9px] md:text-[10px] uppercase tracking-wider font-black text-slate-600">ARPA</p>
                  <p className="text-base md:text-lg font-black text-slate-900 mt-0.5">+11%</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ================= FENÊTRES DES DOSSIERS ================= */}
          <div className="absolute lg:right-16 xl:right-24 top-1/2 -translate-y-1/2 flex items-center justify-center z-20 w-full lg:w-[50vw] max-w-3xl px-4 md:px-0">
            <AnimatePresence mode="wait">
              {hasOpenWindow && (
                <Window
                  id={currentActiveApp}
                  title={currentActiveApp === 'cases' ? 'Case_Studies' : currentActiveApp}
                  isActive={true}
                  onClose={() => ds.close(currentActiveApp)}
                  onFocus={() => {}}
                  initialFrom="center"
                >
                  {currentActiveApp === "about" && <About />}
                  {currentActiveApp === "experience" && <Experience />}
                  {currentActiveApp === "cases" && <CaseStudies />}
                  {currentActiveApp === "skills" && <Skills />}
                  {currentActiveApp === "resume" && <Resume />}
                  {currentActiveApp === "contact" && <Contact />}
                </Window>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      {/* ================= BARRE DES TÂCHES (TASKBAR) ANIMÉE ================= */}
      {!isLoading && (
        <motion.div 
          initial={{ y: 70, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 80 }}
          className="fixed bottom-5 left-1/2 flex w-[min(92vw,800px)] -translate-x-1/2 items-center gap-3 rounded-2xl border-4 border-indigo-950 bg-white px-4 py-2 shadow-[4px_4px_0px_0px_rgba(30,27,75,1)] z-50"
        >
          {/* MENU DEMARRER */}
          <AnimatePresence>
            {isStartMenuOpen && (
              <motion.div
                ref={startMenuRef}
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute bottom-16 left-0 w-64 bg-white border-4 border-slate-900 rounded-2xl p-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-1 z-50"
              >
                <div className="bg-indigo-900 text-white font-black text-xs px-3 py-2 rounded-xl mb-2 uppercase tracking-wide">
                  Menu Principal
                </div>
                {APPS_LIST.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => {
                      ds.open(app.id as any);
                      setIsStartMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-100 text-left font-bold text-xs text-slate-800 transition active:scale-98"
                  >
                    <span className="text-base">{app.icon}</span>
                    <span>{app.label}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            ref={startButtonRef}
            onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
            className={`rounded-xl border-2 border-slate-900 px-4 py-1.5 text-xs font-black uppercase text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition active:scale-95 ${
              isStartMenuOpen ? "bg-slate-800" : "bg-indigo-900 hover:bg-indigo-950"
            }`}
          >
            🏢 Start
          </button>

          <div className="relative flex-1">
            <input 
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full rounded-xl border-2 border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-bold outline-none text-slate-900" 
              placeholder="Écris un nom de dossier..." 
            />
          </div>

          <button 
            onClick={() => { window.location.href = "mailto:yeokpeusseusarafiela@gmail.com"; }}
            className="whitespace-nowrap rounded-xl bg-pink-500 border-2 border-slate-900 px-4 py-1.5 text-xs font-black uppercase text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition hover:bg-pink-600"
          >
            Contacter
          </button>

          <button onClick={toggleMute} className="rounded-xl border-2 border-slate-200 bg-slate-50 p-1.5 text-xs font-bold hover:bg-slate-100 min-w-[32px] h-[32px]">
            {isMuted ? "🔇" : "🎵"}
          </button>

          <div className="hidden sm:block text-xs font-mono font-bold text-slate-700 bg-slate-100 border-2 border-slate-200 rounded-lg px-2 py-1 text-center min-w-[85px]">
            🕒 {currentTime || "00:00:00"}
          </div>
        </motion.div>
      )}
    </motion.main>
  );
}