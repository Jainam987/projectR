import { PartialType } from "@nestjs/mapped-types";
import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateSnoozeMetadatumDto {
  @IsString()
  name: string;

  @IsNumber()
  snooze_time: number;

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

export class UpdateSnoozeMetadatumDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  snooze_time?: number;

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

export class SnoozeMetadatumDataResponse {
  id: string;
  name: string;
  snooze_time: number;
  description: string;
  is_active?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class SnoozeMetadatumResponse {
  message: string;
  data: SnoozeMetadatumDataResponse;
}

export class FindAllSnoozeMetadatumResponse {
  message: string;
  data: SnoozeMetadatumDataResponse[];
}

export class DeleteSnoozeMetadatumResponse {
  message: string;
  data: Boolean;
}