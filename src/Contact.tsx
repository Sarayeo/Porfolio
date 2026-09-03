"use client";

import { translations, type Language } from "./translations";
import { careerProfiles, type CareerProfile } from "./careerProfiles";

type ContactProps = {
  language: Language;
  profile: CareerProfile;
};

export default function Contact({ language, profile }: ContactProps) {
  const t = translations[language].contact;
  const profileCopy = careerProfiles[language][profile];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <section className="retro-hover rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
        <h3 className="text-lg font-bold text-slate-900">{t.title}</h3>

        <div
          className={`mt-3 inline-flex rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-wide select-none ${
            profile === "product"
              ? "border-indigo-200 bg-indigo-50 text-indigo-800"
              : "border-teal-200 bg-teal-50 text-teal-800"
          }`}
        >
          {language === "fr" ? "Recherche active" : "Actively looking"}
        </div>

        <p className="mt-3 text-slate-700">{profileCopy.contactDescription}</p>

        <div className="mt-4 space-y-3 text-sm text-slate-700">
          <p>
            {t.emailLabel}:{" "}
            <a className="break-all font-semibold text-indigo-800 hover:underline" href="mailto:yeokpeusseusarafiela@gmail.com">
              yeokpeusseusarafiela@gmail.com
            </a>
          </p>
          <p>
            {t.linkedinLabel}:{" "}
            <a
              className="break-all font-semibold text-indigo-800 hover:underline"
              href="https://www.linkedin.com/in/sara-kp-yeo/"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin.com/in/sara-kp-yeo
            </a>
          </p>
          <p>
            {t.locationLabel}: {t.location}
          </p>
        </div>
      </section>

      <section className="retro-hover rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
        <h3 className="text-lg font-bold text-slate-900">
          {t.quickActions}
        </h3>

        <div className="mt-4 flex flex-col gap-3">
          <a
            href="mailto:yeokpeusseusarafiela@gmail.com"
            className="retro-link rounded-2xl bg-blue-500 px-4 py-3 text-center font-semibold text-white transition hover:bg-blue-600"
          >
            {t.sendEmail}
          </a>

          <a
            href="https://www.linkedin.com/in/sara-kp-yeo/"
            target="_blank"
            rel="noopener noreferrer"
            className="retro-link rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-center font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            {t.viewLinkedin}
          </a>
        </div>
      </section>
    </div>
  );
}
