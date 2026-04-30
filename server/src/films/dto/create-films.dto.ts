import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { BasicDto } from 'src/basic/dto/basic.dto';

export class CreateFilmsDto extends BasicDto {
  @ApiProperty({ example: 'New Hope', type: String })
  @IsString({ message: 'Field title must be a string' })
  @MinLength(3)
  @MaxLength(50)
  title: string;

  @ApiProperty({ example: 4, type: Number })
  @IsNumber({}, { message: 'Field episode_id must be a number' })
  @IsInt({ message: 'Episode ID must be an integer' })
  @Min(1)
  @IsPositive()
  @IsOptional()
  episode_id: number;

  @ApiProperty({
    description:
      'At the beginning of each Star Wars episode, a text crawl appears on screen, presenting a backstory that sets up the plot against a backdrop of the starfield.',
    type: String,
  })
  @IsString({ message: 'Field opening_crawl must be a string' })
  @MinLength(10)
  opening_crawl: string;

  @ApiProperty({ example: 'George Lucas', type: String })
  @IsString({ message: 'Field director must be a string' })
  @MinLength(3)
  @MaxLength(50)
  director: string;

  @ApiProperty({ example: 'George Lucas', type: String })
  @IsString({ message: 'Field producer must be a string' })
  @MinLength(3)
  @MaxLength(50)
  producer: string;

  @ApiProperty({ example: '25.05.1977', type: String })
  @IsString({ message: 'Field release_date must be a string' })
  @MinLength(4)
  @MaxLength(20)
  release_date: string;

  @ApiProperty({ type: [Number], example: [1, 2] })
  @IsArray({ message: 'Field charactersIds must be an array' })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  @Min(1, { each: true })
  @IsOptional()
  charactersIds: number[]

  @ApiProperty({ type: [Number], example: [1, 2] })
  @IsArray({ message: 'Field planetsIds must be an array' })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  @Min(1, { each: true })
  @IsOptional()
  planetsIds: number[]

  @ApiProperty({ type: [Number], example: [1, 2] })
  @IsArray({ message: 'Field vehiclesIds must be an array' })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  @Min(1, { each: true })
  @IsOptional()
  vehiclesIds: number[]

  @ApiProperty({ type: [Number], example: [1, 2] })
  @IsArray({ message: 'Field speciesIds must be an array' })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  @Min(1, { each: true })
  @IsOptional()
  speciesIds: number[]
}
