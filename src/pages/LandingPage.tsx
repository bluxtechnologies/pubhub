import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpenIcon, PencilSquareIcon, GlobeAltIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { useTrendingBooks } from '../hooks/useBooks';
import { BookCover } from '../components/books/BookCover';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { MOCK_AUTHORS } from '../lib/mock/data';
import { Avatar } from '../components/ui/Avatar';
import { formatNumber } from '../lib/utils/cn';

export const LandingPage: React.FC = () => {
  const { data: books = [] } = useTrendingBooks();

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* Minimal Landing Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 h-16 px-6 flex items-center justify-between max-w-7xl mx-auto w-full">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand-900 flex items-center justify-center text-white">
            <BookOpenIcon className="w-4.5 h-4.5" />
          </div>
          <span className="font-serif font-black text-xl text-slate-900 tracking-tight">PubHub</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600 font-medium">
          <Link to="/discover" className="hover:text-brand-900 transition-colors">Discover</Link>
          <Link to="/write" className="hover:text-brand-900 transition-colors">Write</Link>
          <Link to="/home" className="hover:text-brand-900 transition-colors">Community</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/home">
            <Button variant="ghost" size="sm">Sign In</Button>
          </Link>
          <Link to="/home">
            <Button variant="primary" size="sm">Get Started — Free</Button>
          </Link>
        </div>
      </header>

      {/* HERO Section */}
      <section className="relative px-6 py-20 sm:py-28 text-center border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
        {/* Subtle decorative elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-brand-900/4 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-indigo-500/4 blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-200/60 text-brand-900 text-xs font-bold uppercase tracking-widest mb-6">
            <SparklesIcon className="w-3.5 h-3.5" />
            <span>Social Reading & Writing Platform</span>
          </div>

          <h1 className="font-serif font-extrabold text-slate-900 text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight mb-6">
            Read extraordinary stories.{' '}
            <span className="text-brand-900">Write your own.</span>
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto mb-10">
            PubHub is a creative community for fiction readers, serial authors, and storytellers.
            Discover chapters as they publish, follow your favourite writers, and build your audience — all in one place.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link to="/discover">
              <Button
                variant="primary"
                size="lg"
                leftIcon={<BookOpenIcon className="w-5 h-5" />}
              >
                Start Reading — Free
              </Button>
            </Link>
            <Link to="/write">
              <Button
                variant="outline"
                size="lg"
                leftIcon={<PencilSquareIcon className="w-5 h-5" />}
              >
                Become an Author
              </Button>
            </Link>
          </div>

          {/* Social proof micro */}
          <div className="flex items-center justify-center gap-6 mt-10 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <span className="font-bold text-slate-900 text-sm">2.4M+</span> Active Readers
            </span>
            <span className="w-px h-4 bg-slate-200" />
            <span className="flex items-center gap-1.5">
              <span className="font-bold text-slate-900 text-sm">48K+</span> Stories Published
            </span>
            <span className="w-px h-4 bg-slate-200" />
            <span className="flex items-center gap-1.5">
              <span className="font-bold text-slate-900 text-sm">120+</span> Genres
            </span>
          </div>
        </div>
      </section>

      {/* Trending Books Preview */}
      <section className="px-6 py-16 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-serif font-bold text-slate-900 text-2xl">What's Trending</h2>
            <p className="text-sm text-slate-500 mt-1">The most-read stories on PubHub this week</p>
          </div>
          <Link to="/discover">
            <Button variant="outline" size="sm" rightIcon={<GlobeAltIcon className="w-4 h-4" />}>
              Explore All
            </Button>
          </Link>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
          {books.map((book) => (
            <div key={book.id} className="shrink-0 w-40 group">
              <Link to={`/books/${book.id}`}>
                <BookCover src={book.coverImage} alt={book.title} size="lg" className="mb-3" />
                <h3 className="font-serif font-bold text-slate-900 text-sm line-clamp-1 group-hover:text-brand-900 transition-colors">
                  {book.title}
                </h3>
              </Link>
              <p className="text-xs text-slate-500 truncate">{book.author.name}</p>
              <div className="flex items-center gap-1 mt-1 flex-wrap">
                {book.genres.slice(0, 1).map((g) => (
                  <Badge key={g} variant="brand" size="sm">{g}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Authors */}
      <section className="px-6 py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-serif font-bold text-slate-900 text-2xl mb-2">Rising Authors</h2>
            <p className="text-sm text-slate-500">Follow top creators and never miss a new chapter</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {MOCK_AUTHORS.map((author) => (
              <div
                key={author.id}
                className="bg-white border border-slate-200 rounded-xl p-5 text-center shadow-subtle hover:border-brand-200 hover:shadow-card transition-all"
              >
                <Avatar src={author.avatar} name={author.name} size="xl" className="mx-auto mb-3" />
                <h3 className="font-bold text-slate-900 text-sm">{author.name}</h3>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1 mb-3">{author.bio}</p>
                <div className="flex items-center justify-center gap-4 text-xs text-slate-500 mb-3">
                  <span>{formatNumber(author.followerCount)} followers</span>
                  <span>{author.totalBooks} books</span>
                </div>
                <div className="flex justify-center gap-1.5 flex-wrap">
                  {author.featuredGenres.slice(0, 2).map((g) => (
                    <Badge key={g} variant="brand" size="sm">{g}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="px-6 py-20 text-center bg-brand-900 text-white">
        <h2 className="font-serif font-bold text-3xl sm:text-4xl mb-4">Your story deserves an audience.</h2>
        <p className="text-brand-100 text-base mb-8 max-w-xl mx-auto leading-relaxed">
          Start publishing your first serial novel today. Our readers are waiting for the next great story — and it might be yours.
        </p>
        <Link to="/write">
          <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-brand-900">
            Start Writing Today
          </Button>
        </Link>
      </section>

      {/* Minimal Footer */}
      <footer className="px-6 py-8 border-t border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl mx-auto w-full">
        <p>© 2026 PubHub. A social reading and writing platform.</p>
        <div className="flex items-center gap-5">
          <Link to="/discover" className="hover:text-brand-900 transition-colors">Discover</Link>
          <Link to="/write" className="hover:text-brand-900 transition-colors">Write</Link>
          <Link to="/home" className="hover:text-brand-900 transition-colors">Community</Link>
        </div>
      </footer>
    </div>
  );
};
