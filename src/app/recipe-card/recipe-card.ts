import { Component, input, output } from '@angular/core';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.css',
  host: {
    class: 'recipe-card-host',
  },
})
export class RecipeCard {
  readonly recipe = input.required<Recipe>();
  readonly selected = input(false);
  readonly select = output<string>();

  protected selectRecipe(): void {
    this.select.emit(this.recipe().id);
  }
}
