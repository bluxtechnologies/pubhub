import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MagnifyingGlassIcon,
  BellIcon,
  BookOpenIcon,
  PencilSquareIcon,
  UserIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { CURRENT_USER } from '../../lib/mock/data';
import { Avatar } from '../ui/Avatar';
import { useNotifications } from '../../hooks/useFeed';

export const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const { data: notifications = [] } = useNotifications();
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/discover?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 h-16 px-4 sm:px-6 flex items-center justify-between">
      {/* Brand Logo */}
      <div className="flex items-center gap-6">
        <Link to="/home" className="flex items-center gap-2.5 group select-none">
          <div className="w-9 h-9 rounded-lg bg-brand-900 flex items-center justify-center text-white shadow-subtle group-hover:bg-brand-800 transition-colors">
            <BookOpenIcon className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <span className="font-serif font-black text-xl tracking-tight text-slate-900 group-hover:text-brand-900 transition-colors">
              PubHub
            </span>
            <span className="hidden sm:inline-block ml-2 text-[10px] uppercase font-bold tracking-widest text-brand-900 bg-brand-50 px-1.5 py-0.5 rounded border border-brand-200/60">
              Platform
            </span>
          </div>
        </Link>
      </div>

      {/* Global Search Input */}
      <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <MagnifyingGlassIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search books, authors, genres..."
            className="w-full h-9 pl-9 pr-4 bg-slate-100/80 hover:bg-slate-100 focus:bg-white border border-transparent focus:border-brand-900 rounded-full text-xs text-slate-900 placeholder:text-slate-400 transition-all focus:outline-none focus:ring-1 focus:ring-brand-900"
          />
        </div>
      </form>

      {/* Right Header Navigation & Actions */}
      <div className="flex items-center gap-3">
        <Link to="/write">
          <button className="hidden sm:inline-flex items-center gap-1.5 h-9 px-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-full transition-colors">
            <PencilSquareIcon className="w-4 h-4 text-brand-900" />
            <span>Write</span>
          </button>
        </Link>

        {/* Notifications Popover */}
        <div className="relative">
          <Link to="/notifications" onClick={() => setShowNotifications(!showNotifications)}>
            <button
              className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
            >
              <BellIcon className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-600 rounded-full ring-2 ring-white animate-pulse" />
              )}
            </button>
          </Link>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-lg shadow-elevated z-50 overflow-hidden animate-in fade-in zoom-in-95">
              <div className="p-3.5 border-b border-slate-100 flex items-center justify-between">
                <h4 className="font-bold text-sm text-slate-900">Notifications</h4>
                <span className="text-xs text-brand-900 font-medium cursor-pointer">Mark all as read</span>
              </div>
              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {notifications.map((n) => (
                  <div key={n.id} className={`p-3 text-xs flex gap-3 hover:bg-slate-50 ${!n.read ? 'bg-brand-50/30' : ''}`}>
                    <Avatar src={n.sender.avatar} name={n.sender.name} size="sm" />
                    <div>
                      <p className="text-slate-800">
                        <span className="font-semibold text-slate-900">{n.sender.name}</span> {n.text}
                      </p>
                      <span className="text-[10px] text-slate-400 mt-1 block">{n.createdAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-slate-200 transition-all"
          >
            <Avatar src={CURRENT_USER.avatar} name={CURRENT_USER.name} size="sm" isOnline />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-lg shadow-elevated z-50 p-1.5 animate-in fade-in zoom-in-95">
              <div className="px-3 py-2 border-b border-slate-100 mb-1">
                <p className="font-bold text-sm text-slate-900 truncate">{CURRENT_USER.name}</p>
                <p className="text-xs text-slate-500 truncate">@{CURRENT_USER.username}</p>
              </div>

              <Link
                to="/profile"
                className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-md"
                onClick={() => setShowProfileMenu(false)}
              >
                <UserIcon className="w-4 h-4 text-slate-400" />
                <span>My Profile</span>
              </Link>

              <Link
                to="/write"
                className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-md"
                onClick={() => setShowProfileMenu(false)}
              >
                <PencilSquareIcon className="w-4 h-4 text-slate-400" />
                <span>Writer Dashboard</span>
              </Link>

              <Link
                to="/settings"
                className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-md"
                onClick={() => setShowProfileMenu(false)}
              >
                <Cog6ToothIcon className="w-4 h-4 text-slate-400" />
                <span>Settings</span>
              </Link>

              <div className="border-t border-slate-100 mt-1 pt-1">
                <button className="flex items-center gap-2 w-full px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-md">
                  <ArrowRightOnRectangleIcon className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
