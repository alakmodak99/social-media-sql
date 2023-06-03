// import { ReplyDto } from './dto/replies.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CommentDto } from './dto/comments.dto';
import { CommentRepository } from './repositories/comments.repositories';

@Injectable()
export class CommentsService {
  constructor(private readonly commentRepo: CommentRepository) {}
  async getAllComments() {
    try {
      return await this.commentRepo.getAllComment();
    } catch (err) {
      throw new HttpException(
        'Something went wrong, please try again',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async SaveComment(data: CommentDto) {
    try {
      if (!data.parentId) data.parentId = null;
      await this.commentRepo.saveComment(data);
      return { success: true, message: 'Comment saved' };
    } catch (err) {
      throw new HttpException(
        'Something went wrong, please try again',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
