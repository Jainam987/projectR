// job-queue.service.ts
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { ModifyJob } from './dto';

@Injectable()
export class JobQueueService {
  private queue: Queue;

  constructor() {
    this.queue = new Queue('task-queue', {
      connection: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT, 10), // Ensure port is parsed to an integer
        password: process.env.REDIS_PASSWORD, // Add Redis password from environment variable
      },
    });
  }

  async addJob(jobName: string, data: any, interval: number) {
    console.log(`Adding job: ${jobName}`);
    const queueObj = await this.queue.add(jobName, data, {
      repeat: { every: interval }, // Interval in milliseconds (e.g., 60000 for 60 seconds)
      removeOnComplete: true, // Automatically remove completed jobs
    });
    console.log(`Job added with ID: ${JSON.stringify(queueObj, null, 2)}`);
  }

  async pauseQueue() {
    const queueObj = await this.queue.pause();
    console.log(`Queue paused: ${JSON.stringify(queueObj, null, 2)}`);
  }

  async resumeQueue() {
    const queueObj = await this.queue.resume();
    console.log(`Queue resumed: ${JSON.stringify(queueObj, null, 2)}`);
  }

  async modifyJob({ jobName, data, interval, repeatJobKey }: ModifyJob) {
    console.log(`Modify job: ${jobName}`);

    await this.queue.removeRepeatableByKey(repeatJobKey);

    const queueObj = await this.queue.add(jobName, data, {
      repeat: { every: interval }, // Interval in milliseconds (e.g., 60000 for 60 seconds)
      removeOnComplete: true, // Automatically remove completed jobs
    });
    console.log(`Job modified: ${JSON.stringify(queueObj, null, 2)}`);
  }

  async cleanJobs(type: any) {
    const queueObj = await this.queue.clean(0, 1000, type);
    console.log(`Completed jobs cleaned: ${JSON.stringify(queueObj, null, 2)}`);
  }

  async drainQueue() {
    const queueObj = await this.queue.drain();
    console.log(`Queue emptied: ${JSON.stringify(queueObj, null, 2)}`);
  }

  async removeRepeatableByKey(repeatJobKey: string) {
    const queueObj = await this.queue.removeRepeatableByKey(repeatJobKey);
    console.log(`Repeatable job removed: ${JSON.stringify(queueObj, null, 2)}`);
  }

  async monitorJob() {
    return {
      waitingCount: await this.queue.getWaitingCount(),
      activeCount: await this.queue.getActiveCount(),
      completedCount: await this.queue.getCompletedCount(),
      failedCount: await this.queue.getFailedCount(),
    };
  }
}
