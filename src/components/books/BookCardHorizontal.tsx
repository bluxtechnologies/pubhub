import React from 'react';
import { Link } from 'react-router-dom';
import { Book } from '../../types';
import { BookCover } from './BookCover';
import { Button } from '../ui/Button';

export interface BookCardHorizontalProps {
  book: Book;
}

export const BookCardHorizontal: React.FC<BookCardHorizontalProps> = ({ book }) => {
  const progress = book.userProgress?.percentage || 0;
  const currentChapter = book.userProgress?.currentChapterNumber || 1;

  return (
    <div className="flex gap-4 p-4 bg-white border border-slate-200/80 rounded-lg shadow-subtle hover:border-slate-300 transition-all">
      <Link to={`/books/${book.id}`}>
        <BookCover src={book.coverImage} alt={book.title} size="sm" />
      </Link>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold tracking-wider text-brand-900 uppercase">
              Chapter {currentChapter}
            </span>
            <span className="text-xs text-slate-500 font-medium">{progress}% read</span>
          </div>

          <Link to={`/books/${book.id}`}>
            <h4 className="font-serif font-bold text-slate-900 text-sm line-clamp-1 hover:text-brand-900 transition-colors">
              {book.title}
            </h4>
          </Link>
          <p className="text-xs text-slate-500 line-clamp-1">by {book.author.name}</p>

          {/* Reading progress bar */}
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-2">
            <div
              className="bg-brand-900 h-full transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100">
          <span className="text-[11px] text-slate-400">
            {book.userProgress ? `Last read ${book.userProgress.lastReadAt.split('T')[0]}` : 'Not started'}
          </span>
          <Link to={`/read/${book.id}/${book.userProgress?.currentChapterId || 'chap_1_1'}`}>
            <Button variant="primary" size="sm">
              Resume
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
