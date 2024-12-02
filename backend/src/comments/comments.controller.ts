import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async createComment(@Body() data: CreateCommentDto) {
    return this.commentsService.createComment(data);
  }

  @Get()
  async getComments() {
    return this.commentsService.getComments();
  }
  @Delete('/:commentId')
  async deleteComment(@Param('commentId') commentId: string) {
    return this.commentsService.deleteComment(commentId);
  }
}
