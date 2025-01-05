import { Body, Controller, Get, Post } from '@nestjs/common';
import { JobQueueService } from './job-queue.service';
import { CleanJobs, ModifyJob, RemoveRepeatableByKey } from './dto';
import { JobWorkerService } from './job-worker.service';

async function isCleanJobs(type: string): Promise<boolean> {
  return ["completed", "failed", "active", "delayed", "prioritized", "paused", "wait"].includes(type);
}

@Controller('tasks')
export class TaskController {
  constructor(
    private readonly jobQueueService: JobQueueService,
    private readonly jobWorkerService: JobWorkerService,
  ) {}

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

  @Post('modify_job')
  async modifyJob(@Body() bodyData: ModifyJob) {
    await this.jobQueueService.modifyJob(bodyData);
    return 'Job modified!';
  }

  @Post('clean_jobs')
  async cleanJobs(@Body() bodyData:  { type: string }) {      
    if (!await isCleanJobs(bodyData.type)) {
      throw new Error(`Invalid job type: ${bodyData.type}`);
    }
    await this.jobQueueService.cleanJobs(bodyData.type);
    return 'Jobs cleaned!';
  }

  @Get('drain_queue')
  async drainQueue() {
    await this.jobQueueService.drainQueue();
    return 'Queue drained!';
  }

  @Get('close_worker')
  async closeWorker() {
    await this.jobWorkerService.closeWorker();
    return 'Worker closed!';
  }

  @Post('remove_repeatable_job')
  async removeRepeatableByKey(@Body() bodyData: RemoveRepeatableByKey) {
    await this.jobQueueService.removeRepeatableByKey(bodyData.repeatJobKey);
    return 'Repeatable job removed!';
  }

  @Get('monitor_job')
  async monitorJob() {
    return this.jobQueueService.monitorJob();
  }
}
