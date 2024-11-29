import { Injectable } from '@nestjs/common';
import { PrismaService } from "prisma/prisma.service"; // Prismaを使用する場合

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async createComment(data: { lat: number; lng: number; content: string; createdAt: string}) {
    return this.prisma.comment.create({
      data,
    });
  }

  async getComments() {
    return this.prisma.comment.findMany(); // 全コメントを取得
  }
}
