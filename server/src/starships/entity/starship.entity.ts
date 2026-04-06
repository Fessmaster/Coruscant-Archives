import { ExtendedEntity } from 'src/basic/entity/extended-entity.entity';
import { FilmsEntity } from 'src/films/entity/films.entity';
import { PeopleEntity } from 'src/people/entity/people.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity('starships')
export class StarshipsEntity extends ExtendedEntity {
  @Column({type:'varchar'})
  name: string;

  @Column({type:'varchar'})
  model: string;

  @Column({type:'varchar'})
  manufacturer: string;

  @Column({type:'bigint', nullable:true})
  cost_in_credits: number;

  @Column({type:'float', nullable:true})
  length: number;

  @Column({type:'int', nullable:true})
  max_atmosphering_speed: number;

  @Column({type:'float', nullable:true})
  crew: number;

  @Column({type:'int', nullable:true})
  passengers: number;

  @Column({type:'bigint', nullable:true})
  cargo_capacity: number;

  @Column({type:'varchar'})
  consumables: string;

  @Column({type:'float', nullable:true})
  hyperdrive_rating: number;

  @Column({type:'int', nullable:true})
  MGLT: number;

  @Column({type:'varchar'})
  starship_class: string;

  @ManyToMany(() => PeopleEntity, (people)=>people.starships)
  pilots: PeopleEntity[]

  @ManyToMany(() => FilmsEntity, (films) => films.starships)
  films: FilmsEntity[]

}
