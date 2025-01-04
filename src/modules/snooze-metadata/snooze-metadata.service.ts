import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateSnoozeMetadatumDto,
  UpdateSnoozeMetadatumDto,
} from './dto/snooze-metadatum.dto';

const selectObj = {
  id: true,
  name: true,
  snooze_time: true,
  description: true,
  is_active: true,
  createdAt: true,
  updatedAt: true,
};

@Injectable()
export class SnoozeMetadataService {
  constructor(private prisma: PrismaService) {}

  async create(createSnoozeMetadatumDto: CreateSnoozeMetadatumDto) {
    try {
      return await this.prisma.snoozeMetadata.create({
        data: {
          name: createSnoozeMetadatumDto?.name,
          snooze_time: createSnoozeMetadatumDto?.snooze_time,
          description: createSnoozeMetadatumDto?.description,
          is_active: createSnoozeMetadatumDto?.is_active,
          createdBy: createSnoozeMetadatumDto?.createdBy,
        },
        select: selectObj,
      });
    } catch (error) {
      throw new Error(`Failed to create snooze metadata: ${error.message}`);
    }
  }

  async findAll() {
    try {
      return await this.prisma.snoozeMetadata.findMany({
        where: {
          is_active: true,
        },
        select: selectObj,
      });
    } catch (error) {
      throw new Error(`Failed to fetch snooze metadata: ${error.message}`);
    }
  }

  async findOne(id: string) {
    try {
      const snoozeMetadata = await this.prisma.snoozeMetadata.findUnique({
        where: { id },
        select: selectObj,
      });

      if (!snoozeMetadata) {
        throw new NotFoundException(`Snooze metadata with ID ${id} not found`);
      }

      return snoozeMetadata;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to fetch snooze metadata: ${error.message}`);
    }
  }

  async update(id: string, updateSnoozeMetadatumDto: UpdateSnoozeMetadatumDto) {
    try {
      const exists = await this.prisma.snoozeMetadata.findUnique({
        where: { id },
      });

      if (!exists) {
        throw new NotFoundException(`Snooze metadata with ID ${id} not found`);
      }

      const data = {
        name: updateSnoozeMetadatumDto?.name || undefined,
        snooze_time: updateSnoozeMetadatumDto?.snooze_time || undefined,
        description: updateSnoozeMetadatumDto?.description || undefined,
        is_active: updateSnoozeMetadatumDto?.is_active || undefined,
        updatedBy: updateSnoozeMetadatumDto?.updatedBy || undefined,
        updatedAt: new Date(),
      };

      return await this.prisma.snoozeMetadata.update({
        where: { id },
        data,
        select: selectObj,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to update snooze metadata: ${error.message}`);
    }
  }

  async remove(id: string) {
    try {
      const exists = await this.prisma.snoozeMetadata.findUnique({
        where: { id },
      });

      if (!exists) {
        throw new NotFoundException(`Snooze metadata with ID ${id} not found`);
      }

      const snoozeMetadata = await this.prisma.snoozeMetadata.update({
        where: { id },
        data: { is_active: false },
      });

      return snoozeMetadata ? true : false;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to delete snooze metadata: ${error.message}`);
    }
  }
}
