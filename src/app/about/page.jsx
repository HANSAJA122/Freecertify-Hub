'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import {
  Target,
  Users,
  Lightbulb,
  Award,
  Heart,
  AlertTriangle,
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
};

const sections = [
  {
    icon: Target,
    color: 'bg-blue-100 text-blue-600',
    title: 'Our Mission',
    content:
      'FreeCertify Hub was created to help students, beginners, and job seekers discover free certification courses without wasting time searching across many different websites. Our goal is to make free learning easier, faster, and more organized.',
  },
  {
    icon: Users,
    color: 'bg-green-100 text-green-600',
    title: 'Who This Is For',
    list: [
      'Students looking for free certifications to boost their resume',
      'Beginners wanting to learn new skills without paying',
      'Job seekers looking for career-relevant certifications',
      'Professionals wanting to upskill during career transitions',
      'Anyone who believes in free, accessible education',
    ],
  },
  {
    icon: Lightbulb,
    color: 'bg-yellow-100 text-yellow-600',
    title: 'How It Works',
    list: [
      'Browse our curated collection of free certification courses',
      'Filter by category, platform, duration, or career goal',
      'Save courses you\'re interested in for later',
      'Compare courses side by side to find the best fit',
      'Click through to the official platform to start learning',
    ],
  },
  {
    icon: Award,
    color: 'bg-purple-100 text-purple-600',
    title: 'Why Free Certifications Matter',
    list: [
      'They prove your skills to employers',
      'They show initiative and self-motivation',
      'They provide structured learning paths',
      'They are accessible to everyone, regardless of budget',
      'They help bridge the skills gap in the job market',
    ],
  },
  {
    icon: Heart,
    color: 'bg-red-100 text-red-600',
    title: 'Our Values',
    list: [
      'Accessibility — Education should be free and available to all',
      'Quality — We only list courses from trusted, verified platforms',
      'Simplicity — Finding the right course should be easy',
      'Transparency — We clearly state what\'s free and what\'s not',
    ],
  },
  {
    icon: AlertTriangle,
    color: 'bg-orange-100 text-orange-600',
    title: 'Disclaimer',
    content:
      'FreeCertify Hub does not own or host any courses. Course links redirect users to official learning platforms. Certificate availability may depend on each provider\'s current policy. We recommend checking the platform directly for the most up-to-date information.',
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <SectionHeader
          title="About FreeCertify Hub"
          subtitle="Helping students and job seekers find free certifications from trusted learning platforms."
          align="center"
        />
      </motion.div>

      {/* Sections */}
      <div className="space-y-12">
        {sections.map((section, index) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={section.title}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={fadeUp}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-[#E2E8F0] dark:border-slate-800 p-6 sm:p-8"
            >
              <div className="flex items-start gap-4 sm:gap-6">
                <div
                  className={`flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl ${section.color}`}
                >
                  <Icon className="h-6 w-6" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-[#0F172A] dark:text-white mb-3">
                    {section.title}
                  </h3>

                  {section.content && (
                    <p className="text-[#64748B] dark:text-slate-400 leading-relaxed">
                      {section.content}
                    </p>
                  )}

                  {section.list && (
                    <ul className="space-y-2">
                      {section.list.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-[#64748B] dark:text-slate-400"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#2563EB]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Portfolio description */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-16 text-center max-w-3xl mx-auto"
      >
        <div className="bg-[#F8FAFC] dark:bg-slate-900 rounded-2xl border border-[#E2E8F0] dark:border-slate-800 p-6 sm:p-8">
          <p className="text-sm text-[#64748B] dark:text-slate-400 leading-relaxed">
            FreeCertify Hub is a Next.js web application that helps students and
            job seekers discover free certification courses from trusted learning
            platforms. It includes course search, filtering, learning paths,
            saved courses, course comparison, recently viewed courses, and
            external course navigation — creating a Coursera-like experience
            focused only on free learning opportunities.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
