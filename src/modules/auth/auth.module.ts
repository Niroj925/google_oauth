import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { JwtService } from '@nestjs/jwt';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports:[TypeOrmModule.forFeature([Auth])],
  controllers: [AuthController],
  providers: [AuthService,JwtService,GoogleStrategy],
})
export class AuthModule {}
