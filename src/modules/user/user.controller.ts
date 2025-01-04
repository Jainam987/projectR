import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserDto,
  UpdateUserDto,
  UserResponse,
  FindAllUserResponse,
  DeleteUserResponse,
  ChangePasswordDto,
  VerifyEmailDto,
  VerifyPhoneDto,
} from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponse> {
    try {
      const user = await this.userService.create(createUserDto);
      return {
        message: 'User created successfully',
        data: user,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: error.message || 'Failed to create user',
          data: null,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll(): Promise<FindAllUserResponse> {
    try {
      const users = await this.userService.findAll();
      return {
        message: 'Users found successfully',
        data: users,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: error.message || 'Failed to fetch users',
          data: [],
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserResponse> {
    try {
      const user = await this.userService.findOne(id);
      return {
        message: 'User found successfully',
        data: user,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: error.message || 'Failed to fetch user',
          data: null,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponse> {
    try {
      const user = await this.userService.update(id, updateUserDto);
      return {
        message: 'User updated successfully',
        data: user,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: error.message || 'Failed to update user',
          data: null,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteUserResponse> {
    try {
      const result = await this.userService.remove(id);
      return {
        message: result ? 'User deleted successfully' : 'User deletion failed',
        data: result,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: error.message || 'Failed to delete user',
          data: false,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post(':id/change-password')
  async changePassword(
    @Param('id') id: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<{ message: string; data: boolean }> {
    try {
      const result = await this.userService.changePassword(
        id,
        changePasswordDto,
      );
      return {
        message: result
          ? 'Password changed successfully'
          : 'Password change failed',
        data: result,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: error.message || 'Failed to change password',
          data: false,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post(':id/verify-email')
  async verifyEmail(
    @Param('id') id: string,
    @Body() verifyEmailDto: VerifyEmailDto,
  ): Promise<UserResponse> {
    try {
      const user = await this.userService.verifyEmail(id, verifyEmailDto);
      return {
        message: 'Email verified successfully',
        data: user,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: error.message || 'Failed to verify email',
          data: null,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post(':id/verify-phone')
  async verifyPhone(
    @Param('id') id: string,
    @Body() verifyPhoneDto: VerifyPhoneDto,
  ): Promise<UserResponse> {
    try {
      const user = await this.userService.verifyPhone(id, verifyPhoneDto);
      return {
        message: 'Phone verified successfully',
        data: user,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: error.message || 'Failed to verify phone',
          data: null,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
