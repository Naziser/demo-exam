import { ref } from 'vue';
import { defineStore } from 'pinia';

import { createUuid } from '@/helpers/createUuid';
import type { Notification } from '@/types/Notification';

export type NotificationOptions = Partial<Omit<Notification, 'id'>>;

export type CreateNotification = (options: NotificationOptions) => void;

const defaultNotificationOptions = {
  type: 'info',
  message: 'A message was not provided',
  autoClose: true,
  duration: 5,
};

export const useNotificationsStore = defineStore('notifications', () => {
  const notifications = ref<Notification[]>([]);

  const createNotification: CreateNotification = (options) => {
    const _options = Object.assign({ ...defaultNotificationOptions }, options);

    notifications.value.push(
      ...[
        {
          id: createUuid(),
          ..._options,
        },
      ]
    );
  };

  const removeNotification = (id: string) => {
    const index = notifications.value.findIndex((item) => item.id === id);
    if (index !== -1) notifications.value.splice(index, 1);
  };

  return {
    notifications,
    createNotification,
    removeNotification,
  };
});
