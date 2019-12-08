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
import { SignOptions } from 'jsonwebtoken';
import { jwtConstants } from '../config/jwt.config';

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
        throw new UnauthorizedException('Password Mismatch');
      }
    } else {
      if (user.password !== authUserDTO.password) {
        throw new UnauthorizedException('Password Mismatch');
      }
    }

    return this.generateAuthSuccessResponse(user);
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcriptjs.hash(password, salt);
  }

  decodeToken(accessToken: string) {
    return this.jwtService.decode(accessToken);
  }

  async generateAuthSuccessResponse(user: User, isRefresh: boolean = false) {
    console.log(`refresh token `, isRefresh);
    console.log(`authService `, user);
    const payload = {
      username: user.username,
      email: user.email,
      id: user.id,
      country: user.country,
    };
    const accessToken = await this.jwtService.sign(payload);
    const refreshToken = await this.jwtService.sign(
      payload,
      jwtConstants.rSignOptions,
    );
    const decoded = this.jwtService.decode(accessToken);
    return { accessToken, refreshToken, data: decoded };
  }

  async refreshToken(accessToken: string) {
    const user: any = this.jwtService.decode(accessToken);
    if (!user) {
      throw new UnauthorizedException('user not found');
    }
    return await this.generateAuthSuccessResponse(user, true);
  }
}
