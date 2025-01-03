import { Module } from '@nestjs/common';
import { RolesMetadataService } from './roles-metadata.service';
import { RolesMetadataController } from './roles-metadata.controller';

@Module({
  controllers: [RolesMetadataController],
  providers: [RolesMetadataService],
})
export class RolesMetadataModule {}
