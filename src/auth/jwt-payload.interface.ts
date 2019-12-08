import { ApiModelProperty } from '@nestjs/swagger';

export class JwtPayload {
  @ApiModelProperty()
  username: string;

  @ApiModelProperty()
  email: string;

  @ApiModelProperty()
  id: number;

  @ApiModelProperty()
  country: string;

  @ApiModelProperty({
    description: 'token issued Date',
    example: 1452244,
  })
  iat: number;

  @ApiModelProperty({
    description: 'Token expiration Date',
    example: 1455000,
  })
  exp: number;
}

export class JwtPayloadReponse {
  @ApiModelProperty()
  access_token: string;

  @ApiModelProperty({ type: JwtPayload })
  data: JwtPayload;
}
