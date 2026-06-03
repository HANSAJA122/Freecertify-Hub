import Link from 'next/link';
import { GraduationCap } from 'lucide-react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/courses', label: 'Courses' },
  { href: '/learning-paths', label: 'Learning Paths' },
  { href: '/platforms', label: 'Platforms' },
  { href: '/saved', label: 'Saved Courses' },
  { href: '/about', label: 'About' },
];

const categories = [
  { label: 'Artificial Intelligence', slug: 'Artificial Intelligence' },
  { label: 'Cybersecurity', slug: 'Cybersecurity' },
  { label: 'Web Development', slug: 'Web Development' },
  { label: 'Data Science', slug: 'Data Science' },
  { label: 'Business', slug: 'Business' },
  { label: 'Digital Marketing', slug: 'Digital Marketing' },
];

const platforms = [
  { label: 'Coursera', slug: 'Coursera' },
  { label: 'IBM SkillsBuild', slug: 'IBM SkillsBuild' },
  { label: 'Google Digital Garage', slug: 'Google Digital Garage' },
  { label: 'Microsoft Learn', slug: 'Microsoft Learn' },
  { label: 'Cisco', slug: 'Cisco' },
  { label: 'HP LIFE', slug: 'HP LIFE' },
];

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] dark:bg-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <GraduationCap className="h-6 w-6 text-[#2563EB]" />
              <span className="font-bold text-xl tracking-tight text-white flex items-center">
                FreeCertify<span className="ml-1 bg-[#2563EB] text-white px-1.5 py-0.5 rounded-md">Hub</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm mb-6">
              Helping students and job seekers find free certifications from
              trusted learning platforms.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/HANSAJA122"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Shashith Hansaja GitHub"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <FaGithub className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/shashith-hansaja-931796247/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Shashith Hansaja LinkedIn"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:whshansaja.w@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Email Shashith Hansaja"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <FaEnvelope className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/courses?category=${encodeURIComponent(cat.slug)}`}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Platforms */}
          <div>
            <h3 className="text-white font-semibold mb-4">Platforms</h3>
            <ul className="space-y-2">
              {platforms.map((plat) => (
                <li key={plat.slug}>
                  <Link
                    href={`/courses?platform=${encodeURIComponent(plat.slug)}`}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {plat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 dark:border-slate-700 mt-12 pt-8 pb-8">
          <p className="text-slate-500 text-sm text-center mb-1">
            © 2026 <span className="text-[#2563EB] font-medium">Shashith Hansaja</span>. All rights reserved.
          </p>
          <p className="text-slate-500 text-xs text-center">
            Designed and developed by Shashith Hansaja
          </p>
        </div>
      </div>
    </footer>
  );
}
