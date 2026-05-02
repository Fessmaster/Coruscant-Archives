import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { BasicDto } from 'src/basic/dto/basic.dto';

export class CreateSpeciesDto extends BasicDto {
  @ApiProperty({ example: 'Human', type: String })
  @IsString({ message: 'Field name must be a string' })
  @MinLength(2)
  @MaxLength(50)
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'mammal', type: String })
  @IsString({ message: 'Field classification must be a string' })
  @MinLength(2)
  @MaxLength(50)
  @IsNotEmpty()
  classification: string;

  @ApiProperty({ example: 'sentient', type: String })
  @IsString({ message: 'Field designation must be a string' })
  @MinLength(2)
  @MaxLength(50)
  @IsNotEmpty()
  designation: string;

  @ApiProperty({
    example: 180,
    type: Number,
    nullable: true,
  })
  @IsNumber({}, { message: 'Field average_height must be a number' })
  @IsPositive()
  @IsOptional()
  average_height: number | null;

  @ApiProperty({ example: 'caucasian, black, asian, hispanic', type: String })
  @IsString({ message: 'Field skin_colors must be a string' })
  @MinLength(2)
  @MaxLength(50)
  @IsNotEmpty()
  skin_colors: string;

  @ApiProperty({ example: 'blonde, brown, black, red', type: String })
  @IsString({ message: 'Field hair_colors must be a string' })
  @MinLength(2)
  @MaxLength(50)
  @IsNotEmpty()
  hair_colors: string;

  @ApiProperty({
    example: 'brown, blue, green, hazel, grey, amber',
    type: String,
  })
  @IsString({ message: 'Field eye_colors must be a string' })
  @MinLength(2)
  @MaxLength(50)
  @IsNotEmpty()
  eye_colors: string;

  @ApiProperty({
    example: 120,
    type: Number,
    nullable: true,
  })
  @IsNumber({}, { message: 'Field average_lifespan must be a number' })
  @IsPositive()
  @IsOptional()
  average_lifespan: number | null;

  @ApiProperty({
    example: 'Galactic Basic',
    type: String,
  })
  @IsString({ message: 'Field language must be a string' })
  @MinLength(2)
  @MaxLength(50)
  @IsNotEmpty()
  language: string;

  @ApiProperty({ type: Number, example: 1 })
  @IsInt({ message: 'Field homeworld must be a number' })
  @IsPositive()
  @Min(1)
  @IsOptional()
  homeworldId: number;

  @ApiProperty({ type: [Number], example: [1, 2] })
  @IsArray({ message: 'Field people must be an array' })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  @Min(1, { each: true })
  @IsOptional()
  peopleIds: number[];

  @ApiProperty({ type: [Number], example: [1, 2] })
  @IsArray({ message: 'Field films must be an array' })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  @Min(1, { each: true })
  @IsOptional()
  filmsIds: number[];
}
