# App

## Overview

The `app` folder contains the application-level setup for the monthly project management application. It is responsible for wiring together routing, server-state management, theming, global notifications, and route-level code splitting before rendering feature pages.

## Key Responsibilities

- Configure the root React application providers.
- Define the application's route structure.
- Configure the shared TanStack Query client.
- Redirect the root route to the Projects page.
- Provide global toast notifications and theme support.
- Lazy-load page-level route modules to reduce the initial JavaScript bundle.
- Provide an accessible Suspense fallback while lazy route chunks are loading.

## Important Files

- `App.jsx` — Composes the application providers and renders the router.
- `routes.jsx` — Defines page routes, nested layout routing, dynamic project/task routes, redirects, Suspense boundaries, and the 404 route.
- `lazyPages.jsx` — Defines page-level lazy imports using `React.lazy` so route modules are loaded only when needed.
- `queryClient.js` — Creates the shared TanStack Query client and configures default query behavior.

## Application Flow

```text
App
├── QueryClientProvider
│   └── ThemeProvider
│       ├── RouterProvider
│       │   └── AppLayout
│       │       └── Suspense
│       │           └── Lazy page route
│       └── Toaster
```

## Architecture Notes

TanStack Query owns server/API state through one shared `QueryClient`. Queries remain fresh for 30 seconds by default, reducing unnecessary refetching while still allowing deliberate cache invalidation after mutations.

Routing is centralized in `routes.jsx`, keeping navigation configuration separate from feature and page implementation.

Page modules are code-split at the route level with `React.lazy`. `ProjectsPage`, `ProjectBoardPage`, `TaskDetailsPage`, and `NotFoundPage` are loaded only when their routes are visited, while `AppLayout` remains eagerly loaded because it is the persistent application shell used by the main routes.

Lazy page definitions are kept in `lazyPages.jsx` rather than mixed into the router configuration. This keeps the router file focused on route structure and avoids Fast Refresh warnings caused by mixing component declarations with non-component exports.

Each lazy route is wrapped in `Suspense` and reuses the shared `LoadingState` component as an accessible fallback while a route chunk is being fetched.
