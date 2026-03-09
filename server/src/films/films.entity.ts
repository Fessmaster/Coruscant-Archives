import { BasicEntity } from 'src/basic.entity';
import { People } from 'src/people/people.entity';
import { Planets } from 'src/planets/planets.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity('films')
export class Films extends BasicEntity {
  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'int' })
  episode_id: number;

  @Column({ type: 'text' })
  opening_crawl: string;

  @Column({ type: 'varchar' })
  director: string;

  @Column({ type: 'varchar' })
  producer: string;

  @Column({ type: 'varchar' })
  release_date: string; //TODO Трансформувати дату

  @ManyToMany(() => People, (people) => people.films)
  characters: People[];

  @ManyToMany(() => Planets, (planets) => planets.films)  
  planets: Planets[];

  @ManyToMany(() => Starships, (starships) => starships.films)  
  starships: Starships[]

  @ManyToMany(() => Vehicles, (vehicles) => vehicles.films)  
  vehicles: Vehicles;
  
  @ManyToMany(() => Species, (species) => species.films)  
  species: Species;
}
