import { IsString, IsOptional, IsBoolean, IsArray, IsNumber, IsDate } from 'class-validator';

export class CreateUserServiceDto {
  @IsString()
  service_id: string;

  @IsString()
  user_id: string;

  @IsString()
  interval_id: string;

  @IsArray()
  @IsString({ each: true })
  notification_method_id: string[];

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  snooze?: number[];

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @IsBoolean()
  @IsOptional()
  is_error?: boolean;

  @IsBoolean()
  @IsOptional()
  is_resolved?: boolean;

  @IsBoolean()
  @IsOptional()
  is_in_maintenance?: boolean;

  @IsString()
  @IsOptional()
  createdBy?: string;

  @IsString()
  @IsOptional()
  updatedBy?: string;

  @IsBoolean()
  @IsOptional()
  is_single_time_alert?: boolean;

  @IsString()
  @IsOptional()
  request_call_error_history_id?: string | null;
}

export class UpdateUserServiceDto {
  @IsString()
  @IsOptional()
  service_id?: string;

  @IsString()
  @IsOptional()
  user_id?: string;

  @IsString()
  @IsOptional()
  interval_id?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  notification_method_id?: string[];

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  snooze?: number[];

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @IsBoolean()
  @IsOptional()
  is_error?: boolean;

  @IsBoolean()
  @IsOptional()
  is_resolved?: boolean;

  @IsBoolean()
  @IsOptional()
  is_in_maintenance?: boolean;

  @IsString()
  @IsOptional()
  updatedBy?: string;

  @IsDate()
  @IsOptional()
  previous_snooze_time?: Date;

  @IsDate()
  @IsOptional()
  next_snooze_time?: Date;

  @IsNumber()
  @IsOptional()
  current_snooze_point?: number;

  @IsBoolean()
  @IsOptional()
  is_single_time_alert?: boolean;

  @IsString()
  @IsOptional()
  request_call_error_history_id?: string | null;
}

export class UserServiceDataResponse {
  id: string;
  service_id: string;
  user_id: string;
  interval_id: string;
  notification_method_id: string[];
  snooze: number[];
  is_active: boolean;
  is_error: boolean;
  is_resolved: boolean;
  is_in_maintenance: boolean;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  URL: string;
  keywords: string;
  retries: number;
  request_timeout: number;
  req_method: string;
  req_body: Object;
  req_headers: Object;
  req_body_encoding: string;
  authentication: Object;
  response_body: Object;
  accepted_status_code: number;
  queue_job_id: string;
  queue_repeat_job_key: string;
  service_code: string;
  interval_time: number;
  retries_interval_id: string;
  retries_interval_time: number;
  previous_snooze_time: Date;
  next_snooze_time: Date;
  current_snooze_point: number;
  is_single_time_alert: boolean;
  request_call_error_history_id: string | null;
} 

export class UserServiceResponse {
  message: string;
  data: UserServiceDataResponse;
}

export class FindAllUserServiceResponse {
  message: string;
  data: UserServiceDataResponse[];
}

export class DeleteUserServiceResponse {
  message: string;
  data: Boolean;
}
