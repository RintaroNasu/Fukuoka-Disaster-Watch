import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'prisma/prisma.module';
import { TsunamiController } from './tsunami/tsunami.controller';
import { TsunamiService } from './tsunami/tsunami.service';
import { TsunamiModule } from './tsunami/tsunami.module';

@Module({
  imports: [PrismaModule, TsunamiModule],
  controllers: [AppController, TsunamiController],
  providers: [AppService, TsunamiService],
})
export class AppModule {}
