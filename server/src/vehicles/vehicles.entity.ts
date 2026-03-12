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

  @Column({type:'int', nullable:true})
  cost_in_credits: number;

  @Column({type:'float', nullable:true})
  length: number;

  @Column({type:'int', nullable:true})
  max_atmosphering_speed: number;

  @Column('varchar')
  crew: string;

  @Column({type:'int', nullable:true})
  passengers: number;

  @Column({type:'int', nullable:true})
  cargo_capacity: number;

  @Column('varchar')
  consumables: string;

  @Column({type:'varchar', nullable:true})
  vehicles_class: string;

  @ManyToMany(() => People, (people) => people.vehicles)
  pilots: People[]

  @ManyToMany(() => Films, (films) => films.vehicles)
  films: Films[]
}