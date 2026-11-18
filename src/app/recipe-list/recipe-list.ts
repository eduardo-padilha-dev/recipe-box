import { Component, input, output } from '@angular/core';
import { RecipeCard } from '../recipe-card/recipe-card';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-recipe-list',
  imports: [RecipeCard],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css',
})
export class RecipeList {
  readonly recipes = input.required<readonly Recipe[]>();
  readonly selectedRecipeId = input<string | null>(null);
  readonly selectRecipe = output<string>();
}
