export const TASK_STATUSES = {
  BACKLOG: 'Backlog',
  TODO: 'Todo',
  IN_PROGRESS: 'In_Progress',
  DONE: 'Done',
}

export const TASK_PRIORITIES = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
}

export const TASK_STATUS_OPTIONS = [
  {
    value: TASK_STATUSES.BACKLOG,
    label: 'Backlog',
  },
  {
    value: TASK_STATUSES.TODO,
    label: 'To Do',
  },
  {
    value: TASK_STATUSES.IN_PROGRESS,
    label: 'In Progress',
  },
  {
    value: TASK_STATUSES.DONE,
    label: 'Done',
  },
]

export const TASK_PRIORITY_OPTIONS = [
  {
    value: TASK_PRIORITIES.LOW,
    label: 'Low',
  },
  {
    value: TASK_PRIORITIES.MEDIUM,
    label: 'Medium',
  },
  {
    value: TASK_PRIORITIES.HIGH,
    label: 'High',
  },
]

export const TASK_STATUS_LABELS = {
  [TASK_STATUSES.BACKLOG]: 'Backlog',
  [TASK_STATUSES.TODO]: 'To Do',
  [TASK_STATUSES.IN_PROGRESS]: 'In Progress',
  [TASK_STATUSES.DONE]: 'Done',
}

export const TASK_STATUS_VARIANTS = {
  [TASK_STATUSES.BACKLOG]: 'default',
  [TASK_STATUSES.TODO]: 'info',
  [TASK_STATUSES.IN_PROGRESS]: 'warning',
  [TASK_STATUSES.DONE]: 'success',
}

export const TASK_PRIORITY_VARIANTS = {
  [TASK_PRIORITIES.LOW]: 'default',
  [TASK_PRIORITIES.MEDIUM]: 'warning',
  [TASK_PRIORITIES.HIGH]: 'danger',
}

export function normalizeTaskStatus(status) {
  if (!status) {
    return ''
  }

  const normalizedStatus = String(status)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '_')

  const statusMap = {
    backlog: TASK_STATUSES.BACKLOG,
    todo: TASK_STATUSES.TODO,
    to_do: TASK_STATUSES.TODO,
    in_progress: TASK_STATUSES.IN_PROGRESS,
    done: TASK_STATUSES.DONE,
  }

  return statusMap[normalizedStatus] ?? ''
}

export function normalizeTaskPriority(priority) {
  if (!priority) {
    return ''
  }

  const normalizedPriority = String(priority)
    .trim()
    .toLowerCase()

  const priorityMap = {
    low: TASK_PRIORITIES.LOW,
    medium: TASK_PRIORITIES.MEDIUM,
    high: TASK_PRIORITIES.HIGH,
  }

  return priorityMap[normalizedPriority] ?? ''
}