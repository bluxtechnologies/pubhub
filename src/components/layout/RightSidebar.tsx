import React from 'react';
import { Link } from 'react-router-dom';
import {
  MagnifyingGlassIcon,
  CheckBadgeIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { Avatar } from '../ui/Avatar';
import { FollowButton } from '../social/FollowButton';
import { MOCK_AUTHORS } from '../../lib/mock/data';

export const RightSidebar: React.FC = () => {
  const trendingAuthors = MOCK_AUTHORS.slice(0, 3);
  const suggestedAuthors = MOCK_AUTHORS.slice(2, 4);

  return (
    <aside className="hidden lg:flex flex-col w-80 shrink-0 p-4 space-y-5 border-l border-slate-200/80 bg-white min-h-[calc(100vh-4rem)]">
      {/* Search Input Widget */}
      <div className="relative">
        <MagnifyingGlassIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="search"
          placeholder="Search authors, books, genres..."
          className="w-full h-9 pl-9 pr-4 bg-slate-100/90 hover:bg-slate-100 focus:bg-white border border-transparent focus:border-brand-900 rounded-full text-xs text-slate-900 placeholder:text-slate-400 transition-all focus:outline-none focus:ring-1 focus:ring-brand-900"
        />
      </div>

      {/* Trending Authors Widget */}
      <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 uppercase tracking-wider">
            <SparklesIcon className="w-4 h-4 text-brand-900" />
            <span>Trending Authors</span>
          </div>
          <Link to="/discover" className="text-[11px] font-bold text-brand-900 hover:underline">
            View all
          </Link>
        </div>

        <div className="space-y-3">
          {trendingAuthors.map((author) => (
            <div key={author.id} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <Avatar src={author.avatar} name={author.name} size="sm" className="shrink-0" />
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <Link
                      to={`/authors/${author.id}`}
                      className="font-bold text-xs text-slate-900 hover:text-brand-900 truncate block"
                    >
                      {author.name}
                    </Link>
                    <CheckBadgeIcon className="w-3.5 h-3.5 text-brand-900 shrink-0" />
                  </div>
                  <span className="text-[11px] text-slate-400 block truncate">@{author.username}</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="inline-flex items-center text-[10px] font-bold text-brand-900 bg-brand-50 border border-brand-200/60 px-1.5 py-0.2 rounded-full">
                      {author.followerCount > 1000 ? `${(author.followerCount / 1000).toFixed(1)}k` : author.followerCount} Followers
                    </span>
                  </div>
                </div>
              </div>

              <FollowButton authorId={author.id} authorName={author.name} size="sm" />
            </div>
          ))}
        </div>
      </div>

      {/* Suggested Authors Widget */}
      <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 space-y-3">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 uppercase tracking-wider">
          <span>Suggested Authors</span>
        </div>

        <div className="space-y-3">
          {suggestedAuthors.map((author) => (
            <div key={author.id} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <Avatar src={author.avatar} name={author.name} size="sm" className="shrink-0" />
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <Link
                      to={`/authors/${author.id}`}
                      className="font-bold text-xs text-slate-900 hover:text-brand-900 truncate block"
                    >
                      {author.name}
                    </Link>
                    <CheckBadgeIcon className="w-3.5 h-3.5 text-brand-900 shrink-0" />
                  </div>
                  <span className="text-[11px] text-slate-400 block truncate">
                    {author.bio ? author.bio.slice(0, 30) + '...' : 'Storyteller'}
                  </span>
                </div>
              </div>

              <FollowButton authorId={author.id} authorName={author.name} size="sm" />
            </div>
          ))}
        </div>
      </div>

      {/* Platform Footer Links */}
      <div className="pt-2 text-[11px] text-slate-400 space-y-2">
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          <Link to="#" className="hover:underline">Terms</Link>
          <Link to="#" className="hover:underline">Privacy</Link>
          <Link to="#" className="hover:underline">Guidelines</Link>
          <Link to="#" className="hover:underline">Help Center</Link>
        </div>
        <p>© 2026 PubHub Inc. Social Reading Platform.</p>
      </div>
    </aside>
  );
};
