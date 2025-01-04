import { Module } from '@nestjs/common';
import { RolesMetadataService } from './roles-metadata.service';
import { RolesMetadataController } from './roles-metadata.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RolesMetadataController],
  providers: [RolesMetadataService],
  exports: [RolesMetadataService],
})
export class RolesMetadataModule {}
