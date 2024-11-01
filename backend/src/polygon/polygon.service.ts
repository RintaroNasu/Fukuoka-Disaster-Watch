import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PolygonService {
  constructor(private prisma: PrismaService) {}
  async getPolygon() {
    const polygons = await this.prisma.polygon.findMany();
    
    return polygons.map((polygon) => ({
      ...polygon,
      geometry: JSON.parse(JSON.parse(polygon.geometry)),
    }));
  }
}
