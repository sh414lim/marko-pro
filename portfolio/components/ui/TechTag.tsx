import { clsx } from 'clsx';

interface TechTagProps {
  label: string;
  variant?: 'default' | 'dark';
  className?: string;
}

export default function TechTag({ label, variant = 'default', className }: TechTagProps) {
  return (
    <span
      className={clsx(
        'inline-block font-mono text-xs px-3 py-1 border rounded-sm',
        'transition-colors duration-300',
        variant === 'default'
          ? 'border-accent text-accent hover:bg-accent hover:text-white'
          : 'border-white/30 text-white/70 hover:border-white hover:text-white',
        className
      )}
    >
      {label}
    </span>
  );
}
