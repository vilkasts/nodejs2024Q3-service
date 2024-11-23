import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthCheckService } from './tools/auth-check/auth-check.service';
import { TestAuthCheckService } from './tools/auth-check/test-auth-check.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  BigInt.prototype['toJSON'] = function () {
    return Number(this);
  };
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Home Library Service API')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app
    .useGlobalPipes(new ValidationPipe())
    .use(new TestAuthCheckService().use)
    .use(new AuthCheckService(app.get(AuthCheckService)).use)
    .listen(process.env.PORT);
}
bootstrap().then();
