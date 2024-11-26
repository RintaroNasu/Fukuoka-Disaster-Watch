import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import { regionFeatures } from 'src/utils/regionFeature';

@Injectable()
export class AiAnalysisService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  async getAiAnalysis(city: string, region: string): Promise<any> {
    const regionData = regionFeatures[region];
    if (!regionData) {
      return { error: 'Region not found.' };
    }

    const prompt = `
    ${region} にある都市 ${city} の災害リスクに関するアドバイスを提供してください。
      この地域には次の特徴があります:
      - 人口密度: ${regionData.people_density}
      - 地理的特徴: ${regionData.feature}
      - 災害リスク: ${regionData.disaster}
      この地域で起こりうる災害に備えるために、住民に実行可能な推奨事項を3文程度で提供してください。`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'system', content: prompt }],
    });

    return { advice: response.choices[0]?.message?.content.trim() };
  }
}
