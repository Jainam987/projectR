import { Module } from '@nestjs/common';
import { SnoozeMetadataService } from './snooze-metadata.service';
import { SnoozeMetadataController } from './snooze-metadata.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SnoozeMetadataController],
  providers: [SnoozeMetadataService],
  exports: [SnoozeMetadataService],
})
export class SnoozeMetadataModule {}
