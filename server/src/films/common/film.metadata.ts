import { IMetadata } from "src/basic/interface/metadata.interface";
import { FilmsEntity } from "../entity/films.entity";

export const FILM_METADATA: IMetadata<FilmsEntity> = {
  relations: ['images', 'characters', 'vehicles', 'species'],
  fieldList: ['charactersIds', 'planetsIds', 'vehiclesIds', 'speciesIds'],
} as const