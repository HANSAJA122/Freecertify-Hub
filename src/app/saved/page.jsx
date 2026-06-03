'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bookmark, Trash2 } from 'lucide-react';
import { courses } from '@/data/coursesData';
import CourseCard from '@/components/CourseCard';
import EmptyState from '@/components/EmptyState';
import SectionHeader from '@/components/SectionHeader';
import Button from '@/components/Button';
import {
  getSavedCourses,
  removeSavedCourse,
  clearSavedCourses,
  saveCourse,
  addCompareCourse,
  removeCompareCourse,
  isInCompare,
  getCompareCourses,
} from '@/utils/storage';

export default function SavedPage() {
  const [savedCourseIds, setSavedCourseIds] = useState([]);
  const [compareCourses, setCompareCourses] = useState([]);

  useEffect(() => {
    setSavedCourseIds(getSavedCourses());
    setCompareCourses(getCompareCourses());
  }, []);

  const savedCourses = courses.filter((c) => savedCourseIds.includes(c.id));

  function handleSave(courseId) {
    if (savedCourseIds.includes(courseId)) {
      const updated = removeSavedCourse(courseId);
      setSavedCourseIds(updated);
    } else {
      saveCourse(courseId);
      setSavedCourseIds(getSavedCourses());
    }
  }

  function handleCompare(courseId) {
    if (compareCourses.includes(courseId)) {
      const updated = removeCompareCourse(courseId);
      setCompareCourses(updated);
    } else {
      const result = addCompareCourse(courseId);
      if (result.success) {
        setCompareCourses(result.courses);
      }
    }
  }

  function handleClearAll() {
    if (window.confirm('Are you sure you want to remove all saved courses?')) {
      clearSavedCourses();
      setSavedCourseIds([]);
    }
  }

  if (savedCourses.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-12">
        <EmptyState
          icon={Bookmark}
          title="No Saved Courses Yet"
          description="You haven't saved any courses yet. Start exploring free certifications and save the ones you like."
          actionLabel="Explore Courses"
          actionHref="/courses"
        />
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <SectionHeader
          title={`Saved Courses (${savedCourses.length})`}
          subtitle="Courses you've bookmarked for later."
        />
        <Button
          variant="outline"
          size="sm"
          icon={Trash2}
          onClick={handleClearAll}
        >
          Clear All
        </Button>
      </div>

      {/* Course grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {savedCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            isSaved={savedCourseIds.includes(course.id)}
            isCompared={compareCourses.includes(course.id)}
            onSave={handleSave}
            onCompare={handleCompare}
          />
        ))}
      </motion.div>
    </section>
  );
}
