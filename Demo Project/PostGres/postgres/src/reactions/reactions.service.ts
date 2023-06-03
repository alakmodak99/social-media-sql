import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ReactionDto, RemoveReactionDto } from './dto/reactions.dto';
import { ReactionRepository } from './repositories/reactions.repositories';

@Injectable()
export class ReactionsService {
  constructor(private readonly reactionRepo: ReactionRepository) {}
  async getAllReaciotns() {
    try {
      return await this.reactionRepo.getAllReaction();
    } catch (err) {
      throw new HttpException(
        'Something went wrong, please try again',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async SaveReaction(data: ReactionDto) {
    try {
      const isExists = await this.reactionRepo.getReactionByField(data);
      if (isExists?.isActive) {
        await this.reactionRepo.removeReaction(data);
        return { success: true, message: 'Reaction removed' };
      }
      await this.reactionRepo.saveReaction(data);
      return { success: true, message: 'Reaction saved' };
    } catch (err) {
      throw new HttpException(
        err.message || 'Something went wrong, please try again',
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async RemoveReaction(data: RemoveReactionDto, userData: any) {
    try {
      data.userId = userData.id;
      const isExists = await this.reactionRepo.getReactionByField(data);
      if (!isExists?.isActive)
        throw new HttpException('Post Not Found', HttpStatus.BAD_REQUEST);
      await this.reactionRepo.removeReaction(data);
      return { success: true, message: 'Reaction removed' };
    } catch (err) {
      throw new HttpException(
        err.message || 'Something went wrong, please try again',
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
