"use client";

interface FolderIconProps {
  label: string;
  onOpen: () => void;
}

export default function FolderIcon({ label, onOpen }: FolderIconProps) {
  return (
    <button
      onClick={onOpen}
      className="group flex flex-col items-center focus:outline-none select-none cursor-pointer"
    >
      {/* ================= CONTENEUR DU DOSSIER ET DE SON OMBRE RÉTRO ================= */}
      <div className="relative w-24 h-20 flex items-center justify-center transition-transform duration-200 ease-out group-hover:scale-105 group-active:scale-95">
        
        {/* L'ombre portée diffuse en arrière-plan (copie conforme de l'ombre au sol de ton image) */}
        <div className="absolute bottom-1 right-[-8px] w-[85%] h-[40%] bg-slate-900/15 rounded-[100%] blur-[6px] transform rotate-3 pointer-events-none transition-opacity group-hover:opacity-80" />

        {/* ================= REPRODUCTION VECTORIELLE DU DOSSIER ================= */}
        <svg 
          viewBox="0 0 120 90" 
          className="w-full h-full drop-shadow-[0_2px_3px_rgba(0,0,0,0.05)]"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Définition des dégradés exacts de ton modèle */}
          <defs>
            {/* Rabat arrière (Couleur Saumon / Terracotta claire) */}
            <linearGradient id="backTabGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f4a290" />
              <stop offset="100%" stopColor="#e28875" />
            </linearGradient>
            
            {/* Corps principal avant (Dégradé Jaune Sable / Crème chaud) */}
            <linearGradient id="frontBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fbe6be" />
              <stop offset="60%" stopColor="#f5ce95" />
              <stop offset="100%" stopColor="#eeb26b" />
            </linearGradient>

            {/* Ombre interne entre le contenu et la pochette avant */}
            <linearGradient id="innerShadowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3d2a1c" stopOpacity="0.25" />
              <stop offset="40%" stopColor="#3d2a1c" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#3d2a1c" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* 1. RABAT ARRIÈRE (Saumon avec sa forme arrondie) */}
          <path 
            d="M12 14 C12 10, 16 8, 22 8 L44 8 C48 8, 52 10, 56 13 L64 19 C66 20, 68 21, 71 21 L102 21 C107 21, 110 24, 110 29 L110 38 L12 38 Z" 
            fill="url(#backTabGrad)" 
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
            fill="url(#frontBodyGrad)" 
            stroke="#322214" 
            strokeWidth="3.2" 
            strokeLinejoin="round"
          />

          {/* 4. OMBRE PROPRE SUR LE DEVANT (Effet d'arrondi sur la droite de ton modèle) */}
          <path 
            d="M75 23 L102 23 C106.5 23, 110 27, 109 32.5 L102 74 C101 79.5, 96 83, 90.5 83 L70 83 C85 70, 88 40, 75 23 Z" 
            fill="url(#innerShadowGrad)" 
            className="opacity-60"
          />
        </svg>
      </div>

      {/* ================= LABEL TEXTE DU DOSSIER ================= */}
      <span className="mt-1 px-2 py-0.5 text-xs font-bold text-[#000000] tracking-wide text-center font-sans select-none max-w-[130px] transition-colors group-hover:text-black">
        {label}
      </span>
    </button>
  );
}