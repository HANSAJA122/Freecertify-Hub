'use client';

import { useState, useEffect } from 'react';
import { GitCompareArrows } from 'lucide-react';
import { courses } from '@/data/coursesData';
import CompareTable from '@/components/CompareTable';
import EmptyState from '@/components/EmptyState';
import SectionHeader from '@/components/SectionHeader';
import Button from '@/components/Button';
import { getCompareCourses, clearCompareCourses } from '@/utils/storage';

export default function ComparePage() {
  const [compareCourseIds, setCompareCourseIds] = useState([]);

  useEffect(() => {
    setCompareCourseIds(getCompareCourses());
  }, []);

  const handleClearAll = () => {
    clearCompareCourses();
    setCompareCourseIds([]);
  };

  if (compareCourseIds.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <EmptyState
          icon={GitCompareArrows}
          title="No Courses to Compare"
          description="Select up to 3 courses to compare them side by side. Go to the courses page and use the compare button on any course card."
          actionLabel="Browse Courses"
          actionHref="/courses"
        />
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <SectionHeader
          title={`Compare Courses (${compareCourseIds.length}/3)`}
          subtitle="See how your selected courses stack up against each other."
        />
        <Button
          variant="outline"
          size="sm"
          onClick={handleClearAll}
        >
          Clear All
        </Button>
      </div>

      <CompareTable courseIds={compareCourseIds} />

      <p className="text-sm text-[#64748B] dark:text-slate-400 mt-6 text-center">
        You can compare up to 3 courses at a time.
      </p>
    </section>
  );
}
