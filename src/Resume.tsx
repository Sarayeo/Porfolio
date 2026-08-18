"use client";

import { motion } from "framer-motion";
import { translations, type Language } from "./translations";

type ResumeProps = {
  language: Language;
};

export default function Resume({ language }: ResumeProps) {
  const t = translations[language].resume;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="w-full h-full overflow-y-auto bg-white p-6 md:p-8 font-sans"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 border-b pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">
            Sara Fiéla Yeo
          </h1>

          <p className="text-indigo-600 font-bold text-sm mt-1">
            Product Owner / Product Manager
          </p>
        </div>

        <a
          href="/CV-YEO-Sara-PO-PM- 2026.pdf"
          download
          className="mt-4 md:mt-0 inline-block bg-indigo-900 text-white px-4 py-2 rounded-lg border-2 border-slate-900 text-xs font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-indigo-800 transition cursor-pointer"
        >
          {t.download}
        </a>
      </div>

      <section className="mb-6">
        <h2 className="text-xs font-black uppercase text-slate-500 mb-2">
          {t.profileTitle}
        </h2>

        <p className="text-sm text-slate-800 leading-relaxed">
          {t.profile}
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xs font-black uppercase text-slate-500 mb-3">
          {t.experienceTitle}
        </h2>

        <div className="space-y-4">
          {t.experienceEntries.map((entry) => (
            <div key={entry.role}>
              <p className="font-bold text-sm">{entry.role}</p>
              <p className="text-xs text-slate-500">{entry.period}</p>

              <ul className="text-sm text-slate-800 mt-1 list-disc ml-4">
                {entry.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-xs font-black uppercase text-slate-500 mb-3">
          {t.skillsTitle}
        </h2>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-bold">{t.product}</p>
            <p className="text-slate-700">{t.productSkills}</p>
          </div>

          <div>
            <p className="font-bold">{t.technical}</p>
            <p className="text-slate-700">{t.technicalSkills}</p>
          </div>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-xs font-black uppercase text-slate-500 mb-3">
          {t.educationTitle}
        </h2>

        <p className="text-sm text-slate-800">{t.education}</p>
      </section>

      <div className="text-xs text-slate-400 mt-8">
        📍 {t.footerLocation} ·{" "}
        <a href="mailto:yeokpeusseusarafiela@gmail.com">
          📧 yeokpeusseusarafiela@gmail.com
        </a>
      </div>
    </motion.div>
  );
}
