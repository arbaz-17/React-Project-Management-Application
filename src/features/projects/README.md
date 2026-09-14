# Projects Feature

## Overview

The `features/projects` folder contains the project-management domain UI and supporting logic.

It is organized into three areas:

- `components/` — project cards, forms, filters, lists, and loading states
- `hooks/` — TanStack Query hooks for project queries and mutations
- `utils/` — project constants, validation, normalization, and query-key helpers

## Key Responsibilities

- Display project lists and project cards
- Create, edit, and delete projects
- Search, filter, and sort projects
- Validate project form input
- Fetch project data with TanStack Query
- Keep project list/detail caches synchronized after mutations
- Provide consistent project status/category values across the feature

## Folder Structure

### `components/`

#### `ProjectCard.jsx`

Displays a single project with:

- Name and description
- Category
- Status badge
- Link to the project board
- Edit and delete actions

Status styling is derived from centralized project constants rather than being hard-coded in the component.

#### `ProjectCardSkeleton.jsx`

Provides a loading placeholder that mirrors the structure of a real project card.

#### `ProjectFilters.jsx`

Contains project search, filtering, and sorting controls.

Key behavior:

- Search input uses local state for immediate typing feedback
- Search updates are debounced before being passed upward
- Status, category, and sort values are controlled by the parent
- Active filters are counted and can be cleared
- The filter panel is collapsible and uses accessible ARIA attributes

#### `ProjectForm.jsx`

Reusable controlled form used for both project creation and editing.

Responsibilities:

- Initializes values from optional existing project data
- Normalizes incoming category/status values
- Performs client-side validation
- Displays field and server errors
- Prevents submission while invalid
- Disables inputs during mutation submission

#### `ProjectList.jsx`

Renders the project collection.

It handles three main UI states:

- Loading → project-card skeletons
- Empty → context-aware empty state
- Success → project cards

The empty-state message changes depending on whether filters are active.

### `hooks/`

#### `useProjects.js`

Fetches the project list with TanStack Query.

The filter object is included in the query key so each filter combination has its own cache entry.

TanStack Query's `AbortSignal` is forwarded to the API layer so obsolete requests can be cancelled automatically.

#### `useProjectById.js`

Fetches an individual project by ID.

Important behavior:

- Query is disabled until a valid `projectId` exists
- `404` responses are not retried
- Other failures can retry up to two times

#### Project Mutation Hooks

`useCreateProject`, `useUpdateProject`, and `useDeleteProject` wrap server mutations.

Cache behavior:

- Create → invalidate project lists
- Update → update the project detail cache and invalidate lists
- Delete → remove the deleted detail query and invalidate lists

Success and failure feedback is shown through Sonner toasts.

### `utils/`

#### `projectConstants.js`

Centralizes:

- Project statuses
- Status select options
- Badge variants
- Project categories
- Category select options
- Category normalization

This prevents duplicated domain values across forms, filters, cards, and API-facing logic.

#### `projectValidation.js`

Contains reusable project form validation rules for:

- Name requirements and length
- Description length
- Valid category selection
- Valid status selection

Validation stays outside the form component so business rules remain easier to maintain and test.

#### `queryKeys.js`

Defines the project query-key factory.

```text
projects
├── list
│   └── filters
└── detail
    └── projectId
```

Centralized query keys make cache invalidation and direct cache updates predictable.

## Basic Project Flow

```text
Projects Page
     ↓
URL/search/filter state
     ↓
useProjects(filters)
     ↓
Projects API
     ↓
TanStack Query cache
     ↓
ProjectList
     ↓
ProjectCard

Create / Edit / Delete
     ↓
Mutation hook
     ↓
API request
     ↓
Cache update or invalidation
     ↓
UI refresh
```

## State & Architecture Notes

Server-owned project data is managed by TanStack Query rather than duplicated in Redux or component state.

Local React state is used only where it belongs, such as:

- Form field values
- Validation errors
- Filter-panel visibility
- Immediate search-input text

Search is debounced before updating the parent state, which reduces unnecessary request frequency while keeping the input responsive.

