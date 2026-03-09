import { IsNumber, IsString } from 'class-validator';
import { BasicDto } from 'src/basic.dto';

export class FilmsDto extends BasicDto {
  @IsString({ message: 'Field title must be a string' })
  title: string;

  @IsNumber({}, { message: 'Field episode_id must be a number' })
  episode_id: number;

  @IsString({ message: 'Field opening_crawl must be a string' })
  opening_crawl: string;

  @IsString({ message: 'Field director must be a string' })
  director: string;

  @IsString({ message: 'Field producer must be a string' })
  producer: string;

  @IsString({ message: 'Field release_date must be a string' })
  release_date: string; //TODO Трансформувати дату
}
