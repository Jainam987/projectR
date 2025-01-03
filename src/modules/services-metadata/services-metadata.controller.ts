import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServicesMetadataService } from './services-metadata.service';
import { CreateServicesMetadatumDto } from './dto/create-services-metadatum.dto';
import { UpdateServicesMetadatumDto } from './dto/update-services-metadatum.dto';

@Controller('services-metadata')
export class ServicesMetadataController {
  constructor(private readonly servicesMetadataService: ServicesMetadataService) {}

  @Post()
  create(@Body() createServicesMetadatumDto: CreateServicesMetadatumDto) {
    return this.servicesMetadataService.create(createServicesMetadatumDto);
  }

  @Get()
  findAll() {
    return this.servicesMetadataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesMetadataService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServicesMetadatumDto: UpdateServicesMetadatumDto) {
    return this.servicesMetadataService.update(+id, updateServicesMetadatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicesMetadataService.remove(+id);
  }
}
