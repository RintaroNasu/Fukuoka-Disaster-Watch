import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'prisma/prisma.module';
import { TsunamiController } from './tsunami/tsunami.controller';
import { TsunamiService } from './tsunami/tsunami.service';
import { TsunamiModule } from './tsunami/tsunami.module';
import { LandController } from './land/land.controller';
import { LandService } from './land/land.service';
import { LandModule } from './land/land.module';

@Module({
  imports: [PrismaModule, TsunamiModule, LandModule],
  controllers: [AppController, TsunamiController, LandController],
  providers: [AppService, TsunamiService, LandService],
})
export class AppModule {}
