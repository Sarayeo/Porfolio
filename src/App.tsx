"use client";

import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { useDesktopState, type AppId } from "./usedesktop";
import { AnimatePresence, motion } from "framer-motion";
import FolderIcon from "./FolderIcon";
import Window from "./window";
import { translations, type Language } from "./translations";
import ProfileSwitcher from "./ProfileSwitcher";
import {
  CAREER_PROFILE_STORAGE_KEY,
  careerProfiles,
  hasProfileSubdomain,
  resolveCareerProfile,
  type CareerProfile,
} from "./careerProfiles";

const BOOKING_URL = "https://calendar.app.google/nhgLfn6C8yLL2LhL8";
const LOADING_STEP_MS = 50;
const LOADING_EXIT_DELAY_MS = 250;

const About = lazy(() => import("./About"));
const Experience = lazy(() => import("./Experience"));
const CaseStudies = lazy(() => import("./CaseStudies"));
const Skills = lazy(() => import("./skills"));
const Resume = lazy(() => import("./Resume"));
const Contact = lazy(() => import("./Contact"));

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
] as const satisfies readonly {
  id: AppId;
  icon: string;
  label: Record<Language, string>;
  keywords: Record<Language, readonly string[]>;
}[];

export default function Desktop() {
  const ds = useDesktopState();
  const hasOpenWindow = ds.openApps.length > 0;
  const currentActiveApp = ds.active;

  const [currentTime, setCurrentTime] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = window.localStorage.getItem("portfolio-language");
    return savedLanguage === "fr" || savedLanguage === "en"
      ? savedLanguage
      : "fr";
  });
  const [careerProfile, setCareerProfile] = useState<CareerProfile>(
    resolveCareerProfile
  );
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
  const desktopRef = useRef<HTMLElement>(null);
  const startMenuRef = useRef<HTMLDivElement>(null);
  const startButtonRef = useRef<HTMLButtonElement>(null);

  const t = translations[language];
  const profileCopy = careerProfiles[language][careerProfile];

  useEffect(() => {
    window.localStorage.setItem("portfolio-language", language);
  }, [language]);

  useEffect(() => {
    window.localStorage.setItem(
      CAREER_PROFILE_STORAGE_KEY,
      careerProfile
    );

    document.documentElement.lang = language;
    document.title = profileCopy.metaTitle;

    const description = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]'
    );
    const ogTitle = document.querySelector<HTMLMetaElement>(
      'meta[property="og:title"]'
    );
    const ogDescription = document.querySelector<HTMLMetaElement>(
      'meta[property="og:description"]'
    );
    const ogLocale = document.querySelector<HTMLMetaElement>(
      'meta[property="og:locale"]'
    );

    description?.setAttribute("content", profileCopy.metaDescription);
    ogTitle?.setAttribute("content", profileCopy.metaTitle);
    ogDescription?.setAttribute("content", profileCopy.metaDescription);
    ogLocale?.setAttribute("content", language === "fr" ? "fr_FR" : "en_GB");

    let canonical = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    );
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `https://${
      careerProfile === "product" ? "po" : "pmo"
    }.sarafolio.com/`;
  }, [careerProfile, language, profileCopy]);

  const handleProfileChange = (nextProfile: CareerProfile) => {
    if (nextProfile === careerProfile) return;

    window.localStorage.setItem(CAREER_PROFILE_STORAGE_KEY, nextProfile);

    const hostname = window.location.hostname.toLowerCase();
    if (
      hasProfileSubdomain(hostname) &&
      (hostname === "sarafolio.com" || hostname.endsWith(".sarafolio.com"))
    ) {
      const targetUrl = new URL(window.location.href);
      targetUrl.hostname = `${
        nextProfile === "product" ? "po" : "pmo"
      }.sarafolio.com`;
      targetUrl.searchParams.delete("profile");
      window.location.assign(targetUrl);
      return;
    }

    setCareerProfile(nextProfile);

    if (!hasProfileSubdomain(hostname)) {
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set("profile", nextProfile);
      window.history.replaceState({}, "", currentUrl);
    }
  };

  useEffect(
    () => () => {
      audioRef.current?.pause();
      audioRef.current = null;
    },
    []
  );

  useEffect(() => {
    if (!hasInteracted) return;

    let exitTimer: ReturnType<typeof setTimeout> | undefined;

    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 97) {
          clearInterval(interval);
          exitTimer = setTimeout(
            () => setIsLoading(false),
            LOADING_EXIT_DELAY_MS
          );
          return 100;
        }
        return prev + 3;
      });
    }, LOADING_STEP_MS);

    return () => {
      clearInterval(interval);
      if (exitTimer) clearTimeout(exitTimer);
    };
  }, [hasInteracted]);

  const getAudio = () => {
    if (!audioRef.current) {
      const audio = new Audio(
        "/mondamusic-lofi-lofi-chill-lofi-girl-491690.mp3"
      );
      audio.loop = true;
      audio.volume = 0.3;
      audio.preload = "none";
      audioRef.current = audio;
    }

    return audioRef.current;
  };

  const handleStartExperience = () => {
    setHasInteracted(true);

    getAudio()
      .play()
      .then(() => setIsMuted(false))
      .catch(() => setIsMuted(true));
  };

  const toggleMute = () => {
    const audio = getAudio();

    if (isMuted) {
      audio
        .play()
        .then(() => setIsMuted(false))
        .catch(() => setIsMuted(true));
    } else {
      audio.pause();
      setIsMuted(true);
    }
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--cursor-x",
      `${event.clientX - bounds.left}px`
    );
    event.currentTarget.style.setProperty(
      "--cursor-y",
      `${event.clientY - bounds.top}px`
    );
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

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      setIsBookingOpen(false);
      setIsMusicOpen(false);
      setIsStartMenuOpen(false);
      setIsSearchOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
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
    ds.open(app.id);
    setSearchQuery("");
    setSearchResults([]);
    setIsSearchOpen(false);
    setSelectedIndex(0);
  };

  const openDesktopApp = (id: AppId) => {
    setIsStartMenuOpen(false);
    setIsSearchOpen(false);
    ds.open(id);
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
      ref={desktopRef}
      onPointerMove={handlePointerMove}
      data-profile={careerProfile}
      className={`desktop-surface relative min-h-dvh w-full overflow-hidden p-2 sm:p-4 md:p-8 flex items-center justify-center bg-linear-to-br bg-size-[400%_400%] animate-[gradientBG_15s_ease_infinite] ${
        careerProfile === "product"
          ? "from-[#2e1065] via-[#6366f1] to-[#f472b6]"
          : "from-[#082f49] via-[#0f766e] to-[#f59e0b]"
      }`}
    >
      <AnimatePresence>
        {isLoading && (
          <motion.div
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 bg-[#1e1b4b] z-100 flex flex-col items-center justify-center p-4 sm:p-6 font-mono select-none"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="w-full max-w-md bg-white border-4 border-slate-900 rounded-2xl p-5 sm:p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center"
            >
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-wider mb-2">
                Sara-Folio
              </h2>

              <p className="mb-6 text-balance text-xs font-black leading-relaxed text-slate-600 sm:text-sm">
                {language === "fr"
                  ? "Vision produit, rigueur projet : la double compétence au service de la valeur."
                  : "Product vision, project discipline: dual expertise serving value."}
              </p>

              {!hasInteracted && (
                <div className="mb-5 text-left">
                  <ProfileSwitcher
                    language={language}
                    profile={careerProfile}
                    onChange={handleProfileChange}
                  />
                </div>
              )}

              {!hasInteracted ? (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleStartExperience}
                  className="w-full py-4 bg-pink-500 hover:bg-pink-600 text-white font-black uppercase text-sm rounded-xl border-4 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all cursor-pointer"
                >
                  {language === "fr"
                    ? `Entrer côté ${profileCopy.shortLabel}`
                    : `Enter ${profileCopy.shortLabel} view`}
                </motion.button>
              ) : (
                <div className="w-full" aria-live="polite">
                  <div
                    className="w-full h-8 bg-slate-100 border-4 border-slate-900 rounded-xl p-1 overflow-hidden relative"
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={loadingProgress}
                  >
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
          className={`desktop-stage relative z-10 flex w-full items-center justify-center h-[calc(100dvh-5.75rem)] sm:h-[82vh] ${
            hasOpenWindow ? "has-window" : "desktop-home"
          }`}
        >
          <motion.div
            className={`desktop-icons relative order-2 grid w-full grid-cols-3 gap-x-1 gap-y-2 px-0.5 pointer-events-auto ${
              hasOpenWindow ? "desktop-icons-open" : ""
            }`}
          >
                <motion.div
                  variants={itemVariants}
                  className="desktop-shortcut order-1 relative flex min-w-0 justify-center pointer-events-auto"
                >
                  <FolderIcon
                    label={t.folders.about}
                    onOpen={() => openDesktopApp("about")}
                    active={currentActiveApp === "about"}
                  />
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="desktop-shortcut order-4 relative flex min-w-0 justify-center pointer-events-auto"
                >
                  <FolderIcon
                    label={t.folders.cases}
                    onOpen={() => openDesktopApp("cases")}
                    active={currentActiveApp === "cases"}
                  />
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="desktop-shortcut order-5 relative flex min-w-0 justify-center pointer-events-auto"
                >
                  <FolderIcon
                    label={t.folders.skills}
                    onOpen={() => openDesktopApp("skills")}
                    active={currentActiveApp === "skills"}
                  />
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="desktop-shortcut order-2 relative flex min-w-0 justify-center pointer-events-auto"
                >
                  <FolderIcon
                    label={t.folders.experience}
                    onOpen={() => openDesktopApp("experience")}
                    active={currentActiveApp === "experience"}
                  />
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="desktop-shortcut order-3 relative flex min-w-0 justify-center pointer-events-auto"
                >
                  <button
                    type="button"
                    onClick={() => openDesktopApp("resume")}
                    className={`folder-button group relative z-20 flex min-h-23 w-full min-w-0 cursor-pointer touch-manipulation flex-col items-center justify-center rounded-xl border-0 bg-transparent p-1 select-none sm:min-h-28 sm:w-auto sm:min-w-24 ${
                      currentActiveApp === "resume"
                        ? "folder-button-active"
                        : ""
                    }`}
                    aria-label={`${t.desktop.openFolder}: ${t.folders.resume}`}
                    aria-pressed={currentActiveApp === "resume"}
                  >
                    <div className="folder-visual document-visual pointer-events-none text-4xl transition-transform duration-200 group-hover:-translate-y-1 group-hover:scale-105" aria-hidden="true">📄</div>
                    <span className="desktop-label pointer-events-none mt-1 min-h-7 max-w-full rounded px-1 py-0.5 text-center text-[10px] font-bold leading-tight transition-colors group-hover:bg-indigo-950 group-hover:text-white group-focus-visible:bg-indigo-950 group-focus-visible:text-white group-active:bg-indigo-950 group-active:text-white sm:max-w-32 sm:px-2 sm:text-xs">
                      {profileCopy.cvDesktop}
                    </span>
                  </button>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="desktop-shortcut order-6 relative flex min-w-0 justify-center pointer-events-auto"
                >
                  <FolderIcon
                    label={t.folders.contact}
                    onOpen={() => openDesktopApp("contact")}
                    active={currentActiveApp === "contact"}
                  />
                </motion.div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            layout
            transition={{ type: "spring", stiffness: 150, damping: 22 }}
            className={`home-card z-10 w-full bg-white/95 backdrop-blur-md border-4 border-indigo-950 rounded-2xl sm:rounded-3xl shadow-[6px_6px_0px_0px_rgba(30,27,75,1)] flex flex-col overflow-hidden transition-all duration-500 ${
              hasOpenWindow
                ? "absolute max-w-xs md:max-w-sm xl:max-w-md left-4 md:left-8 lg:left-16 xl:left-24 translate-x-0 hidden lg:flex"
                : "relative order-1 max-w-2xl"
            }`}
          >
            <div className="flex items-center justify-between border-b-2 border-indigo-950 bg-indigo-950 px-3 py-2.5 text-indigo-100 sm:px-5 sm:py-3.5">
              <span className="text-xs font-mono tracking-wider font-bold opacity-90">
                {profileCopy.homePath}
              </span>

              <div className="flex gap-1.5 opacity-80">
                <div className="w-3 h-3 rounded-full border-2 border-white bg-red-600" />
                <div className="w-3 h-3 rounded-full border-2 border-white bg-yellow-600" />
                <div className="w-3 h-3 rounded-full border-2 border-white bg-green-600" />
              </div>
            </div>

            <div
              className={`flex flex-col items-center transition-all duration-500 ${
                hasOpenWindow ? "p-6" : "p-3 min-[360px]:p-4 sm:p-8 md:p-10"
              }`}
            >
              <div className="mb-3 w-full sm:mb-5">
                <ProfileSwitcher
                  language={language}
                  profile={careerProfile}
                  onChange={handleProfileChange}
                  compact={hasOpenWindow}
                />
              </div>

              <div className="mb-3 flex w-full items-center justify-between gap-5 sm:mb-6">
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
                    {profileCopy.role}
                  </h2>
                </div>
              </div>

              <div className="relative mb-3 w-full sm:mb-8">
                <p
                  className={`w-full rounded-2xl border-2 border-slate-900 bg-white px-3 py-2 font-bold text-slate-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-center transition-all sm:px-5 sm:py-3 ${
                    hasOpenWindow ? "text-xs" : "text-sm md:text-base"
                  }`}
                >
                  {profileCopy.tagline}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full mt-1 sm:mt-2 select-none">
                <div className="retro-hover relative flex min-h-12 items-center justify-center bg-violet-100 border-2 border-slate-900 p-2 sm:min-h-16 sm:p-3 rounded-md text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] -rotate-2">
                  <p className="text-[10px] sm:text-base md:text-xl font-black leading-tight text-slate-900">
                    {profileCopy.pillars[0]}
                  </p>
                </div>

                <div className="retro-hover relative flex min-h-12 items-center justify-center bg-emerald-100 border-2 border-slate-900 p-2 sm:min-h-16 sm:p-3 rounded-md text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rotate-3">
                  <p className="text-[10px] sm:text-base md:text-xl font-black leading-tight text-slate-900">
                    {profileCopy.pillars[1]}
                  </p>
                </div>

                <div className="retro-hover relative flex min-h-12 items-center justify-center bg-pink-100 border-2 border-slate-900 p-2 sm:min-h-16 sm:p-3 rounded-md text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] -rotate-1">
                  <p className="text-[10px] sm:text-base md:text-xl font-black leading-tight text-slate-900">
                    {profileCopy.pillars[2]}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <div
            className={`window-host absolute inset-x-0 top-0 bottom-15 z-40 flex w-full max-w-3xl items-center justify-center px-0.5 sm:px-4 lg:px-0 ${
              hasOpenWindow ? "pointer-events-auto" : "pointer-events-none"
            }`}
            aria-hidden={!hasOpenWindow}
          >
            <AnimatePresence mode="wait">
              {hasOpenWindow && currentActiveApp && (
                <Window
                  id={currentActiveApp}
                  title={windowTitle ?? ""}
                  isActive={true}
                  onClose={() => ds.close(currentActiveApp)}
                  onFocus={() => ds.bringToFront(currentActiveApp)}
                  initialFrom="center"
                >
                  <Suspense
                    fallback={
                      <div className="flex min-h-48 items-center justify-center font-mono text-xs font-bold text-indigo-950" role="status">
                        {t.desktop.loadingAssets}
                      </div>
                    }
                  >
                    {currentActiveApp === "about" && (
                      <About language={language} profile={careerProfile} />
                    )}

                    {currentActiveApp === "experience" && (
                      <Experience language={language} profile={careerProfile} />
                    )}

                    {currentActiveApp === "cases" && (
                      <CaseStudies language={language} profile={careerProfile} />
                    )}

                    {currentActiveApp === "skills" && (
                      <Skills language={language} profile={careerProfile} />
                    )}

                    {currentActiveApp === "resume" && (
                      <Resume language={language} profile={careerProfile} />
                    )}

                    {currentActiveApp === "contact" && (
                      <Contact language={language} profile={careerProfile} />
                    )}
                  </Suspense>
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
            role="presentation"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md max-h-[calc(100dvh-2rem)] bg-white border-4 border-slate-900 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-y-auto flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-labelledby="booking-dialog-title"
            >
              <div className="bg-indigo-950 px-4 py-3 flex items-center justify-between text-white shrink-0">
                <span id="booking-dialog-title" className="text-xs font-black uppercase tracking-wide">
                  {t.desktop.bookingTitle}
                </span>

                <button
                  type="button"
                  onClick={() => setIsBookingOpen(false)}
                  className="flex h-8 w-8 items-center justify-center text-sm font-black hover:text-pink-300 transition cursor-pointer"
                  aria-label={language === "fr" ? "Fermer" : "Close"}
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
            id="music-player"
            className="fixed left-3 right-3 bottom-22 w-auto bg-white border-4 sm:border-6 border-slate-900 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 z-50 sm:left-auto sm:right-20 sm:bottom-28 sm:w-70"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-black text-xs uppercase text-slate-700">
                {t.desktop.nowPlaying}
              </span>

              <button
                type="button"
                onClick={() => setIsMusicOpen(false)}
                className="flex h-8 w-8 items-center justify-center text-xs font-black cursor-pointer"
                aria-label={language === "fr" ? "Fermer" : "Close"}
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

      {!isLoading && (
        <motion.button
          type="button"
          onClick={() => setIsMusicOpen(!isMusicOpen)}
          whileHover={{ scale: 1.08, rotate: -3 }}
          whileTap={{ scale: 0.95 }}
          className="music-toggle fixed bottom-19 right-3 z-40 w-12 h-12 sm:bottom-10 sm:right-24 sm:z-50 sm:w-16 sm:h-16 rounded-full bg-green-700 border-4 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-white text-lg sm:text-xl cursor-pointer"
          aria-label={t.desktop.nowPlaying}
          aria-expanded={isMusicOpen}
          aria-controls="music-player"
        >
          <span aria-hidden="true">🎧</span>
        </motion.button>
      )}

      {!isLoading && (
        <motion.div
          initial={{ y: 70, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 80 }}
          className="taskbar fixed bottom-2 sm:bottom-5 left-1/2 flex w-[calc(100%-0.75rem)] sm:w-[min(94vw,960px)] -translate-x-1/2 items-center gap-1.5 sm:gap-3 rounded-xl sm:rounded-2xl border-3 sm:border-4 border-indigo-950 bg-white px-2 sm:px-4 py-1.5 sm:py-2 shadow-[4px_4px_0px_0px_rgba(30,27,75,1)] z-50 select-none"
        >
          <AnimatePresence>
            {isStartMenuOpen && (
              <motion.div
                ref={startMenuRef}
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                id="start-menu"
                className="absolute bottom-14 sm:bottom-16 left-0 w-[min(18rem,calc(100vw-1rem))] sm:w-64 bg-white border-4 border-slate-900 rounded-2xl p-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-1 z-50"
              >
                <div className="bg-indigo-900 text-white font-black text-xs px-3 py-2 rounded-xl mb-2 uppercase tracking-wide">
                  {t.desktop.menu}
                </div>

                {APPS_LIST.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => {
                      ds.open(app.id);
                      setIsStartMenuOpen(false);
                    }}
                    className="retro-menu-item w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-100 text-left font-bold text-xs text-slate-800 transition active:scale-98"
                  >
                    <span className="text-base">{app.icon}</span>
                    <span>{app.label[language]}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="button"
            ref={startButtonRef}
            onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
            className={`taskbar-start shrink-0 rounded-lg sm:rounded-xl border-2 border-slate-900 px-2.5 sm:px-4 py-1.5 text-[10px] sm:text-xs font-black uppercase text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition active:scale-95 ${
              isStartMenuOpen
                ? "bg-slate-800"
                : "bg-indigo-900 hover:bg-indigo-950"
            }`}
            aria-expanded={isStartMenuOpen}
            aria-controls="start-menu"
          >
            <span className="sm:hidden" aria-hidden="true">▦</span>
            <span className="hidden sm:inline">{t.desktop.folders}</span>
          </button>

          <ProfileSwitcher
            language={language}
            profile={careerProfile}
            onChange={handleProfileChange}
            compact
          />

          <div className="taskbar-search relative min-w-0 flex-1">
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
              className="w-full min-w-0 rounded-lg sm:rounded-xl border-2 border-slate-300 bg-slate-50 px-2 sm:px-3 py-1.5 text-[10px] sm:text-xs font-bold outline-none text-slate-900 focus:border-indigo-500"
              placeholder={t.desktop.search}
              aria-label={t.desktop.search}
              autoComplete="off"
            />

            <AnimatePresence>
              {isSearchOpen && searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 5, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.98 }}
                  transition={{ duration: 0.12 }}
                  className="absolute bottom-full left-0 mb-2 w-[min(20rem,calc(100vw-1rem))] overflow-hidden rounded-xl border-2 border-slate-900 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-50"
                  role="listbox"
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
                      role="option"
                      aria-selected={index === selectedIndex}
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

          <div className="taskbar-language flex shrink-0 items-center rounded-lg sm:rounded-xl border-2 border-slate-900 bg-slate-100 p-0.5" aria-label="Language">
            <button
              type="button"
              onClick={() => setLanguage("fr")}
              className={`rounded-lg px-2 py-1 text-[10px] font-black ${
                language === "fr"
                  ? "bg-indigo-900 text-white"
                  : "text-slate-600"
              }`}
              aria-pressed={language === "fr"}
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
              aria-pressed={language === "en"}
            >
              EN
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsBookingOpen(true)}
            className="taskbar-booking shrink-0 whitespace-nowrap rounded-lg sm:rounded-xl bg-pink-500 border-2 border-slate-900 px-2.5 sm:px-4 py-1.5 text-[10px] sm:text-xs font-black uppercase text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition hover:bg-pink-600 cursor-pointer"
            aria-label={t.desktop.booking}
          >
            <span className="sm:hidden" aria-hidden="true">🗓️</span>
            <span className="hidden sm:inline">{t.desktop.booking}</span>
          </button>

          <div className="hidden sm:block text-xs font-mono font-bold text-slate-700 bg-slate-100 border-2 border-slate-200 rounded-lg px-2 py-1 text-center min-w-21.25">
            🕒 {currentTime || "00:00:00"}
          </div>
        </motion.div>
      )}
    </main>
  );
}
