# Tasks Feature

## Overview

The `features/tasks` folder contains the task-management domain UI and supporting logic.

It is organized into three areas:

- `components/` — task cards, forms, badges, actions, assignee UI, and loading states
- `hooks/` — TanStack Query hooks for task queries and mutations
- `utils/` — task constants, normalization, validation, and query-key helpers

The task feature is also consumed by the Kanban board, where task cards can be moved between workflow statuses.

## Key Responsibilities

- Display task information and task details
- Create, edit, and delete tasks
- Support task status changes from drag-and-drop
- Render task status and priority consistently
- Validate task form input
- Fetch project tasks and individual task details
- Keep list/detail caches synchronized
- Perform optimistic task updates with rollback support

## Folder Structure

### `components/`

#### `TaskCard.jsx`

Displays a task inside the board.

It includes:

- Task title linked to the details page
- Priority badge
- Optional description
- Assignee information
- Optional due date
- Edit and delete actions
- Optional drag handle

When drag-and-drop is enabled, `useDraggable` registers the task using an ID in the form:

```text
task:<taskId>
```

The component is wrapped with `React.memo` to reduce unnecessary task-card re-renders during board interactions.

#### `TaskForm.jsx`

Reusable controlled form used for task creation and editing.

Responsibilities:

- Initializes values from optional existing task data
- Normalizes incoming status and priority values
- Provides sensible defaults for new tasks
- Performs client-side validation
- Displays validation and server errors
- Disables controls while submitting
- Produces a clean payload for the mutation layer

#### `TaskActions.jsx`

Small reusable action group for editing and deleting tasks.

#### `AssigneeAvatar.jsx`

Combines the shared `Avatar` component with the assignee name.

#### `TaskPriorityBadge.jsx`

Normalizes a priority value and maps it to the appropriate badge variant.

#### `TaskStatusBadge.jsx`

Normalizes a task status and converts internal values into user-friendly labels and visual variants.

#### Loading Components

- `TaskCardSkeleton.jsx` mirrors a board task card while loading
- `TaskDetailsSkeleton.jsx` mirrors the task-details page and exposes an accessible loading state

### `hooks/`

#### `useProjectTasks.js`

Fetches tasks belonging to a project.

The query is only enabled when a valid `projectId` exists.

#### `useTaskById.js`

Fetches an individual task.

A `404` response is not retried, while other failures may retry up to two times.

#### `useCreateTask()`

Creates a new task and invalidates the affected project task list after success.

#### `useDeleteTask()`

Deletes a task, removes its detail cache, and invalidates the associated project task list.

#### `useUpdateTask()`

Handles task updates and contains the feature's optimistic-update strategy.

Before the request:

1. Cancels active list and detail queries
2. Stores previous cached values
3. Applies the new values immediately to both caches
4. Adds an optimistic `updatedAt` timestamp

If the mutation fails:

- The previous task list is restored
- The previous task detail is restored
- An error toast is shown

If it succeeds:

- The server response replaces the optimistic values
- Both list and detail caches receive the confirmed task

After completion:

- The affected list and detail queries are invalidated to ensure server consistency

The hook also supports optional success-toast behavior so silent updates, such as board drag-and-drop, can reuse the same mutation logic.

### `utils/`

#### `taskConstants.js`

Centralizes:

- Task statuses
- Task priorities
- Select options
- Display labels
- Badge variants
- Status normalization
- Priority normalization

Normalization allows incoming values such as `in progress`, `in_progress`, and other supported formats to resolve to the canonical domain value.

#### `taskValidation.js`

Contains reusable validation rules for:

- Task title
- Description length
- Valid status
- Valid priority
- Required assignee

Keeping validation outside the form separates domain rules from presentation code.

#### `queryKeys.js`

Defines the task query-key factory.

```text
tasks
├── list
│   └── filters / projectId
└── detail
    └── taskId
```

Centralized keys make cancellation, invalidation, cache reads, and optimistic updates predictable.

## Basic Task Flow

```text
Project Board / Task Details
          ↓
TanStack Query hook
          ↓
Tasks API
          ↓
Query cache
          ↓
Task UI

Create / Edit / Drag / Delete
          ↓
Mutation hook
          ↓
API request
          ↓
Cache update / invalidation
          ↓
UI refresh
```


