import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Client, Server } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { Logger } from '@nestjs/common';
import { jwtConstants } from '../config/jwt.config';

@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  logger = new Logger('ChatGateway');
  onlineUsers = new Set();
  user: any;

  @WebSocketServer()
  wss: Server;

  constructor(private jwtService: JwtService) {}
  handleConnection(socket: Socket, ...args: any[]) {
    this.logger.log(socket.handshake.query);
    const user = this.getUser(socket);
    if (!user) {
      socket.disconnect();
      this.logger.error('authentication failed ' + socket.id);
    } else {
      this.logger.warn(user);
      this.logger.warn(
        'authentication success! ' + user.username + ' - id:' + user.id,
      );
      this.onlineUsers.add(user.id);
      this.dispatchUsersOnline();
    }
  }

  handleDisconnect(socket: Socket) {
    const user: any = this.getUser(socket);
    this.onlineUsers.delete(user.id);
    this.logger.warn('user disconnected ' + user.username + ' - id:' + user.id);
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
