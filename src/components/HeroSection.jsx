'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Building2, TrendingUp, Bookmark, Award, ArrowRight } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function HeroSection() {
  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center bg-gradient-to-b from-white to-[#F8FAFC] dark:from-slate-900 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={childVariants}>
              <span className="inline-flex items-center gap-2 bg-blue-50 dark:bg-slate-800 text-[#2563EB] text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                ✨ 100% Free Courses with Certificates
              </span>
            </motion.div>

            <motion.h1
              variants={childVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F172A] dark:text-white leading-tight tracking-tight"
            >
              Find Free Certification Courses That Actually Matter
            </motion.h1>

            <motion.p
              variants={childVariants}
              className="text-lg text-[#64748B] dark:text-slate-400 mt-6 leading-relaxed max-w-xl"
            >
              Discover free courses with certificates from trusted platforms. Search by skill,
              platform, duration, or career path — and start learning today.
            </motion.p>

            <motion.div variants={childVariants} className="flex flex-wrap gap-4 mt-8">
              <Link
                href="/courses"
                className="bg-[#2563EB] text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
              >
                Explore Courses
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/learning-paths"
                className="border border-[#E2E8F0] dark:border-slate-800 text-[#0F172A] dark:text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
              >
                View Learning Paths
              </Link>
            </motion.div>

            <motion.p
              variants={childVariants}
              className="text-sm text-[#64748B] dark:text-slate-400 mt-6 flex items-center gap-2"
            >
              Trusted by learners worldwide · 30+ Free Courses · 12 Platforms
            </motion.p>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-[#E2E8F0] dark:border-slate-700 p-6 relative overflow-hidden">
              {/* Decorative dots */}
              <div className="absolute rounded-full bg-[#2563EB]/10 w-32 h-32 -top-8 -right-8" />
              <div className="absolute rounded-full bg-[#2563EB]/10 w-32 h-32 -bottom-8 -left-8" />

              <p className="text-sm font-semibold text-[#64748B] dark:text-slate-400 uppercase tracking-wider mb-4 relative z-10">
                Your Learning Dashboard
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-4 relative z-10">
                <div className="bg-[#F8FAFC] dark:bg-slate-900 rounded-lg p-4 flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-[#2563EB]" />
                  <div>
                    <p className="text-xl font-bold text-[#0F172A] dark:text-white">30+</p>
                    <p className="text-xs text-[#64748B] dark:text-slate-400">Free Courses</p>
                  </div>
                </div>
                <div className="bg-[#F8FAFC] dark:bg-slate-900 rounded-lg p-4 flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-[#2563EB]" />
                  <div>
                    <p className="text-xl font-bold text-[#0F172A] dark:text-white">12</p>
                    <p className="text-xs text-[#64748B] dark:text-slate-400">Platforms</p>
                  </div>
                </div>
                <div className="bg-[#F8FAFC] dark:bg-slate-900 rounded-lg p-4 flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-[#2563EB]" />
                  <div>
                    <p className="text-xl font-bold text-[#0F172A] dark:text-white">AI, Web Dev</p>
                    <p className="text-xs text-[#64748B] dark:text-slate-400">Trending Skills</p>
                  </div>
                </div>
                <div className="bg-[#F8FAFC] dark:bg-slate-900 rounded-lg p-4 flex items-center gap-3">
                  <Bookmark className="w-5 h-5 text-[#2563EB]" />
                  <div>
                    <p className="text-xl font-bold text-[#0F172A] dark:text-white">Save & Compare</p>
                    <p className="text-xs text-[#64748B] dark:text-slate-400">Your Tools</p>
                  </div>
                </div>
              </div>

              {/* Free Certificate Badge */}
              <div className="bg-[#16A34A]/10 text-[#16A34A] flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium relative z-10">
                <Award className="w-4 h-4" />
                Free Certificates Available
              </div>

              {/* Trending List */}
              <div className="text-sm mt-4 relative z-10">
                <span className="font-bold text-[#0F172A] dark:text-white">Trending Now: </span>
                <span className="text-[#64748B] dark:text-slate-400">
                  AI for Everyone · Cybersecurity Essentials · Digital Marketing
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
