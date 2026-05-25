"use client";

import { useState, useEffect } from "react";
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

export default function Desktop() {
  const ds = useDesktopState();
  const hasOpenWindow = ds.openApps.length > 0;
  const currentActiveApp = ds.openApps[ds.openApps.length - 1];

  const [currentTime, setCurrentTime] = useState("");

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

  return (
    <main className="relative min-h-dvh w-full overflow-hidden p-4 md:p-8 flex items-center justify-center bg-gradient-to-b from-[#1e3a8a] via-[#3b82f6] to-[#93c5fd]">
      
      {/* ================= BACKGROUND GRAPHICS LAYER ================= */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-white/10 blur-3xl" />

        {/* Ambient Twinkling Field */}
        <div className="absolute inset-0 top-0 h-[50vh]">
          <div className="absolute top-[12%] left-[18%] text-white text-xl font-serif animate-pulse duration-[3000ms]">✦</div>
          <div className="absolute top-[22%] left-[45%] text-white/40 text-sm font-serif animate-pulse duration-[2000ms]" style={{ animationDelay: '0.5s' }}>✦</div>
          <div className="absolute top-[15%] right-[22%] text-white text-2xl font-serif animate-pulse duration-[4000ms]" style={{ animationDelay: '1.2s' }}>✦</div>
          <div className="absolute top-[35%] left-[12%] text-white/60 text-lg font-serif animate-pulse duration-[2500ms]" style={{ animationDelay: '0.8s' }}>✦</div>
          <div className="absolute top-[38%] right-[15%] text-white text-base font-serif animate-pulse duration-[3500ms]" style={{ animationDelay: '1.8s' }}>✦</div>
        </div>

        {/* ================= BIGGER SHOOTING STARS ================= */}
        <div className="absolute inset-0 top-0 h-[45vh] w-full">
          <div 
            className="absolute top-[5%] right-[15%] w-48 h-[3px] bg-gradient-to-l from-white via-sky-200 to-transparent opacity-0 animate-shooting-fast" 
            style={{ animationDelay: '0.2s' }}
          />
          <div 
            className="absolute top-[20%] right-[40%] w-64 h-[3.5px] bg-gradient-to-l from-white via-blue-100 to-transparent opacity-0 animate-shooting-slow" 
            style={{ animationDelay: '4s' }}
          />
        </div>

        {/* Landscapes */}
        <div className="absolute bottom-0 left-0 right-0 h-[45vh] bg-[#2563eb]/20" style={{ clipPath: 'polygon(0 60%, 15% 45%, 35% 65%, 55% 35%, 75% 55%, 90% 40%, 100% 55%, 100% 100%, 0 100%)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-[35vh] bg-[#1d4ed8]/40 backdrop-blur-[1px]" style={{ clipPath: 'polygon(0 70%, 25% 40%, 45% 65%, 65% 45%, 85% 70%, 100% 50%, 100% 100%, 0 100%)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-[22vh] bg-[#1e3a8a]/60" style={{ clipPath: 'polygon(0 80%, 15% 60%, 35% 75%, 50% 55%, 70% 75%, 90% 60%, 100% 75%, 100% 100%, 0 100%)' }} />
      </div>

      {/* ================= MASTER WORKSPACE GRID container ================= */}
      {/* Dynamic layout transition engine: will smoothly slide elements side-by-side on desktop */}
      <motion.div 
        layout
        className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 pb-20 min-h-[80vh]"
      >
        
        {/* Absolute Desktop Background Folders */}
        <AnimatePresence>
          {!hasOpenWindow && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 pointer-events-none hidden md:block">
              <div className="absolute top-4 left-[20%] pointer-events-auto"><FolderIcon label="À Propos" onOpen={() => ds.open("about")} /></div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-auto"><FolderIcon label="Expérience" onOpen={() => ds.open("experience")} /></div>
              <div className="absolute top-4 right-[20%] pointer-events-auto"><FolderIcon label="CV" onOpen={() => ds.open("resume")} /></div>
              <div className="absolute top-1/2 left-8 -translate-y-1/2 pointer-events-auto"><FolderIcon label="Études de cas / Compétences" onOpen={() => ds.open("cases")} /></div>
              <div className="absolute bottom-16 left-[20%] pointer-events-auto"><FolderIcon label="Contact" onOpen={() => ds.open("contact")} /></div>
              <div className="absolute bottom-16 right-[20%] pointer-events-auto"><FolderIcon label="Contact" onOpen={() => ds.open("contact")} /></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Central Presentation Frame Profile Card */}
        <motion.div 
          layout 
          transition={{ type: "spring", stiffness: 180, damping: 25 }}
          className={`relative z-10 w-full bg-white border-4 border-blue-600 rounded-3xl shadow-[6px_6px_0px_0px_rgba(37,99,235,1)] flex flex-col overflow-hidden transition-all duration-500 ${
            hasOpenWindow ? "max-w-md shrink-0" : "max-w-xl"
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
                <h1 className="text-3xl font-black tracking-tight text-slate-900">Sara Yeo</h1>
                <h2 className="text-lg font-bold text-blue-600 mt-1">Product Manager / Product Owner</h2>
              </div>
              <div className="w-16 h-16 rounded-full border-4 border-blue-600 bg-blue-50 flex items-center justify-center font-bold text-blue-600 text-lg shadow-inner shrink-0">ED</div>
            </div>

            <div className="relative mb-8 w-full">
              <p className="w-full rounded-2xl border-2 border-slate-900 bg-white px-5 py-3 text-sm font-bold text-slate-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-center">
                Je transforme les insights en résultats mesurables
              </p>
            </div>

            {/* Badges */}
            <div className="grid grid-cols-3 gap-3 w-full mt-2">
              <div className="relative bg-sky-200 border-2 border-slate-900 p-3 rounded-md text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] -rotate-2">
                <p className="text-[10px] uppercase tracking-wider font-black text-slate-600">Activation</p>
                <p className="text-lg font-black text-slate-900 mt-0.5">+18%</p>
              </div>
              <div className="relative bg-emerald-200 border-2 border-slate-900 p-3 rounded-md text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rotate-3">
                <p className="text-[10px] uppercase tracking-wider font-black text-slate-600">Time-To-Value</p>
                <p className="text-lg font-black text-slate-900 mt-0.5">-22%</p>
              </div>
              <div className="relative bg-rose-200 border-2 border-slate-900 p-3 rounded-md text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] -rotate-1">
                <p className="text-[10px] uppercase tracking-wider font-black text-slate-600">ARPA</p>
                <p className="text-lg font-black text-slate-900 mt-0.5">+11%</p>
              </div>
            </div>

            {/* Mobile Device Grids */}
            <div className="mt-8 grid grid-cols-3 gap-4 border-t-2 border-dashed border-slate-200 pt-6 w-full md:hidden">
              <FolderIcon label="À Propos" onOpen={() => ds.open("about")} />
              <FolderIcon label="Expérience" onOpen={() => ds.open("experience")} />
              <FolderIcon label="Études de cas" onOpen={() => ds.open("cases")} />
              <FolderIcon label="Compétences" onOpen={() => ds.open("skills")} />
              <FolderIcon label="CV" onOpen={() => ds.open("resume")} />
              <FolderIcon label="Contact" onOpen={() => ds.open("contact")} />
            </div>
          </div>
        </motion.div>

        {/* ================= DYNAMIC SIDE-SLIDING APPLICATION WINDOW ================= */}
        <div className="w-full md:w-auto flex-1 flex justify-center items-center z-20">
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

      {/* Taskbar Dock Base */}
      <div className="fixed bottom-5 left-1/2 flex w-[min(92vw,800px)] -translate-x-1/2 items-center gap-3 rounded-2xl border-4 border-blue-900 bg-white px-4 py-2 shadow-[4px_4px_0px_0px_rgba(30,58,138,1)] z-50">
        <button className="rounded-xl bg-blue-600 border-2 border-slate-900 px-4 py-1.5 text-xs font-black uppercase text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition hover:bg-blue-700">Start</button>
        <div className="relative flex-1">
          <input className="w-full rounded-xl border-2 border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-bold outline-none ring-0 placeholder:text-slate-400" placeholder="Rechercher (Cmd/Ctrl+K)" />
        </div>
        <button onClick={() => ds.open("contact")} className="whitespace-nowrap rounded-xl bg-orange-500 border-2 border-slate-900 px-4 py-1.5 text-xs font-black uppercase text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition hover:bg-orange-600">Réserver un appel</button>
        <div className="hidden sm:block ml-2 text-xs font-mono font-bold text-slate-700 bg-slate-100 border-2 border-slate-200 rounded-lg px-2 py-1 min-w-[85px] text-center">🕒 {currentTime || "00:00:00"}</div>
      </div>
    </main>
  );
}