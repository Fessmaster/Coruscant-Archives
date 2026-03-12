import { BasicEntity } from 'src/basic.entity';
import { Films } from 'src/films/films.entity';
import { People } from 'src/people/people.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity('starships')
export class Starships extends BasicEntity {
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

  @ManyToMany(() => People, (people)=>people.starships)
  pilots: People[]

  @ManyToMany(() => Films, (films) => films.starships)
  films: Films[]

}
