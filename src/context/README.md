# Context

## Overview

The `context` folder contains shared React Context used for application-wide client UI state.

Currently, it provides the application's theme system, allowing components across the app to read the active theme and toggle between light and dark mode without prop drilling.

## Key Responsibilities

- Define the shared `ThemeContext`
- Store the current light/dark theme state
- Restore a previously selected theme from `localStorage`
- Fall back to the user's system color preference
- Apply the active theme to the document root
- Persist theme changes between sessions
- Expose theme state and actions to descendant components

## Important Files

### `ThemeContext.js`

Creates and exports the shared React context using `createContext`.

It is intentionally kept separate from the provider implementation so consumers can access the context through a dedicated custom hook.

### `ThemeProvider.jsx`

Owns and provides the application's theme state.

Key behavior:

- Initializes the theme from `localStorage` when available
- Otherwise checks `prefers-color-scheme`
- Uses `useState` for client-side theme state
- Uses `useEffect` to synchronize React state with:
  - the document's `data-theme` attribute
  - `localStorage`
- Provides `isDarkMode` and `toggleTheme` to descendant components


## State & Architecture Notes

Theme state is a good fit for React Context because it is shared by distant UI components but is still client-side presentation state.

It is not stored in Redux because the theme does not require complex global state logic, selectors, server synchronization, or cross-feature business behavior.

The `useEffect` is justified because it synchronizes React state with external browser systems: the DOM and `localStorage`.
