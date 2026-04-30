import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateFilmsDto } from './create-films.dto';

export class UpdateFilmsDto extends PartialType(CreateFilmsDto) {
  @ApiPropertyOptional({ example: 'New Hope', type: String })
  title: string;

  @ApiPropertyOptional({ example: 4, type: Number })
  episode_id: number;

  @ApiPropertyOptional({ type: String })
  opening_crawl: string;

  @ApiPropertyOptional({ example: 'George Lucas', type: String })
  director: string;

  @ApiPropertyOptional({ example: 'George Lucas', type: String })
  producer: string;

  @ApiPropertyOptional({ example: '25.05.1977', type: String })
  release_date: string;

  @ApiPropertyOptional({ type: [Number], example: [1, 2] })
  charactersIds: number[];

  @ApiPropertyOptional({ type: [Number], example: [1, 2] })
  planetsIds: number[];

  @ApiPropertyOptional({ type: [Number], example: [1, 2] })
  vehiclesIds: number[];

  @ApiPropertyOptional({ type: [Number], example: [1, 2] })
  speciesIds: number[];
}
