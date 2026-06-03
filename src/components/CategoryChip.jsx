'use client';

export default function CategoryChip({ label, active = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer ${
        active
          ? 'bg-[#2563EB] text-white'
          : 'bg-white dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-800 text-[#64748B] dark:text-slate-400 hover:border-[#2563EB] dark:hover:border-[#2563EB] hover:text-[#2563EB] dark:hover:text-blue-400'
      }`}
    >
      {label}
    </button>
  );
}
