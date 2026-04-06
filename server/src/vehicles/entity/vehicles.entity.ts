import { ExtendedEntity } from 'src/basic/entity/extended-entity.entity';
import { FilmsEntity } from 'src/films/entity/films.entity';
import { PeopleEntity } from 'src/people/entity/people.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity('vehicles')
export class VehiclesEntity extends ExtendedEntity {
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

  @ManyToMany(() => PeopleEntity, (people) => people.vehicles)
  pilots: PeopleEntity[]

  @ManyToMany(() => FilmsEntity, (films) => films.vehicles)
  films: FilmsEntity[]
}