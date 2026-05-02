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

export class CreateStarshipsDto extends BasicDto {
  @ApiProperty({ example: 'CR90 corvette', type: String })
  @IsString({ message: 'Field name must be a string' })
  @MinLength(2)
  @MaxLength(50)
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'CR90 corvette', type: String })
  @IsString({ message: 'Field model must be a string' })
  @MinLength(2)
  @MaxLength(50)
  @IsNotEmpty()
  model: string;

  @ApiProperty({ example: 'Corellian Engineering Corporation', type: String })
  @IsString({ message: 'Field manufacturer must be a string' })
  @MinLength(2)
  @MaxLength(50)
  @IsNotEmpty()
  manufacturer: string;

  @ApiProperty({
    example: 3500000,
    type: Number,
    nullable: true,
  })
  @IsNumber({}, { message: 'Field cost_in_credits must be a number' })
  @IsPositive()
  @IsOptional()
  cost_in_credits: number | null;

  @ApiProperty({
    example: 150,
    type: Number,
    nullable: true,
  })
  @IsNumber({}, { message: 'Field length must be a number' })
  @IsPositive()
  @IsOptional()
  length: number | null;

  @ApiProperty({
    example: 950,
    type: Number,
    nullable: true,
  })
  @IsNumber({}, { message: 'Field max_atmosphering_speed must be a number' })
  @IsPositive()
  @IsOptional()
  max_atmosphering_speed: number | null;

  @ApiProperty({ example: '30-165', type: String })
  @IsString({ message: 'Field crew must be a string' })
  @MinLength(2)
  @MaxLength(50)
  @IsNotEmpty()
  crew: string;

  @ApiProperty({
    example: 600,
    type: Number,
    nullable: true,
  })
  @IsNumber({}, { message: 'Field passengers must be a number' })
  @IsPositive()
  @IsOptional()
  passengers: number | null;

  @ApiProperty({
    example: 3000000,
    type: Number,
    nullable: true,
  })
  @IsNumber({}, { message: 'Field cargo_capacity must be a number' })
  @IsPositive()
  @IsOptional()
  cargo_capacity: number | null;

  @ApiProperty({ example: '1 year', type: String })
  @IsString({ message: 'Field consumables must be a string' })
  @MinLength(2)
  @MaxLength(50)
  @IsNotEmpty()
  consumables: string;

  @ApiProperty({
    example: 2.0,
    type: Number,
    nullable: true,
  })
  @IsNumber({}, { message: 'Field hyperdrive_rating must be a number' })
  @IsPositive()
  @IsOptional()
  hyperdrive_rating: number | null;

  @ApiProperty({
    example: 60,
    type: Number,
    nullable: true,
  })
  @IsNumber({}, { message: 'Field MGLT must be a number' })
  @IsPositive()
  @IsOptional()
  MGLT: number | null;

  @ApiProperty({ example: 'corvette', type: String })
  @IsString({ message: 'Field starship_class must be a string' })
  @MinLength(2)
  @MaxLength(50)
  @IsNotEmpty()
  starship_class: string;

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
