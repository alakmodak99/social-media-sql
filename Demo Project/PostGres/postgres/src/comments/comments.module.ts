import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from 'src/posts/entity/posts.entity';
import { User } from 'src/user/entity/user.entity';
import { UserModule } from 'src/user/user.module';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { Comments } from './entity/comments.entity';
import { CommentRepository } from './repositories/comments.repositories';

@Module({
  imports: [TypeOrmModule.forFeature([User, Posts, Comments]), UserModule],
  controllers: [CommentsController],
  providers: [CommentsService, CommentRepository],
  exports: [CommentsService, CommentRepository],
})
export class CommentsModule {}
