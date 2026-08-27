import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  BookmarkIcon,
  AdjustmentsVerticalIcon,
  Bars3BottomLeftIcon,
} from '@heroicons/react/24/outline';
import { useBookDetails, useChapterDetails, useBookChapters } from '../hooks/useBooks';
import { Button } from '../components/ui/Button';
import { Skeleton } from '../components/ui/Skeleton';
import { ErrorState } from '../components/ui/ErrorState';
import { useToast } from '../components/ui/ToastProvider';

export const ReaderPage: React.FC = () => {
  const { bookId, chapterId } = useParams<{ bookId: string; chapterId: string }>();
  const toast = useToast();

  // Reader Settings State
  const [fontFamily, setFontFamily] = useState<'serif' | 'sans'>('serif');
  const [fontSize, setFontSize] = useState<number>(18); // in px
  const [theme, setTheme] = useState<'light' | 'sepia' | 'dark'>('light');
  const [showSettings, setShowSettings] = useState(false);

  const { data: book } = useBookDetails(bookId);
  const { data: chapter, isLoading, error } = useChapterDetails(bookId, chapterId);
  const { data: chapters = [] } = useBookChapters(bookId);

  const currentIndex = chapters.findIndex((c) => c.id === chapterId);
  const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

  const handleBookmark = () => {
    toast.success('Bookmark Saved', `Saved your place at ${chapter?.title}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
        <Skeleton className="h-10 w-64 mb-6" />
        <Skeleton className="h-96 w-full max-w-2xl" />
      </div>
    );
  }

  if (error || !chapter) {
    return (
      <div className="min-h-screen bg-white p-6">
        <ErrorState title="Chapter Not Found" message="The requested chapter could not be loaded." />
      </div>
    );
  }

  const themeClasses = {
    light: 'bg-slate-50 text-slate-900 border-slate-200',
    sepia: 'bg-[#fbf0d9] text-[#433422] border-[#e4d4b6]',
    dark: 'bg-[#0f172a] text-slate-100 border-slate-800',
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${themeClasses[theme]}`}>
      {/* Distraction-Free Sticky Header */}
      <header className="sticky top-0 z-40 bg-inherit/90 backdrop-blur-md border-b border-inherit h-14 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to={`/books/${bookId}`}
            className="p-1.5 rounded-full hover:bg-black/5 transition-colors flex items-center gap-1 text-xs font-semibold"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Book</span>
          </Link>
          <span className="text-slate-300">|</span>
          <h2 className="font-serif font-bold text-sm truncate max-w-xs sm:max-w-md">
            {book?.title}
          </h2>
        </div>

        {/* Reader Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleBookmark}
            title="Save Bookmark"
            className="p-2 rounded-md hover:bg-black/5 transition-colors"
          >
            <BookmarkIcon className="w-4 h-4" />
          </button>

          {/* Typography Settings Dropdown Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-md hover:bg-black/5 transition-colors flex items-center gap-1 text-xs font-semibold"
            >
              <AdjustmentsVerticalIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Appearance</span>
            </button>

            {showSettings && (
              <div className="absolute right-0 mt-2 w-72 bg-white text-slate-900 border border-slate-200 rounded-lg shadow-elevated p-4 z-50 animate-in fade-in zoom-in-95">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-3">Reader Settings</h4>

                {/* Font Family Selector */}
                <div className="mb-4">
                  <label className="text-xs font-semibold block mb-1.5">Font Style</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setFontFamily('serif')}
                      className={`px-3 py-1.5 font-serif text-sm rounded border ${
                        fontFamily === 'serif'
                          ? 'border-brand-900 bg-brand-50 text-brand-900 font-bold'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      Serif
                    </button>
                    <button
                      onClick={() => setFontFamily('sans')}
                      className={`px-3 py-1.5 font-sans text-sm rounded border ${
                        fontFamily === 'sans'
                          ? 'border-brand-900 bg-brand-50 text-brand-900 font-bold'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      Sans-Serif
                    </button>
                  </div>
                </div>

                {/* Font Size Adjuster */}
                <div className="mb-4">
                  <label className="text-xs font-semibold block mb-1.5">Font Size ({fontSize}px)</label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setFontSize((s) => Math.max(14, s - 2))}
                      className="px-3 py-1 bg-slate-100 rounded text-xs font-bold hover:bg-slate-200"
                    >
                      A-
                    </button>
                    <input
                      type="range"
                      min="14"
                      max="24"
                      value={fontSize}
                      onChange={(e) => setFontSize(Number(e.target.value))}
                      className="flex-1 accent-brand-900"
                    />
                    <button
                      onClick={() => setFontSize((s) => Math.min(24, s + 2))}
                      className="px-3 py-1 bg-slate-100 rounded text-sm font-bold hover:bg-slate-200"
                    >
                      A+
                    </button>
                  </div>
                </div>

                {/* Color Theme Selector */}
                <div>
                  <label className="text-xs font-semibold block mb-1.5">Theme</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setTheme('light')}
                      className={`py-1.5 text-xs rounded border bg-slate-50 text-slate-900 font-medium ${
                        theme === 'light' ? 'border-brand-900 ring-1 ring-brand-900' : 'border-slate-200'
                      }`}
                    >
                      Default
                    </button>
                    <button
                      onClick={() => setTheme('sepia')}
                      className={`py-1.5 text-xs rounded border bg-[#fbf0d9] text-[#433422] font-medium ${
                        theme === 'sepia' ? 'border-amber-700 ring-1 ring-amber-700' : 'border-amber-200'
                      }`}
                    >
                      Sepia
                    </button>
                    <button
                      onClick={() => setTheme('dark')}
                      className={`py-1.5 text-xs rounded border bg-slate-900 text-white font-medium ${
                        theme === 'dark' ? 'border-brand-500 ring-1 ring-brand-500' : 'border-slate-700'
                      }`}
                    >
                      Night
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Chapter Content Container */}
      <main className="px-4 sm:px-6 py-10 sm:py-16">
        <article className="reader-prose-container">
          {/* Chapter Title Header */}
          <header className="mb-10 text-center pb-8 border-b border-inherit">
            <span className="text-xs font-bold tracking-widest uppercase text-brand-900 block mb-2">
              Chapter {chapter.chapterNumber}
            </span>
            <h1 className="font-serif font-extrabold text-2xl sm:text-3xl lg:text-4xl leading-tight mb-3">
              {chapter.title}
            </h1>
            <p className="text-xs opacity-70">
              {chapter.wordCount} words · Published {chapter.publishedAt}
            </p>
          </header>

          {/* Editorial Long-form Body */}
          <div
            className={`leading-relaxed space-y-6 ${
              fontFamily === 'serif' ? 'font-serif' : 'font-sans'
            }`}
            style={{ fontSize: `${fontSize}px` }}
          >
            {chapter.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="indent-6 sm:indent-8">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Chapter Footer Navigation */}
          <footer className="mt-16 pt-8 border-t border-inherit flex items-center justify-between gap-4">
            {prevChapter ? (
              <Link to={`/read/${bookId}/${prevChapter.id}`}>
                <Button variant="outline" size="md" leftIcon={<ChevronLeftIcon className="w-4 h-4" />}>
                  Previous Chapter
                </Button>
              </Link>
            ) : (
              <div />
            )}

            {nextChapter ? (
              <Link to={`/read/${bookId}/${nextChapter.id}`}>
                <Button variant="primary" size="md" rightIcon={<ChevronRightIcon className="w-4 h-4" />}>
                  Next Chapter
                </Button>
              </Link>
            ) : (
              <Link to={`/books/${bookId}`}>
                <Button variant="secondary" size="md">
                  Finish Reading
                </Button>
              </Link>
            )}
          </footer>
        </article>
      </main>
    </div>
  );
};
