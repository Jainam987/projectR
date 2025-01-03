import { PartialType } from '@nestjs/mapped-types';
import { CreateSnoozeMetadatumDto } from './create-snooze-metadatum.dto';

export class UpdateSnoozeMetadatumDto extends PartialType(CreateSnoozeMetadatumDto) {}
