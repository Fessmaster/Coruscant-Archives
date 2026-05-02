import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { CreateSpeciesDto } from "./create-species.dto";

export class UpdateSpeciesDto extends PartialType(CreateSpeciesDto) {
  @ApiPropertyOptional({ example: 'Human', type: String })
  name: string;

  @ApiPropertyOptional({ example: 'mammal', type: String })
  classification: string;

  @ApiPropertyOptional({ example: 'sentient', type: String })
  designation: string;

  @ApiPropertyOptional({
    example: 180,
    type: Number,
    nullable: true,
  })
  average_height: number | null;

  @ApiPropertyOptional({ example: 'caucasian, black, asian, hispanic', type: String })
  skin_colors: string;

  @ApiPropertyOptional({ example: 'blonde, brown, black, red', type: String })
  hair_colors: string;

  @ApiPropertyOptional({
    example: 'brown, blue, green, hazel, grey, amber',
    type: String,
  })
  eye_colors: string;

  @ApiPropertyOptional({
    example: 120,
    type: Number,
    nullable: true,
  })
  average_lifespan: number | null;

  @ApiPropertyOptional({
    example: 'Galactic Basic',
    type: String,
  })
  language: string;

  @ApiPropertyOptional({ type: Number, example: 1 })
  homeworldId: number;

  @ApiPropertyOptional({ type: [Number], example: [1, 2] })
  peopleIds: number[];

  @ApiPropertyOptional({ type: [Number], example: [1, 2] })
  filmsIds: number[];
}
