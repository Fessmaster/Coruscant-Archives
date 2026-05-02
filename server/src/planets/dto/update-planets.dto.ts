import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreatePlanetsDto } from './create-planets.dto';

export class UpdatePlanetsDto extends PartialType(CreatePlanetsDto) {
  @ApiPropertyOptional({ example: 'Tatooine', type: String })
  name: string;

  @ApiPropertyOptional({
    example: 23,
    type: Number,
    nullable: true,
  })
  rotation_period: number | null;

  @ApiPropertyOptional({
    example: 304,
    type: Number,
    nullable: true,
  })
  orbital_period: number | null;

  @ApiPropertyOptional({
    example: 10465,
    type: Number,
    nullable: true,
  })
  diameter: number | null;

  @ApiPropertyOptional({ example: 'arid', type: String })
  climate: string;

  @ApiPropertyOptional({ example: '1 standard', type: String })
  gravity: string;

  @ApiPropertyOptional({ example: 'desert', type: String })
  terrain: string;

  @ApiPropertyOptional({
    example: 1,
    type: Number,
    nullable: true,
  })
  surface_water: number | null;

  @ApiPropertyOptional({
    example: 200000,
    type: Number,
    nullable: true,
  })
  population: number | null;
}
