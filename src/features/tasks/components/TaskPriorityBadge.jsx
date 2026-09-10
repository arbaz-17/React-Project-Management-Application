import Badge from '../../../components/ui/Badge'

const priorityVariants = {
  LOW: 'default',
  MEDIUM: 'warning',
  HIGH: 'danger',
}

function TaskPriorityBadge({ priority }) {
  return (
    <Badge variant={priorityVariants[priority] ?? 'default'}>
      {priority}
    </Badge>
  )
}

export default TaskPriorityBadge