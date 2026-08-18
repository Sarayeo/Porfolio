"use client";

export default function Contact() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h3 className="text-lg font-bold text-slate-900">Contact</h3>
        <p className="mt-2 text-slate-700">
          Disponible pour un poste, un échange réseau ou
          une discussion autour d’un projet.
        </p>

        <div className="mt-4 space-y-3 text-sm text-slate-700">
          <p>Email: yeokpeusseusarafiela@gmail.com</p>
          <p>LinkedIn: linkedin.com/in/sara-kp-yeo</p>
          <p>Localisation: France</p>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h3 className="text-lg font-bold text-slate-900">actions rapides</h3>

        <div className="mt-4 flex flex-col gap-3">
          <a
            href="mailto:yeokpeusseusarafiela@gmail.com"
            className="rounded-2xl bg-blue-500 px-4 py-3 text-center font-semibold text-white transition hover:bg-blue-600"
          >
            Envoyer un email
          </a>

          <a
            href="https://www.linkedin.com/in/sara-kp-yeo/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-center font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Voir LinkedIn
          </a>
        </div>
      </section>
    </div>
  );
}