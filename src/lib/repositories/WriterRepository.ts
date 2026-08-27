import { WriterAnalytics, Book, Chapter } from '../../types';
import { MOCK_WRITER_ANALYTICS, MOCK_BOOKS, CURRENT_USER } from '../mock/data';
import { API_CONFIG } from '../api/config';
import { apiClient } from '../api/client';

export interface IWriterRepository {
  getWriterAnalytics(): Promise<WriterAnalytics>;
  getUserBooks(): Promise<Book[]>;
  createBook(data: { title: string; tagline: string; description: string; genres: string[] }): Promise<Book>;
}

export class MockWriterRepository implements IWriterRepository {
  private userBooks: Book[] = MOCK_BOOKS.filter((b) => b.author.id === CURRENT_USER.id);

  async getWriterAnalytics(): Promise<WriterAnalytics> {
    await new Promise((r) => setTimeout(r, 200));
    return MOCK_WRITER_ANALYTICS;
  }

  async getUserBooks(): Promise<Book[]> {
    await new Promise((r) => setTimeout(r, 150));
    return this.userBooks;
  }

  async createBook(data: { title: string; tagline: string; description: string; genres: string[] }): Promise<Book> {
    await new Promise((r) => setTimeout(r, 300));
    const newBook: Book = {
      id: `book_${Date.now()}`,
      title: data.title,
      tagline: data.tagline,
      description: data.description,
      coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600',
      author: CURRENT_USER,
      genres: data.genres,
      rating: 5.0,
      readsCount: 0,
      likesCount: 0,
      commentsCount: 0,
      totalChapters: 0,
      publishedChaptersCount: 0,
      status: 'draft',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    this.userBooks.unshift(newBook);
    MOCK_BOOKS.unshift(newBook);
    return newBook;
  }
}

export class LaravelWriterRepository implements IWriterRepository {
  async getWriterAnalytics(): Promise<WriterAnalytics> {
    return apiClient.get('/writer/analytics');
  }

  async getUserBooks(): Promise<Book[]> {
    return apiClient.get('/writer/books');
  }

  async createBook(data: { title: string; tagline: string; description: string; genres: string[] }): Promise<Book> {
    return apiClient.post('/writer/books', data);
  }
}

export const writerRepository: IWriterRepository = API_CONFIG.useMock
  ? new MockWriterRepository()
  : new LaravelWriterRepository();
