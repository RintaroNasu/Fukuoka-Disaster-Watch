import { Body, Controller, Post } from '@nestjs/common';
import { LandService } from './land.service';
@Controller('land')
export class LandController {
  constructor(private readonly LandService: LandService) {}
  @Post()
  async getLand(@Body('searchCities') searchCities: string[]) {
    return await this.LandService.getLand(searchCities);
  }
}
