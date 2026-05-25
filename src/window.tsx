"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  id: string;
  title: string;
  isActive: boolean;
  onClose: () => void;
  onFocus: () => void;
  children: ReactNode;
  initialFrom?: "icon" | "center";
};

export default function Window({
  id,
  title,
  isActive,
  onClose,
  onFocus,
  children,
  initialFrom = "icon"
}: Props) {
  
  const from = initialFrom === "icon"
    ? { scale: 0.85, opacity: 0, y: 30 }
    : { scale: 0.95, opacity: 0, y: 0 };

  return (
    <motion.div
      key={id}
      onMouseDown={onFocus}
      initial={from}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.95, opacity: 0, y: 15 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      className={[
        "w-full max-w-2xl h-[min(70vh,620px)]",
        "rounded-3xl border-4 flex flex-col overflow-hidden",
        isActive ? "border-blue-900 shadow-[8px_8px_0px_0px_rgba(30,58,138,1)]" : "border-slate-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]",
        "bg-white z-20"
      ].filter(Boolean).join(" ")}
      role="dialog"
      aria-modal="true"
    >
      {/* Window Header Titlebar */}
      <div 
        className="h-14 px-5 flex items-center justify-between border-b-4 border-blue-900 shrink-0 select-none"
        style={{ background: "linear-gradient(180deg, #dcebff, #cfe2ff)" }}
      >
        <div className="flex items-center gap-3">
          <span className="flex gap-2">
            <button 
              aria-label="Fermer" 
              onClick={onClose}
              className="w-4 h-4 rounded-full bg-red-400 border-2 border-slate-900 transition hover:bg-red-500 active:scale-90" 
            />
            <span className="w-4 h-4 rounded-full bg-amber-300 border-2 border-slate-900" />
            <span className="w-4 h-4 rounded-full bg-emerald-300 border-2 border-slate-900" />
          </span>
          <p className="font-black text-slate-900 uppercase tracking-wider text-xs">
            {title}
          </p>
        </div>
        <div className="text-xs font-mono font-bold text-slate-700/80 pr-1">
          C:\PORTFOLIO\{title}
        </div>
      </div>

      {/* Internal Body Content Viewport */}
      <div className="p-6 overflow-y-auto bg-stone-50 flex-1">
        {children}
      </div>
    </motion.div>
  );
}