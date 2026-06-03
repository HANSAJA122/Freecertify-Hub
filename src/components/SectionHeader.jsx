export default function SectionHeader({
  title,
  subtitle,
  align = 'left',
  className = '',
}) {
  const isCenter = align === 'center';

  return (
    <div className={`${isCenter ? 'text-center' : 'text-left'} ${className}`}>
      <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] dark:text-white">
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-[#64748B] dark:text-slate-400 mt-2 max-w-2xl ${isCenter ? 'mx-auto' : ''}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
