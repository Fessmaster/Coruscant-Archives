import { BasicEntity } from 'src/basic/entity/basic.entity';
import { FilmsEntity } from 'src/films/entity/films.entity';
import { PeopleEntity } from 'src/people/entity/people.entity';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';

@Entity('images')
export class ImagesEntity extends BasicEntity {
  @Column({ type: 'varchar' })
  url: string;

  @ManyToMany(() => PeopleEntity, (people) => people.images)
  people: PeopleEntity;

  @ManyToMany(() => FilmsEntity, (films) => films.images)
  films: FilmsEntity;
}
