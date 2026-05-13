import { IMetadata } from "src/basic/interface/metadata.interface";
import { PeopleEntity } from "../entity/people.entity";

export const PEOPLE_METADATA: IMetadata<PeopleEntity> = {
  relations: ['homeworld', 'vehicles', 'starships', 'images', 'films'],
  fieldList: ['filmsIds', 'starshipsIds', 'vehiclesIds', 'speciesIds'],
} as const