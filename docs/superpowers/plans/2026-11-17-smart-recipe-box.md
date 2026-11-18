# Smart Recipe Box Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Angular starter screen with an accessible local Recipe Box demonstrating fundamentals, Signals, control flow, and nested components.

**Architecture:** `App` owns the local recipe state and derived Signals. `RecipeList` renders the filtered collection and forwards selection. `RecipeCard` renders one recipe and emits selection. No services, routing, forms, persistence, or backend are introduced.

**Tech Stack:** Angular 22 standalone components, TypeScript strict mode, Signals, native control flow, Vitest through Angular CLI, CSS.

**Spec:** `docs/superpowers/specs/2026-11-17-smart-recipe-box-design.md`

## Global Constraints

- Keep the implementation within Angular fundamentals, Signals, and component architecture.
- Do not add services, dependency injection, routing, forms, persistence, or backend behavior.
- Use accessible semantic HTML, labels, keyboard-focusable controls, and visible focus styles.
- Use strict TypeScript and avoid `any`.

## Review Focus

- Empty search/category results must show an informative empty state rather than a blank page; test in the root component suite.
- Selecting a recipe must update the detail summary and selected styling; test through the root component.
- A card must expose its action as a keyboard-accessible button; test the rendered child component.
- Recipe data must render safely when tags are present or absent; test the card template with representative data.
- Narrow layouts must remain readable without horizontal overflow; verify through the build and a manual browser check.

### Task 1: Define recipe data and child component contracts

**Files:**
- Create: `src/app/recipe.ts`
- Create: `src/app/recipe-card/recipe-card.ts`
- Create: `src/app/recipe-card/recipe-card.html`
- Create: `src/app/recipe-card/recipe-card.css`
- Create: `src/app/recipe-card/recipe-card.spec.ts`

**Interfaces:**
- `Recipe` contains `id`, `name`, `description`, `category`, `prepTime`, `difficulty`, and `ingredients: string[]`.
- `RecipeCard` consumes `recipe = input.required<Recipe>()` and `selected = input(false)`; it produces `select = output<string>()`.

- [ ] Write a failing component test proving a recipe name, category, preparation time, and ingredients render and that the card emits its recipe id when activated.
- [ ] Run `npx ng test --watch=false` for the focused spec and verify the expected missing-component failure.
- [ ] Implement the `Recipe` type and the standalone `RecipeCard` with a semantic article and button, native bindings, and a compact responsive style.
- [ ] Run the focused card test and verify it passes.
- [ ] Commit with `git add src/app/recipe.ts src/app/recipe-card && git commit -m "feat: add recipe card component"`.

### Task 2: Build the recipe list component

**Files:**
- Create: `src/app/recipe-list/recipe-list.ts`
- Create: `src/app/recipe-list/recipe-list.html`
- Create: `src/app/recipe-list/recipe-list.css`
- Create: `src/app/recipe-list/recipe-list.spec.ts`

**Interfaces:**
- `RecipeList` consumes `recipes = input.required<Recipe[]>()` and `selectedRecipeId = input<string | null>(null)`; it produces `selectRecipe = output<string>()`.

- [ ] Write a failing test proving the list renders one card per recipe and forwards a child selection event.
- [ ] Run the focused list spec and verify it fails because the component does not exist.
- [ ] Implement `RecipeList` using `@for` with a stable `track recipe.id` expression and an accessible list heading.
- [ ] Run the focused list test and verify it passes.
- [ ] Commit with `git add src/app/recipe-list && git commit -m "feat: add recipe list component"`.

### Task 3: Replace the starter shell with the Smart Recipe Box

**Files:**
- Modify: `src/app/app.ts`
- Modify: `src/app/app.html`
- Modify: `src/app/app.css`
- Modify: `src/app/app.spec.ts`
- Modify: `src/styles.css`

**Interfaces:**
- `App` owns `recipes`, `searchTerm`, `selectedCategory`, and `selectedRecipeId` Signals; it exposes computed `categories`, `filteredRecipes`, and `selectedRecipe` to its template.
- `App` handles `onSearchTermChange(value: string)`, `selectCategory(category: string | null)`, and `selectRecipe(id: string)`.

- [ ] Replace the starter assertions with failing tests for the Smart Recipe Box heading, initial recipe rendering, search filtering, category filtering, and selected-recipe summary.
- [ ] Run the app spec and confirm the new behavior fails against the starter screen.
- [ ] Implement the root state with Signals and pure computed filtering; import only the child component and required Angular directives/pipes.
- [ ] Implement the template with a labeled search input, category buttons, `@if` empty state, `@for` composition through `RecipeList`, and selected detail panel.
- [ ] Replace starter styles with responsive, high-contrast layout and visible focus states; keep all static content local.
- [ ] Run the app spec and verify it passes.
- [ ] Commit with `git add src/app src/styles.css && git commit -m "feat: build smart recipe box shell"`.

### Task 4: Full verification and delivery preparation

**Files:**
- Modify: `README.md`

- [ ] Add concise README instructions for `npm install`, `npm start`, `npm test`, and the activity scope.
- [ ] Run `npm test -- --watch=false` and confirm exit code 0.
- [ ] Run `npm run build` and confirm exit code 0.
- [ ] Inspect `git log --oneline` and `git status --short --branch` to confirm focused commits and no unintended files.
- [ ] Attempt `git push` over SSH; if the environment blocks network access, report that exact limitation and provide the command for the user's terminal.
