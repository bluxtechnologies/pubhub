import { useState, useEffect } from 'react';

export interface ReadingPosition {
  bookId: string;
  chapterId: string;
  chapterNumber: number;
  chapterTitle: string;
  bookTitle: string;
  coverImage: string;
  progressPercentage: number;
  updatedAt: string;
}

const STORAGE_KEY = 'pubhub_reading_progress';

export function useReadingProgress() {
  const [progressMap, setProgressMap] = useState<Record<string, ReadingPosition>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progressMap));
    } catch (err) {
      console.error('Failed to save reading progress:', err);
    }
  }, [progressMap]);

  const saveProgress = (pos: Omit<ReadingPosition, 'updatedAt'>) => {
    const entry: ReadingPosition = {
      ...pos,
      updatedAt: new Date().toISOString(),
    };
    setProgressMap((prev) => ({
      ...prev,
      [pos.bookId]: entry,
    }));
  };

  const getProgress = (bookId: string): ReadingPosition | undefined => {
    return progressMap[bookId];
  };

  const getAllProgress = (): ReadingPosition[] => {
    return Object.values(progressMap).sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  };

  return { progressMap, saveProgress, getProgress, getAllProgress };
}
