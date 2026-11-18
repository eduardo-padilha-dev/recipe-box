export type Difficulty = 'Fácil' | 'Médio' | 'Avançado';

export interface Recipe {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly category: string;
  readonly prepTime: number;
  readonly difficulty: Difficulty;
  readonly ingredients: readonly string[];
}
