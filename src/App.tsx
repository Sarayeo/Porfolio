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
import { translations, type Language } from "./Translations";

const BOOKING_URL = "https://calendar.app.google/nhgLfn6C8yLL2LhL8";

const APPS_LIST = [
  {
    id: "about",
    icon: "👤",
    label: { fr: "À propos", en: "About" },
    keywords: {
      fr: ["about", "profil", "présentation", "sara", "portfolio"],
      en: ["about", "profile", "presentation", "sara", "portfolio"],
    },
  },
  {
    id: "experience",
    icon: "💼",
    label: { fr: "Expérience", en: "Experience" },
    keywords: {
      fr: [
        "expérience", "experience", "product manager", "chef de projet",
        "product owner", "pm", "po", "parcours", "carrière",
      ],
      en: [
        "experience", "product manager", "product owner", "pm", "po",
        "career", "background", "product",
      ],
    },
  },
  {
    id: "cases",
    icon: "📊",
    label: { fr: "Études de cas", en: "Case Studies" },
    keywords: {
      fr: [
        "études de cas", "etudes de cas", "case study", "case studies",
        "produit", "projets", "project",
      ],
      en: [
        "case studies", "case study", "product", "projects", "project",
      ],
    },
  },
  {
    id: "skills",
    icon: "🛠️",
    label: { fr: "Compétences", en: "Skills" },
    keywords: {
      fr: [
        "compétences", "competences", "technique", "figma", "scrum",
        "skills", "outils", "hard skills", "soft skills",
        "certification", "certifications",
      ],
      en: [
        "skills", "technical", "tools", "figma", "scrum",
        "hard skills", "soft skills", "certification", "certifications",
      ],
    },
  },
  {
    id: "resume",
    icon: "📄",
    label: { fr: "CV", en: "Resume" },
    keywords: {
      fr: [
        "cv", "resume", "curriculum", "curriculum vitae",
        "formation", "education", "diplôme", "diplome",
        "certification", "certifications",
      ],
      en: [
        "cv", "resume", "curriculum vitae", "education", "degree",
        "certification", "certifications",
      ],
    },
  },
  {
    id: "contact",
    icon: "📬",
    label: { fr: "Contact", en: "Contact" },
    keywords: {
      fr: ["contact", "email", "mail", "linkedin", "message", "appel"],
      en: ["contact", "email", "mail", "linkedin", "message", "call"],
    },
  },
] as const;

