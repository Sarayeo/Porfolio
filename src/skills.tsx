"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const tabs = [
  { id: "onboarding", label: "Onboarding" },
  { id: "feature", label: "Feature 0→1" },
  { id: "pricing", label: "Pricing" },
] as const;
export default function Skills() {
  const [activeTab, setActiveTab] = useState("onboarding");

  return (
    <div className="skills-container">
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={activeTab === tab.id ? "active" : ""}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={activeTab} className="content">
          {/* Content goes here */}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}