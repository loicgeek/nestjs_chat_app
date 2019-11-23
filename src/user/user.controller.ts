import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { GetUser } from '../auth/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getUsers(@GetUser() user: User): Promise<User[]> {
    const users: User[] = await this.userService.getUsers();

    return users
      .map(u => {
        delete u.password;
        delete u.salt;
        return u;
      })
      .filter(u => u.id !== user.id);
  }
}
