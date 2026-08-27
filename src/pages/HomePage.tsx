import React from 'react';
import { Link } from 'react-router-dom';
import { SparklesIcon, FireIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import { AppShell } from '../components/layout/AppShell';
import { BookCard } from '../components/books/BookCard';
import { BookCardHorizontal } from '../components/books/BookCardHorizontal';
import { ActivityCard } from '../components/social/ActivityCard';
import { Skeleton } from '../components/ui/Skeleton';
import { Avatar } from '../components/ui/Avatar';
import { FollowButton } from '../components/social/FollowButton';
import { useTrendingBooks } from '../hooks/useBooks';
import { useFeedActivities } from '../hooks/useFeed';
import { MOCK_AUTHORS } from '../lib/mock/data';

export const HomePage: React.FC = () => {
  const { data: trendingBooks = [], isLoading: loadingBooks } = useTrendingBooks();
  const { data: activities = [], isLoading: loadingFeed } = useFeedActivities();

  const continueReadingBook = trendingBooks.find((b) => b.userProgress);

  return (
    <AppShell>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Feed & Reading Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Continue Reading Widget */}
          {continueReadingBook && (
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold tracking-wider text-slate-900 uppercase flex items-center gap-1.5">
                  <SparklesIcon className="w-4 h-4 text-brand-900" />
                  <span>Continue Reading</span>
                </h2>
                <Link to="/library" className="text-xs text-brand-900 font-semibold hover:underline">
                  View Library
                </Link>
              </div>
              <BookCardHorizontal book={continueReadingBook} />
            </section>
          )}

          {/* Social Activity Feed */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif font-bold text-slate-900 text-xl">Community Activity</h2>
              <span className="text-xs text-slate-500">Live updates from authors you follow</span>
            </div>

            {loadingFeed ? (
              <div className="space-y-4">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-48 w-full" />
              </div>
            ) : (
              activities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))
            )}
          </section>
        </div>

        {/* Right Sidebar Widgets */}
        <div className="space-y-6">
          {/* Trending Stories Grid Widget */}
          <section className="bg-white border border-slate-200/80 rounded-lg p-4 shadow-subtle">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
              <h3 className="font-serif font-bold text-slate-900 text-base flex items-center gap-1.5">
                <FireIcon className="w-4 h-4 text-rose-500" />
                <span>Trending Today</span>
              </h3>
              <Link to="/discover" className="text-xs text-brand-900 font-semibold hover:underline">
                Explore All
              </Link>
            </div>

            {loadingBooks ? (
              <div className="space-y-3">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {trendingBooks.slice(0, 2).map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            )}
          </section>

          {/* Featured Authors to Follow */}
          <section className="bg-white border border-slate-200/80 rounded-lg p-4 shadow-subtle">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <UserPlusIcon className="w-4 h-4 text-brand-900" />
                <span>Authors to Follow</span>
              </h3>
            </div>

            <div className="space-y-4">
              {MOCK_AUTHORS.map((author) => (
                <div key={author.id} className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5 min-w-0">
                    <Avatar src={author.avatar} name={author.name} size="md" />
                    <div className="min-w-0">
                      <h4 className="font-semibold text-xs text-slate-900 truncate hover:text-brand-900">
                        {author.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-1">{author.bio}</p>
                    </div>
                  </div>
                  <FollowButton
                    authorId={author.id}
                    authorName={author.name}
                    initialFollowing={author.isFollowing}
                    size="sm"
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
};
