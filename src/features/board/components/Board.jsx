import { useMemo } from "react";
import { DragDropProvider } from "@dnd-kit/react";

import BoardColumn from "./BoardColumn";
import { boardColumns } from "./boardColumns.js";

import {
  TASK_STATUSES,
  normalizeTaskStatus,
} from "../../tasks/utils/taskConstants.js";

const TASK_DRAG_PREFIX = "task:";

function Board({
  tasks,
  onEditTask,
  onDeleteTask,
  onMoveTask,
  isDragDisabled = false,
}) {
  const tasksByColumn = useMemo(() => {
    const groupedTasks = {
      [TASK_STATUSES.BACKLOG]: [],
      [TASK_STATUSES.TODO]: [],
      [TASK_STATUSES.IN_PROGRESS]: [],
      [TASK_STATUSES.DONE]: [],
    };

    tasks.forEach((task) => {
      const normalizedStatus = normalizeTaskStatus(task.status);

      if (groupedTasks[normalizedStatus]) {
        groupedTasks[normalizedStatus].push(task);
      }
    });

    return groupedTasks;
  }, [tasks]);

  function handleDragEnd(event) {
    if (event.canceled) {
      return;
    }

    const { source, target } = event.operation;

    if (!source || !target) {
      return;
    }

    const sourceId = String(source.id);

    if (!sourceId.startsWith(TASK_DRAG_PREFIX)) {
      return;
    }

    const taskId = sourceId.slice(TASK_DRAG_PREFIX.length);

    const destinationStatus = normalizeTaskStatus(target.id);

    if (!destinationStatus) {
      return;
    }

    const task = tasks.find((currentTask) => String(currentTask.id) === taskId);

    if (!task) {
      return;
    }

    const currentStatus = normalizeTaskStatus(task.status);

    if (currentStatus === destinationStatus) {
      return;
    }

    onMoveTask(task, destinationStatus);
  }

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <div className="board">
        {boardColumns.map((column) => (
          <BoardColumn
            key={column.id}
            column={column}
            tasks={tasksByColumn[column.id]}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
            isDragDisabled={isDragDisabled}
          />
        ))}
      </div>
    </DragDropProvider>
  );
}

export default Board;
