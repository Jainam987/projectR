import { IsEmail, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class AuthLoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class AuthRegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  phone: number;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  company_name: string;
}

export class AuthLogoutDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export type AuthRegisteResponse = {
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    phone: number;
    company_id: string;
    commpany_name: string;
  };
};
