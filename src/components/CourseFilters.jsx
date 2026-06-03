'use client';

import { Search, X } from 'lucide-react';
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

export default function CourseFilters({
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
    <aside className="hidden lg:block w-72 shrink-0">
      <div className="sticky top-20 space-y-6">
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

        {/* Result Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-[#64748B] dark:text-slate-400">
            <span className="font-semibold text-[#0F172A] dark:text-white">{resultCount}</span>{' '}
            courses found
          </p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onClearFilters}
              className="inline-flex items-center gap-1 text-xs text-[#2563EB] hover:text-blue-700 font-medium transition-colors"
            >
              <X className="h-3 w-3" />
              Clear All
            </button>
          )}
        </div>

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
                name="difficulty"
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
                  name="difficulty"
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
                name="duration"
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
                  name="duration"
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

        {/* Clear Filters Button */}
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
    </aside>
  );
}
