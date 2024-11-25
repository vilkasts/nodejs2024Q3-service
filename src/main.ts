import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { LoggerService } from './tools/logger/logger.service';
import { ExceptionsFilter } from './tools/exceptions-filter/exceptions-filter';

async function bootstrap() {
  BigInt.prototype['toJSON'] = function () {
    return Number(this);
  };
  const app = await NestFactory.create(AppModule);
  const loggerService = app.get(LoggerService);
  app.useLogger(loggerService);

  app.use((req: any, res: any, next: () => void) => {
    const { method, url } = req;
    const chunks: Buffer[] = [];
    let bodyData = '';

    req.on('data', (chunk: any) => (bodyData += chunk));

    const send = res.send;

    res.send = function (chunk: any) {
      if (chunk)
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
      return send.apply(res, [chunk]);
    };

    res.on('finish', () => {
      const logMessage = `
      \nRequest: {url: ${url}, method: ${method}, body: ${JSON.stringify(
        JSON.parse(bodyData),
        null,
        0,
      )}}
      \nResponse: {status: ${res.statusCode}, body: ${Buffer.concat(
        chunks,
      ).toString('utf-8')}}`;

      if (res.statusCode >= 400) {
        loggerService.error(logMessage, 'HTTP');
      } else {
        loggerService.log(logMessage, 'HTTP');
      }
      console.log(logMessage);
    });
    next();
  });

  const config = new DocumentBuilder()
    .setTitle('Home Library Service API')
    .addBearerAuth()
    .build();

  process.on('uncaughtException', (error: Error) => {
    loggerService.error('Uncaught Exception', error?.stack);
  });

  process.on('unhandledRejection', (reason: any) => {
    loggerService.error('Unhandled Rejection', reason?.stack);
  });

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app
    .useGlobalPipes(new ValidationPipe())
    .useGlobalFilters(new ExceptionsFilter(loggerService))
    .listen(process.env.PORT);
}
bootstrap().then();
