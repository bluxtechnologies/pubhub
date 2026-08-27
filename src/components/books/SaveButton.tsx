import React from 'react';
import { BookmarkIcon as BookmarkOutline } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolid } from '@heroicons/react/24/solid';
import { useToggleSaveBook } from '../../hooks/useBooks';
import { useToast } from '../ui/ToastProvider';
import { cn } from '../../lib/utils/cn';

export interface SaveButtonProps {
  bookId: string;
  isSaved?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

export const SaveButton: React.FC<SaveButtonProps> = ({ bookId, isSaved = false, size = 'md', className }) => {
  const toggleMutation = useToggleSaveBook();
  const toast = useToast();

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggleMutation.mutate(bookId, {
      onSuccess: (newSavedState) => {
        if (newSavedState) {
          toast.success('Book Saved', 'Added to your private library saved list.');
        } else {
          toast.info('Book Removed', 'Removed from your saved list.');
        }
      },
    });
  };

  return (
    <button
      onClick={handleToggle}
      disabled={toggleMutation.isPending}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-medium transition-all select-none focus:outline-none',
        isSaved
          ? 'bg-brand-50 text-brand-900 border border-brand-200 hover:bg-brand-100'
          : 'bg-white/80 backdrop-blur-xs text-slate-700 border border-slate-200 hover:bg-slate-100 hover:text-slate-900',
        size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3.5 py-1.5 text-sm',
        className
      )}
    >
      {isSaved ? (
        <BookmarkSolid className={cn('text-brand-900', size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4')} />
      ) : (
        <BookmarkOutline className={cn(size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4')} />
      )}
      <span>{isSaved ? 'Saved' : 'Save'}</span>
    </button>
  );
};
