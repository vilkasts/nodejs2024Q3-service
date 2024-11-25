import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import { createLogger, format, transports, Logger } from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

@Injectable()
class LoggerService implements NestLoggerService {
  private readonly logger: Logger;

  constructor() {
    this.logger = createLogger({
      level: process.env.LOG_LEVEL ?? 'info',
      format: format.combine(format.timestamp(), format.json()),
      transports: [
        new DailyRotateFile({
          filename: `${process.env.APP_LOG_FOLDER ?? 'logs/app'}/app.log`,
          datePattern: 'YYYY-MM-DD',
          level: 'info',
          maxSize: process.env.LOG_MAX_SIZE ?? '10m',
          maxFiles: '1d',
        }),
        new DailyRotateFile({
          filename: `${process.env.ERROR_LOG_FOLDER ?? 'logs/error'}/error.log`,
          datePattern: 'YYYY-MM-DD',
          level: 'error',
          maxSize: process.env.LOG_MAX_SIZE ?? '10m',
          maxFiles: '1d',
        }),
        new transports.Console({
          format: format.combine(format.colorize(), format.simple()),
        }),
      ],
    });
  }

  log(message: string, context?: string) {
    this.logger.info(message, { context });
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error(message, { trace, context });
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, { context });
  }
}

export { LoggerService };
