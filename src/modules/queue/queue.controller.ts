import { Body, Controller, Get, Post } from '@nestjs/common';
import { JobQueueService } from './job-queue.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly jobQueueService: JobQueueService) {}

  @Post('add')
  async addJob(@Body() bodyData: any) {
    const interval = bodyData.interval * 1000;
    await this.jobQueueService.addJob(
      bodyData.jobName || 'sample-job',
      bodyData.data || { message: 'Hello, BullMQ!' },
      interval,
    );
    return 'Job added to the queue!';
  }

  @Get('pause')
  async pauseQueue() {
    await this.jobQueueService.pauseQueue();
    return 'Job paused!';
  }

  @Get('resume')
  async resumeQueue() {
    await this.jobQueueService.resumeQueue();
    return 'Job resumed!';
  }
}
