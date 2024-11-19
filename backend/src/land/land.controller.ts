import { Controller, Get } from '@nestjs/common';
import { LandService } from './land.service';
@Controller('land')
export class LandController {
  constructor(private readonly LandService: LandService) {}
  @Get()
  async getLand() {
    return await this.LandService.getLand();
  }
}