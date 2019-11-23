import { SignOptions } from 'jsonwebtoken';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';

const signOptions: SignOptions = {
  expiresIn: 3600,
};

export const jwtConstants = {
  secret: 'JWT-SECRET',
  signOptions,
};
