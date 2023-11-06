import { PartialType } from '@nestjs/mapped-types';

import { IsString, IsEmail, IsDefined } from 'class-validator';

export class CreateUserDto {
  id: number;
  @IsString()
  @IsEmail()
  @IsDefined()
  email: string;

  @IsString()
  @IsDefined()
  name: string;
}

export class UserUpdateDto extends PartialType(CreateUserDto) {}
