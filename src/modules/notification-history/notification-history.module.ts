import { Module } from '@nestjs/common';
import { NotificationHistoryService } from './notification-history.service';
import { NotificationHistoryController } from './notification-history.controller';

@Module({
  controllers: [NotificationHistoryController],
  providers: [NotificationHistoryService],
})
export class NotificationHistoryModule {}
