import { Module } from '@nestjs/common';
import { ServicesMetadataService } from './services-metadata.service';
import { ServicesMetadataController } from './services-metadata.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ServicesMetadataController],
  providers: [ServicesMetadataService],
})
export class ServicesMetadataModule {}
