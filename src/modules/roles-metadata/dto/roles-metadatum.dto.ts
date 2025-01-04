import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateRolesMetadatumDto {
  @IsString()
  code: string;

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

// UpdateRolesMetadatumDto
export class UpdateRolesMetadatumDto {
  @IsString()
  @IsOptional()
  code?: string;

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


export type RolesMetadatumDataResponse = {
  id: string;
  code: string;
  name: string;
  description: string;
  is_active?: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type RolesMetadatumResponse = {
  message: string;
  data: RolesMetadatumDataResponse;
};

export type FindAllRolesMetadatumResponse = {
  message: string;
  data: RolesMetadatumDataResponse[];
};

export type DeleteRolesMetadatumResponse = {
  message: string;
  data: Boolean;
};