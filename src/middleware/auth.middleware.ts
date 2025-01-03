// import {
//   Injectable,
//   NestMiddleware,
// } from '@nestjs/common';
// import {
//   Request,
//   Response,
//   NextFunction,
// } from 'express';

// @Injectable()
// export class AuthMiddleware
//   implements NestMiddleware
// {
//   use(
//     req: Request,
//     res: Response,
//     next: NextFunction,
//   ) {
//     req['user'] = 'abc';
//     next();
//   }
// }

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from '../modules/prisma/prisma.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const email = req.body.email;

      if (email) {
        const user = await this.prisma.user.findUnique({
          where: {
            email: email,
            is_active: true,
          },
          select: {
            id: true,
            name: true,
            email: true,
            role_code: true,
            company_id: true,
            is_active: true,
          },
        });

        if (user) {
          req['user'] = user;
        } else {
          // error
        }
      } else {
        // error
      }

      next();
    } catch (error) {
      // error
    }
  }
}
