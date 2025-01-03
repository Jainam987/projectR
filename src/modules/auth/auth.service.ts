import { Injectable } from '@nestjs/common';
import { AuthLoginDto, AuthRegisterDto, AuthRegisteResponse } from './dto';
import * as argon2 from 'argon2';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Company, Password, User } from '@prisma/client';



@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(data: AuthRegisterDto): Promise<AuthRegisteResponse> {
    const hash: string = await argon2.hash(data.password);
    let company: Company | any;

    const user: User = await this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        phone: data.phone,
      },
    });

    if (user) {
      (await this.prisma.password.create({
        data: {
          user_id: user.id,
          password: hash,
          createdBy: user.id,
        },
      })) as Password;

      company = (await this.prisma.company.create({
        data: {
          name: data.company_name,
          createdBy: user.id,
        },
      })) as Company;

      if (company) {
        (await this.prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            company_id: company.id,
          },
        })) as User;
      }
    }

    return {
      message: 'User register success',
      data: {
        id: user?.id,
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
        company_id: company?.id,
        commpany_name: company?.name,
      },
    };
  }

  async login(data: AuthLoginDto): Promise<string> {
    const user: User = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      return 'user not found';
    }

    const password: Password = await this.prisma.password.findFirst({
      where: {
        user_id: user.id,
      },
    });

    const isPasswordValid = await argon2.verify(
      password?.password,
      data.password,
    );
    if (!isPasswordValid) {
      return 'invalid password';
    }

    if (user && isPasswordValid) {
      return 'login success';
    }
  }

  logout(): string {
    return 'logout';
  }
}
