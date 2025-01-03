import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotificationHistoryService } from './notification-history.service';
import { CreateNotificationHistoryDto } from './dto/create-notification-history.dto';
import { UpdateNotificationHistoryDto } from './dto/update-notification-history.dto';

@Controller('notification-history')
export class NotificationHistoryController {
  constructor(private readonly notificationHistoryService: NotificationHistoryService) {}

  @Post()
  create(@Body() createNotificationHistoryDto: CreateNotificationHistoryDto) {
    return this.notificationHistoryService.create(createNotificationHistoryDto);
  }

  @Get()
  findAll() {
    return this.notificationHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotificationHistoryDto: UpdateNotificationHistoryDto) {
    return this.notificationHistoryService.update(+id, updateNotificationHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationHistoryService.remove(+id);
  }
}
