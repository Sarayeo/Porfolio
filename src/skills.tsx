"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { translations, type Language } from "./translations";

type TabId = "hard" | "product" | "soft";

type SkillsProps = {
  language: Language;
};

type Certification = {
  name: string;
  issuer: string;
  href?: string;
};

const tools = [
  { name: "Jira", logo: "/images/logos/jira.png" },
  { name: "Figma", logo: "/images/logos/figma.png" },
  { name: "ClickUp", logo: "/images/logos/clickup.jpg" },
  { name: "Mysql", logo: "/images/logos/mysql.png" },
  { name: "Wordpress", logo: "/images/logos/wordpress.png" },
  { name: "React", logo: "/images/logos/react.png" },
  { name: "Office 365", logo: "/images/logos/office365.jpg" },
  { name: "Notion", logo: "/images/logos/notion.png" },
  { name: "Trello", logo: "/images/logos/trello.png" },
];

const productCertLinks = [
  {
    name: "Scrum",
    key: "scrum",
    href: "https://www.credly.com/badges/466adb64-95ea-4a18-80dc-bb66665b6be7/linked_in_profile",
  },
  {
    name: "Opquast",
    key: "opquast",
    href: "https://directory.opquast.com/fr/certificat/N6DF3B/",
  },
];

const softCertLinks = [
  {
    name: "Design Thinking",
    key: "designThinking",
    href: "https://www.smartcertificate.com/SmartDiplomas/?JHyeiaxgSnA7vn1h%2bc2Z9RzGJK%2f0EDDEfMpZIVYcGSQNw1CcUh3GagLhkDpkwuT%2b#/",
  },
];

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
    <a
      href={cert.href}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      {content}
    </a>
  ) : (
    content
  );
}

function CertificationsBlock({
  certs,
  title,
}: {
  certs: Certification[];
  title: string;
}) {
  return (
    <div className="mt-6 pt-4 border-t-2 border-dashed border-slate-200">
      <h3 className="mb-3 font-extrabold text-blue-950">{title}</h3>

      <div className="grid gap-2 sm:grid-cols-2">
        {certs.map((cert) => (
          <CertificationBadge key={cert.name} cert={cert} />
        ))}
      </div>
    </div>
  );
}

export default function Skills({ language }: SkillsProps) {
  const [tab, setTab] = useState<TabId>("hard");
  const [activeTool, setActiveTool] = useState<
    (typeof tools)[number] | null
  >(null);

  const t = translations[language].skills;

  const tabs = [
    { id: "hard" as const, label: t.tabs.hard },
    { id: "product" as const, label: t.tabs.product },
    { id: "soft" as const, label: t.tabs.soft },
  ];

  const productCerts: Certification[] = productCertLinks.map((cert) => ({
    name: cert.name,
    issuer:
      t.certIssuers[cert.key as keyof typeof t.certIssuers],
    href: cert.href,
  }));

  const softCerts: Certification[] = softCertLinks.map((cert) => ({
    name: cert.name,
    issuer:
      t.certIssuers[cert.key as keyof typeof t.certIssuers],
    href: cert.href,
  }));

  return (
    <div className="space-y-6">
      <div className="flex border-b border-slate-200 gap-1">
        {tabs.map((item) => (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            className={`px-4 py-2 font-bold text-sm rounded-t-xl transition-all duration-200 -mb-px border-2 border-b-0 ${
              tab === item.id
                ? "border-blue-900 bg-blue-900 text-white shadow-sm"
                : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${language}-${tab}`}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="grid gap-4 md:grid-cols-3"
        >
          <section className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-5 md:col-span-2">
            {tab === "hard" && (
              <>
                <h3 className="mb-3 font-extrabold text-blue-950">
                  {t.hardTitle}
                </h3>

                <ul className="text-sm text-slate-700 space-y-1 mb-6">
                  {t.hardList.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <h3 className="mb-3 font-extrabold text-blue-950">
                  {t.toolsTitle}
                </h3>

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
                        <img
                          src={tool.logo}
                          alt={tool.name}
                          className="h-10 w-10 object-contain mb-2"
                        />

                        <span className="text-xs font-medium text-slate-700">
                          {tool.name}
                        </span>
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
                      <strong>{activeTool.name}</strong> —{" "}
                      {
                        t.toolDescriptions[
                          activeTool.name as keyof typeof t.toolDescriptions
                        ]
                      }
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}

            {tab === "product" && (
              <>
                <h3 className="mb-3 font-extrabold text-blue-950">
                  {t.productTitle}
                </h3>

                <ul className="text-sm text-slate-700 space-y-2">
                  {t.productList.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <CertificationsBlock
                  title={t.certifications}
                  certs={productCerts}
                />
              </>
            )}

            {tab === "soft" && (
              <>
                <h3 className="mb-3 font-extrabold text-blue-950">
                  {t.softTitle}
                </h3>

                <ul className="text-sm text-slate-700 space-y-2">
                  {t.softList.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <CertificationsBlock
                  title={t.certifications}
                  certs={softCerts}
                />
              </>
            )}
          </section>

          <aside className="space-y-3">
            <div className="rounded-2xl border-2 border-blue-200 bg-linear-to-br from-blue-50 to-white p-4">
              <p className="font-extrabold text-blue-900 text-sm mb-2">
                {t.profileTitle}
              </p>

              <ul className="text-xs font-bold space-y-1 text-slate-700">
                {t.profileBullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border p-3 text-xs text-slate-600 bg-white">
              {t.profileDescription}
            </div>
          </aside>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
