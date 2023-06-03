/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentDto } from '../dto/comments.dto';
import { Comments } from '../entity/comments.entity';

@Injectable()
export class CommentRepository {
  constructor(
    @InjectRepository(Comments)
    private readonly repository: Repository<Comments>,
  ) {}
  async saveComment(data: CommentDto) {
    const { postId, userId, comment, parentId } = data;
    return await this.repository.save({
      postId,
      userId,
      comment,
      parentId,
    });
  }
  async getAllComment() {
    return await this.repository.find({
      relations: ['user', 'post', 'replies.user'],
    });
  }
}
