# App

## Overview

The `app` folder contains the application-level setup for the monthly project management application. It is responsible for wiring together routing, server-state management, theming, and global notifications before rendering feature pages.

## Key Responsibilities

- Configure the root React application providers.
- Define the application's route structure.
- Configure the shared TanStack Query client.
- Redirect the root route to the Projects page.
- Provide global toast notifications and theme support.

## Important Files

- `App.jsx` — Composes the application providers and renders the router.
- `routes.jsx` — Defines page routes, nested layout routing, dynamic project/task routes, redirects, and the 404 route.
- `queryClient.js` — Creates the shared TanStack Query client and configures default query behavior.

## Application Flow

```text
App
├── QueryClientProvider
│   └── ThemeProvider
│       ├── RouterProvider
│       │   └── AppLayout
│       │       └── Page route
│       └── Toaster
```

## Architecture Notes

TanStack Query owns server/API state through one shared `QueryClient`. Queries remain fresh for 30 seconds by default, reducing unnecessary refetching while still allowing deliberate cache invalidation after mutations.

Routing is centralized in `routes.jsx`, keeping navigation configuration separate from feature and page implementation.
