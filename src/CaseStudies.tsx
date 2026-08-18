"use client";

import { useState, type Key } from "react";
import { motion, AnimatePresence } from "motion/react";
import { translations, type Language } from "./translations";

type TabId = "bloop" | "kirbden" | "pokedex" | "leonart";

type CaseStudiesProps = {
  language: Language;
};

const tabs: { id: TabId; label: string }[] = [
  { id: "bloop", label: "BLOOP" },
  { id: "kirbden", label: "KIRBDEN" },
  { id: "pokedex", label: "POKEDEX" },
  { id: "leonart", label: "LEON'ART" },
];

const caseStudies = {
  bloop: {
    media: {
      type: "image" as const,
      src: "/images/bloop-visu.png",
      alt: "Aperçu de l'application Bloop",
    },
    actions: [
      {
        href: "https://bloop-on.cloud/",
        variant: "secondary" as const,
        key: "bloop" as const,
      },
    ],
  },
  kirbden: {
    media: {
      type: "image" as const,
      src: "/images/kirbden-maquettes.png",
      alt: "Maquettes du projet KirbDen",
    },
    actions: [
      {
        href: "https://www.figma.com/design/xgoh95UxajM9WfiYeK2nkn/Travail-Design-system?node-id=9-105&t=CdmUQqAlethDhWnx-1",
        variant: "primary" as const,
        key: "kirbden" as const,
      },
    ],
  },
  pokedex: {
    media: {
      type: "video" as const,
      src: "/images/pokedex.mp4",
      poster: "/images/pokedex-poster.png",
      href: "https://js-a2-lynda-co.vercel.app/",
    },
  },
  leonart: {
    media: {
      type: "image" as const,
      src: "/images/leonart-visuel.png",
      alt: "Aperçu du site LEON'ART",
    },
    actions: [
      {
        href: "https://leon-art.vercel.app/#/",
        variant: "primary" as const,
        key: "leonart" as const,
      },
    ],
  },
} as const;

export default function CaseStudies({ language }: CaseStudiesProps) {
  const [tab, setTab] = useState<TabId>("bloop");

  const t = translations[language].cases;
  const data = t.entries[tab];
  const media = caseStudies[tab].media;

  return (
    <div className="space-y-6">
      <div className="flex border-b border-slate-200 gap-1">
        {tabs.map((item) => (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            className={`px-4 py-2 font-bold text-sm rounded-t-xl transition-all duration-150 -mb-px border-2 border-b-0 ${
              tab === item.id
                ? "border-blue-900 bg-blue-900 text-white"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${language}-${tab}`}
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -8, opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="grid gap-4 md:grid-cols-3"
        >
          <section className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-4 md:col-span-2">
            <h3 className="mb-1 font-extrabold text-blue-950">
              {t.contextTitle}
            </h3>

            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {data.context}
            </p>

            {"process" in data && data.process && (
              <>
                <h3 className="mt-4 mb-1 font-extrabold text-blue-950">
                  {t.processTitle}
                </h3>

                <ol className="list-decimal space-y-1 pl-5 text-sm text-slate-700">
                  {data.process.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </>
            )}

            {"mission" in data && data.mission && (
              <>
                <h3 className="mt-4 mb-1 font-extrabold text-blue-950">
                  {t.missionTitle}
                </h3>

                <p className="text-sm text-slate-700 leading-relaxed">
                  {data.mission}
                </p>
              </>
            )}

            {"role" in data && data.role && (
              <p className="mt-4 text-sm font-bold text-slate-700">
                {data.role}
              </p>
            )}

            {tab === "pokedex" && (
              <div className="mt-2 flex flex-wrap gap-2">
                {["Javascript", "API REST", "SCSS", "Vercel"].map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-slate-200 px-3 py-1 text-xs font-bold text-slate-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {"features" in data && data.features && (
              <>
                <h3 className="mt-4 mb-1 font-extrabold text-blue-950">
                  {t.keyPointsTitle}
                </h3>

                <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
                  {data.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </>
            )}

            {tab === "bloop" && (
              <p className="mt-4 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-900">
                {t.groupProject}
              </p>
            )}

            {tab === "pokedex" && (
              <p className="mt-4 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-900">
                {t.groupProject}
              </p>
            )}

            {tab === "leonart" && (
              <p className="mt-4 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-800">
                {t.associationProject}
              </p>
            )}
          </section>

          <aside className="space-y-3">
            {media.type === "image" && (
              <div className="overflow-hidden rounded-2xl border-2 border-blue-200 bg-blue-50">
                <img
                  src={media.src}
                  alt={media.alt}
                  className="h-40 w-full object-cover"
                />
              </div>
            )}

            {media.type === "video" && (
              <a
                href={media.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden rounded-2xl border-2 border-blue-200 bg-blue-50"
              >
                <div className="relative h-40 w-full">
                  <video
                    src={media.src}
                    poster={media.poster}
                    className="h-full w-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />

                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition group-hover:bg-black/30" />
                </div>

                <p className="p-2 text-center text-xs font-bold text-blue-900">
                  {t.videoLabel}
                </p>
              </a>
            )}

            {"actions" in caseStudies[tab] &&
              (caseStudies[tab] as typeof caseStudies.bloop | typeof caseStudies.kirbden | typeof caseStudies.leonart).actions?.map((action: { href: Key | null | undefined; variant: string; key: string; }) => (
                <a
                  key={action.href}
                  href={action.href as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-block w-full rounded-xl px-4 py-2.5 text-center text-sm font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition ${
                    action.variant === "primary"
                      ? "bg-orange-500 text-white hover:bg-orange-600"
                      : "bg-blue-900 text-white hover:bg-blue-800"
                  }`}
                >
                  {t.actions[action.key as keyof typeof t.actions]}
                </a>
              ))}
          </aside>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
