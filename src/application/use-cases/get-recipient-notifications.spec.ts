import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Get Recipient Notifications', () => {
  it('should be able to get notifications recipient', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotifications = new GetRecipientNotifications(notificationsRepository);

    await notificationsRepository.create(makeNotification({ recipientId: 'recipient1' }));
    await notificationsRepository.create(makeNotification({ recipientId: 'recipient1' }));
    await notificationsRepository.create(makeNotification({ recipientId: 'recipient2' }));

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'recipient1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient1' }),
        expect.objectContaining({ recipientId: 'recipient1' }),
      ]),
    );
  });
});
