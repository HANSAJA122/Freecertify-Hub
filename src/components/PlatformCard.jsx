'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ExternalLink, BookOpen, Building2 } from 'lucide-react';
import Badge from './Badge';

export default function PlatformCard({ platform, courseCount = 0 }) {
  const [imgError, setImgError] = useState(false);

  const {
    name,
    description,
    categories = [],
    certificateAvailability,
    url,
    platformUrl,
    color = '#2563EB',
    logo
  } = platform;

  // Use platformUrl if available, fallback to url
  const targetUrl = platformUrl || url;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-[#E2E8F0] dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col">
      {/* Top section with logo */}
      <div 
        className="h-20 w-full flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 border-b border-[#E2E8F0] dark:border-slate-800 relative"
      >
        <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: color }} />
        
        {!imgError && logo ? (
          <img 
            src={logo} 
            alt={name} 
            onError={() => setImgError(true)} 
            className="h-10 object-contain"
          />
        ) : (
          <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500">
            <Building2 className="h-6 w-6" />
            <span className="font-semibold text-sm">{name}</span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        {/* Platform name */}
        <h3 className="text-xl font-bold text-[#0F172A] dark:text-white mb-2">{name}</h3>

        {/* Description */}
        {description && (
          <p className="text-sm text-[#64748B] dark:text-slate-400 line-clamp-3 mb-4">
            {description}
          </p>
        )}

        {/* Course count */}
        <div className="flex items-center gap-1.5 text-sm font-medium text-[#0F172A] dark:text-white mb-4">
          <BookOpen className="h-4 w-4 text-[#2563EB]" />
          <span>
            {courseCount} {courseCount === 1 ? 'Course' : 'Courses'} Available
          </span>
        </div>

        {/* Categories preview */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {categories.slice(0, 3).map((cat) => (
              <Badge key={cat} variant="blue" size="sm">
                {cat}
              </Badge>
            ))}
            {categories.length > 3 && (
              <Badge variant="gray" size="sm">
                +{categories.length - 3} more
              </Badge>
            )}
          </div>
        )}

        {/* Certificate info */}
        {certificateAvailability && (
          <div className="mb-5 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30 p-3 rounded-lg">
            <p className="text-xs text-green-800 dark:text-green-300">
              <span className="font-semibold block mb-0.5">Certificates:</span>
              {certificateAvailability}
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-auto pt-4 border-t border-[#E2E8F0] dark:border-slate-800">
          
          <Link
            href={`/courses?platform=${encodeURIComponent(name)}`}
            className="flex-1 flex justify-center items-center gap-1.5 px-4 py-2 rounded-lg bg-[#2563EB] text-white text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            View Courses
          </Link>

          {targetUrl && (
            <a
              href={targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex justify-center items-center gap-1.5 px-4 py-2 rounded-lg border border-[#E2E8F0] dark:border-slate-700 text-sm font-medium text-[#0F172A] dark:text-white hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
            >
              Visit Platform
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
          
        </div>
      </div>
    </div>
  );
}
