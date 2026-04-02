import { Transform } from "class-transformer";
import { IsString } from "class-validator";
import { BasicDto } from "src/basic/basic.dto";
import { validateNumber } from "src/common/utils/validate.utils";


export class SpeciesDto extends BasicDto {
  @IsString({message: 'Field name must be a string'})
  name: string;

  @IsString({message: 'Field classification must be a string'})
  classification: string; 

  @IsString({message: 'Field designation must be a string'})
  designation: string; 

  @Transform(({ value }) => validateNumber(value))
  average_height: number | null;  

  @IsString({message: 'Field skin_colors must be a string'})
  skin_colors: string; 

  @IsString({message: 'Field hair_colors must be a string'})
  hair_colors: string;

  @IsString({message: 'Field eye_colors must be a string'})
  eye_colors: string;

  @Transform(({ value }) => validateNumber(value))
  average_lifespan: number | null;  

  @IsString({message: 'Field language must be a string'})
  language: string;
}