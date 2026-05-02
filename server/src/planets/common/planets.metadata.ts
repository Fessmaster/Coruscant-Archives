import { IMetadata } from "src/basic/interface/metadata.interface";
import { PlanetsEntity } from "../entity/planets.entity";

export const PLANETS_METADATA: IMetadata<PlanetsEntity> = {
  relations: ['residents', 'films', 'images'],
  fieldList: ['filmsIds', 'residentsIds'],
} as const