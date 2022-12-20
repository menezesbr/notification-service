import { Content } from '@application/entities/Notification/content';
import { Notification } from '@application/entities/Notification/notification';
import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { CountRecipientNotifications } from './count-recipient-notifications';
import { NotificationNotFound } from './errors/notification-not-found';
import { SendNotification } from './send-notification';

describe('Count Recipient Notifications', () => {
  it('should be able to count notifications from recipient', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(notificationsRepository);

    await notificationsRepository.create(makeNotification({ recipientId: 'recipient1' }));
    await notificationsRepository.create(makeNotification({ recipientId: 'recipient1' }));
    await notificationsRepository.create(makeNotification({ recipientId: 'recipient2' }));

    const { count } = await countRecipientNotifications.execute({ recipientId: 'recipient1' });

    expect(count).toEqual(2);
  });
});
