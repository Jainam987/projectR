import { PartialType } from '@nestjs/mapped-types';
import { CreateServicesMetadatumDto } from './create-services-metadatum.dto';

export class UpdateServicesMetadatumDto extends PartialType(CreateServicesMetadatumDto) {}
