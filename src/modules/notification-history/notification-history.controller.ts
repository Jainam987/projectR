import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { NotificationHistoryService } from './notification-history.service';
import {
  CreateNotificationHistoryDto,
  UpdateNotificationHistoryDto,
  NotificationHistoryResponse,
  FindAllNotificationHistoryResponse,
  DeleteNotificationHistoryResponse,
} from './dto/notification-history.dto';

@Controller('notification-history')
export class NotificationHistoryController {
  constructor(
    private readonly notificationHistoryService: NotificationHistoryService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createNotificationHistoryDto: CreateNotificationHistoryDto,
  ): Promise<NotificationHistoryResponse> {
    const data = await this.notificationHistoryService.create(
      createNotificationHistoryDto,
    );
    return {
      message: 'Notification history created successfully',
      data,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<FindAllNotificationHistoryResponse> {
    const data = await this.notificationHistoryService.findAll();
    return {
      message: 'Notification histories retrieved successfully',
      data,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string): Promise<NotificationHistoryResponse> {
    const data = await this.notificationHistoryService.findOne(id);
    return {
      message: 'Notification history retrieved successfully',
      data,
    };
  }

  @Get('user-service/:userServiceId')
  @HttpCode(HttpStatus.OK)
  async findByUserService(
    @Param('userServiceId') userServiceId: string,
  ): Promise<FindAllNotificationHistoryResponse> {
    const data =
      await this.notificationHistoryService.findByUserService(userServiceId);
    return {
      message: 'Notification histories retrieved successfully',
      data,
    };
  }

  @Get('notification-method/:notificationMethodId')
  @HttpCode(HttpStatus.OK)
  async findByNotificationMethod(
    @Param('notificationMethodId') notificationMethodId: string,
  ): Promise<FindAllNotificationHistoryResponse> {
    const data =
      await this.notificationHistoryService.findByNotificationMethod(
        notificationMethodId,
      );
    return {
      message: 'Notification histories retrieved successfully',
      data,
    };
  }

  @Get('request-call-error-history/:requestCallErrorHistoryId')
  @HttpCode(HttpStatus.OK)
  async findByRequestCallErrorHistory(
    @Param('requestCallErrorHistoryId') requestCallErrorHistoryId: string,
  ): Promise<FindAllNotificationHistoryResponse> {
    const data =
      await this.notificationHistoryService.findByRequestCallErrorHistory(
        requestCallErrorHistoryId,
      );
    return {
      message: 'Notification histories retrieved successfully',
      data,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateNotificationHistoryDto: UpdateNotificationHistoryDto,
  ): Promise<NotificationHistoryResponse> {
    const data = await this.notificationHistoryService.update(
      id,
      updateNotificationHistoryDto,
    );
    return {
      message: 'Notification history updated successfully',
      data,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(
    @Param('id') id: string,
  ): Promise<DeleteNotificationHistoryResponse> {
    const data = await this.notificationHistoryService.remove(id);
    return {
      message: 'Notification history deleted successfully',
      data,
    };
  }
}
