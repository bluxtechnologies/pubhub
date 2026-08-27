import { Activity, AppNotification } from '../../types';
import { MOCK_FEED_ACTIVITIES, MOCK_NOTIFICATIONS } from '../mock/data';
import { API_CONFIG } from '../api/config';
import { apiClient } from '../api/client';

export interface IFeedRepository {
  getFeedActivities(): Promise<Activity[]>;
  toggleLikeActivity(activityId: string): Promise<boolean>;
  getNotifications(): Promise<AppNotification[]>;
  markNotificationAsRead(id: string): Promise<void>;
}

export class MockFeedRepository implements IFeedRepository {
  private activities: Activity[] = [...MOCK_FEED_ACTIVITIES];
  private notifications: AppNotification[] = [...MOCK_NOTIFICATIONS];

  async getFeedActivities(): Promise<Activity[]> {
    await new Promise((r) => setTimeout(r, 200));
    return this.activities;
  }

  async toggleLikeActivity(activityId: string): Promise<boolean> {
    await new Promise((r) => setTimeout(r, 100));
    const act = this.activities.find((a) => a.id === activityId);
    if (act) {
      act.userLiked = !act.userLiked;
      act.likesCount += act.userLiked ? 1 : -1;
      return act.userLiked;
    }
    return false;
  }

  async getNotifications(): Promise<AppNotification[]> {
    await new Promise((r) => setTimeout(r, 150));
    return this.notifications;
  }

  async markNotificationAsRead(id: string): Promise<void> {
    await new Promise((r) => setTimeout(r, 100));
    const notif = this.notifications.find((n) => n.id === id);
    if (notif) notif.read = true;
  }
}

export class LaravelFeedRepository implements IFeedRepository {
  async getFeedActivities(): Promise<Activity[]> {
    return apiClient.get('/feed');
  }

  async toggleLikeActivity(activityId: string): Promise<boolean> {
    const res: { userLiked: boolean } = await apiClient.post(`/feed/${activityId}/like`);
    return res.userLiked;
  }

  async getNotifications(): Promise<AppNotification[]> {
    return apiClient.get('/notifications');
  }

  async markNotificationAsRead(id: string): Promise<void> {
    await apiClient.patch(`/notifications/${id}/read`);
  }
}

export const feedRepository: IFeedRepository = API_CONFIG.useMock
  ? new MockFeedRepository()
  : new LaravelFeedRepository();
