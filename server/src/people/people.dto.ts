import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';
import { BasicDto } from 'src/basic.dto';
import { validateNumber } from 'src/common/utils/validate.utils';

export class PeopleDto extends BasicDto {
  @IsString({ message: 'Field name must be a string' })
  name: string ;

  @Transform(({ value }) => validateNumber(value))
  height: number | null;

  @Transform(({ value }) => validateNumber(value))
  mass: number | null;

  @IsString({ message: 'Field hair_color must be a string' })
  hair_color: string;

  @IsString({ message: 'Field skin_color must be a string' })
  skin_color: string;

  @IsString({ message: 'Field eye_color must be a string' })
  eye_color: string;

  @IsString({ message: 'Field birth_year must be a string' })
  birth_year: string;

  @IsString({ message: 'Field gender must be a string' })
  gender: string;
}
