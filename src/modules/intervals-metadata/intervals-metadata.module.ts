import { Module } from '@nestjs/common';
import { IntervalsMetadataService } from './intervals-metadata.service';
import { IntervalsMetadataController } from './intervals-metadata.controller';

@Module({
  controllers: [IntervalsMetadataController],
  providers: [IntervalsMetadataService],
})
export class IntervalsMetadataModule {}
