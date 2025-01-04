import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateRequestCallErrorHistoryDto,
  UpdateRequestCallErrorHistoryDto,
} from './dto/request-call-error-history.dto';

const selectObj = {
  id: true,
  is_accepted: true,
  is_resolved: true,
  snooze: true,
  previous_snooze_time: true,
  next_snooze_time: true,
  service_id: true,
  request_call_history_id: true,
  notification_method_id: true,
  notification_history_id: true,
  createdAt: true,
  updatedAt: true,
};

@Injectable()
export class RequestCallErrorHistoryService {
  constructor(private prisma: PrismaService) {}

  async create(
    createRequestCallErrorHistoryDto: CreateRequestCallErrorHistoryDto,
  ) {
    try {
      // Check if service exists
      const service = await this.prisma.servicesMetadata.findUnique({
        where: { id: createRequestCallErrorHistoryDto.service_id },
      });

      if (!service) {
        throw new NotFoundException('Service not found');
      }

      // Check if request call history exists
      const requestCallHistory =
        await this.prisma.requestCallHistory.findUnique({
          where: {
            id: createRequestCallErrorHistoryDto.request_call_history_id,
          },
        });

      if (!requestCallHistory) {
        throw new NotFoundException('Request call history not found');
      }

      // Check if all notification methods exist
      for (const methodId of createRequestCallErrorHistoryDto.notification_method_id) {
        const method = await this.prisma.notificationMethodMetadata.findUnique({
          where: { id: methodId },
        });

        if (!method) {
          throw new NotFoundException(
            `Notification method with ID ${methodId} not found`,
          );
        }
      }

      // Check if all notification histories exist
      for (const historyId of createRequestCallErrorHistoryDto.notification_history_id) {
        const history = await this.prisma.notificationHistory.findUnique({
          where: { id: historyId },
        });

        if (!history) {
          throw new NotFoundException(
            `Notification history with ID ${historyId} not found`,
          );
        }
      }

      return await this.prisma.requestCallErrorHistory.create({
        data: {
          is_accepted: createRequestCallErrorHistoryDto.is_accepted,
          is_resolved: createRequestCallErrorHistoryDto.is_resolved,
          snooze: createRequestCallErrorHistoryDto.snooze || [],
          previous_snooze_time:
            createRequestCallErrorHistoryDto.previous_snooze_time,
          next_snooze_time: createRequestCallErrorHistoryDto.next_snooze_time,
          service_id: createRequestCallErrorHistoryDto.service_id,
          request_call_history_id:
            createRequestCallErrorHistoryDto.request_call_history_id,
          notification_method_id:
            createRequestCallErrorHistoryDto.notification_method_id,
          notification_history_id:
            createRequestCallErrorHistoryDto.notification_history_id,
        },
        select: selectObj,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(
        `Failed to create request call error history: ${error.message}`,
      );
    }
  }

  async findAll() {
    try {
      return await this.prisma.requestCallErrorHistory.findMany({
        select: selectObj,
        orderBy: {
          createdAt: 'desc',
        },
      });
    } catch (error) {
      throw new Error(
        `Failed to fetch request call error histories: ${error.message}`,
      );
    }
  }

  async findOne(id: string) {
    try {
      const requestCallErrorHistory =
        await this.prisma.requestCallErrorHistory.findUnique({
          where: { id },
          select: selectObj,
        });

      if (!requestCallErrorHistory) {
        throw new NotFoundException(
          `Request call error history with ID ${id} not found`,
        );
      }

      return requestCallErrorHistory;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(
        `Failed to fetch request call error history: ${error.message}`,
      );
    }
  }

  async findByService(serviceId: string) {
    try {
      return await this.prisma.requestCallErrorHistory.findMany({
        where: {
          service_id: serviceId,
        },
        select: selectObj,
        orderBy: {
          createdAt: 'desc',
        },
      });
    } catch (error) {
      throw new Error(
        `Failed to fetch request call error histories: ${error.message}`,
      );
    }
  }

  async findByRequestCallHistory(requestCallHistoryId: string) {
    try {
      return await this.prisma.requestCallErrorHistory.findMany({
        where: {
          request_call_history_id: requestCallHistoryId,
        },
        select: selectObj,
        orderBy: {
          createdAt: 'desc',
        },
      });
    } catch (error) {
      throw new Error(
        `Failed to fetch request call error histories: ${error.message}`,
      );
    }
  }

  async findByNotificationMethod(notificationMethodId: string) {
    try {
      return await this.prisma.requestCallErrorHistory.findMany({
        where: {
          notification_method_id: {
            has: notificationMethodId,
          },
        },
        select: selectObj,
        orderBy: {
          createdAt: 'desc',
        },
      });
    } catch (error) {
      throw new Error(
        `Failed to fetch request call error histories: ${error.message}`,
      );
    }
  }

  async findByNotificationHistory(notificationHistoryId: string) {
    try {
      return await this.prisma.requestCallErrorHistory.findMany({
        where: {
          notification_history_id: {
            has: notificationHistoryId,
          },
        },
        select: selectObj,
        orderBy: {
          createdAt: 'desc',
        },
      });
    } catch (error) {
      throw new Error(
        `Failed to fetch request call error histories: ${error.message}`,
      );
    }
  }

  async update(
    id: string,
    updateRequestCallErrorHistoryDto: UpdateRequestCallErrorHistoryDto,
  ) {
    try {
      const exists = await this.prisma.requestCallErrorHistory.findUnique({
        where: { id },
      });

      if (!exists) {
        throw new NotFoundException(
          `Request call error history with ID ${id} not found`,
        );
      }

      // If service_id is being updated, check if service exists
      if (updateRequestCallErrorHistoryDto.service_id) {
        const service = await this.prisma.servicesMetadata.findUnique({
          where: { id: updateRequestCallErrorHistoryDto.service_id },
        });

        if (!service) {
          throw new NotFoundException('Service not found');
        }
      }

      // If request_call_history_id is being updated, check if it exists
      if (updateRequestCallErrorHistoryDto.request_call_history_id) {
        const requestCallHistory =
          await this.prisma.requestCallHistory.findUnique({
            where: {
              id: updateRequestCallErrorHistoryDto.request_call_history_id,
            },
          });

        if (!requestCallHistory) {
          throw new NotFoundException('Request call history not found');
        }
      }

      // If notification_method_id is being updated, check if all methods exist
      if (updateRequestCallErrorHistoryDto.notification_method_id) {
        for (const methodId of updateRequestCallErrorHistoryDto.notification_method_id) {
          const method =
            await this.prisma.notificationMethodMetadata.findUnique({
              where: { id: methodId },
            });

          if (!method) {
            throw new NotFoundException(
              `Notification method with ID ${methodId} not found`,
            );
          }
        }
      }

      // If notification_history_id is being updated, check if all histories exist
      if (updateRequestCallErrorHistoryDto.notification_history_id) {
        for (const historyId of updateRequestCallErrorHistoryDto.notification_history_id) {
          const history = await this.prisma.notificationHistory.findUnique({
            where: { id: historyId },
          });

          if (!history) {
            throw new NotFoundException(
              `Notification history with ID ${historyId} not found`,
            );
          }
        }
      }

      return await this.prisma.requestCallErrorHistory.update({
        where: { id },
        data: {
          is_accepted: updateRequestCallErrorHistoryDto.is_accepted,
          is_resolved: updateRequestCallErrorHistoryDto.is_resolved,
          snooze: updateRequestCallErrorHistoryDto.snooze,
          previous_snooze_time:
            updateRequestCallErrorHistoryDto.previous_snooze_time,
          next_snooze_time: updateRequestCallErrorHistoryDto.next_snooze_time,
          service_id: updateRequestCallErrorHistoryDto.service_id,
          request_call_history_id:
            updateRequestCallErrorHistoryDto.request_call_history_id,
          notification_method_id:
            updateRequestCallErrorHistoryDto.notification_method_id,
          notification_history_id:
            updateRequestCallErrorHistoryDto.notification_history_id,
        },
        select: selectObj,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(
        `Failed to update request call error history: ${error.message}`,
      );
    }
  }

  async remove(id: string) {
    try {
      const exists = await this.prisma.requestCallErrorHistory.findUnique({
        where: { id },
      });

      if (!exists) {
        throw new NotFoundException(
          `Request call error history with ID ${id} not found`,
        );
      }

      await this.prisma.requestCallErrorHistory.delete({
        where: { id },
      });

      return true;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(
        `Failed to delete request call error history: ${error.message}`,
      );
    }
  }
}
