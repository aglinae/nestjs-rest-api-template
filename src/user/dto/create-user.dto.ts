import { IsDefined, IsString, IsEmail } from '@nestjs/class-validator';
export class CreateUserDto {
  @IsString()
  @IsDefined()
  name: string;

  @IsEmail()
  @IsString()
  @IsDefined()
  email: string;
}
