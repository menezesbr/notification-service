import { Injectable } from '@nestjs/common';
import { Notification } from '@application/entities/Notification/notification';
import { NotificationsRepository } from '@application/repositories/notification-repository';
import { PrismaService } from '../prisma.service';
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';
import { Content } from '@application/entities/Notification/content';

@Injectable()
export class PrismaNotificationRepository implements NotificationsRepository {
  constructor(private prismaService: PrismaService) {}

  async findById(notificationId: string): Promise<Notification | null> {
    const raw = await this.prismaService.notification.findFirst({
      where: {
        id: notificationId,
      },
    });

    const notification =
      raw === null
        ? null
        : new Notification({
            content: new Content(raw?.content),
            category: raw?.category,
            recipientId: raw?.recipientId,
          });

    return notification;
  }

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.create({
      data: raw,
    });
  }

  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.update({
      where: {
        id: notification.id,
      },
      data: raw,
    });
  }
}
