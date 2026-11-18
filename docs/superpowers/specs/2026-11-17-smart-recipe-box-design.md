# Smart Recipe Box — design

## Intent

Transform the Angular starter into a small, accessible recipe browser that demonstrates the first three tutor phases: Angular fundamentals, reactive state with Signals, and component architecture.

## Goals

- Show a recipe list with nested recipe-card components.
- Use Signals for the recipe collection, selected recipe, and filtering state.
- Use Angular control flow (`@if`, `@for`) and event/data binding.
- Keep the app usable with keyboard navigation and readable visual contrast.
- Preserve a simple local-only data model suitable for a learning lab.

## Non-goals

- No services, dependency injection, routing, forms, persistence, or backend.
- No authentication, recipe creation, editing, or deletion.
- No external image or API dependency.

## Approaches

1. **Single root component:** fastest, but does not demonstrate component architecture clearly.
2. **Root shell + recipe-list + recipe-card components (chosen):** makes the phase-3 boundary visible while keeping state local and avoiding services.
3. **Feature store/service architecture:** more scalable, but intentionally exceeds the assignment scope.

## Design

- `App` owns the local recipe data and derived Signals for search/category filtering and selection.
- `RecipeList` receives the filtered recipes and selected recipe through signal-based inputs and emits selection changes.
- `RecipeCard` presents one recipe and emits a selection event; its template demonstrates nested component composition.
- The root template provides the page heading, search control, category buttons, empty state, and selected-recipe summary.
- Styling uses responsive CSS, visible focus states, semantic headings, labels, buttons, and list semantics.
- Tests cover root rendering, filtering, selection, and the child component contract.

## Delivery checks

- `npm test -- --watch=false` passes.
- `npm run build` passes.
- Git history contains focused commits for the implementation stages.
- The app remains within phases 1–3.
