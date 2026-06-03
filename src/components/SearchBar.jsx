'use client';

import { Search } from 'lucide-react';

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search courses...',
  className = '',
}) {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#64748B] dark:text-slate-400" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-white dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-800 rounded-xl shadow-sm pl-12 pr-4 py-3 text-[#0F172A] dark:text-white placeholder:text-[#64748B] dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/50 focus:border-[#2563EB] transition-all duration-200"
      />
    </div>
  );
}
