import { Module } from '@nestjs/common';
import { ShelterService } from './shelter.service';
import { PrismaService } from 'prisma/prisma.service';
import { ShelterController } from './shelter.controller';

@Module({
  controllers: [ShelterController],
  providers: [ShelterService, PrismaService],
})
export class ShelterModule {}
