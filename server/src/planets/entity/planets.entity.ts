import { ExtendedEntity } from 'src/basic/entity/extended-entity.entity';
import { FilmsEntity } from 'src/films/entity/films.entity';
import { PeopleEntity } from 'src/people/entity/people.entity';
import { SpeciesEntity } from 'src/species/entity/species.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

@Entity('planets')
export class PlanetsEntity extends ExtendedEntity  {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'int', nullable: true })
  rotation_period: number;

  @Column({ type: 'int', nullable: true })
  orbital_period: number;

  @Column({ type: 'int', nullable: true })
  diameter: number;

  @Column({ type: 'varchar' })
  climate: string;

  @Column({ type: 'varchar' })
  gravity: string;

  @Column({ type: 'varchar' })
  terrain: string;

  @Column({ type: 'float', nullable: true })
  surface_water: number;

  @Column({ type: 'bigint', nullable: true })
  population: number;

  @OneToMany(() => PeopleEntity, (people) => people.homeworld)
  residents: PeopleEntity[];

  @ManyToMany(() => FilmsEntity, (films) => films.planets)
  films: FilmsEntity[];

  @OneToMany(() => SpeciesEntity, (species) => species.homeworld)
  species: SpeciesEntity[]
}
