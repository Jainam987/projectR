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
import { RequestCallErrorHistoryService } from './request-call-error-history.service';
import {
  CreateRequestCallErrorHistoryDto,
  UpdateRequestCallErrorHistoryDto,
  RequestCallErrorHistoryResponse,
  FindAllRequestCallErrorHistoryResponse,
  DeleteRequestCallErrorHistoryResponse,
} from './dto/request-call-error-history.dto';

@Controller('request-call-error-history')
export class RequestCallErrorHistoryController {
  constructor(
    private readonly requestCallErrorHistoryService: RequestCallErrorHistoryService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createRequestCallErrorHistoryDto: CreateRequestCallErrorHistoryDto,
  ): Promise<RequestCallErrorHistoryResponse> {
    const data = await this.requestCallErrorHistoryService.create(
      createRequestCallErrorHistoryDto,
    );
    return {
      message: 'Request call error history created successfully',
      data,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<FindAllRequestCallErrorHistoryResponse> {
    const data = await this.requestCallErrorHistoryService.findAll();
    return {
      message: 'Request call error histories retrieved successfully',
      data,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id') id: string,
  ): Promise<RequestCallErrorHistoryResponse> {
    const data = await this.requestCallErrorHistoryService.findOne(id);
    return {
      message: 'Request call error history retrieved successfully',
      data,
    };
  }

  @Get('service/:serviceId')
  @HttpCode(HttpStatus.OK)
  async findByService(
    @Param('serviceId') serviceId: string,
  ): Promise<FindAllRequestCallErrorHistoryResponse> {
    const data =
      await this.requestCallErrorHistoryService.findByService(serviceId);
    return {
      message: 'Request call error histories retrieved successfully',
      data,
    };
  }

  @Get('request-call-history/:requestCallHistoryId')
  @HttpCode(HttpStatus.OK)
  async findByRequestCallHistory(
    @Param('requestCallHistoryId') requestCallHistoryId: string,
  ): Promise<FindAllRequestCallErrorHistoryResponse> {
    const data =
      await this.requestCallErrorHistoryService.findByRequestCallHistory(
        requestCallHistoryId,
      );
    return {
      message: 'Request call error histories retrieved successfully',
      data,
    };
  }

  @Get('notification-method/:notificationMethodId')
  @HttpCode(HttpStatus.OK)
  async findByNotificationMethod(
    @Param('notificationMethodId') notificationMethodId: string,
  ): Promise<FindAllRequestCallErrorHistoryResponse> {
    const data =
      await this.requestCallErrorHistoryService.findByNotificationMethod(
        notificationMethodId,
      );
    return {
      message: 'Request call error histories retrieved successfully',
      data,
    };
  }

  @Get('notification-history/:notificationHistoryId')
  @HttpCode(HttpStatus.OK)
  async findByNotificationHistory(
    @Param('notificationHistoryId') notificationHistoryId: string,
  ): Promise<FindAllRequestCallErrorHistoryResponse> {
    const data =
      await this.requestCallErrorHistoryService.findByNotificationHistory(
        notificationHistoryId,
      );
    return {
      message: 'Request call error histories retrieved successfully',
      data,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateRequestCallErrorHistoryDto: UpdateRequestCallErrorHistoryDto,
  ): Promise<RequestCallErrorHistoryResponse> {
    const data = await this.requestCallErrorHistoryService.update(
      id,
      updateRequestCallErrorHistoryDto,
    );
    return {
      message: 'Request call error history updated successfully',
      data,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(
    @Param('id') id: string,
  ): Promise<DeleteRequestCallErrorHistoryResponse> {
    const data = await this.requestCallErrorHistoryService.remove(id);
    return {
      message: 'Request call error history deleted successfully',
      data,
    };
  }
}
