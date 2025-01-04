import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateRolesMetadatumDto,
  UpdateRolesMetadatumDto,
} from './dto/roles-metadatum.dto';

const selectObj = {
  id: true,
  name: true,
  code: true,
  description: true,
  createdAt: true,
  updatedAt: true,
};

@Injectable()
export class RolesMetadataService {
  constructor(private prisma: PrismaService) {}

  async create(createRolesMetadatumDto: CreateRolesMetadatumDto) {
    return this.prisma.rolesMetadata.create({
      data: {
        name: createRolesMetadatumDto?.name,
        code: createRolesMetadatumDto?.code,
        description: createRolesMetadatumDto?.description,
      },
      select: selectObj,
    });
  }

  async findAll() {
    return this.prisma.rolesMetadata.findMany({
      where: {
        is_active: true,
      },
      select: selectObj,
    });
  }

  async findOne(id: string) {
    return this.prisma.rolesMetadata.findUnique({
      where: { id },
      select: selectObj,
    });
  }

  async findByCode(code: string) {
    return this.prisma.rolesMetadata.findUnique({
      where: { code },
      select: selectObj,
    });
  }

  async update(id: string, updateRolesMetadatumDto: UpdateRolesMetadatumDto) {
    const data = {
      name: updateRolesMetadatumDto?.name || undefined,
      code: updateRolesMetadatumDto?.code || undefined,
      description: updateRolesMetadatumDto?.description || undefined,
      is_active: updateRolesMetadatumDto?.is_active || undefined,
      updatedBy: updateRolesMetadatumDto?.updatedBy || undefined,
      updatedAt: new Date(),
    };
    return this.prisma.rolesMetadata.update({
      where: { id },
      data,
      select: selectObj,
    });
  }

  async remove(id: string) {
    const rolesMetadata = this.prisma.rolesMetadata.update({
      where: { id },
      data: { is_active: false },
    });

    return rolesMetadata ? true : false;
  }
}
