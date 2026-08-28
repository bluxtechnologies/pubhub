import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  PencilSquareIcon,
  PlusIcon,
  BookOpenIcon,
  EyeIcon,
  HeartIcon,
  UserGroupIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import { AppShell } from '../components/layout/AppShell';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Checkbox } from '../components/ui/Checkbox';
import { Skeleton } from '../components/ui/Skeleton';
import { useWriterAnalytics, useUserBooks, useCreateBook } from '../hooks/useWriter';
import { useToast } from '../components/ui/ToastProvider';
import { SparklineChart } from '../components/ui/SparklineChart';
import { formatNumber } from '../lib/utils/cn';

export const WriterDashboardPage: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>(['Fantasy']);

  const toast = useToast();

  const { data: analytics, isLoading: loadingAnalytics } = useWriterAnalytics();
  const { data: userBooks = [], isLoading: loadingBooks } = useUserBooks();
  const createBookMutation = useCreateBook();

  const availableGenres = ['Fantasy', 'Sci-Fi', 'Mystery', 'Romance', 'Thriller', 'Horror', 'Adventure'];

  const handleGenreToggle = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleCreateBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('Title Required', 'Please provide a title for your book.');
      return;
    }

    createBookMutation.mutate(
      { title, tagline, description, genres: selectedGenres },
      {
        onSuccess: (newBook) => {
          toast.success('Book Created!', `"${newBook.title}" is now ready for chapters.`);
          setIsCreateModalOpen(false);
          setTitle('');
          setTagline('');
          setDescription('');
        },
      }
    );
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Creator Workspace Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200/80 rounded-xl p-6 shadow-subtle">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-brand-900 uppercase tracking-widest mb-1">
              <PencilSquareIcon className="w-4 h-4" />
              <span>Publisher Workspace</span>
            </div>
            <h1 className="font-serif font-bold text-slate-900 text-2xl">Writer Studio</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage your serial stories, drafts, and reader analytics in one place.
            </p>
          </div>

          <Button
            variant="primary"
            size="md"
            leftIcon={<PlusIcon className="w-4 h-4" />}
            onClick={() => setIsCreateModalOpen(true)}
          >
            Create New Book
          </Button>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card padded className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-900 flex items-center justify-center shrink-0">
                <EyeIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-500 block font-medium">Total Lifetime Reads</span>
                <span className="text-xl font-serif font-bold text-slate-900">
                  {loadingAnalytics ? <Skeleton className="h-6 w-16" /> : formatNumber(analytics?.totalReads || 0)}
                </span>
              </div>
            </div>
            <SparklineChart data={[320, 410, 390, 520, 480, 610, 580, 720, 695, 810, 780, 920]} color="#190191" label="reads" />
          </Card>

          <Card padded className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <HeartIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-500 block font-medium">Total Reader Likes</span>
                <span className="text-xl font-serif font-bold text-slate-900">
                  {loadingAnalytics ? <Skeleton className="h-6 w-16" /> : formatNumber(analytics?.totalLikes || 0)}
                </span>
              </div>
            </div>
            <SparklineChart data={[80, 120, 95, 140, 115, 180, 160, 200, 190, 230, 215, 260]} color="#e11d48" label="likes" />
          </Card>

          <Card padded className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <UserGroupIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-500 block font-medium">Story Subscribers</span>
                <span className="text-xl font-serif font-bold text-slate-900">
                  {loadingAnalytics ? <Skeleton className="h-6 w-16" /> : formatNumber(analytics?.totalFollowers || 0)}
                </span>
              </div>
            </div>
            <SparklineChart data={[200, 220, 215, 240, 230, 260, 255, 280, 275, 300, 295, 320]} color="#059669" label="subscribers" />
          </Card>

          <Card padded className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <ChartBarIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-500 block font-medium">Estimated Royalty</span>
                <span className="text-xl font-serif font-bold text-slate-900">
                  {loadingAnalytics ? <Skeleton className="h-6 w-16" /> : analytics?.totalEarnings || '$0.00'}
                </span>
              </div>
            </div>
            <SparklineChart data={[0, 12, 8, 24, 18, 34, 28, 42, 38, 55, 48, 64]} color="#d97706" label="earnings" />
          </Card>
        </div>

        {/* Books List Section */}
        <section className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-subtle">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <h2 className="font-serif font-bold text-slate-900 text-lg">My Manuscripts & Series</h2>
            <span className="text-xs text-slate-500">{userBooks.length} titles</span>
          </div>

          {loadingBooks ? (
            <div className="space-y-3">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          ) : (
            <div className="space-y-4">
              {userBooks.map((book) => (
                <div
                  key={book.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-slate-200/70 rounded-lg hover:border-brand-200 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-12 h-16 object-cover rounded shadow-subtle shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={book.status === 'draft' ? 'outline' : 'success'}>
                          {book.status}
                        </Badge>
                        {book.genres.slice(0, 2).map((g) => (
                          <span key={g} className="text-[11px] text-slate-500 font-medium">
                            • {g}
                          </span>
                        ))}
                      </div>
                      <h3 className="font-serif font-bold text-slate-900 text-base">{book.title}</h3>
                      <p className="text-xs text-slate-500">
                        {book.publishedChaptersCount} Published Chapters · {formatNumber(book.readsCount)} Reads
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Link to={`/write/books/${book.id}/chapters`}>
                      <Button variant="outline" size="sm">
                        Manage Chapters
                      </Button>
                    </Link>
                    <Link to={`/write/books/${book.id}/chapters/new`}>
                      <Button variant="primary" size="sm" leftIcon={<PlusIcon className="w-3.5 h-3.5" />}>
                        New Chapter
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Modal Dialog for Book Creation */}
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="Start a New Story Manuscript">
        <form onSubmit={handleCreateBookSubmit} className="space-y-4">
          <Input
            label="Book Title"
            placeholder="e.g. The Obsidian Sentinel"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <Input
            label="Hook / Tagline"
            placeholder="A short one-line teaser to captivate readers..."
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
          />

          <Textarea
            label="Full Synopsis / Description"
            placeholder="Describe the setting, main character dilemma, and primary conflict..."
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
              Select Primary Genres
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {availableGenres.map((g) => (
                <Checkbox
                  key={g}
                  label={g}
                  checked={selectedGenres.includes(g)}
                  onChange={() => handleGenreToggle(g)}
                />
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <Button variant="ghost" size="sm" type="button" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>

            <Button variant="primary" size="md" type="submit" isLoading={createBookMutation.isPending}>
              Create Manuscript
            </Button>
          </div>
        </form>
      </Modal>
    </AppShell>
  );
};
