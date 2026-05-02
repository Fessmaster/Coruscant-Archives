import { IMetadata } from "src/basic/interface/metadata.interface";
import { VehiclesEntity } from "../entity/vehicles.entity";

export const VEHICLES_METADATA: IMetadata<VehiclesEntity> = {
  relations: ['pilots', 'films', 'images'],
  fieldList: ['filmsIds', 'pilotsIds'],
} as const