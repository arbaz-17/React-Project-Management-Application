# React Project Management Application - Month 2 Project

A Mini Jira / Trello-style project management application built with React as part of the Month 2 React Engineering project.

## Overview

This project demonstrates how a larger React application can be structured using reusable components, feature-based architecture, intentional state ownership, server-state management, URL-driven filters, accessible UI patterns, and performance-aware rendering.

The application allows users to create and manage projects, organize project tasks on a Kanban board, update task status through drag-and-drop, and view detailed task information.

## What Was Created

The application currently includes:

- Project management
- Project search, filtering, sorting, and pagination
- Kanban-style project boards
- Task management
- Drag-and-drop task status updates
- Task details pages
- Light and dark themes
- Responsive sidebar navigation
- Loading, fetching, empty, error, and not-found states
- Reusable UI components
- MockAPI-based server persistence

## Key Features

- **Project CRUD** — create, edit, delete, and browse projects
- **Task CRUD** — create, edit, delete, and inspect tasks
- **Kanban Board** — Backlog, To Do, In Progress, and Done columns
- **Drag & Drop** — move tasks between workflow statuses
- **Optimistic Updates** — task changes appear immediately with rollback support
- **URL State** — project search, filters, sorting, and pagination persist in the URL
- **Debounced Search** — reduces unnecessary project search requests
- **Server-State Caching** — powered by TanStack Query
- **Theme Support** — persisted light/dark mode with system preference fallback
- **Responsive Layout** — collapsible desktop sidebar and mobile navigation
- **Accessible UI** — keyboard behavior, ARIA attributes, focus-aware modal patterns, and semantic states
- **User Feedback** — skeletons, background-fetch indicators, confirmation dialogs, and toast notifications

## Module Responsibilities

| Module | Responsibility | Documentation |
|---|---|---|
| `app/` | Application setup, routing, providers, and TanStack Query configuration | [README](./src/app/README.md) |
| `components/` | Shared UI primitives and application layout components | [README](./src/components/README.md) |
| `context/` | Shared theme context and persistence | [README](./src/context/README.md) |
| `features/` | Domain-oriented board, project, and task modules | [README](./src/features/README.md) |
| `hooks/` | Reusable application-level custom hooks | [README](./src/hooks/README.md) |
| `pages/` | Route-level screens and feature orchestration | [README](./src/pages/README.md) |
| `services/` | API client and project/task server communication | [README](./src/services/README.md) |
| `styles/` | Base, layout, component, feature, and theme styling | — |

## React Concepts Used

The current implementation demonstrates:

- Functional components and component composition
- Props and local state
- Controlled forms
- `useState`
- `useEffect` with cleanup
- `useRef`
- `useContext`
- `useMemo`
- `useCallback`
- Custom hooks
- Context / Provider
- State colocation
- URL-based state with `useSearchParams`
- React Router and nested routing
- TanStack Query queries and mutations
- Query keys and caching
- Cache invalidation
- Direct cache updates
- Optimistic updates with rollback
- Request cancellation
- Derived state
- `React.memo`
- Stable list keys
- Reusable loading / error / empty-state patterns
- Accessible modal and navigation interactions

## Project Structure

```text
src/
├── app/
│   ├── App.jsx
│   ├── queryClient.js
│   └── routes.jsx
├── components/
│   ├── layout/
│   └── ui/
├── context/
├── features/
│   ├── board/
│   ├── projects/
│   └── tasks/
├── hooks/
├── pages/
├── services/
│   └── api/
├── styles/
└── main.jsx
```

The project follows a **feature/domain-oriented architecture**. Feature-specific UI, hooks, and domain utilities remain close to their respective modules, while shared components, services, and application configuration stay separate.

## Tech Stack

- React 19
- Vite
- React Router
- TanStack Query
- dnd-kit
- Sonner
- Lucide React
- MockAPI
- Vanilla CSS

## Demo

**Live Demo:**
[Live Demo](https://arbaz-17.github.io/React-Project-Management-Application/)
