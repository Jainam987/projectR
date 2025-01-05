import { Module } from '@nestjs/common';
import { JobQueueService } from './job-queue.service';
import { JobWorkerService } from './job-worker.service';
import { TaskController } from './queue.controller';

@Module({
  providers: [JobQueueService, JobWorkerService],
  exports: [JobQueueService],
  controllers: [TaskController],
})
export class QueueModule {}
