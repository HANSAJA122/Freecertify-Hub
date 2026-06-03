'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { Clock, Star } from 'lucide-react';
import SectionHeader from './SectionHeader';

export default function RecentlyViewed({ courseIds = [], courses = [] }) {
  const recentCourses = useMemo(() => {
    if (!courseIds.length || !courses.length) return [];
    return courseIds
      .map((id) => courses.find((c) => c.id === id))
      .filter(Boolean);
  }, [courseIds, courses]);

  if (recentCourses.length === 0) return null;

  return (
    <section>
      <SectionHeader title="Recently Viewed" className="mb-6" />

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
        {recentCourses.map((course) => (
          <div
            key={course.id}
            className="min-w-[220px] max-w-[260px] bg-white dark:bg-slate-900 rounded-xl border border-[#E2E8F0] dark:border-slate-800 p-4 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col shrink-0"
          >
            <span className="text-xs font-medium text-[#2563EB] mb-1">
              {course.platform}
            </span>
            <h4 className="text-sm font-semibold text-[#0F172A] dark:text-white line-clamp-2 mb-2">
              {course.title}
            </h4>

            <div className="flex items-center gap-3 text-xs text-[#64748B] dark:text-slate-400 mb-3">
              {course.duration && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {course.duration}
                </span>
              )}
              {course.rating && (
                <span className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-[#F59E0B] fill-[#F59E0B]" />
                  {course.rating}
                </span>
              )}
            </div>

            <Link
              href={`/courses/${course.id}`}
              className="mt-auto inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-xs font-medium bg-[#2563EB] text-white hover:bg-blue-700 transition-colors"
            >
              View
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
