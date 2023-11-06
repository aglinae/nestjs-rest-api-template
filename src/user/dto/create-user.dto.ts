import { IsDefined, IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  email: string;
}
