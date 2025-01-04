import { Module } from '@nestjs/common';
import { UserServiceService } from './user-service.service';
import { UserServiceController } from './user-service.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserServiceController],
  providers: [UserServiceService],
  exports: [UserServiceService],
})
export class UserServiceModule {}
