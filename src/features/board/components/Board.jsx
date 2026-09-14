import { useMemo } from 'react'

import BoardColumn from './BoardColumn'
import { boardColumns } from './boardColumns.js'

import {
  TASK_STATUSES,
  normalizeTaskStatus,
} from '../../tasks/utils/taskConstants.js'

function Board({
  tasks,
  onEditTask,
  onDeleteTask,
}) {
  const tasksByColumn = useMemo(() => {
    const groupedTasks = {
      [TASK_STATUSES.BACKLOG]: [],
      [TASK_STATUSES.TODO]: [],
      [TASK_STATUSES.IN_PROGRESS]: [],
      [TASK_STATUSES.DONE]: [],
    }

    tasks.forEach((task) => {
      const normalizedStatus =
        normalizeTaskStatus(task.status)

      if (groupedTasks[normalizedStatus]) {
        groupedTasks[
          normalizedStatus
        ].push(task)
      }
    })

    return groupedTasks
  }, [tasks])

  return (
    <div className="board">
      {boardColumns.map((column) => (
        <BoardColumn
          key={column.id}
          column={column}
          tasks={
            tasksByColumn[column.id]
          }
          onEdit={onEditTask}
          onDelete={onDeleteTask}
        />
      ))}
    </div>
  )
}

export default Board