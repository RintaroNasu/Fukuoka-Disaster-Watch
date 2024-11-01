import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'prisma/prisma.module';
import { PolygonModule } from './polygon/polygon.module';

@Module({
  imports: [PrismaModule, PolygonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
