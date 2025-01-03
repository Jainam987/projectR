import { PartialType } from '@nestjs/mapped-types';
import { CreateUserServiceHistoryDto } from './create-user-service-history.dto';

export class UpdateUserServiceHistoryDto extends PartialType(CreateUserServiceHistoryDto) {}
