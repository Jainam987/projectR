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

  async seedUser() {
    const dataArray = [
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

    const seeder = [];

    for (const data of dataArray) {
      const findSeeder = await this.user.findUnique({
        where: {
          email: data.email,
        },
      });

      if (!findSeeder) {
        const dataObj = await this.user.create({
          data:  {
            id: data.id,
            name: data.name,
            email: data.email,
            phone: data.phone,
            role_id: data.role_id,
            role_code: data.role_code,
          },
        });

        if (dataObj) {
          await this.password.create({
            data: {
              user_id: data.id,
              password: await argon2.hash(data.password),
              createdBy: data.id,
            },
          });
        }
        seeder.push(dataObj);
      } else {
        seeder.push(findSeeder);
      }
    }
    return seeder;
  }

  async seedRoles() {
    const dataArray = [
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

    const seeder = [];

    for (const data of dataArray) {
      const findSeeder = await this.rolesMetadata.findUnique({
        where: {
          code: data.code,
        },
      });

      if (!findSeeder) {
        const dataObj = await this.rolesMetadata.create({
          data,
        });

        seeder.push(dataObj);
      } else {
        seeder.push(findSeeder);
      }
    }
    return seeder;
  }
}
