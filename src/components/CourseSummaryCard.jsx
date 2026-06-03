'use client';

import { useState } from 'react';
import {
  ExternalLink,
  Bookmark,
  GitCompareArrows,
  Clock,
  BarChart3,
  Star,
  Award,
  Target,
  BookOpen
} from 'lucide-react';
import Badge from './Badge';

export default function CourseSummaryCard({
  course,
  isSaved = false,
  isCompared = false,
  onSave,
  onCompare,
}) {
  const [imgError, setImgError] = useState(false);
  
  const {
    id,
    platform,
    duration,
    difficulty,
    certificate,
    rating,
    careerGoal,
    image,
    providerLogo,
    courseUrl,
    ctaText,
    category
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
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-[#E2E8F0] dark:border-slate-800 shadow-sm overflow-hidden sticky top-24">
      
      {/* Top Image Section */}
      <div className="relative h-40 w-full bg-slate-50 dark:bg-slate-800/50 border-b border-[#E2E8F0] dark:border-slate-800">
        {!imgError && image ? (
          <img
            src={image}
            alt="Course Thumbnail"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
            <BookOpen className="h-10 w-10 text-slate-300 dark:text-slate-600 mb-2" />
            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">{category}</span>
          </div>
        )}
      </div>

      <div className="p-6">
        {/* Platform logo & name */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#E2E8F0] dark:border-slate-800">
          {providerLogo && (
            <img 
              src={providerLogo} 
              alt={platform} 
              className="h-8 w-auto object-contain" 
              onError={(e) => { e.target.style.display = 'none'; }} 
            />
          )}
          <div className="text-sm font-bold text-[#0F172A] dark:text-white uppercase tracking-wider">
            {platform}
          </div>
        </div>

        {/* Details */}
        <div className="space-y-3 mb-8">
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

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          
          {/* Primary CTA */}
          {courseUrl ? (
            <a
              href={courseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-lg bg-[#2563EB] text-white text-base font-bold hover:bg-blue-700 transition-colors shadow-sm"
            >
              {ctaText || "Start Free Certificate"}
              <ExternalLink className="h-5 w-5" />
            </a>
          ) : (
            <button
              disabled
              className="flex items-center justify-center w-full px-5 py-3.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 text-base font-bold cursor-not-allowed"
            >
              Official Link Coming Soon
            </button>
          )}

          {/* Secondary CTA */}
          {courseUrl && (
            <a
              href={courseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-5 py-2.5 rounded-lg border-2 border-[#E2E8F0] dark:border-slate-700 text-[#0F172A] dark:text-white text-sm font-semibold hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
            >
              Visit Official Course
              <ExternalLink className="h-4 w-4" />
            </a>
          )}

          <div className="flex gap-2 mt-2">
            <button
              type="button"
              onClick={() => onSave?.(id)}
              className={`flex items-center justify-center gap-1.5 flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isSaved
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-[#2563EB] border border-[#2563EB]'
                  : 'border border-[#E2E8F0] dark:border-slate-700 text-[#0F172A] dark:text-white hover:bg-gray-50 dark:hover:bg-slate-800'
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
                  : 'border border-[#E2E8F0] dark:border-slate-700 text-[#0F172A] dark:text-white hover:bg-gray-50 dark:hover:bg-slate-800'
              }`}
            >
              <GitCompareArrows className="h-4 w-4" />
              {isCompared ? 'Comparing' : 'Compare'}
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
