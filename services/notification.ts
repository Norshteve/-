
import { NotificationItem, EventType, NotificationSettings } from '../types';

const NOTIFICATIONS_KEY = 'munasabatkom_notifications';
const SETTINGS_KEY = 'munasabatkom_notif_settings';

const DUMMY_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "1",
    kind: "offer",
    title: "عرض جديد",
    message: "خصم 15% على حفلات الزفاف في عطلة نهاية الأسبوع.",
    createdAt: new Date().toISOString(),
    read: false,
    category: EventType.WEDDING
  },
  {
    id: "2",
    kind: "message",
    title: "رسالة جديدة",
    message: "مرحباً، متى يناسبك موعد جلسة تصوير الخطوبة؟",
    createdAt: new Date(Date.now() - 3600_000).toISOString(),
    read: false,
    category: EventType.ENGAGEMENT
  }
];

const DEFAULT_SETTINGS: NotificationSettings = {
  enabled: true,
  pushEnabled: true,
  emailEnabled: false,
  soundEnabled: true,
  categories: Object.values(EventType),
  quietHours: {
    enabled: false,
    fromHour: 23,
    toHour: 8
  }
};

export const NotificationService = {
  getNotifications: (): NotificationItem[] => {
    try {
      const stored = localStorage.getItem(NOTIFICATIONS_KEY);
      if (!stored) {
        localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(DUMMY_NOTIFICATIONS));
        return DUMMY_NOTIFICATIONS;
      }
      return JSON.parse(stored);
    } catch (e) {
      return DUMMY_NOTIFICATIONS;
    }
  },

  getUnreadCount: (): number => {
    const items = NotificationService.getNotifications();
    return items.filter(n => !n.read).length;
  },

  markAsRead: (id: string) => {
    const items = NotificationService.getNotifications();
    const updated = items.map(n => n.id === id ? { ...n, read: true } : n);
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(updated));
  },

  markAllAsRead: () => {
    const items = NotificationService.getNotifications();
    const updated = items.map(n => ({ ...n, read: true }));
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(updated));
  },

  deleteNotification: (id: string) => {
    const items = NotificationService.getNotifications();
    const updated = items.filter(n => n.id !== id);
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(updated));
  },

  // Add a simple text notification (as requested)
  addSimple: (text: string) => {
    const items = NotificationService.getNotifications();
    const newItem: NotificationItem = {
      id: Date.now().toString(),
      kind: 'general',
      title: 'إشعار جديد',
      message: text,
      createdAt: new Date().toISOString(),
      read: false,
      category: EventType.OTHER
    };
    // Add to beginning
    const updated = [newItem, ...items];
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(updated));
  },

  // Settings
  getSettings: (): NotificationSettings => {
    try {
      const stored = localStorage.getItem(SETTINGS_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_SETTINGS;
    } catch (e) {
      return DEFAULT_SETTINGS;
    }
  },

  saveSettings: (settings: NotificationSettings) => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }
};
