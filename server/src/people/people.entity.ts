import { BasicEntity } from 'src/basic.entity';
import { Films } from 'src/films/films.entity';
import { Images } from 'src/images/images.entity';
import { Planets } from 'src/planets/planets.entity';
import { Species } from 'src/species/species.entity';
import { Starships } from 'src/starships/starship.entity';
import { Vehicles } from 'src/vehicles/vehicles.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('people')
export class People extends BasicEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'float', nullable: true })
  height?: number;

  @Column({ type: 'float', nullable: true })
  mass?: number;

  @Column({ type: 'varchar' })
  hair_color: string;

  @Column({ type: 'varchar' })
  skin_color: string;

  @Column({ type: 'varchar' })
  eye_color: string;

  @Column({ type: 'varchar' })
  birth_year: string;

  @Column({ type: 'varchar' })
  gender: string;

  @OneToMany(() => Images, (images) => images.people, { onDelete: 'CASCADE' })
  images: Images[];

  @ManyToOne(() => Planets, (planets) => planets.residents)
  homeworld: Planets;

  @ManyToMany(() => Films, (films) => films.characters, { onDelete: 'CASCADE' })
  films: Films[];

  @ManyToMany(() => Species, (species) => species.people)
  @JoinTable()
  species: Species[];

  @ManyToMany(() => Vehicles, (vehicles) => vehicles.pilots)
  @JoinTable()
  vehicles: Vehicles[];

  @ManyToMany(() => Starships, (starships) => starships.pilots)
  @JoinTable()
  starships: Starships[];
}
