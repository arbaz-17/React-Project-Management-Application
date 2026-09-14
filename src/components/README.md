# Components

## Overview

The `components` folder contains reusable application UI and layout building blocks. It is divided into:

- `layout/` — application shell and navigation structure
- `ui/` — small reusable interface components used across features and pages

## Key Responsibilities

- Provide the shared application layout
- Handle responsive sidebar behavior
- Provide desktop and mobile navigation controls
- Expose the routed page area through React Router
- Support theme switching
- Keep common UI elements reusable and separate from feature-specific logic

## Folder Structure

### `layout/`

The `layout` folder defines the main application shell.

#### `AppLayout.jsx`

Acts as the top-level layout for routed pages.

Responsibilities:

- Manages collapsed desktop sidebar state
- Manages mobile sidebar open/close state
- Renders the shared `Sidebar`, `Header`, and page container
- Uses React Router's `Outlet` to render the active route
- Adds an accessible mobile backdrop
- Closes the mobile sidebar when the `Escape` key is pressed
- Cleans up the keyboard event listener through `useEffect`

#### `Header.jsx`

Provides the application's top header.

Responsibilities:

- Controls desktop sidebar collapse/expand
- Opens the mobile navigation
- Displays application title information
- Provides light/dark theme switching through `useTheme`
- Uses accessible labels and `aria-expanded` / `aria-controls`

#### `Sidebar.jsx`

Provides the main application navigation.

Responsibilities:

- Supports collapsed desktop and open mobile states
- Uses `NavLink` for route-aware navigation
- Highlights the active route
- Provides desktop collapse and mobile close controls
- Uses stable navigation configuration through `navigationItems`

#### `PageContainer.jsx`

A lightweight layout wrapper that provides the shared `<main>` container for routed page content.

### `ui/`

The `ui` folder contains small reusable interface primitives used throughout the application.

These components are intentionally kept generic so they can be reused by pages and feature modules without containing project-specific business logic.

## Basic Layout Flow

```text
App
└── AppLayout
    ├── Sidebar
    └── App Main
        ├── Header
        └── PageContainer
            └── Outlet
                └── Active Route Page
```
