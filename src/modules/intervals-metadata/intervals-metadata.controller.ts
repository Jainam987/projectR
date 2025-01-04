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
import { IntervalsMetadataService } from './intervals-metadata.service';
import {
  CreateIntervalsMetadatumDto,
  DeleteIntervalsMetadatumResponse,
  FindAllIntervalsMetadatumResponse,
  IntervalsMetadatumResponse,
  UpdateIntervalsMetadatumDto,
} from './dto/intervals-metadatum.dto';

@Controller('intervals-metadata')
export class IntervalsMetadataController {
  constructor(private readonly intervalsMetadataService: IntervalsMetadataService) {}

  @Post()
  async create(
    @Body() createIntervalsMetadatumDto: CreateIntervalsMetadatumDto,
  ): Promise<IntervalsMetadatumResponse> {
    try {
      const intervalsMetadata = await this.intervalsMetadataService.create(
        createIntervalsMetadatumDto,
      );
      return {
        message: 'Intervals metadata created successfully',
        data: intervalsMetadata,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: error.message || 'Failed to create intervals metadata',
          data: null,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll(): Promise<FindAllIntervalsMetadatumResponse> {
    try {
      const intervalsMetadata = await this.intervalsMetadataService.findAll();
      return {
        message: 'Intervals metadata found successfully',
        data: intervalsMetadata,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: error.message || 'Failed to fetch intervals metadata',
          data: [],
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IntervalsMetadatumResponse> {
    try {
      const intervalsMetadata = await this.intervalsMetadataService.findOne(id);
      return {
        message: 'Intervals metadata found successfully',
        data: intervalsMetadata,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: error.message || 'Failed to fetch intervals metadata',
          data: null,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateIntervalsMetadatumDto: UpdateIntervalsMetadatumDto,
  ): Promise<IntervalsMetadatumResponse> {
    try {
      const intervalsMetadata = await this.intervalsMetadataService.update(
        id,
        updateIntervalsMetadatumDto,
      );
      return {
        message: 'Intervals metadata updated successfully',
        data: intervalsMetadata,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: error.message || 'Failed to update intervals metadata',
          data: null,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteIntervalsMetadatumResponse> {
    try {
      const intervalsMetadata = await this.intervalsMetadataService.remove(id);
      return {
        message: intervalsMetadata
          ? 'Intervals metadata deleted successfully'
          : 'Intervals metadata deletion failed',
        data: intervalsMetadata,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: error.message || 'Failed to delete intervals metadata',
          data: false,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
