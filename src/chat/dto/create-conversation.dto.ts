import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateConversationDTO {
  @IsNotEmpty()
  @ApiModelProperty()
  senderId: number;

  @IsNotEmpty()
  @ApiModelProperty()
  receiverId: number;

  @IsNotEmpty()
  @ApiModelProperty()
  message: string;
}
