import { BasicEntity } from 'src/basic.entity';
import { Films } from 'src/films/films.entity';
import { People } from 'src/people/people.entity';
import { Planets } from 'src/planets/planets.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';

@Entity('species')
export class Species extends BasicEntity {
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

  @ManyToOne(() => Planets, (planets) => planets.name)
  homeworld: Planets;

  @OneToMany(() => People, (people) => people.species)
  people: People[];

  @ManyToMany(() => Films, (films) => films.species)
  @JoinTable()
  films: Films[];
}
