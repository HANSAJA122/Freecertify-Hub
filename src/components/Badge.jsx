const variantStyles = {
  blue: 'bg-blue-50 dark:bg-blue-900/50 text-[#2563EB] dark:text-blue-400',
  green: 'bg-green-50 dark:bg-green-900/50 text-[#16A34A] dark:text-green-400',
  amber: 'bg-amber-50 dark:bg-amber-900/50 text-[#F59E0B] dark:text-amber-400',
  gray: 'bg-gray-100 dark:bg-slate-800 text-[#64748B] dark:text-slate-400',
  navy: 'bg-slate-900 dark:bg-slate-800 text-white',
};

const sizeStyles = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
};

export default function Badge({
  children,
  variant = 'blue',
  size = 'md',
  className = '',
}) {
  const classes = `inline-flex items-center rounded-full font-medium ${variantStyles[variant] || variantStyles.blue} ${sizeStyles[size] || sizeStyles.md} ${className}`;

  return <span className={classes}>{children}</span>;
}
