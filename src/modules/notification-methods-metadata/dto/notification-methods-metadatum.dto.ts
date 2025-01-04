import { PartialType } from "@nestjs/mapped-types";
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateNotificationMethodsMetadatumDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @IsString()
  @IsOptional()
  createdBy?: string;

  @IsString()
  @IsOptional()
  updatedBy?: string;
}

export class UpdateNotificationMethodsMetadatumDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @IsString()
  @IsOptional()
  createdBy?: string;

  @IsString()
  @IsOptional()
  updatedBy?: string;
}

export class NotificationMethodsMetadatumDataResponse {
  id: string;
  name: string;
  description: string;
  is_active?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class NotificationMethodsMetadatumResponse {
  message: string;
  data: NotificationMethodsMetadatumDataResponse;
}

export class FindAllNotificationMethodsMetadatumResponse {
  message: string;
  data: NotificationMethodsMetadatumDataResponse[];
}

export class DeleteNotificationMethodsMetadatumResponse {
  message: string;
  data: Boolean;
}