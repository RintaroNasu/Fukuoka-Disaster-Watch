import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service'; // Prismaを使用する場合
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async createComment(data: CreateCommentDto) {
    return this.prisma.comment.create({
      data,
    });
  }

  async getComments() {
    return this.prisma.comment.findMany(); // 全コメントを取得
  }

  async deleteComment(commentId: string) {
    const parsedCommentId = parseInt(commentId, 10);
    return this.prisma.comment.delete({
      where: { id: parsedCommentId },
    });
  }
}
