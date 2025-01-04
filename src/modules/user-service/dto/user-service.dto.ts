import { IsString, IsOptional, IsBoolean, IsArray, IsNumber } from 'class-validator';

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
