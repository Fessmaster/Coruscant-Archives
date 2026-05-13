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

  readonly homeworld?: number;

  readonly films?: number[];

  readonly species?: number[];

  readonly vehicles?: number[];

  readonly starships?: number[];
}
