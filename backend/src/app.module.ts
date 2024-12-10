import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'prisma/prisma.module';
import { LandController } from './land/land.controller';
import { LandService } from './land/land.service';
import { LandModule } from './land/land.module';
import { AiAnalysisController } from './ai-analysis/ai-analysis.controller';
import { AiAnalysisService } from './ai-analysis/ai-analysis.service';
import { AiAnalysisModule } from './ai-analysis/ai-analysis.module';
import { CommentsController } from './comments/comments.controller';
import { CommentsService } from './comments/comments.service';
import { CommentsModule } from './comments/comments.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { ShelterController } from './shelter/shelter.controller';
import { ShelterModule } from './shelter/shelter.module';
import { ShelterService } from './shelter/shelter.service';

@Module({
  imports: [
    PrismaModule,
    LandModule,
    AiAnalysisModule,
    AuthModule,
    CommentsModule,
    ShelterModule,
  ],
  controllers: [
    AppController,
    LandController,
    AiAnalysisController,
    AuthController,
    CommentsController,
    ShelterController,
  ],
  providers: [
    AppService,
    LandService,
    AiAnalysisService,
    AuthService,
    CommentsService,
    ShelterService,
  ],
})
export class AppModule {}
