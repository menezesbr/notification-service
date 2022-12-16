import { Notification } from '../../src/application/entities/Notification/notification';
import { NotificationsRepository } from '../../src/application/repositories/notification-repository';

export class InMemoryNotificationsRepository implements NotificationsRepository {
  public notifications: Notification[] = [];

  async create(notification: Notification) {
    this.notifications.push(notification);
  }
}
