import { createBrowserRouter } from 'react-router-dom'

import AppLayout from '../components/layout/AppLayout'
import DashboardPage from '../pages/DashboardPage'
import NotFoundPage from '../pages/NotFoundPage'
import ProjectBoardPage from '../pages/ProjectBoardPage'
import ProjectsPage from '../pages/ProjectsPage'
import TaskDetailsPage from '../pages/TaskDetailsPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
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