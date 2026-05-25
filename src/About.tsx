"use client";

export default function About() {
  return (
    <div className="space-y-4 text-slate-700">
      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h3 className="text-lg font-bold text-slate-900">About me</h3>
        <p className="mt-2 leading-7">
          Product Manager / Product Owner avec une approche orientée impact,
          discovery et delivery. J’aime transformer des besoins flous en
          produits clairs, testables et mesurables.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-sky-200 bg-sky-100 p-4">
          <p className="text-sm font-semibold text-slate-900">Focus</p>
          <p className="mt-1 text-sm">Discovery, priorisation, roadmap, KPI</p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-100 p-4">
          <p className="text-sm font-semibold text-slate-900">Méthodes</p>
          <p className="mt-1 text-sm">Agile, RICE, A/B test, analytics</p>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-100 p-4">
          <p className="text-sm font-semibold text-slate-900">Objectif</p>
          <p className="mt-1 text-sm">Créer des expériences utiles et viables</p>
        </div>
      </section>
    </div>
  );
}