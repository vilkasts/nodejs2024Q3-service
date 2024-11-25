import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { LoggerService } from './tools/logger/logger.service';

async function bootstrap() {
  BigInt.prototype['toJSON'] = function () {
    return Number(this);
  };
  const app = await NestFactory.create(AppModule);
  const loggerService = app.get(LoggerService);
  app.useLogger(loggerService);

  const config = new DocumentBuilder()
    .setTitle('Home Library Service API')
    .addBearerAuth()
    .build();

  process.on('uncaughtException', (error) => {
    loggerService.error('Uncaught Exception', error?.stack);
  });

  process.on('unhandledRejection', (reason: any) => {
    loggerService.error('Unhandled Rejection', reason?.stack);
  });

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.useGlobalPipes(new ValidationPipe()).listen(process.env.PORT);
}
bootstrap().then();
