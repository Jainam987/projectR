import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RolesMetadataService } from './roles-metadata.service';
import {
  CreateRolesMetadatumDto,
  DeleteRolesMetadatumResponse,
  FindAllRolesMetadatumResponse,
  RolesMetadatumResponse,
  UpdateRolesMetadatumDto,
} from './dto/roles-metadatum.dto';

@Controller('roles-metadata')
export class RolesMetadataController {
  constructor(private readonly rolesMetadataService: RolesMetadataService) {}

  @Post()
  async create(
    @Body() createRolesMetadatumDto: CreateRolesMetadatumDto,
  ): Promise<RolesMetadatumResponse> {
    const rolesMetadata = await this.rolesMetadataService.create(
      createRolesMetadatumDto,
    );
    return {
      message: 'Roles metadata created successfully',
      data: rolesMetadata,
    };
  }

  @Get()
  async findAll(): Promise<FindAllRolesMetadatumResponse> {
    const rolesMetadata = await this.rolesMetadataService.findAll();
    return {
      message: 'Roles metadata found successfully',
      data: rolesMetadata,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<RolesMetadatumResponse> {
    const rolesMetadata = await this.rolesMetadataService.findOne(id);
    return {
      message: 'Roles metadata found successfully',
      data: rolesMetadata,
    };
  }

  @Get('code/:code')
  async findByCode(
    @Param('code') code: string,
  ): Promise<RolesMetadatumResponse> {
    const rolesMetadata = await this.rolesMetadataService.findByCode(code);
    return {
      message: 'Roles metadata found successfully',
      data: rolesMetadata,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRolesMetadatumDto: UpdateRolesMetadatumDto,
  ): Promise<RolesMetadatumResponse> {
    const rolesMetadata = await this.rolesMetadataService.update(
      id,
      updateRolesMetadatumDto,
    );
    return {
      message: 'Roles metadata updated successfully',
      data: rolesMetadata,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteRolesMetadatumResponse> {
    const rolesMetadata = await this.rolesMetadataService.remove(id);
    return {
      message: rolesMetadata
        ? 'Roles metadata deleted successfully'
        : 'Roles metadata deletion failed',
      data: rolesMetadata,
    };
  }
}
