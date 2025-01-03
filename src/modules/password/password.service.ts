import { Injectable } from '@nestjs/common';
import {
  CreatePasswordDto,
  PasswordFindOneParam,
  PasswordUpdateParam,
  FindPasswordResponse,
} from './dto/password.dto';
// import { UpdatePasswordDto } from './dto/update-password.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Password } from '@prisma/client';

@Injectable()
export class PasswordService {
  constructor(private prisma: PrismaService) {}

  async create(createPasswordDto: CreatePasswordDto) {
    const password: Password = await this.prisma.password.create({
      data: {
        user_id: createPasswordDto.user_id,
        password: createPasswordDto.password,
      },
    });
    return password ? true : false;
  }

  async findAll() {
    const passwords: FindPasswordResponse[] =
      await this.prisma.password.findMany({
        select: {
          id: true,
          password: true,
          is_active: true,
          user_id: true,
        },
      });
    return passwords;
  }

  async findOne({ id, byUserId }: PasswordFindOneParam) {
    const where = byUserId
      ? {
          user_id: id,
        }
      : {
          id: id,
        };

    const password: FindPasswordResponse =
      await this.prisma.password.findUnique({
        where,
        select: {
          id: true,
          password: true,
          is_active: true,
          user_id: true,
        },
      });
    return password;
  }

  async update({ id, updatePasswordDto, byUserId }: PasswordUpdateParam) {
    const data = {
      user_id: updatePasswordDto?.user_id || undefined,
      password: updatePasswordDto?.password || undefined,
    };

    const where = byUserId
      ? {
          user_id: id,
        }
      : {
          id: id,
        };

    const password: Password = await this.prisma.password.update({
      where,
      data,
    });
    return password ? true : false;
  }

  async remove({ id, byUserId }: PasswordFindOneParam) {
    const where = byUserId
      ? {
          user_id: id,
        }
      : {
          id: id,
        };

    const password = await this.prisma.password.update({
      where: where,
      data: {
        is_active: false,
      },
    });
    return password ? true : false;
  }
}
