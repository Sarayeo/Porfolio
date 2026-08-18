"use client";

import { translations, type Language } from "./Translations";

type ContactProps = {
  language: Language;
};

export default function Contact({ language }: ContactProps) {
  const t = translations[language].contact;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h3 className="text-lg font-bold text-slate-900">{t.title}</h3>

        <p className="mt-2 text-slate-700">{t.description}</p>

        <div className="mt-4 space-y-3 text-sm text-slate-700">
          <p>
            {t.emailLabel}: yeokpeusseusarafiela@gmail.com
          </p>
          <p>
            {t.linkedinLabel}: linkedin.com/in/sara-kp-yeo
          </p>
          <p>
            {t.locationLabel}: {t.location}
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h3 className="text-lg font-bold text-slate-900">
          {t.quickActions}
        </h3>

        <div className="mt-4 flex flex-col gap-3">
          <a
            href="mailto:yeokpeusseusarafiela@gmail.com"
            className="rounded-2xl bg-blue-500 px-4 py-3 text-center font-semibold text-white transition hover:bg-blue-600"
          >
            {t.sendEmail}
          </a>

          <a
            href="https://www.linkedin.com/in/sara-kp-yeo/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-center font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            {t.viewLinkedin}
          </a>
        </div>
      </section>
    </div>
  );
}
