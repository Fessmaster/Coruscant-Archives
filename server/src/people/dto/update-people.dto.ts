import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreatePeopleDto } from './create-people.dto';

export class UpdatePeopleDto extends PartialType(CreatePeopleDto) {
  @ApiPropertyOptional({ example: 'Luke Skywalker' })
  name?: string | undefined;

  @ApiPropertyOptional({ example: 180 })
  height: number | undefined;

  @ApiPropertyOptional({ example: 80 })
  mass: number | undefined;

  @ApiPropertyOptional({ example: 'brown' })
  hair_color: string;

  @ApiPropertyOptional({ example: 'white' })
  skin_color: string;

  @ApiPropertyOptional({ example: 'blue' })
  eye_color: string;

  @ApiPropertyOptional({ example: '19BBY' })
  birth_year: string;

  @ApiPropertyOptional({ example: 'male' })
  gender: string;

  @ApiPropertyOptional({ example: 1 })
  homeworldId: number;

  @ApiPropertyOptional({ example: [1, 2] })
  filmsIds: number[];

  @ApiPropertyOptional({ example: [1, 2] })
  speciesIds: number[];

  @ApiPropertyOptional({ example: [1, 2] })
  vehiclesIds: number[];

  @ApiPropertyOptional({ example: [1, 2] })
  starshipsIds: number[];
}
