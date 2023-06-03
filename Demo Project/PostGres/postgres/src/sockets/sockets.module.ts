import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsModule } from 'src/comments/comments.module';
import { Comments } from 'src/comments/entity/comments.entity';
import { Posts } from 'src/posts/entity/posts.entity';
import { PostsModule } from 'src/posts/posts.module';
import { ReactionsModule } from 'src/reactions/reactions.module';
import { User } from 'src/user/entity/user.entity';
import { UserModule } from 'src/user/user.module';
import { MySocketGateway } from './socket.gateway';
import { SocketsService } from './sockets.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Posts, Comments]),
    UserModule,
    CommentsModule,
    ReactionsModule,
    PostsModule,
  ],
  providers: [MySocketGateway, SocketsService],
  exports: [SocketsService],
})
export class SocketsModule {}
