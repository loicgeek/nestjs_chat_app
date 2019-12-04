import { Injectable } from '@nestjs/common';
import * as FacebookTokenStrategy from 'passport-facebook-token';
import { use } from 'passport';
import { UserService } from '../user/user.service';
import { FbCreds } from '../config/fb-creds.config';

@Injectable()
export class FacebookStrategy {
  constructor(private readonly userService: UserService) {
    this.init();
  }
  init() {
    use(
      new FacebookTokenStrategy(
        {
          clientID: FbCreds.APP_CLIENT_ID,
          clientSecret: FbCreds.APP_CLIENT_SECRET,
        },
        async (
          accessToken: string,
          refreshToken: string,
          profile: any,
          done: any,
        ) => {
          const user = await this.userService.findOrCreateSocialUser(profile);
          return done(null, user);
        },
      ),
    );
  }
}
