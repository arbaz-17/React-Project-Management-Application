# Board Feature

## Overview

The `features/board` folder contains the Kanban board presentation and drag-and-drop behavior used on the project board page.

It is responsible for grouping tasks by status, rendering board columns, handling task movement between columns, and providing loading/header UI specific to the board experience.

## Key Responsibilities

- Render the Kanban board structure
- Group tasks into status-based columns
- Support task drag-and-drop between columns
- Normalize task statuses before rendering or moving tasks
- Render reusable board columns and task cards
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
BoardColumn renders each task group
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

## Performance & Architecture Notes

`useMemo` is used in `Board` to avoid regrouping every task on unrelated re-renders when the `tasks` array has not changed.

`BoardColumn` uses `React.memo` because board interactions can cause multiple surrounding renders, while individual columns only need to update when their own task list or relevant props change.

These optimizations are localized to the board, where repeated lists and drag interactions make render behavior more relevant than in small static components.

