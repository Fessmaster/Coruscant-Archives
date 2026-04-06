import { BasicEntity } from "src/basic/entity/basic.entity";
import { PeopleEntity } from "src/people/entity/people.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('images')
export class ImagesEntity extends BasicEntity{

  @Column({type: 'varchar'})
  url: string;

  @ManyToOne(()=> PeopleEntity, (people) => people.images, {onDelete: 'CASCADE'})
  people: PeopleEntity
}