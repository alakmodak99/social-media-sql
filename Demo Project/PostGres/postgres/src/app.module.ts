import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { PostsController } from './posts/posts.controller';
import { PostsService } from './posts/posts.service';
import { PostsModule } from './posts/posts.module';
import { ReactionsController } from './reactions/reactions.controller';
import { ReactionsService } from './reactions/reactions.service';
import { ReactionsModule } from './reactions/reactions.module';
import { CommentsController } from './comments/comments.controller';
import { CommentsService } from './comments/comments.service';
import { CommentsModule } from './comments/comments.module';
import { SocketsService } from './sockets/sockets.service';
import { SocketsModule } from './sockets/sockets.module';
@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: ConfigService,
    }),
    UserModule,
    PostsModule,
    ReactionsModule,
    CommentsModule,
    SocketsModule,
  ],
  controllers: [
    AppController,
    PostsController,
    ReactionsController,
    CommentsController,
  ],
  providers: [
    AppService,
    PostsService,
    ReactionsService,
    CommentsService,
    SocketsService,
  ],
})
export class AppModule {}
