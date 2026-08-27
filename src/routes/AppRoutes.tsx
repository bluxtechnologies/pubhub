import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Skeleton } from '../components/ui/Skeleton';

// Lazy-loaded pages for route-level code splitting
const LandingPage = lazy(() => import('../pages/LandingPage').then((m) => ({ default: m.LandingPage })));
const HomePage = lazy(() => import('../pages/HomePage').then((m) => ({ default: m.HomePage })));
const DiscoverPage = lazy(() => import('../pages/DiscoverPage').then((m) => ({ default: m.DiscoverPage })));
const BookDetailPage = lazy(() => import('../pages/BookDetailPage').then((m) => ({ default: m.BookDetailPage })));
const ReaderPage = lazy(() => import('../pages/ReaderPage').then((m) => ({ default: m.ReaderPage })));
const WriterDashboardPage = lazy(() => import('../pages/WriterDashboardPage').then((m) => ({ default: m.WriterDashboardPage })));
const LibraryPage = lazy(() => import('../pages/LibraryPage').then((m) => ({ default: m.LibraryPage })));
const ProfilePage = lazy(() => import('../pages/ProfilePage').then((m) => ({ default: m.ProfilePage })));
const NotificationsPage = lazy(() => import('../pages/NotificationsPage').then((m) => ({ default: m.NotificationsPage })));
const FollowingPage = lazy(() => import('../pages/FollowingPage').then((m) => ({ default: m.FollowingPage })));
const AuthorPage = lazy(() => import('../pages/AuthorPage').then((m) => ({ default: m.AuthorPage })));
const SettingsPage = lazy(() => import('../pages/SettingsPage').then((m) => ({ default: m.SettingsPage })));

const PageLoader = () => (
  <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
    <div className="w-full max-w-lg space-y-4">
      <Skeleton className="h-12 w-48" />
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-8 w-full" />
    </div>
  </div>
);

export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public landing */}
        <Route path="/" element={<LandingPage />} />

        {/* Authenticated app shell routes */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/books/:bookId" element={<BookDetailPage />} />
        <Route path="/read/:bookId/:chapterId" element={<ReaderPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/following" element={<FollowingPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/authors/:authorId" element={<AuthorPage />} />

        {/* Creator / Writer routes */}
        <Route path="/write" element={<WriterDashboardPage />} />
        <Route path="/write/dashboard" element={<WriterDashboardPage />} />
        <Route path="/write/books" element={<WriterDashboardPage />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};
