import Badge from '../../../components/ui/Badge'

import {
  TASK_STATUS_LABELS,
  TASK_STATUS_VARIANTS,
  normalizeTaskStatus,
} from '../utils/taskConstants.js'

function TaskStatusBadge({ status }) {
  const normalizedStatus =
    normalizeTaskStatus(status)

  const label =
    TASK_STATUS_LABELS[normalizedStatus] ??
    status ??
    'No Status'

  const variant =
    TASK_STATUS_VARIANTS[normalizedStatus] ??
    'default'

  return (
    <Badge variant={variant}>
      {label}
    </Badge>
  )
}

export default TaskStatusBadge