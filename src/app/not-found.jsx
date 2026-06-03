'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, BookOpen } from 'lucide-react';
import Button from '@/components/Button';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-160px)] px-4">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center max-w-lg"
      >
        {/* Large 404 */}
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[8rem] sm:text-[10rem] font-extrabold leading-none text-[#2563EB]/10 select-none"
        >
          404
        </motion.h1>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-2xl sm:text-3xl font-bold text-[#0F172A] dark:text-white -mt-6 mb-3"
        >
          Oops! This learning page does not exist.
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="text-[#64748B] dark:text-slate-400 mb-8 max-w-md mx-auto"
        >
          The page you&apos;re looking for might have been moved or doesn&apos;t
          exist. Let&apos;s get you back on track.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Button href="/" variant="primary" size="lg" icon={Home}>
            Back to Home
          </Button>
          <Button href="/courses" variant="outline" size="lg" icon={BookOpen}>
            Explore Courses
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
