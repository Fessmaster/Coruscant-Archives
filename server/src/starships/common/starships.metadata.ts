import { IMetadata } from "src/basic/interface/metadata.interface";
import { StarshipsEntity } from "../entity/starship.entity";

export const STARSHIPS_METADATA: IMetadata<StarshipsEntity> = {
  relations: ['pilots', 'films', 'images'],
  fieldList: ['filmsIds', 'pilotsIds'],
} as const