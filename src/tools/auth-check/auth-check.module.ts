import { Module } from '@nestjs/common';
import { AuthCheckService } from './auth-check.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [AuthCheckService, JwtService],
  exports: [AuthCheckService],
})
export class AuthCheckModule {}
