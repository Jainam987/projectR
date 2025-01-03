import { Module } from '@nestjs/common';
import { RequestCallErrorHistoryService } from './request-call-error-history.service';
import { RequestCallErrorHistoryController } from './request-call-error-history.controller';

@Module({
  controllers: [RequestCallErrorHistoryController],
  providers: [RequestCallErrorHistoryService],
})
export class RequestCallErrorHistoryModule {}
