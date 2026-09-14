import {
  TASK_STATUSES,
} from '../../tasks/utils/taskConstants.js'

export const boardColumns = [
  {
    id: TASK_STATUSES.BACKLOG,
    title: 'Backlog',
  },
  {
    id: TASK_STATUSES.TODO,
    title: 'To Do',
  },
  {
    id: TASK_STATUSES.IN_PROGRESS,
    title: 'In Progress',
  },
  {
    id: TASK_STATUSES.DONE,
    title: 'Done',
  },
]