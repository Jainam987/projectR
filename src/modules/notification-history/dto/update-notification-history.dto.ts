import { PartialType } from '@nestjs/mapped-types';
import { CreateNotificationHistoryDto } from './create-notification-history.dto';

export class UpdateNotificationHistoryDto extends PartialType(CreateNotificationHistoryDto) {}
