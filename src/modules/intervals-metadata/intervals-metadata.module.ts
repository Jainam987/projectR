import { Module } from '@nestjs/common';
import { IntervalsMetadataService } from './intervals-metadata.service';
import { IntervalsMetadataController } from './intervals-metadata.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [IntervalsMetadataController],
  providers: [IntervalsMetadataService],
  exports: [IntervalsMetadataService],
})
export class IntervalsMetadataModule {}
