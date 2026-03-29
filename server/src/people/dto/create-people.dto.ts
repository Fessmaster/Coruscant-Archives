import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { BasicDto } from 'src/basic.dto';
import { validateNumber } from 'src/common/utils/validate.utils';

export class CreatePeopleDto extends BasicDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({
    type: Number,
    nullable: true,
  })
  @IsOptional()
  @Transform(({ value }) => validateNumber(value))
  height: number | null;

  @ApiProperty({
    type: Number,
    nullable: true,
  })
  @IsOptional()
  @Transform(({ value }) => validateNumber(value))
  mass: number | null;

  @ApiProperty()
  @IsString({ message: 'Field hair_color must be a string' })
  @IsOptional()
  hair_color: string;

  @ApiProperty()
  @IsString({ message: 'Field skin_color must be a string' })
  skin_color: string;

  @ApiProperty()
  @IsString({ message: 'Field eye_color must be a string' })
  @IsOptional()
  eye_color: string;

  @ApiProperty()
  @IsString({ message: 'Field birth_year must be a string' })
  @IsOptional()
  birth_year: string;

  @ApiProperty()
  @IsString({ message: 'Field gender must be a string' })
  @IsOptional()
  gender: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  @Transform(({ value }) => validateNumber(value))
  homeworldId: number;

  @ApiProperty({ type: [Number] })
  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value.map((v) => Number(v));
    }
    if (typeof value === 'string') {
      return value.split(',').map((v) => Number(v.trim()));
    }
  })
  @IsArray()
  filmsIds: number[];

  @ApiProperty({ type: [Number] })
  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value.map((v) => Number(v));
    }
    if (typeof value === 'string') {
      return value.split(',').map((v) => Number(v.trim()));
    }
  })
  @IsArray()
  speciesIds: number[];

  @ApiProperty({ type: [Number] })
  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value.map((v) => Number(v));
    }
    if (typeof value === 'string') {
      return value.split(',').map((v) => Number(v.trim()));
    }
  })
  @IsArray()
  vehiclesIds: number[];

  @ApiProperty({ type: [Number] })
  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value.map((v) => Number(v));
    }
    if (typeof value === 'string') {
      return value.split(',').map((v) => Number(v.trim()));
    }
  })
  @IsArray()
  starshipsIds: number[];
}
