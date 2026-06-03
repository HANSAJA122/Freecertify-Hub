import Link from 'next/link';
import { ExternalLink, BookOpen } from 'lucide-react';
import Badge from './Badge';

export default function PlatformCard({ platform, courseCount = 0 }) {
  const {
    name,
    description,
    categories = [],
    certificate,
    url,
    color = '#2563EB',
  } = platform;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-[#E2E8F0] dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex">
      {/* Left color accent */}
      <div className="w-1.5 shrink-0" style={{ backgroundColor: color }} />

      <div className="p-5 flex flex-col flex-1">
        {/* Platform name */}
        <h3 className="text-lg font-semibold text-[#0F172A] dark:text-white mb-2">{name}</h3>

        {/* Description */}
        {description && (
          <p className="text-sm text-[#64748B] dark:text-slate-400 line-clamp-3 mb-3">
            {description}
          </p>
        )}

        {/* Course count */}
        <div className="flex items-center gap-1.5 text-sm text-[#64748B] dark:text-slate-400 mb-3">
          <BookOpen className="h-4 w-4" />
          <span>
            {courseCount} {courseCount === 1 ? 'Course' : 'Courses'}
          </span>
        </div>

        {/* Categories preview */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {categories.slice(0, 4).map((cat) => (
              <Badge key={cat} variant="blue" size="sm">
                {cat}
              </Badge>
            ))}
            {categories.length > 4 && (
              <Badge variant="gray" size="sm">
                +{categories.length - 4} more
              </Badge>
            )}
          </div>
        )}

        {/* Certificate info */}
        {certificate && (
          <div className="mb-4">
            <Badge variant="green" size="sm">
              {certificate}
            </Badge>
          </div>
        )}

        {/* Buttons */}
        <div className="flex items-center gap-3 mt-auto pt-3 border-t border-[#E2E8F0] dark:border-slate-800">
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#E2E8F0] dark:border-slate-800 text-sm font-medium text-[#0F172A] dark:text-white hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
            >
              Visit Platform
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
          <Link
            href={`/courses?platform=${encodeURIComponent(name)}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#2563EB] text-white text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            View Courses
          </Link>
        </div>
      </div>
    </div>
  );
}
