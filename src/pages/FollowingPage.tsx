import React from 'react';
import { Link } from 'react-router-dom';
import { UserGroupIcon } from '@heroicons/react/24/outline';
import { AppShell } from '../components/layout/AppShell';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { FollowButton } from '../components/social/FollowButton';
import { ActivityCard } from '../components/social/ActivityCard';
import { EmptyState } from '../components/ui/EmptyState';
import { Tabs } from '../components/ui/Tabs';
import { MOCK_AUTHORS, MOCK_FEED_ACTIVITIES } from '../lib/mock/data';
import { formatNumber } from '../lib/utils/cn';
import { useState } from 'react';

export const FollowingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('feed');

  const tabs = [
    { id: 'feed', label: 'Activity Feed' },
    { id: 'authors', label: 'Authors I Follow', count: MOCK_AUTHORS.filter(a => a.isFollowing).length },
  ];

  const followedAuthors = MOCK_AUTHORS.filter((a) => a.isFollowing);

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-900 flex items-center justify-center">
            <UserGroupIcon className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-serif font-bold text-2xl text-slate-900">Following</h1>
            <p className="text-xs text-slate-500">Stay up-to-date with your favourite authors</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main feed */}
          <div className="lg:col-span-2">
            <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="mb-5" />

            {activeTab === 'feed' && (
              <div>
                {MOCK_FEED_ACTIVITIES.map((act) => (
                  <ActivityCard key={act.id} activity={act} />
                ))}
              </div>
            )}

            {activeTab === 'authors' && (
              followedAuthors.length === 0 ? (
                <EmptyState
                  icon={<UserGroupIcon className="w-10 h-10 text-slate-400" />}
                  title="Not following anyone yet"
                  description="Follow authors to see their new chapters and activity in your feed."
                  actionLabel="Discover Authors"
                  onAction={() => window.location.assign('/discover')}
                />
              ) : (
                <div className="space-y-4">
                  {followedAuthors.map((author) => (
                    <div
                      key={author.id}
                      className="flex items-start justify-between gap-4 p-4 bg-white border border-slate-200/80 rounded-xl shadow-subtle hover:border-brand-200 transition-colors"
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <Avatar src={author.avatar} name={author.name} size="lg" />
                        <div className="min-w-0">
                          <Link to={`/authors/${author.id}`}>
                            <h3 className="font-bold text-slate-900 text-sm hover:text-brand-900">{author.name}</h3>
                          </Link>
                          <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">{author.bio}</p>
                          <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                            <span>{formatNumber(author.followerCount)} followers</span>
                            <span>{author.totalBooks} books</span>
                          </div>
                          <div className="flex gap-1.5 flex-wrap mt-2">
                            {author.featuredGenres.map((g) => (
                              <Badge key={g} variant="brand" size="sm">{g}</Badge>
                            ))}
                          </div>
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
              )
            )}
          </div>

          {/* Sidebar: Author suggestions */}
          <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-subtle h-fit">
            <h3 className="font-bold text-sm text-slate-900 mb-3 pb-2 border-b border-slate-100">
              Suggested Authors
            </h3>
            <div className="space-y-4">
              {MOCK_AUTHORS.filter((a) => !a.isFollowing).map((author) => (
                <div key={author.id} className="flex items-start gap-2.5">
                  <Avatar src={author.avatar} name={author.name} size="md" />
                  <div className="flex-1 min-w-0">
                    <Link to={`/authors/${author.id}`}>
                      <p className="font-semibold text-xs text-slate-900 hover:text-brand-900 truncate">{author.name}</p>
                    </Link>
                    <p className="text-[11px] text-slate-500">{formatNumber(author.followerCount)} followers</p>
                    <FollowButton authorId={author.id} authorName={author.name} size="sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
};
