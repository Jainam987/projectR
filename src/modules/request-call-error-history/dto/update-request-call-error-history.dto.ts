import { PartialType } from '@nestjs/mapped-types';
import { CreateRequestCallErrorHistoryDto } from './create-request-call-error-history.dto';

export class UpdateRequestCallErrorHistoryDto extends PartialType(CreateRequestCallErrorHistoryDto) {}
