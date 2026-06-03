'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Bookmark,
  Clock,
  BarChart3,
  Star,
  ExternalLink,
  GitCompareArrows,
  BookOpen
} from 'lucide-react';
import Badge from './Badge';

export default function CourseCard({
  course,
  onSave,
  onCompare,
  isSaved = false,
  isCompared = false,
}) {
  const [imgError, setImgError] = useState(false);

  const {
    id,
    title,
    description,
    platform,
    category,
    duration,
    difficulty,
    certificate,
    rating,
    skills = [],
    careerGoal,
    url,
    image,
    providerLogo,
    courseUrl,
    ctaText,
    linkAccuracy
  } = course;

  const difficultyVariant =
    difficulty === 'Beginner'
      ? 'green'
      : difficulty === 'Intermediate'
        ? 'amber'
        : 'gray';

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-white dark:bg-slate-900 rounded-xl border border-[#E2E8F0] dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
    >
      {/* Top Image Section */}
      <div className="relative h-44 w-full bg-slate-50 dark:bg-slate-800/50 border-b border-[#E2E8F0] dark:border-slate-800">
        {!imgError && image ? (
          <img
            src={image}
            alt={title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
            <BookOpen className="h-10 w-10 text-slate-300 dark:text-slate-600 mb-2" />
            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">{category}</span>
          </div>
        )}
        
        {/* Badges on top of image */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
          <Badge variant="blue" size="sm">
            {category}
          </Badge>
          {certificate && (
            <Badge variant="green" size="sm">
              Free Certificate
            </Badge>
          )}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        {/* Platform with logo */}
        <div className="flex items-center gap-2 mb-3">
          {providerLogo && (
            <img 
              src={providerLogo} 
              alt={platform} 
              className="h-5 w-auto object-contain" 
              onError={(e) => { e.target.style.display = 'none'; }} 
            />
          )}
          <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">{platform}</span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-lg leading-snug text-[#0F172A] dark:text-white line-clamp-2 mb-2">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-sm text-[#64748B] dark:text-slate-400 line-clamp-2 mb-4">
            {description}
          </p>
        )}

        {/* Rating */}
        {rating && (
          <div className="flex items-center gap-1 mb-3">
            <Star className="h-4 w-4 text-[#F59E0B] fill-[#F59E0B]" />
            <span className="text-sm font-medium text-[#0F172A] dark:text-white">
              {rating}
            </span>
          </div>
        )}

        {/* Meta: duration & difficulty */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-[#64748B] dark:text-slate-400 mb-3">
          {duration && (
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{duration}</span>
            </div>
          )}
          {difficulty && (
            <div className="flex items-center gap-1">
              <BarChart3 className="h-3.5 w-3.5" />
              <Badge variant={difficultyVariant} size="sm">
                {difficulty}
              </Badge>
            </div>
          )}
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {skills.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="gray" size="sm">
                {skill}
              </Badge>
            ))}
          </div>
        )}

        {/* Career goal */}
        {careerGoal && (
          <div className="mb-4">
            <Badge variant="navy" size="sm">
              {careerGoal}
            </Badge>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3 mt-auto pt-4 border-t border-[#E2E8F0] dark:border-slate-800">
          
          {/* Link Accuracy Label */}
          {linkAccuracy && (
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 text-center -mb-1">
              {linkAccuracy === 'Exact Course Page' ? '🎯 ' : '🔍 '}
              {linkAccuracy}
            </div>
          )}

          {/* Primary CTA */}
          {courseUrl ? (
            <a
              href={courseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-[#2563EB] text-white text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              {ctaText || "Start Free Certificate"}
              <ExternalLink className="h-4 w-4" />
            </a>
          ) : (
            <button
              disabled
              className="flex items-center justify-center w-full py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 text-sm font-medium cursor-not-allowed"
            >
              Official Link Coming Soon
            </button>
          )}

          {/* Secondary Actions Row */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onSave?.(id)}
                className={`p-2 rounded-lg border transition-colors ${
                  isSaved
                    ? 'border-[#2563EB] bg-blue-50 dark:bg-blue-900/20 text-[#2563EB]'
                    : 'border-[#E2E8F0] dark:border-slate-700 text-[#64748B] dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800'
                }`}
                aria-label={isSaved ? 'Unsave course' : 'Save course'}
              >
                <Bookmark
                  className={`h-4 w-4 ${isSaved ? 'fill-[#2563EB]' : ''}`}
                />
              </button>

              <button
                type="button"
                onClick={() => onCompare?.(id)}
                className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  isCompared
                    ? 'border-[#2563EB] bg-blue-50 dark:bg-blue-900/20 text-[#2563EB]'
                    : 'border-[#E2E8F0] dark:border-slate-700 text-[#64748B] dark:text-slate-400 hover:border-[#2563EB] hover:text-[#2563EB] dark:hover:border-[#2563EB] dark:hover:text-[#2563EB]'
                }`}
              >
                <GitCompareArrows className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{isCompared ? 'Comparing' : 'Compare'}</span>
              </button>
            </div>

            <Link
              href={`/courses/${id}`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E2E8F0] dark:border-slate-700 text-[#0F172A] dark:text-white text-xs font-medium hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
            >
              View Details
            </Link>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
