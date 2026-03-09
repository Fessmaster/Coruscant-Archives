import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';
import { BasicDto } from 'src/basic.dto';
import { validateNumber } from 'src/common/utils/validate.utils';

export class PlanetsDto extends BasicDto {
  @IsString({ message: 'Field name must be a string' })
  name: string;

  @Transform(({ value }) => validateNumber(value))
  rotation_period: number | null;

  @Transform(({ value }) => validateNumber(value))
  orbital_period: number | null;

  @Transform(({ value }) => validateNumber(value))
  diameter: number | null;

  @IsString({ message: 'Field climate must be a string' })
  climate: string;

  @IsString({ message: 'Field gravity must be a string' })
  gravity: string;

  @IsString({ message: 'Field terrain must be a string' })
  terrain: string;

  @Transform(({ value }) => validateNumber(value))
  surface_water: number | null;

  @Transform(({ value }) => validateNumber(value))
  population: number | null;
}
