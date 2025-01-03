import { Injectable } from '@nestjs/common';
import { CreateNotificationMethodsMetadatumDto } from './dto/create-notification-methods-metadatum.dto';
import { UpdateNotificationMethodsMetadatumDto } from './dto/update-notification-methods-metadatum.dto';

@Injectable()
export class NotificationMethodsMetadataService {
  create(createNotificationMethodsMetadatumDto: CreateNotificationMethodsMetadatumDto) {
    return 'This action adds a new notificationMethodsMetadatum';
  }

  findAll() {
    return `This action returns all notificationMethodsMetadata`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notificationMethodsMetadatum`;
  }

  update(id: number, updateNotificationMethodsMetadatumDto: UpdateNotificationMethodsMetadatumDto) {
    return `This action updates a #${id} notificationMethodsMetadatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} notificationMethodsMetadatum`;
  }
}
