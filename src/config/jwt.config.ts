import { SignOptions, DecodeOptions } from 'jsonwebtoken';

const signOptions: SignOptions = {
  expiresIn: 3600,
};

const rSignOptions: SignOptions = {
  expiresIn: 36000,
};

const rDecodeOptions: DecodeOptions = {
  json: true,
  complete: false,
};

export const jwtConstants = {
  secret: 'JWT-SECRET',
  signOptions,
  rSignOptions,
  rDecodeOptions,
};
