import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [PrismaService]
})
export class AuthModule {}
