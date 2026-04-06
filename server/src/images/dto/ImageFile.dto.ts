import { ApiProperty } from "@nestjs/swagger";

export class ImageFileDto {
    @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
      description: 'Image',
    }
  })
  img: any;
}