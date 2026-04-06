import { ExtendedEntity } from 'src/basic/entity/extended-entity.entity';
import { FilmsEntity } from 'src/films/entity/films.entity';
import { PeopleEntity } from 'src/people/entity/people.entity';
import { PlanetsEntity } from 'src/planets/entity/planets.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';

@Entity('species')
export class SpeciesEntity extends ExtendedEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  classification: string;

  @Column({ type: 'varchar' })
  designation: string;

  @Column({ type: 'int', nullable: true })
  average_height: number;

  @Column({ type: 'varchar' })
  skin_colors: string;

  @Column({ type: 'varchar' })
  hair_colors: string;

  @Column({ type: 'varchar' })
  eye_colors: string;

  @Column({ type: 'int', nullable: true })
  average_lifespan: number;

  @Column({ type: 'varchar' })
  language: string;

  @ManyToOne(() => PlanetsEntity, (planets) => planets.name)
  homeworld: PlanetsEntity;

  @ManyToMany(() => PeopleEntity, (people) => people.species)
  people: PeopleEntity[];

  @ManyToMany(() => FilmsEntity, (films) => films.species)
  films: FilmsEntity[];
}
