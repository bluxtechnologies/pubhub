import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { writerRepository } from '../lib/repositories/WriterRepository';

export function useWriterAnalytics() {
  return useQuery({
    queryKey: ['writer', 'analytics'],
    queryFn: () => writerRepository.getWriterAnalytics(),
  });
}

export function useUserBooks() {
  return useQuery({
    queryKey: ['writer', 'books'],
    queryFn: () => writerRepository.getUserBooks(),
  });
}

export function useCreateBook() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { title: string; tagline: string; description: string; genres: string[] }) =>
      writerRepository.createBook(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['writer', 'books'] });
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  });
}
