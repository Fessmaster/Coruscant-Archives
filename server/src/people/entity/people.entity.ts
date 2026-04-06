import { ExtendedEntity } from 'src/basic/entity/extended-entity.entity';
import { FilmsEntity } from 'src/films/entity/films.entity';
import { ImagesEntity } from 'src/images/entity/images.entity';
import { PlanetsEntity } from 'src/planets/entity/planets.entity';
import { SpeciesEntity } from 'src/species/entity/species.entity';
import { StarshipsEntity } from 'src/starships/entity/starship.entity';
import { VehiclesEntity } from 'src/vehicles/entity/vehicles.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('people')
export class PeopleEntity extends ExtendedEntity {
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

  @OneToMany(() => ImagesEntity, (images) => images.people, { onDelete: 'CASCADE' })
  images: ImagesEntity[];

  @ManyToOne(() => PlanetsEntity, (planets) => planets.residents)
  homeworld: PlanetsEntity;

  @ManyToMany(() => FilmsEntity, (films) => films.characters, { onDelete: 'CASCADE' })
  films: FilmsEntity[];

  @ManyToMany(() => SpeciesEntity, (species) => species.people)
  @JoinTable()
  species: SpeciesEntity[];

  @ManyToMany(() => VehiclesEntity, (vehicles) => vehicles.pilots)
  @JoinTable()
  vehicles: VehiclesEntity[];

  @ManyToMany(() => StarshipsEntity, (starships) => starships.pilots)
  @JoinTable()
  starships: StarshipsEntity[];
}
