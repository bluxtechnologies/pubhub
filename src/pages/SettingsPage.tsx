import React, { useState } from 'react';
import {
  UserIcon,
  LockClosedIcon,
  BellIcon,
  Cog6ToothIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';
import { AppShell } from '../components/layout/AppShell';
import { Tabs } from '../components/ui/Tabs';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Button } from '../components/ui/Button';
import { Checkbox } from '../components/ui/Checkbox';
import { Radio } from '../components/ui/Radio';
import { Card } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';
import { useToast } from '../components/ui/ToastProvider';
import { CURRENT_USER } from '../lib/mock/data';

export const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const toast = useToast();

  // Profile form state
  const [name, setName] = useState(CURRENT_USER.name);
  const [username, setUsername] = useState(CURRENT_USER.username);
  const [bio, setBio] = useState(CURRENT_USER.bio ?? '');

  // Notification prefs
  const [notifNewChapter, setNotifNewChapter] = useState(true);
  const [notifComments, setNotifComments] = useState(true);
  const [notifFollows, setNotifFollows] = useState(true);
  const [notifNewsletter, setNotifNewsletter] = useState(false);

  // Reader prefs
  const [defaultFont, setDefaultFont] = useState<'serif' | 'sans'>('serif');
  const [defaultTheme, setDefaultTheme] = useState<'light' | 'sepia' | 'dark'>('light');

  const tabs = [
    { id: 'profile', label: 'Profile', },
    { id: 'notifications', label: 'Notifications' },
    { id: 'reader', label: 'Reader' },
    { id: 'security', label: 'Security' },
  ];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Profile Updated', 'Your profile changes have been saved successfully.');
  };

  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Preferences Saved', 'Your notification settings have been updated.');
  };

  const handleSaveReader = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Reader Settings Saved', 'Your reading preferences have been saved.');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Password Changed', 'Your password has been updated successfully.');
  };

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Settings Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-900 flex items-center justify-center">
            <Cog6ToothIcon className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-serif font-bold text-2xl text-slate-900">Settings</h1>
            <p className="text-xs text-slate-500">Manage your account, preferences and security</p>
          </div>
        </div>

        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        {/* ── PROFILE TAB ── */}
        {activeTab === 'profile' && (
          <Card>
            <div className="flex items-center gap-4 mb-6 pb-5 border-b border-slate-100">
              <Avatar src={CURRENT_USER.avatar} name={CURRENT_USER.name} size="xl" />
              <div>
                <Button variant="outline" size="sm">Change Photo</Button>
                <p className="text-xs text-slate-400 mt-1">JPG, PNG or GIF · Max 5MB</p>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Display Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your display name"
                />
                <Input
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="your_username"
                />
              </div>
              <Input
                label="Email Address"
                type="email"
                defaultValue="alex.vance@example.com"
                placeholder="your@email.com"
              />
              <Textarea
                label="Author Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                placeholder="Tell readers and other authors about yourself..."
                helperText={`${bio.length}/300 characters`}
              />
              <div className="flex justify-end pt-2">
                <Button type="submit" variant="primary" size="md" leftIcon={<CheckIcon className="w-4 h-4" />}>
                  Save Profile
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* ── NOTIFICATIONS TAB ── */}
        {activeTab === 'notifications' && (
          <Card>
            <h2 className="font-bold text-slate-900 text-base mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
              <BellIcon className="w-5 h-5 text-brand-900" />
              Notification Preferences
            </h2>
            <form onSubmit={handleSaveNotifications} className="space-y-5">
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Email Alerts</p>
                <Checkbox
                  label="New chapter published by followed authors"
                  description="Get notified when an author you follow publishes a new chapter."
                  checked={notifNewChapter}
                  onChange={(e) => setNotifNewChapter(e.target.checked)}
                />
                <Checkbox
                  label="Comments and replies on my work"
                  description="Get notified when readers comment on your books or chapters."
                  checked={notifComments}
                  onChange={(e) => setNotifComments(e.target.checked)}
                />
                <Checkbox
                  label="New followers"
                  description="Be notified when someone follows your author profile."
                  checked={notifFollows}
                  onChange={(e) => setNotifFollows(e.target.checked)}
                />
                <Checkbox
                  label="PubHub community newsletter"
                  description="Occasional editorial picks, platform news and writing tips."
                  checked={notifNewsletter}
                  onChange={(e) => setNotifNewsletter(e.target.checked)}
                />
              </div>
              <div className="flex justify-end pt-2 border-t border-slate-100">
                <Button type="submit" variant="primary" size="md">Save Preferences</Button>
              </div>
            </form>
          </Card>
        )}

        {/* ── READER TAB ── */}
        {activeTab === 'reader' && (
          <Card>
            <h2 className="font-bold text-slate-900 text-base mb-4 pb-3 border-b border-slate-100">
              Default Reader Preferences
            </h2>
            <form onSubmit={handleSaveReader} className="space-y-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Default Font Style</p>
                <div className="space-y-2.5">
                  <Radio
                    label="Serif (Source Serif 4) — Recommended for long fiction"
                    checked={defaultFont === 'serif'}
                    onChange={() => setDefaultFont('serif')}
                    name="fontStyle"
                  />
                  <Radio
                    label="Sans-Serif (Instrument Sans) — Clean and modern"
                    checked={defaultFont === 'sans'}
                    onChange={() => setDefaultFont('sans')}
                    name="fontStyle"
                  />
                </div>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Default Reading Theme</p>
                <div className="space-y-2.5">
                  <Radio
                    label="Default — Light background with dark text"
                    checked={defaultTheme === 'light'}
                    onChange={() => setDefaultTheme('light')}
                    name="readerTheme"
                  />
                  <Radio
                    label="Sepia — Warm cream background, easy on the eyes"
                    checked={defaultTheme === 'sepia'}
                    onChange={() => setDefaultTheme('sepia')}
                    name="readerTheme"
                  />
                  <Radio
                    label="Night — Dark background for low-light reading"
                    checked={defaultTheme === 'dark'}
                    onChange={() => setDefaultTheme('dark')}
                    name="readerTheme"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2 border-t border-slate-100">
                <Button type="submit" variant="primary" size="md">Save Reader Settings</Button>
              </div>
            </form>
          </Card>
        )}

        {/* ── SECURITY TAB ── */}
        {activeTab === 'security' && (
          <Card>
            <h2 className="font-bold text-slate-900 text-base mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
              <LockClosedIcon className="w-5 h-5 text-brand-900" />
              Security & Password
            </h2>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <Input
                label="Current Password"
                type="password"
                placeholder="Enter your current password"
              />
              <Input
                label="New Password"
                type="password"
                placeholder="Minimum 8 characters"
                helperText="Use a mix of letters, numbers, and symbols for a strong password."
              />
              <Input
                label="Confirm New Password"
                type="password"
                placeholder="Repeat your new password"
              />
              <div className="flex justify-end pt-2 border-t border-slate-100">
                <Button type="submit" variant="primary" size="md">Change Password</Button>
              </div>
            </form>

            <div className="mt-6 pt-5 border-t border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm mb-1">Danger Zone</h3>
              <p className="text-xs text-slate-500 mb-3">
                Permanently delete your PubHub account. This action cannot be undone.
              </p>
              <Button variant="danger" size="sm">Delete My Account</Button>
            </div>
          </Card>
        )}
      </div>
    </AppShell>
  );
};
