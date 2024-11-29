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

@Module({
  imports: [PrismaModule, LandModule, AiAnalysisModule, CommentsModule],
  controllers: [AppController, LandController, AiAnalysisController, CommentsController],
  providers: [AppService, LandService, AiAnalysisService, CommentsService],
})
export class AppModule {}
