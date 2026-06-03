'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Clock,
  BarChart3,
  Target,
  CheckCircle2,
  Users,
  BookOpen,
} from 'lucide-react';
import { learningPaths } from '@/data/learningPathsData';
import { courses } from '@/data/coursesData';
import CourseCard from '@/components/CourseCard';
import Badge from '@/components/Badge';
import Button from '@/components/Button';
import {
  saveCourse,
  removeSavedCourse,
  isCourseSaved,
  addCompareCourse,
  removeCompareCourse,
  isInCompare,
} from '@/utils/storage';

export default function LearningPathDetailPage({ params }) {
  const { id } = use(params);

  const [savedIds, setSavedIds] = useState([]);
  const [compareIds, setCompareIds] = useState([]);

  const path = learningPaths.find((p) => p.id === id);

  useEffect(() => {
    if (!path) return;
    // Hydrate save / compare state from localStorage
    const sIds = path.courseIds.filter((cid) => isCourseSaved(cid));
    setSavedIds(sIds);
    const cIds = path.courseIds.filter((cid) => isInCompare(cid));
    setCompareIds(cIds);
  }, [path]);

  if (!path) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-[#0F172A] dark:text-white mb-4">
          Path Not Found
        </h1>
        <p className="text-[#64748B] dark:text-slate-400 mb-6">
          The learning path you&apos;re looking for doesn&apos;t exist.
        </p>
        <Button href="/learning-paths" icon={ArrowLeft}>
          Back to Learning Paths
        </Button>
      </section>
    );
  }

  const pathCourses = path.courseIds
    .map((cid) => courses.find((c) => c.id === cid))
    .filter(Boolean);

  const firstCourseId = pathCourses.length > 0 ? pathCourses[0].id : null;

  const difficultyVariant =
    path.difficulty === 'Beginner'
      ? 'green'
      : path.difficulty === 'Intermediate'
        ? 'amber'
        : 'gray';

  function handleSave(courseId) {
    if (savedIds.includes(courseId)) {
      removeSavedCourse(courseId);
      setSavedIds((prev) => prev.filter((id) => id !== courseId));
    } else {
      saveCourse(courseId);
      setSavedIds((prev) => [...prev, courseId]);
    }
  }

  function handleCompare(courseId) {
    if (compareIds.includes(courseId)) {
      removeCompareCourse(courseId);
      setCompareIds((prev) => prev.filter((id) => id !== courseId));
    } else {
      const result = addCompareCourse(courseId);
      if (result.success) {
        setCompareIds((prev) => [...prev, courseId]);
      }
    }
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      {/* Back link */}
      <Link
        href="/learning-paths"
        className="inline-flex items-center gap-1.5 text-sm text-[#64748B] dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Learning Paths
      </Link>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A] dark:text-white mb-3">
          {path.title}
        </h1>
        <p className="text-[#64748B] dark:text-slate-400 max-w-3xl mb-6">{path.description}</p>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-[#64748B] dark:text-slate-400 mb-8">
          {path.estimatedTime && (
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span>{path.estimatedTime}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <BarChart3 className="h-4 w-4" />
            <Badge variant={difficultyVariant} size="sm">
              {path.difficulty}
            </Badge>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" />
            <span>
              {pathCourses.length}{' '}
              {pathCourses.length === 1 ? 'Course' : 'Courses'}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Skills You'll Learn */}
      {path.skills && path.skills.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-xl font-bold text-[#0F172A] dark:text-white mb-3 flex items-center gap-2">
            <Target className="h-5 w-5 text-[#2563EB]" />
            Skills You&apos;ll Learn
          </h2>
          <div className="flex flex-wrap gap-2">
            {path.skills.map((skill) => (
              <Badge key={skill} variant="blue" size="md">
                {skill}
              </Badge>
            ))}
          </div>
        </motion.div>
      )}

      {/* Best For */}
      {path.bestFor && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mb-10"
        >
          <h2 className="text-xl font-bold text-[#0F172A] dark:text-white mb-3 flex items-center gap-2">
            <Users className="h-5 w-5 text-[#2563EB]" />
            Best For
          </h2>
          <ul className="space-y-2">
            {(Array.isArray(path.bestFor)
              ? path.bestFor
              : path.bestForList || [path.bestFor]
            ).map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-[#64748B] dark:text-slate-400"
              >
                <CheckCircle2 className="h-4 w-4 text-[#16A34A] shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Recommended Course Order */}
      {pathCourses.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-10"
        >
          <h2 className="text-xl font-bold text-[#0F172A] dark:text-white mb-6 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-[#2563EB]" />
            Recommended Course Order
          </h2>
          <div className="space-y-4">
            {pathCourses.map((course, index) => (
              <div key={course.id} className="flex gap-4 items-start">
                {/* Step number */}
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#2563EB] text-white text-sm font-bold shrink-0 mt-4">
                  {index + 1}
                </div>
                {/* Course card */}
                <div className="flex-1">
                  <CourseCard
                    course={course}
                    isSaved={savedIds.includes(course.id)}
                    isCompared={compareIds.includes(course.id)}
                    onSave={handleSave}
                    onCompare={handleCompare}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Start Learning button */}
      {firstCourseId && (
        <div className="flex justify-center">
          <Button href={`/courses/${firstCourseId}`} size="lg">
            Start Learning
          </Button>
        </div>
      )}
    </section>
  );
}
