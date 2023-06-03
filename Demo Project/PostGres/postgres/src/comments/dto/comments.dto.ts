/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CommentDto {

  userId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  postId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  comment: string;

  @ApiProperty()
  parentId: string;
}
