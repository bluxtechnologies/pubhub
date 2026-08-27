export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio?: string;
  followerCount: number;
  followingCount: number;
  isFollowing?: boolean;
  isVerified?: boolean;
  joinedDate?: string;
}

export interface Author extends User {
  totalBooks: number;
  totalReads: number;
  featuredGenres: string[];
}

export interface Chapter {
  id: string;
  bookId: string;
  chapterNumber: number;
  title: string;
  content: string; // HTML or Markdown string for reading
  wordCount: number;
  publishedAt: string;
  likesCount: number;
  commentsCount: number;
  isLocked?: boolean;
}

export interface Book {
  id: string;
  title: string;
  tagline: string;
  description: string;
  coverImage: string;
  author: User;
  genres: string[];
  rating: number;
  readsCount: number;
  likesCount: number;
  commentsCount: number;
  totalChapters: number;
  publishedChaptersCount: number;
  status: 'draft' | 'ongoing' | 'completed';
  createdAt: string;
  updatedAt: string;
  isSaved?: boolean;
  userProgress?: {
    currentChapterId: string;
    currentChapterNumber: number;
    percentage: number;
    lastReadAt: string;
  };
}

export interface CommentReply {
  id: string;
  author: User;
  content: string;
  createdAt: string;
  likesCount: number;
  userLiked?: boolean;
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  createdAt: string;
  likesCount: number;
  userLiked?: boolean;
  replies?: CommentReply[];
}

export interface Activity {
  id: string;
  user: User;
  type: 'publish_chapter' | 'publish_book' | 'start_reading' | 'finish_book' | 'comment' | 'reaction';
  book?: Book;
  chapter?: {
    id: string;
    chapterNumber: number;
    title: string;
  };
  commentText?: string;
  timestamp: string;
  likesCount: number;
  commentsCount: number;
  userLiked?: boolean;
}

export interface AppNotification {
  id: string;
  type: 'follow' | 'like' | 'comment' | 'reply' | 'new_chapter' | 'publish';
  sender: User;
  targetBook?: {
    id: string;
    title: string;
    coverImage: string;
  };
  targetChapter?: {
    id: string;
    chapterNumber: number;
    title: string;
  };
  text: string;
  createdAt: string;
  read: boolean;
}

export interface WriterAnalytics {
  totalReads: number;
  totalLikes: number;
  totalFollowers: number;
  totalEarnings?: string;
  monthlyReads: { month: string; reads: number }[];
  topBooks: { id: string; title: string; readsCount: number; likesCount: number }[];
}
