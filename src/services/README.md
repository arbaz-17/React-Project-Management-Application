# Services

## Overview

The `services` folder contains the application's API communication layer.

It keeps HTTP request handling separate from React components and feature hooks, providing reusable functions for project and task server operations.

## Key Responsibilities

- Define the API base URL
- Centralize `fetch` configuration and HTTP error handling
- Expose reusable project API functions
- Expose reusable task API functions
- Build project query parameters for filtering, sorting, and pagination
- Add timestamps to create/update payloads
- Forward request cancellation signals where needed

## Important Files

### `apiClient.js`

Provides the shared `request()` helper used by all API modules.

Key behavior:

- Reads `VITE_API_BASE_URL` with a MockAPI fallback
- Applies JSON request headers
- Throws normalized `Error` objects for failed responses
- Attaches the HTTP status to thrown errors
- Handles `204 No Content`
- Can optionally return response metadata alongside JSON data

Centralizing this behavior prevents repeated fetch/error-handling logic across API modules.

### `projectsApi.js`

Contains all project-related API operations.

Available operations:

- Fetch paginated/filterable project lists
- Fetch a single project
- Create a project
- Update a project
- Delete a project

Project list requests support:

- Search
- Status filtering
- Category filtering
- Sorting
- Pagination

Pagination uses a fixed page size of `6`.

Because MockAPI does not directly provide the required `hasNextPage` value, the service checks the following page when the current page is full.

A `404` response for a filtered project list is treated as an empty result rather than a request failure.

### `tasksApi.js`

Contains task-related API operations.

Available operations:

- Fetch tasks belonging to a project
- Fetch a single task
- Create a task
- Update a task
- Delete a task

A `404` response when fetching a project's task collection is treated as an empty task list.

Create and update operations add `createdAt` / `updatedAt` timestamps before sending data to the API.

## Basic Data Flow

```text
Page / Feature Component
        ↓
TanStack Query Hook
        ↓
Project / Task API Function
        ↓
Shared request()
        ↓
MockAPI
        ↓
Normalized response or error
        ↓
TanStack Query cache
        ↓
UI
```

## Error & Request Handling

HTTP failures are converted into standard JavaScript errors with an additional `status` property.

This allows feature hooks and pages to make decisions such as:

- Treating `404` collection responses as empty results
- Showing dedicated not-found states for individual resources
- Disabling retries for missing entities

Project list requests also accept an `AbortSignal`, allowing TanStack Query to cancel outdated searches or filter requests.
