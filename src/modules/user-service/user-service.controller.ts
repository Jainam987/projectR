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
import { UserServiceService } from './user-service.service';
import {
  CreateUserServiceDto,
  UpdateUserServiceDto,
  UserServiceResponse,
  FindAllUserServiceResponse,
  DeleteUserServiceResponse,
} from './dto/user-service.dto';

@Controller('user-service')
export class UserServiceController {
  constructor(private readonly userServiceService: UserServiceService) {}

  @Post()
  async create(
    @Body() createUserServiceDto: CreateUserServiceDto,
  ): Promise<UserServiceResponse> {
    try {
      const userService = await this.userServiceService.create(createUserServiceDto);
      return {
        message: 'User service created successfully',
        data: userService,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: error.message || 'Failed to create user service',
          data: null,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll(): Promise<FindAllUserServiceResponse> {
    try {
      const userServices = await this.userServiceService.findAll();
      return {
        message: 'User services found successfully',
        data: userServices,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: error.message || 'Failed to fetch user services',
          data: [],
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserServiceResponse> {
    try {
      const userService = await this.userServiceService.findOne(id);
      return {
        message: 'User service found successfully',
        data: userService,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: error.message || 'Failed to fetch user service',
          data: null,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('user/:userId')
  async findByUser(
    @Param('userId') userId: string,
  ): Promise<FindAllUserServiceResponse> {
    try {
      const userServices = await this.userServiceService.findByUser(userId);
      return {
        message: 'User services found successfully',
        data: userServices,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: error.message || 'Failed to fetch user services',
          data: [],
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('service/:serviceId')
  async findByService(
    @Param('serviceId') serviceId: string,
  ): Promise<FindAllUserServiceResponse> {
    try {
      const userServices = await this.userServiceService.findByService(serviceId);
      return {
        message: 'User services found successfully',
        data: userServices,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: error.message || 'Failed to fetch user services',
          data: [],
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserServiceDto: UpdateUserServiceDto,
  ): Promise<UserServiceResponse> {
    try {
      const userService = await this.userServiceService.update(
        id,
        updateUserServiceDto,
      );
      return {
        message: 'User service updated successfully',
        data: userService,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: error.message || 'Failed to update user service',
          data: null,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteUserServiceResponse> {
    try {
      const result = await this.userServiceService.remove(id);
      return {
        message: result ? 'User service deleted successfully' : 'User service deletion failed',
        data: result,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: error.message || 'Failed to delete user service',
          data: false,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
