import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { StarIcon, EyeIcon, ChatBubbleLeftIcon, BookOpenIcon, ClockIcon } from '@heroicons/react/24/solid';
import { AppShell } from '../components/layout/AppShell';
import { BookCover } from '../components/books/BookCover';
import { SaveButton } from '../components/books/SaveButton';
import { FollowButton } from '../components/social/FollowButton';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { Tabs } from '../components/ui/Tabs';
import { Skeleton } from '../components/ui/Skeleton';
import { ErrorState } from '../components/ui/ErrorState';
import { useBookDetails, useBookChapters } from '../hooks/useBooks';
import { MOCK_COMMENTS } from '../lib/mock/data';
import { formatNumber } from '../lib/utils/cn';

export const BookDetailPage: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const [activeTab, setActiveTab] = useState('chapters');

  const { data: book, isLoading: loadingBook, error } = useBookDetails(bookId);
  const { data: chapters = [], isLoading: loadingChapters } = useBookChapters(bookId);

  if (loadingBook) {
    return (
      <AppShell>
        <Skeleton className="h-80 w-full mb-6" />
      </AppShell>
    );
  }

  if (error || !book) {
    return (
      <AppShell>
        <ErrorState title="Book Not Found" message="The requested story could not be found." />
      </AppShell>
    );
  }

  const tabs = [
    { id: 'chapters', label: 'Table of Contents', count: chapters.length },
    { id: 'comments', label: 'Discussion', count: MOCK_COMMENTS.length },
  ];

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Editorial Book Hero Banner */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-6 sm:p-8 shadow-subtle flex flex-col md:flex-row gap-6 lg:gap-8 items-start">
          <BookCover src={book.coverImage} alt={book.title} size="xl" />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              {book.genres.map((g) => (
                <Badge key={g} variant="brand">
                  {g}
                </Badge>
              ))}
              <Badge variant={book.status === 'completed' ? 'success' : 'warning'} className="uppercase tracking-wider font-bold">
                {book.status}
              </Badge>
            </div>

            <h1 className="font-serif font-extrabold text-slate-900 text-2xl sm:text-3xl lg:text-4xl leading-tight mb-2">
              {book.title}
            </h1>

            {book.tagline && (
              <p className="text-base font-serif italic text-slate-600 mb-4">{book.tagline}</p>
            )}

            {/* Author bar */}
            <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200/60 rounded-lg mb-4 max-w-md">
              <Avatar src={book.author.avatar} name={book.author.name} size="md" />
              <div className="flex-1 min-w-0">
                <Link to={`/authors/${book.author.id}`} className="font-bold text-sm text-slate-900 hover:text-brand-900 truncate block">
                  {book.author.name}
                </Link>
                <span className="text-xs text-slate-500">Author & Storyteller</span>
              </div>
              <FollowButton authorId={book.author.id} authorName={book.author.name} size="sm" />
            </div>

            {/* Book Stats bar */}
            <div className="flex items-center gap-6 text-sm text-slate-600 mb-6 py-2 border-y border-slate-100">
              <div className="flex items-center gap-1.5 font-semibold text-amber-600">
                <StarIcon className="w-4 h-4" />
                <span>{book.rating.toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <EyeIcon className="w-4 h-4 text-slate-400" />
                <span>{formatNumber(book.readsCount)} Reads</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ChatBubbleLeftIcon className="w-4 h-4 text-slate-400" />
                <span>{formatNumber(book.commentsCount)} Comments</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BookOpenIcon className="w-4 h-4 text-slate-400" />
                <span>{book.publishedChaptersCount} Chapters</span>
              </div>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed mb-6 whitespace-pre-line">{book.description}</p>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 flex-wrap">
              <Link to={`/read/${book.id}/${chapters[0]?.id || 'chap_1_1'}`}>
                <Button variant="primary" size="lg" leftIcon={<BookOpenIcon className="w-5 h-5" />}>
                  {book.userProgress ? `Continue (Ch. ${book.userProgress.currentChapterNumber})` : 'Start Reading'}
                </Button>
              </Link>

              <SaveButton bookId={book.id} isSaved={book.isSaved} size="md" />
            </div>
          </div>
        </div>

        {/* Tabbed Chapters and Comments */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-subtle">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="mb-6" />

          {activeTab === 'chapters' && (
            <div>
              {loadingChapters ? (
                <div className="space-y-3">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {chapters.map((chap) => (
                    <Link
                      key={chap.id}
                      to={`/read/${book.id}/${chap.id}`}
                      className="flex items-center justify-between py-3.5 px-3 rounded-lg hover:bg-slate-50 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-brand-50 text-slate-700 group-hover:text-brand-900 text-xs font-bold flex items-center justify-center transition-colors">
                          {chap.chapterNumber}
                        </span>
                        <div>
                          <h4 className="font-semibold text-sm text-slate-900 group-hover:text-brand-900 transition-colors">
                            {chap.title}
                          </h4>
                          <span className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                            <ClockIcon className="w-3 h-3" />
                            {chap.wordCount} words · {chap.publishedAt}
                          </span>
                        </div>
                      </div>

                      <Button variant="ghost" size="sm">
                        Read
                      </Button>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'comments' && (
            <div className="space-y-4">
              <div className="flex gap-3 mb-6">
                <input
                  type="text"
                  placeholder="Share your thoughts on this story..."
                  className="flex-1 px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-brand-900"
                />
                <Button variant="primary" size="md">
                  Post Comment
                </Button>
              </div>

              <div className="space-y-4 divide-y divide-slate-100">
                {MOCK_COMMENTS.map((c) => (
                  <div key={c.id} className="pt-4 first:pt-0">
                    <div className="flex items-start gap-3">
                      <Avatar src={c.author.avatar} name={c.author.name} size="sm" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-900">{c.author.name}</span>
                          <span className="text-[10px] text-slate-400">{c.createdAt}</span>
                        </div>
                        <p className="text-xs text-slate-700 mt-1 leading-relaxed">{c.content}</p>

                        {/* Nested Replies */}
                        {c.replies?.map((r) => (
                          <div key={r.id} className="mt-3 pl-4 border-l-2 border-brand-200 flex items-start gap-2.5">
                            <Avatar src={r.author.avatar} name={r.author.name} size="xs" />
                            <div>
                              <span className="font-bold text-xs text-slate-900">{r.author.name}</span>
                              <p className="text-xs text-slate-700 mt-0.5">{r.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
};
