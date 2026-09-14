import { memo } from "react";
import { useDroppable } from "@dnd-kit/react";

import TaskCard from "../../tasks/components/TaskCard";

function BoardColumn({
  column,
  tasks,
  onEdit,
  onDelete,
  isDragDisabled = false,
}) {
  const { ref, isDropTarget } = useDroppable({
    id: column.id,
    accept: "task",
  });

  const className = [
    "board-column",
    isDropTarget ? "board-column-drop-target" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={ref} className={className} aria-label={`${column.title} column`}>
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
              onEdit={onEdit}
              onDelete={onDelete}
              draggable
              dragDisabled={isDragDisabled}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default memo(BoardColumn);
