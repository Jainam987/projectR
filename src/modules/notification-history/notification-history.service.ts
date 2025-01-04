import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateNotificationHistoryDto,
  UpdateNotificationHistoryDto,
} from './dto/notification-history.dto';

const selectObj = {
  id: true,
  sent_time: true,
  response: true,
  user_service_id: true,
  notification_method_id: true,
  request_call_error_history_id: true,
  createdAt: true,
  updatedAt: true,
};

@Injectable()
export class NotificationHistoryService {
  constructor(private prisma: PrismaService) {}

  async create(createNotificationHistoryDto: CreateNotificationHistoryDto) {
    try {
      // Check if user service exists
      const userService = await this.prisma.userService.findUnique({
        where: { id: createNotificationHistoryDto.user_service_id },
      });

      if (!userService) {
        throw new NotFoundException('User service not found');
      }

      // Check if notification method exists
      const notificationMethod =
        await this.prisma.notificationMethodMetadata.findUnique({
          where: { id: createNotificationHistoryDto.notification_method_id },
        });

      if (!notificationMethod) {
        throw new NotFoundException('Notification method not found');
      }

      // Check if request call error history exists
      const errorHistory = await this.prisma.requestCallErrorHistory.findUnique(
        {
          where: {
            id: createNotificationHistoryDto.request_call_error_history_id,
          },
        },
      );

      if (!errorHistory) {
        throw new NotFoundException('Request call error history not found');
      }

      return await this.prisma.notificationHistory.create({
        data: {
          sent_time: createNotificationHistoryDto.sent_time,
          response: createNotificationHistoryDto.response,
          user_service_id: createNotificationHistoryDto.user_service_id,
          notification_method_id:
            createNotificationHistoryDto.notification_method_id,
          request_call_error_history_id:
            createNotificationHistoryDto.request_call_error_history_id,
        },
        select: selectObj,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(
        `Failed to create notification history: ${error.message}`,
      );
    }
  }

  async findAll() {
    try {
      return await this.prisma.notificationHistory.findMany({
        select: selectObj,
        orderBy: {
          sent_time: 'desc',
        },
      });
    } catch (error) {
      throw new Error(
        `Failed to fetch notification histories: ${error.message}`,
      );
    }
  }

  async findOne(id: string) {
    try {
      const notificationHistory =
        await this.prisma.notificationHistory.findUnique({
          where: { id },
          select: selectObj,
        });

      if (!notificationHistory) {
        throw new NotFoundException(
          `Notification history with ID ${id} not found`,
        );
      }

      return notificationHistory;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to fetch notification history: ${error.message}`);
    }
  }

  async findByUserService(userServiceId: string) {
    try {
      return await this.prisma.notificationHistory.findMany({
        where: {
          user_service_id: userServiceId,
        },
        select: selectObj,
        orderBy: {
          sent_time: 'desc',
        },
      });
    } catch (error) {
      throw new Error(
        `Failed to fetch notification histories: ${error.message}`,
      );
    }
  }

  async findByNotificationMethod(notificationMethodId: string) {
    try {
      return await this.prisma.notificationHistory.findMany({
        where: {
          notification_method_id: notificationMethodId,
        },
        select: selectObj,
        orderBy: {
          sent_time: 'desc',
        },
      });
    } catch (error) {
      throw new Error(
        `Failed to fetch notification histories: ${error.message}`,
      );
    }
  }

  async findByRequestCallErrorHistory(requestCallErrorHistoryId: string) {
    try {
      return await this.prisma.notificationHistory.findMany({
        where: {
          request_call_error_history_id: requestCallErrorHistoryId,
        },
        select: selectObj,
        orderBy: {
          sent_time: 'desc',
        },
      });
    } catch (error) {
      throw new Error(
        `Failed to fetch notification histories: ${error.message}`,
      );
    }
  }

  async update(
    id: string,
    updateNotificationHistoryDto: UpdateNotificationHistoryDto,
  ) {
    try {
      const exists = await this.prisma.notificationHistory.findUnique({
        where: { id },
      });

      if (!exists) {
        throw new NotFoundException(
          `Notification history with ID ${id} not found`,
        );
      }

      // If user_service_id is being updated, check if it exists
      if (updateNotificationHistoryDto.user_service_id) {
        const userService = await this.prisma.userService.findUnique({
          where: { id: updateNotificationHistoryDto.user_service_id },
        });

        if (!userService) {
          throw new NotFoundException('User service not found');
        }
      }

      // If notification_method_id is being updated, check if it exists
      if (updateNotificationHistoryDto.notification_method_id) {
        const notificationMethod =
          await this.prisma.notificationMethodMetadata.findUnique({
            where: { id: updateNotificationHistoryDto.notification_method_id },
          });

        if (!notificationMethod) {
          throw new NotFoundException('Notification method not found');
        }
      }

      // If request_call_error_history_id is being updated, check if it exists
      if (updateNotificationHistoryDto.request_call_error_history_id) {
        const errorHistory =
          await this.prisma.requestCallErrorHistory.findUnique({
            where: {
              id: updateNotificationHistoryDto.request_call_error_history_id,
            },
          });

        if (!errorHistory) {
          throw new NotFoundException('Request call error history not found');
        }
      }

      return await this.prisma.notificationHistory.update({
        where: { id },
        data: {
          sent_time: updateNotificationHistoryDto.sent_time,
          response: updateNotificationHistoryDto.response,
          user_service_id: updateNotificationHistoryDto.user_service_id,
          notification_method_id:
            updateNotificationHistoryDto.notification_method_id,
          request_call_error_history_id:
            updateNotificationHistoryDto.request_call_error_history_id,
        },
        select: selectObj,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(
        `Failed to update notification history: ${error.message}`,
      );
    }
  }

  async remove(id: string) {
    try {
      const exists = await this.prisma.notificationHistory.findUnique({
        where: { id },
      });

      if (!exists) {
        throw new NotFoundException(
          `Notification history with ID ${id} not found`,
        );
      }

      await this.prisma.notificationHistory.delete({
        where: { id },
      });

      return true;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(
        `Failed to delete notification history: ${error.message}`,
      );
    }
  }
}
