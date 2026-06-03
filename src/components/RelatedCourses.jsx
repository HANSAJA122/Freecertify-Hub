import Link from 'next/link';
import { Clock, Star } from 'lucide-react';
import SectionHeader from './SectionHeader';

export default function RelatedCourses({ courses = [], currentCourseId }) {
  const related = courses
    .filter((c) => c.id !== currentCourseId)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section>
      <SectionHeader title="Related Courses" className="mb-6" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {related.map((course) => (
          <div
            key={course.id}
            className="bg-white dark:bg-slate-900 rounded-xl border border-[#E2E8F0] dark:border-slate-800 p-4 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
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
