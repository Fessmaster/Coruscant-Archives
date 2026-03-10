import { BasicEntity } from 'src/basic.entity';
import { Films } from 'src/films/films.entity';
import { People } from 'src/people/people.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity('vehicles')
export class Vehicles extends BasicEntity {
  @Column('varchar')
  name: string;

  @Column('varchar')
  model: string;

  @Column('varchar')
  manufacturer: string;

  @Column('int')
  cost_in_credits: number;

  @Column('float')
  length: number;

  @Column('int')
  max_atmosphering_speed: number;

  @Column('varchar')
  crew: string;

  @Column('int')
  passengers: number;

  @Column('int')
  cargo_capacity: number;

  @Column('varchar')
  consumables: string;

  @Column('varchar')
  vehicles_class: string;

  @ManyToMany(() => People, (people) => people.vehicles)
  pilots: People[]

  @ManyToMany(() => Films, (films) => films.vehicles)
  films: Films[]
}