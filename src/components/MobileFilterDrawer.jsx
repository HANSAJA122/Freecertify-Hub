'use client';

import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  categories,
  platforms,
  difficulties,
  certificateTypes,
  careerGoals,
  durationFilters,
  sortOptions,
} from '@/data/coursesData';

function FilterSection({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#0F172A] dark:text-white mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}

function SelectInput({ value, onChange, options, placeholder }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 rounded-lg px-3 py-2.5 text-sm text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/50 focus:border-[#2563EB] transition-all appearance-none cursor-pointer"
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((opt) => {
        const val = typeof opt === 'string' ? opt : opt.value || opt.label;
        const lbl = typeof opt === 'string' ? opt : opt.label;
        return (
          <option key={val} value={val}>
            {lbl}
          </option>
        );
      })}
    </select>
  );
}

export default function MobileFilterDrawer({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onClearFilters,
  resultCount,
}) {
  const hasActiveFilters =
    filters.search ||
    filters.category ||
    filters.platform ||
    filters.difficulty ||
    filters.duration ||
    filters.careerGoal ||
    filters.certificateType ||
    filters.sortBy;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed left-0 top-0 w-80 max-w-full h-full bg-white dark:bg-slate-900 z-50 lg:hidden shadow-xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0] dark:border-slate-800 shrink-0">
              <div>
                <h2 className="text-lg font-bold text-[#0F172A] dark:text-white">Filters</h2>
                <p className="text-xs text-[#64748B] dark:text-slate-400 mt-0.5">
                  <span className="font-semibold text-[#0F172A] dark:text-white">
                    {resultCount}
                  </span>{' '}
                  courses found
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-lg text-[#64748B] dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Close filters"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Filter Body */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
              {/* Search */}
              <FilterSection label="Search">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B] dark:text-slate-400" />
                  <input
                    type="text"
                    value={filters.search}
                    onChange={(e) => onFilterChange('search', e.target.value)}
                    placeholder="Search courses..."
                    className="w-full bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 rounded-lg pl-9 pr-3 py-2.5 text-sm text-[#0F172A] dark:text-white placeholder:text-[#64748B] dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/50 focus:border-[#2563EB] transition-all"
                  />
                </div>
              </FilterSection>

              {/* Sort */}
              <FilterSection label="Sort By">
                <SelectInput
                  value={filters.sortBy}
                  onChange={(e) => onFilterChange('sortBy', e.target.value)}
                  options={sortOptions}
                  placeholder="Default"
                />
              </FilterSection>

              {/* Category */}
              <FilterSection label="Category">
                <SelectInput
                  value={filters.category}
                  onChange={(e) => onFilterChange('category', e.target.value)}
                  options={categories}
                  placeholder="All Categories"
                />
              </FilterSection>

              {/* Platform */}
              <FilterSection label="Platform">
                <SelectInput
                  value={filters.platform}
                  onChange={(e) => onFilterChange('platform', e.target.value)}
                  options={platforms}
                  placeholder="All Platforms"
                />
              </FilterSection>

              {/* Difficulty */}
              <FilterSection label="Difficulty">
                <div className="space-y-2">
                  <label className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                      type="radio"
                      name="mobile-difficulty"
                      value=""
                      checked={!filters.difficulty}
                      onChange={() => onFilterChange('difficulty', '')}
                      className="h-4 w-4 text-[#2563EB] border-[#E2E8F0] dark:border-slate-800 dark:bg-slate-900 focus:ring-[#2563EB]/50"
                    />
                    <span className="text-sm text-[#64748B] dark:text-slate-400 group-hover:text-[#0F172A] dark:group-hover:text-white transition-colors">
                      All Levels
                    </span>
                  </label>
                  {difficulties.map((level) => (
                    <label
                      key={level}
                      className="flex items-center gap-2.5 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="mobile-difficulty"
                        value={level}
                        checked={filters.difficulty === level}
                        onChange={(e) =>
                          onFilterChange('difficulty', e.target.value)
                        }
                        className="h-4 w-4 text-[#2563EB] border-[#E2E8F0] dark:border-slate-800 dark:bg-slate-900 focus:ring-[#2563EB]/50"
                      />
                      <span className="text-sm text-[#64748B] dark:text-slate-400 group-hover:text-[#0F172A] dark:group-hover:text-white transition-colors">
                        {level}
                      </span>
                    </label>
                  ))}
                </div>
              </FilterSection>

              {/* Duration */}
              <FilterSection label="Duration">
                <div className="space-y-2">
                  <label className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                      type="radio"
                      name="mobile-duration"
                      value=""
                      checked={!filters.duration}
                      onChange={() => onFilterChange('duration', '')}
                      className="h-4 w-4 text-[#2563EB] border-[#E2E8F0] dark:border-slate-800 dark:bg-slate-900 focus:ring-[#2563EB]/50"
                    />
                    <span className="text-sm text-[#64748B] dark:text-slate-400 group-hover:text-[#0F172A] dark:group-hover:text-white transition-colors">
                      Any Duration
                    </span>
                  </label>
                  {durationFilters.map((dur) => (
                    <label
                      key={dur.label}
                      className="flex items-center gap-2.5 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="mobile-duration"
                        value={dur.label}
                        checked={filters.duration === dur.label}
                        onChange={(e) =>
                          onFilterChange('duration', e.target.value)
                        }
                        className="h-4 w-4 text-[#2563EB] border-[#E2E8F0] dark:border-slate-800 dark:bg-slate-900 focus:ring-[#2563EB]/50"
                      />
                      <span className="text-sm text-[#64748B] dark:text-slate-400 group-hover:text-[#0F172A] dark:group-hover:text-white transition-colors">
                        {dur.label}
                      </span>
                    </label>
                  ))}
                </div>
              </FilterSection>

              {/* Career Goal */}
              <FilterSection label="Career Goal">
                <SelectInput
                  value={filters.careerGoal}
                  onChange={(e) => onFilterChange('careerGoal', e.target.value)}
                  options={careerGoals}
                  placeholder="All Goals"
                />
              </FilterSection>

              {/* Certificate Type */}
              <FilterSection label="Certificate Type">
                <SelectInput
                  value={filters.certificateType}
                  onChange={(e) =>
                    onFilterChange('certificateType', e.target.value)
                  }
                  options={certificateTypes}
                  placeholder="All Types"
                />
              </FilterSection>
            </div>

            {/* Footer Actions */}
            <div className="shrink-0 px-6 py-4 border-t border-[#E2E8F0] dark:border-slate-800 space-y-3">
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 text-sm font-medium text-white bg-[#2563EB] rounded-lg hover:bg-blue-700 transition-colors"
              >
                Apply Filters
              </button>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={onClearFilters}
                  className="w-full py-2.5 text-sm font-medium text-[#2563EB] border border-[#2563EB] rounded-lg hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
