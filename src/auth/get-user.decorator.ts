import { createParamDecorator } from '@nestjs/common';
import { User } from '../user/user.entity';

export const GetUser = createParamDecorator(
  (data, req): User | string => {
    if (data) {
      return req.user[data];
    }
    return req.user;
  },
);
