import { Module } from '@nestjs/common';
import { PolygonController } from './polygon.controller';
import { PolygonService } from './polygon.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [PolygonController],
  providers: [PolygonService,PrismaService]
})
export class PolygonModule {}
