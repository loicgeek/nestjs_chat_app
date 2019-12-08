import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Get,
  Req,
  Query,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { NotNullPipe } from './pipes/not-null.pipe';
import {
  ApiUseTags,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiProduces,
  ApiUnauthorizedResponse,
  ApiCreatedResponse,
  ApiImplicitQuery,
} from '@nestjs/swagger';
import { AuthUserDTO } from './dto/auth-user.dto';
import { JwtPayloadReponse } from './jwt-payload.interface';
import { AuthGuard } from '@nestjs/passport';
import { IsNotEmpty } from 'class-validator';

@ApiUseTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBadRequestResponse({
    description: 'make sure all field are filled and valid',
  })
  @ApiCreatedResponse({
    description: 'User Successfully created',
  })
  signup(@Body(ValidationPipe) createUserDTO: CreateUserDTO) {
    return this.authService.signup(createUserDTO);
  }

  @Post('/signin')
  @ApiBadRequestResponse({
    description: 'username | password coul not be null',
  })
  @ApiUnauthorizedResponse({ description: 'Authentication Failed' })
  @ApiOkResponse({
    description: 'access token and User Data',
    type: JwtPayloadReponse,
  })
  @ApiProduces('application/json')
  async signin(@Body(ValidationPipe) authUserDTO: AuthUserDTO) {
    return this.authService.signin(authUserDTO);
  }

  @Get('/refresh')
  @ApiUnauthorizedResponse({ description: 'Access Token infalid' })
  @ApiOkResponse({
    description: 'access token,refresh token and User Data',
    type: JwtPayloadReponse,
  })
  @ApiProduces('application/json')
  async refreshToken(@Query('accessToken', NotNullPipe) accessToken: string) {
    console.log(accessToken);
    return this.authService.refreshToken(accessToken);
  }

  @UseGuards(AuthGuard('facebook-token'))
  @Get('facebook')
  @ApiImplicitQuery({ name: 'session_token', type: String })
  async getTokenAfterFacebookSignIn(@Req() req) {
    const authUserDTO = new AuthUserDTO();
    authUserDTO.password = req.user.password;
    authUserDTO.username = req.user.username;
    return this.authService.signin(authUserDTO, true);
  }
}