export default function Desktop() {
  const ds = useDesktopState();
  const hasOpenWindow = ds.openApps.length > 0;
  const currentActiveApp = ds.openApps[ds.openApps.length - 1];

  const [currentTime, setCurrentTime] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [language, setLanguage] = useState<Language>("fr");
  const [searchResults, setSearchResults] = useState<typeof APPS_LIST[number][]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isMusicOpen, setIsMusicOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startMenuRef = useRef<HTMLDivElement>(null);
  const startButtonRef = useRef<HTMLButtonElement>(null);

  const t = translations[language];

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("portfolio-language");
    if (savedLanguage === "fr" || savedLanguage === "en") {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("portfolio-language", language);
  }, [language]);

  useEffect(() => {
    const audio = new Audio("/mondamusic-lofi-lofi-chill-lofi-girl-491690.mp3");
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!hasInteracted) return;

    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + 3;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [hasInteracted]);

  const handleStartExperience = () => {
    setHasInteracted(true);

    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsMuted(false))
        .catch((err) => console.log("Audio blocked:", err));
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

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      setCurrentTime(
        now.toLocaleTimeString(language === "fr" ? "fr-FR" : "en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [language]);

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

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const normalizeText = (text: string) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setSearchQuery(value);
    setSelectedIndex(0);

    const query = normalizeText(value.trim());

    if (!query) {
      setSearchResults([]);
      setIsSearchOpen(false);
      return;
    }

    const results = APPS_LIST.filter((app) => {
      const label = normalizeText(app.label[language]);
      const keywords = app.keywords[language].map(normalizeText);

      return (
        label.startsWith(query) ||
        label.includes(query) ||
        keywords.some(
          (keyword) =>
            keyword.startsWith(query) || keyword.includes(query)
        )
      );
    });

    setSearchResults(results);
    setIsSearchOpen(results.length > 0);
  };

  const openSearchResult = (app: (typeof APPS_LIST)[number]) => {
    ds.open(app.id as any);
    setSearchQuery("");
    setSearchResults([]);
    setIsSearchOpen(false);
    setSelectedIndex(0);
  };

  const handleSearchKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (!isSearchOpen || searchResults.length === 0) {
      if (e.key === "Enter") {
        const exactMatch = APPS_LIST.find(
          (app) =>
            normalizeText(app.label[language]) ===
            normalizeText(searchQuery.trim())
        );

        if (exactMatch) {
          openSearchResult(exactMatch);
        }
      }

      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < searchResults.length - 1 ? prev + 1 : 0
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : searchResults.length - 1
      );
    }

    if (e.key === "Enter") {
      e.preventDefault();
      openSearchResult(searchResults[selectedIndex]);
    }

    if (e.key === "Escape") {
      setIsSearchOpen(false);
    }
  };

  const windowTitle =
    currentActiveApp &&
    t.windowTitles[currentActiveApp as keyof typeof t.windowTitles];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.18, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <main
      className="relative min-h-dvh w-full overflow-hidden p-4 md:p-8 flex items-center justify-center bg-linear-to-br from-[#2e1065] via-[#6366f1] to-[#f472b6] bg-size-[400%_400%] animate-[gradientBG_15s_ease_infinite]"
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes gradientBG {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
          `,
        }}
      />

      <AnimatePresence>
        {isLoading && (
          <motion.div
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 bg-[#1e1b4b] z-100 flex flex-col items-center justify-center p-6 font-mono select-none"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="w-full max-w-md bg-white border-4 border-slate-900 rounded-2xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center"
            >
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-wider mb-2">
                Sara-Folio
              </h2>

              <p className="text-xs font-bold text-slate-500 mb-6">
                {t.desktop.loadingText}
              </p>

              {!hasInteracted ? (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleStartExperience}
                  className="w-full py-4 bg-pink-500 hover:bg-pink-600 text-white font-black uppercase text-sm rounded-xl border-4 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all cursor-pointer"
                >
                  {t.desktop.enter}
                </motion.button>
              ) : (
                <div className="w-full">
                  <div className="w-full h-8 bg-slate-100 border-4 border-slate-900 rounded-xl p-1 overflow-hidden relative">
                    <motion.div
                      className="h-full bg-linear-to-r from-indigo-500 to-purple-600 rounded-sm"
                      style={{ width: `${loadingProgress}%` }}
                    />
                  </div>

                  <div className="flex justify-between items-center mt-3 text-xs font-bold text-slate-700">
                    <span>
                      {loadingProgress < 100
                        ? t.desktop.loadingAssets
                        : t.desktop.ready}
                    </span>
                    <span>{loadingProgress}%</span>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <motion.div
          animate={{
            x: [0, 60, -40, 0],
            y: [0, -80, 40, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[30%] w-150 h-150 rounded-full bg-pink-400/20 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -50, 50, 0],
            y: [0, 60, -60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-[10%] right-[25%] w-125 h-125 rounded-full bg-indigo-500/15 blur-3xl"
        />

        <div className="absolute inset-0 top-0 h-[60vh]">
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-[12%] left-[15%] text-white text-xl font-serif"
          >
            ✦
          </motion.div>

          <motion.div
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1.5 }}
            className="absolute top-[7%] left-[32%] text-pink-100/70 text-sm"
          >
            ✦
          </motion.div>

          <motion.div
            animate={{ opacity: [0.1, 0.8, 0.1] }}
            transition={{ duration: 3.5, repeat: Infinity, delay: 0.7 }}
            className="absolute top-[18%] left-[45%] text-white/80 text-lg"
          >
            ✦
          </motion.div>

          <motion.div
            animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.3, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute top-[15%] left-[78%] text-white text-2xl font-serif"
          >
            ✦
          </motion.div>
        </div>

        {!isLoading && (
          <motion.div
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute inset-0 pointer-events-none"
          >
            <div
              className="absolute bottom-0 left-0 right-0 h-[45vh] bg-[#4f46e5]/15"
              style={{
                clipPath:
                  "polygon(0 60%, 15% 45%, 35% 65%, 55% 35%, 75% 55%, 90% 40%, 100% 55%, 100% 100%, 0 100%)",
              }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-[35vh] bg-[#4338ca]/20 backdrop-blur-[0.5px]"
              style={{
                clipPath:
                  "polygon(0 70%, 25% 40%, 45% 65%, 65% 45%, 85% 70%, 100% 50%, 100% 100%, 0 100%)",
              }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-[22vh] bg-[#312e81]/40"
              style={{
                clipPath:
                  "polygon(0 80%, 15% 60%, 35% 75%, 50% 55%, 70% 75%, 90% 60%, 100% 75%, 100% 100%, 0 100%)",
              }}
            />
          </motion.div>
        )}
      </div>

      {!isLoading && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 w-full h-[82vh] flex items-center justify-center"
        >
          <AnimatePresence>
            {!hasOpenWindow && (
              <div className="absolute inset-0 pointer-events-none">
                <motion.div
                  variants={itemVariants}
                  className="absolute top-6 left-[10%] md:left-[18%] pointer-events-auto transform scale-110 md:scale-125 transition-all duration-300 hover:-translate-y-1"
                >
                  <FolderIcon
                    label={t.folders.about}
                    onOpen={() => ds.open("about")}
                  />
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="absolute top-[38%] left-[5%] md:left-[10%] pointer-events-auto transform scale-110 md:scale-125 transition-all duration-300 hover:-translate-y-1"
                >
                  <FolderIcon
                    label={t.folders.cases}
                    onOpen={() => ds.open("cases")}
                  />
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="absolute top-[65%] left-[8%] md:left-[12%] pointer-events-auto transform scale-110 md:scale-125 transition-all duration-300 hover:-translate-y-1"
                >
                  <FolderIcon
                    label={t.folders.skills}
                    onOpen={() => ds.open("skills")}
                  />
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="absolute top-2 left-1/2 -translate-x-1/2 pointer-events-auto transform scale-110 md:scale-125 transition-all duration-300 hover:-translate-y-1"
                >
                  <FolderIcon
                    label={t.folders.experience}
                    onOpen={() => ds.open("experience")}
                  />
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="absolute top-24 right-[10%] md:right-[18%] pointer-events-auto transform scale-110 md:scale-125 transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    onClick={() => ds.open("resume")}
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <div className="text-4xl">📄</div>
                    <span className="text-xs font-bold mt-1">
                      {t.desktop.cvDesktop}
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="absolute top-[48%] right-[5%] md:right-[12%] pointer-events-auto transform scale-110 md:scale-125 transition-all duration-300 hover:-translate-y-1"
                >
                  <FolderIcon
                    label={t.folders.contact}
                    onOpen={() => ds.open("contact")}
                  />
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          <motion.div
            variants={itemVariants}
            layout
            transition={{ type: "spring", stiffness: 150, damping: 22 }}
            className={`absolute z-10 w-full bg-white/95 backdrop-blur-md border-4 border-indigo-950 rounded-3xl shadow-[6px_6px_0px_0px_rgba(30,27,75,1)] flex flex-col overflow-hidden transition-all duration-500 ${
              hasOpenWindow
                ? "max-w-xs md:max-w-sm xl:max-w-md left-4 md:left-8 lg:left-16 xl:left-24 translate-x-0 hidden lg:flex"
                : "max-w-2xl left-1/2 -translate-x-1/2"
            }`}
          >
            <div className="bg-indigo-950 px-5 py-3.5 flex items-center justify-between text-indigo-100 border-b-2 border-indigo-950">
              <span className="text-xs font-mono tracking-wider font-bold opacity-90">
                {t.desktop.homePath}
              </span>

              <div className="flex gap-1.5 opacity-80">
                <div className="w-3 h-3 rounded-full border-2 border-white bg-red-600" />
                <div className="w-3 h-3 rounded-full border-2 border-white bg-yellow-600" />
                <div className="w-3 h-3 rounded-full border-2 border-white bg-green-600" />
              </div>
            </div>

            <div
              className={`flex flex-col items-center transition-all duration-500 ${
                hasOpenWindow ? "p-6" : "p-8 md:p-10"
              }`}
            >
              <div className="flex items-center justify-between w-full gap-5 mb-6">
                <div className="text-left">
                  <h1
                    className={`font-black tracking-tight text-slate-900 transition-all ${
                      hasOpenWindow
                        ? "text-2xl"
                        : "text-3xl md:text-4xl"
                    }`}
                  >
                    Sara Yeo
                  </h1>

                  <h2
                    className={`font-extrabold text-indigo-600 mt-1 uppercase tracking-wide transition-all ${
                      hasOpenWindow ? "text-xs" : "text-sm md:text-base"
                    }`}
                  >
                    {t.home.role}
                  </h2>
                </div>
              </div>

              <div className="relative mb-8 w-full">
                <p
                  className={`w-full rounded-2xl border-2 border-slate-900 bg-white px-5 py-3 font-bold text-slate-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-center transition-all ${
                    hasOpenWindow ? "text-xs" : "text-sm md:text-base"
                  }`}
                >
                  {t.home.tagline}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 w-full mt-2">
                <div className="relative bg-violet-100 border-2 border-slate-900 p-3 rounded-md text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] -rotate-2">
                  <p className="text-base md:text-xl font-black text-slate-900 mt-2">
                    {t.home.creativity}
                  </p>
                </div>

                <div className="relative bg-emerald-100 border-2 border-slate-900 p-3 rounded-md text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rotate-3">
                  <p className="text-base md:text-xl font-black text-slate-900 mt-2">
                    {t.home.timeToValue}
                  </p>
                </div>

                <div className="relative bg-pink-100 border-2 border-slate-900 p-3 rounded-md text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] -rotate-1">
                  <p className="text-base md:text-xl font-black text-slate-900 mt-2">
                    {t.home.efficiency}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="absolute lg:right-16 xl:right-24 top-1/2 -translate-y-1/2 flex items-center justify-center z-20 w-full lg:w-[50vw] max-w-3xl px-4 md:px-0">
            <AnimatePresence mode="wait">
              {hasOpenWindow && (
                <Window
                  id={currentActiveApp}
                  title={windowTitle ?? ""}
                  isActive={true}
                  onClose={() => ds.close(currentActiveApp)}
                  onFocus={() => {}}
                  initialFrom="center"
                >
                  {currentActiveApp === "about" && (
                    <About language={language} />
                  )}

                  {currentActiveApp === "experience" && (
                    <Experience language={language} />
                  )}

                  {currentActiveApp === "cases" && (
                    <CaseStudies language={language} />
                  )}

                  {currentActiveApp === "skills" && (
                    <Skills language={language} />
                  )}

                  {currentActiveApp === "resume" && (
                    <Resume language={language} />
                  )}

                  {currentActiveApp === "contact" && (
                    <Contact language={language} />
                  )}
                </Window>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {isBookingOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 p-4"
            onClick={() => setIsBookingOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-white border-4 border-slate-900 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col"
            >
              <div className="bg-indigo-950 px-4 py-3 flex items-center justify-between text-white shrink-0">
                <span className="text-xs font-black uppercase tracking-wide">
                  {t.desktop.bookingTitle}
                </span>

                <button
                  onClick={() => setIsBookingOpen(false)}
                  className="text-sm font-black hover:text-pink-300 transition cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-indigo-50 border-2 border-slate-900 flex items-center justify-center text-3xl">
                  🗓️
                </div>

                <div>
                  <h3 className="font-black text-slate-900 text-base mb-1">
                    {t.desktop.bookingQuestion}
                  </h3>

                  <p className="text-xs font-bold text-slate-500 leading-relaxed">
                    {t.desktop.bookingDescription}
                  </p>
                </div>

                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsBookingOpen(false)}
                  className="w-full py-3 bg-pink-500 hover:bg-pink-600 text-white font-black uppercase text-xs rounded-xl border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
                >
                  {t.desktop.bookingButton}
                </a>

                <p className="text-[10px] font-bold text-slate-400">
                  {t.desktop.newTab}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMusicOpen && (
          <motion.div
            initial={{ x: 120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 120, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            className="fixed right-20 bottom-28 w-70 bg-white border-6 border-slate-900 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 z-50"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-black text-xs uppercase text-slate-700">
                {t.desktop.nowPlaying}
              </span>

              <button
                onClick={() => setIsMusicOpen(false)}
                className="text-xs font-black cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="bg-indigo-50 border-2 border-slate-900 rounded-xl p-3 text-center">
              <p className="text-xs font-bold text-slate-600">
                {t.desktop.lofiRadio}
              </p>

              <p className="text-sm font-black text-slate-900 mt-1">
                {t.desktop.chillBeats}
              </p>
            </div>

            <div className="flex items-center justify-center gap-4 mt-4">
              <button
                onClick={toggleMute}
                className="bg-indigo-900 text-white px-4 py-2 rounded-xl border-2 border-slate-900 text-xs font-black cursor-pointer"
              >
                {isMuted ? t.desktop.play : t.desktop.pause}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsMusicOpen(!isMusicOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-10 right-24 z-50 w-16 h-16 rounded-full bg-green-700 border-4 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-white text-xl cursor-pointer"
      >
        🎧
      </motion.button>

      {!isLoading && (
        <motion.div
          initial={{ y: 70, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 80 }}
          className="fixed bottom-5 left-1/2 flex w-[min(92vw,800px)] -translate-x-1/2 items-center gap-3 rounded-2xl border-4 border-indigo-950 bg-white px-4 py-2 shadow-[4px_4px_0px_0px_rgba(30,27,75,1)] z-50"
        >
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
                  {t.desktop.menu}
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
                    <span>{app.label[language]}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <button
            ref={startButtonRef}
            onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
            className={`rounded-xl border-2 border-slate-900 px-4 py-1.5 text-xs font-black uppercase text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition active:scale-95 ${
              isStartMenuOpen
                ? "bg-slate-800"
                : "bg-indigo-900 hover:bg-indigo-950"
            }`}
          >
            {t.desktop.folders}
          </button>

          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
              onFocus={() => {
                if (searchResults.length > 0) {
                  setIsSearchOpen(true);
                }
              }}
              className="w-full rounded-xl border-2 border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-bold outline-none text-slate-900 focus:border-indigo-500"
              placeholder={t.desktop.search}
              autoComplete="off"
            />

            <AnimatePresence>
              {isSearchOpen && searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 5, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.98 }}
                  transition={{ duration: 0.12 }}
                  className="absolute bottom-full left-0 mb-2 w-full overflow-hidden rounded-xl border-2 border-slate-900 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-50"
                >
                  {searchResults.map((app, index) => (
                    <button
                      key={app.id}
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        openSearchResult(app);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition ${
                        index === selectedIndex
                          ? "bg-indigo-100"
                          : "bg-white hover:bg-slate-100"
                      }`}
                    >
                      <span className="text-base">{app.icon}</span>

                      <div className="flex flex-col">
                        <span className="text-xs font-black text-slate-900">
                          {app.label[language]}
                        </span>

                        <span className="text-[10px] font-bold text-slate-400">
                          {t.desktop.openFolder}
                        </span>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center rounded-xl border-2 border-slate-900 bg-slate-100 p-0.5">
            <button
              type="button"
              onClick={() => setLanguage("fr")}
              className={`rounded-lg px-2 py-1 text-[10px] font-black ${
                language === "fr"
                  ? "bg-indigo-900 text-white"
                  : "text-slate-600"
              }`}
            >
              FR
            </button>

            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`rounded-lg px-2 py-1 text-[10px] font-black ${
                language === "en"
                  ? "bg-indigo-900 text-white"
                  : "text-slate-600"
              }`}
            >
              EN
            </button>
          </div>

          <button
            onClick={() => setIsBookingOpen(true)}
            className="whitespace-nowrap rounded-xl bg-pink-500 border-2 border-slate-900 px-4 py-1.5 text-xs font-black uppercase text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition hover:bg-pink-600 cursor-pointer"
          >
            {t.desktop.booking}
          </button>

          <div className="hidden sm:block text-xs font-mono font-bold text-slate-700 bg-slate-100 border-2 border-slate-200 rounded-lg px-2 py-1 text-center min-w-21.25">
            🕒 {currentTime || "00:00:00"}
          </div>
        </motion.div>
      )}
    </main>
  );
}
