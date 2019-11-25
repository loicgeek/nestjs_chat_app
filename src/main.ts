import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const logger = new Logger('boostrapp');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'static'));
  app.setGlobalPrefix('api');
  const port = process.env.PORT || 3000;
  await app.listen(port).then(() => {
    logger.log('listenning on port :' + port);
  });
}
bootstrap();
