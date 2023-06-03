import { PostsDto } from './dto/posts.dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PostRepository } from './repositories/posts.repositories';
import { UserRepository } from 'src/user/repositories/user.repository';

@Injectable()
export class PostsService {
  constructor(
    private readonly postsRepo: PostRepository,
    private readonly userRepo: UserRepository,
  ) {}
  async SavePosts(data: PostsDto) {
    try {
      await this.postsRepo.savePost(data);
      return { success: true, message: 'Post saved' };
    } catch (err) {
      throw new HttpException(
        'Something went wrong, please try again',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async getAllPosts() {
    try {
      return await this.postsRepo.getAllPosts();
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async updateContent(data: any) {
    try {
      await this.postsRepo.updatePost(data?.id, {
        content: data?.content,
      });
      return { success: true, message: 'Content updated' };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async deleteContent(id: string) {
    try {
      await this.postsRepo.deletePost(id);
      return { success: true, message: 'Content deleted' };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
