import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Recipe } from '../recipe';
import { RecipeList } from './recipe-list';

describe('RecipeList', () => {
  let fixture: ComponentFixture<RecipeList>;
  const recipes: Recipe[] = [
    {
      id: 'salad',
      name: 'Salada colorida',
      description: 'Fresca e leve.',
      category: 'Almoço',
      prepTime: 10,
      difficulty: 'Fácil',
      ingredients: ['Tomate'],
    },
    {
      id: 'soup',
      name: 'Sopa de legumes',
      description: 'Conforto em uma tigela.',
      category: 'Jantar',
      prepTime: 35,
      difficulty: 'Médio',
      ingredients: ['Cenoura'],
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeList],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeList);
    fixture.componentRef.setInput('recipes', recipes);
    await fixture.whenStable();
  });

  it('renders one card per recipe and forwards selection', () => {
    const selectedIds: string[] = [];
    fixture.componentInstance.selectRecipe.subscribe((id) => selectedIds.push(id));
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('app-recipe-card')).toHaveLength(2);
    element.querySelector<HTMLButtonElement>('app-recipe-card button')?.click();
    expect(selectedIds).toEqual(['salad']);
  });
});
