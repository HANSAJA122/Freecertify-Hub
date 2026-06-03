'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import CourseCard from '@/components/CourseCard';
import PlatformCard from '@/components/PlatformCard';
import LearningPathCard from '@/components/LearningPathCard';
import SectionHeader from '@/components/SectionHeader';
import StatsSection from '@/components/StatsSection';
import TestimonialCard from '@/components/TestimonialCard';
import Badge from '@/components/Badge';
import { courses, categories } from '@/data/coursesData';
import { learningPaths } from '@/data/learningPathsData';
import { platformsInfo } from '@/data/platformsData';
import {
  getSavedCourses,
  saveCourse,
  removeSavedCourse,
  getCompareCourses,
  addCompareCourse,
  removeCompareCourse,
} from '@/utils/storage';
import {
  BookOpen,
  Shield,
  Target,
  GitCompareArrows,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

const sectionReveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const features = [
  {
    icon: Sparkles,
    title: 'All Free, Always',
    description: 'Every course listed is completely free with certification included.',
    color: 'text-[#2563EB]',
    bg: 'bg-blue-50',
  },
  {
    icon: Shield,
    title: 'Trusted Platforms',
    description: 'Curated from 12+ verified learning platforms worldwide.',
    color: 'text-[#16A34A]',
    bg: 'bg-green-50',
  },
  {
    icon: Target,
    title: 'Career-Focused',
    description: 'Courses organized by career goals and in-demand skills.',
    color: 'text-[#EA580C]',
    bg: 'bg-orange-50',
  },
  {
    icon: GitCompareArrows,
    title: 'Save & Compare',
    description: 'Bookmark courses and compare up to 3 side by side.',
    color: 'text-[#7C3AED]',
    bg: 'bg-purple-50',
  },
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Computer Science Student',
    text: 'FreeCertify Hub helped me find the perfect cybersecurity course. I earned my first certificate in just 3 hours!',
    initials: 'SC',
  },
  {
    name: 'Marcus Johnson',
    role: 'Career Changer',
    text: 'As someone switching to tech, this platform made it easy to find free courses that actually give you certificates.',
    initials: 'MJ',
  },
  {
    name: 'Priya Sharma',
    role: 'Recent Graduate',
    text: 'I added 5 free certifications to my resume using courses I found here. Highly recommend for job seekers!',
    initials: 'PS',
  },
];

export default function HomeContent() {
  const [savedCourses, setSavedCourses] = useState([]);
  const [compareCourses, setCompareCourses] = useState([]);

  useEffect(() => {
    setSavedCourses(getSavedCourses());
    setCompareCourses(getCompareCourses());
  }, []);

  const handleSave = (courseId) => {
    if (savedCourses.includes(courseId)) {
      removeSavedCourse(courseId);
      setSavedCourses((prev) => prev.filter((id) => id !== courseId));
    } else {
      saveCourse(courseId);
      setSavedCourses((prev) => [...prev, courseId]);
    }
  };

  const handleCompare = (courseId) => {
    if (compareCourses.includes(courseId)) {
      removeCompareCourse(courseId);
      setCompareCourses((prev) => prev.filter((id) => id !== courseId));
    } else {
      addCompareCourse(courseId);
      setCompareCourses((prev) => [...prev, courseId]);
    }
  };

  const featuredCourses = [...courses].sort((a, b) => b.rating - a.rating).slice(0, 6);

  const trendingCourses = courses
    .filter(
      (c) =>
        c.category === 'Artificial Intelligence' ||
        c.category === 'AI' ||
        c.category === 'Cybersecurity'
    )
    .slice(0, 6);

  const quickCourses = courses.filter((c) => c.durationHours < 3).slice(0, 6);

  const displayedPlatforms = platformsInfo.slice(0, 6);

  const displayedPaths = learningPaths.slice(0, 4);

  return (
    <main>
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Browse by Category */}
      <section className="py-16 md:py-20 bg-[#F8FAFC] dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...sectionReveal}>
            <SectionHeader
              title="Browse by Category"
              subtitle="Find courses in the field that interests you"
            />
            <div className="flex flex-wrap gap-3 mt-8 justify-center">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/courses?category=${encodeURIComponent(category)}`}
                  className="bg-white dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-800 text-[#64748B] dark:text-slate-400 hover:border-[#2563EB] hover:text-[#2563EB] rounded-full px-5 py-2.5 text-sm font-medium transition-all"
                >
                  {category}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Featured Free Certificates */}
      <section className="py-16 md:py-20 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...sectionReveal}>
            <SectionHeader
              title="Featured Free Certificates"
              subtitle="Top-rated courses with free certifications"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {featuredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  isSaved={savedCourses.includes(course.id)}
                  isCompare={compareCourses.includes(course.id)}
                  onSave={() => handleSave(course.id)}
                  onCompare={() => handleCompare(course.id)}
                />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 text-[#2563EB] font-medium hover:underline"
              >
                View All Courses
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. Trending Now */}
      <section className="py-16 md:py-20 bg-[#F8FAFC] dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...sectionReveal}>
            <SectionHeader
              title="Trending Now"
              subtitle="Popular courses learners are taking right now"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {trendingCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  isSaved={savedCourses.includes(course.id)}
                  isCompare={compareCourses.includes(course.id)}
                  onSave={() => handleSave(course.id)}
                  onCompare={() => handleCompare(course.id)}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. Short Certificates Under 3 Hours */}
      <section className="py-16 md:py-20 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...sectionReveal}>
            <SectionHeader
              title="Quick Wins: Under 3 Hours"
              subtitle="Earn a certificate in a single sitting"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {quickCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  isSaved={savedCourses.includes(course.id)}
                  isCompare={compareCourses.includes(course.id)}
                  onSave={() => handleSave(course.id)}
                  onCompare={() => handleCompare(course.id)}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. Popular Platforms */}
      <section className="py-16 md:py-20 bg-[#F8FAFC] dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...sectionReveal}>
            <SectionHeader
              title="Popular Platforms"
              subtitle="Trusted learning platforms offering free courses"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {displayedPlatforms.map((platform) => (
                <PlatformCard
                  key={platform.name}
                  platform={platform}
                  courseCount={courses.filter((c) => c.platform === platform.name).length}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7. Learning Paths */}
      <section className="py-16 md:py-20 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...sectionReveal}>
            <SectionHeader
              title="Learning Paths"
              subtitle="Follow structured paths to build career-ready skills"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {displayedPaths.map((path) => (
                <LearningPathCard key={path.id || path.slug} path={path} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                href="/learning-paths"
                className="inline-flex items-center gap-2 text-[#2563EB] font-medium hover:underline"
              >
                View All Paths
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 8. Why FreeCertify Hub */}
      <section className="py-16 md:py-20 bg-[#F8FAFC] dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...sectionReveal}>
            <SectionHeader
              title="Why FreeCertify Hub?"
              subtitle="Everything you need to find the right free course"
              centered
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-[#E2E8F0] dark:border-slate-700 shadow-sm text-center"
                  >
                    <div
                      className={`${feature.bg} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4`}
                    >
                      <Icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <h3 className="font-semibold text-[#0F172A] dark:text-white mb-2">{feature.title}</h3>
                    <p className="text-sm text-[#64748B] dark:text-slate-400">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 9. Stats */}
      <StatsSection />

      {/* 10. Testimonials */}
      <section className="py-16 md:py-20 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...sectionReveal}>
            <SectionHeader
              title="What Learners Say"
              subtitle="Real feedback from students and job seekers"
              centered
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.initials} testimonial={testimonial} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
