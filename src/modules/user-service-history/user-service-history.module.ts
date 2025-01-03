import { Module } from '@nestjs/common';
import { UserServiceHistoryService } from './user-service-history.service';
import { UserServiceHistoryController } from './user-service-history.controller';

@Module({
  controllers: [UserServiceHistoryController],
  providers: [UserServiceHistoryService],
})
export class UserServiceHistoryModule {}
