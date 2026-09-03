"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { translations, type Language } from "./translations";
import { careerProfiles, type CareerProfile } from "./careerProfiles";

type ViewId = "pro" | "creative";

type AboutProps = {
  language: Language;
  profile: CareerProfile;
};

const illustrations = [
  { src: "/images/art/illu-1.jpg", alt: "Illustration 1" },
  { src: "/images/art/illu-2.jpg", alt: "Illustration 2" },
  { src: "/images/art/illu-3.jpg", alt: "Illustration 3" },
  { src: "/images/art/illu-4.jpg", alt: "Illustration 4" },
];

const socialLinks = [
  { label: "Instagram - @not_arting", href: "https://instagram.com/not_arting" },
  { label: "TikTok - @not_arting", href: "https://tiktok.com/@not_arting" },
  { label: "Pinterest - @not_arting", href: "https://pinterest.com/not_arting" },
];

export default function About({ language, profile }: AboutProps) {
  const [view, setView] = useState<ViewId>("pro");
  const [slide, setSlide] = useState(0);

  const t = translations[language].about;
  const profileCopy = careerProfiles[language][profile].about;

  const views = [
    { id: "pro" as const, label: profileCopy.viewLabel },
    { id: "creative" as const, label: t.views.creative },
  ];

  const next = () => setSlide((s) => (s + 1) % illustrations.length);
  const prev = () =>
    setSlide((s) => (s - 1 + illustrations.length) % illustrations.length);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="ui-tabs flex max-w-full gap-1 overflow-x-auto border-b border-slate-200" role="tablist">
        {views.map((v) => (
          <button
            type="button"
            key={v.id}
            onClick={() => setView(v.id)}
            className={`shrink-0 whitespace-nowrap px-3 sm:px-4 py-2 font-bold text-xs sm:text-sm rounded-t-xl transition-all duration-150 -mb-px border-2 border-b-0 ${
              view === v.id
                ? "border-blue-900 bg-blue-900 text-white"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
            role="tab"
            aria-selected={view === v.id}
          >
            {v.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {view === "pro" ? (
          <motion.div
            key={`pro-${profile}`}
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="space-y-4 sm:space-y-6 text-slate-800 font-medium"
          >
            <section className="rounded-2xl border-4 border-slate-900 bg-white p-4 sm:p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">👋</span>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-wide">
                  {profileCopy.greeting}
                </h3>
              </div>

              <p className="leading-relaxed text-sm md:text-base text-slate-700">
                {profileCopy.introBefore}{" "}
                <span className="bg-sky-200 px-1 py-0.5 rounded font-bold text-slate-900">
                  {profileCopy.introHighlight}
                </span>
                {profileCopy.introAfter}
              </p>

              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t-2 border-dashed border-slate-200 select-none">
                {profileCopy.hashtags.map((hashtag) => (
                  <span
                    key={hashtag}
                    className="text-xs bg-slate-100 border border-slate-300 text-slate-700 px-2.5 py-1 rounded-md font-bold"
                  >
                    {hashtag}
                  </span>
                ))}
              </div>
            </section>

            <section className="grid gap-4 sm:grid-cols-3">
              {profileCopy.cards.map((card, index) => (
                <div
                  key={card.title}
                  className={`retro-hover rounded-2xl border-4 border-slate-900 p-4 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:rotate-0 transition-transform ${
                    ["bg-sky-100 -rotate-1", "bg-emerald-100 rotate-1", "bg-amber-100 -rotate-1"][index]
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="p-1 bg-white rounded-md border border-slate-900 text-xs">
                      {card.icon}
                    </span>
                    <p className="text-sm font-black uppercase tracking-wider text-slate-900">
                      {card.title}
                    </p>
                  </div>
                  <p className="text-xs md:text-sm text-slate-800 leading-relaxed">
                    {card.text}
                  </p>
                </div>
              ))}
            </section>
          </motion.div>
        ) : (
          <motion.div
            key="creative"
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="space-y-4 sm:space-y-6 text-slate-800 font-medium"
          >
            <section className="rounded-2xl border-4 border-slate-900 bg-white p-4 sm:p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🎨</span>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-wide">
                  {t.creative.title}
                </h3>
              </div>

              <p className="leading-relaxed text-sm md:text-base text-slate-700">
                {t.creative.introBefore}{" "}
                <span className="bg-violet-200 px-1 py-0.5 rounded font-bold text-slate-900">
                  @not_arting
                </span>
                {t.creative.introAfter}
              </p>
            </section>

            <section className="rounded-2xl border-4 border-slate-900 bg-violet-50 p-3 sm:p-4 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
              <p className="text-sm font-black uppercase tracking-wider text-slate-900 mb-3">
                {t.creative.galleryTitle}
              </p>

              <div className="flex justify-center mt-1">
                <div className="flex justify-center relative w-full max-w-110 aspect-square overflow-hidden rounded-xl border-2 border-slate-900 bg-white">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={slide}
                      src={illustrations[slide].src}
                      alt={illustrations[slide].alt}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                    />
                  </AnimatePresence>

                  <button
                    onClick={prev}
                    aria-label={t.creative.previous}
                    className="absolute left-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-900 bg-white/90 font-black shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-[55%] hover:bg-white"
                  >
                    ←
                  </button>

                  <button
                    onClick={next}
                    aria-label={t.creative.next}
                    className="absolute right-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-900 bg-white/90 font-black shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-[55%] hover:bg-white"
                  >
                    →
                  </button>
                </div>
              </div>

              <div className="flex justify-center gap-2 mt-2">
                {illustrations.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlide(i)}
                    aria-label={`${t.creative.goTo} ${i + 1}`}
                    className={`h-4 w-4 rounded-full border border-slate-900 transition hover:scale-110 ${
                      i === slide ? "bg-slate-900" : "bg-white"
                    }`}
                  />
                ))}
              </div>
            </section>

            <section className="rounded-2xl border-4 border-slate-900 bg-amber-100 p-4 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] text-center space-y-3">
              <p className="text-xs md:text-sm font-bold text-slate-900">
                {t.creative.moreDrawings}
              </p>

              <div className="flex flex-wrap justify-center gap-2">
                {socialLinks.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="retro-link rounded-xl border-2 border-slate-900 bg-white px-3 sm:px-4 py-2 text-xs font-bold text-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:bg-slate-900 hover:text-white transition"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
