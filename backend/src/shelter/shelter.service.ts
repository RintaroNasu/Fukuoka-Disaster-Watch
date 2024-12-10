import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ShelterService {
  constructor(private prisma: PrismaService) {}
  async getShelter() {
    return this.prisma.shelterInfo.findMany();
  }
}
