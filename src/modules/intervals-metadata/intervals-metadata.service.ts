import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateIntervalsMetadatumDto,
  UpdateIntervalsMetadatumDto,
} from './dto/intervals-metadatum.dto';

const selectObj = {
  id: true,
  name: true,
  interval_time: true,
  description: true,
  is_active: true,
  createdAt: true,
  updatedAt: true,
};

@Injectable()
export class IntervalsMetadataService {
  constructor(private prisma: PrismaService) {}

  async create(createIntervalsMetadatumDto: CreateIntervalsMetadatumDto) {
    try {
      return await this.prisma.intervalsMetadata.create({
        data: {
          name: createIntervalsMetadatumDto?.name,
          interval_time: createIntervalsMetadatumDto?.interval_time,
          description: createIntervalsMetadatumDto?.description,
          is_active: createIntervalsMetadatumDto?.is_active,
          createdBy: createIntervalsMetadatumDto?.createdBy,
        },
        select: selectObj,
      });
    } catch (error) {
      throw new Error(`Failed to create interval metadata: ${error.message}`);
    }
  }

  async findAll() {
    try {
      return await this.prisma.intervalsMetadata.findMany({
        where: {
          is_active: true,
        },
        select: selectObj,
      });
    } catch (error) {
      throw new Error(`Failed to fetch interval metadata: ${error.message}`);
    }
  }

  async findOne(id: string) {
    try {
      const intervalMetadata = await this.prisma.intervalsMetadata.findUnique({
        where: { id },
        select: selectObj,
      });

      if (!intervalMetadata) {
        throw new NotFoundException(`Interval metadata with ID ${id} not found`);
      }

      return intervalMetadata;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to fetch interval metadata: ${error.message}`);
    }
  }

  async update(id: string, updateIntervalsMetadatumDto: UpdateIntervalsMetadatumDto) {
    try {
      const exists = await this.prisma.intervalsMetadata.findUnique({
        where: { id },
      });

      if (!exists) {
        throw new NotFoundException(`Interval metadata with ID ${id} not found`);
      }

      const data = {
        name: updateIntervalsMetadatumDto?.name || undefined,
        interval_time: updateIntervalsMetadatumDto?.interval_time || undefined,
        description: updateIntervalsMetadatumDto?.description || undefined,
        is_active: updateIntervalsMetadatumDto?.is_active || undefined,
        updatedBy: updateIntervalsMetadatumDto?.updatedBy || undefined,
        updatedAt: new Date(),
      };

      return await this.prisma.intervalsMetadata.update({
        where: { id },
        data,
        select: selectObj,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to update interval metadata: ${error.message}`);
    }
  }

  async remove(id: string) {
    try {
      const exists = await this.prisma.intervalsMetadata.findUnique({
        where: { id },
      });

      if (!exists) {
        throw new NotFoundException(`Interval metadata with ID ${id} not found`);
      }

      const intervalsMetadata = await this.prisma.intervalsMetadata.update({
        where: { id },
        data: { is_active: false },
      });

      return intervalsMetadata ? true : false;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to delete interval metadata: ${error.message}`);
    }
  }
}
