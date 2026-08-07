"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type ExpId = "suitus" | "bpce" | "lmp";

const expTabs: { id: ExpId; label: string }[] = [
  { id: "suitus", label: "SUITUS" },
  { id: "bpce", label: "GROUPE BPCE" },
  { id: "lmp", label: "MUTUELLE LMP" },
];

const experiences: Record<ExpId, any> = {
  suitus: {
    role: "Développeur Frontend — Stage",
    period: "2 mois",
    intro: `Arrivé chez SuitUS en tant que développeuse frontend, j'ai pris en charge la conception et l'intégration d'interfaces, tout en gardant un œil attentif sur la qualité et la fiabilité du travail livré.`,
    missions: [
      "Conception de wireframes en lien direct avec les besoins business",
      "Intégration des wireframes validés dans l'application en React",
      "Veille sur la qualité et la cohérence du code livré",
    ],
    highlight: {
      title: "Gérer une crise de sécurité en urgence",
      text: `L'entreprise a été victime d'une tentative de phishing peu avant le passage du fondateur dans une émission télévisée. Avec cette échéance imminente, j'ai pris en main WordPress, identifié les failles de sécurité exploitées et publié un nouveau site plus robuste, permettant à l'entreprise de se présenter en toute confiance dans les médias.`,
    },
    skills: ["React", "Wireframing", "WordPress", "Sécurité web"],
  },

  bpce: {
    role: "Développeuse Power plateforme — Alternance",
    period: "Septembre 2023 – Août 2024",
    intro: `Intégré à l'équipe innovation du groupe bancaire BPCE, j'ai découvert l'écosystème Power Platform, jusque-là inconnu pour moi, et m'y suis adapté rapidement pour contribuer à des projets transverses au sein du groupe.`,
    missions: [
      "Participation à des programmes d'intégration internes au groupe",
      "Accompagnement d'autres entités du groupe, aux côtés de mon mentor, dans la création d'applications sur Power Platform",
      "Développement d'une application RH destinée à accélérer et fluidifier les processus d'onboarding et d'offboarding",
    ],
    highlight: {
      title: "Reprendre le projet de mon mentor",
      text: `En fin de mission, j'ai été chargé de reprendre le projet initialement porté par mon mentor : le nettoyage de l'environnement de production du groupe. Un travail mené en coordination avec d'autres développeurs via Microsoft Teams, qui a constitué ma dernière mission au sein de l'équipe.`,
    },
    skills: ["Power Platform", "Power Apps", "Power Automate", "Travail en équipe distribuée","design Figma"],
  },

  lmp: {
    role: "Junior Product Manager — Alternance",
    period: "Septembre 2024 – Août 2026",
    intro: `À la Mutuelle Les Ménages Prévoyants, j'ai occupé un poste de junior product manager aux missions variées, entre création de nouveaux produits, suivi de la performance commerciale et garantie de la conformité réglementaire.`,
    missions: [
      "Conception de nouveaux produits destinés à la commercialisation",
      "Suivi des KPI de vente des produits déjà en place",
      "Rédaction et gestion du cahier de recettes de l'application",
      "Collaboration avec les partenaires pour garantir le bon fonctionnement des applications",
      "Veille au respect des règles réglementaires propres au secteur mutualiste sur les points digitaux, de produits, et de services",
    ],
    highlight: {
      title: "Une approche produit complète",
      text: `Tout au long de ces missions, j'ai mené des benchmarks, animé des ateliers, assuré le suivi de produits, analysé des demandes clients, réalisé des études concurrentielles qualitatives et quantitatives, et travaillé sur des éléments de prévision budgétaire . J'ai donc eue à avoir une vision transverse du métier de product manager.`,
    },
    skills: ["Product Management", "Benchmark", "Analyse concurrentielle", "Prévision budgétaire", "Conformité mutualiste"],
  },
};

export default function Experience() {
  const [tab, setTab] = useState<ExpId>("suitus");
  const data = experiences[tab];

  return (
    <div className="space-y-6">
      {/* Tab controller */}
      <div className="flex border-b border-slate-200 gap-1">
        {expTabs.map((t) => (
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
          {/* Bloc principal : rôle + missions */}
          <section className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-4 md:col-span-2">
            <div className="mb-3">
              <h3 className="font-extrabold text-blue-950">{data.role}</h3>
              {data.period && (
                <p className="text-xs font-bold text-slate-500">{data.period}</p>
              )}
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">{data.intro}</p>

            <h3 className="mt-4 mb-1 font-extrabold text-blue-950">Missions</h3>
            <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
              {data.missions.map((m: string, i: number) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          </section>

          {/* Bloc latéral : temps fort + compétences */}
          <aside className="space-y-3">
            <div className="rounded-2xl border-2 border-orange-200 bg-orange-50 p-4">
              <p className="font-extrabold text-orange-700 text-sm mb-2">
                {data.highlight.title}
              </p>
              <p className="text-xs text-slate-700 leading-relaxed">
                {data.highlight.text}
              </p>
            </div>

            <div className="rounded-2xl border-2 border-blue-200 bg-blue-50 p-4">
              <p className="font-extrabold text-blue-900 text-sm mb-2">Compétences mobilisées</p>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((s: string) => (
                  <span
                    key={s}
                    className="rounded-full bg-white border border-blue-200 px-3 py-1 text-xs font-bold text-blue-900"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}