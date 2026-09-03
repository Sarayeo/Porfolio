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
      onPointerDown={onFocus}
      initial={from}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.95, opacity: 0, y: 15 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      className={[
        "w-full max-w-[42rem] h-full max-h-full sm:h-[min(75vh,710px)]",
        "rounded-2xl sm:rounded-3xl border-[3px] sm:border-4 flex flex-col overflow-hidden",
        isActive ? "border-violet-900 shadow-[8px_8px_0px_0px_rgba(30,58,138,1)]" : "border-slate-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]",
        "relative z-50 bg-white pointer-events-auto"
      ].filter(Boolean).join(" ")}
      role="dialog"
      aria-labelledby={`window-title-${id}`}
    >
      {/* Window Header Titlebar */}
      <div 
        className="ui-chrome h-12 sm:h-14 px-3 sm:px-5 flex items-center justify-between border-b-[3px] sm:border-b-4 border-violet-900 shrink-0 select-none"
        style={{ background: "linear-gradient(180deg, #dcebff, #cfe2ff)" }}
      >
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <span className="flex gap-2">
            <button
              type="button"
              aria-label="Fermer" 
              onClick={onClose}
              className="group/close -m-2 flex h-8 w-8 items-center justify-center rounded-full"
            >
              <span className="h-4 w-4 rounded-full bg-red-400 border-2 border-slate-900 transition group-hover/close:bg-red-500 group-active/close:scale-90" />
            </button>
            <span className="hidden sm:block w-4 h-4 rounded-full bg-amber-300 border-2 border-slate-900" />
            <span className="hidden sm:block w-4 h-4 rounded-full bg-emerald-300 border-2 border-slate-900" />
          </span>
          <p id={`window-title-${id}`} className="truncate font-black text-slate-900 uppercase tracking-wider text-xs">
            {title}
          </p>
        </div>
        <div className="hidden md:block text-xs font-mono font-bold text-slate-700/80 pr-1">
          C:\PORTFOLIO\{title}
        </div>
      </div>

      {/* Internal Body Content Viewport */}
      <div className="window-scroll min-h-0 p-3 sm:p-5 md:p-6 overflow-y-auto overscroll-contain bg-stone-50 flex-1">
        {children}
      </div>
    </motion.div>
  );
}
