import { useMemo } from 'react'

import BoardColumn from './BoardColumn'

const columns = [
  { id: 'BACKLOG', title: 'Backlog' },
  { id: 'TODO', title: 'To Do' },
  { id: 'IN_PROGRESS', title: 'In Progress' },
  { id: 'DONE', title: 'Done' },
]

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
      {columns.map((column) => (
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