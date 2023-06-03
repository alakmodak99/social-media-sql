import { UserRepository } from './../user/repositories/user.repository';
import { PostRepository } from './repositories/posts.repositories';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './entity/posts.entity';
import { User } from 'src/user/entity/user.entity';
import { UserModule } from 'src/user/user.module';
import { Reactions } from 'src/reactions/entity/reactions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Posts, User, Reactions]), UserModule],
  controllers: [PostsController],
  providers: [PostsService, PostRepository, UserRepository],
  exports: [PostsService, PostRepository],
})
export class PostsModule {}
