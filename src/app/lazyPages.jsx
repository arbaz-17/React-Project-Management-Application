import { lazy } from 'react'

export const ProjectsPage = lazy(() => import('../pages/ProjectsPage'))

export const ProjectBoardPage = lazy(
  () => import('../pages/ProjectBoardPage'),
)

export const TaskDetailsPage = lazy(
  () => import('../pages/TaskDetailsPage'),
)

export const NotFoundPage = lazy(() => import('../pages/NotFoundPage'))