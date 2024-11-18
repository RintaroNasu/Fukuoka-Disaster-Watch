import { Module } from '@nestjs/common';
import { TsunamiController } from './tsunami.controller';
import { TsunamiService } from './tsunami.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [TsunamiController],
  providers: [TsunamiService, PrismaService],
})
export class TsunamiModule {}
