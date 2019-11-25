import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  password: string;
}
