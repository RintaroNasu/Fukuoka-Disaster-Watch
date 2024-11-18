import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TsunamiService {
  constructor(private prisma: PrismaService) {}

  async getTsunami() {
    return this.prisma.fukuoka_water_info.findMany();
  }
}
