'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BookOpen, Building2, Target, DollarSign } from 'lucide-react';

const stats = [
  {
    icon: BookOpen,
    value: '30+',
    label: 'Free Courses',
  },
  {
    icon: Building2,
    value: '12',
    label: 'Trusted Platforms',
  },
  {
    icon: Target,
    value: '10',
    label: 'Career Paths',
  },
  {
    icon: DollarSign,
    value: '100%',
    label: 'Free Access',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
    >
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            className="bg-white dark:bg-slate-900 rounded-xl border border-[#E2E8F0] dark:border-slate-800 p-6 text-center shadow-sm"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 dark:bg-slate-800 mx-auto mb-3">
              <Icon className="h-6 w-6 text-[#2563EB]" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-[#0F172A] dark:text-white mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-[#64748B] dark:text-slate-400">{stat.label}</div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
