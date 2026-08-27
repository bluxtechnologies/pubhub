import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PencilIcon, CameraIcon, ShareIcon } from '@heroicons/react/24/outline';
import { AppShell } from '../components/layout/AppShell';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Tabs } from '../components/ui/Tabs';
import { BookCard } from '../components/books/BookCard';
import { ActivityCard } from '../components/social/ActivityCard';
import { CURRENT_USER, MOCK_BOOKS, MOCK_FEED_ACTIVITIES } from '../lib/mock/data';
import { formatNumber } from '../lib/utils/cn';

export const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('books');

  const myBooks = MOCK_BOOKS.filter((b) => b.author.id === CURRENT_USER.id);

  const tabs = [
    { id: 'books', label: 'Books', count: myBooks.length },
    { id: 'activity', label: 'Activity', count: MOCK_FEED_ACTIVITIES.length },
    { id: 'about', label: 'About' },
  ];

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Hero Card */}
        <div className="bg-white border border-slate-200/80 rounded-xl shadow-subtle overflow-hidden">
          {/* Cover banner */}
          <div className="h-32 sm:h-48 bg-gradient-to-br from-brand-900 via-brand-800 to-indigo-900 relative">
            <button className="absolute top-3 right-3 p-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors">
              <CameraIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Avatar + Meta */}
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-12 sm:-mt-14 mb-4">
              <div className="relative">
                <Avatar
                  src={CURRENT_USER.avatar}
                  name={CURRENT_USER.name}
                  size="xl"
                  isOnline
                  className="ring-4 ring-white"
                />
                <button className="absolute bottom-0 right-0 w-7 h-7 bg-brand-900 text-white rounded-full flex items-center justify-center hover:bg-brand-800 transition-colors">
                  <CameraIcon className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <Button variant="outline" size="sm" leftIcon={<ShareIcon className="w-4 h-4" />}>
                  Share Profile
                </Button>
                <Button variant="primary" size="sm" leftIcon={<PencilIcon className="w-4 h-4" />}>
                  Edit Profile
                </Button>
              </div>
            </div>

            {/* Name & bio */}
            <h1 className="font-serif font-bold text-slate-900 text-2xl">{CURRENT_USER.name}</h1>
            <p className="text-sm text-slate-500 mb-2">@{CURRENT_USER.username}</p>
            <p className="text-sm text-slate-700 leading-relaxed mb-4 max-w-lg">{CURRENT_USER.bio}</p>

            {/* Genres */}
            <div className="flex items-center gap-2 flex-wrap mb-4">
              <Badge variant="brand">Fantasy</Badge>
              <Badge variant="brand">High Fantasy</Badge>
              <Badge variant="brand">Epic</Badge>
            </div>

            {/* Stats Row */}
            <div className="flex items-center gap-6 pt-4 border-t border-slate-100">
              <div className="text-center">
                <p className="font-serif font-bold text-slate-900 text-lg">{formatNumber(myBooks.length)}</p>
                <p className="text-xs text-slate-500">Books</p>
              </div>
              <div className="text-center">
                <p className="font-serif font-bold text-slate-900 text-lg">{formatNumber(CURRENT_USER.followerCount)}</p>
                <p className="text-xs text-slate-500">Followers</p>
              </div>
              <div className="text-center">
                <p className="font-serif font-bold text-slate-900 text-lg">{formatNumber(CURRENT_USER.followingCount)}</p>
                <p className="text-xs text-slate-500">Following</p>
              </div>
              <div className="text-center">
                <p className="font-serif font-bold text-slate-900 text-lg">88.5K</p>
                <p className="text-xs text-slate-500">Total Reads</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border border-slate-200/80 rounded-xl shadow-subtle p-6">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="mb-6" />

          {activeTab === 'books' && (
            myBooks.length === 0 ? (
              <div className="text-center py-8 text-sm text-slate-500">No published books yet.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {myBooks.map((book) => <BookCard key={book.id} book={book} />)}
              </div>
            )
          )}

          {activeTab === 'activity' && (
            <div>
              {MOCK_FEED_ACTIVITIES.slice(0, 3).map((act) => (
                <ActivityCard key={act.id} activity={act} />
              ))}
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-4 text-sm text-slate-700">
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Bio</h3>
                <p className="leading-relaxed">{CURRENT_USER.bio}</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Member Since</h3>
                <p>{CURRENT_USER.joinedDate}</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Genres</h3>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="brand">Fantasy</Badge>
                  <Badge variant="brand">High Fantasy</Badge>
                  <Badge variant="brand">Epic</Badge>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
};
