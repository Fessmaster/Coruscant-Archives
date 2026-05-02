import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { CreateStarshipsDto } from "./create-starships.dto";

export class UpdateStarshipsDto extends PartialType(CreateStarshipsDto) {
  @ApiPropertyOptional({ example: 'CR90 corvette', type: String })
  name: string;

  @ApiPropertyOptional({ example: 'CR90 corvette', type: String })
  model: string;

  @ApiPropertyOptional({ example: 'Corellian Engineering Corporation', type: String })
  manufacturer: string;

  @ApiPropertyOptional({
    example: 3500000,
    type: Number,
    nullable: true,
  })
  cost_in_credits: number | null;

  @ApiPropertyOptional({
    example: 150,
    type: Number,
    nullable: true,
  })
  length: number | null;

  @ApiPropertyOptional({
    example: 950,
    type: Number,
    nullable: true,
  })
  max_atmosphering_speed: number | null;

  @ApiPropertyOptional({ example: '30-165', type: String })
  crew: string;

  @ApiPropertyOptional({
    example: 600,
    type: Number,
    nullable: true,
  })
  passengers: number | null;

  @ApiPropertyOptional({
    example: 3000000,
    type: Number,
    nullable: true,
  })
  cargo_capacity: number | null;

  @ApiPropertyOptional({ example: '1 year', type: String })
  consumables: string;

  @ApiPropertyOptional({
    example: 2.0,
    type: Number,
    nullable: true,
  })
  hyperdrive_rating: number | null;

  @ApiPropertyOptional({
    example: 60,
    type: Number,
    nullable: true,
  })
  MGLT: number | null;

  @ApiPropertyOptional({ example: 'corvette', type: String })
  starship_class: string;

  @ApiPropertyOptional({ type: [Number], example: [1, 2] })
  pilotsIds: number[];

  @ApiPropertyOptional({ type: [Number], example: [1, 2] })
  filmsIds: number[];
}
