import { People } from "src/people/people.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('images')
export class Images {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar'})
  url: string;

  @ManyToOne(()=> People, (people) => people.images)
  people: People
}