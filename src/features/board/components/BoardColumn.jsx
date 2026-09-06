import Card from '../../../components/ui/Card'
import TaskCard from '../../tasks/components/TaskCard'

function BoardColumn({
  column,
  tasks,
  onEditTask,
  onDeleteTask,
}) {
  return (
    <Card className="board-column">
      <div className="board-column-header">
        <h3>{column.title}</h3>
        <span className="board-column-count">{tasks.length}</span>
      </div>

      <div className="board-column-content">
        {tasks.length === 0 ? (
          <p className="board-column-empty">No tasks in this column.</p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          ))
        )}
      </div>
    </Card>
  )
}

export default BoardColumn