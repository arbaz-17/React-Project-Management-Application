import { Link } from 'react-router-dom'

import Avatar from '../../../components/ui/Avatar'
import Badge from '../../../components/ui/Badge'
import Button from '../../../components/ui/Button'
import Card from '../../../components/ui/Card'

const priorityVariants = {
  LOW: 'default',
  MEDIUM: 'warning',
  HIGH: 'danger',
}

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
        <Badge variant={priorityVariants[task.priority]}>
          {task.priority}
        </Badge>
      </div>

      {task.description && (
        <p className="task-card-description">
          {task.description}
        </p>
      )}

      <div className="task-card-meta">
        <div className="task-assignee">
          <Avatar name={task.assignee} size="small" />
          <span>{task.assignee}</span>
        </div>

        {task.dueDate && (
          <span className="task-due-date">Due {task.dueDate}</span>
        )}
      </div>

      <div className="task-card-actions">
        <Button variant="secondary" size="small" onClick={() => onEdit(task)}>
          Edit
        </Button>
        <Button variant="danger" size="small" onClick={() => onDelete(task)}>
          Delete
        </Button>
      </div>
    </Card>
  )
}

export default TaskCard