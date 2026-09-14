import Badge from '../../../components/ui/Badge'

import {
  TASK_PRIORITY_VARIANTS,
  normalizeTaskPriority,
} from '../utils/taskConstants'

function TaskPriorityBadge({ priority }) {
  const normalizedPriority =
    normalizeTaskPriority(priority)

  const variant =
    TASK_PRIORITY_VARIANTS[
      normalizedPriority
    ] ?? 'default'

  return (
    <Badge variant={variant}>
      {normalizedPriority ||
        priority ||
        'No Priority'}
    </Badge>
  )
}

export default TaskPriorityBadge