import { SignOptions } from 'jsonwebtoken';

const signOptions: SignOptions = {
  expiresIn: 3600,
};

export const jwtConstants = {
  secret: 'JWT-SECRET',
  signOptions,
};
