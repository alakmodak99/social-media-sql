import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Delete } from '@nestjs/common/decorators';
import { AuthGuard } from 'src/guards/auth.guards';
import { ReactionDto, RemoveReactionDto } from './dto/reactions.dto';
import { ReactionsService } from './reactions.service';

@Controller('reactions')
export class ReactionsController {
  constructor(private readonly reactionService: ReactionsService) {}
  @Get('all-reactions')
  async getAllReactionData() {
    return this.reactionService.getAllReaciotns();
  }
  @UseGuards(AuthGuard)
  @Post('save-reaction')
  savePost(@Req() req, @Body(ValidationPipe) data: ReactionDto) {
    return this.reactionService.SaveReaction(data);
  }

  @UseGuards(AuthGuard)
  @Delete('remove-reaction')
  removeReaction(@Req() req, @Body(ValidationPipe) data: RemoveReactionDto) {
    return this.reactionService.RemoveReaction(data, req?.user);
  }
}
