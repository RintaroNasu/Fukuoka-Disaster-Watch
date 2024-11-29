import { Controller, Get, Post, Body} from '@nestjs/common';
import { CommentsService } from "./comments.service";

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async createComment(@Body() data: { lat: number; lng: number; content: string; createdAt: string}) {
    return this.commentsService.createComment(data);
  }

  @Get()
  async getComments() {
    return this.commentsService.getComments();
  }
}
