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
  
  // --- GESTION DE LA MUSIQUE LOFI ---
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Utilisation du chemin exact vers ton fichier mp3 dans le dossier public
    const audio = new Audio("/mondamusic-lofi-lofi-chill-lofi-girl-491690.mp3");
    audio.loop = true;
    audio.volume = 0.35; // Volume d'ambiance doux à 35%
    audioRef.current = audio;

    // Lance la musique dès que l'utilisateur clique n'importe où sur le portfolio
    const handleFirstInteraction = () => {
      if (audioRef.current && isMuted) {
        audioRef.current.play()
          .then(() => {
            setIsMuted(false);
            document.removeEventListener("click", handleFirstInteraction);
          })
          .catch((err) => console.log("Attente d'interaction utilisateur :", err));
      }
    };

    document.addEventListener("click", handleFirstInteraction);

    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

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

  const startMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (startMenuRef.current && !startMenuRef.current.contains(event.target as Node)) {
        setIsStartMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    const matchedApp = APPS_LIST.find(
      app => app.label.toLowerCase() === value.trim().toLowerCase()
    );
    if (matchedApp) {
      ds.open(matchedApp.id);
      setSearchQuery("");
    }
  };

  return (
    <main className="relative min-h-dvh w-full overflow-hidden p-4 md:p-8 flex items-center justify-center bg-gradient-to-b from-[#2e1065] via-[#6366f1] to-[#f472b6]">
      
      {/* ================= BACKGROUND GRAPHICS LAYER ================= */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-pink-300/20 blur-3xl" />

        {/* Étoiles statiques */}
        <div className="absolute inset-0 top-0 h-[60vh]">
          <div className="absolute top-[8%] left-[12%] text-white text-xl font-serif animate-pulse duration-[3000ms]">✦</div>
          <div className="absolute top-[6%] left-[28%] text-pink-100/80 text-sm">✦</div>
          <div className="absolute top-[14%] left-[40%] text-white/90 text-lg animate-pulse duration-[2000ms]">✦</div>
          <div className="absolute top-[11%] left-[72%] text-white text-2xl font-serif animate-pulse duration-[4000ms]">✦</div>
          <div className="absolute top-[19%] left-[22%] text-white text-base animate-pulse duration-[2500ms]">✦</div>
          <div className="absolute top-[21%] left-[50%] text-pink-200/90 text-xl font-serif animate-pulse duration-[3500ms]">✦</div>
        </div>

        {/* Étoiles filantes */}
        <div className="absolute inset-0 top-0 h-[45vh] w-full">
          <div className="absolute top-[5%] right-[15%] w-48 h-[3px] bg-gradient-to-l from-white via-pink-100 to-transparent opacity-0 animate-shooting-fast" />
          <div className="absolute top-[20%] right-[40%] w-64 h-[3.5px] bg-gradient-to-l from-white via-indigo-200 to-transparent opacity-0 animate-shooting-slow" style={{ animationDelay: '4s' }} />
        </div>

        {/* Paysages rétro */}
        <div className="absolute bottom-0 left-0 right-0 h-[45vh] bg-[#4f46e5]/20" style={{ clipPath: 'polygon(0 60%, 15% 45%, 35% 65%, 55% 35%, 75% 55%, 90% 40%, 100% 55%, 100% 100%, 0 100%)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-[35vh] bg-[#4338ca]/30 backdrop-blur-[1px]" style={{ clipPath: 'polygon(0 70%, 25% 40%, 45% 65%, 65% 45%, 85% 70%, 100% 50%, 100% 100%, 0 100%)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-[22vh] bg-[#312e81]/60" style={{ clipPath: 'polygon(0 80%, 15% 60%, 35% 75%, 50% 55%, 70% 75%, 90% 60%, 100% 75%, 100% 100%, 0 100%)' }} />
      </div>

      {/* ================= MASTER WORKSPACE LAYER ================= */}
      <div className="relative z-10 w-full h-[82vh] flex items-center justify-center">
        
        {/* DOSSIERS DU BUREAU */}
        <AnimatePresence>
          {!hasOpenWindow && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 pointer-events-none hidden md:block">
              
              <div className={`absolute top-6 left-[18%] pointer-events-auto transform scale-110 md:scale-125 transition-all duration-300 hover:-translate-y-1 active:scale-95 ${searchQuery && !"à propos".includes(searchQuery.toLowerCase()) ? "opacity-40" : "opacity-100"}`}>
                <FolderIcon label="À Propos" onOpen={() => ds.open("about")} />
              </div>
              
              <div className={`absolute top-[38%] left-[10%] pointer-events-auto transform scale-110 md:scale-125 transition-all duration-300 hover:-translate-y-1 active:scale-95 ${searchQuery && !"études de cas".includes(searchQuery.toLowerCase()) ? "opacity-40" : "opacity-100"}`}>
                <FolderIcon label="Études de cas" onOpen={() => ds.open("cases")} />
              </div>
              
              <div className={`absolute top-[65%] left-[12%] pointer-events-auto transform scale-110 md:scale-125 transition-all duration-300 hover:-translate-y-1 active:scale-95 ${searchQuery && !"compétences".includes(searchQuery.toLowerCase()) ? "opacity-40" : "opacity-100"}`}>
                <FolderIcon label="Compétences" onOpen={() => ds.open("skills")} />
              </div>

              <div className={`absolute top-2 left-1/2 -translate-x-1/2 pointer-events-auto transform scale-110 md:scale-125 transition-all duration-300 hover:-translate-y-1 active:scale-95 ${searchQuery && !"expérience".includes(searchQuery.toLowerCase()) ? "opacity-40" : "opacity-100"}`}>
                <FolderIcon label="Expérience" onOpen={() => ds.open("experience")} />
              </div>

              <div className={`absolute top-6 right-[18%] pointer-events-auto transform scale-110 md:scale-125 transition-all duration-300 hover:-translate-y-1 active:scale-95 ${searchQuery && !"cv".includes(searchQuery.toLowerCase()) ? "opacity-40" : "opacity-100"}`}>
                <FolderIcon label="CV" onOpen={() => ds.open("resume")} />
              </div>
              
              <div className={`absolute top-[48%] right-[12%] pointer-events-auto transform scale-110 md:scale-125 transition-all duration-300 hover:-translate-y-1 active:scale-95 ${searchQuery && !"contact".includes(searchQuery.toLowerCase()) ? "opacity-40" : "opacity-100"}`}>
                <FolderIcon label="Contact" onOpen={() => ds.open("contact")} />
              </div>

            </motion.div>
          )}
        </AnimatePresence>

        {/* Carte de Présentation Profil Principale */}
        <motion.div 
          layout 
          transition={{ type: "spring", stiffness: 150, damping: 22 }}
          className={`absolute z-10 w-full bg-white border-4 border-blue-600 rounded-3xl shadow-[6px_6px_0px_0px_rgba(37,99,235,1)] flex flex-col overflow-hidden transition-all duration-500 ${
            hasOpenWindow 
              ? "max-w-xs md:max-w-sm xl:max-w-md left-4 md:left-8 lg:left-16 xl:left-24 translate-x-0" 
              : "max-w-xl left-1/2 -translate-x-1/2"
          }`}
        >
          <div className="bg-blue-600 px-4 py-3 flex items-center justify-between text-white border-b-2 border-blue-600">
            <span className="text-xs font-mono tracking-wider font-bold">C:/PORTFOLIO/home</span>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full border-2 border-white bg-transparent" />
              <div className="w-3 h-3 rounded-full border-2 border-white bg-transparent" />
              <div className="w-3 h-3 rounded-full border-2 border-white bg-transparent" />
            </div>
          </div>

          <div className="p-6 md:p-8 flex flex-col items-center">
            <div className="flex items-center justify-between w-full gap-4 mb-6">
              <div className="text-left">
                <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900">Sara Yeo</h1>
                <h2 className="text-sm md:text-lg font-bold text-blue-600 mt-1">Product Manager / Product Owner</h2>
              </div>
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border-4 border-blue-600 bg-blue-50 overflow-hidden shadow-md shrink-0 flex items-center justify-center">
                <img 
                  src="/photo-profil.jpg" 
                  alt="Sara Yeo" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    if(e.currentTarget.parentElement) {
                      e.currentTarget.parentElement.innerText = "SY";
                    }
                  }}
                />
              </div>
            </div>

            <div className="relative mb-8 w-full">
              <p className="w-full rounded-2xl border-2 border-slate-900 bg-white px-4 py-2.5 text-xs md:text-sm font-bold text-slate-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-center">
                Je transforme les insights en résultats mesurables
              </p>
            </div>

            {/* Badges Statistiques */}
            <div className="grid grid-cols-3 gap-2.5 w-full mt-2">
              <div className="relative bg-sky-200 border-2 border-slate-900 p-2 md:p-3 rounded-md text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] -rotate-2">
                <p className="text-[9px] md:text-[10px] uppercase tracking-wider font-black text-slate-600">Activation</p>
                <p className="text-base md:text-lg font-black text-slate-900 mt-0.5">+18%</p>
              </div>
              <div className="relative bg-emerald-200 border-2 border-slate-900 p-2 md:p-3 rounded-md text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rotate-3">
                <p className="text-[9px] md:text-[10px] uppercase tracking-wider font-black text-slate-600">Time-To-Value</p>
                <p className="text-base md:text-lg font-black text-slate-900 mt-0.5">-22%</p>
              </div>
              <div className="relative bg-rose-200 border-2 border-slate-900 p-2 md:p-3 rounded-md text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] -rotate-1">
                <p className="text-[9px] md:text-[10px] uppercase tracking-wider font-black text-slate-600">ARPA</p>
                <p className="text-base md:text-lg font-black text-slate-900 mt-0.5">+11%</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ================= APPLICATION FENÊTRE CONFIGURATION ================= */}
        <div className="absolute right-4 md:right-8 lg:right-16 xl:right-24 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center z-20 w-[45vw] lg:w-[50vw] max-w-3xl">
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
      </div>

      {/* ================= RETRO START CONTEXTUAL MENU ================= */}
      <AnimatePresence>
        {isStartMenuOpen && (
          <motion.div 
            ref={startMenuRef}
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="fixed bottom-[75px] left-4 md:left-[calc(50%-400px+16px)] w-64 bg-white border-4 border-blue-900 rounded-xl p-2 shadow-[4px_4px_0px_0px_rgba(30,58,138,1)] z-50 flex flex-col font-sans"
          >
            <div className="bg-gradient-to-r from-blue-800 to-indigo-600 text-white font-black text-xs px-3 py-2 rounded-lg mb-2 uppercase tracking-wider">
              Sara OS v2.0
            </div>
            <div className="flex flex-col gap-1">
              {APPS_LIST.map((app) => (
                <button
                  key={app.id}
                  onClick={() => {
                    ds.open(app.id);
                    setIsStartMenuOpen(false);
                  }}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 text-left text-xs font-bold text-slate-800 transition-colors"
                >
                  <span className="text-base">{app.icon}</span>
                  <span>{app.label}</span>
                </button>
              ))}
            </div>
            <div className="border-t-2 border-dashed border-slate-200 mt-2 pt-2">
              <button 
                onClick={() => {
                  ds.openApps.forEach(appId => ds.close(appId));
                  setIsStartMenuOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 text-xs font-black text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                ❌ Fermer toutes les fenêtres
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= TASKBAR DOCK FOOTER ================= */}
      <div className="fixed bottom-5 left-1/2 flex w-[min(92vw,800px)] -translate-x-1/2 items-center gap-3 rounded-2xl border-4 border-blue-900 bg-white px-4 py-2 shadow-[4px_4px_0px_0px_rgba(30,58,138,1)] z-50">
        
        <button 
          onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
          className={`rounded-xl border-2 border-slate-900 px-4 py-1.5 text-xs font-black uppercase text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition active:scale-95 ${
            isStartMenuOpen ? "bg-slate-800" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          🏢 Start
        </button>

        <div className="relative flex-1">
          <input 
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full rounded-xl border-2 border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-bold outline-none ring-0 placeholder:text-slate-400 text-slate-900" 
            placeholder="Écris un nom de dossier (ex: CV, Compétences)..." 
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")} 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          )}
        </div>

        <button 
          onClick={() => {
            window.location.href = "mailto:yeokpeusseusarafiela@gmail.com?subject=Demande%20de%20contact%20-%20Portfolio%20Product%20Manager&body=Bonjour%20Sara,%0D%0A%0D%0AJe%20viens%20de%20consulter%20votre%20portfolio%20et%20je%20souhaite%20%C3%A9changer%20avec%20vous%20concernant%20une%20opportunit%C3%A9%20/%20un%20projet.%0D%0A%0D%0ACordialement,";
          }}
          className="whitespace-nowrap rounded-xl bg-pink-500 border-2 border-slate-900 px-4 py-1.5 text-xs font-black uppercase text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition hover:bg-orange-600 flex items-center justify-center cursor-pointer"
        >
          Contacter
        </button>

        {/* Bouton Mute/Unmute */}
        <button 
          onClick={toggleMute}
          title={isMuted ? "Activer l'ambiance lofi" : "Couper la musique"}
          className="rounded-xl border-2 border-slate-200 bg-slate-50 p-1.5 text-xs font-bold hover:bg-slate-100 transition active:scale-95 flex items-center justify-center min-w-[32px] h-[32px]"
        >
          {isMuted ? "🔇" : "🎵"}
        </button>

        <div className="hidden sm:block text-xs font-mono font-bold text-slate-700 bg-slate-100 border-2 border-slate-200 rounded-lg px-2 py-1 min-w-[85px] text-center">🕒 {currentTime || "00:00:00"}</div>
      </div>
    </main>
  );
}