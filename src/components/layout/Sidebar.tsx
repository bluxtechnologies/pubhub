import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  GlobeAltIcon,
  BookmarkIcon,
  UserGroupIcon,
  PencilSquareIcon,
  BellIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeSolid,
  GlobeAltIcon as GlobeAltSolid,
  BookmarkIcon as BookmarkSolid,
  UserGroupIcon as UserGroupSolid,
  PencilSquareIcon as PencilSquareSolid,
  BellIcon as BellSolid,
} from '@heroicons/react/24/solid';
import { cn } from '../../lib/utils/cn';

export const Sidebar: React.FC = () => {
  const navItems = [
    { label: 'Home Feed', path: '/home', icon: HomeIcon, activeIcon: HomeSolid },
    { label: 'Discover', path: '/discover', icon: GlobeAltIcon, activeIcon: GlobeAltSolid },
    { label: 'My Library', path: '/library', icon: BookmarkIcon, activeIcon: BookmarkSolid },
    { label: 'Following', path: '/following', icon: UserGroupIcon, activeIcon: UserGroupSolid },
    { label: 'Notifications', path: '/notifications', icon: BellIcon, activeIcon: BellSolid },
    { label: 'Writer Hub', path: '/write', icon: PencilSquareIcon, activeIcon: PencilSquareSolid },
  ];

  return (
    <aside className="hidden md:flex flex-col w-60 border-r border-slate-200/80 bg-white min-h-[calc(100vh-4rem)] p-4 shrink-0">
      <nav className="space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all select-none',
                isActive
                  ? 'bg-brand-50 text-brand-900 font-bold border-l-4 border-brand-900 shadow-subtle'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              )
            }
          >
            {({ isActive }) => {
              const Icon = isActive ? item.activeIcon : item.icon;
              return (
                <>
                  <Icon className={cn('w-5 h-5', isActive ? 'text-brand-900' : 'text-slate-400')} />
                  <span>{item.label}</span>
                </>
              );
            }}
          </NavLink>
        ))}
      </nav>

      {/* Writer Community Callout Card */}
      <div className="mt-auto pt-6">
        <div className="p-4 rounded-xl bg-gradient-to-br from-brand-900 to-brand-950 text-white shadow-elevated">
          <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-1">
            <SparklesIcon className="w-4 h-4" />
            <span>Writer Program</span>
          </div>
          <h4 className="font-serif font-bold text-sm leading-snug mb-1">Publish Your Story</h4>
          <p className="text-xs text-brand-100 leading-relaxed mb-3">
            Reach thousands of readers and build your personal audience today.
          </p>
          <NavLink to="/write">
            <button className="w-full py-1.5 bg-white text-brand-900 text-xs font-bold rounded-md hover:bg-slate-100 transition-colors">
              Start Writing
            </button>
          </NavLink>
        </div>
      </div>
    </aside>
  );
};
