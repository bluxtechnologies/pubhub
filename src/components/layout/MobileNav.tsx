import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  GlobeAltIcon,
  BookmarkIcon,
  PencilSquareIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeSolid,
  GlobeAltIcon as GlobeAltSolid,
  BookmarkIcon as BookmarkSolid,
  PencilSquareIcon as PencilSquareSolid,
  UserIcon as UserSolid,
} from '@heroicons/react/24/solid';
import { cn } from '../../lib/utils/cn';

export const MobileNav: React.FC = () => {
  const items = [
    { label: 'Home', path: '/home', icon: HomeIcon, activeIcon: HomeSolid },
    { label: 'Discover', path: '/discover', icon: GlobeAltIcon, activeIcon: GlobeAltSolid },
    { label: 'Library', path: '/library', icon: BookmarkIcon, activeIcon: BookmarkSolid },
    { label: 'Write', path: '/write', icon: PencilSquareIcon, activeIcon: PencilSquareSolid },
    { label: 'Profile', path: '/profile', icon: UserIcon, activeIcon: UserSolid },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 h-16 flex items-center justify-around px-2 shadow-elevated">
      {items.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            cn(
              'flex flex-col items-center justify-center w-full py-1 text-[10px] font-medium transition-colors select-none',
              isActive ? 'text-brand-900 font-bold' : 'text-slate-500 hover:text-slate-800'
            )
          }
        >
          {({ isActive }) => {
            const Icon = isActive ? item.activeIcon : item.icon;
            return (
              <>
                <Icon className={cn('w-5 h-5 mb-0.5', isActive && 'scale-110')} />
                <span>{item.label}</span>
              </>
            );
          }}
        </NavLink>
      ))}
    </nav>
  );
};
