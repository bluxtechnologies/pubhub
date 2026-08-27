import { Book, Chapter } from '../../types';
import { MOCK_BOOKS, MOCK_CHAPTERS } from '../mock/data';
import { API_CONFIG } from '../api/config';
import { apiClient } from '../api/client';

export interface IBookRepository {
  getTrendingBooks(): Promise<Book[]>;
  getRecommendedBooks(): Promise<Book[]>;
  getBookById(id: string): Promise<Book | null>;
  getChapters(bookId: string): Promise<Chapter[]>;
  getChapter(bookId: string, chapterId: string): Promise<Chapter | null>;
  toggleSaveBook(bookId: string): Promise<boolean>;
  searchBooks(query: string, genre?: string): Promise<Book[]>;
}

export class MockBookRepository implements IBookRepository {
  private books: Book[] = [...MOCK_BOOKS];

  async getTrendingBooks(): Promise<Book[]> {
    await new Promise((r) => setTimeout(r, 200));
    return this.books.sort((a, b) => b.readsCount - a.readsCount);
  }

  async getRecommendedBooks(): Promise<Book[]> {
    await new Promise((r) => setTimeout(r, 200));
    return this.books.filter((b) => b.rating >= 4.7);
  }

  async getBookById(id: string): Promise<Book | null> {
    await new Promise((r) => setTimeout(r, 150));
    const book = this.books.find((b) => b.id === id);
    return book || null;
  }

  async getChapters(bookId: string): Promise<Chapter[]> {
    await new Promise((r) => setTimeout(r, 150));
    return MOCK_CHAPTERS[bookId] || [];
  }

  async getChapter(bookId: string, chapterId: string): Promise<Chapter | null> {
    await new Promise((r) => setTimeout(r, 150));
    const list = MOCK_CHAPTERS[bookId] || [];
    return list.find((c) => c.id === chapterId) || null;
  }

  async toggleSaveBook(bookId: string): Promise<boolean> {
    await new Promise((r) => setTimeout(r, 150));
    const book = this.books.find((b) => b.id === bookId);
    if (book) {
      book.isSaved = !book.isSaved;
      return book.isSaved;
    }
    return false;
  }

  async searchBooks(query: string, genre?: string): Promise<Book[]> {
    await new Promise((r) => setTimeout(r, 200));
    let results = this.books;
    if (query.trim()) {
      const q = query.toLowerCase();
      results = results.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.name.toLowerCase().includes(q) ||
          b.description.toLowerCase().includes(q)
      );
    }
    if (genre && genre !== 'All') {
      results = results.filter((b) => b.genres.includes(genre));
    }
    return results;
  }
}

export class LaravelBookRepository implements IBookRepository {
  async getTrendingBooks(): Promise<Book[]> {
    return apiClient.get('/books/trending');
  }

  async getRecommendedBooks(): Promise<Book[]> {
    return apiClient.get('/books/recommended');
  }

  async getBookById(id: string): Promise<Book | null> {
    return apiClient.get(`/books/${id}`);
  }

  async getChapters(bookId: string): Promise<Chapter[]> {
    return apiClient.get(`/books/${bookId}/chapters`);
  }

  async getChapter(bookId: string, chapterId: string): Promise<Chapter | null> {
    return apiClient.get(`/books/${bookId}/chapters/${chapterId}`);
  }

  async toggleSaveBook(bookId: string): Promise<boolean> {
    const res: { isSaved: boolean } = await apiClient.post(`/books/${bookId}/save`);
    return res.isSaved;
  }

  async searchBooks(query: string, genre?: string): Promise<Book[]> {
    return apiClient.get('/books/search', { params: { query, genre } });
  }
}

// Singleton provider selecting Mock vs Laravel based on configuration
export const bookRepository: IBookRepository = API_CONFIG.useMock
  ? new MockBookRepository()
  : new LaravelBookRepository();
