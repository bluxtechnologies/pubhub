import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Skeleton } from '../components/ui/Skeleton';
import { ProtectedRoute } from '../features/auth/ProtectedRoute';

// Lazy-loaded pages
const LandingPage = lazy(() => import('../pages/LandingPage').then((m) => ({ default: m.LandingPage })));
const HomePage = lazy(() => import('../pages/HomePage').then((m) => ({ default: m.HomePage })));
const DiscoverPage = lazy(() => import('../pages/DiscoverPage').then((m) => ({ default: m.DiscoverPage })));
const BookDetailPage = lazy(() => import('../pages/BookDetailPage').then((m) => ({ default: m.BookDetailPage })));
const ReaderPage = lazy(() => import('../pages/ReaderPage').then((m) => ({ default: m.ReaderPage })));
const WriterDashboardPage = lazy(() => import('../pages/WriterDashboardPage').then((m) => ({ default: m.WriterDashboardPage })));
const ChapterManagerPage = lazy(() => import('../pages/ChapterManagerPage').then((m) => ({ default: m.ChapterManagerPage })));
const ChapterEditorPage = lazy(() => import('../pages/ChapterEditorPage').then((m) => ({ default: m.ChapterEditorPage })));
const LibraryPage = lazy(() => import('../pages/LibraryPage').then((m) => ({ default: m.LibraryPage })));
const ProfilePage = lazy(() => import('../pages/ProfilePage').then((m) => ({ default: m.ProfilePage })));
const NotificationsPage = lazy(() => import('../pages/NotificationsPage').then((m) => ({ default: m.NotificationsPage })));
const FollowingPage = lazy(() => import('../pages/FollowingPage').then((m) => ({ default: m.FollowingPage })));
const AuthorPage = lazy(() => import('../pages/AuthorPage').then((m) => ({ default: m.AuthorPage })));
const SettingsPage = lazy(() => import('../pages/SettingsPage').then((m) => ({ default: m.SettingsPage })));
const LoginPage = lazy(() => import('../pages/LoginPage').then((m) => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('../pages/RegisterPage').then((m) => ({ default: m.RegisterPage })));
const ForgotPasswordPage = lazy(() => import('../pages/ForgotPasswordPage').then((m) => ({ default: m.ForgotPasswordPage })));

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
        {/* Public landing & authentication */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Reader & Public discovery routes */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/books/:bookId" element={<BookDetailPage />} />
        <Route path="/read/:bookId/:chapterId" element={<ReaderPage />} />
        <Route path="/authors/:authorId" element={<AuthorPage />} />

        {/* Authenticated user routes */}
        <Route path="/library" element={<ProtectedRoute><LibraryPage /></ProtectedRoute>} />
        <Route path="/following" element={<ProtectedRoute><FollowingPage /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />

        {/* Creator / Writer routes */}
        <Route path="/write" element={<ProtectedRoute><WriterDashboardPage /></ProtectedRoute>} />
        <Route path="/write/books" element={<ProtectedRoute><WriterDashboardPage /></ProtectedRoute>} />
        <Route path="/write/books/:bookId/chapters" element={<ProtectedRoute><ChapterManagerPage /></ProtectedRoute>} />
        <Route path="/write/books/:bookId/chapters/new" element={<ProtectedRoute><ChapterEditorPage /></ProtectedRoute>} />
        <Route path="/write/books/:bookId/chapters/:chapterId/edit" element={<ProtectedRoute><ChapterEditorPage /></ProtectedRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};
