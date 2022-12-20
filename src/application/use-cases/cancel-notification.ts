import { Injectable } from '@nestjs/common';
import { Content } from '../entities/Notification/content';
import { Notification } from '../entities/Notification/notification';
import { NotificationsRepository } from '../repositories/notification-repository';
import { NotificationNotFound } from './errors/notification-not-found';

interface CancelNotificationRequest {
  notificationId: string;
}

type CancelNotificationResponse = void;

@Injectable()
export class CancelNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(request: CancelNotificationRequest): Promise<CancelNotificationResponse> {
    const {notificationId } = request;

    const notification = await this.notificationsRepository.findById(notificationId);

    if (notification === null) {
      throw new NotificationNotFound();
    }

    notification.cancel();

    this.notificationsRepository.save(notification);
  }
}
