import { PartialType } from "@nestjs/mapped-types";
import { IsString, IsOptional, IsBoolean, IsEmail, IsPhoneNumber, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsNumber()
  phone: number;

  @IsString()
  password: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @IsBoolean()
  @IsOptional()
  is_phone_verified?: boolean;

  @IsBoolean()
  @IsOptional()
  is_email_verified?: boolean;

  @IsString()
  @IsOptional()
  role_id?: string;

  @IsString()
  @IsOptional()
  role_code?: string;

  @IsString()
  @IsOptional()
  company_id?: string;

  @IsString()
  @IsOptional()
  createdBy?: string;

  @IsString()
  @IsOptional()
  updatedBy?: string;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsNumber()
  @IsOptional()
  phone?: number;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @IsBoolean()
  @IsOptional()
  is_phone_verified?: boolean;

  @IsBoolean()
  @IsOptional()
  is_email_verified?: boolean;

  @IsString()
  @IsOptional()
  role_id?: string;

  @IsString()
  @IsOptional()
  role_code?: string;

  @IsString()
  @IsOptional()
  company_id?: string;

  @IsString()
  @IsOptional()
  updatedBy?: string;
}

export class UserDataResponse {
  id: string;
  name: string;
  email: string;
  phone: number;
  is_active: boolean;
  is_phone_verified: boolean;
  is_email_verified: boolean;
  role_id?: string;
  role_code?: string;
  company_id?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UserResponse {
  message: string;
  data: UserDataResponse;
}

export class FindAllUserResponse {
  message: string;
  data: UserDataResponse[];
}

export class DeleteUserResponse {
  message: string;
  data: Boolean;
}

// Additional DTOs for user-specific operations
export class ChangePasswordDto {
  @IsString()
  currentPassword: string;

  @IsString()
  newPassword: string;
}

export class VerifyEmailDto {
  @IsString()
  verificationToken: string;
}

export class VerifyPhoneDto {
  @IsString()
  verificationCode: string;
}