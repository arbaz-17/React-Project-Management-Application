import { Link, useParams } from 'react-router-dom'

import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import LoadingState from '../components/ui/LoadingState'
import ErrorState from '../components/ui/ErrorState'

import AssigneeAvatar from '../features/tasks/components/AssigneeAvatar'
import TaskPriorityBadge from '../features/tasks/components/TaskPriorityBadge'
import TaskStatusBadge from '../features/tasks/components/TaskStatusBadge'

import useProjectById from '../features/projects/hooks/useProjectById'
import useTaskById from '../features/tasks/hooks/useTaskById'

function TaskDetailsPage() {
  const { projectId, taskId } = useParams()

  const {
    data: project,
    isLoading: isProjectLoading,
    isError: isProjectError,
    error: projectError,
  } = useProjectById(projectId)

  const {
  data: task,
  isLoading: isTaskLoading,
  isError: isTaskError,
  error: taskError,
  refetch: refetchTask,
} = useTaskById(taskId)


  if (isProjectLoading || isTaskLoading) {
    return (
      <section className="page task-details-page">
        <LoadingState message="Loading task..." />
      </section>
    )
  }

  if (isProjectError) {
    return (
      <section className="page task-details-page">
        <ErrorState
          title="Unable to load project"
          message={projectError.message}
        />
      </section>
    )
  }

  if (!project) {
    return (
      <section className="page task-details-page">
        <ErrorState
          title="Project Not Found"
          message="The project you're looking for doesn't exist."
          action={
            <Link
              to="/projects"
              className="button button-primary button-medium"
            >
              Back to Projects
            </Link>
          }
        />
      </section>
    )
  }

  if (isTaskError) {
    return (
      <section className="page task-details-page">
        <ErrorState
          title="Unable to load task"
          message={taskError.message}
          action={
            <Button onClick={() => refetchTask()}>
              Try Again
            </Button>
          }
        />
      </section>
    )
  }

  if (!task || task.projectId !== projectId) {
    return (
      <section className="page task-details-page">
        <ErrorState
          title="Task Not Found"
          message="The task you're looking for doesn't exist in this project."
          action={
            <Link
              to={`/projects/${projectId}`}
              className="button button-primary button-medium"
            >
              Back to Board
            </Link>
          }
        />
      </section>
    )
  }

  return (
    <section className="page task-details-page">
      <div className="task-details-header">
        <div>
          <Link
            to={`/projects/${projectId}`}
            className="project-back-link"
          >
            ← Back to Board
          </Link>

          <h2>{task.title}</h2>
        </div>
      </div>

      <Card className="task-details-card">
        <div className="task-details-section">
          <h3>Description</h3>

          <p className="task-details-description">
            {task.description || 'No description provided.'}
          </p>
        </div>

        <div className="task-details-section">
          <h3>Task Information</h3>

          <div className="task-details-grid">
            <div className="task-detail-item">
              <span className="task-detail-label">Status</span>
              <TaskStatusBadge status={task.status} />
            </div>

            <div className="task-detail-item">
              <span className="task-detail-label">Priority</span>
              <TaskPriorityBadge priority={task.priority} />
            </div>

            <div className="task-detail-item">
              <span className="task-detail-label">Assignee</span>
              <AssigneeAvatar assignee={task.assignee} />
            </div>

            <div className="task-detail-item">
              <span className="task-detail-label">Due Date</span>
              <span>{task.dueDate || 'No due date'}</span>
            </div>
          </div>
        </div>

        <div className="task-details-section">
          <h3>Activity</h3>

          <div className="task-details-dates">
            <div>
              <span className="task-detail-label">Created</span>
              <span>{formatDate(task.createdAt)}</span>
            </div>

            <div>
              <span className="task-detail-label">
                Last Updated
              </span>
              <span>{formatDate(task.updatedAt)}</span>
            </div>
          </div>
        </div>

        <div className="task-details-actions">
          <Link to={`/projects/${projectId}`}>
            <Button variant="secondary">
              Back to Board
            </Button>
          </Link>
        </div>
      </Card>
    </section>
  )
}

function formatDate(dateString) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(dateString))
}

export default TaskDetailsPage