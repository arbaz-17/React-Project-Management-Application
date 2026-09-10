import { memo } from 'react'
import { Link } from 'react-router-dom'

import Card from '../../../components/ui/Card'

import AssigneeAvatar from './AssigneeAvatar'
import TaskActions from './TaskActions'
import TaskPriorityBadge from './TaskPriorityBadge'

function TaskCard({ task, onEdit, onDelete }) {
  return (
    <Card className="task-card">
      <div className="task-card-header">
        <div className="task-card-title">
          <Link
            to={`/projects/${task.projectId}/tasks/${task.id}`}
            className="task-title-link"
          >
            {task.title}
          </Link>
        </div>

        <TaskPriorityBadge priority={task.priority} />
      </div>

      {task.description && (
        <p className="task-card-description">
          {task.description}
        </p>
      )}

      <div className="task-card-meta">
        <AssigneeAvatar assignee={task.assignee} />

        {task.dueDate && (
          <span className="task-due-date">
            Due {task.dueDate}
          </span>
        )}
      </div>

      <TaskActions
        onEdit={() => onEdit(task)}
        onDelete={() => onDelete(task)}
      />
    </Card>
  )
}

export default memo(TaskCard)