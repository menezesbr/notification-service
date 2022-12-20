import { Content } from '@application/entities/Notification/content';
import { Notification, NotificationProps } from '@application/entities/Notification/notification';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    recipientId: 'recipient1',
    content: new Content('This is a notification 2'),
    category: 'social',
    ...override,
  });
}
