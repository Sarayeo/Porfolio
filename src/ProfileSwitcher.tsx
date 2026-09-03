import { motion } from "framer-motion";
import {
  careerProfiles,
  type CareerProfile,
} from "./careerProfiles";
import type { Language } from "./translations";

type ProfileSwitcherProps = {
  language: Language;
  profile: CareerProfile;
  onChange: (profile: CareerProfile) => void;
  compact?: boolean;
  inverse?: boolean;
};

const profileIds: CareerProfile[] = ["product", "project"];

export default function ProfileSwitcher({
  language,
  profile,
  onChange,
  compact = false,
  inverse = false,
}: ProfileSwitcherProps) {
  const label =
    language === "fr" ? "Choisir un profil métier" : "Choose a career profile";

  return (
    <div
      className={`profile-switcher grid grid-cols-2 select-none ${
        compact
          ? "gap-0.5 rounded-lg border-2 border-slate-900 bg-slate-100 p-0.5"
          : "gap-2 sm:gap-3"
      }`}
      role="group"
      aria-label={label}
    >
      {profileIds.map((id) => {
        const copy = careerProfiles[language][id];
        const isActive = profile === id;

        return (
          <motion.button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            whileTap={{ scale: 0.97 }}
            className={`relative overflow-hidden text-left font-black transition-colors focus-visible:z-10 ${
              compact
                ? "rounded px-1.5 py-1 text-[9px] leading-none sm:px-2 sm:text-[10px]"
                : "min-h-14 rounded-xl border-2 border-slate-900 px-2 py-2 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] sm:min-h-18 sm:px-4 sm:py-2.5"
            } ${
              isActive
                ? id === "product"
                  ? "bg-indigo-900 text-white"
                  : "bg-teal-700 text-white"
                : inverse
                  ? "bg-white/10 text-white hover:bg-white/20"
                  : "bg-white text-slate-600 hover:bg-slate-100"
            }`}
            aria-pressed={isActive}
            aria-label={`${copy.switchLabel} — ${copy.switchHint}`}
          >
            {!compact && isActive && (
              <motion.span
                layoutId="active-profile-dot"
                className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full border border-white bg-lime-300"
                aria-hidden="true"
              />
            )}

            <span className={compact ? "block text-center" : "block pr-3 text-xs sm:text-sm"}>
              {compact ? copy.shortLabel : copy.switchLabel}
            </span>

            {!compact && (
              <span
                className={`mt-1 hidden text-[10px] font-bold leading-snug sm:block sm:text-[11px] ${
                  isActive ? "text-white/80" : "text-slate-500"
                }`}
              >
                {copy.switchHint}
              </span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
