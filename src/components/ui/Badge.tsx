import React from 'react';
import { cn } from '../../lib/utils/cn';

export interface BadgeProps {
  variant?: 'default' | 'brand' | 'success' | 'warning' | 'error' | 'outline';
  size?: 'sm' | 'md';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  children,
  className,
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full transition-colors select-none',
        variant === 'default' && 'bg-slate-100 text-slate-700 border border-slate-200',
        variant === 'brand' && 'bg-brand-50 text-brand-900 border border-brand-200/60 font-semibold',
        variant === 'success' && 'bg-emerald-50 text-emerald-700 border border-emerald-200/60',
        variant === 'warning' && 'bg-amber-50 text-amber-700 border border-amber-200/60',
        variant === 'error' && 'bg-rose-50 text-rose-700 border border-rose-200/60',
        variant === 'outline' && 'bg-transparent text-slate-600 border border-slate-300',
        size === 'sm' && 'px-2 py-0.5 text-[11px]',
        size === 'md' && 'px-2.5 py-1 text-xs',
        className
      )}
    >
      {children}
    </span>
  );
};
