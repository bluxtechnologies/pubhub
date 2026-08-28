import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { AppShell } from '../components/layout/AppShell';
import { BookCard } from '../components/books/BookCard';
import { Skeleton } from '../components/ui/Skeleton';
import { EmptyState } from '../components/ui/EmptyState';
import { useSearchBooks } from '../hooks/useBooks';

const GENRES = ['All', 'Fantasy', 'Sci-Fi', 'Mystery', 'Romance', 'Thriller', 'Horror', 'Adventure'];

export const DiscoverPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('query') || '';

  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [selectedGenre, setSelectedGenre] = useState('All');

  const { data: books = [], isLoading } = useSearchBooks(searchTerm, selectedGenre);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    if (val) {
      setSearchParams({ query: val });
    } else {
      setSearchParams({});
    }
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Discover Hero Banner */}
        <div className="bg-gradient-to-r from-brand-900 via-brand-800 to-indigo-950 text-white rounded-xl p-6 sm:p-8 shadow-elevated relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-brand-100 text-xs font-semibold uppercase tracking-wider mb-3">
              <SparklesIcon className="w-3.5 h-3.5" />
              <span>Editorial Discovery</span>
            </div>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight mb-2">
              Discover Extraordinary Stories & Rising Authors
            </h1>
            <p className="text-sm text-brand-100/90 leading-relaxed mb-6">
              Browse thousands of community-curated fiction, web novels, and serialized chapters.
            </p>

            {/* In-page Search Bar */}
            <div className="relative w-full max-w-lg">
              <MagnifyingGlassIcon className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search by title, author, or keyword..."
                className="w-full h-11 pl-11 pr-4 bg-white text-slate-900 text-sm rounded-lg shadow-subtle placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
          </div>
        </div>

        {/* Genre Pill Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          <AdjustmentsHorizontalIcon className="w-5 h-5 text-slate-400 shrink-0 mr-1" />
          {GENRES.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 select-none ${
                selectedGenre === genre
                  ? 'bg-brand-900 text-white shadow-subtle'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Results Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif font-bold text-slate-900 text-xl">
              {selectedGenre === 'All' ? 'All Stories' : `${selectedGenre} Stories`}
              {searchTerm && <span className="text-slate-500 font-normal text-sm ml-2">matching "{searchTerm}"</span>}
            </h2>
            <span className="text-xs text-slate-500">{books.length} stories found</span>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
              <Skeleton className="h-72 w-full" />
              <Skeleton className="h-72 w-full" />
              <Skeleton className="h-72 w-full" />
              <Skeleton className="h-72 w-full" />
            </div>
          ) : books.length === 0 ? (
            <EmptyState
              title="No stories found"
              description="We couldn't find any books matching your search query or genre filter. Try searching for another term!"
              actionLabel="Clear Filters"
              onAction={() => {
                setSearchTerm('');
                setSelectedGenre('All');
                setSearchParams({});
              }}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
};
