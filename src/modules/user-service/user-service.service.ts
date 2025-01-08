import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateUserServiceDto,
  UpdateUserServiceDto,
} from './dto/user-service.dto';

const selectObj = {
  id: true,
  service_id: true,
  user_id: true,
  interval_id: true,
  notification_method_id: true,
  snooze: true,
  is_active: true,
  is_error: true,
  is_resolved: true,
  is_in_maintenance: true,
  createdAt: true,
  updatedAt: true,
  name: true,
  URL: true,
  keywords: true,
  retries: true,
  request_timeout: true,
  req_method: true,
  req_headers: true,
  req_body_encoding: true,
  req_body: true,
  authentication: true,
  response_body: true,
  accepted_status_code: true,
  queue_job_id: true,
  queue_repeat_job_key: true,
  service_code: true,
  interval_time: true,
  retries_interval_id: true,
  retries_interval_time: true,
  previous_snooze_time: true,
  next_snooze_time: true,
  is_single_time_alert: true,
};

@Injectable()
export class UserServiceService {
  constructor(private prisma: PrismaService) {}

  async create(createUserServiceDto: CreateUserServiceDto) {
    try {
      // Check if service exists
      const service = await this.prisma.servicesMetadata.findUnique({
        where: { id: createUserServiceDto.service_id },
      });

      if (!service) {
        throw new NotFoundException('Service not found');
      }

      // Check if user exists
      const user = await this.prisma.user.findUnique({
        where: { id: createUserServiceDto.user_id },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      // Check if interval exists
      const interval = await this.prisma.intervalsMetadata.findUnique({
        where: { id: createUserServiceDto.interval_id },
      });

      if (!interval) {
        throw new NotFoundException('Interval not found');
      }

      // Check if all notification methods exist
      for (const methodId of createUserServiceDto.notification_method_id) {
        const method = await this.prisma.notificationMethodMetadata.findUnique({
          where: { id: methodId },
        });

        if (!method) {
          throw new NotFoundException(
            `Notification method with ID ${methodId} not found`,
          );
        }
      }

      // Check if user-service combination already exists
      const existingUserService = await this.prisma.userService.findFirst({
        where: {
          service_id: createUserServiceDto.service_id,
          user_id: createUserServiceDto.user_id,
          is_active: true,
        },
      });

      if (existingUserService) {
        throw new ConflictException('User service combination already exists');
      }

      return await this.prisma.userService.create({
        data: {
          service_id: createUserServiceDto.service_id,
          user_id: createUserServiceDto.user_id,
          interval_id: createUserServiceDto.interval_id,
          notification_method_id: createUserServiceDto.notification_method_id,
          snooze: createUserServiceDto.snooze || [],
          is_active: createUserServiceDto.is_active,
          is_error: createUserServiceDto.is_error,
          is_resolved: createUserServiceDto.is_resolved,
          is_in_maintenance: createUserServiceDto.is_in_maintenance,
          createdBy: createUserServiceDto.createdBy,
        },
        select: selectObj,
      });
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ConflictException
      ) {
        throw error;
      }
      throw new Error(`Failed to create user service: ${error.message}`);
    }
  }

  async findAll() {
    try {
      return await this.prisma.userService.findMany({
        where: {
          is_active: true,
        },
        select: selectObj,
      });
    } catch (error) {
      throw new Error(`Failed to fetch user services: ${error.message}`);
    }
  }

  async findOne(id: string) {
    try {
      const userService = await this.prisma.userService.findUnique({
        where: { id },
        select: selectObj,
      });

      if (!userService) {
        throw new NotFoundException(`User service with ID ${id} not found`);
      }

      return userService;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to fetch user service: ${error.message}`);
    }
  }

  async findByUser(userId: string) {
    try {
      return await this.prisma.userService.findMany({
        where: {
          user_id: userId,
          is_active: true,
        },
        select: selectObj,
      });
    } catch (error) {
      throw new Error(`Failed to fetch user services: ${error.message}`);
    }
  }

  async findByService(serviceId: string) {
    try {
      return await this.prisma.userService.findMany({
        where: {
          service_id: serviceId,
          is_active: true,
        },
        select: selectObj,
      });
    } catch (error) {
      throw new Error(`Failed to fetch user services: ${error.message}`);
    }
  }

  async update(id: string, updateUserServiceDto: UpdateUserServiceDto) {
    try {
      const exists = await this.prisma.userService.findUnique({
        where: { id },
      });

      if (!exists) {
        throw new NotFoundException(`User service with ID ${id} not found`);
      }

      // If service_id is being updated, check if service exists
      if (updateUserServiceDto.service_id) {
        const service = await this.prisma.servicesMetadata.findUnique({
          where: { id: updateUserServiceDto.service_id },
        });

        if (!service) {
          throw new NotFoundException('Service not found');
        }
      }

      // If user_id is being updated, check if user exists
      if (updateUserServiceDto.user_id) {
        const user = await this.prisma.user.findUnique({
          where: { id: updateUserServiceDto.user_id },
        });

        if (!user) {
          throw new NotFoundException('User not found');
        }
      }

      // If interval_id is being updated, check if interval exists
      if (updateUserServiceDto.interval_id) {
        const interval = await this.prisma.intervalsMetadata.findUnique({
          where: { id: updateUserServiceDto.interval_id },
        });

        if (!interval) {
          throw new NotFoundException('Interval not found');
        }
      }

      // If notification_method_id is being updated, check if all methods exist
      if (updateUserServiceDto.notification_method_id) {
        for (const methodId of updateUserServiceDto.notification_method_id) {
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

      return await this.prisma.userService.update({
        where: { id },
        data: {
          service_id: updateUserServiceDto.service_id,
          user_id: updateUserServiceDto.user_id,
          interval_id: updateUserServiceDto.interval_id,
          notification_method_id: updateUserServiceDto.notification_method_id,
          snooze: updateUserServiceDto.snooze,
          is_active: updateUserServiceDto.is_active,
          is_error: updateUserServiceDto.is_error,
          is_resolved: updateUserServiceDto.is_resolved,
          is_in_maintenance: updateUserServiceDto.is_in_maintenance,
          updatedBy: updateUserServiceDto.updatedBy,
          updatedAt: new Date(),
        },
        select: selectObj,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to update user service: ${error.message}`);
    }
  }

  async remove(id: string) {
    try {
      const exists = await this.prisma.userService.findUnique({
        where: { id },
      });

      if (!exists) {
        throw new NotFoundException(`User service with ID ${id} not found`);
      }

      const userService = await this.prisma.userService.update({
        where: { id },
        data: { is_active: false },
      });

      return userService ? true : false;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to delete user service: ${error.message}`);
    }
  }
}
