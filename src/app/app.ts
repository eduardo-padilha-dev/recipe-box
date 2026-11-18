import { Component, computed, signal } from '@angular/core';
import { Recipe } from './recipe';
import { RecipeList } from './recipe-list/recipe-list';

const INITIAL_RECIPES: readonly Recipe[] = [
  {
    id: 'sopa-abobora',
    name: 'Sopa cremosa de abóbora',
    description: 'Aconchegante, aromática e pronta em uma panela só.',
    category: 'Jantar',
    prepTime: 35,
    difficulty: 'Fácil',
    ingredients: ['Abóbora', 'Cebola', 'Gengibre'],
  },
  {
    id: 'tacos-grao-bico',
    name: 'Tacos de grão-de-bico',
    description: 'Tortilhas crocantes com recheio temperado e fresco.',
    category: 'Jantar',
    prepTime: 25,
    difficulty: 'Fácil',
    ingredients: ['Grão-de-bico', 'Tortilhas', 'Abacate'],
  },
  {
    id: 'panquecas-banana',
    name: 'Panquecas de banana',
    description: 'Café da manhã macio, dourado e naturalmente doce.',
    category: 'Café da manhã',
    prepTime: 20,
    difficulty: 'Fácil',
    ingredients: ['Banana', 'Aveia', 'Canela'],
  },
  {
    id: 'salada-colorida',
    name: 'Salada colorida',
    description: 'Uma combinação crocante para deixar o almoço mais leve.',
    category: 'Almoço',
    prepTime: 10,
    difficulty: 'Fácil',
    ingredients: ['Tomate', 'Pepino', 'Folhas verdes'],
  },
];

@Component({
  selector: 'app-root',
  imports: [RecipeList],
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly recipes = signal<readonly Recipe[]>(INITIAL_RECIPES);
  protected readonly searchTerm = signal('');
  protected readonly selectedCategory = signal<string | null>(null);
  protected readonly selectedRecipeId = signal<string | null>(INITIAL_RECIPES[0].id);

  protected readonly categories = computed(() =>
    Array.from(new Set(this.recipes().map((recipe) => recipe.category))),
  );

  protected readonly filteredRecipes = computed(() => {
    const search = this.searchTerm().trim().toLocaleLowerCase();
    const category = this.selectedCategory();

    return this.recipes().filter((recipe) => {
      const matchesSearch =
        search.length === 0 ||
        `${recipe.name} ${recipe.description} ${recipe.category}`
          .toLocaleLowerCase()
          .includes(search);
      const matchesCategory = category === null || recipe.category === category;

      return matchesSearch && matchesCategory;
    });
  });

  protected readonly selectedRecipe = computed(
    () => this.recipes().find((recipe) => recipe.id === this.selectedRecipeId()) ?? null,
  );

  protected updateSearchTerm(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  protected selectCategory(category: string | null): void {
    this.selectedCategory.set(category);
  }

  protected selectRecipe(id: string): void {
    this.selectedRecipeId.set(id);
  }
}
