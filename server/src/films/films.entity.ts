import { BasicEntity } from 'src/basic/basic.entity';
import { People } from 'src/people/people.entity';
import { Planets } from 'src/planets/planets.entity';
import { Species } from 'src/species/species.entity';
import { Starships } from 'src/starships/starship.entity';
import { Vehicles } from 'src/vehicles/vehicles.entity';
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
  release_date: string;

  @ManyToMany(() => People, (people) => people.films)
  @JoinTable()
  characters: People[];

  @ManyToMany(() => Planets, (planets) => planets.films)
  @JoinTable()  
  planets: Planets[];

  @ManyToMany(() => Starships, (starships) => starships.films)
  @JoinTable()  
  starships: Starships[]

  @ManyToMany(() => Vehicles, (vehicles) => vehicles.films)
  @JoinTable()  
  vehicles: Vehicles;
  
  @ManyToMany(() => Species, (species) => species.films)
  @JoinTable()
  species: Species;
}
