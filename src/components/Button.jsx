import Link from 'next/link';

const variantStyles = {
  primary: 'bg-[#2563EB] text-white hover:bg-blue-700',
  secondary: 'bg-[#0F172A] text-white hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700',
  outline: 'border border-[#E2E8F0] dark:border-slate-800 text-[#0F172A] dark:text-white hover:bg-gray-50 dark:hover:bg-slate-800',
  ghost: 'text-[#64748B] dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800',
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  href,
  onClick,
  icon: Icon,
  disabled = false,
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/50 disabled:opacity-50 disabled:cursor-not-allowed';

  const classes = `${baseStyles} ${variantStyles[variant] || variantStyles.primary} ${sizeStyles[size] || sizeStyles.md} ${className}`;

  if (href && !disabled) {
    return (
      <Link href={href} className={classes} {...props}>
        {Icon && <Icon className="h-4 w-4" />}
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </button>
  );
}
