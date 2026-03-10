import { Repository } from 'typeorm';
import { parseUrl } from '../utils/parse.url.utils';
import { getResponse } from './get.response.seeding';
import { People } from 'src/people/people.entity';
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

      const newPerson = repository.save({
        name: name,
        height: height,
        mass: mass,
        hair_color: hair_color,
        skin_color: skin_color,
        eye_color: eye_color,
        birth_year: birth_year,
        gender: gender,
        external_id: externalId
      });
    }   

    url = response.next;
  }
}
