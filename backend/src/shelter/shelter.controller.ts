import { Controller, Get } from '@nestjs/common';
import { ShelterService } from './shelter.service';

@Controller('shelter')
export class ShelterController {
  constructor(private readonly shelterService: ShelterService) {}

  @Get()
  async getShelter() {
    return await this.shelterService.getShelter();
  }
}
