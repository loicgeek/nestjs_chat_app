import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { ChatModule } from '../chat/chat.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [UserService, ChatModule],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
