import { Module } from '@nestjs/common';
import { NotificationMethodsMetadataService } from './notification-methods-metadata.service';
import { NotificationMethodsMetadataController } from './notification-methods-metadata.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [NotificationMethodsMetadataController],
  providers: [NotificationMethodsMetadataService],
  exports: [NotificationMethodsMetadataService],
})
export class NotificationMethodsMetadataModule {}
