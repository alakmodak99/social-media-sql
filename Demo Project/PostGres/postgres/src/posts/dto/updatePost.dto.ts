import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePostsDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly content: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly id: string;
}
export class DeletePostsDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly id: string;
}