import { Content } from '@application/entities/Notification/content';
import { Notification } from '@application/entities/Notification/notification';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { CountRecipientNotifications } from './count-recipient-notifications';
import { NotificationNotFound } from './errors/notification-not-found';
import { SendNotification } from './send-notification';

describe('Count Recipient Notifications', () => {
  it('should be able to count notifications from recipient', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(notificationsRepository);

    await notificationsRepository.create(
      new Notification({
        recipientId: 'recipient1',
        content: new Content('This is a notification 1'),
        category: 'social',
      }),
    );

    await notificationsRepository.create(
      new Notification({
        recipientId: 'recipient1',
        content: new Content('This is a notification 2'),
        category: 'social',
      }),
    );

    await notificationsRepository.create(
      new Notification({
        recipientId: 'recipient2',
        content: new Content('This is a notification 3'),
        category: 'social',
      }),
    );

    const { count } = await countRecipientNotifications.execute({ recipientId: 'recipient1' });

    expect(count).toEqual(2);
  });
});
