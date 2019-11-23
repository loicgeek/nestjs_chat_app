import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TYPEORMCONFIG } from './config/typeorm.config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthModule,
    ChatModule,
    TypeOrmModule.forRoot(TYPEORMCONFIG),
    UserModule,
  ],
  controllers: [],
})
export class AppModule {}
