'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Bookmark,
  Clock,
  BarChart3,
  Star,
  ExternalLink,
  GitCompareArrows,
} from 'lucide-react';
import Badge from './Badge';

export default function CourseCard({
  course,
  onSave,
  onCompare,
  isSaved = false,
  isCompared = false,
}) {
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
      <div className="p-5 flex flex-col flex-1">
        {/* Top badges */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-[#2563EB]">{platform}</span>
          {certificate && (
            <Badge variant="green" size="sm">
              {certificate}
            </Badge>
          )}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-[#0F172A] dark:text-white line-clamp-2 mb-2">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-sm text-[#64748B] dark:text-slate-400 line-clamp-2 mb-3">
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
        <div className="flex items-center gap-4 text-sm text-[#64748B] dark:text-slate-400 mb-3">
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
          <div className="flex flex-wrap gap-1.5 mb-3">
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
        <div className="flex items-center gap-2 mt-auto pt-3 border-t border-[#E2E8F0] dark:border-slate-800">
          <button
            type="button"
            onClick={() => onSave?.(id)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
            aria-label={isSaved ? 'Unsave course' : 'Save course'}
          >
            <Bookmark
              className={`h-4 w-4 ${isSaved ? 'fill-[#2563EB] text-[#2563EB]' : 'text-[#64748B] dark:text-slate-400'}`}
            />
          </button>

          <button
            type="button"
            onClick={() => onCompare?.(id)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              isCompared
                ? 'bg-[#2563EB] text-white'
                : 'border border-[#E2E8F0] dark:border-slate-800 text-[#64748B] dark:text-slate-400 hover:border-[#2563EB] hover:text-[#2563EB] dark:hover:border-[#2563EB] dark:hover:text-[#2563EB]'
            }`}
          >
            <GitCompareArrows className="h-3.5 w-3.5" />
            Compare
          </button>

          <Link
            href={`/courses/${id}`}
            className="ml-auto flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#2563EB] text-white text-xs font-medium hover:bg-blue-700 transition-colors"
          >
            View Course
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
