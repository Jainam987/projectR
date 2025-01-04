import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ServicesMetadataService } from './services-metadata.service';
import {
  CreateServicesMetadatumDto,
  DeleteServicesMetadatumResponse,
  FindAllServicesMetadatumResponse,
  ServicesMetadatumResponse,
  UpdateServicesMetadatumDto,
} from './dto/services-metadatum.dto';

@Controller('services-metadata')
export class ServicesMetadataController {
  constructor(private readonly servicesMetadataService: ServicesMetadataService) {}

  @Post()
  async create(
    @Body() createServicesMetadatumDto: CreateServicesMetadatumDto,
  ): Promise<ServicesMetadatumResponse> {
    const servicesMetadata = await this.servicesMetadataService.create(
      createServicesMetadatumDto,
    );
    return {
      message: 'Services metadata created successfully',
      data: servicesMetadata,
    };
  }

  @Get()
  async findAll(): Promise<FindAllServicesMetadatumResponse> {
    const servicesMetadata = await this.servicesMetadataService.findAll();
    return {
      message: 'Services metadata found successfully',
      data: servicesMetadata,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ServicesMetadatumResponse> {
    const servicesMetadata = await this.servicesMetadataService.findOne(id);
    return {
      message: 'Services metadata found successfully',
      data: servicesMetadata,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateServicesMetadatumDto: UpdateServicesMetadatumDto,
  ): Promise<ServicesMetadatumResponse> {
    const servicesMetadata = await this.servicesMetadataService.update(
      id,
      updateServicesMetadatumDto,
    );
    return {
      message: 'Services metadata updated successfully',
      data: servicesMetadata,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteServicesMetadatumResponse> {
    const servicesMetadata = await this.servicesMetadataService.remove(id);
    return {
      message: servicesMetadata
        ? 'Services metadata deleted successfully'
        : 'Services metadata deletion failed',
      data: servicesMetadata,
    };
  }
}
