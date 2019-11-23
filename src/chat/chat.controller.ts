import {
  Controller,
  Post,
  UseGuards,
  Param,
  ParseIntPipe,
  Body,
  Query,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../user/user.entity';
import { NotNullPipe } from '../auth/pipes/not-null.pipe';
import { FilterConversation } from './dto/filter-conversation.dto';
import { ConversationService } from './conversation.service';
import { CreateConversationDTO } from './dto/create-conversation.dto';
import { Get, ValidationPipe } from '@nestjs/common';
import { Conversation } from './conversation.entity';

@Controller('chat')
@UseGuards(AuthGuard('jwt'))
export class ChatController {
  constructor(private conversationService: ConversationService) {}

  @Post(':receiverId/sendMessage')
  sendMessage(
    @GetUser() user: User,
    @Param('receiverId', ParseIntPipe) receiverId: number,
    @Body('message', NotNullPipe) message: string,
  ) {
    const createConversationDTO = new CreateConversationDTO();
    createConversationDTO.senderId = user.id;
    createConversationDTO.receiverId = receiverId;
    createConversationDTO.message = message;
    return this.conversationService.saveConversation(createConversationDTO);
  }

  @Get(':receiverId/messages')
  getMessages(
    @GetUser() user: User,
    @Param('receiverId', ParseIntPipe) receiverId: number,
    @Query() filter: FilterConversation,
  ) {
    return this.conversationService.getConversation(
      user.id,
      receiverId,
      filter,
    );
  }

  @Get('messages')
  getMyMessages(@GetUser() user: User, @Query() filter: FilterConversation) {
    return this.conversationService.getConversation(user.id, null, filter);
  }

  @Post(':receiverId/markAsRead')
  markAsRead(@Body(ValidationPipe) conversation: Conversation) {
    return this.conversationService.markAllBeforeAsRead(conversation);
  }

  @Delete(':receiverId/delete/:conversationId')
  delete(
    @Query(ParseIntPipe) conversationId: number,
    @Query(ParseIntPipe) receiverId: number,
    @GetUser() user: User,
  ) {
    return this.conversationService.deleteConversation(conversationId, user);
  }
}
