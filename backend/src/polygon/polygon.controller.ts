import { Controller, Get } from '@nestjs/common';
import { PolygonService } from './polygon.service';

@Controller('polygon')
export class PolygonController {
  constructor(private readonly polygonService: PolygonService) {}

  @Get()
  async getPolygon(){
    return await this.polygonService.getPolygon();
  }

}

