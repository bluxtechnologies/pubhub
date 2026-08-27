import React from 'react';
import { cn } from '../../lib/utils/cn';

export interface BookCoverProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const BookCover: React.FC<BookCoverProps> = ({ src, alt, size = 'md', className }) => {
  const sizeClasses = {
    sm: 'w-16 h-24 rounded-sm',
    md: 'w-28 h-40 rounded',
    lg: 'w-40 h-56 rounded-md',
    xl: 'w-52 h-76 rounded-lg',
  };

  return (
    <div className={cn('relative overflow-hidden bg-slate-200 shadow-card shrink-0 transition-transform duration-300 hover:scale-[1.02]', sizeClasses[size], className)}>
      <img src={src} alt={alt} className="w-full h-full object-cover" />
      {/* Subtle cover spine sheen effect */}
      <div className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
    </div>
  );
};
