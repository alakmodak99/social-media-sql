import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PostsDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly content: string;

  userId: string;
}