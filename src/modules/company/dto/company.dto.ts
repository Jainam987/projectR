import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateCompanyDto {
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

export class UpdateCompanyDto {
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
  updatedBy?: string;
}

export class CompanyDataResponse {
  id: string;
  name: string;
  description: string;
  is_active?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class CompanyResponse {
  message: string;
  data: CompanyDataResponse;
}

export class FindAllCompanyResponse {
  message: string;
  data: CompanyDataResponse[];
}

export class DeleteCompanyResponse {
  message: string;
  data: Boolean;
}