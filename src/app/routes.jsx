import { Suspense } from 'react'
import { Navigate, createHashRouter } from 'react-router-dom'

import AppLayout from '../components/layout/AppLayout'
import LoadingState from '../components/ui/LoadingState'

import {
  NotFoundPage,
  ProjectBoardPage,
  ProjectsPage,
  TaskDetailsPage,
} from './lazyPages'

const routeFallback = <LoadingState message="Loading page..." />

const router = createHashRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/projects" replace />,
      },
      {
        path: 'projects',
        element: (
          <Suspense fallback={routeFallback}>
            <ProjectsPage />
          </Suspense>
        ),
      },
      {
        path: 'projects/:projectId',
        element: (
          <Suspense fallback={routeFallback}>
            <ProjectBoardPage />
          </Suspense>
        ),
      },
      {
        path: 'projects/:projectId/tasks/:taskId',
        element: (
          <Suspense fallback={routeFallback}>
            <TaskDetailsPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '*',
    element: (
      <Suspense fallback={routeFallback}>
        <NotFoundPage />
      </Suspense>
    ),
  },
])

export default router