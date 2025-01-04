import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateNotificationMethodsMetadatumDto,
  UpdateNotificationMethodsMetadatumDto,
} from './dto/notification-methods-metadatum.dto';

const selectObj = {
  id: true,
  name: true,
  description: true,
  is_active: true,
  createdAt: true,
  updatedAt: true,
};

@Injectable()
export class NotificationMethodsMetadataService {
  constructor(private prisma: PrismaService) {}

  async create(createNotificationMethodsMetadatumDto: CreateNotificationMethodsMetadatumDto) {
    try {
      return await this.prisma.notificationMethodMetadata.create({
        data: {
          name: createNotificationMethodsMetadatumDto?.name,
          description: createNotificationMethodsMetadatumDto?.description,
          is_active: createNotificationMethodsMetadatumDto?.is_active,
          createdBy: createNotificationMethodsMetadatumDto?.createdBy,
        },
        select: selectObj,
      });
    } catch (error) {
      throw new Error(`Failed to create notification method metadata: ${error.message}`);
    }
  }

  async findAll() {
    try {
      return await this.prisma.notificationMethodMetadata.findMany({
        where: {
          is_active: true,
        },
        select: selectObj,
      });
    } catch (error) {
      throw new Error(`Failed to fetch notification method metadata: ${error.message}`);
    }
  }

  async findOne(id: string) {
    try {
      const notificationMethodMetadata = await this.prisma.notificationMethodMetadata.findUnique({
        where: { id },
        select: selectObj,
      });

      if (!notificationMethodMetadata) {
        throw new NotFoundException(`Notification method metadata with ID ${id} not found`);
      }

      return notificationMethodMetadata;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to fetch notification method metadata: ${error.message}`);
    }
  }

  async update(id: string, updateNotificationMethodsMetadatumDto: UpdateNotificationMethodsMetadatumDto) {
    try {
      const exists = await this.prisma.notificationMethodMetadata.findUnique({
        where: { id },
      });

      if (!exists) {
        throw new NotFoundException(`Notification method metadata with ID ${id} not found`);
      }

      const data = {
        name: updateNotificationMethodsMetadatumDto?.name || undefined,
        description: updateNotificationMethodsMetadatumDto?.description || undefined,
        is_active: updateNotificationMethodsMetadatumDto?.is_active || undefined,
        updatedBy: updateNotificationMethodsMetadatumDto?.updatedBy || undefined,
        updatedAt: new Date(),
      };

      return await this.prisma.notificationMethodMetadata.update({
        where: { id },
        data,
        select: selectObj,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to update notification method metadata: ${error.message}`);
    }
  }

  async remove(id: string) {
    try {
      const exists = await this.prisma.notificationMethodMetadata.findUnique({
        where: { id },
      });

      if (!exists) {
        throw new NotFoundException(`Notification method metadata with ID ${id} not found`);
      }

      const notificationMethodMetadata = await this.prisma.notificationMethodMetadata.update({
        where: { id },
        data: { is_active: false },
      });

      return notificationMethodMetadata ? true : false;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to delete notification method metadata: ${error.message}`);
    }
  }
}
