import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';
@Injectable()
export class LandService {
  constructor(private prisma: PrismaService) {}
  async getLand(searchCities: string[]) {
    return this.prisma.fukuoka_land_info.findMany({
      where: {
        OR: searchCities.map((city) => ({
          address: {
            contains: city,
          },
        })) as Prisma.Fukuoka_land_infoWhereInput[],
      },
    });
  }
}
