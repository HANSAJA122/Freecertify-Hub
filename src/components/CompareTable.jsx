'use client';

import { useMemo } from 'react';
import { X, ExternalLink } from 'lucide-react';
import Badge from './Badge';
import SectionHeader from './SectionHeader';

export default function CompareTable({
  courseIds = [],
  courses = [],
  onRemove,
}) {
  const compareCourses = useMemo(() => {
    if (!courseIds.length || !courses.length) return [];
    return courseIds
      .map((id) => courses.find((c) => c.id === id))
      .filter(Boolean)
      .slice(0, 3);
  }, [courseIds, courses]);

  if (compareCourses.length === 0) return null;

  const rows = [
    {
      label: 'Course Title',
      render: (c) => (
        <span className="font-semibold text-[#0F172A] dark:text-white">{c.title}</span>
      ),
    },
    {
      label: 'Platform',
      render: (c) => (
        <span className="text-[#2563EB] font-medium">{c.platform}</span>
      ),
    },
    {
      label: 'Category',
      render: (c) => c.category || '—',
    },
    {
      label: 'Duration',
      render: (c) => c.duration || '—',
    },
    {
      label: 'Difficulty',
      render: (c) =>
        c.difficulty ? (
          <Badge
            variant={
              c.difficulty === 'Beginner'
                ? 'green'
                : c.difficulty === 'Intermediate'
                  ? 'amber'
                  : 'gray'
            }
            size="sm"
          >
            {c.difficulty}
          </Badge>
        ) : (
          '—'
        ),
    },
    {
      label: 'Certificate Type',
      render: (c) =>
        c.certificate ? (
          <Badge variant="green" size="sm">
            {c.certificate}
          </Badge>
        ) : (
          '—'
        ),
    },
    {
      label: 'Rating',
      render: (c) => (c.rating ? `⭐ ${c.rating}` : '—'),
    },
    {
      label: 'Skills',
      render: (c) =>
        c.skills?.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {c.skills.slice(0, 3).map((s) => (
              <Badge key={s} variant="blue" size="sm">
                {s}
              </Badge>
            ))}
          </div>
        ) : (
          '—'
        ),
    },
    {
      label: 'Career Goal',
      render: (c) =>
        c.careerGoal ? (
          <Badge variant="navy" size="sm">
            {c.careerGoal}
          </Badge>
        ) : (
          '—'
        ),
    },
    {
      label: 'Official Link',
      render: (c) =>
        c.url ? (
          <a
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#2563EB] text-sm hover:underline"
          >
            Visit
            <ExternalLink className="h-3 w-3" />
          </a>
        ) : (
          '—'
        ),
    },
  ];

  return (
    <section>
      <SectionHeader title="Compare Courses" className="mb-6" />

      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[600px]">
          <thead>
            <tr>
              <th className="text-left text-sm font-medium text-[#64748B] dark:text-slate-400 p-3 border-b border-[#E2E8F0] dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-900 w-40">
                Feature
              </th>
              {compareCourses.map((course) => (
                <th
                  key={course.id}
                  className="text-left text-sm font-medium text-[#0F172A] dark:text-white p-3 border-b border-[#E2E8F0] dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-900"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="line-clamp-1">{course.title}</span>
                    {onRemove && (
                      <button
                        type="button"
                        onClick={() => onRemove(course.id)}
                        className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-slate-800 transition-colors shrink-0"
                        aria-label={`Remove ${course.title} from comparison`}
                      >
                        <X className="h-3.5 w-3.5 text-[#64748B] dark:text-slate-400" />
                      </button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr
                key={row.label}
                className={idx % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-[#F8FAFC] dark:bg-slate-800'}
              >
                <td className="text-sm font-medium text-[#64748B] dark:text-slate-400 p-3 border-b border-[#E2E8F0] dark:border-slate-800">
                  {row.label}
                </td>
                {compareCourses.map((course) => (
                  <td
                    key={course.id}
                    className="text-sm text-[#0F172A] dark:text-white p-3 border-b border-[#E2E8F0] dark:border-slate-800"
                  >
                    {row.render(course)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
