import { Transform } from "class-transformer";
import { IsString } from "class-validator";
import { BasicDto } from "src/basic/dto/basic.dto";
import { validateNumber } from "src/common/utils/validate.utils";

export class StarshipsDto extends BasicDto{
  @IsString({ message: 'Field name must be a string' })
  name: string;

  @IsString({ message: 'Field model must be a string' })
  model: string;

  @IsString({ message: 'Field manufacturer must be a string' })
  manufacturer: string;

  @Transform(({ value }) => validateNumber(value))
  cost_in_credits: number;

  @Transform(({ value }) => validateNumber(value))
  length: number;

  @Transform(({ value }) => validateNumber(value))
  max_atmosphering_speed: number;

  @IsString({ message: 'Field crew must be a string' })
  crew: string;

  @Transform(({ value }) => validateNumber(value))
  passengers: number;

  @Transform(({ value }) => validateNumber(value))
  cargo_capacity: number;

  @IsString({ message: 'Field consumables must be a string' })
  consumables: string;

  @Transform(({ value }) => validateNumber(value))
  hyperdrive_rating: number;

  @Transform(({ value }) => validateNumber(value))
  MGLT: number;

  @IsString({ message: 'Field starship_class must be a string' })
  starship_class: string;
}