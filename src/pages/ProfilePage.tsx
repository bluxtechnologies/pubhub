import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PencilIcon, CameraIcon, ShareIcon, SparklesIcon, FireIcon } from '@heroicons/react/24/outline';
import { AppShell } from '../components/layout/AppShell';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Tabs } from '../components/ui/Tabs';
import { BookCard } from '../components/books/BookCard';
import { ActivityCard } from '../components/social/ActivityCard';
import { CURRENT_USER, MOCK_BOOKS, MOCK_FEED_ACTIVITIES } from '../lib/mock/data';
import { formatNumber } from '../lib/utils/cn';
import { useAuth } from '../features/auth/AuthProvider';

const BADGES = [
  { id: 'b_1', title: '7-Day Streak', icon: '🔥', description: 'Read at least 1 chapter every day for 7 days.' },
  { id: 'b_2', title: 'Avid Reader', icon: '📚', description: 'Read over 50 total chapters on PubHub.' },
  { id: 'b_3', title: 'Top Critic', icon: '✍️', description: 'Posted 25+ thoughtful inline comments.' },
  { id: 'b_4', title: 'First Chapter', icon: '🚀', description: 'Published your very first story chapter.' },
];

export const ProfilePage: React.FC = () => {
  const { user: authUser } = useAuth();
  const [activeTab, setActiveTab] = useState('books');

  const user = authUser || CURRENT_USER;
  const myBooks = MOCK_BOOKS.filter((b) => b.author.id === user.id);

  const tabs = [
    { id: 'books', label: 'Books', count: myBooks.length },
    { id: 'activity', label: 'Activity', count: MOCK_FEED_ACTIVITIES.length },
    { id: 'badges', label: 'Badges & Streaks', count: BADGES.length },
    { id: 'about', label: 'About' },
  ];

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Hero Card */}
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-subtle overflow-hidden">
          {/* Cover banner */}
          <div className="h-32 sm:h-48 bg-gradient-to-br from-emerald-800 via-teal-900 to-slate-900 relative">
            <button className="absolute top-3 right-3 p-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors">
              <CameraIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Avatar + Meta */}
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-12 sm:-mt-14 mb-4">
              <div className="relative">
                <Avatar
                  src={user.avatar}
                  name={user.name}
                  size="xl"
                  isOnline
                  className="ring-4 ring-white"
                />
                <button className="absolute bottom-0 right-0 w-7 h-7 bg-emerald-600 text-white rounded-full flex items-center justify-center hover:bg-emerald-700 transition-colors">
                  <CameraIcon className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <Button variant="outline" size="sm" leftIcon={<ShareIcon className="w-4 h-4" />}>
                  Share Profile
                </Button>
                <Link to="/settings">
                  <Button variant="primary" size="sm" className="bg-emerald-600 hover:bg-emerald-700" leftIcon={<PencilIcon className="w-4 h-4" />}>
                    Edit Profile
                  </Button>
                </Link>
              </div>
            </div>

            {/* Name & bio */}
            <h1 className="font-serif font-bold text-slate-900 text-2xl">{user.name}</h1>
            <p className="text-sm text-slate-500 mb-2">@{user.username}</p>
            <p className="text-sm text-slate-700 leading-relaxed mb-4 max-w-lg">{user.bio}</p>

            {/* Reading Streak & Level Banner */}
            <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200/80 rounded-xl mb-4 max-w-md">
              <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg shrink-0">
                🔥
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span className="text-slate-900">5-Day Reading Streak</span>
                  <span className="text-amber-600">Level 4 Reader</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full w-[70%]" />
                </div>
              </div>
            </div>

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
                <p className="font-serif font-bold text-slate-900 text-lg">{formatNumber(user.followerCount)}</p>
                <p className="text-xs text-slate-500">Followers</p>
              </div>
              <div className="text-center">
                <p className="font-serif font-bold text-slate-900 text-lg">{formatNumber(user.followingCount)}</p>
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
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-subtle p-6">
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

          {activeTab === 'badges' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BADGES.map((b) => (
                <div key={b.id} className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-200/80 rounded-xl">
                  <span className="text-3xl select-none">{b.icon}</span>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{b.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{b.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-4 text-sm text-slate-700">
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Bio</h3>
                <p className="leading-relaxed">{user.bio}</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Member Since</h3>
                <p>{user.joinedDate}</p>
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
