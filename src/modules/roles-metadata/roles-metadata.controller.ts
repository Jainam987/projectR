import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolesMetadataService } from './roles-metadata.service';
import { CreateRolesMetadatumDto } from './dto/create-roles-metadatum.dto';
import { UpdateRolesMetadatumDto } from './dto/update-roles-metadatum.dto';

@Controller('roles-metadata')
export class RolesMetadataController {
  constructor(private readonly rolesMetadataService: RolesMetadataService) {}

  @Post()
  create(@Body() createRolesMetadatumDto: CreateRolesMetadatumDto) {
    return this.rolesMetadataService.create(createRolesMetadatumDto);
  }

  @Get()
  findAll() {
    return this.rolesMetadataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesMetadataService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRolesMetadatumDto: UpdateRolesMetadatumDto) {
    return this.rolesMetadataService.update(+id, updateRolesMetadatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesMetadataService.remove(+id);
  }
}
