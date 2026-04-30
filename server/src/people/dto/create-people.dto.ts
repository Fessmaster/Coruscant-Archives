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

export class CreatePeopleDto extends BasicDto {
  @ApiProperty({ example: 'Luke SkyWalker', type: String })
  @IsString({ message: 'Field name must be a string' })
  @MinLength(2)
  @MaxLength(50)
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 180,
    type: Number,
    nullable: true,
  })
  @IsNumber({}, { message: 'Field height must be a number' })
  @IsPositive()
  @IsOptional()
  height?: number | null;

  @ApiProperty({
    example: 80,
    type: Number,
    nullable: true,
  })
  @IsNumber({}, { message: 'Field mass must be a number' })
  @IsPositive()
  @IsOptional()
  mass?: number | null;

  @ApiProperty({ example: 'brown or n/a', type: String })
  @IsString({ message: 'Field hair_color must be a string' })
  @MinLength(2)
  @MaxLength(50)
  @IsNotEmpty()
  hair_color: string;

  @ApiProperty({ example: 'white or n/a', type: String })
  @IsString({ message: 'Field skin_color must be a string' })
  @MinLength(2)
  @MaxLength(50)
  @IsNotEmpty()
  skin_color: string;

  @ApiProperty({ example: 'blue or n/a', type: String })
  @IsString({ message: 'Field eye_color must be a string' })
  @MinLength(2)
  @MaxLength(50)
  @IsNotEmpty()
  eye_color: string;

  @ApiProperty({ example: '19BBY or n/a', type: String })
  @IsString({ message: 'Field birth_year must be a string' })
  @MinLength(2)
  @MaxLength(50)
  @IsNotEmpty()
  birth_year: string;

  @ApiProperty({ example: 'male or n/a', type: String })
  @IsString({ message: 'Field gender must be a string' })
  @MinLength(2)
  @MaxLength(50)
  @IsNotEmpty()
  gender: string;

  @ApiProperty({ type: Number, example: 1 })
  @IsInt({ message: 'Field homeworld must be a number' })
  @IsPositive()
  @Min(1)
  @IsOptional()
  homeworldId: number;

  @ApiProperty({ type: [Number], example: [1,2]})
  @IsArray({ message: 'Field filmsIds must be an array' })
  @IsInt({ each: true })
  @IsPositive({each: true})  
  @Min(1, { each: true })
  @IsOptional()
  filmsIds: number[];

  @ApiProperty({ type: [Number], example: [1,2] })
  @IsArray({ message: 'Field speciesIds must be an array' })
  @IsInt({ each: true })
  @IsPositive({each: true})  
  @Min(1, { each: true })
  @IsOptional()
  speciesIds: number[];

  @ApiProperty({ type: [Number], example: [1,2] })
  @IsArray({ message: 'Field vehiclesIds must be an array' })
  @IsInt({ each: true })
  @IsPositive({each: true})  
  @Min(1, { each: true })
  @IsOptional()
  vehiclesIds: number[];

  @ApiProperty({ type: [Number], example: [1,2] })
  @IsArray({ message: 'Field starshipsIds must be an array' })
  @IsInt({ each: true })
  @IsPositive({each: true})  
  @Min(1, { each: true })
  @IsOptional()
  starshipsIds: number[];
}
