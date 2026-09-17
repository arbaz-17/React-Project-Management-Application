# Board Feature

## Overview

The `features/board` folder contains the Kanban board presentation, drag-and-drop behavior, and large-list rendering strategy used on the project board page.

It is responsible for grouping tasks by status, rendering board columns, handling task movement between columns, and providing loading/header UI specific to the board experience.

For large task columns, the board also uses conditional virtualization to reduce the number of mounted task cards and improve rendering performance.

## Key Responsibilities

- Render the Kanban board structure
- Group tasks into status-based columns
- Support task drag-and-drop between columns
- Normalize task statuses before rendering or moving tasks
- Render reusable board columns and task cards
- Virtualize large task columns when beneficial
- Provide board-specific loading skeletons
- Render the project board header and add-task action

## Important Files

### `Board.jsx`

The main board component.

Responsibilities:

- Groups tasks by status with `useMemo`
- Renders configured board columns
- Wraps the board with `DragDropProvider`
- Validates drag source and drop target
- Prevents unnecessary moves to the same status
- Delegates the actual task update through `onMoveTask`

The board does not directly mutate server state. It only determines the intended destination status and passes that decision upward.

### `BoardColumn.jsx`

Renders an individual Kanban column.

Responsibilities:

- Registers the column as a droppable target with `useDroppable`
- Displays the column title and task count
- Renders an empty state when no tasks exist
- Renders draggable `TaskCard` components
- Visually identifies an active drop target
- Uses regular list rendering for normal-sized columns
- Uses TanStack Virtual for large task columns
- Uses the column content area as the virtualization scroll viewport
- Measures rendered task-card height dynamically
- Applies overscan so nearby off-screen cards are rendered before they enter the viewport

Virtualization is enabled only when the number of tasks in a column exceeds the configured threshold.

```text
1–40 tasks
    ↓
Normal rendering

41+ tasks
    ↓
Virtualized rendering
```

With virtualization enabled, only the visible task cards and a small overscan area remain mounted instead of rendering the full column into the DOM.

The component is wrapped with `React.memo` to reduce unnecessary column re-renders when its props remain unchanged.

### `boardColumns.js`

Defines the board configuration for:

- Backlog
- To Do
- In Progress
- Done

Column IDs reuse the centralized task status constants to keep board and task domain values consistent.

### `BoardHeader.jsx`

Displays project information above the board.

It provides:

- Back navigation to Projects
- Project name and description
- Loading skeletons
- Add Task action

### `BoardSkeleton.jsx`

Provides the loading representation for the Kanban board.

It mirrors the real board structure and renders placeholder task cards for every configured column.

## Basic Flow

```text
Tasks received by Board
        ↓
Statuses normalized
        ↓
Tasks grouped by column
        ↓
BoardColumn receives each task group
        ↓
Task count checked
        ↓
Normal rendering OR virtualization
        ↓
TaskCard becomes draggable
        ↓
User drops task onto another column
        ↓
Board validates source + destination
        ↓
onMoveTask(task, destinationStatus)
        ↓
Parent mutation/cache logic updates task
```

## Virtualization Flow

```text
Large column (>40 tasks)
        ↓
BoardColumn uses TanStack Virtual
        ↓
.board-column-content becomes scroll viewport
        ↓
Virtualizer calculates visible task range
        ↓
Visible cards + overscan are mounted
        ↓
User scrolls
        ↓
Off-screen cards unmount
        ↓
New nearby cards mount
```

The current overscan value is `3`, which keeps a few additional task cards rendered above and below the visible viewport to make scrolling smoother.

## Performance & Architecture Notes

`useMemo` is used in `Board` to avoid regrouping every task on unrelated re-renders when the `tasks` array has not changed.

`BoardColumn` uses `React.memo` because board interactions can cause multiple surrounding renders, while individual columns only need to update when their own task list or relevant props change.

Virtualization is applied only to large columns rather than every list. Small and medium columns continue using normal rendering because the additional virtualization complexity is not justified for small datasets.

A synthetic 200-task performance test showed that the largest React rendering task decreased from approximately `747.5 ms` without virtualization to approximately `468.8 ms` with virtualization, a reduction of about `37%`.

