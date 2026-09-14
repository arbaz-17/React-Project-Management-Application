import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  FolderKanban,
} from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import ErrorState from '../components/ui/ErrorState'

import AssigneeAvatar from '../features/tasks/components/AssigneeAvatar'
import TaskDetailsSkeleton from '../features/tasks/components/TaskDetailsSkeleton'
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
    refetch: refetchProject,
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
        <TaskDetailsSkeleton />
      </section>
    )
  }

  if (isProjectError && projectError.status === 404) {
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

  if (isProjectError) {
    return (
      <section className="page task-details-page">
        <ErrorState
          title="Unable to load project"
          message={projectError.message}
          action={
            <Button onClick={() => refetchProject()}>
              Try Again
            </Button>
          }
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

  if (isTaskError && taskError.status === 404) {
    return (
      <section className="page task-details-page">
        <ErrorState
          title="Task Not Found"
          message="The task you're looking for doesn't exist."
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
      <header className="task-details-header">
        <Link
          to={`/projects/${projectId}`}
          className="task-details-back-link"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to Board
        </Link>

        <div className="task-details-heading">
          <div className="task-details-title-group">
            <div className="task-details-project">
              <FolderKanban size={15} aria-hidden="true" />
              <span>{project.name}</span>
            </div>

            <h2>{task.title}</h2>
          </div>

          <div className="task-details-badges">
            <TaskStatusBadge status={task.status} />
            <TaskPriorityBadge priority={task.priority} />
          </div>
        </div>
      </header>

      <Card className="task-details-card">
        <section className="task-details-section">
          <h3>Description</h3>

          <p className="task-details-description">
            {task.description || 'No description provided.'}
          </p>
        </section>

        <section className="task-details-section">
          <h3>Task Details</h3>

          <div className="task-details-grid">
            <div className="task-detail-item">
              <span className="task-detail-label">
                Status
              </span>

              <div className="task-detail-value">
                <TaskStatusBadge status={task.status} />
              </div>
            </div>

            <div className="task-detail-item">
              <span className="task-detail-label">
                Priority
              </span>

              <div className="task-detail-value">
                <TaskPriorityBadge priority={task.priority} />
              </div>
            </div>

            <div className="task-detail-item">
              <span className="task-detail-label">
                Assignee
              </span>

              <div className="task-detail-value">
                <AssigneeAvatar assignee={task.assignee} />
              </div>
            </div>

            <div className="task-detail-item">
              <span className="task-detail-label">
                Due Date
              </span>

              <div className="task-detail-value task-detail-date">
                <CalendarDays
                  size={16}
                  aria-hidden="true"
                />

                <span>
                  {formatDueDate(task.dueDate)}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="task-details-section">
          <h3>Activity</h3>

          <div className="task-details-activity">
            <div className="task-detail-item">
              <span className="task-detail-label">
                Created
              </span>

              <div className="task-detail-value task-detail-date">
                <Clock3 size={16} aria-hidden="true" />

                <span>
                  {formatDate(task.createdAt)}
                </span>
              </div>
            </div>

            <div className="task-detail-item">
              <span className="task-detail-label">
                Last Updated
              </span>

              <div className="task-detail-value task-detail-date">
                <Clock3 size={16} aria-hidden="true" />

                <span>
                  {formatDate(task.updatedAt)}
                </span>
              </div>
            </div>
          </div>
        </section>
      </Card>
    </section>
  )
}

function formatDate(dateString) {
  if (!dateString) {
    return 'Not available'
  }

  const date = new Date(dateString)

  if (Number.isNaN(date.getTime())) {
    return 'Not available'
  }

  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

function formatDueDate(dateString) {
  if (!dateString) {
    return 'No due date'
  }

  const dateParts = String(dateString)
    .split('T')[0]
    .split('-')
    .map(Number)

  if (
    dateParts.length !== 3 ||
    dateParts.some(Number.isNaN)
  ) {
    return 'No due date'
  }

  const [year, month, day] = dateParts

  const date = new Date(year, month - 1, day)

  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
  }).format(date)
}

export default TaskDetailsPage