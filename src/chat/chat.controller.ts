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
import { MarkAsReadConversationDTO } from './dto/markAsRead.dto';
import {
  ApiUseTags,
  ApiImplicitParam,
  ApiResponse,
  ApiImplicitQuery,
  ApiBearerAuth,
  ApiImplicitBody,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Controller('chat')
@UseGuards(AuthGuard('jwt'))
@ApiUseTags('Chat Managment')
@ApiResponse({
  status: 401,
  description: 'Unauthorized',
})
@ApiBearerAuth()
export class ChatController {
  constructor(private conversationService: ConversationService) {}

  @Post(':receiverId/sendMessage')
  @ApiImplicitParam({ name: 'receiverId', type: Number })
  @ApiImplicitBody({ name: 'message', type: String })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiOperation({
    title: 'Send message to the specified ReceiverId uSER',
  })
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
  @ApiImplicitParam({ name: 'receiverId', type: Number })
  @ApiOkResponse({ type: Conversation, isArray: true })
  @ApiOperation({
    title: 'Retrieve all messages of the current user with the receiverId user',
  })
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
  @ApiOkResponse({ type: Conversation, isArray: true })
  @ApiOperation({ title: 'Retrieve all messages of the current user' })
  getMyMessages(@GetUser() user: User, @Query() filter: FilterConversation) {
    return this.conversationService.getConversation(user.id, null, filter);
  }

  @Post(':receiverId/markAsRead')
  @ApiOperation({
    title: 'Mark all message before the current as read (in this conversation)',
  })
  markAsRead(@Body(ValidationPipe) conversation: MarkAsReadConversationDTO) {
    return this.conversationService.markAllBeforeAsRead(conversation);
  }

  @Delete('delete/:conversationId')
  @ApiImplicitQuery({ name: 'receiverId', type: Number })
  @ApiImplicitQuery({ name: 'conversationId', type: Number })
  @ApiOperation({ title: 'Delete the Specified Message ' })
  delete(@Query(ParseIntPipe) conversationId: number, @GetUser() user: User) {
    return this.conversationService.deleteConversation(conversationId, user);
  }
}
