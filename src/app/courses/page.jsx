'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  courses,
  categories,
  platforms,
  difficulties,
  certificateTypes,
  careerGoals,
  durationFilters,
} from '@/data/coursesData';
import { filterCourses } from '@/utils/filterCourses';
import { sortCourses } from '@/utils/sortCourses';
import CourseCard from '@/components/CourseCard';
import CourseFilters from '@/components/CourseFilters';
import MobileFilterDrawer from '@/components/MobileFilterDrawer';
import SearchBar from '@/components/SearchBar';
import EmptyState from '@/components/EmptyState';
import {
  getSavedCourses,
  saveCourse,
  removeSavedCourse,
  isCourseSaved,
  getCompareCourses,
  addCompareCourse,
  removeCompareCourse,
  isInCompare,
} from '@/utils/storage';
import { SlidersHorizontal, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const SORT_OPTIONS = [
  { label: 'Default', value: '' },
  { label: 'Highest Rated', value: 'highest-rated' },
  { label: 'Shortest Duration', value: 'shortest-duration' },
  { label: 'Beginner Friendly', value: 'beginner-friendly' },
  { label: 'Platform A–Z', value: 'platform-az' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

function CoursesContent() {
  const searchParams = useSearchParams();

  // ── State ──────────────────────────────────────────────────────────
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    platform: '',
    difficulty: '',
    duration: null,
    careerGoal: '',
    certificateType: '',
    sortBy: '',
  });

  const [savedCourses, setSavedCourses] = useState([]);
  const [compareCourses, setCompareCourses] = useState([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [compareWarning, setCompareWarning] = useState('');

  // ── Initialise from URL params + localStorage ─────────────────────
  useEffect(() => {
    const categoryParam = searchParams.get('category') || '';
    const platformParam = searchParams.get('platform') || '';

    setFilters((prev) => ({
      ...prev,
      category: categoryParam,
      platform: platformParam,
    }));

    setSavedCourses(getSavedCourses());
    setCompareCourses(getCompareCourses());
  }, [searchParams]);

  // ── Derived data ──────────────────────────────────────────────────
  const filteredCourses = useMemo(() => {
    const filtered = filterCourses(courses, filters);
    return sortCourses(filtered, filters.sortBy);
  }, [filters]);

  // ── Handlers ──────────────────────────────────────────────────────
  function handleFilterChange(key, value) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  function handleClearFilters() {
    setFilters({
      search: '',
      category: '',
      platform: '',
      difficulty: '',
      duration: null,
      careerGoal: '',
      certificateType: '',
      sortBy: filters.sortBy,
    });
  }

  function handleSave(courseId) {
    if (isCourseSaved(courseId)) {
      const updated = removeSavedCourse(courseId);
      setSavedCourses(updated);
    } else {
      const updated = saveCourse(courseId);
      setSavedCourses(updated);
    }
  }

  function handleCompare(courseId) {
    if (isInCompare(courseId)) {
      const updated = removeCompareCourse(courseId);
      setCompareCourses(updated);
      setCompareWarning('');
    } else {
      const result = addCompareCourse(courseId);
      if (result.success) {
        setCompareCourses(result.courses);
        setCompareWarning('');
      } else {
        setCompareWarning(result.message);
        setTimeout(() => setCompareWarning(''), 3000);
      }
    }
  }

  // ── Active filter tags ────────────────────────────────────────────
  const activeFilterTags = [];
  if (filters.category) activeFilterTags.push({ key: 'category', label: filters.category });
  if (filters.platform) activeFilterTags.push({ key: 'platform', label: filters.platform });
  if (filters.difficulty) activeFilterTags.push({ key: 'difficulty', label: filters.difficulty });
  if (filters.duration) activeFilterTags.push({ key: 'duration', label: filters.duration.label || 'Duration' });
  if (filters.careerGoal) activeFilterTags.push({ key: 'careerGoal', label: filters.careerGoal });
  if (filters.certificateType) activeFilterTags.push({ key: 'certificateType', label: filters.certificateType });

  function removeFilterTag(key) {
    handleFilterChange(key, key === 'duration' ? null : '');
  }

  // ── Render ────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-900">
      {/* Compare warning toast */}
      {compareWarning && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-red-50 border border-red-200 text-red-700 px-5 py-3 rounded-lg shadow-lg text-sm font-medium animate-[fadeIn_0.2s_ease]">
          {compareWarning}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ── Header ────────────────────────────────────────────── */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A] dark:text-white mb-2">
            Explore Free Courses
          </h1>
          <p className="text-[#64748B] dark:text-slate-400 text-lg max-w-2xl">
            Discover thousands of free courses from top platforms. Filter by category,
            platform, and more to find the perfect course for you.
          </p>
        </div>

        {/* ── Search bar ────────────────────────────────────────── */}
        <SearchBar
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          placeholder="Search by title, skill, platform…"
          className="mb-6 max-w-2xl"
        />

        {/* ── Active filter tags ────────────────────────────────── */}
        {activeFilterTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {activeFilterTags.map((tag) => (
              <span
                key={tag.key}
                className="inline-flex items-center gap-1.5 bg-blue-50 text-[#2563EB] rounded-full px-3 py-1 text-xs font-medium"
              >
                {tag.label}
                <button
                  type="button"
                  onClick={() => removeFilterTag(tag.key)}
                  className="hover:text-blue-800 transition-colors"
                  aria-label={`Remove ${tag.label} filter`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        {/* ── Mobile filter button ──────────────────────────────── */}
        <div className="lg:hidden mb-5">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#E2E8F0] dark:border-slate-800 text-sm font-medium text-[#0F172A] dark:text-white hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeFilterTags.length > 0 && (
              <span className="ml-1 bg-[#2563EB] text-white text-xs rounded-full px-1.5 py-0.5 leading-none">
                {activeFilterTags.length}
              </span>
            )}
          </button>
        </div>

        {/* ── Mobile filter drawer ──────────────────────────────── */}
        <MobileFilterDrawer
          isOpen={mobileFiltersOpen}
          onClose={() => setMobileFiltersOpen(false)}
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />

        {/* ── Main layout: Sidebar + Content ────────────────────── */}
        <div className="flex gap-8">
          {/* Sidebar — desktop only */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24">
              <CourseFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Sort + result count */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
              <p className="text-sm text-[#64748B] dark:text-slate-400">
                <span className="font-semibold text-[#0F172A] dark:text-white">
                  {filteredCourses.length}
                </span>{' '}
                {filteredCourses.length === 1 ? 'course' : 'courses'} found
              </p>

              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="bg-white dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-800 rounded-lg px-3 py-2 text-sm text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/50 focus:border-[#2563EB] transition-all duration-200 w-full sm:w-auto"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Course grid */}
            {filteredCourses.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                key={JSON.stringify(filters)}
              >
                {filteredCourses.map((course) => (
                  <motion.div key={course.id} variants={cardVariants}>
                    <CourseCard
                      course={course}
                      isSaved={savedCourses.includes(course.id)}
                      isCompared={compareCourses.includes(course.id)}
                      onSave={handleSave}
                      onCompare={handleCompare}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <EmptyState
                icon={Search}
                title="No courses found"
                description="Try adjusting your filters or search terms to discover more courses."
                actionLabel="Clear Filters"
                actionHref="/courses"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CoursesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-[#F8FAFC] dark:bg-slate-900">
          <div className="text-[#64748B] dark:text-slate-400 text-sm">Loading courses…</div>
        </div>
      }
    >
      <CoursesContent />
    </Suspense>
  );
}
