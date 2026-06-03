import { Quote } from 'lucide-react';

export default function TestimonialCard({ testimonial }) {
  const { name, role, text, avatar } = testimonial;

  const initials =
    avatar ||
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

  return (
    <div className="bg-[#F8FAFC] dark:bg-slate-900 rounded-xl p-6 flex flex-col">
      {/* Quote icon */}
      <Quote className="h-8 w-8 text-[#E2E8F0] dark:text-slate-800 mb-4 rotate-180" />

      {/* Quote text */}
      <p className="text-[#0F172A] dark:text-white text-sm leading-relaxed flex-1 mb-6">
        &ldquo;{text}&rdquo;
      </p>

      {/* Author info */}
      <div className="flex items-center gap-3 pt-4 border-t border-[#E2E8F0] dark:border-slate-800">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#2563EB] text-white text-sm font-semibold shrink-0">
          {initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-[#0F172A] dark:text-white">{name}</p>
          {role && <p className="text-xs text-[#64748B] dark:text-slate-400">{role}</p>}
        </div>
      </div>
    </div>
  );
}
