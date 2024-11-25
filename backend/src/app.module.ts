import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'prisma/prisma.module';
import { LandController } from './land/land.controller';
import { LandService } from './land/land.service';
import { LandModule } from './land/land.module';

@Module({
  imports: [PrismaModule, LandModule],
  controllers: [AppController, LandController],
  providers: [AppService, LandService],
})
export class AppModule {}
