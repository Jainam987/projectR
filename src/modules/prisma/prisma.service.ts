import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      // log: ['query', 'info', 'warn', 'error'],
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
      errorFormat: 'pretty',
    });
  }

  async seedData(metadata, dataArray, uniqueField, createExtraData = null) {
    const seeder = [];

    for (const data of dataArray) {
      const findSeeder = await metadata.findUnique({
        where: {
          [uniqueField]: data[uniqueField],
        },
      });


      if (!findSeeder) {
        const createData = createExtraData ? await createExtraData(data) : data;
        const dataObj = await metadata.create({ data: createData });
        seeder.push(dataObj);
      } else {
        seeder.push(findSeeder);
      }
    }

    return seeder;
  }

  async seedUser() {
    const userArray = [
      {
        id: '6773ee2d598dee6a8c6744e4',
        name: 'Super Admin',
        email: 'a@a.com',
        password: 'a',
        phone: 123,
        role_id: '6773eca9f3da3422880cbd86',
        role_code: 'SA',
      },
    ];

    return this.seedData(this.user, userArray, 'email', async (data) => {
      const hashedPassword = await argon2.hash(data.password);

      await this.password.create({
        data: {
          user_id: data.id,
          password: hashedPassword,
          createdBy: data.id,
        },
      });

      return {
        id: data.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        role_id: data.role_id,
        role_code: data.role_code,
      };
    });
  }

  async seedRoles() {
    const rolesArray = [
      {
        id: '6773eca9f3da3422880cbd86',
        code: 'SA',
        name: 'Super Admin',
        description: 'Super Admin',
      },
      {
        id: '6773eda94346b4665b199a5e',
        code: 'OA',
        name: 'Organization Admin',
        description: 'Organization Admin',
      },
      {
        id: '6773eda94346b4665b199a5f',
        code: 'OU',
        name: 'Organization User',
        description: 'Organization User',
      },
    ];

    return this.seedData(this.rolesMetadata, rolesArray, 'code');
  }

  async seedService() {
    const servicesArray = [
      {
        id: '6773ee2d598dee6a8c6744e4',
        name: 'User Service',
        code: 'US',
        description: 'User Service',
      },
      {
        id: '6773ee2d598dee6a8c6744e5',
        name: 'Organization Service',
        code: 'OS',
        description: 'Organization Service',
      },
    ];

    return this.seedData(this.servicesMetadata, servicesArray, 'code');
  }

  async seedInitials() {
    const intervalsArray = [
      {
        id: '6773ee2d598dee6a8c6744e4',
        name: '1 minute',
        code: '1M',
        interval_time: 60,
        description: '1 minute',
      },
      {
        id: '6773ee2d598dee6a8c6744e5',
        name: '5 minutes',
        code: '5M',
        interval_time: 300,
        description: '5 minutes',
      },
      {
        id: '6773ee2d598dee6a8c6744e6',
        name: '10 minutes',
        code: '10M',
        interval_time: 600,
        description: '10 minutes',
      },
    ];

    return this.seedData(this.intervalsMetadata, intervalsArray, 'code');
  }

  async seedNotificationMethod() {
    const notificationArray = [
      {
        id: '6773ee2d598dee6a8c6744e4',
        name: 'Email',
        code: 'EMAIL',
        description: 'Email',
      },
      {
        id: '6773ee2d598dee6a8c6744e5',
        name: 'Sms',
        code: 'SMS',
        description: 'Sms',
      },
    ];

    return this.seedData(
      this.notificationMethodMetadata,
      notificationArray,
      'code',
    );
  }

  async seedSnooze() {
    const snoozeArray = [
      {
        id: '6773ee2d598dee6a8c6744e4',
        name: '1 minute',
        code: '1M',
        snooze_time: 60,
        description: '1 minute',
      },
      {
        id: '6773ee2d598dee6a8c6744e5',
        name: '5 minutes',
        code: '5M',
        snooze_time: 300,
        description: '5 minutes',
      },
      {
        id: '6773ee2d598dee6a8c6744e6',
        name: '10 minutes',
        code: '10M',
        snooze_time: 600,
        description: '10 minutes',
      },
    ];

    return this.seedData(this.snoozeMetadata, snoozeArray, 'code');
  }
}
