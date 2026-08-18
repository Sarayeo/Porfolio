"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { translations, type Language } from "./Translations";

type ExpId = "suitus" | "bpce" | "lmp";

type ExperienceProps = {
  language: Language;
};

export default function Experience({ language }: ExperienceProps) {
  const [tab, setTab] = useState<ExpId>("suitus");

  const t = translations[language].experience;
  const data = t.entries[tab];

  const expTabs = [
    { id: "suitus" as const, label: t.tabs.suitus },
    { id: "bpce" as const, label: t.tabs.bpce },
    { id: "lmp" as const, label: t.tabs.lmp },
  ];

  return (
    <div className="space-y-6">
      <div className="flex border-b border-slate-200 gap-1">
        {expTabs.map((item) => (
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
          key={tab}
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -8, opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="grid gap-4 md:grid-cols-3"
        >
          <section className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-4 md:col-span-2">
            <div className="mb-3">
              <h3 className="font-extrabold text-blue-950">{data.role}</h3>
              <p className="text-xs font-bold text-slate-500">{data.period}</p>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              {data.intro}
            </p>

            <h3 className="mt-4 mb-1 font-extrabold text-blue-950">
              {t.missionsTitle}
            </h3>

            <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
              {data.missions.map((mission, i) => (
                <li key={i}>{mission}</li>
              ))}
            </ul>
          </section>

          <aside className="space-y-3">
            <div className="rounded-2xl border-2 border-orange-200 bg-orange-50 p-4">
              <p className="font-extrabold text-orange-700 text-sm mb-2">
                {data.highlightTitle}
              </p>

              <p className="text-xs text-slate-700 leading-relaxed">
                {data.highlightText}
              </p>
            </div>

            <div className="rounded-2xl border-2 border-blue-200 bg-blue-50 p-4">
              <p className="font-extrabold text-blue-900 text-sm mb-2">
                {t.skillsTitle}
              </p>

              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-white border border-blue-200 px-3 py-1 text-xs font-bold text-blue-900"
                  >
                    {skill}
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
