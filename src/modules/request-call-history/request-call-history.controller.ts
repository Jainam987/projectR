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
import { RequestCallHistoryService } from './request-call-history.service';
import {
  CreateRequestCallHistoryDto,
  UpdateRequestCallHistoryDto,
  RequestCallHistoryResponse,
  FindAllRequestCallHistoryResponse,
  DeleteRequestCallHistoryResponse,
} from './dto/request-call-history.dto';

@Controller('request-call-history')
export class RequestCallHistoryController {
  constructor(private readonly requestCallHistoryService: RequestCallHistoryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createRequestCallHistoryDto: CreateRequestCallHistoryDto,
  ): Promise<RequestCallHistoryResponse> {
    const data = await this.requestCallHistoryService.create(createRequestCallHistoryDto);
    return {
      message: 'Request call history created successfully',
      data,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<FindAllRequestCallHistoryResponse> {
    const data = await this.requestCallHistoryService.findAll();
    return {
      message: 'Request call histories retrieved successfully',
      data,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string): Promise<RequestCallHistoryResponse> {
    const data = await this.requestCallHistoryService.findOne(id);
    return {
      message: 'Request call history retrieved successfully',
      data,
    };
  }

  @Get('service/:serviceId')
  @HttpCode(HttpStatus.OK)
  async findByService(
    @Param('serviceId') serviceId: string,
  ): Promise<FindAllRequestCallHistoryResponse> {
    const data = await this.requestCallHistoryService.findByService(serviceId);
    return {
      message: 'Request call histories retrieved successfully',
      data,
    };
  }

  @Get('interval/:intervalId')
  @HttpCode(HttpStatus.OK)
  async findByInterval(
    @Param('intervalId') intervalId: string,
  ): Promise<FindAllRequestCallHistoryResponse> {
    const data = await this.requestCallHistoryService.findByInterval(intervalId);
    return {
      message: 'Request call histories retrieved successfully',
      data,
    };
  }

  @Get('error-history/:errorHistoryId')
  @HttpCode(HttpStatus.OK)
  async findByErrorHistory(
    @Param('errorHistoryId') errorHistoryId: string,
  ): Promise<FindAllRequestCallHistoryResponse> {
    const data = await this.requestCallHistoryService.findByErrorHistory(errorHistoryId);
    return {
      message: 'Request call histories retrieved successfully',
      data,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateRequestCallHistoryDto: UpdateRequestCallHistoryDto,
  ): Promise<RequestCallHistoryResponse> {
    const data = await this.requestCallHistoryService.update(id, updateRequestCallHistoryDto);
    return {
      message: 'Request call history updated successfully',
      data,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string): Promise<DeleteRequestCallHistoryResponse> {
    const data = await this.requestCallHistoryService.remove(id);
    return {
      message: 'Request call history deleted successfully',
      data,
    };
  }
}
