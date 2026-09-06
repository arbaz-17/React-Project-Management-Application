import { createBrowserRouter } from 'react-router-dom'

import DashboardPage from '../pages/DashboardPage'
import ProjectsPage from '../pages/ProjectsPage'
import ProjectBoardPage from '../pages/ProjectBoardPage'
import TaskDetailsPage from '../pages/TaskDetailsPage'
import NotFoundPage from '../pages/NotFoundPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardPage />,
  },
  {
    path: '/projects',
    element: <ProjectsPage />,
  },
  {
    path: '/projects/:projectId',
    element: <ProjectBoardPage />,
  },
  {
    path: '/projects/:projectId/tasks/:taskId',
    element: <TaskDetailsPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])

export default router