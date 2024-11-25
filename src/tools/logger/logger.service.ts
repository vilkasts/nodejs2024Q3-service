import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { ErrorsEnum } from '../../helpers/enums';

@Injectable()
class LoggerService implements NestLoggerService {
  private readonly levels = ['error', 'warn', 'info'];
  private readonly logDir = path.resolve(process.env.LOG_DIR ?? 'logs');
  private readonly logLevel = Number(process.env.LOG_LEVEL ?? 2);
  private readonly maxFileSize =
    Number(process.env.LOG_MAX_SIZE ?? 1024) * 1024;

  constructor() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  private createLog(level: string, message = '', context = '') {
    const logFile = path.join(this.logDir, `${level}.log`);
    const logMessage = `${new Date().toISOString()} [${level.toUpperCase()}] (${context}) ${message}\n`;

    if (
      fs.existsSync(logFile) &&
      fs.statSync(logFile).size > this.maxFileSize
    ) {
      fs.renameSync(logFile, `${logFile}.${Date.now()}`);
    }

    fs.appendFile(logFile, logMessage, (error) => {
      if (error) console.error(ErrorsEnum.LogsFailure);
    });
  }

  private checkLevel(level: string): boolean {
    return this.levels.indexOf(level) <= this.logLevel;
  }

  public log(message: string, context?: string) {
    if (this.checkLevel('info')) this.createLog('info', message, context);
  }

  public error(message: string, context?: string) {
    if (this.checkLevel('error')) {
      this.createLog('error', message, context);
    }
  }

  public warn(message: string, context?: string) {
    if (this.checkLevel('warn')) this.createLog('warn', message, context);
  }
}

export { LoggerService };
