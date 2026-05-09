export interface IPeople {
  readonly id: number

  readonly name: string;

  readonly about?: string;

  readonly height?: number | null;

  readonly mass?: number | null;

  readonly hair_color: string;

  readonly skin_color: string;

  readonly eye_color: string;

  readonly birth_year: string;

  readonly gender: string;

  readonly homeworldId?: number;

  readonly filmsIds?: number[];

  readonly speciesIds?: number[];

  readonly vehiclesIds?: number[];

  readonly starshipsIds?: number[];
}
