import { Repository } from 'typeorm';
import { getResponse, parseUrl } from '../utils/seeder.utils';
import { People } from 'src/people/people.entity';
import { PeopleDto } from 'src/people/people.dto';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
export async function getPeopleData(repository: Repository<People>) {
  let url = 'https://swapi.dev/api/people/';
  const relationMap = new Map();

  while (url != null) {
    const response = await getResponse(url);

    for (const person of response.results) {
      const {
        name,
        height,
        mass,
        hair_color,
        skin_color,
        eye_color,
        birth_year,
        gender,
      } = person;
      const externalId = parseUrl(person.url) ?? 0;
      const homeworld = parseUrl(person.homeworld);
      const films = person.films.map((film) => parseUrl(film));
      const species = person.species.map((species) => parseUrl(species));
      const vehicles = person.vehicles.map((vehicle) => parseUrl(vehicle));
      const starships = person.starships.map((starship) => parseUrl(starship));

      relationMap.set(externalId, {
        homeworld: homeworld,
        films: films,
        species: species,
        vehicles: vehicles,
        starships: starships,
      });

      const rawData = {
        name: name,
        height: height,
        mass: mass,
        hair_color: hair_color,
        skin_color: skin_color,
        eye_color: eye_color,
        birth_year: birth_year,
        gender: gender,
        external_id: externalId,
      };
      const dtoData = plainToInstance(PeopleDto, rawData)

      validate(dtoData).then((errors) => {
        if (errors.length > 0) {
          console.log('Validation failed: ', errors);
        } else {
          console.log('Validation successful');
        }
      });

      // repository.create(dtoData);
      // repository.save(dtoData);
    }

    url = response.next;
  }
}
