'use client';

import {
  ExternalLink,
  Bookmark,
  GitCompareArrows,
  Clock,
  BarChart3,
  Star,
  Award,
  Target,
} from 'lucide-react';
import Badge from './Badge';

export default function CourseSummaryCard({
  course,
  isSaved = false,
  isCompared = false,
  onSave,
  onCompare,
}) {
  const {
    id,
    platform,
    duration,
    difficulty,
    certificate,
    rating,
    careerGoal,
    url,
  } = course;

  const difficultyVariant =
    difficulty === 'Beginner'
      ? 'green'
      : difficulty === 'Intermediate'
        ? 'amber'
        : 'gray';

  const details = [
    { icon: Star, label: 'Rating', value: rating, highlight: true },
    { icon: Clock, label: 'Duration', value: duration },
    { icon: BarChart3, label: 'Difficulty', value: difficulty, badge: difficultyVariant },
    { icon: Award, label: 'Certificate', value: certificate },
    { icon: Target, label: 'Career Goal', value: careerGoal },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-[#E2E8F0] dark:border-slate-800 shadow-sm p-6 sticky top-24">
      {/* Platform */}
      <div className="text-xs font-medium text-[#2563EB] uppercase tracking-wider mb-4">
        {platform}
      </div>

      {/* Details */}
      <div className="space-y-3 mb-6">
        {details.map(
          (item) =>
            item.value && (
              <div key={item.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-[#64748B] dark:text-slate-400">
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </div>
                <div className="text-sm font-medium text-[#0F172A] dark:text-white">
                  {item.badge ? (
                    <Badge variant={item.badge} size="sm">
                      {item.value}
                    </Badge>
                  ) : item.highlight ? (
                    <span className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 text-[#F59E0B] fill-[#F59E0B]" />
                      {item.value}
                    </span>
                  ) : (
                    item.value
                  )}
                </div>
              </div>
            )
        )}
      </div>

      {/* Primary action */}
      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-lg bg-[#2563EB] text-white text-sm font-medium hover:bg-blue-700 transition-colors mb-3"
        >
          Go to Official Course
          <ExternalLink className="h-4 w-4" />
        </a>
      )}

      {/* Secondary actions */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onSave?.(id)}
          className={`flex items-center justify-center gap-1.5 flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            isSaved
              ? 'bg-blue-50 dark:bg-blue-900/30 text-[#2563EB] border border-[#2563EB]'
              : 'border border-[#E2E8F0] dark:border-slate-800 text-[#0F172A] dark:text-white hover:bg-gray-50 dark:hover:bg-slate-800'
          }`}
        >
          <Bookmark
            className={`h-4 w-4 ${isSaved ? 'fill-[#2563EB]' : ''}`}
          />
          {isSaved ? 'Saved' : 'Save'}
        </button>

        <button
          type="button"
          onClick={() => onCompare?.(id)}
          className={`flex items-center justify-center gap-1.5 flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            isCompared
              ? 'bg-blue-50 dark:bg-blue-900/30 text-[#2563EB] border border-[#2563EB]'
              : 'border border-[#E2E8F0] dark:border-slate-800 text-[#0F172A] dark:text-white hover:bg-gray-50 dark:hover:bg-slate-800'
          }`}
        >
          <GitCompareArrows className="h-4 w-4" />
          {isCompared ? 'Comparing' : 'Compare'}
        </button>
      </div>
    </div>
  );
}
