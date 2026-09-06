import EmptyState from '../../../components/ui/EmptyState'

import TaskCard from './TaskCard'

function TaskList({
  tasks,
  onEdit,
  onDelete,
}) {
  if (tasks.length === 0) {
    return (
      <EmptyState
        title="No tasks"
        message="There are no tasks to display."
      />
    )
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default TaskList