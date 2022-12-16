import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { Notification } from '../entities/Notification/notification';
import { SendNotification } from './send-notification';

describe('Send Notification', () => {
  it('should be able to send notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const sendNotification = new SendNotification(notificationsRepository);

    await sendNotification.execute({
      recipientId: 'example-recipient-Id',
      content: 'This is a notification',
      category: 'social',
    });

    expect(notificationsRepository.notifications).toHaveLength(1);
  });
});
