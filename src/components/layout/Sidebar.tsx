import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  HomeIcon,
  GlobeAltIcon,
  BookmarkIcon,
  UserGroupIcon,
  PencilSquareIcon,
  BellIcon,
  UserIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeSolid,
  GlobeAltIcon as GlobeAltSolid,
  BookmarkIcon as BookmarkSolid,
  UserGroupIcon as UserGroupSolid,
  PencilSquareIcon as PencilSquareSolid,
  BellIcon as BellSolid,
  UserIcon as UserSolid,
  Cog6ToothIcon as Cog6ToothSolid,
} from '@heroicons/react/24/solid';
import { cn } from '../../lib/utils/cn';
import { useAuth } from '../../features/auth/AuthProvider';
import { Button } from '../ui/Button';

export const Sidebar: React.FC = () => {
  const { isAuthenticated } = useAuth();

  const mainNavItems = [
    { label: 'Home', path: '/home', icon: HomeIcon, activeIcon: HomeSolid },
    { label: 'Discover', path: '/discover', icon: GlobeAltIcon, activeIcon: GlobeAltSolid },
    { label: 'Notifications', path: '/notifications', icon: BellIcon, activeIcon: BellSolid },
    { label: 'Profile', path: '/profile', icon: UserIcon, activeIcon: UserSolid },
  ];

  const libraryNavItems = [
    { label: 'My Library', path: '/library', icon: BookmarkIcon, activeIcon: BookmarkSolid },
    { label: 'Following', path: '/following', icon: UserGroupIcon, activeIcon: UserGroupSolid },
    { label: 'Writer Hub', path: '/write', icon: PencilSquareIcon, activeIcon: PencilSquareSolid },
    { label: 'Settings', path: '/settings', icon: Cog6ToothIcon, activeIcon: Cog6ToothSolid },
  ];

  return (
    <aside className="hidden md:flex flex-col w-60 border-r border-slate-200/80 bg-white min-h-[calc(100vh-4rem)] p-4 shrink-0 justify-between">
      <div className="space-y-6">
        {/* Section 1: Feed & Discovery */}
        <div>
          <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-2 px-3">
            Feed & Discovery
          </h4>
          <nav className="space-y-1">
            {mainNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all select-none',
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  )
                }
              >
                {({ isActive }) => {
                  const Icon = isActive ? item.activeIcon : item.icon;
                  return (
                    <>
                      <Icon className={cn('w-4 h-4', isActive ? 'text-emerald-700' : 'text-slate-400')} />
                      <span>{item.label}</span>
                    </>
                  );
                }}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Section 2: Workspace & Library */}
        <div>
          <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-2 px-3">
            Workspace & Library
          </h4>
          <nav className="space-y-1">
            {libraryNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all select-none',
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  )
                }
              >
                {({ isActive }) => {
                  const Icon = isActive ? item.activeIcon : item.icon;
                  return (
                    <>
                      <Icon className={cn('w-4 h-4', isActive ? 'text-emerald-700' : 'text-slate-400')} />
                      <span>{item.label}</span>
                    </>
                  );
                }}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Guest Sign In / Join Card (matching Rokan bottom card) */}
      {!isAuthenticated && (
        <div className="pt-4 border-t border-slate-100">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center space-y-2.5">
            <h5 className="font-bold text-xs text-slate-900 leading-snug">Join PubHub Today</h5>
            <p className="text-[11px] text-slate-500 leading-normal">
              Subscribe to verified authors, comment on chapters & track reading history.
            </p>
            <div className="space-y-1.5 pt-1">
              <Link to="/login" className="block">
                <Button variant="primary" size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-full">
                  Sign in
                </Button>
              </Link>
              <Link to="/register" className="block">
                <Button variant="outline" size="sm" className="w-full rounded-full border-slate-300 text-slate-700 hover:bg-slate-100">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
