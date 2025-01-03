import { Module } from '@nestjs/common';
import { RequestCallHistoryService } from './request-call-history.service';
import { RequestCallHistoryController } from './request-call-history.controller';

@Module({
  controllers: [RequestCallHistoryController],
  providers: [RequestCallHistoryService],
})
export class RequestCallHistoryModule {}
