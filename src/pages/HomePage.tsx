import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { AppShell } from '../components/layout/AppShell';
import { BookCardHorizontal } from '../components/books/BookCardHorizontal';
import { ActivityCard } from '../components/social/ActivityCard';
import { Skeleton } from '../components/ui/Skeleton';
import { useTrendingBooks } from '../hooks/useBooks';
import { useFeedActivities } from '../hooks/useFeed';

export const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('for_you');
  const { data: trendingBooks = [] } = useTrendingBooks();
  const { data: activities = [], isLoading: loadingFeed } = useFeedActivities();

  const continueReadingBook = trendingBooks.find((b) => b.userProgress);

  const feedTabs = [
    { id: 'for_you', label: 'For You' },
    { id: 'subscribed', label: 'Subscribed' },
    { id: 'trending', label: 'Trending' },
    { id: 'fiction', label: 'Fiction' },
  ];

  return (
    <AppShell>
      <div className="space-y-4">
        {/* Sub-Header Feed Tabs */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-1.5 flex items-center gap-1 shadow-subtle overflow-x-auto">
          {feedTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-brand-50 text-brand-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Continue Reading Widget */}
        {continueReadingBook && (
          <section>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xs font-extrabold tracking-wider text-slate-400 uppercase flex items-center gap-1.5 px-1">
                <SparklesIcon className="w-3.5 h-3.5 text-brand-900" />
                <span>Continue Reading</span>
              </h2>
              <Link to="/library" className="text-xs text-brand-900 font-bold hover:underline">
                View Library
              </Link>
            </div>
            <BookCardHorizontal book={continueReadingBook} />
          </section>
        )}

        {/* Activity Feed Section */}
        <section className="space-y-4">
          {loadingFeed ? (
            <div className="space-y-4">
              <Skeleton className="h-48 w-full rounded-2xl" />
              <Skeleton className="h-48 w-full rounded-2xl" />
            </div>
          ) : (
            activities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))
          )}
        </section>
      </div>
    </AppShell>
  );
};
