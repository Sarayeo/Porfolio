"use client";

import { useId } from "react";

interface FolderIconProps {
  label: string;
  onOpen: () => void;
  active?: boolean;
}

export default function FolderIcon({
  label,
  onOpen,
  active = false,
}: FolderIconProps) {
  const id = useId().replace(/:/g, "");
  const backGradientId = `${id}-folder-back`;
  const frontGradientId = `${id}-folder-front`;
  const shadowGradientId = `${id}-folder-shadow`;

  return (
    <button
      type="button"
      onClick={onOpen}
      className={`folder-button group relative z-20 flex min-h-23 w-full min-w-0 cursor-pointer touch-manipulation flex-col items-center justify-center rounded-xl border-0 bg-transparent p-1 select-none focus:outline-none sm:min-h-28 sm:w-auto sm:min-w-24 ${
        active ? "folder-button-active" : ""
      }`}
      aria-label={label}
      aria-pressed={active}
    >
      {/* ================= CONTENEUR DU DOSSIER ET DE SON OMBRE RÉTRO ================= */}
      <div className="folder-visual pointer-events-none relative flex h-15 w-18 items-center justify-center transition-transform duration-200 ease-out group-hover:-translate-y-1 group-hover:scale-105 group-focus-visible:-translate-y-1 group-focus-visible:scale-105 group-active:translate-y-0 group-active:scale-95 sm:h-20 sm:w-24">
        
        
        <div className="absolute bottom-1 right-[-8px] w-[85%] h-[40%] bg-slate-900/15 rounded-[100%] blur-[6px] transform rotate-3 pointer-events-none transition-opacity group-hover:opacity-80" />

        {/* ================= REPRODUCTION VECTORIELLE DU DOSSIER ================= */}
        <svg 
          viewBox="0 0 120 80" 
          className="h-full w-full drop-shadow-[0_2px_3px_rgba(0,0,0,0.05)] transition-[filter] duration-200 group-hover:drop-shadow-[0_7px_5px_rgba(30,27,75,0.22)]"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            {/* Rabat arrière (Couleur Saumon / Terracotta claire) */}
            <linearGradient id={backGradientId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f4a290" />
              <stop offset="100%" stopColor="#e28875" />
            </linearGradient>
            
            {/* Corps principal avant (Dégradé Jaune Sable / Crème chaud) */}
            <linearGradient id={frontGradientId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fbe6be" />
              <stop offset="60%" stopColor="#f5ce95" />
              <stop offset="100%" stopColor="#eeb26b" />
            </linearGradient>

            {/* Ombre interne entre le contenu et la pochette avant */}
            <linearGradient id={shadowGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3d2a1c" stopOpacity="0.25" />
              <stop offset="40%" stopColor="#3d2a1c" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#3d2a1c" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* 1. RABAT ARRIÈRE (Saumon avec sa forme arrondie) */}
          <path 
            d="M12 14 C12 10, 16 8, 22 8 L44 8 C48 8, 52 10, 56 13 L64 19 C66 20, 68 21, 71 21 L102 21 C107 21, 110 24, 110 29 L110 38 L12 38 Z" 
            fill={`url(#${backGradientId})`}
            stroke="#322214" 
            strokeWidth="3" 
            strokeLinejoin="round"
          />

          {/* 2. CONTENU INTERNE (La feuille/intercalaire sombre du milieu) */}
          <path 
            d="M16 23 C16 20, 19 18, 23 18 L100 18 C104 18, 107 21, 107 25 L104 42 L13 42 Z" 
            fill="#ecd2aa" 
            stroke="#322214" 
            strokeWidth="2.5"
          />

          {/* 3. CORPS PRINCIPAL AVANT (Forme trapèze adoucie et inclinée) */}
          <path 
            d="M17 31 C17 26.5, 21 23, 26.5 23 L102 23 C106.5 23, 110 27, 109 32.5 L102 74 C101 79.5, 96 83, 90.5 83 L21 83 C15.5 83, 12 79, 12.5 73.5 L17 31 Z" 
            fill={`url(#${frontGradientId})`}
            stroke="#322214" 
            strokeWidth="3.2" 
            strokeLinejoin="round"
          />

          {/* 4. OMBRE PROPRE SUR LE DEVANT (Effet d'arrondi sur la droite de ton modèle) */}
          <path 
            d="M75 23 L102 23 C106.5 23, 110 27, 109 32.5 L102 74 C101 79.5, 96 83, 90.5 83 L70 83 C85 70, 88 40, 75 23 Z" 
            fill={`url(#${shadowGradientId})`}
            className="opacity-60"
          />
        </svg>
      </div>

      {/* ================= LABEL TEXTE DU DOSSIER ================= */}
      <span className="desktop-label pointer-events-none mt-1 min-h-7 max-w-full rounded px-1 py-0.5 text-center font-sans text-[10px] font-bold leading-tight tracking-wide text-black select-none transition-colors group-hover:bg-indigo-950 group-hover:text-white group-focus-visible:bg-indigo-950 group-focus-visible:text-white group-active:bg-indigo-950 group-active:text-white sm:max-w-[130px] sm:px-2 sm:text-xs">
        {label}
      </span>
    </button>
  );
}
