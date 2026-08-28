import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeftIcon,
  CheckIcon,
  EyeIcon,
  PaperAirplaneIcon,
  ClockIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Checkbox } from '../components/ui/Checkbox';
import { Radio } from '../components/ui/Radio';
import { useBookDetails, useChapterDetails } from '../hooks/useBooks';
import { useToast } from '../components/ui/ToastProvider';

export const ChapterEditorPage: React.FC = () => {
  const { bookId, chapterId } = useParams<{ bookId: string; chapterId?: string }>();
  const isEditing = !!chapterId && chapterId !== 'new';

  const navigate = useNavigate();
  const toast = useToast();

  const { data: book } = useBookDetails(bookId);
  const { data: existingChapter } = useChapterDetails(bookId, isEditing ? chapterId : undefined);

  // Form State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [chapterNumber, setChapterNumber] = useState(1);
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [isLocked, setIsLocked] = useState(false);

  // Studio UI State
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Load existing chapter content if editing
  useEffect(() => {
    if (existingChapter) {
      setTitle(existingChapter.title);
      setContent(existingChapter.content);
      setChapterNumber(existingChapter.chapterNumber);
    } else {
      setTitle(isEditing ? '' : 'Chapter 1 — The Beginning');
      setContent(
        `Write your story chapter here...\n\nLysandra stepped into the dimly lit corridor, her cloak whispering against the stone floor.`
      );
    }
  }, [existingChapter, isEditing]);

  // Live Metrics
  const words = content.trim() ? content.trim().split(/\s+/).length : 0;
  const readTimeMinutes = Math.max(1, Math.ceil(words / 200));

  // Simulated Auto-Save
  const handleManualSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setLastSavedTime(timeStr);
      toast.success('Draft Saved', `Auto-saved at ${timeStr}`);
    }, 400);
  };

  const handlePublishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('Title Required', 'Please enter a title for your chapter.');
      return;
    }
    toast.success(
      status === 'published' ? 'Chapter Published!' : 'Draft Saved!',
      `"${title}" is now ${status === 'published' ? 'live for your readers' : 'saved as a draft'}.`
    );
    setIsPublishModalOpen(false);
    navigate(`/write/books/${bookId}/chapters`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Studio Bar Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 h-14 px-4 sm:px-8 flex items-center justify-between shadow-subtle">
        <div className="flex items-center gap-3">
          <Link
            to={`/write/books/${bookId}/chapters`}
            className="p-1.5 rounded-full hover:bg-slate-100 transition-colors text-slate-600"
            title="Back to Chapters"
          >
            <ArrowLeftIcon className="w-4 h-4" />
          </Link>
          <span className="text-slate-300">|</span>
          <div className="min-w-0">
            <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase block leading-tight">
              {book?.title || 'Manuscript'}
            </span>
            <h1 className="font-serif font-bold text-slate-900 text-sm truncate max-w-xs sm:max-w-sm">
              {title || 'Untitled Chapter'}
            </h1>
          </div>
        </div>

        {/* Studio Action Buttons */}
        <div className="flex items-center gap-2">
          {lastSavedTime && (
            <span className="hidden md:inline-block text-[11px] text-slate-400 font-medium mr-2">
              Saved at {lastSavedTime}
            </span>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            leftIcon={<EyeIcon className="w-4 h-4" />}
          >
            {isPreviewMode ? 'Edit Mode' : 'Preview Reader'}
          </Button>

          <Button variant="outline" size="sm" onClick={handleManualSave} isLoading={isSaving}>
            Save Draft
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsPublishModalOpen(true)}
            leftIcon={<PaperAirplaneIcon className="w-3.5 h-3.5" />}
          >
            Publish
          </Button>
        </div>
      </header>

      {/* Main Studio Workspace */}
      <main className="flex-1 flex flex-col items-center p-4 sm:p-8 max-w-4xl w-full mx-auto">
        {!isPreviewMode ? (
          /* Writing Editor View */
          <div className="w-full bg-white border border-slate-200/80 rounded-xl p-6 sm:p-10 shadow-subtle flex-1 flex flex-col">
            {/* Title & Chapter Number input */}
            <div className="mb-6 pb-4 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-24">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Chapter #
                </label>
                <input
                  type="number"
                  min="1"
                  value={chapterNumber}
                  onChange={(e) => setChapterNumber(Number(e.target.value))}
                  className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-md text-sm font-bold text-center text-slate-900 focus:outline-none focus:border-brand-900"
                />
              </div>

              <div className="flex-1 w-full">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Chapter Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Chapter 1 — The Sound of Shattered Silence"
                  className="w-full font-serif font-bold text-xl sm:text-2xl text-slate-900 bg-transparent border-b border-transparent hover:border-slate-200 focus:border-brand-900 focus:outline-none py-1 transition-colors"
                />
              </div>
            </div>

            {/* Long-Form Textarea Canvas */}
            <div className="flex-1 flex flex-col">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Begin typing your chapter content..."
                className="w-full flex-1 min-h-[400px] p-2 bg-transparent text-slate-800 font-serif text-base leading-relaxed resize-none focus:outline-none"
              />
            </div>

            {/* Metrics Bar */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-4">
                <span>
                  <strong className="text-slate-700">{words}</strong> words
                </span>
                <span className="flex items-center gap-1">
                  <ClockIcon className="w-3.5 h-3.5" />
                  ~{readTimeMinutes} min read
                </span>
              </div>
              <span className="text-[11px] italic">Markdown & paragraphs supported</span>
            </div>
          </div>
        ) : (
          /* Reader Preview Mode */
          <div className="w-full bg-white border border-slate-200 rounded-xl p-8 sm:p-12 shadow-card">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-900 text-[10px] font-bold uppercase tracking-widest mb-6">
              <SparklesIcon className="w-3 h-3" />
              <span>Reader Preview Mode</span>
            </div>

            <article className="reader-prose-container">
              <header className="mb-8 text-center pb-6 border-b border-slate-100">
                <span className="text-xs font-bold tracking-widest uppercase text-brand-900 block mb-2">
                  Chapter {chapterNumber}
                </span>
                <h2 className="font-serif font-extrabold text-2xl sm:text-3xl text-slate-900">
                  {title || 'Untitled Chapter'}
                </h2>
                <p className="text-xs text-slate-400 mt-2">
                  {words} words · ~{readTimeMinutes} min read
                </p>
              </header>

              <div className="font-serif text-base text-slate-800 leading-relaxed space-y-6">
                {content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="indent-6">
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          </div>
        )}
      </main>

      {/* Publish Chapter Modal */}
      <Modal isOpen={isPublishModalOpen} onClose={() => setIsPublishModalOpen(false)} title="Publish Chapter Settings">
        <form onSubmit={handlePublishSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
              Publication Status
            </label>
            <div className="space-y-2">
              <Radio
                label="Publish Immediately (Visible to readers)"
                checked={status === 'published'}
                onChange={() => setStatus('published')}
                name="status"
              />
              <Radio
                label="Save as Private Draft"
                checked={status === 'draft'}
                onChange={() => setStatus('draft')}
                name="status"
              />
            </div>
          </div>

          <div className="pt-2">
            <Checkbox
              label="Lock Chapter (Monetized / Subscriber Only)"
              description="Require readers to subscribe or unlock this premium chapter."
              checked={isLocked}
              onChange={(e) => setIsLocked(e.target.checked)}
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <Button variant="ghost" size="sm" type="button" onClick={() => setIsPublishModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="md" type="submit" leftIcon={<CheckIcon className="w-4 h-4" />}>
              Confirm & Save
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
