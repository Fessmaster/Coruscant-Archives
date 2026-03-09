import { IsNumber, IsString } from 'class-validator';
import { BasicEntity } from 'src/basic-entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@Entity('people')
export class People extends BasicEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'int', nullable:true })
  height: number;

  @Column({ type: 'int', nullable:true })
  mass: number;

  @Column({ type: 'varchar' })
  hair_color: string;

  @Column({ type: 'varchar' })
  skin_color: string;

  @Column({ type: 'varchar' })
  eye_color: string;

  @Column({ type: 'varchar' })
  birth_year: string;

  @ManyToOne(Planets, (planets) => planets.residents)
  homeworld: Planets;

  @ManyToMany(Films, (films) => films.characters)
  @JoinTable()
  films: Films[];

  @ManyToOne(Species, (species) => species.people)
  species: Species;

  @ManyToMany(Vehicles, (vehicles) => vehicles.pilots)
  @JoinTable()
  vehicles: Vehicles[];

  @ManyToMany(Starships, (starships) => starships.pilots)
  @JoinTable()
  starships: Starships[];
}
