import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import * as bcriptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AuthUserDTO } from './dto/auth-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(createUserDTO: CreateUserDTO) {
    const { username, email, password, country } = createUserDTO;

    const exist = await this.userService.findUserbyEmail(email);
    if (exist) {
      throw new BadRequestException('email already taken');
    }
    const user = new User();
    user.email = email;
    user.username = username;
    user.country = country;
    user.salt = await bcriptjs.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    await this.userService.saveUser(user);
    return user;
  }

  async signin(authUserDTO: AuthUserDTO, hashed: boolean = false) {
    const user: User = await this.userService.findByUsernameOrEmail(
      authUserDTO.username,
    );
    if (!user) {
      throw new UnauthorizedException('user not found');
    }

    if (hashed === false) {
      if (!(await user.validatePassword(authUserDTO.password))) {
        throw new UnauthorizedException('Authentication Failed');
      }
    } else {
      if (user.password !== authUserDTO.password) {
        throw new UnauthorizedException('Authentication Failed');
      }
    }

    const payload = {
      username: user.username,
      email: user.email,
      userId: user.id,
      country: user.country,
    };
    const accessToken = await this.jwtService.sign(payload);
    const decode = this.jwtService.decode(accessToken);
    return { accessToken, data: decode };
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcriptjs.hash(password, salt);
  }

  decodeToken(accessToken: string) {
    return this.jwtService.decode(accessToken);
  }
}
