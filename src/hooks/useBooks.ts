import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bookRepository } from '../lib/repositories/BookRepository';

export function useTrendingBooks() {
  return useQuery({
    queryKey: ['books', 'trending'],
    queryFn: () => bookRepository.getTrendingBooks(),
  });
}

export function useRecommendedBooks() {
  return useQuery({
    queryKey: ['books', 'recommended'],
    queryFn: () => bookRepository.getRecommendedBooks(),
  });
}

export function useBookDetails(bookId: string | undefined) {
  return useQuery({
    queryKey: ['books', bookId],
    queryFn: () => (bookId ? bookRepository.getBookById(bookId) : null),
    enabled: !!bookId,
  });
}

export function useBookChapters(bookId: string | undefined) {
  return useQuery({
    queryKey: ['books', bookId, 'chapters'],
    queryFn: () => (bookId ? bookRepository.getChapters(bookId) : []),
    enabled: !!bookId,
  });
}

export function useChapterDetails(bookId: string | undefined, chapterId: string | undefined) {
  return useQuery({
    queryKey: ['books', bookId, 'chapters', chapterId],
    queryFn: () => (bookId && chapterId ? bookRepository.getChapter(bookId, chapterId) : null),
    enabled: !!bookId && !!chapterId,
  });
}

export function useToggleSaveBook() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (bookId: string) => bookRepository.toggleSaveBook(bookId),
    onSuccess: (_, bookId) => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  });
}

export function useSearchBooks(query: string, genre?: string) {
  return useQuery({
    queryKey: ['books', 'search', query, genre],
    queryFn: () => bookRepository.searchBooks(query, genre),
  });
}
