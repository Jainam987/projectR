import { IsString, IsOptional, IsDate, IsObject } from 'class-validator';

export class CreateNotificationHistoryDto {
  @IsDate()
  sent_time: Date;

  @IsObject()
  response: any;

  @IsString()
  user_service_id: string;

  @IsString()
  notification_method_id: string;

  @IsString()
  request_call_error_history_id: string;
}

export class UpdateNotificationHistoryDto {
  @IsDate()
  @IsOptional()
  sent_time?: Date;

  @IsObject()
  @IsOptional()
  response?: any;

  @IsString()
  @IsOptional()
  user_service_id?: string;

  @IsString()
  @IsOptional()
  notification_method_id?: string;

  @IsString()
  @IsOptional()
  request_call_error_history_id?: string;
}

export class NotificationHistoryDataResponse {
  id: string;
  sent_time: Date;
  response: any;
  user_service_id: string;
  notification_method_id: string;
  request_call_error_history_id: string;
  createdAt: Date;
  updatedAt: Date;
}

export class NotificationHistoryResponse {
  message: string;
  data: NotificationHistoryDataResponse;
}

export class FindAllNotificationHistoryResponse {
  message: string;
  data: NotificationHistoryDataResponse[];
}

export class DeleteNotificationHistoryResponse {
  message: string;
  data: boolean;
}
