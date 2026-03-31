import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class BasicDto {
  @ApiProperty({ example: 'Some text about this entity', type: String })
  @IsString({ message: 'Field about must be a string' })
  @MinLength(5)
  @IsNotEmpty()
  about: string;
}
