import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from 'src/guards/auth.guards';
import { Reactions } from 'src/reactions/entity/reactions.entity';
import { User } from './entity/user.entity';
import { UserRepository } from './repositories/user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Reactions])],
  controllers: [UserController],
  providers: [UserService, UserRepository, AuthGuard],
  exports: [UserService, UserRepository],
})
export class UserModule {}
