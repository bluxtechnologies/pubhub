import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeftIcon,
  FunnelIcon,
  FireIcon,
  SparklesIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import { AppShell } from '../components/layout/AppShell';
import { BookCard } from '../components/books/BookCard';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Skeleton } from '../components/ui/Skeleton';
import { useTrendingBooks } from '../hooks/useBooks';

const GENRE_METADATA: Record<string, { description: string; color: string; emoji: string }> = {
  Fantasy: {
    description: 'Magical realms, epic quests, mythical creatures and world-altering sorcery.',
    color: 'from-violet-900 to-indigo-900',
    emoji: '🧙‍♂️',
  },
  'Sci-Fi': {
    description: 'Futures imagined, technologies unbound, and the cosmos within reach.',
    color: 'from-sky-900 to-slate-900',
    emoji: '🚀',
  },
  Romance: {
    description: 'Affairs of the heart, slow burns, fated mates, and happily-ever-afters.',
    color: 'from-rose-800 to-pink-900',
    emoji: '💕',
  },
  Mystery: {
    description: 'Whodunits, cold cases, unreliable narrators, and twists you never see coming.',
    color: 'from-slate-900 to-zinc-800',
    emoji: '🔍',
  },
  Thriller: {
    description: 'Heart-pounding suspense, high stakes, and races against time.',
    color: 'from-gray-900 to-red-950',
    emoji: '⚡',
  },
  Horror: {
    description: 'Dread, darkness, the uncanny, and stories that haunt you long after.',
    color: 'from-zinc-900 to-stone-900',
    emoji: '👁️',
  },
  Adventure: {
    description: 'Exploration, action, treasure hunts, and heroes forged under fire.',
    color: 'from-amber-800 to-orange-900',
    emoji: '🗺️',
  },
  'High Fantasy': {
    description: 'Grand worlds with their own laws, languages, and epic civilisations.',
    color: 'from-purple-900 to-violet-950',
    emoji: '⚔️',
  },
  'Urban Fantasy': {
    description: 'Magic hidden in plain sight, lurking in modern cities and everyday life.',
    color: 'from-indigo-900 to-blue-950',
    emoji: '🌆',
  },
};

const SORT_OPTIONS = [
  { id: 'trending', label: 'Trending', icon: <FireIcon className="w-3.5 h-3.5" /> },
  { id: 'new', label: 'New Releases', icon: <SparklesIcon className="w-3.5 h-3.5" /> },
  { id: 'top_rated', label: 'Top Rated', icon: <StarIcon className="w-3.5 h-3.5" /> },
  { id: 'recently_updated', label: 'Recently Updated', icon: <ClockIcon className="w-3.5 h-3.5" /> },
];

export const GenrePage: React.FC = () => {
  const { genreSlug } = useParams<{ genreSlug: string }>();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState('trending');

  // Decode URL slug back to display name (e.g. "high-fantasy" → "High Fantasy")
  const genreName = genreSlug
    ? genreSlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    : 'Fiction';

  const meta = GENRE_METADATA[genreName] ?? {
    description: `Explore the best ${genreName} stories from emerging and established authors on PubHub.`,
    color: 'from-brand-900 to-indigo-900',
    emoji: '📚',
  };

  const { data: allBooks = [], isLoading } = useTrendingBooks();

  // Filter books by genre (mock data fallback: show all if no match)
  const genreBooks = allBooks.filter((b) =>
    b.genres.some((g) => g.toLowerCase() === genreName.toLowerCase())
  );
  const displayBooks = genreBooks.length > 0 ? genreBooks : allBooks;

  const ALL_GENRES = Object.keys(GENRE_METADATA);

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Genre Hero Banner */}
        <div
          className={`rounded-2xl overflow-hidden bg-gradient-to-br ${meta.color} text-white relative`}
        >
          {/* Decorative background blob */}
          <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
            <div className="absolute -top-10 -right-10 w-72 h-72 rounded-full bg-white blur-3xl" />
          </div>

          <div className="relative p-7 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <span className="text-5xl sm:text-6xl leading-none select-none">{meta.emoji}</span>
            <div className="flex-1">
              <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Genre</p>
              <h1 className="font-serif font-extrabold text-3xl sm:text-4xl mb-2">{genreName}</h1>
              <p className="text-white/80 text-sm leading-relaxed max-w-xl">{meta.description}</p>
              <div className="flex items-center gap-3 mt-4 text-xs text-white/60">
                <span>
                  <strong className="text-white">{displayBooks.length}+</strong> stories
                </span>
                <span>·</span>
                <span>Updated daily</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Books Grid - Main Column */}
          <div className="lg:col-span-3 space-y-4">
            {/* Sort Controls */}
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <h2 className="font-serif font-bold text-slate-900">
                {displayBooks.length} stories in {genreName}
              </h2>
              <div className="flex items-center gap-1.5 flex-wrap">
                <FunnelIcon className="w-3.5 h-3.5 text-slate-400" />
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSortBy(opt.id)}
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      sortBy === opt.id
                        ? 'bg-brand-900 text-white shadow-sm'
                        : 'bg-white border border-slate-200 text-slate-600 hover:border-brand-300'
                    }`}
                  >
                    {opt.icon}
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-64 w-full rounded-xl" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayBooks.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar — Browse Other Genres */}
          <aside className="space-y-4">
            <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-subtle">
              <h3 className="font-bold text-sm text-slate-900 mb-3 pb-2 border-b border-slate-100">
                Browse All Genres
              </h3>
              <div className="space-y-1.5">
                {ALL_GENRES.map((g) => {
                  const slug = g.toLowerCase().replace(/\s+/g, '-');
                  const isActive = g === genreName;
                  return (
                    <Link
                      key={g}
                      to={`/genre/${slug}`}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                        isActive
                          ? 'bg-brand-50 text-brand-900 border border-brand-200/60'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>
                        {GENRE_METADATA[g]?.emoji} {g}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="bg-brand-900 text-white rounded-xl p-4">
              <p className="font-serif font-bold text-base mb-1">Are you a writer?</p>
              <p className="text-white/75 text-xs leading-relaxed mb-3">
                Publish your {genreName} story for free and build a reader community.
              </p>
              <Link to="/write">
                <Button variant="outline" size="sm" className="w-full border-white/40 text-white hover:bg-white/10">
                  Start Writing
                </Button>
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </AppShell>
  );
};
