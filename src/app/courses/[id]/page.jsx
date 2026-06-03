'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Clock,
  BarChart3,
  Award,
  Star,
  CheckCircle2,
  Users,
  BookOpen,
  ExternalLink,
} from 'lucide-react';
import { courses } from '@/data/coursesData';
import CourseSummaryCard from '@/components/CourseSummaryCard';
import RelatedCourses from '@/components/RelatedCourses';
import RecentlyViewed from '@/components/RecentlyViewed';
import Badge from '@/components/Badge';
import Button from '@/components/Button';
import {
  isCourseSaved,
  saveCourse,
  removeSavedCourse,
  addRecentlyViewed,
  getRecentlyViewed,
  addCompareCourse,
  removeCompareCourse,
  isInCompare,
} from '@/utils/storage';

export default function CourseDetailsPage({ params }) {
  const { id } = use(params);

  const course = courses.find((c) => c.id === id);

  const [saved, setSaved] = useState(false);
  const [compared, setCompared] = useState(false);
  const [recentlyViewedIds, setRecentlyViewedIds] = useState([]);

  // ── Initialise on mount ──────────────────────────────────────────
  useEffect(() => {
    if (!course) return;

    setSaved(isCourseSaved(id));
    setCompared(isInCompare(id));

    const updated = addRecentlyViewed(id);
    setRecentlyViewedIds(updated.filter((viewedId) => viewedId !== id));
  }, [id, course]);

  // ── Handlers ─────────────────────────────────────────────────────
  function handleSave() {
    if (saved) {
      removeSavedCourse(id);
      setSaved(false);
    } else {
      saveCourse(id);
      setSaved(true);
    }
  }

  function handleCompare() {
    if (compared) {
      removeCompareCourse(id);
      setCompared(false);
    } else {
      const result = addCompareCourse(id);
      if (result.success) {
        setCompared(true);
      }
    }
  }

  // ── Not found ────────────────────────────────────────────────────
  if (!course) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-900 flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-bold text-[#0F172A] dark:text-white mb-2">Course Not Found</h1>
        <p className="text-[#64748B] dark:text-slate-400 mb-6">
          The course you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Button href="/courses" variant="primary" icon={ArrowLeft}>
          Back to Courses
        </Button>
      </div>
    );
  }

  // ── Derived data ─────────────────────────────────────────────────
  const {
    title,
    platform,
    category,
    description,
    duration,
    difficulty,
    certificate,
    rating,
    skills = [],
    whatYouWillLearn = [],
    requirements = [],
    audience = [],
    providerInfo,
    careerGoal,
  } = course;

  const relatedCourses = courses.filter(
    (c) => c.category === category && c.id !== id
  );

  const difficultyVariant =
    difficulty === 'Beginner'
      ? 'green'
      : difficulty === 'Intermediate'
        ? 'amber'
        : 'gray';

  // ── Render ───────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ── Breadcrumb ─────────────────────────────────────────── */}
        <nav className="flex items-center gap-2 text-sm text-[#64748B] dark:text-slate-400 mb-4">
          <Link
            href="/courses"
            className="hover:text-[#2563EB] transition-colors"
          >
            Courses
          </Link>
          <span>/</span>
          <span className="text-[#0F172A] dark:text-white font-medium truncate">{title}</span>
        </nav>

        {/* ── Back link ──────────────────────────────────────────── */}
        <Link
          href="/courses"
          className="inline-flex items-center gap-1.5 text-sm text-[#2563EB] hover:text-blue-700 font-medium mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Courses
        </Link>

        {/* ── Two-column layout ─────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content (left) */}
          <motion.div
            className="flex-1 min-w-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge variant="blue" size="md">{platform}</Badge>
              {certificate && (
                <Badge variant="green" size="md">{certificate}</Badge>
              )}
              {careerGoal && (
                <Badge variant="navy" size="sm">{careerGoal}</Badge>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A] dark:text-white mb-4">
              {title}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-[#64748B] dark:text-slate-400 mb-6">
              {rating && (
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-[#F59E0B] fill-[#F59E0B]" />
                  <span className="font-semibold text-[#0F172A] dark:text-white">{rating}</span>
                </span>
              )}
              {duration && (
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {duration}
                </span>
              )}
              {difficulty && (
                <span className="flex items-center gap-1">
                  <BarChart3 className="h-4 w-4" />
                  <Badge variant={difficultyVariant} size="sm">
                    {difficulty}
                  </Badge>
                </span>
              )}
              {certificate && (
                <span className="flex items-center gap-1">
                  <Award className="h-4 w-4" />
                  {certificate}
                </span>
              )}
            </div>

            {/* Description */}
            {description && (
              <p className="text-[#64748B] dark:text-slate-400 leading-relaxed mb-8 text-base">
                {description}
              </p>
            )}

            {/* ── What You Will Learn ────────────────────────────── */}
            {whatYouWillLearn.length > 0 && (
              <section className="mb-8">
                <h2 className="text-xl font-bold text-[#0F172A] dark:text-white mb-4 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-[#2563EB]" />
                  What You Will Learn
                </h2>
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-[#E2E8F0] dark:border-slate-800 p-5">
                  <ul className="space-y-3">
                    {whatYouWillLearn.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#16A34A] shrink-0 mt-0.5" />
                        <span className="text-sm text-[#334155] dark:text-slate-400">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {/* ── Skills You Will Gain ───────────────────────────── */}
            {skills.length > 0 && (
              <section className="mb-8">
                <h2 className="text-xl font-bold text-[#0F172A] dark:text-white mb-4">
                  Skills You Will Gain
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="blue" size="md">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </section>
            )}

            {/* ── Who This Course Is For ─────────────────────────── */}
            {audience.length > 0 && (
              <section className="mb-8">
                <h2 className="text-xl font-bold text-[#0F172A] dark:text-white mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5 text-[#2563EB]" />
                  Who This Course Is For
                </h2>
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-[#E2E8F0] dark:border-slate-800 p-5">
                  <ul className="space-y-3">
                    {audience.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <Users className="h-4 w-4 text-[#64748B] dark:text-slate-400 shrink-0" />
                        <span className="text-sm text-[#334155] dark:text-slate-400">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {/* ── Requirements ───────────────────────────────────── */}
            {requirements.length > 0 && (
              <section className="mb-8">
                <h2 className="text-xl font-bold text-[#0F172A] dark:text-white mb-4">
                  Requirements
                </h2>
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-[#E2E8F0] dark:border-slate-800 p-5">
                  <ul className="space-y-2">
                    {requirements.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB] shrink-0 mt-2" />
                        <span className="text-sm text-[#334155] dark:text-slate-400">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {/* ── About the Provider ─────────────────────────────── */}
            {providerInfo && (
              <section className="mb-10">
                <h2 className="text-xl font-bold text-[#0F172A] dark:text-white mb-4">
                  About the Provider
                </h2>
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-[#E2E8F0] dark:border-slate-800 p-5">
                  <p className="text-sm text-[#64748B] dark:text-slate-400 leading-relaxed">
                    {providerInfo}
                  </p>
                </div>
              </section>
            )}

            {/* ── Summary card — mobile (shown below content) ───── */}
            <div className="lg:hidden mb-10">
              <CourseSummaryCard
                course={course}
                isSaved={saved}
                isCompared={compared}
                onSave={handleSave}
                onCompare={handleCompare}
              />
            </div>

            {/* ── Related Courses ────────────────────────────────── */}
            <div className="mb-10">
              <RelatedCourses
                courses={relatedCourses}
                currentCourseId={id}
              />
            </div>

            {/* ── Recently Viewed ────────────────────────────────── */}
            <div className="mb-10">
              <RecentlyViewed
                courseIds={recentlyViewedIds}
                courses={courses}
              />
            </div>
          </motion.div>

          {/* Sidebar (right) — desktop only */}
          <aside className="hidden lg:block w-80 shrink-0">
            <div className="sticky top-24">
              <CourseSummaryCard
                course={course}
                isSaved={saved}
                isCompared={compared}
                onSave={handleSave}
                onCompare={handleCompare}
              />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
