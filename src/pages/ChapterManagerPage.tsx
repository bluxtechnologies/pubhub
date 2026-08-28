import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ArrowLeftIcon,
  BookOpenIcon,
  ClockIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import { AppShell } from '../components/layout/AppShell';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { Skeleton } from '../components/ui/Skeleton';
import { ErrorState } from '../components/ui/ErrorState';
import { useBookDetails, useBookChapters } from '../hooks/useBooks';
import { useToast } from '../components/ui/ToastProvider';
import { formatNumber } from '../lib/utils/cn';

export const ChapterManagerPage: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const toast = useToast();

  const { data: book, isLoading: loadingBook } = useBookDetails(bookId);
  const { data: initialChapters = [], isLoading: loadingChapters } = useBookChapters(bookId);

  const [chapters, setChapters] = useState(initialChapters);

  const handleDeleteChapter = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      setChapters((prev) => prev.filter((c) => c.id !== id));
      toast.info('Chapter Deleted', `"${title}" was removed from the manuscript.`);
    }
  };

  if (loadingBook || loadingChapters) {
    return (
      <AppShell>
        <Skeleton className="h-48 w-full mb-6" />
        <Skeleton className="h-64 w-full" />
      </AppShell>
    );
  }

  if (!book) {
    return (
      <AppShell>
        <ErrorState title="Book Not Found" message="The requested manuscript could not be found." />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Back Link */}
        <div>
          <Link
            to="/write"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-brand-900 transition-colors"
          >
            <ArrowLeftIcon className="w-3.5 h-3.5" />
            <span>Back to Publisher Workspace</span>
          </Link>
        </div>

        {/* Book Header Card */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-16 h-24 object-cover rounded-md shadow-subtle shrink-0"
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="brand">{book.genres[0] || 'Fiction'}</Badge>
                <Badge variant={book.status === 'completed' ? 'success' : 'warning'}>
                  {book.status}
                </Badge>
              </div>
              <h1 className="font-serif font-bold text-slate-900 text-xl sm:text-2xl">{book.title}</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                {chapters.length} Total Chapters · {formatNumber(book.readsCount)} Total Reads
              </p>
            </div>
          </div>

          <Link to={`/write/books/${book.id}/chapters/new`}>
            <Button variant="primary" size="md" leftIcon={<PlusIcon className="w-4 h-4" />}>
              Create New Chapter
            </Button>
          </Link>
        </div>

        {/* Chapters Table / List */}
        <Card padded={false} className="overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-serif font-bold text-slate-900 text-lg flex items-center gap-2">
              <DocumentTextIcon className="w-5 h-5 text-brand-900" />
              <span>Manuscript Table of Contents</span>
            </h2>
            <span className="text-xs text-slate-500 font-medium">{chapters.length} chapters</span>
          </div>

          {chapters.length === 0 ? (
            <div className="p-8 text-center">
              <BookOpenIcon className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <h3 className="font-bold text-slate-800 text-sm">No chapters written yet</h3>
              <p className="text-xs text-slate-500 mt-1 mb-4">Start drafting Chapter 1 of your story!</p>
              <Link to={`/write/books/${book.id}/chapters/new`}>
                <Button variant="primary" size="sm" leftIcon={<PlusIcon className="w-4 h-4" />}>
                  Write Chapter 1
                </Button>
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {chapters.map((chap) => (
                <div
                  key={chap.id}
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {chap.chapterNumber}
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm hover:text-brand-900 transition-colors">
                        {chap.title}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-slate-400 mt-1 flex-wrap">
                        <span className="flex items-center gap-1">
                          <ClockIcon className="w-3.5 h-3.5" />
                          {chap.wordCount} words
                        </span>
                        <span>•</span>
                        <span>Published {chap.publishedAt}</span>
                        <span>•</span>
                        <span>{chap.likesCount} likes</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Link to={`/write/books/${book.id}/chapters/${chap.id}/edit`}>
                      <Button variant="outline" size="sm" leftIcon={<PencilIcon className="w-3.5 h-3.5" />}>
                        Edit Draft
                      </Button>
                    </Link>

                    <button
                      onClick={() => handleDeleteChapter(chap.id, chap.title)}
                      className="p-2 text-slate-400 hover:text-rose-600 rounded-md hover:bg-rose-50 transition-colors"
                      title="Delete Chapter"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </AppShell>
  );
};
