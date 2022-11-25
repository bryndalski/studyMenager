import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterUserDTO {
  @IsEmail()
  email: string;

  @MinLength(7)
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}
