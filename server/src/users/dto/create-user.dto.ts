import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

import { Role } from '../types/enum/role';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  surname: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsInt()
  @Min(0)
  @Max(150)
  age: number;

  @IsOptional()
  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  district: string;

  @IsOptional()
  @IsEnum(Role)
  role: Role;
}
