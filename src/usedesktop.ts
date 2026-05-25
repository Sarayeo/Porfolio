"use client";
import { useState } from "react";
export type AppId = "about" | "experience" | "cases" | "skills" | "resume" | "contact";
export function useDesktopState() {
  const [openApps, setOpenApps] = useState<AppId[]>([]);
  const [active, setActive] = useState<AppId | null>(null);
  const open = (id: AppId) => {
    setOpenApps(v => v.includes(id) ? v : [...v, id]);
    setActive(id);
  };
  const close = (id: AppId) => {
    setOpenApps(v => v.filter(a => a !== id));
    setActive(a => (a === id ? null : a));
  };
  const bringToFront = (id: AppId) => setActive(id);
  return { openApps, active, open, close, bringToFront };
}