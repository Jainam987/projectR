import { PartialType } from "@nestjs/mapped-types";
import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateIntervalsMetadatumDto {
  @IsString()
  name: string;

  @IsNumber()
  interval_time: number;

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

export class UpdateIntervalsMetadatumDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  interval_time?: number;

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

export class IntervalsMetadatumDataResponse {
  id: string;
  name: string;
  interval_time: number;
  description: string;
  is_active?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class IntervalsMetadatumResponse {
  message: string;
  data: IntervalsMetadatumDataResponse;
}

export class FindAllIntervalsMetadatumResponse {
  message: string;
  data: IntervalsMetadatumDataResponse[];
}

export class DeleteIntervalsMetadatumResponse {
  message: string;
  data: Boolean;
}