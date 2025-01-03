import { PartialType } from '@nestjs/mapped-types';
import { CreateNotificationMethodsMetadatumDto } from './create-notification-methods-metadatum.dto';

export class UpdateNotificationMethodsMetadatumDto extends PartialType(CreateNotificationMethodsMetadatumDto) {}
