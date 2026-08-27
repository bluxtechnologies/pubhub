import React from 'react';
import { Link } from 'react-router-dom';
import { StarIcon, EyeIcon } from '@heroicons/react/24/solid';
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { Book } from '../../types';
import { BookCover } from './BookCover';
import { Badge } from '../ui/Badge';
import { SaveButton } from './SaveButton';
import { formatNumber } from '../../lib/utils/cn';

export interface BookCardProps {
  book: Book;
  size?: 'md' | 'lg';
}

export const BookCard: React.FC<BookCardProps> = ({ book, size = 'md' }) => {
  return (
    <div className="group flex flex-col bg-white border border-slate-200/80 rounded-lg p-4 shadow-subtle hover:border-slate-300 hover:shadow-card transition-all duration-200">
      <div className="relative flex justify-center mb-3">
        <Link to={`/books/${book.id}`}>
          <BookCover src={book.coverImage} alt={book.title} size={size === 'lg' ? 'lg' : 'md'} />
        </Link>
        <div className="absolute top-0 right-0">
          <SaveButton bookId={book.id} isSaved={book.isSaved} size="sm" />
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-1 text-xs text-amber-600 font-semibold mb-1">
          <StarIcon className="w-3.5 h-3.5" />
          <span>{book.rating.toFixed(1)}</span>
          <span className="text-slate-400 font-normal">({formatNumber(book.readsCount)} reads)</span>
        </div>

        <Link to={`/books/${book.id}`} className="group-hover:text-brand-900 transition-colors">
          <h3 className="font-serif font-bold text-slate-900 text-base line-clamp-1 leading-snug">
            {book.title}
          </h3>
        </Link>

        <p className="text-xs text-slate-500 mt-0.5 mb-2 line-clamp-1">by {book.author.name}</p>

        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3 flex-1">
          {book.tagline || book.description}
        </p>

        <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 text-xs text-slate-500">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {book.genres.slice(0, 2).map((g) => (
              <Badge key={g} variant="brand" size="sm">
                {g}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="flex items-center gap-0.5">
              <EyeIcon className="w-3.5 h-3.5 text-slate-400" />
              {formatNumber(book.readsCount)}
            </span>
            <span className="flex items-center gap-0.5">
              <ChatBubbleLeftIcon className="w-3.5 h-3.5 text-slate-400" />
              {formatNumber(book.commentsCount)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
