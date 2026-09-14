# Pages

## Overview

The `pages` folder contains route-level components. These pages compose shared UI components, feature modules, custom hooks, and TanStack Query hooks into complete application screens.

Pages mainly coordinate data loading, mutation flows, modal state, URL state, and route-specific error handling rather than owning reusable business logic.

## Main Pages

### `ProjectsPage.jsx`

The main project-management screen.

Responsibilities:

- Reads search, filter, sort, and pagination state from the URL
- Fetches project data through `useProjects`
- Coordinates create, edit, and delete project mutations
- Opens project forms inside reusable modals
- Handles loading, fetching, error, empty, and pagination states
- Resets the current page when filters change

The page keeps temporary UI state such as the currently edited or deleted project local to the page.

### `ProjectBoardPage.jsx`

Displays a single project's Kanban board.

Responsibilities:

- Reads `projectId` from the route
- Fetches the project and its tasks
- Coordinates task create, edit, delete, and move actions
- Uses separate update mutations for form edits and silent drag-and-drop moves
- Disables dragging while a move mutation is pending
- Handles project/task loading and error states
- Opens task forms and confirmation dialogs

Task movement is delegated to the shared optimistic `useUpdateTask` mutation rather than being implemented directly in the page.

### `TaskDetailsPage.jsx`

Displays detailed information for one task.

Responsibilities:

- Reads `projectId` and `taskId` from the route
- Fetches both project and task data
- Verifies that the task belongs to the requested project
- Handles loading, 404, and general error states independently
- Displays task status, priority, assignee, due date, and activity information
- Formats API date values for display

### `NotFoundPage.jsx`

Provides the fallback 404 page for unmatched application routes.

## Basic Route Flow

```text
Router
  ↓
Route Page
  ↓
Read route / URL state
  ↓
Feature query hooks
  ↓
Loading / Error / Success
  ↓
Compose feature + shared UI
  ↓
User action
  ↓
Mutation hook
  ↓
Query cache updates
  ↓
Page reflects latest state
```
