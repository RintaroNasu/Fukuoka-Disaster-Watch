import { Body, Controller, Post } from '@nestjs/common';
import { AiAnalysisService } from './ai-analysis.service';

@Controller('ai-analysis')
export class AiAnalysisController {
  constructor(private readonly aiAnalysisService: AiAnalysisService) {}
  @Post()
  async getAiAnalysis(@Body() body: { city: string; region: string }) {
    const { city, region } = body;

    if (!city || !region) {
      return { error: 'City and region are required.' };
    }
    return await this.aiAnalysisService.getAiAnalysis(city, region);
  }
}
