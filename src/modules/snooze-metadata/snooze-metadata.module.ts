import { Module } from '@nestjs/common';
import { SnoozeMetadataService } from './snooze-metadata.service';
import { SnoozeMetadataController } from './snooze-metadata.controller';

@Module({
  controllers: [SnoozeMetadataController],
  providers: [SnoozeMetadataService],
})
export class SnoozeMetadataModule {}
