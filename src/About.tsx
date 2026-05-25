"use client";

export default function About() {
  return (
    <div className="space-y-6 text-slate-800 font-medium">
      {/* Bio Card Section */}
      <section className="rounded-2xl border-4 border-slate-900 bg-white p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">👋</span>
          <h3 className="text-xl font-black text-slate-900 uppercase tracking-wide">Hello World</h3>
        </div>
        
        <p className="leading-relaxed text-sm md:text-base text-slate-700">
          Product Manager / Product Owner avec une approche résolument orientée <span className="bg-sky-200 px-1 py-0.5 rounded font-bold text-slate-900">impact, discovery et delivery</span>. 
          Mon super-pouvoir ? Transformer le flou artistique des besoins utilisateurs en fonctionnalités claires, testables et hautement mesurables. 
          Je crée des ponts solides entre la vision business, la data et les équipes de dev pour maximiser la valeur à chaque sprint.
        </p>

        {/* Quick Tags Line */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t-2 border-dashed border-slate-200">
          <span className="text-xs bg-slate-100 border border-slate-300 text-slate-700 px-2.5 py-1 rounded-md font-bold">#UserCentric</span>
          <span className="text-xs bg-slate-100 border border-slate-300 text-slate-700 px-2.5 py-1 rounded-md font-bold">#DataDriven</span>
          <span className="text-xs bg-slate-100 border border-slate-300 text-slate-700 px-2.5 py-1 rounded-md font-bold">#AgileMindset</span>
        </div>
      </section>

      {/* Core Pillars Neo-Brutalist Grid */}
      <section className="grid gap-4 sm:grid-cols-3">
        {/* Pillar 1 */}
        <div className="rounded-2xl border-4 border-slate-900 bg-sky-100 p-4 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] -rotate-1 hover:rotate-0 transition-transform">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1 bg-white rounded-md border border-slate-900 text-xs">🎯</span>
            <p className="text-sm font-black uppercase tracking-wider text-slate-900">Focus</p>
          </div>
          <p className="text-xs md:text-sm text-slate-800 leading-relaxed">
            Discovery continu, priorisation stratégique, gestion de roadmap macro & micro et alignement des OKR.
          </p>
        </div>

        {/* Pillar 2 */}
        <div className="rounded-2xl border-4 border-slate-900 bg-emerald-100 p-4 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] rotate-1 hover:rotate-0 transition-transform">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1 bg-white rounded-md border border-slate-900 text-xs">🛠️</span>
            <p className="text-sm font-black uppercase tracking-wider text-slate-900">Méthodes</p>
          </div>
          <p className="text-xs md:text-sm text-slate-800 leading-relaxed">
            Framework Scrum, priorisation RICE / ICE, Design Sprint, A/B Testing, Product Analytics.
          </p>
        </div>

        {/* Pillar 3 */}
        <div className="rounded-2xl border-4 border-slate-900 bg-amber-100 p-4 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] -rotate-1 hover:rotate-0 transition-transform">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1 bg-white rounded-md border border-slate-900 text-xs">🚀</span>
            <p className="text-sm font-black uppercase tracking-wider text-slate-900">Objectif</p>
          </div>
          <p className="text-xs md:text-sm text-slate-800 leading-relaxed">
            Concevoir et délivrer des expériences produits qui sont à la fois utiles, utilisables et viables.
          </p>
        </div>
      </section>

      {/* Philosophy Banner Footer */}
      <section className="rounded-2xl border-4 border-slate-900 bg-rose-100 p-4 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] text-center">
        <p className="text-xs md:text-sm font-bold text-slate-900">
          "Pas de feature sans metric, pas de metric sans apprentissage."
        </p>
      </section>
    </div>
  );
}