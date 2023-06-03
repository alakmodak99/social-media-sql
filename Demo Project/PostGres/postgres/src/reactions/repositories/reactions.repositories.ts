/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReactionDto } from '../dto/reactions.dto';
import { Reactions } from '../entity/reactions.entity';

@Injectable()
export class ReactionRepository {
  constructor(
    @InjectRepository(Reactions)
    private readonly repository: Repository<Reactions>,
  ) {}
  async saveReaction(data: ReactionDto) {
    const { postId, userId } = data;
    return await this.repository.save({
      postId,
      userId,
    });
  }
  async getAllReaction() {
    return await this.repository.find({ relations: ['post', 'user'] });
  }
  async getReactionByField(data: object): Promise<any> {
    return await this.repository.findOneBy(data);
  }
  async removeReaction(data: object): Promise<any> {
    const reaction = await this.repository.findOneBy(data);
    return await this.repository.delete({ id: reaction.id });
  }
}
