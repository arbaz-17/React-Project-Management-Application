import Badge from '../../../components/ui/Badge'

const statusLabels = {
  BACKLOG: 'Backlog',
  TODO: 'To Do',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
}

const statusVariants = {
  BACKLOG: 'default',
  TODO: 'info',
  IN_PROGRESS: 'warning',
  DONE: 'success',
}

function TaskStatusBadge({ status }) {
  return (
    <Badge variant={statusVariants[status] ?? 'default'}>
      {statusLabels[status] ?? status}
    </Badge>
  )
}

export default TaskStatusBadge