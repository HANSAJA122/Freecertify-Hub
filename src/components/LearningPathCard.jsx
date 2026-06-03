import Link from 'next/link';
import {
  Code2,
  Shield,
  Brain,
  BarChart3,
  ClipboardList,
  Cloud,
  Megaphone,
  Users,
  Clock,
  BookOpen,
} from 'lucide-react';
import Badge from './Badge';

const iconMap = {
  Code2,
  Shield,
  Brain,
  BarChart3,
  ClipboardList,
  Cloud,
  Megaphone,
  Users,
};

export default function LearningPathCard({ path }) {
  const {
    id,
    title,
    description,
    courseCount,
    estimatedTime,
    difficulty,
    skills = [],
    bestFor,
    icon: iconName,
  } = path;

  const IconComponent = iconMap[iconName] || BookOpen;

  const difficultyVariant =
    difficulty === 'Beginner'
      ? 'green'
      : difficulty === 'Intermediate'
        ? 'amber'
        : 'gray';

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-[#E2E8F0] dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 p-5 flex flex-col">
      {/* Icon & Title */}
      <div className="flex items-start gap-3 mb-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 shrink-0">
          <IconComponent className="h-5 w-5 text-[#2563EB]" />
        </div>
        <div>
          <h3 className="font-semibold text-[#0F172A] dark:text-white">{title}</h3>
          {bestFor && (
            <p className="text-xs text-[#64748B] dark:text-slate-400 mt-0.5">Best for: {bestFor}</p>
          )}
        </div>
      </div>

      {/* Description */}
      {description && (
        <p className="text-sm text-[#64748B] dark:text-slate-400 line-clamp-2 mb-3">
          {description}
        </p>
      )}

      {/* Meta row */}
      <div className="flex items-center gap-4 text-sm text-[#64748B] dark:text-slate-400 mb-3">
        {courseCount != null && (
          <div className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" />
            <span>
              {courseCount} {courseCount === 1 ? 'Course' : 'Courses'}
            </span>
          </div>
        )}
        {estimatedTime && (
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{estimatedTime}</span>
          </div>
        )}
        {difficulty && (
          <Badge variant={difficultyVariant} size="sm">
            {difficulty}
          </Badge>
        )}
      </div>

      {/* Skills preview */}
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {skills.slice(0, 4).map((skill) => (
            <Badge key={skill} variant="blue" size="sm">
              {skill}
            </Badge>
          ))}
          {skills.length > 4 && (
            <Badge variant="gray" size="sm">
              +{skills.length - 4} more
            </Badge>
          )}
        </div>
      )}

      {/* View Path button */}
      <Link
        href={`/learning-paths/${id}`}
        className="mt-auto inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-[#2563EB] text-white text-sm font-medium hover:bg-blue-700 transition-colors"
      >
        View Path
      </Link>
    </div>
  );
}
