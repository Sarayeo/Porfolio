"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const tabs = [
  { id: "hard", label: "BLOOP" },
  { id: "product", label: "KIRBDEN" },
  { id: "soft", label: "LEON'ART" },
] as const;

export default function CaseStudies() {
  const [tab, setTab] = useState<typeof tabs[number]["id"]>("onboarding");

  return (
    <div className="space-y-6">
      {/* Dynamic Tab Controller Row */}
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
          <section className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-4 md:col-span-2">
            <h3 className="mb-1 font-extrabold text-blue-950">Contexte</h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              création application MAO (musique assistée par ordinateur). 
              Objectif: 17000 Utilisateurs à N+3 du lancement. 
              Contraintes:
              Géants du marché très présents, terrain inconu autour des licences musicales , droit d'auteurs et soucis de gestion du stockage.
            </p>

            <h3 className="mt-4 mb-1 font-extrabold text-blue-950">Process</h3>
            <ol className="list-decimal space-y-1 pl-5 text-sm text-slate-700">
              <li>Discovery: 15 interviews, funnel analytics (Amplitude)</li>
              <li>Priorisation: RICE (top 3 opportunités)</li>
              <li>Expérimentation: A/B, smoke tests</li>
              <li>Delivery: 3 sprints, release pilot</li>
            </ol>
          </section>

          <aside className="space-y-3">
            <div className="rounded-2xl border-2 border-blue-200 bg-blue-50 p-4">
              <p className="font-extrabold text-blue-900 text-sm mb-2">KPIs Impact</p>
              <ul className="text-xs font-bold space-y-1 text-slate-700">
                <li className="flex justify-between"><span>Activation:</span> <span className="text-emerald-600">+18%</span></li>
                <li className="flex justify-between"><span>TTV:</span> <span className="text-emerald-600">−22%</span></li>
                <li className="flex justify-between"><span>NPS:</span> <span className="text-emerald-600">+12 pts</span></li>
              </ul>
            </div>

            <a
              className="inline-block w-full rounded-xl bg-orange-500 px-4 py-2.5 text-center text-sm font-bold text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-orange-600 transition"
              href="/docs/PRD_onboarding.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Télécharger le PRD
            </a>
          </aside>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}