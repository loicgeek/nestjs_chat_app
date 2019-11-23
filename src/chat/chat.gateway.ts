import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { UseGuards, Logger } from '@nestjs/common';
import { WsAuthGuard } from '../auth/ws-auth.guard';
import { Socket, Client, Server } from 'socket.io';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  logger = new Logger('ChatGateway');
  onlineUsers = new Set();
  user: any;

  @WebSocketServer()
  wss: Server;

  constructor(private jwtService: JwtService) {}

  @UseGuards(WsAuthGuard)
  handleConnection(socket: Socket, ...args: any[]) {
    const user = this.getUser(socket);
    if (!user) {
      socket.disconnect();
      this.logger.error('authentication failed ' + socket.id);
    } else {
      this.logger.warn('authentication success! ' + user.username);
      this.onlineUsers.add(user.userId);
      this.dispatchUsersOnline();
    }
  }

  handleDisconnect(socket: Socket) {
    const user: any = this.getUser(socket);
    this.onlineUsers.delete(user.userId);
    this.logger.warn('user disconnected ' + user.username);
    this.dispatchUsersOnline();
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    this.logger.log(payload);
    return payload;
  }

  private dispatchUsersOnline() {
    this.logger.log(Array.from(this.onlineUsers));
    this.wss.emit('users/online', Array.from(this.onlineUsers));
  }

  private getUser(socket: Socket) {
    const token = socket.handshake.query.token;
    const user: any = this.jwtService.decode(token);
    return user;
  }
}
