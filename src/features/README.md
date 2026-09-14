# Features

## Overview

The `features` folder contains the main domain-oriented modules of the application. Each feature keeps its own UI, hooks, and supporting logic close to the business area it belongs to.

## Feature Modules

| Module | Responsibility | Documentation |
|---|---|---|
| `board/` | Renders the Kanban board, groups tasks by status, and handles drag-and-drop task movement between columns. | [Board README](./board/README.md) |
| `projects/` | Handles project UI, forms, filtering, validation, queries, mutations, and project-specific domain logic. | [Projects README](./projects/README.md) |
| `tasks/` | Handles task UI, forms, badges, validation, queries, optimistic updates, and task-specific domain logic. | [Tasks README](./tasks/README.md) |

## Architecture Note

Feature-specific code stays inside its own module, while shared UI, layout, API services, and app-level configuration remain outside `features/`.

This keeps responsibilities clear and reduces coupling between project, task, and board logic.
