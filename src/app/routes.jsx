import { Navigate, createHashRouter } from 'react-router-dom'

import AppLayout from '../components/layout/AppLayout'
import NotFoundPage from '../pages/NotFoundPage'
import ProjectBoardPage from '../pages/ProjectBoardPage'
import ProjectsPage from '../pages/ProjectsPage'
import TaskDetailsPage from '../pages/TaskDetailsPage'

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
        element: <ProjectsPage />,
      },
      {
        path: 'projects/:projectId',
        element: <ProjectBoardPage />,
      },
      {
        path: 'projects/:projectId/tasks/:taskId',
        element: <TaskDetailsPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])

export default router