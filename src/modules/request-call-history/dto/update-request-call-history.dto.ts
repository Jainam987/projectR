import { PartialType } from '@nestjs/mapped-types';
import { CreateRequestCallHistoryDto } from './create-request-call-history.dto';

export class UpdateRequestCallHistoryDto extends PartialType(CreateRequestCallHistoryDto) {}
