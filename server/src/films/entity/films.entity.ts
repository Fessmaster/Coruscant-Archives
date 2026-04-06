import { ExtendedEntity } from 'src/basic/entity/extended-entity.entity';
import { PeopleEntity } from 'src/people/entity/people.entity';
import { PlanetsEntity } from 'src/planets/entity/planets.entity';
import { SpeciesEntity } from 'src/species/entity/species.entity';
import { StarshipsEntity } from 'src/starships/entity/starship.entity';
import { VehiclesEntity } from 'src/vehicles/entity/vehicles.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity('films')
export class FilmsEntity extends ExtendedEntity {
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

  @ManyToMany(() => PeopleEntity, (people) => people.films)
  @JoinTable()
  characters: PeopleEntity[];

  @ManyToMany(() => PlanetsEntity, (planets) => planets.films)
  @JoinTable()  
  planets: PlanetsEntity[];

  @ManyToMany(() => StarshipsEntity, (starships) => starships.films)
  @JoinTable()  
  starships: StarshipsEntity[]

  @ManyToMany(() => VehiclesEntity, (vehicles) => vehicles.films)
  @JoinTable()  
  vehicles: VehiclesEntity;
  
  @ManyToMany(() => SpeciesEntity, (species) => species.films)
  @JoinTable()
  species: SpeciesEntity;
}
