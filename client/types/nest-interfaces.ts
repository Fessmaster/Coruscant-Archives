export interface NestImages {
  id: number;
  url: string;
}
export interface NestPeople {
  id: number;
  name: string;
  about?: string | '';
  height?: number | null;
  mass?: number | null;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  images: NestImages[];
}

export interface NestFilms {
  id: number;
  about: string;
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  images: NestImages[];
}

export interface NestPlanets {
  id: number;
  about: string;
  name: string;
  rotation_period: number | null;
  orbital_period: number | null;
  diameter: number | null;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: number | null;
  population: number | null;
  images: NestImages[];
}

export interface NestSpecies {
  id: number;
  about: string;
  name: string;
  classification: string;
  designation: string;
  average_height: number | null;
  skin_colors: string;
  hair_colors: string;
  eye_colors: string;
  average_lifespan: number | null;
  language: string;
  images: NestImages[];
}

export interface NestVehicles {
  id: number;
  about: string;
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: number | null;
  length: number | null;
  max_atmosphering_speed: number | null;
  crew: string;
  passengers: number | null;
  cargo_capacity: string;
  consumables: string;
  vehicles_class: string;
  images: NestImages[];
}

export interface NestStarships {
  id: number;
  about: string;
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: number | null;
  length: number | null;
  max_atmosphering_speed: number | null;
  crew: string;
  passengers: number | null;
  cargo_capacity: number | null;
  consumables: string;
  hyperdrive_rating: number | null;
  MGLT: number | null;
  starship_class: string;
  images: NestImages[];
}
