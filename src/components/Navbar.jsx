'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Menu, X } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/courses', label: 'Courses' },
  { href: '/learning-paths', label: 'Learning Paths' },
  { href: '/platforms', label: 'Platforms' },
  { href: '/saved', label: 'Saved' },
  { href: '/compare', label: 'Compare' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-slate-950 border-b border-[#E2E8F0] dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-[#2563EB]" />
            <span className="font-bold text-xl tracking-tight text-[#0F172A] dark:text-white flex items-center">
              FreeCertify<span className="ml-1 bg-[#2563EB] text-white px-1.5 py-0.5 rounded-md">Hub</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors ${
                  pathname === link.href
                    ? 'text-[#2563EB] font-medium'
                    : 'text-[#64748B] hover:text-[#2563EB]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/courses"
              className="bg-[#2563EB] text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Explore Free Courses
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden text-[#0F172A]"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-50 bg-white dark:bg-slate-950 lg:hidden"
          >
            <div className="flex items-center justify-between h-16 px-4 sm:px-6 border-b border-[#E2E8F0] dark:border-slate-800">
              <Link
                href="/"
                className="flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <GraduationCap className="h-6 w-6 text-[#2563EB]" />
                <span className="font-bold text-xl tracking-tight text-[#0F172A] dark:text-white flex items-center">
                  FreeCertify<span className="ml-1 bg-[#2563EB] text-white px-1.5 py-0.5 rounded-md">Hub</span>
                </span>
              </Link>
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="text-[#0F172A] dark:text-white"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="flex flex-col py-4 px-4 sm:px-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-3 text-sm transition-colors ${
                    pathname === link.href
                      ? 'text-[#2563EB] font-medium'
                      : 'text-[#64748B] hover:text-[#2563EB]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/courses"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 bg-[#2563EB] text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center"
              >
                Explore Free Courses
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
