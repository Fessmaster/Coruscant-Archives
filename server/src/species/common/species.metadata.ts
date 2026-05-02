import { IMetadata } from "src/basic/interface/metadata.interface";
import { SpeciesEntity } from "../entity/species.entity";

export const SPECIES_METADATA: IMetadata<SpeciesEntity> = {
  relations: ['people', 'films', 'images'],
  fieldList: ['filmsIds', 'peopleIds'],
} as const