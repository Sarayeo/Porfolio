"use client";

import { motion } from "framer-motion";

export default function Resume() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="w-full h-full overflow-y-auto bg-white p-6 md:p-8 font-sans"
    >
      {/* HEADER */}
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
          href="/CV-Sara-Yeo.pdf"
          download
          className="mt-4 md:mt-0 inline-block bg-indigo-900 text-white px-4 py-2 rounded-lg border-2 border-slate-900 text-xs font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-indigo-800 transition"
        >
           Télécharger le CV
        </a>
      </div>

      {/* SUMMARY */}
      <section className="mb-6">
        <h2 className="text-xs font-black uppercase text-slate-500 mb-2">
          Profil
        </h2>
        <p className="text-sm text-slate-800 leading-relaxed">
          Cheffe de produit junior spécialisée en produits digitaux, avec une
          forte appétence pour la transformation digitale. Expérience en cadrage
          d’offres, analyse des besoins métiers et pilotage de projets web &
          mobiles en environnement agile.
        </p>
      </section>

      {/* EXPERIENCE */}
      <section className="mb-6">
        <h2 className="text-xs font-black uppercase text-slate-500 mb-3">
          Expérience
        </h2>

        <div className="space-y-4">
          <div>
            <p className="font-bold text-sm">
              Cheffe de Produit Junior – LMP Mutuelle
            </p>
            <p className="text-xs text-slate-500">2024 – présent</p>
            <ul className="text-sm text-slate-800 mt-1 list-disc ml-4">
              <li>Pilotage des offres produits et roadmap</li>
              <li>Réduction des coûts globaux (~3%)</li>
              <li>Amélioration usage mobile (+4%)</li>
            </ul>
          </div>

          <div>
            <p className="font-bold text-sm">
              Développeuse No-Code – Groupe BPCE
            </p>
            <p className="text-xs text-slate-500">2023 – 2024</p>
            <ul className="text-sm text-slate-800 mt-1 list-disc ml-4">
              <li>Développement Power Platform</li>
              <li>Optimisation environnement interne</li>
            </ul>
          </div>

          <div>
            <p className="font-bold text-sm">
              Développeuse Frontend React – Suit Us
            </p>
            <p className="text-xs text-slate-500">2023</p>
            <ul className="text-sm text-slate-800 mt-1 list-disc ml-4">
              <li>Intégration React Native</li>
              <li>Réduction incidents sécurité (~85%)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="mb-6">
        <h2 className="text-xs font-black uppercase text-slate-500 mb-3">
          Compétences
        </h2>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-bold">Product</p>
            <p className="text-slate-700">
              Agile, Roadmap, Discovery, Analyse besoins
            </p>
          </div>

          <div>
            <p className="font-bold">Tech</p>
            <p className="text-slate-700">
              React, SQL, APIs, Figma, Jira
            </p>
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section className="mb-6">
        <h2 className="text-xs font-black uppercase text-slate-500 mb-3">
          Formation
        </h2>

        <p className="text-sm text-slate-800">
          Mastère Management Transformation Digitale – ESILV & IIM (2024–2026)
        </p>
        
      </section>

      {/* FOOTER */}
      <div className="text-xs text-slate-400 mt-8">
        📍 France · 📧 yeokpeusseusarafiela@gmail.com
      </div>
    </motion.div>
  );
}
