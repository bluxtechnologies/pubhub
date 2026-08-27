import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BellIcon, CheckIcon } from '@heroicons/react/24/outline';
import { AppShell } from '../components/layout/AppShell';
import { Tabs } from '../components/ui/Tabs';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';
import { useNotifications, useMarkNotificationAsRead } from '../hooks/useFeed';

export const NotificationsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');

  const { data: notifications = [], isLoading } = useNotifications();
  const markReadMutation = useMarkNotificationAsRead();

  const unread = notifications.filter((n) => !n.read);
  const all = notifications;

  const tabs = [
    { id: 'all', label: 'All', count: all.length },
    { id: 'unread', label: 'Unread', count: unread.length },
  ];

  const displayNotifs = activeTab === 'unread' ? unread : all;

  const typeColor: Record<string, string> = {
    follow: 'bg-brand-50 text-brand-900 border-brand-200',
    like: 'bg-rose-50 text-rose-700 border-rose-200',
    comment: 'bg-amber-50 text-amber-700 border-amber-200',
    reply: 'bg-amber-50 text-amber-700 border-amber-200',
    new_chapter: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    publish: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  };

  const typeLabel: Record<string, string> = {
    follow: 'Follow',
    like: 'Like',
    comment: 'Comment',
    reply: 'Reply',
    new_chapter: 'New Chapter',
    publish: 'Published',
  };

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-900 flex items-center justify-center">
              <BellIcon className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-serif font-bold text-2xl text-slate-900">Notifications</h1>
              <p className="text-xs text-slate-500">{unread.length} unread</p>
            </div>
          </div>

          {unread.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<CheckIcon className="w-4 h-4" />}
              onClick={() => unread.forEach((n) => markReadMutation.mutate(n.id))}
            >
              Mark all read
            </Button>
          )}
        </div>

        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        {/* Notification List */}
        {displayNotifs.length === 0 ? (
          <EmptyState
            icon={<BellIcon className="w-10 h-10 text-slate-400" />}
            title="All caught up!"
            description="You have no notifications right now. We'll let you know when something happens."
          />
        ) : (
          <div className="bg-white border border-slate-200/80 rounded-xl shadow-subtle overflow-hidden divide-y divide-slate-100">
            {displayNotifs.map((notif) => (
              <div
                key={notif.id}
                className={`flex items-start gap-3 p-4 hover:bg-slate-50 transition-colors cursor-pointer ${
                  !notif.read ? 'bg-brand-50/20 border-l-2 border-brand-900' : ''
                }`}
                onClick={() => !notif.read && markReadMutation.mutate(notif.id)}
              >
                {/* Sender Avatar */}
                <div className="relative shrink-0">
                  <Avatar src={notif.sender.avatar} name={notif.sender.name} size="md" />
                  {!notif.read && (
                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-brand-900 rounded-full ring-2 ring-white" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="text-xs text-slate-800 leading-relaxed">
                      <span className="font-bold text-slate-900">{notif.sender.name}</span>{' '}
                      {notif.text}
                    </p>
                    <Badge
                      variant="default"
                      size="sm"
                      className={`shrink-0 uppercase tracking-widest font-bold border ${typeColor[notif.type]}`}
                    >
                      {typeLabel[notif.type]}
                    </Badge>
                  </div>

                  {/* Optional linked book preview */}
                  {notif.targetBook && (
                    <Link
                      to={`/books/${notif.targetBook.id}`}
                      className="inline-flex items-center gap-2 mt-1 text-[11px] text-brand-900 font-semibold hover:underline"
                    >
                      <img
                        src={notif.targetBook.coverImage}
                        className="w-5 h-7 rounded object-cover"
                        alt={notif.targetBook.title}
                      />
                      {notif.targetBook.title}
                      {notif.targetChapter && ` — Ch.${notif.targetChapter.chapterNumber}`}
                    </Link>
                  )}

                  <span className="text-[11px] text-slate-400 mt-1 block">{notif.createdAt}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
};
