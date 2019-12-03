import { Injectable } from '@nestjs/common';
import { ConversationRepository } from './conversation.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterConversation } from './dto/filter-conversation.dto';
import { Conversation } from './conversation.entity';
import { CreateConversationDTO } from './dto/create-conversation.dto';
import { User } from '../user/user.entity';
import { ChatGateway } from './chat.gateway';
import { chatGatewayConst } from '../config/chat.config';
import { MarkAsReadConversationDTO } from './dto/markAsRead.dto';

Injectable();
export class ConversationService {
  constructor(
    @InjectRepository(ConversationRepository)
    private conversationRepo: ConversationRepository,
    private chatGateway: ChatGateway,
  ) {}

  async getConversation(
    senderId: number,
    receiverId: number,
    filter: FilterConversation,
  ): Promise<Conversation[]> {
    return this.conversationRepo.getConversation(senderId, receiverId, filter);
  }

  async saveConversation(createConversationDTO: CreateConversationDTO) {
    const result: Conversation = await this.conversationRepo.saveConversation(
      createConversationDTO,
    );
    this.chatGateway.wss.emit(
      chatGatewayConst.newMessageToUserChannel + result.receiverId,
      result,
    );
    return result;
  }

  async markAllBeforeAsRead(conversation: MarkAsReadConversationDTO) {
    return this.conversationRepo.markAllBeforeAsRead(conversation);
  }

  async deleteConversation(conversationId: number, user: User) {
    return this.conversationRepo.deleteConversation(conversationId, user);
  }
}
