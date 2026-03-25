import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class BasicDto {
  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
      description: 'Image',
    }
  })
  img: any;

  @ApiProperty()
  @IsString({ message: 'Field about must be a string' })
  about: string;
}
