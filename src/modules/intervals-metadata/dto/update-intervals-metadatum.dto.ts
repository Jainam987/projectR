import { PartialType } from '@nestjs/mapped-types';
import { CreateIntervalsMetadatumDto } from './create-intervals-metadatum.dto';

export class UpdateIntervalsMetadatumDto extends PartialType(CreateIntervalsMetadatumDto) {}
