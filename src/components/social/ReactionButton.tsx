import React, { useState } from 'react';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { cn, formatNumber } from '../../lib/utils/cn';

export interface ReactionButtonProps {
  initialLiked?: boolean;
  initialCount: number;
  onToggle?: (liked: boolean) => void;
  size?: 'sm' | 'md';
}

export const ReactionButton: React.FC<ReactionButtonProps> = ({
  initialLiked = false,
  initialCount,
  onToggle,
  size = 'md',
}) => {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextLiked = !liked;
    setLiked(nextLiked);
    setCount((prev) => (nextLiked ? prev + 1 : prev - 1));
    if (onToggle) onToggle(nextLiked);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-medium transition-colors select-none',
        liked
          ? 'text-rose-600 bg-rose-50 border border-rose-200 hover:bg-rose-100'
          : 'text-slate-600 bg-slate-100 border border-slate-200 hover:bg-slate-200 hover:text-slate-900',
        size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3.5 py-1.5 text-sm'
      )}
    >
      {liked ? (
        <HeartSolid className={cn('text-rose-600 animate-in zoom-in-50', size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4')} />
      ) : (
        <HeartOutline className={cn(size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4')} />
      )}
      <span>{formatNumber(count)}</span>
    </button>
  );
};
