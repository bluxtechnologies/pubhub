import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  BookmarkIcon,
  AdjustmentsVerticalIcon,
  ChatBubbleLeftIcon,
  XMarkIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';
import { useBookDetails, useChapterDetails, useBookChapters } from '../hooks/useBooks';
import { Button } from '../components/ui/Button';
import { Skeleton } from '../components/ui/Skeleton';
import { ErrorState } from '../components/ui/ErrorState';
import { Avatar } from '../components/ui/Avatar';
import { useToast } from '../components/ui/ToastProvider';
import { useReadingProgress } from '../hooks/useReadingProgress';

interface ParagraphComment {
  id: string;
  paragraphIndex: number;
  user: { name: string; avatar: string };
  text: string;
  createdAt: string;
}

export const ReaderPage: React.FC = () => {
  const { bookId, chapterId } = useParams<{ bookId: string; chapterId: string }>();
  const toast = useToast();

  // Reader Settings State
  const [fontFamily, setFontFamily] = useState<'serif' | 'sans'>('serif');
  const [fontSize, setFontSize] = useState<number>(18);
  const [theme, setTheme] = useState<'light' | 'sepia' | 'dark'>('light');
  const [showSettings, setShowSettings] = useState(false);

  // Inline Social Annotations Drawer State
  const [activeParagraphIndex, setActiveParagraphIndex] = useState<number | null>(null);
  const [newCommentText, setNewCommentText] = useState('');
  const [paragraphComments, setParagraphComments] = useState<ParagraphComment[]>([
    {
      id: 'pcmt_1',
      paragraphIndex: 0,
      user: {
        name: 'Elena Rostova',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
      },
      text: 'The opening imagery of iron and cold seawater sets such a dark, compelling mood!',
      createdAt: '1h ago',
    },
    {
      id: 'pcmt_2',
      paragraphIndex: 2,
      user: {
        name: 'Marcus Sterling',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
      },
      text: 'The glass ley lines concept is pure world-building perfection.',
      createdAt: '30m ago',
    },
  ]);

  const { data: book } = useBookDetails(bookId);
  const { data: chapter, isLoading, error } = useChapterDetails(bookId, chapterId);
  const { data: chapters = [] } = useBookChapters(bookId);
  const { saveProgress } = useReadingProgress();

  useEffect(() => {
    if (book && chapter) {
      const pct = Math.round(((chapter.chapterNumber) / (chapters.length || 1)) * 100);
      saveProgress({
        bookId: book.id,
        chapterId: chapter.id,
        chapterNumber: chapter.chapterNumber,
        chapterTitle: chapter.title,
        bookTitle: book.title,
        coverImage: book.coverImage,
        progressPercentage: pct,
      });
    }
  }, [book, chapter, chapters]);

  const currentIndex = chapters.findIndex((c) => c.id === chapterId);
  const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

  const handleBookmark = () => {
    toast.success('Bookmark Saved', `Saved your place at ${chapter?.title}`);
  };

  const handlePostParagraphComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim() || activeParagraphIndex === null) return;

    const newCmt: ParagraphComment = {
      id: `pcmt_${Date.now()}`,
      paragraphIndex: activeParagraphIndex,
      user: {
        name: 'Alexander Vance',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
      },
      text: newCommentText,
      createdAt: 'Just now',
    };

    setParagraphComments([...paragraphComments, newCmt]);
    setNewCommentText('');
    toast.success('Reaction Posted', 'Your comment was attached to this paragraph.');
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

  const paragraphsList = chapter.content.split('\n\n');

  return (
    <div className={`min-h-screen transition-colors duration-200 relative ${themeClasses[theme]}`}>
      {/* Sticky Reader Header */}
      <header className="sticky top-0 z-30 bg-inherit/90 backdrop-blur-md border-b border-inherit h-14 px-4 sm:px-8 flex items-center justify-between">
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

      {/* Main Reading Container */}
      <main className="px-4 sm:px-6 py-10 sm:py-16">
        <article className="reader-prose-container">
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

          {/* Paragraphs with Social Comment Trigger */}
          <div
            className={`leading-relaxed space-y-6 ${
              fontFamily === 'serif' ? 'font-serif' : 'font-sans'
            }`}
            style={{ fontSize: `${fontSize}px` }}
          >
            {paragraphsList.map((paragraph, idx) => {
              const cmtsForPara = paragraphComments.filter((c) => c.paragraphIndex === idx);
              const isSelected = activeParagraphIndex === idx;

              return (
                <div key={idx} className="relative group flex items-start">
                  <p
                    className={`flex-1 transition-all rounded p-1 -m-1 ${
                      isSelected ? 'bg-amber-100/50 ring-1 ring-amber-400' : 'hover:bg-black/5'
                    }`}
                  >
                    {paragraph}
                  </p>

                  {/* Inline Paragraph Comment Indicator */}
                  <button
                    onClick={() => setActiveParagraphIndex(isSelected ? null : idx)}
                    className={`ml-2 shrink-0 p-1.5 rounded-full transition-opacity opacity-0 group-hover:opacity-100 ${
                      cmtsForPara.length > 0 || isSelected ? 'opacity-100 bg-brand-50 text-brand-900' : 'text-slate-400 hover:text-slate-700'
                    }`}
                    title="Comment on paragraph"
                  >
                    <div className="relative">
                      <ChatBubbleLeftIcon className="w-4 h-4" />
                      {cmtsForPara.length > 0 && (
                        <span className="absolute -top-1.5 -right-2 text-[9px] font-bold bg-brand-900 text-white rounded-full px-1">
                          {cmtsForPara.length}
                        </span>
                      )}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

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

      {/* Slide-out Paragraph Discussion Drawer */}
      {activeParagraphIndex !== null && (
        <aside className="fixed top-14 right-0 bottom-0 w-80 sm:w-96 bg-white text-slate-900 border-l border-slate-200 shadow-elevated z-40 flex flex-col animate-in slide-in-from-right duration-200">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900">Paragraph Discussion</h3>
              <span className="text-xs text-slate-500">Paragraph #{activeParagraphIndex + 1}</span>
            </div>
            <button
              onClick={() => setActiveParagraphIndex(null)}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="p-3 bg-slate-50 border-b border-slate-100 text-xs italic text-slate-600 line-clamp-3">
            "{paragraphsList[activeParagraphIndex]}"
          </div>

          {/* Comments List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 divide-y divide-slate-100">
            {paragraphComments.filter((c) => c.paragraphIndex === activeParagraphIndex).length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-6">
                No comments on this paragraph yet. Be the first to share a thought!
              </p>
            ) : (
              paragraphComments
                .filter((c) => c.paragraphIndex === activeParagraphIndex)
                .map((cmt) => (
                  <div key={cmt.id} className="pt-3 first:pt-0 flex gap-2.5 items-start">
                    <Avatar src={cmt.user.avatar} name={cmt.user.name} size="xs" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-slate-900">{cmt.user.name}</span>
                        <span className="text-[10px] text-slate-400">{cmt.createdAt}</span>
                      </div>
                      <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">{cmt.text}</p>
                    </div>
                  </div>
                ))
            )}
          </div>

          {/* Post Comment Input */}
          <form onSubmit={handlePostParagraphComment} className="p-3 border-t border-slate-100 flex gap-2">
            <input
              type="text"
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              placeholder="React to this paragraph..."
              className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-brand-900"
            />
            <Button variant="primary" size="sm" type="submit" leftIcon={<PaperAirplaneIcon className="w-3.5 h-3.5" />}>
              Post
            </Button>
          </form>
        </aside>
      )}
    </div>
  );
};
