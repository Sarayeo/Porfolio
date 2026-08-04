"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type TabId = "bloop" | "kirbden" | "pokedex" | "leonart";

const tabs: { id: TabId; label: string }[] = [
  { id: "bloop", label: "BLOOP" },
  { id: "kirbden", label: "KIRBDEN" },
  { id: "pokedex", label: "POKEDEX" },
  { id: "leonart", label: "LEON'ART" },
];

// ---- Contenu propre à chaque étude de cas ----
const caseStudies: Record<TabId, any> = {
  bloop: {
    context: `Création d'une application MAO (musique assistée par ordinateur).
Objectif : 17 000 utilisateurs à N+3 du lancement.
Contraintes : géants du marché très présents, terrain inconnu autour des licences musicales, du droit d'auteur et de la gestion du stockage.`,
    process: [
      "Discovery : 15 interviews, funnel analytics (Amplitude)",
      "Priorisation : RICE (top 3 opportunités)",
      "Expérimentation : A/B, smoke tests",
      "Delivery : 3 sprints, release pilote",
    ],
    media: {
      type: "image",
      src: "/images/bloop-visu.png",
      alt: "Aperçu de l'application Bloop",
    },
    actions: [
      { label: "Télécharger les docs récapitulatifs", href: "/docs/bloop-recap.pdf", variant: "primary" },
      { label: "Accéder à Bloop", href: "https://bloop-on.cloud/", variant: "secondary" },
    ],
  },

  kirbden: {
    context: `Projet graphique : conception d'un système de design (design system) et de l'identité visuelle pour KirbDen.
Travail de A à Z, de la maquette Figma à l'intégration finale.`,
    process: null,
    media: {
      type: "image",
      src: "/images/kirbden-maquettes.png",
      alt: "Maquettes du projet KirbDen",
    },
    actions: [
      { label: "Voir les maquettes Figma", href: "https://www.figma.com/design/xgoh95UxajM9WfiYeK2nkn/Travail-Design-system?node-id=9-105&t=CdmUQqAlethDhWnx-1", variant: "primary" },
      { label: "Voir le projet en ligne", href: "#", variant: "secondary" },
    ],
  },

  pokedex: {
    context: `Projet de groupe : réalisation d'un Pokédex interactif, consommant une API publique.
Répartition des tâches en équipe (fetch/API, UI, filtres de recherche, responsive), intégration continue et revue de code entre membres.`,
    process: null,
    group: true,
    role: "Rôle : intégration front-end & logique de filtrage",
    stack: ["Javascript", "API REST", "SCSS", "Vercel"],
    features: [
      "Recherche et filtres par type / génération",
      "Fiches détails par Pokémons (stats, évolutions)",
      "Interface responsive mobile / desktop",
    ],
    media: {
      type: "video",
      src: "/images/pokedex.mp4", 
      poster: "/images/pokedex-poster.png",
      href: "https://js-a2-lynda-co.vercel.app/",
      label: "Cliquer sur la vidéo pour accéder au projet",
    },
  },

  leonart: {
    context: `Projet associatif : création d'un site pour exposer le travail d'artistes.
Le site présente les œuvres exposées, les profils des artistes, ainsi que les informations relatives à l'association (mission, contact, événements).`,
    process: null,
    association: true,
    mission: "L'association LEON'ART accompagne des artistes émergents en leur offrant une vitrine numérique pour exposer et diffuser leur travail.",
    features: [
      "Galerie d'œuvres par artiste",
      "Page dédiée à l'association et à sa mission",
      "Mise en avant des expositions / événements",
    ],
    media: {
      type: "image",
      src: "/images/leonart-visuel.png",
      alt: "Aperçu du site LEON'ART",
    },
    actions: [
      { label: "Accéder à l'association", href: "https://leon-art.vercel.app/#/", variant: "primary" },
    ],
  },
};

export default function CaseStudies() {
  const [tab, setTab] = useState<TabId>("bloop");
  const data = caseStudies[tab];

  return (
    <div className="space-y-6">
      {/* Tab controller */}
      <div className="flex border-b border-slate-200 gap-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 font-bold text-sm rounded-t-xl transition-all duration-150 -mb-[1px] border-2 border-b-0 ${
              tab === t.id
                ? "border-blue-900 bg-blue-900 text-white"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -8, opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="grid gap-4 md:grid-cols-3"
        >
          {/* Bloc texte : contexte + process + extras */}
          <section className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-4 md:col-span-2">
            <h3 className="mb-1 font-extrabold text-blue-950">Contexte</h3>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {data.context}
            </p>

            {data.process && (
              <>
                <h3 className="mt-4 mb-1 font-extrabold text-blue-950">Process</h3>
                <ol className="list-decimal space-y-1 pl-5 text-sm text-slate-700">
                  {data.process.map((step: string, i: number) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </>
            )}

            {data.mission && (
              <>
                <h3 className="mt-4 mb-1 font-extrabold text-blue-950">Mission de l'association</h3>
                <p className="text-sm text-slate-700 leading-relaxed">{data.mission}</p>
              </>
            )}

            {data.role && (
              <p className="mt-4 text-sm font-bold text-slate-700">{data.role}</p>
            )}

            {data.stack && (
              <div className="mt-2 flex flex-wrap gap-2">
                {data.stack.map((tech: string) => (
                  <span
                    key={tech}
                    className="rounded-full bg-slate-200 px-3 py-1 text-xs font-bold text-slate-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {data.features && (
              <>
                <h3 className="mt-4 mb-1 font-extrabold text-blue-950">Points clés</h3>
                <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
                  {data.features.map((f: string, i: number) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </>
            )}

            {data.group && (
              <p className="mt-4 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-900">
                Projet de groupe
              </p>
            )}
            {data.association && (
              <p className="mt-4 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-800">
                Projet associatif
              </p>
            )}
          </section>

          {/* Bloc latéral : visuel + actions */}
          <aside className="space-y-3">
            {data.media?.type === "image" && (
              <div className="overflow-hidden rounded-2xl border-2 border-blue-200 bg-blue-50">
                <img
                  src={data.media.src}
                  alt={data.media.alt}
                  className="h-40 w-full object-cover"
                />
              </div>
            )}

            {data.media?.type === "video" && (
              <a
                href={data.media.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden rounded-2xl border-2 border-blue-200 bg-blue-50"
              >
                <div className="relative h-40 w-full">
                  <video
                    src={data.media.src}
                    poster={data.media.poster}
                    className="h-full w-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition group-hover:bg-black/30" />
                </div>
                <p className="p-2 text-center text-xs font-bold text-blue-900">
                  {data.media.label}
                </p>
              </a>
            )}

            {data.actions?.map((action: any) => (
              <a
                key={action.href}
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-block w-full rounded-xl px-4 py-2.5 text-center text-sm font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition ${
                  action.variant === "primary"
                    ? "bg-orange-500 text-white hover:bg-orange-600"
                    : "bg-blue-900 text-white hover:bg-blue-800"
                }`}
              >
                {action.label}
              </a>
            ))}
          </aside>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}