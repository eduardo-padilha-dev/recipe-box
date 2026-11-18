import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Recipe } from '../recipe';
import { RecipeCard } from './recipe-card';

describe('RecipeCard', () => {
  let fixture: ComponentFixture<RecipeCard>;
  const recipe: Recipe = {
    id: 'tacos',
    name: 'Tacos de grão-de-bico',
    description: 'Uma receita rápida e crocante.',
    category: 'Jantar',
    prepTime: 25,
    difficulty: 'Fácil',
    ingredients: ['Grão-de-bico', 'Tortilhas'],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeCard],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeCard);
    fixture.componentRef.setInput('recipe', recipe);
    await fixture.whenStable();
  });

  it('renders the recipe details and emits its id when selected', () => {
    const selectedIds: string[] = [];
    fixture.componentInstance.select.subscribe((id) => selectedIds.push(id));
    fixture.detectChanges();

    const card = fixture.nativeElement as HTMLElement;
    expect(card.textContent).toContain('Tacos de grão-de-bico');
    expect(card.textContent).toContain('Jantar');
    expect(card.textContent).toContain('25 min');
    expect(card.textContent).toContain('Grão-de-bico');
    expect(card.querySelector('button')?.getAttribute('aria-label')).toBe(
      'Ver receita: Tacos de grão-de-bico',
    );

    card.querySelector<HTMLButtonElement>('button')?.click();
    expect(selectedIds).toEqual(['tacos']);
  });
});
