import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotificationMethodsMetadataService } from './notification-methods-metadata.service';
import { CreateNotificationMethodsMetadatumDto } from './dto/create-notification-methods-metadatum.dto';
import { UpdateNotificationMethodsMetadatumDto } from './dto/update-notification-methods-metadatum.dto';

@Controller('notification-methods-metadata')
export class NotificationMethodsMetadataController {
  constructor(private readonly notificationMethodsMetadataService: NotificationMethodsMetadataService) {}

  @Post()
  create(@Body() createNotificationMethodsMetadatumDto: CreateNotificationMethodsMetadatumDto) {
    return this.notificationMethodsMetadataService.create(createNotificationMethodsMetadatumDto);
  }

  @Get()
  findAll() {
    return this.notificationMethodsMetadataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationMethodsMetadataService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotificationMethodsMetadatumDto: UpdateNotificationMethodsMetadatumDto) {
    return this.notificationMethodsMetadataService.update(+id, updateNotificationMethodsMetadatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationMethodsMetadataService.remove(+id);
  }
}
