"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const tabs = [
  { id: "onboarding", label: "Onboarding" },
  { id: "feature", label: "Feature 0→1" },
  { id: "pricing", label: "Pricing" },
] as const;
export default function Experience() {
  const [activeTab, setActiveTab] = useState("onboarding");

  return (
    <div >
      
    </div>
  );
}