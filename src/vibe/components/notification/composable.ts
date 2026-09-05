import { ref } from 'vue';

export type NotificationSeverity = 'info' | 'success' | 'warn' | 'error';

export interface NotificationMessage {
  id: string;
  severity: NotificationSeverity;
  title: string;
  detail?: string;
  life: number;
}

const notifications = ref<NotificationMessage[]>([]);

function addNotification(message: Omit<NotificationMessage, 'id'>): void {
  const id = Math.random().toString(36).substring(2, 9);
  notifications.value.push({ ...message, id });
}

function removeNotification(id: string): void {
  notifications.value = notifications.value.filter(n => n.id !== id);
}

export { notifications, addNotification, removeNotification };
