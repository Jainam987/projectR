import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SnoozeMetadataService } from './snooze-metadata.service';
import { CreateSnoozeMetadatumDto } from './dto/create-snooze-metadatum.dto';
import { UpdateSnoozeMetadatumDto } from './dto/update-snooze-metadatum.dto';

@Controller('snooze-metadata')
export class SnoozeMetadataController {
  constructor(private readonly snoozeMetadataService: SnoozeMetadataService) {}

  @Post()
  create(@Body() createSnoozeMetadatumDto: CreateSnoozeMetadatumDto) {
    return this.snoozeMetadataService.create(createSnoozeMetadatumDto);
  }

  @Get()
  findAll() {
    return this.snoozeMetadataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.snoozeMetadataService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSnoozeMetadatumDto: UpdateSnoozeMetadatumDto) {
    return this.snoozeMetadataService.update(+id, updateSnoozeMetadatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.snoozeMetadataService.remove(+id);
  }
}
