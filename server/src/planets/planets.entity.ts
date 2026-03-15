import { BasicEntity } from 'src/basic.entity';
import { Films } from 'src/films/films.entity';
import { People } from 'src/people/people.entity';
import { Species } from 'src/species/species.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

@Entity('planets')
export class Planets extends BasicEntity {
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

  @OneToMany(() => People, (people) => people.homeworld)
  residents: People[];

  @OneToMany(() => Films, (films) => films.planets)
  films: Films[];

  @OneToMany(() => Species, (species) => species.homeworld)
  species: Species[]
}
