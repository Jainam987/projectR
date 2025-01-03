import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, IsBoolean, IsNumber } from 'class-validator';

export class CreatePasswordDto {
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdatePasswordDto extends PartialType(CreatePasswordDto) {
  @IsString()
  @IsNotEmpty()
  user_id?: string;

  @IsString()
  @IsNotEmpty()
  password?: string;

  @IsString()
  @IsNotEmpty()
  id?: string;
}

export type PasswordFindOneParam = { id: string; byUserId: boolean };

export type PasswordUpdateParam = {
  id: string;
  updatePasswordDto: UpdatePasswordDto;
  byUserId: boolean;
};

export type FindPasswordResponse = {
  id: string;
  password: string;
  is_active: boolean;
  user_id: string;  
};

export type PasswordResponse = {
  message: string;
};
