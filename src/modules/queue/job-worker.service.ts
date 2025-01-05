// job-worker.service.ts
import { Processor, Worker } from 'bullmq';

export class JobWorkerService {
  private worker: Worker;

  constructor() {
    this.worker = new Worker(
      'task-queue',
      async (job) => {
        console.log(`Processing job: ${job.id}`);
        // Your business logic here
      },
      {
        connection: {
          host: process.env.REDIS_HOST,
          port: parseInt(process.env.REDIS_PORT, 10), // Ensure port is parsed to an integer
          password: process.env.REDIS_PASSWORD, // Add Redis password from environment variable
        },
      },
    );

    this.worker.on('completed', (job) => {
      console.log(`Job ${job.id} ${JSON.stringify(job, null, 2)}.`);
      console.log(`Job ${job.id} completed successfully.`);
    });

    this.worker.on('failed', (job, err) => {
      console.log(`Job ${job.id} failed: ${err.message}`);
    });
  }
}
