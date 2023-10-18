import {
  IsString,
  IsEmail,
  IsDefined,
  IsInt,
  IsPositive,
  IsIn,
} from 'class-validator';

export class UserDto {
  id: number;
  @IsString()
  @IsEmail()
  @IsDefined()
  email: string;

  @IsString()
  @IsDefined()
  name: string;
}

export class UserParamsDto {
  @IsInt()
  @IsPositive()
  id: number;
}
