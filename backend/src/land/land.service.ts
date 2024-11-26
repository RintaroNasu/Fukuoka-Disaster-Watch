import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';
@Injectable()
export class LandService {
  constructor(private prisma: PrismaService) {}
  async getLand(searchCity: string) {
    return this.prisma.fukuoka_land_info.findMany({
      where: {
        address: {
          contains: searchCity,
        },
      },
    });
  }
}
