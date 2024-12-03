import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { sendMail } from 'src/utils/mailer';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async createComment(data: CreateCommentDto) {
    const comment = await this.prisma.comment.create({
      data,
    });

    await this.sendNotificationToUsers(comment);
    return comment;
  }

  private async sendNotificationToUsers(comment) {
    const users = await this.prisma.user.findMany({
      select: { email: true },
    });

    const subject = 'コメントが投稿されました。すぐに確認しましょう。';
    const text = `${comment.content}`;

    for (const user of users) {
      await sendMail(user.email, subject, text);
    }
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
