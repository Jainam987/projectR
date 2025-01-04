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
import { SnoozeMetadataService } from './snooze-metadata.service';
import {
  CreateSnoozeMetadatumDto,
  DeleteSnoozeMetadatumResponse,
  FindAllSnoozeMetadatumResponse,
  SnoozeMetadatumResponse,
  UpdateSnoozeMetadatumDto,
} from './dto/snooze-metadatum.dto';

@Controller('snooze-metadata')
export class SnoozeMetadataController {
  constructor(private readonly snoozeMetadataService: SnoozeMetadataService) {}

  @Post()
  async create(
    @Body() createSnoozeMetadatumDto: CreateSnoozeMetadatumDto,
  ): Promise<SnoozeMetadatumResponse> {
    try {
      const snoozeMetadata = await this.snoozeMetadataService.create(
        createSnoozeMetadatumDto,
      );
      return {
        message: 'Snooze metadata created successfully',
        data: snoozeMetadata,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: error.message || 'Failed to create snooze metadata',
          data: null,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll(): Promise<FindAllSnoozeMetadatumResponse> {
    try {
      const snoozeMetadata = await this.snoozeMetadataService.findAll();
      return {
        message: 'Snooze metadata found successfully',
        data: snoozeMetadata,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: error.message || 'Failed to fetch snooze metadata',
          data: [],
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<SnoozeMetadatumResponse> {
    try {
      const snoozeMetadata = await this.snoozeMetadataService.findOne(id);
      return {
        message: 'Snooze metadata found successfully',
        data: snoozeMetadata,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: error.message || 'Failed to fetch snooze metadata',
          data: null,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSnoozeMetadatumDto: UpdateSnoozeMetadatumDto,
  ): Promise<SnoozeMetadatumResponse> {
    try {
      const snoozeMetadata = await this.snoozeMetadataService.update(
        id,
        updateSnoozeMetadatumDto,
      );
      return {
        message: 'Snooze metadata updated successfully',
        data: snoozeMetadata,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: error.message || 'Failed to update snooze metadata',
          data: null,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
  ): Promise<DeleteSnoozeMetadatumResponse> {
    try {
      const snoozeMetadata = await this.snoozeMetadataService.remove(id);
      return {
        message: snoozeMetadata
          ? 'Snooze metadata deleted successfully'
          : 'Snooze metadata deletion failed',
        data: snoozeMetadata,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: error.message || 'Failed to delete snooze metadata',
          data: false,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
