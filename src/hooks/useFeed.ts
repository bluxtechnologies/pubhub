import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { feedRepository } from '../lib/repositories/FeedRepository';

export function useFeedActivities() {
  return useQuery({
    queryKey: ['feed', 'activities'],
    queryFn: () => feedRepository.getFeedActivities(),
  });
}

export function useToggleLikeActivity() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (activityId: string) => feedRepository.toggleLikeActivity(activityId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed', 'activities'] });
    },
  });
}

export function useNotifications() {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: () => feedRepository.getNotifications(),
  });
}

export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => feedRepository.markNotificationAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
}
