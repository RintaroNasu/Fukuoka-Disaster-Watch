import { Test, TestingModule } from '@nestjs/testing';
import { TsunamiController } from './tsunami.controller';

describe('TsunamiController', () => {
  let controller: TsunamiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TsunamiController],
    }).compile();

    controller = module.get<TsunamiController>(TsunamiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
