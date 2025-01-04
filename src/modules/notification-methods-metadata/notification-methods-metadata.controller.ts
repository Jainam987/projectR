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
import { NotificationMethodsMetadataService } from './notification-methods-metadata.service';
import {
  CreateNotificationMethodsMetadatumDto,
  DeleteNotificationMethodsMetadatumResponse,
  FindAllNotificationMethodsMetadatumResponse,
  NotificationMethodsMetadatumResponse,
  UpdateNotificationMethodsMetadatumDto,
} from './dto/notification-methods-metadatum.dto';

@Controller('notification-methods-metadata')
export class NotificationMethodsMetadataController {
  constructor(private readonly notificationMethodsMetadataService: NotificationMethodsMetadataService) {}

  @Post()
  async create(
    @Body() createNotificationMethodsMetadatumDto: CreateNotificationMethodsMetadatumDto,
  ): Promise<NotificationMethodsMetadatumResponse> {
    try {
      const notificationMethodsMetadata = await this.notificationMethodsMetadataService.create(
        createNotificationMethodsMetadatumDto,
      );
      return {
        message: 'Notification method metadata created successfully',
        data: notificationMethodsMetadata,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: error.message || 'Failed to create notification method metadata',
          data: null,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll(): Promise<FindAllNotificationMethodsMetadatumResponse> {
    try {
      const notificationMethodsMetadata = await this.notificationMethodsMetadataService.findAll();
      return {
        message: 'Notification method metadata found successfully',
        data: notificationMethodsMetadata,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: error.message || 'Failed to fetch notification method metadata',
          data: [],
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<NotificationMethodsMetadatumResponse> {
    try {
      const notificationMethodsMetadata = await this.notificationMethodsMetadataService.findOne(id);
      return {
        message: 'Notification method metadata found successfully',
        data: notificationMethodsMetadata,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: error.message || 'Failed to fetch notification method metadata',
          data: null,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateNotificationMethodsMetadatumDto: UpdateNotificationMethodsMetadatumDto,
  ): Promise<NotificationMethodsMetadatumResponse> {
    try {
      const notificationMethodsMetadata = await this.notificationMethodsMetadataService.update(
        id,
        updateNotificationMethodsMetadatumDto,
      );
      return {
        message: 'Notification method metadata updated successfully',
        data: notificationMethodsMetadata,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: error.message || 'Failed to update notification method metadata',
          data: null,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteNotificationMethodsMetadatumResponse> {
    try {
      const notificationMethodsMetadata = await this.notificationMethodsMetadataService.remove(id);
      return {
        message: notificationMethodsMetadata
          ? 'Notification method metadata deleted successfully'
          : 'Notification method metadata deletion failed',
        data: notificationMethodsMetadata,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: error.message || 'Failed to delete notification method metadata',
          data: false,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
