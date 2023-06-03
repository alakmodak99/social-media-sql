import { Injectable } from '@nestjs/common';
import { CommentsService } from 'src/comments/comments.service';
import { PostsService } from 'src/posts/posts.service';
import { ReactionsService } from 'src/reactions/reactions.service';

@Injectable()
export class SocketsService {
  constructor(
    private readonly commentService: CommentsService,
    private readonly likeService: ReactionsService,
    private readonly createPostService: PostsService,
  ) {}
  async likePost(data: any) {
    const post = await this.likeService.SaveReaction(data);
    return post;
  }
  async commentPost(data: any) {
    const post = await this.commentService.SaveComment(data);
    return post;
  }
  async createPost(data: any) {
    const post = await this.createPostService.SavePosts(data);
    return post;
  }
}
