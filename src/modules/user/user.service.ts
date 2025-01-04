import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateUserDto,
  UpdateUserDto,
  ChangePasswordDto,
  VerifyEmailDto,
  VerifyPhoneDto,
} from './dto/user.dto';
import * as argon2 from 'argon2';

const selectObj = {
  id: true,
  name: true,
  email: true,
  phone: true,
  is_active: true,
  is_phone_verified: true,
  is_email_verified: true,
  role_id: true,
  role_code: true,
  company_id: true,
  createdAt: true,
  updatedAt: true,
};

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      // Check if user with email already exists
      const existingUserByEmail = await this.prisma.user.findUnique({
        where: { email: createUserDto.email },
      });

      if (existingUserByEmail) {
        throw new ConflictException('User with this email already exists');
      }

      // Check if user with phone already exists
      const existingUserByPhone = await this.prisma.user.findUnique({
        where: { phone: createUserDto.phone },
      });

      if (existingUserByPhone) {
        throw new ConflictException('User with this phone number already exists');
      }

      // Hash the password
      const hashedPassword = await argon2.hash(createUserDto.password);

      // Create user
      const user = await this.prisma.user.create({
        data: {
          name: createUserDto.name,
          email: createUserDto.email,
          phone: createUserDto.phone,
          is_active: createUserDto.is_active,
          is_phone_verified: createUserDto.is_phone_verified,
          is_email_verified: createUserDto.is_email_verified,
          role_id: createUserDto.role_id,
          role_code: createUserDto.role_code,
          company_id: createUserDto.company_id,
          createdBy: createUserDto.createdBy,
        },
        select: selectObj,
      });

      // Create password entry
      await this.prisma.password.create({
        data: {
          password: hashedPassword,
          user_id: user.id,
        },
      });

      // Create password history entry
      await this.prisma.passwordHistory.create({
        data: {
          password: hashedPassword,
          user_id: user.id,
        },
      });

      return user;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  async findAll() {
    try {
      return await this.prisma.user.findMany({
        where: {
          is_active: true,
        },
        select: selectObj,
      });
    } catch (error) {
      throw new Error(`Failed to fetch users: ${error.message}`);
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        select: selectObj,
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to fetch user: ${error.message}`);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const exists = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!exists) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      // Check email uniqueness if email is being updated
      if (updateUserDto.email) {
        const existingUserByEmail = await this.prisma.user.findFirst({
          where: {
            email: updateUserDto.email,
            id: { not: id },
          },
        });

        if (existingUserByEmail) {
          throw new ConflictException('Email already in use');
        }
      }

      // Check phone uniqueness if phone is being updated
      if (updateUserDto.phone) {
        const existingUserByPhone = await this.prisma.user.findFirst({
          where: {
            phone: updateUserDto.phone,
            id: { not: id },
          },
        });

        if (existingUserByPhone) {
          throw new ConflictException('Phone number already in use');
        }
      }

      return await this.prisma.user.update({
        where: { id },
        data: {
          name: updateUserDto.name,
          email: updateUserDto.email,
          phone: updateUserDto.phone,
          is_active: updateUserDto.is_active,
          is_phone_verified: updateUserDto.is_phone_verified,
          is_email_verified: updateUserDto.is_email_verified,
          role_id: updateUserDto.role_id,
          role_code: updateUserDto.role_code,
          company_id: updateUserDto.company_id,
          updatedBy: updateUserDto.updatedBy,
          updatedAt: new Date(),
        },
        select: selectObj,
      });
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ConflictException) {
        throw error;
      }
      throw new Error(`Failed to update user: ${error.message}`);
    }
  }

  async remove(id: string) {
    try {
      const exists = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!exists) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      const user = await this.prisma.user.update({
        where: { id },
        data: { is_active: false },
      });

      return user ? true : false;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to delete user: ${error.message}`);
    }
  }

  async changePassword(id: string, changePasswordDto: ChangePasswordDto) {
    try {
      const passwordRecord = await this.prisma.password.findUnique({
        where: { user_id: id },
      });

      if (!passwordRecord) {
        throw new NotFoundException('Password record not found');
      }

      const isPasswordValid = await argon2.verify(
        passwordRecord.password,
        changePasswordDto.currentPassword,
      );

      if (!isPasswordValid) {
        throw new BadRequestException('Current password is incorrect');
      }

      // Hash the new password
      const hashedPassword = await argon2.hash(changePasswordDto.newPassword);

      // Update password
      await this.prisma.password.update({
        where: { user_id: id },
        data: { password: hashedPassword },
      });

      // Add to password history
      await this.prisma.passwordHistory.create({
        data: {
          password: hashedPassword,
          user_id: id,
          version: (await this.prisma.passwordHistory.count({ where: { user_id: id } })) + 1,
        },
      });

      return true;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new Error(`Failed to change password: ${error.message}`);
    }
  }

  async verifyEmail(id: string, verifyEmailDto: VerifyEmailDto) {
    try {
      // Here you would implement your email verification logic
      // This is just a placeholder implementation
      const user = await this.prisma.user.update({
        where: { id },
        data: { is_email_verified: true },
        select: selectObj,
      });

      return user;
    } catch (error) {
      throw new Error(`Failed to verify email: ${error.message}`);
    }
  }

  async verifyPhone(id: string, verifyPhoneDto: VerifyPhoneDto) {
    try {
      // Here you would implement your phone verification logic
      // This is just a placeholder implementation
      const user = await this.prisma.user.update({
        where: { id },
        data: { is_phone_verified: true },
        select: selectObj,
      });

      return user;
    } catch (error) {
      throw new Error(`Failed to verify phone: ${error.message}`);
    }
  }
}
