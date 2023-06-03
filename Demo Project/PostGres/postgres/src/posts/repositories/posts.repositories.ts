/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostsDto } from '../dto/posts.dto';
import { Posts } from '../entity/posts.entity';
@Injectable()
export class PostRepository {
  constructor(
    @InjectRepository(Posts)
    private readonly repository: Repository<Posts>,
  ) {}
  async savePost(data: PostsDto) {
    const { content, userId } = data;
    return await this.repository.save({
      content,
      userId,
    });
  }

  async getAllPosts(): Promise<any> {
    return await this.repository.find({
      relations: [
        'created_by',
        'likes.user',
        'comments.user',
        'comments.replies.user',
      ],
    });
  }

  async updatePost(id: string, updatedField: object) {
    return this.repository.update({ id }, updatedField);
  }
  async deletePost(id: string) {
    return this.repository.delete({ id });
  }
}
