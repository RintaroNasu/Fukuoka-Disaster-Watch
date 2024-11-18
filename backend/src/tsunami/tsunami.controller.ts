import { Controller, Get } from '@nestjs/common';
import { TsunamiService } from './tsunami.service';

@Controller('tsunami')
export class TsunamiController {
  constructor(private readonly TsunamiService: TsunamiService) {}
  @Get()
  async getTsunami() {
    return await this.TsunamiService.getTsunami();
  }
}
