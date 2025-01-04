import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateServicesMetadatumDto,
  UpdateServicesMetadatumDto,
} from './dto/services-metadatum.dto';

const selectObj = {
  id: true,
  name: true,
  description: true,
  is_active: true,
  createdAt: true,
  updatedAt: true,
};

@Injectable()
export class ServicesMetadataService {
  constructor(private prisma: PrismaService) {}

  async create(createServicesMetadatumDto: CreateServicesMetadatumDto) {
    return this.prisma.servicesMetadata.create({
      data: {
        name: createServicesMetadatumDto?.name,
        description: createServicesMetadatumDto?.description,
        is_active: createServicesMetadatumDto?.is_active,
      },
      select: selectObj,
    });
  }

  async findAll() {
    return this.prisma.servicesMetadata.findMany({
      where: {
        is_active: true,
      },
      select: selectObj,
    });
  }

  async findOne(id: string) {
    return this.prisma.servicesMetadata.findUnique({
      where: { id },
      select: selectObj,
    });
  }

  async update(id: string, updateServicesMetadatumDto: UpdateServicesMetadatumDto) {
    const data = {
      name: updateServicesMetadatumDto?.name || undefined,
      description: updateServicesMetadatumDto?.description || undefined,
      is_active: updateServicesMetadatumDto?.is_active || undefined,
      updatedBy: updateServicesMetadatumDto?.updatedBy || undefined,
      updatedAt: new Date(),
    };
    return this.prisma.servicesMetadata.update({
      where: { id },
      data,
      select: selectObj,
    });
  }

  async remove(id: string) {
    const servicesMetadata = this.prisma.servicesMetadata.update({
      where: { id },
      data: { is_active: false },
    });

    return servicesMetadata ? true : false;
  }
}
