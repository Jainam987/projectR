import { Injectable } from '@nestjs/common';
import { CreateNotificationHistoryDto } from './dto/create-notification-history.dto';
import { UpdateNotificationHistoryDto } from './dto/update-notification-history.dto';

@Injectable()
export class NotificationHistoryService {
  create(createNotificationHistoryDto: CreateNotificationHistoryDto) {
    return 'This action adds a new notificationHistory';
  }

  findAll() {
    return `This action returns all notificationHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notificationHistory`;
  }

  update(id: number, updateNotificationHistoryDto: UpdateNotificationHistoryDto) {
    return `This action updates a #${id} notificationHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} notificationHistory`;
  }
}
