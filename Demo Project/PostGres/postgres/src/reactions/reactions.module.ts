import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from 'src/posts/entity/posts.entity';
import { User } from 'src/user/entity/user.entity';
import { UserModule } from 'src/user/user.module';
import { Reactions } from './entity/reactions.entity';
import { ReactionsController } from './reactions.controller';
import { ReactionsService } from './reactions.service';
import { ReactionRepository } from './repositories/reactions.repositories';

@Module({
  imports: [TypeOrmModule.forFeature([User, Posts, Reactions]), UserModule],
  controllers: [ReactionsController],
  providers: [ReactionsService, ReactionRepository],
  exports: [ReactionsService, ReactionRepository],
})
export class ReactionsModule {}
