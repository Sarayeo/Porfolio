"use client";

import { motion } from "framer-motion";
import { translations, type Language } from "./translations";
import { careerProfiles, type CareerProfile } from "./careerProfiles";

type ResumeProps = {
  language: Language;
  profile: CareerProfile;
};

export default function Resume({ language, profile }: ResumeProps) {
  const t = translations[language].resume;
  const profileCopy = careerProfiles[language][profile];
  const resume = profileCopy.resume;
  const accentButton =
    profile === "product"
      ? "bg-indigo-900 hover:bg-indigo-800"
      : "bg-teal-700 hover:bg-teal-800";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="w-full bg-white p-3 sm:p-6 md:p-8 font-sans"
    >
      <div className="flex flex-col gap-4 mb-6 border-b pb-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">
            Sara Fiéla Yeo
          </h1>

          <p
            className={`font-bold text-sm mt-1 ${
              profile === "product" ? "text-indigo-600" : "text-teal-700"
            }`}
          >
            {profileCopy.role}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <a
            href={resume.cvFr}
            download
            className={`retro-link inline-block text-white px-3 sm:px-4 py-2 rounded-lg border-2 border-slate-900 text-xs font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition cursor-pointer ${accentButton}`}
          >
            {t.downloadf}
          </a>
          <a
            href={resume.cvEn}
            download
            className={`retro-link inline-block text-white px-3 sm:px-4 py-2 rounded-lg border-2 border-slate-900 text-xs font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition cursor-pointer ${accentButton}`}
          >
            {t.downloade}
          </a>
        </div>
      </div>

      <section className="mb-6">
        <h2 className="text-xs font-black uppercase text-slate-500 mb-2">
          {t.profileTitle}
        </h2>

        <p className="text-sm text-slate-800 leading-relaxed">
          {resume.profile}
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xs font-black uppercase text-slate-500 mb-3">
          {t.experienceTitle}
        </h2>

        <div className="space-y-4">
          {resume.experienceEntries.map((entry) => (
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-bold">{resume.focusLabel}</p>
            <p className="text-slate-700">{resume.focusSkills}</p>
          </div>

          <div>
            <p className="font-bold">{t.technical}</p>
            <p className="text-slate-700">{resume.technicalSkills}</p>
          </div>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-xs font-black uppercase text-slate-500 mb-3">
          {t.educationTitle}
        </h2>

        <div className="grid gap-3 sm:grid-cols-2">
          {resume.education.map((education) => (
            <div
              key={education.degree}
              className={`rounded-xl border-2 p-3 ${
                profile === "product"
                  ? "border-indigo-100 bg-indigo-50"
                  : "border-teal-100 bg-teal-50"
              }`}
            >
              <p className="text-sm font-black text-slate-900">
                {education.degree}
              </p>
              <p className="mt-1 text-xs font-bold text-slate-600">
                {education.school} · {education.period}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="text-xs text-slate-400 mt-8">
        📍 {t.footerLocation} ·{" "}
        <a className="break-all hover:text-indigo-700" href="mailto:yeokpeusseusarafiela@gmail.com">
          📧 yeokpeusseusarafiela@gmail.com
        </a>
      </div>
    </motion.div>
  );
}
