"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type ViewId = "pro" | "creative";

const views: { id: ViewId; label: string }[] = [
  { id: "pro", label: "PRODUCT" },
  { id: "creative", label: "CRÉATIF" },
];

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

export default function About() {
  const [view, setView] = useState<ViewId>("pro");
  const [slide, setSlide] = useState(0);

  const next = () => setSlide((s) => (s + 1) % illustrations.length);
  const prev = () => setSlide((s) => (s - 1 + illustrations.length) % illustrations.length);

  return (
    <div className="space-y-6">
      {/* View switcher */}
      <div className="flex border-b border-slate-200 gap-1">
        {views.map((v) => (
          <button
            key={v.id}
            onClick={() => setView(v.id)}
            className={`px-4 py-2 font-bold text-sm rounded-t-xl transition-all duration-150 -mb-[1px] border-2 border-b-0 ${
              view === v.id
                ? "border-blue-900 bg-blue-900 text-white"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {view === "pro" ? (
          <motion.div
            key="pro"
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="space-y-6 text-slate-800 font-medium"
          >
            {/* Bio Card Section */}
            <section className="rounded-2xl border-4 border-slate-900 bg-white p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">👋</span>
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-wide">Bonjour tout le monde</h3>
              </div>

              <p className="leading-relaxed text-sm md:text-base text-slate-700">
                Product Manager / Product Owner avec une approche résolument orientée{" "}
                <span className="bg-sky-200 px-1 py-0.5 rounded font-bold text-slate-900">impact, discovery et delivery</span>.
                J'adore transformer le flou des besoins utilisateurs en fonctionnalités claires et mesurables.
                Je crée des ponts solides entre la vision , les données et les équipes de dev pour maximiser la valeur à chaque sprint.
              </p>

              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t-2 border-dashed border-slate-200">
                <span className="text-xs bg-slate-100 border border-slate-300 text-slate-700 px-2.5 py-1 rounded-md font-bold">#UserCentric</span>
                <span className="text-xs bg-slate-100 border border-slate-300 text-slate-700 px-2.5 py-1 rounded-md font-bold">#DataDriven</span>
                <span className="text-xs bg-slate-100 border border-slate-300 text-slate-700 px-2.5 py-1 rounded-md font-bold">#Agile</span>
              </div>
            </section>

            {/* Core Pillars */}
            <section className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border-4 border-slate-900 bg-sky-100 p-4 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] -rotate-1 hover:rotate-0 transition-transform">
                <div className="flex items-center gap-2 mb-2">
                  <span className="p-1 bg-white rounded-md border border-slate-900 text-xs">🎯</span>
                  <p className="text-sm font-black uppercase tracking-wider text-slate-900">Focus</p>
                </div>
                <p className="text-xs md:text-sm text-slate-800 leading-relaxed">
                  Discovery continu, priorisation stratégique, gestion de roadmap .
                </p>
              </div>

              <div className="rounded-2xl border-4 border-slate-900 bg-emerald-100 p-4 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] rotate-1 hover:rotate-0 transition-transform">
                <div className="flex items-center gap-2 mb-2">
                  <span className="p-1 bg-white rounded-md border border-slate-900 text-xs">🛠️</span>
                  <p className="text-sm font-black uppercase tracking-wider text-slate-900">Méthodes</p>
                </div>
                <p className="text-xs md:text-sm text-slate-800 leading-relaxed">
                  Framework Scrum, priorisation RICE / ICE, Design Sprint, A/B Testing, Product Analytics.
                </p>
              </div>

              <div className="rounded-2xl border-4 border-slate-900 bg-amber-100 p-4 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] -rotate-1 hover:rotate-0 transition-transform">
                <div className="flex items-center gap-2 mb-2">
                  <span className="p-1 bg-white rounded-md border border-slate-900 text-xs">🚀</span>
                  <p className="text-sm font-black uppercase tracking-wider text-slate-900">Objectif</p>
                </div>
                <p className="text-xs md:text-sm text-slate-800 leading-relaxed">
                  Concevoir et délivrer des expériences produits à la fois utiles et viables.
                </p>
              </div>
            </section>
          </motion.div>
        ) : (
          <motion.div
            key="creative"
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="space-y-6 text-slate-800 font-medium"
          >
            {/* Intro créative */}
            <section className="rounded-2xl border-4 border-slate-900 bg-white p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🎨</span>
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-wide">Côté créatif</h3>
              </div>
              <p className="leading-relaxed text-sm md:text-base text-slate-700">
                En dehors du produit, je dessine. c'est une passion que j'entretiens depuis longtemps, à retrouver sur{" "}
                <span className="bg-violet-200 px-1 py-0.5 rounded font-bold text-slate-900">@not_arting</span>.
                Ce goût pour l'art nourrit ma façon de penser au quotidien : le sens du détail, et une sensibilité visuelle que j'essaie de ramener jusque dans mon travail.
              </p>
            </section>

            {/* Carrousel d'illustrations */}
            <section className="rounded-2xl border-4 md:h-130 border-slate-900 bg-violet-50  p-4 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
              <p className="text-sm font-black uppercase tracking-wider text-slate-900 mb-3">Quelques illustrations</p>

              
              <div className="flex justify-center mt-1">
                <div className="flex justify-center relative w-110 overflow-hidden rounded-xl border-2 border-slate-900 bg-white">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={slide}
                    src={illustrations[slide].src}
                    alt={illustrations[slide].alt}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="  object-cover "
                  />
                </AnimatePresence>

                {/* Nav buttons */}
                <button
                  onClick={prev}
                  aria-label="Illustration précédente"
                  className="absolute left-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border-2 border-slate-900 bg-white/90 font-black shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:bg-white"
                >
                  ←
                </button>
                <button
                  onClick={next}
                  aria-label="Illustration suivante"
                  className="absolute right-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border-2 border-slate-900 bg-white/90 font-black shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:bg-white"
                >
                  →
                </button>
              </div>

              </div>

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-2">
                {illustrations.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlide(i)}
                    aria-label={`Aller à l'illustration ${i + 1}`}
                    className={`h-2.5 w-2.5 rounded-full border border-slate-900 transition ${
                      i === slide ? "bg-slate-900" : "bg-white"
                    }`}
                  />
                ))}
              </div>
            </section>

            {/* Liens réseaux */}
            <section className="rounded-2xl border-4 border-slate-900 bg-amber-100 p-4 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] text-center space-y-3">
              <p className="text-xs md:text-sm font-bold text-slate-900">
                Envie de voir plus de dessins ? C'est par ici 👇
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {socialLinks.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border-2 border-slate-900 bg-white px-4 py-2 text-xs font-bold text-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:bg-slate-900 hover:text-white transition"
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