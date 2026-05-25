"use client";

type Props = {
  label: string;
  onOpen: () => void;
};

export default function FolderIcon({ label, onOpen }: Props) {
  return (
    <button
      onClick={onOpen}
      className="group flex flex-col items-center gap-1.5 text-center focus:outline-none"
    >
      {/* Folder Visual Assets */}
      <div className="relative h-12 w-16 rounded-xl border-2 border-blue-500 bg-blue-200/70 shadow-sm transition duration-200 group-hover:-translate-y-0.5 group-hover:bg-blue-300/80">
        {/* Folder Top Tab */}
        <div className="absolute -top-[7px] left-1.5 h-2 w-7 rounded-t-md border-t-2 border-x-2 border-open border-blue-500 bg-blue-300" />
      </div>

      {/* Label descriptor text */}
      <span className="text-xs font-bold text-slate-700 truncate max-w-full group-hover:text-blue-600 transition">
        {label}
      </span>
    </button>
  );
}