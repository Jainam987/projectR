import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Controller('prisma-seeder')
export class PrismaController {
  constructor(
    private prismaService: PrismaService,
  ) {}

  @Get('user')
  user() {
    return this.prismaService.seedUser();
  }

  @Get('role')
  role() {
    return this.prismaService.seedRoles();
  }

  @Get('service')
  service() {
    return this.prismaService.seedService();
  }

  @Get('initials')
  initials() {
    return this.prismaService.seedInitials();
  }

  @Get('notification-method')
  notification() {
    return this.prismaService.seedNotificationMethod();
  }

  @Get('snooze')
  snooze() {
    return this.prismaService.seedSnooze();
  }
}
