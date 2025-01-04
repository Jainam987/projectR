import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto, UpdateCompanyDto } from './dto/company.dto';

const selectObj = {
  id: true,
  name: true,
  description: true,
  is_active: true,
  createdAt: true,
  updatedAt: true,
};

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async create(createCompanyDto: CreateCompanyDto) {
    return this.prisma.company.create({
      data: {
        name: createCompanyDto?.name,
        description: createCompanyDto?.description,
        is_active: createCompanyDto?.is_active,
        createdBy: createCompanyDto?.createdBy,
        updatedBy: createCompanyDto?.updatedBy,
      },
      select: selectObj,
    });
  }

  async findAll() {
    return this.prisma.company.findMany({
      where: {
        is_active: true,
      },
      select: selectObj,
    });
  }

  async findOne(id: string) {
    return this.prisma.company.findUnique({
      where: { id },
      select: selectObj,
    });
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    return this.prisma.company.update({
      where: { id },
      data: {
        name: updateCompanyDto?.name,
        description: updateCompanyDto?.description,
        is_active: updateCompanyDto?.is_active,
        updatedBy: updateCompanyDto?.updatedBy,
      },
      select: selectObj,
    });
  }

  async remove(id: string) {
    await this.prisma.company.update({
      where: { id },
      data: { is_active: false },
    });
    return true;
  }
}
