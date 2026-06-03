'use client';

import { motion } from 'framer-motion';
import Button from './Button';

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      {Icon && (
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#F8FAFC] dark:bg-slate-900 mb-4">
          <Icon className="h-8 w-8 text-[#64748B] dark:text-slate-400" />
        </div>
      )}
      <h3 className="text-lg font-bold text-[#0F172A] dark:text-white mb-2">{title}</h3>
      {description && (
        <p className="text-[#64748B] dark:text-slate-400 max-w-md mb-6">{description}</p>
      )}
      {actionLabel && actionHref && (
        <Button href={actionHref} variant="primary" size="md">
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
}
