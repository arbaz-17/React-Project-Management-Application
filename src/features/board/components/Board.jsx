import { useMemo } from 'react'

import BoardColumn from './BoardColumn'
import { boardColumns } from './boardColumns.js'

function Board({ tasks, onEditTask, onDeleteTask }) {
  const tasksByColumn = useMemo(() => {
    const groupedTasks = {
      BACKLOG: [],
      TODO: [],
      IN_PROGRESS: [],
      DONE: [],
    }

    tasks.forEach((task) => {
      if (groupedTasks[task.status]) {
        groupedTasks[task.status].push(task)
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
          tasks={tasksByColumn[column.id]}
          onEdit={onEditTask}
          onDelete={onDeleteTask}
        />
      ))}
    </div>
  )
}

export default Board