import { Module } from '@nestjs/common';
import { LandController } from './land.controller';
import { LandService } from './land.service';
import { PrismaService } from 'prisma/prisma.service';
@Module({
  controllers: [LandController],
  providers: [LandService, PrismaService],
})
export class LandModule {}
