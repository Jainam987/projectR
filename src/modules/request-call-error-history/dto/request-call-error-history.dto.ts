import { IsString, IsOptional, IsBoolean, IsArray, IsNumber, IsDate } from 'class-validator';

export class CreateRequestCallErrorHistoryDto {
  @IsBoolean()
  @IsOptional()
  is_accepted?: boolean;

  @IsBoolean()
  @IsOptional()
  is_resolved?: boolean;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  snooze?: number[];

  @IsDate()
  @IsOptional()
  previous_snooze_time?: Date;

  @IsDate()
  @IsOptional()
  next_snooze_time?: Date;

  @IsString()
  service_id: string;

  @IsString()
  request_call_history_id: string;

  @IsArray()
  @IsString({ each: true })
  notification_method_id: string[];

  @IsArray()
  @IsString({ each: true })
  notification_history_id: string[];

  @IsDate()
  @IsOptional()
  error_started_time?: Date;

  @IsDate()
  @IsOptional()
  error_ended_time?: Date;

  @IsDate()
  @IsOptional()
  accepted_time?: Date;
}

export class UpdateRequestCallErrorHistoryDto {
  @IsBoolean()
  @IsOptional()
  is_accepted?: boolean;

  @IsBoolean()
  @IsOptional()
  is_resolved?: boolean;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  snooze?: number[];

  @IsDate()
  @IsOptional()
  previous_snooze_time?: Date;

  @IsDate()
  @IsOptional()
  next_snooze_time?: Date;

  @IsString()
  @IsOptional()
  service_id?: string;

  @IsString()
  @IsOptional()
  request_call_history_id?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  notification_method_id?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  notification_history_id?: string[];
}

export class RequestCallErrorHistoryDataResponse {
  id: string;
  is_accepted: boolean;
  is_resolved: boolean;
  snooze: number[];
  previous_snooze_time?: Date;
  next_snooze_time?: Date;
  service_id: string;
  request_call_history_id: string;
  notification_method_id: string[];
  notification_history_id: string[];
  createdAt: Date;
  updatedAt: Date;
  error_started_time?: Date;
  error_ended_time?: Date;
  accepted_time?: Date;
}

export class RequestCallErrorHistoryResponse {
  message: string;
  data: RequestCallErrorHistoryDataResponse;
}

export class FindAllRequestCallErrorHistoryResponse {
  message: string;
  data: RequestCallErrorHistoryDataResponse[];
}

export class DeleteRequestCallErrorHistoryResponse {
  message: string;
  data: boolean;
}