import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class MarkAsReadConversationDTO {
  @IsNotEmpty()
  @ApiModelProperty()
  senderId: number;

  @IsNotEmpty()
  @ApiModelProperty()
  receiverId: number;

  @IsNotEmpty()
  @ApiModelProperty({ type: String })
  createdAt: Date;
}
