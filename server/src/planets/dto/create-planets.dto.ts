import { ApiProperty } from '@nestjs/swagger';
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

export class CreatePlanetsDto extends BasicDto {
  @ApiProperty({ example: 'Tatooine', type: String })
  @IsString({ message: 'Field name must be a string' })
  @MinLength(2)
  @MaxLength(50)
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 23,
    type: Number,
    nullable: true,
  })
  @IsNumber({}, { message: 'Field rotation_period must be a number' })
  @IsPositive()
  @IsOptional()
  rotation_period: number | null;

  @ApiProperty({
    example: 304,
    type: Number,
    nullable: true,
  })
  @IsNumber({}, { message: 'Field orbital_period must be a number' })
  @IsPositive()
  @IsOptional()
  orbital_period: number | null;

  @ApiProperty({
    example: 10465,
    type: Number,
    nullable: true,
  })
  @IsNumber({}, { message: 'Field diameter must be a number' })
  @IsPositive()
  @IsOptional()
  diameter: number | null;

  @ApiProperty({ example: 'arid', type: String })
  @IsString({ message: 'Field climate must be a string' })
  @MinLength(2)
  @MaxLength(50)
  @IsNotEmpty()
  climate: string;

  @ApiProperty({ example: '1 standard', type: String })
  @IsString({ message: 'Field gravity must be a string' })
  @MinLength(2)
  @MaxLength(50)
  @IsNotEmpty()
  gravity: string;

  @ApiProperty({ example: 'desert', type: String })
  @IsString({ message: 'Field terrain must be a string' })
  @MinLength(2)
  @MaxLength(50)
  @IsNotEmpty()
  terrain: string;

  @ApiProperty({
    example: 1,
    type: Number,
    nullable: true,
  })
  @IsNumber({}, { message: 'Field surface_water must be a number' })
  @IsPositive()
  @IsOptional()
  surface_water: number | null;

  @ApiProperty({
    example: 200000,
    type: Number,
    nullable: true,
  })
  @IsNumber({}, { message: 'Field population must be a number' })
  @IsPositive()
  @IsOptional()
  population: number | null;

  @ApiProperty({ type: [Number], example: [1, 2] })
  @IsArray({ message: 'Field residentsIds must be an array' })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  @Min(1, { each: true })
  @IsOptional()
  residentsIds: number[];

  @ApiProperty({ type: [Number], example: [1, 2] })
  @IsArray({ message: 'Field filmsIds must be an array' })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  @Min(1, { each: true })
  @IsOptional()
  filmsIds: number[];  
}
