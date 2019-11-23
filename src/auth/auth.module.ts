import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from '../config/jwt.config';
import { JwtStrategy } from './jwt.strategy';
import { WsJwtStrategy } from './ws-jwt.strategy';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: jwtConstants.signOptions,
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, WsJwtStrategy],
  exports: [JwtStrategy, PassportModule, WsJwtStrategy],
})
export class AuthModule {}
