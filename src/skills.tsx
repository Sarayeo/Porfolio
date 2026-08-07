"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const tabs = [
  { id: "hard", label: "Compétences techniques" },
  { id: "product", label: "Produit" },
  { id: "soft", label: "Soft skills" },
] as const;

const tools = [
  { name: "Jira", logo: "/images/logos/jira.png", description: "Gestion de backlog, reports, suivi produit, tickets" },
  { name: "Figma", logo: "/images/logos/figma.png", description: "Design d'interfaces, prototypage, design systems" },
  { name: "ClickUp", logo: "/images/logos/clickup.jpg", description: "Gestion de backlog, sprints, suivi produit" },
  { name: "Mysql", logo: "/images/logos/mysql.png", description: "Gestion de base de données relationnelle, requêtes SQL" },
  { name: "Wordpress", logo: "/images/logos/wordpress.png", description: "création de sites web, gestion de contenu, plugins" },
  { name: "React", logo: "/images/logos/react.png", description: "Développement d'applications web, composants, gestion d'état" },
  { name: "Office 365", logo: "/images/logos/office365.jpg", description: "Productivité, collaboration, gestion de contenu" },
  { name: "Notion", logo: "/images/logos/notion.png", description: "Documentation, PRD, collaboration produit" },
  { name: "Trello", logo: "/images/logos/trello.png", description: "Gestion de backlog, sprints, suivi produit" },
];

// Badge réutilisable
type Certification = {
  name: string;
  issuer: string;
  logo?: string;
  href?: string;
};

function CertificationBadge({ cert }: { cert: Certification }) {
  const content = (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="flex items-center gap-3 rounded-xl border-2 border-amber-300 bg-amber-50 px-3 py-2.5 shadow-sm"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-amber-400 bg-white text-base">
        🏅
      </div>
      <div className="min-w-0">
        <p className="text-xs font-extrabold text-amber-900 leading-tight truncate">
          {cert.name}
        </p>
        <p className="text-[11px] font-bold text-amber-700 leading-tight">
          {cert.issuer}
        </p>
      </div>
    </motion.div>
  );

  return cert.href ? (
    <a href={cert.href} target="_blank" rel="noopener noreferrer" className="block">
      {content}
    </a>
  ) : (
    content
  );
}

function CertificationsBlock({ certs }: { certs: Certification[] }) {
  return (
    <div className="mt-6 pt-4 border-t-2 border-dashed border-slate-200">
      <h3 className="mb-3 font-extrabold text-blue-950">Certifications</h3>
      <div className="grid gap-2 sm:grid-cols-2">
        {certs.map((c) => (
          <CertificationBadge key={c.name} cert={c} />
        ))}
      </div>
    </div>
  );
}

// Données des certifications
const productCerts: Certification[] = [
  { name: "Scrum", issuer: "Certification Scrum", href: "https://www.credly.com/badges/466adb64-95ea-4a18-80dc-bb66665b6be7/linked_in_profile" },
  { name: "Opquast", issuer: "Certification Opquast", href: "https://directory.opquast.com/fr/certificat/N6DF3B/" },
];

const softCerts: Certification[] = [
  { name: "Design Thinking", issuer: "Attestation Design Thinking", href: "https://www.smartcertificate.com/SmartDiplomas/?JHyeiaxgSnA7vn1h%2bc2Z9RzGJK%2f0EDDEfMpZIVYcGSQNw1CcUh3GagLhkDpkwuT%2b#/" },
];

export default function Skills() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("hard");
  const [activeTool, setActiveTool] = useState<(typeof tools)[number] | null>(null);

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 font-bold text-sm rounded-t-xl transition-all duration-200 -mb-px border-2 border-b-0 ${
              tab === t.id
                ? "border-blue-900 bg-blue-900 text-white shadow-sm"
                : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="grid gap-4 md:grid-cols-3"
        >
          {/* CONTENU PRINCIPAL */}
          <section className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-5 md:col-span-2">
            {tab === "hard" && (
              <>
                <h3 className="mb-3 font-extrabold text-blue-950">Compétences techniques</h3>

                <ul className="text-sm text-slate-700 space-y-1 mb-6">
                  <li>Analyse produit & interprétation de données</li>
                  <li>UX/UI design & prototypage</li>
                  <li>Expérimentation (A/B testing)</li>
                  <li>Outils agiles & delivery produit</li>
                </ul>

                <h3 className="mb-3 font-extrabold text-blue-950">Outils utilisés</h3>

                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                  {tools.map((tool) => {
                    const isActive = activeTool?.name === tool.name;
                    return (
                      <motion.button
                        key={tool.name}
                        onClick={() => setActiveTool(tool)}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex flex-col items-center justify-center rounded-xl p-3 border transition-all ${
                          isActive
                            ? "bg-blue-100 border-blue-400 shadow-sm"
                            : "bg-white border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <img src={tool.logo} alt={tool.name} className="h-10 w-10 object-contain mb-2" />
                        <span className="text-xs font-medium text-slate-700">{tool.name}</span>
                      </motion.button>
                    );
                  })}
                </div>

                <AnimatePresence>
                  {activeTool && (
                    <motion.div
                      key={activeTool.name}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-3 text-sm text-blue-900"
                    >
                      <strong>{activeTool.name}</strong> — {activeTool.description}
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}

            {tab === "product" && (
              <>
                <h3 className="mb-3 font-extrabold text-blue-950">Approche produit</h3>

                <ul className="text-sm text-slate-700 space-y-2">
                  <li>Recherche utilisateur & entretiens</li>
                  <li>Priorisation (RICE, impact vs effort)</li>
                  <li>Roadmap & définition de MVP</li>
                  <li>Prise de décision orientée données</li>
                </ul>

                <CertificationsBlock certs={productCerts} />
              </>
            )}

            {tab === "soft" && (
              <>
                <h3 className="mb-3 font-extrabold text-blue-950">Soft skills</h3>

                <ul className="text-sm text-slate-700 space-y-2">
                  <li>Communication claire et structurée</li>
                  <li>Alignement des parties prenantes</li>
                  <li>Esprit analytique & résolution de problèmes</li>
                  <li>Autonomie & adaptabilité</li>
                </ul>

                <CertificationsBlock certs={softCerts} />
              </>
            )}
          </section>

          {/* SIDEBAR */}
          <aside className="space-y-3">
            <div className="rounded-2xl border-2 border-blue-200 bg-linear-to-br from-blue-50 to-white p-4">
              <p className="font-extrabold text-blue-900 text-sm mb-2">Profil</p>
              <ul className="text-xs font-bold space-y-1 text-slate-700">
                <li>Vision produit orientée utilisateur</li>
                <li>Fort mix UX + data</li>
                <li>Exécution rapide et structurée</li>
              </ul>
            </div>

            <div className="rounded-xl border p-3 text-xs text-slate-600 bg-white">
              Je conçois des produits en reliant besoins utilisateurs,
              enjeux business et données avec les fonctionnalités.
            </div>
          </aside>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}