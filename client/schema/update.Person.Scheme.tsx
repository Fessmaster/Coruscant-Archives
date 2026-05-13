import { z } from "zod";

export const UpdatePersonSchema = z.object({
  name: z
    .string("Name must be a string")
    .min(2, "Name too short")
    .max(50, "Name too long"),
  about: z
    .string("About must be a string")
    .min(2, "About too short")
    .max(50, "About too long"),
  height: z.preprocess(
    // transform empty field to undefined
    (val) => (val === "" ? undefined : val),
    z.coerce.number().positive().optional(),
  ),
  mass: z.coerce.number().positive(),
  hair_color: z
    .string("Hair_color must be a string")
    .min(2, "Hair_color too short")
    .max(50, "Hair_color too long"),
  skin_color: z
    .string("skin_color must be a string")
    .min(2, "skin_color too short")
    .max(50, "skin_color too long"),
  eye_color: z
    .string("eye_color must be a string")
    .min(2, "eye_color too short")
    .max(50, "eye_color too long"),
  birth_year: z
    .string("birth_year must be a string")
    .min(2, "birth_year too short")
    .max(50, "birth_year too long"),
  gender: z.enum(["male", "female", "n/a"]),
  homeworld:z.preprocess(
    // transform empty field to undefined
    (val) => (val === "" ? undefined : val),
    z.coerce.number().positive().optional(),
  ),
  films: z.string().transform((val) => {
    if (!val || val==='') return [];
    return val
      .split(",")
      .map((id) => Number(id.trim()))
      .filter((id) => !isNaN(id));
  }),  
  species: z.string().transform((val) => {
    if (!val|| val==='') return [];
    return val
      .split(",")
      .map((id) => parseInt(id.trim()))
      .filter((id) => !isNaN(id));
  }).optional(),
  starships: z.string().transform((val) => {
    if (!val|| val==='') return [];
    return val
      .split(",")
      .map((id) => parseInt(id.trim()))
      .filter((id) => !isNaN(id));
  }).optional(),
  vehicles: z.string().transform((val) => {
    if (!val|| val==='') return [];
    return val
      .split(",")
      .map((id) => parseInt(id.trim()))
      .filter((id) => !isNaN(id));
  }).optional(),
  images: z.string().transform((val) => {
    if (!val|| val==='') return [];
    return val
      .split(",")
      .map((id) => parseInt(id.trim()))
      .filter((id) => !isNaN(id));
  }).optional(),
}).transform(data => ({
  ...data,
  filmsIds: data.films,
  films: undefined,
  vehiclesIds: data.vehicles,
  vehicles: undefined,
  starshipsIds: data.starships,
  starships: undefined,
  speciesIds: data.species,
  species: undefined,
  homeworldId: data.homeworld,
  homeworld:undefined  
}));
