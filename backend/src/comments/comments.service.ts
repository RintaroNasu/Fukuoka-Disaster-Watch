import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
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
    return this.prisma.comment.findMany();
  }

  async deleteComment(commentId: string) {
    const parsedCommentId = parseInt(commentId, 10);
    return this.prisma.comment.delete({
      where: { id: parsedCommentId },
    });
  }
}
