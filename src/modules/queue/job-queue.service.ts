// job-queue.service.ts
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';

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
}
