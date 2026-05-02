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

export class CreateVehiclesDto extends BasicDto {
  @ApiProperty({ example: 'Sand Crawler', type: String })
  @IsString({ message: 'Field name must be a string' })
  @MinLength(2)
  @MaxLength(50)
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Digger Crawler', type: String })
  @IsString({ message: 'Field model must be a string' })
  @MinLength(2)
  @MaxLength(50)
  @IsNotEmpty()
  model: string;

  @ApiProperty({ example: 'Corellia Mining Corporation', type: String })
  @IsString({ message: 'Field manufacturer must be a string' })
  @MinLength(2)
  @MaxLength(50)
  @IsNotEmpty()
  manufacturer: string;

  @ApiProperty({
    example: 150000,
    type: Number,
    nullable: true,
  })
  @IsNumber({}, { message: 'Field cost_in_credits must be a number' })
  @IsPositive()
  @IsOptional()
  cost_in_credits: number;

  @ApiProperty({
    example: 36.8,
    type: Number,
    nullable: true,
  })
  @IsNumber({}, { message: 'Field length must be a number' })
  @IsPositive()
  @IsOptional()
  length: number;

  @ApiProperty({
    example: 30,
    type: Number,
    nullable: true,
  })
  @IsNumber({}, { message: 'Field max_atmosphering_speed must be a number' })
  @IsPositive()
  @IsOptional()
  max_atmosphering_speed: number;

  @ApiProperty({ example: '46', type: String })
  @IsString({ message: 'Field crew must be a string' })
  @MinLength(2)
  @MaxLength(50)
  @IsNotEmpty()
  crew: string;

  @ApiProperty({
    example: 30,
    type: Number,
    nullable: true,
  })
  @IsNumber({}, { message: 'Field passengers must be a number' })
  @IsPositive()
  @IsOptional()
  passengers: number;

  @ApiProperty({
    example: 50000,
    type: Number,
    nullable: true,
  })
  @IsNumber({}, { message: 'Field cargo_capacity must be a number' })
  @IsPositive()
  @IsOptional()
  cargo_capacity: number;

  @ApiProperty({ example: '2 months', type: String })
  @IsString({ message: 'Field consumables must be a string' })
  @MinLength(2)
  @MaxLength(50)
  @IsNotEmpty()
  consumables: string;

  @ApiProperty({ example: 'wheeled', type: String })
  @IsString({ message: 'Field vehicles_class must be a string' })
  @MinLength(2)
  @MaxLength(50)
  @IsNotEmpty()
  vehicles_class: string;

  @ApiProperty({ type: [Number], example: [1, 2] })
  @IsArray({ message: 'Field pilots must be an array' })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  @Min(1, { each: true })
  @IsOptional()
  pilotsIds: number[];

  @ApiProperty({ type: [Number], example: [1, 2] })
  @IsArray({ message: 'Field films must be an array' })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  @Min(1, { each: true })
  @IsOptional()
  filmsIds: number[];
}
