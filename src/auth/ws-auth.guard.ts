import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class WsAuthGuard extends AuthGuard('ws-jwt') implements CanActivate {
  logger = new Logger('WsAuthGuard');

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    this.getRequest(context);
    return true;
  }
  getRequest(context: ExecutionContext) {
    return context.switchToWs().getClient().handshake;
  }
}
