import { PartialType } from "@nestjs/mapped-types";
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateServicesMetadatumDto {
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

export class UpdateServicesMetadatumDto {
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

export class ServicesMetadatumDataResponse {
  id: string;
  name: string;
  description: string;
  is_active?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class ServicesMetadatumResponse {
  message: string;
  data: ServicesMetadatumDataResponse;
}

export class FindAllServicesMetadatumResponse {
  message: string;
  data: ServicesMetadatumDataResponse[];
}

export class DeleteServicesMetadatumResponse {
  message: string;
  data: Boolean;
}