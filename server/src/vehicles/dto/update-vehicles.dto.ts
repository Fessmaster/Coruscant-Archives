import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { CreateVehiclesDto } from "./create-vehicles.dto";

export class UpdateVehiclesDto extends PartialType(CreateVehiclesDto) {
  @ApiPropertyOptional({ example: 'Sand Crawler', type: String })
  name: string;

  @ApiPropertyOptional({ example: 'Digger Crawler', type: String })
  model: string;

  @ApiPropertyOptional({ example: 'Corellia Mining Corporation', type: String })
  manufacturer: string;

  @ApiPropertyOptional({
    example: 150000,
    type: Number,
    nullable: true,
  })
  cost_in_credits: number;

  @ApiPropertyOptional({
    example: 36.8,
    type: Number,
    nullable: true,
  })
  length: number;

  @ApiPropertyOptional({
    example: 30,
    type: Number,
    nullable: true,
  })
  max_atmosphering_speed: number;

  @ApiPropertyOptional({ example: '46', type: String })
  crew: string;

  @ApiPropertyOptional({
    example: 30,
    type: Number,
    nullable: true,
  })
  passengers: number;

  @ApiPropertyOptional({
    example: 50000,
    type: Number,
    nullable: true,
  })
  cargo_capacity: number;

  @ApiPropertyOptional({ example: '2 months', type: String })
  consumables: string;

  @ApiPropertyOptional({ example: 'wheeled', type: String })
  vehicles_class: string;

    @ApiPropertyOptional({ type: [Number], example: [1, 2] })
  pilotsIds: number[];

  @ApiPropertyOptional({ type: [Number], example: [1, 2] })
  filmsIds: number[];
}
