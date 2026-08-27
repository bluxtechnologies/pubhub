import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';
import { AppShell } from '../components/layout/AppShell';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { Tabs } from '../components/ui/Tabs';
import { BookCard } from '../components/books/BookCard';
import { FollowButton } from '../components/social/FollowButton';
import { ErrorState } from '../components/ui/ErrorState';
import { MOCK_AUTHORS, MOCK_BOOKS } from '../lib/mock/data';
import { formatNumber } from '../lib/utils/cn';

export const AuthorPage: React.FC = () => {
  const { authorId } = useParams<{ authorId: string }>();
  const [activeTab, setActiveTab] = useState('books');

  const author = MOCK_AUTHORS.find((a) => a.id === authorId) ?? MOCK_AUTHORS[0];
  const authorBooks = MOCK_BOOKS.filter((b) => b.author.id === author.id);

  if (!author) {
    return (
      <AppShell>
        <ErrorState title="Author Not Found" message="This author profile does not exist." />
      </AppShell>
    );
  }

  const tabs = [
    { id: 'books', label: 'Books', count: authorBooks.length },
    { id: 'about', label: 'About' },
  ];

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Author Hero Card */}
        <div className="bg-white border border-slate-200/80 rounded-xl shadow-subtle overflow-hidden">
          {/* Banner */}
          <div className="h-36 bg-gradient-to-br from-brand-900 via-indigo-900 to-slate-900" />

          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-10 mb-4">
              <Avatar
                src={author.avatar}
                name={author.name}
                size="xl"
                className="ring-4 ring-white"
              />
              <div className="flex items-center gap-2">
                <FollowButton
                  authorId={author.id}
                  authorName={author.name}
                  initialFollowing={author.isFollowing}
                  size="md"
                />
              </div>
            </div>

            <h1 className="font-serif font-bold text-2xl text-slate-900">{author.name}</h1>
            <p className="text-sm text-slate-500 mb-3">@{author.username}</p>
            <p className="text-sm text-slate-700 leading-relaxed mb-4 max-w-xl">{author.bio}</p>

            <div className="flex flex-wrap gap-2 mb-5">
              {author.featuredGenres.map((g) => (
                <Badge key={g} variant="brand">{g}</Badge>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="text-center">
                <p className="font-serif font-bold text-slate-900 text-xl">{formatNumber(author.followerCount)}</p>
                <p className="text-xs text-slate-500 mt-0.5">Followers</p>
              </div>
              <div className="text-center">
                <p className="font-serif font-bold text-slate-900 text-xl">{author.totalBooks}</p>
                <p className="text-xs text-slate-500 mt-0.5">Books</p>
              </div>
              <div className="text-center">
                <p className="font-serif font-bold text-slate-900 text-xl">{formatNumber(author.totalReads)}</p>
                <p className="text-xs text-slate-500 mt-0.5">Total Reads</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-amber-600">
                  <StarIcon className="w-4 h-4" />
                  <p className="font-serif font-bold text-slate-900 text-xl">4.8</p>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Avg. Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed content */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-subtle">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="mb-6" />

          {activeTab === 'books' && (
            authorBooks.length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-8">This author hasn't published any books yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {authorBooks.map((book) => <BookCard key={book.id} book={book} />)}
              </div>
            )
          )}

          {activeTab === 'about' && (
            <div className="space-y-4 text-sm text-slate-700 max-w-2xl">
              <div>
                <h3 className="font-bold text-slate-900 mb-1">About {author.name}</h3>
                <p className="leading-relaxed">{author.bio}</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Primary Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {author.featuredGenres.map((g) => (
                    <Badge key={g} variant="brand">{g}</Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
};
