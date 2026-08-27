import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpenIcon, ClockIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolid } from '@heroicons/react/24/solid';
import { AppShell } from '../components/layout/AppShell';
import { Tabs } from '../components/ui/Tabs';
import { BookCardHorizontal } from '../components/books/BookCardHorizontal';
import { BookCard } from '../components/books/BookCard';
import { EmptyState } from '../components/ui/EmptyState';
import { useTrendingBooks } from '../hooks/useBooks';
import { useState } from 'react';

export const LibraryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('reading');
  const { data: books = [] } = useTrendingBooks();

  const readingBooks = books.filter((b) => b.userProgress);
  const savedBooks = books.filter((b) => b.isSaved);
  const completedBooks = books.filter((b) => b.status === 'completed');

  const tabs = [
    { id: 'reading', label: 'Continue Reading', count: readingBooks.length },
    { id: 'saved', label: 'Saved', count: savedBooks.length },
    { id: 'completed', label: 'Completed', count: completedBooks.length },
    { id: 'history', label: 'History' },
  ];

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Library Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-900 flex items-center justify-center">
            <BookmarkSolid className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-serif font-bold text-2xl text-slate-900">My Library</h1>
            <p className="text-xs text-slate-500">Your personal reading collection and history</p>
          </div>
        </div>

        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        {/* Continue Reading */}
        {activeTab === 'reading' && (
          <div>
            {readingBooks.length === 0 ? (
              <EmptyState
                icon={<BookOpenIcon className="w-10 h-10 text-slate-400" />}
                title="No books in progress"
                description="You haven't started reading any books yet. Head to Discover to find your next story!"
                actionLabel="Discover Books"
                onAction={() => window.location.assign('/discover')}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {readingBooks.map((book) => (
                  <BookCardHorizontal key={book.id} book={book} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Saved Books */}
        {activeTab === 'saved' && (
          <div>
            {savedBooks.length === 0 ? (
              <EmptyState
                title="No saved books"
                description="Tap the bookmark icon on any book to save it here for later reading."
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {savedBooks.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Completed Books */}
        {activeTab === 'completed' && (
          <div>
            {completedBooks.length === 0 ? (
              <EmptyState
                title="No completed books"
                description="Books you finish reading will appear here."
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {completedBooks.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* History */}
        {activeTab === 'history' && (
          <EmptyState
            icon={<ClockIcon className="w-10 h-10 text-slate-400" />}
            title="Reading history is empty"
            description="Every book you open will be tracked here automatically."
          />
        )}
      </div>
    </AppShell>
  );
};
