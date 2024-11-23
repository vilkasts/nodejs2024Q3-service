import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthCheckService } from './tools/auth-check/auth-check.service';

async function bootstrap() {
  BigInt.prototype['toJSON'] = function () {
    return Number(this);
  };
  const app = await NestFactory.create(AppModule);
  await app
    .useGlobalPipes(new ValidationPipe())
    .use(new AuthCheckService(app.get(AuthCheckService)).use)
    .listen(process.env.PORT);
}
bootstrap().then();
