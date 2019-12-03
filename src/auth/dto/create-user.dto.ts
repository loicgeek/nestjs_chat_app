import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @IsNotEmpty()
  @ApiModelProperty()
  username: string;

  @IsEmail()
  @ApiModelProperty()
  email: string;

  @IsNotEmpty()
  @ApiModelProperty({ example: 'Cameroon' })
  country: string;

  @IsNotEmpty()
  @ApiModelProperty()
  password: string;
}
