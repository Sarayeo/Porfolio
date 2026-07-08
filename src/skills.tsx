"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const tabs = [
  { id: "hard", label: "Compétences techniques" },
  { id: "product", label: "Produit" },
  { id: "soft", label: "Soft skills" },
] as const;

const tools = [
  {
    name: "Figma",
    logo: "/logos/figma.svg",
    description: "Design d’interfaces, prototypage, design systems",
  },
  {
    name: "Amplitude",
    logo: "/logos/amplitude.svg",
    description: "Analyse produit, funnels, rétention",
  },
  {
    name: "Notion",
    logo: "/logos/notion.svg",
    description: "Documentation, PRD, collaboration produit",
  },
  {
    name: "Jira",
    logo: "/logos/jira.svg",
    description: "Gestion de backlog, sprints, suivi produit",
  },
  {
    name: "Mixpanel",
    logo: "/logos/mixpanel.svg",
    description: "Tracking événementiel, analyse comportementale",
  },
  {
    name: "Slack",
    logo: "/logos/slack.svg",
    description: "Communication équipe & coordination",
  },
];

export default function Skills() {
  const [tab, setTab] = useState<typeof tabs[number]["id"]>("hard");
  const [activeTool, setActiveTool] = useState<(typeof tools)[number] | null>(
    null
  );

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 font-bold text-sm rounded-t-xl transition-all duration-200 -mb-[1px] border-2 border-b-0 ${
              tab === t.id
                ? "border-blue-900 bg-blue-900 text-white shadow-sm"
                : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="grid gap-4 md:grid-cols-3"
        >
          {/* CONTENU PRINCIPAL */}
          <section className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-5 md:col-span-2">
            {tab === "hard" && (
              <>
                <h3 className="mb-3 font-extrabold text-blue-950">
                  Compétences techniques
                </h3>

                <ul className="text-sm text-slate-700 space-y-1 mb-6">
                  <li>Analyse produit & interprétation de données</li>
                  <li>UX/UI design & prototypage</li>
                  <li>Expérimentation (A/B testing)</li>
                  <li>Outils agiles & delivery produit</li>
                </ul>

                <h3 className="mb-3 font-extrabold text-blue-950">
                  Outils utilisés
                </h3>

                {/* GRID LOGOS */}
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                  {tools.map((tool) => {
                    const isActive = activeTool?.name === tool.name;

                    return (
                      <motion.button
                        key={tool.name}
                        onClick={() => setActiveTool(tool)}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex flex-col items-center justify-center rounded-xl p-3 border transition-all ${
                          isActive
                            ? "bg-blue-100 border-blue-400 shadow-sm"
                            : "bg-white border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <img
                          src={tool.logo}
                          alt={tool.name}
                          className="h-10 w-10 object-contain mb-2"
                        />

                        <span className="text-xs font-medium text-slate-700">
                          {tool.name}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                {/* DÉTAIL OUTIL */}
                <AnimatePresence>
                  {activeTool && (
                    <motion.div
                      key={activeTool.name}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-3 text-sm text-blue-900"
                    >
                      <strong>{activeTool.name}</strong> —{" "}
                      {activeTool.description}
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}

            {tab === "product" && (
              <>
                <h3 className="mb-3 font-extrabold text-blue-950">
                  Approche produit
                </h3>

                <ul className="text-sm text-slate-700 space-y-2">
                  <li>Recherche utilisateur & entretiens</li>
                  <li>Priorisation (RICE, impact vs effort)</li>
                  <li>Roadmap & définition de MVP</li>
                  <li>Prise de décision orientée données</li>
                </ul>
              </>
            )}

            {tab === "soft" && (
              <>
                <h3 className="mb-3 font-extrabold text-blue-950">
                  Soft skills
                </h3>

                <ul className="text-sm text-slate-700 space-y-2">
                  <li>Communication claire et structurée</li>
                  <li>Alignement des parties prenantes</li>
                  <li>Esprit analytique & résolution de problèmes</li>
                  <li>Autonomie & adaptabilité</li>
                </ul>
              </>
            )}
          </section>

          {/* SIDEBAR */}
          <aside className="space-y-3">
            <div className="rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white p-4">
              <p className="font-extrabold text-blue-900 text-sm mb-2">
                Profil
              </p>

              <ul className="text-xs font-bold space-y-1 text-slate-700">
                <li>Vision produit orientée utilisateur</li>
                <li>Fort mix UX + data</li>
                <li>Exécution rapide et structurée</li>
              </ul>
            </div>

            <div className="rounded-xl border p-3 text-xs text-slate-600 bg-white">
              Je conçois des produits en reliant besoins utilisateurs,
              enjeux business et données — pas seulement des fonctionnalités.
            </div>
          </aside>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
