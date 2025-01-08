import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateRequestCallHistoryDto,
  UpdateRequestCallHistoryDto,
} from './dto/request-call-history.dto';

const selectObj = {
  id: true,
  request_time: true,
  request: true,
  response_time: true,
  response: true,
  is_error: true,
  is_resolved: true,
  service_id: true,
  interval_id: true,
  interval_time: true,
  request_call_error_history_id: true,
  createdAt: true,
  updatedAt: true,
};

@Injectable()
export class RequestCallHistoryService {
  constructor(private prisma: PrismaService) {}

  async create(createRequestCallHistoryDto: CreateRequestCallHistoryDto) {
    try {
      // Check if service exists
      const service = await this.prisma.servicesMetadata.findUnique({
        where: { id: createRequestCallHistoryDto.service_id },
      });

      if (!service) {
        throw new NotFoundException('Service not found');
      }

      // Check if interval exists
      const interval = await this.prisma.intervalsMetadata.findUnique({
        where: { id: createRequestCallHistoryDto.interval_id },
      });

      if (!interval) {
        throw new NotFoundException('Interval not found');
      }

      // // Check if request call error history exists
      // const errorHistory = await this.prisma.requestCallErrorHistory.findUnique({
      //   where: { id: createRequestCallHistoryDto.request_call_error_history_id },
      // });

      // if (!errorHistory) {
      //   throw new NotFoundException('Request call error history not found');
      // }

      return await this.prisma.requestCallHistory.create({
        data: {
          request_time: createRequestCallHistoryDto.request_time,
          request: createRequestCallHistoryDto.request,
          response_time: createRequestCallHistoryDto.response_time,
          response: createRequestCallHistoryDto.response,
          is_error: createRequestCallHistoryDto.is_error,
          is_resolved: createRequestCallHistoryDto.is_resolved,
          service_id: createRequestCallHistoryDto.service_id,
          interval_id: createRequestCallHistoryDto.interval_id,
          interval_time: createRequestCallHistoryDto.interval_time,
          // request_call_error_history_id: createRequestCallHistoryDto.request_call_error_history_id,
        },
        select: selectObj,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to create request call history: ${error.message}`);
    }
  }

  async findAll() {
    try {
      return await this.prisma.requestCallHistory.findMany({
        select: selectObj,
        orderBy: {
          request_time: 'desc',
        },
      });
    } catch (error) {
      throw new Error(`Failed to fetch request call histories: ${error.message}`);
    }
  }

  async findOne(id: string) {
    try {
      const requestCallHistory = await this.prisma.requestCallHistory.findUnique({
        where: { id },
        select: selectObj,
      });

      if (!requestCallHistory) {
        throw new NotFoundException(`Request call history with ID ${id} not found`);
      }

      return requestCallHistory;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to fetch request call history: ${error.message}`);
    }
  }

  async findByService(serviceId: string) {
    try {
      return await this.prisma.requestCallHistory.findMany({
        where: {
          service_id: serviceId,
        },
        select: selectObj,
        orderBy: {
          request_time: 'desc',
        },
      });
    } catch (error) {
      throw new Error(`Failed to fetch request call histories: ${error.message}`);
    }
  }

  async findByInterval(intervalId: string) {
    try {
      return await this.prisma.requestCallHistory.findMany({
        where: {
          interval_id: intervalId,
        },
        select: selectObj,
        orderBy: {
          request_time: 'desc',
        },
      });
    } catch (error) {
      throw new Error(`Failed to fetch request call histories: ${error.message}`);
    }
  }

  async findByErrorHistory(errorHistoryId: string) {
    try {
      return await this.prisma.requestCallHistory.findMany({
        where: {
          request_call_error_history_id: errorHistoryId,
        },
        select: selectObj,
        orderBy: {
          request_time: 'desc',
        },
      });
    } catch (error) {
      throw new Error(`Failed to fetch request call histories: ${error.message}`);
    }
  }

  async update(id: string, updateRequestCallHistoryDto: UpdateRequestCallHistoryDto) {
    try {
      const exists = await this.prisma.requestCallHistory.findUnique({
        where: { id },
      });

      if (!exists) {
        throw new NotFoundException(`Request call history with ID ${id} not found`);
      }

      // If service_id is being updated, check if service exists
      if (updateRequestCallHistoryDto.service_id) {
        const service = await this.prisma.servicesMetadata.findUnique({
          where: { id: updateRequestCallHistoryDto.service_id },
        });

        if (!service) {
          throw new NotFoundException('Service not found');
        }
      }

      // If interval_id is being updated, check if interval exists
      if (updateRequestCallHistoryDto.interval_id) {
        const interval = await this.prisma.intervalsMetadata.findUnique({
          where: { id: updateRequestCallHistoryDto.interval_id },
        });

        if (!interval) {
          throw new NotFoundException('Interval not found');
        }
      }

      // If request_call_error_history_id is being updated, check if it exists
      if (updateRequestCallHistoryDto.request_call_error_history_id) {
        const errorHistory = await this.prisma.requestCallErrorHistory.findUnique({
          where: { id: updateRequestCallHistoryDto.request_call_error_history_id },
        });

        if (!errorHistory) {
          throw new NotFoundException('Request call error history not found');
        }
      }

      return await this.prisma.requestCallHistory.update({
        where: { id },
        data: {
          request_time: updateRequestCallHistoryDto.request_time,
          request: updateRequestCallHistoryDto.request,
          response_time: updateRequestCallHistoryDto.response_time,
          response: updateRequestCallHistoryDto.response,
          is_error: updateRequestCallHistoryDto.is_error,
          is_resolved: updateRequestCallHistoryDto.is_resolved,
          service_id: updateRequestCallHistoryDto.service_id,
          interval_id: updateRequestCallHistoryDto.interval_id,
          interval_time: updateRequestCallHistoryDto.interval_time,
          request_call_error_history_id: updateRequestCallHistoryDto.request_call_error_history_id,
        },
        select: selectObj,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to update request call history: ${error.message}`);
    }
  }

  async remove(id: string) {
    try {
      const exists = await this.prisma.requestCallHistory.findUnique({
        where: { id },
      });

      if (!exists) {
        throw new NotFoundException(`Request call history with ID ${id} not found`);
      }

      await this.prisma.requestCallHistory.delete({
        where: { id },
      });

      return true;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to delete request call history: ${error.message}`);
    }
  }
}
