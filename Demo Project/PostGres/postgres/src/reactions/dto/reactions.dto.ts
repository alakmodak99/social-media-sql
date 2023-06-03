import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ReactionDto {
  userId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  postId: string;
}

export class RemoveReactionDto {
  userId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  postId: string;
}
