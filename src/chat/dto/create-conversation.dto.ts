import { IsNotEmpty } from 'class-validator';

export class CreateConversationDTO {
  @IsNotEmpty()
  senderId: number;

  @IsNotEmpty()
  receiverId: number;

  @IsNotEmpty()
  message: string;
}
