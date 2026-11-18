import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  let fixture: ComponentFixture<App>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('renders the Smart Recipe Box with the initial collection', () => {
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('h1')?.textContent).toContain('Smart Recipe Box');
    expect(element.querySelectorAll('app-recipe-card')).toHaveLength(4);
  });

  it('filters recipes by search term and displays an empty state when needed', () => {
    const element = fixture.nativeElement as HTMLElement;
    const search = element.querySelector<HTMLInputElement>('#recipe-search');

    expect(search).not.toBeNull();
    if (!search) return;

    search.value = 'sopa';
    search.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(element.querySelectorAll('app-recipe-card')).toHaveLength(1);
    expect(element.textContent).toContain('Sopa cremosa de abóbora');

    search.value = 'pizza de chocolate';
    search.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(element.querySelector('.empty-state')?.textContent).toContain('Nenhuma receita encontrada');
  });

  it('filters recipes by category and shows the selected recipe summary', () => {
    const element = fixture.nativeElement as HTMLElement;
    const categoryButton = Array.from(element.querySelectorAll('button')).find(
      (button) => button.textContent?.trim() === 'Jantar',
    );

    categoryButton?.click();
    fixture.detectChanges();
    expect(element.querySelectorAll('app-recipe-card')).toHaveLength(2);

    element.querySelector<HTMLButtonElement>('app-recipe-card button')?.click();
    fixture.detectChanges();
    expect(element.querySelector('.selected-recipe')?.textContent).toContain('Sopa cremosa de abóbora');
  });
});
