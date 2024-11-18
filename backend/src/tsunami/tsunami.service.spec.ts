import { Test, TestingModule } from '@nestjs/testing';
import { TsunamiService } from './tsunami.service';

describe('TsunamiService', () => {
  let service: TsunamiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TsunamiService],
    }).compile();

    service = module.get<TsunamiService>(TsunamiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
