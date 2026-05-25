"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const tabs = [
  { id: "onboarding", label: "Onboarding" },
  { id: "feature", label: "Feature 0→1" },
  { id: "pricing", label: "Pricing" },
] as const;
export default function Resume() {
  const [activeTab, setActiveTab] = useState<typeof tabs[number]["id"]>("onboarding");

  return (
    <div>
      <nav style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              padding: "6px 10px",
              cursor: "pointer",
              background: activeTab === t.id ? "#111827" : "#e5e7eb",
              color: activeTab === t.id ? "#fff" : "#111827",
              border: "none",
              borderRadius: 6,
            }}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <AnimatePresence>
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
        >
          {activeTab === "onboarding" && <div>Onboarding content</div>}
          {activeTab === "feature" && <div>Feature 0→1 content</div>}
          {activeTab === "pricing" && <div>Pricing content</div>}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}