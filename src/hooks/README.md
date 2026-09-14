# Hooks

## Overview

The `hooks` folder contains reusable custom React hooks that encapsulate shared behavior used across the application.

These hooks focus on generic UI and application concerns rather than feature-specific server logic.

## Key Hooks

| Hook | Responsibility |
|---|---|
| `useDebounce` | Delays callback execution and supports cancellation/cleanup. |
| `useDisclosure` | Manages simple open/close/toggle UI state. |
| `useProjectUrlState` | Centralizes project search, filter, sort, and pagination state in the URL. |
| `useTheme` | Provides safe access to the shared theme context. |

## Hook Details

### `useDebounce`

Provides a reusable debounced callback.

Key behavior:

- Uses `useRef` to retain the latest callback without recreating timers unnecessarily
- Uses `useCallback` for stable `cancel` and debounced functions
- Clears the previous timeout before scheduling a new one
- Cleans up pending timers when the component unmounts
- Exposes both `debouncedCallback` and `cancel`

This is used for interactions such as project search, where immediate typing feedback is desirable but request-triggering updates should be delayed.

### `useDisclosure`

Encapsulates common boolean UI state.

It returns:

- `isOpen`
- `open`
- `close`
- `toggle`

The action functions use `useCallback`, making them suitable for passing to child components without changing identity on every render.

### `useProjectUrlState`

Centralizes project-related URL state using React Router's `useSearchParams`.

Supported values include:

- Search
- Status
- Category
- Priority
- Assignee
- Sort
- Page

Important behavior:

- Reads defaults when URL parameters are absent
- Removes empty/default values from the URL
- Uses `replace` by default to avoid unnecessary browser-history entries
- Provides a single `updateUrl` helper
- Provides `clearUrlState` to reset filters

Keeping this logic in one hook prevents URL parsing and mutation logic from being scattered across page and feature components.

### `useTheme`

Provides access to `ThemeContext`.

It also guards against incorrect usage by throwing an error when called outside `ThemeProvider`.
