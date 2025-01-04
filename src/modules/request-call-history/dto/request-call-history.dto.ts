import { IsString, IsOptional, IsBoolean, IsDate, IsNumber, IsObject } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRequestCallHistoryDto {
  @Type(() => Date)
  @IsDate()
  request_time: Date;

  @IsObject()
  request: any;

  @Type(() => Date)
  @IsDate()
  response_time: Date;

  @IsObject()
  response: any;

  @IsBoolean()
  @IsOptional()
  is_error?: boolean;

  @IsBoolean()
  @IsOptional()
  is_resolved?: boolean;

  @IsString()
  service_id: string;

  @IsString()
  interval_id: string;

  @IsNumber()
  interval_time: number;

  @IsString()
  request_call_error_history_id: string;
}

export class UpdateRequestCallHistoryDto {
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  request_time?: Date;

  @IsObject()
  @IsOptional()
  request?: any;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  response_time?: Date;

  @IsObject()
  @IsOptional()
  response?: any;

  @IsBoolean()
  @IsOptional()
  is_error?: boolean;

  @IsBoolean()
  @IsOptional()
  is_resolved?: boolean;

  @IsString()
  @IsOptional()
  service_id?: string;

  @IsString()
  @IsOptional()
  interval_id?: string;

  @IsNumber()
  @IsOptional()
  interval_time?: number;

  @IsString()
  @IsOptional()
  request_call_error_history_id?: string;
}

export class RequestCallHistoryDataResponse {
  id: string;
  request_time: Date;
  request: any;
  response_time: Date;
  response: any;
  is_error: boolean;
  is_resolved: boolean;
  service_id: string;
  interval_id: string;
  interval_time: number;
  request_call_error_history_id: string;
  createdAt: Date;
  updatedAt: Date;
}

export class RequestCallHistoryResponse {
  message: string;
  data: RequestCallHistoryDataResponse;
}

export class FindAllRequestCallHistoryResponse {
  message: string;
  data: RequestCallHistoryDataResponse[];
}

export class DeleteRequestCallHistoryResponse {
  message: string;
  data: boolean;
}
