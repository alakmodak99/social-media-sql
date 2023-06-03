import { Controller, Get, ValidationPipe } from '@nestjs/common';
import {
  Req,
  UseGuards,
  Body,
  Post,
  Delete,
  Patch,
} from '@nestjs/common/decorators';
import { AuthGuard } from 'src/guards/auth.guards';
import { PostsDto } from './dto/posts.dto';
import { DeletePostsDto, UpdatePostsDto } from './dto/updatePost.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Get('all-posts')
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @UseGuards(AuthGuard)
  @Post('save-posts')
  savePost(@Req() req, @Body(ValidationPipe) data: PostsDto) {
    return this.postsService.SavePosts(data);
  }

  @UseGuards(AuthGuard)
  @Patch('update-post')
  updatePost(@Req() req, @Body(ValidationPipe) data: UpdatePostsDto) {
    return this.postsService.updateContent({
      id: data?.id,
      content: data?.content,
    });
  }

  @UseGuards(AuthGuard)
  @Delete('delete-post')
  deletePost(@Req() req, @Body(ValidationPipe) data: DeletePostsDto) {
    return this.postsService.deleteContent(data.id);
  }
}
