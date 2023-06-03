import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guards';
import { CommentsService } from './comments.service';
import { CommentDto } from './dto/comments.dto';
// import { ReplyDto } from './dto/replies.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}
  @Get('all-comments')
  async getAllCommentData() {
    return this.commentService.getAllComments();
  }
  @UseGuards(AuthGuard)
  @Post('save-comment')
  savePost(@Req() req: any, @Body(ValidationPipe) data: CommentDto) {
    return this.commentService.SaveComment(data);
  }
}
