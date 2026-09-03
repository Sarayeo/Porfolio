"use client";

import { useState } from "react";

export type AppId =
  | "about"
  | "experience"
  | "cases"
  | "skills"
  | "resume"
  | "contact";

export function useDesktopState() {
  const [openApps, setOpenApps] = useState<AppId[]>([]);

  const open = (id: AppId) => {
    setOpenApps((apps) => [...apps.filter((app) => app !== id), id]);
  };

  const close = (id: AppId) => {
    setOpenApps((apps) => apps.filter((app) => app !== id));
  };

  const bringToFront = open;
  const active = openApps.at(-1) ?? null;

  return { openApps, active, open, close, bringToFront };
}
