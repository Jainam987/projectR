import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IntervalsMetadataService } from './intervals-metadata.service';
import { CreateIntervalsMetadatumDto } from './dto/create-intervals-metadatum.dto';
import { UpdateIntervalsMetadatumDto } from './dto/update-intervals-metadatum.dto';

@Controller('intervals-metadata')
export class IntervalsMetadataController {
  constructor(private readonly intervalsMetadataService: IntervalsMetadataService) {}

  @Post()
  create(@Body() createIntervalsMetadatumDto: CreateIntervalsMetadatumDto) {
    return this.intervalsMetadataService.create(createIntervalsMetadatumDto);
  }

  @Get()
  findAll() {
    return this.intervalsMetadataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.intervalsMetadataService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIntervalsMetadatumDto: UpdateIntervalsMetadatumDto) {
    return this.intervalsMetadataService.update(+id, updateIntervalsMetadatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.intervalsMetadataService.remove(+id);
  }
}
