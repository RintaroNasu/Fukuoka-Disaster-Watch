import { Test, TestingModule } from '@nestjs/testing';
import { AiAnalysisController } from './ai-analysis.controller';

describe('AiAnalysisController', () => {
  let controller: AiAnalysisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AiAnalysisController],
    }).compile();

    controller = module.get<AiAnalysisController>(AiAnalysisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
