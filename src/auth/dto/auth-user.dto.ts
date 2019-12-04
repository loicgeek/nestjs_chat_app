import { IsNotEmpty } from 'class-validator';

import { ApiModelProperty } from '@nestjs/swagger';

export class AuthUserDTO {
  @IsNotEmpty()
  @ApiModelProperty()
  username: string;

  @IsNotEmpty()
  @ApiModelProperty()
  password: string;
}
