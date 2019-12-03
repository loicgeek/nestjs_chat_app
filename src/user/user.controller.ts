import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { GetUser } from '../auth/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiUseTags,
  ApiOkResponse,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { FilterUserDTO } from './dto/filter-user.dto';

@Controller('users')
@ApiUseTags('Users Managnement')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOkResponse({
    isArray: true,
    type: User,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async getUsers(
    @GetUser() user: User,
    @Query() filter: FilterUserDTO,
  ): Promise<User[]> {
    const users: User[] = await this.userService.getUsers(filter);
    return users
      .map(u => {
        delete u.password;
        delete u.salt;
        return u;
      })
      .filter(u => u.id !== user.id);
  }
}
