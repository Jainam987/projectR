import { Module } from '@nestjs/common';
import { NotificationMethodsMetadataService } from './notification-methods-metadata.service';
import { NotificationMethodsMetadataController } from './notification-methods-metadata.controller';

@Module({
  controllers: [NotificationMethodsMetadataController],
  providers: [NotificationMethodsMetadataService],
})
export class NotificationMethodsMetadataModule {}
