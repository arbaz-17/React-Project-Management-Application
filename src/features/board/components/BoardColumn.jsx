import { memo, useCallback, useState } from "react";
import { useDroppable } from "@dnd-kit/react";
import { useVirtualizer } from "@tanstack/react-virtual";

import TaskCard from "../../tasks/components/TaskCard";

const VIRTUALIZATION_THRESHOLD = 40;
const ESTIMATED_TASK_HEIGHT = 180;
const VIRTUAL_OVERSCAN = 3;

function BoardColumn({
  column,
  tasks,
  onEdit,
  onDelete,
  isDragDisabled = false,
}) {
  const [scrollElement, setScrollElement] = useState(null);

  const { ref: droppableRef, isDropTarget } = useDroppable({
    id: column.id,
    accept: "task",
  });

  const shouldVirtualize = tasks.length > VIRTUALIZATION_THRESHOLD;

  const getItemKey = useCallback((index) => tasks[index]?.id ?? index, [tasks]);

  const virtualizer = useVirtualizer({
    count: tasks.length,
    getScrollElement: () => scrollElement,
    estimateSize: () => ESTIMATED_TASK_HEIGHT,
    getItemKey,
    overscan: VIRTUAL_OVERSCAN,
    enabled: shouldVirtualize && Boolean(scrollElement),
    useFlushSync: false,
  });

  const className = [
    "board-column",
    isDropTarget ? "board-column-drop-target" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={droppableRef}
      className={className}
      aria-label={`${column.title} column`}
    >
      <div className="board-column-header">
        <h3>{column.title}</h3>
        <span className="board-column-count">{tasks.length}</span>
      </div>

      <div ref={setScrollElement} className="board-column-content">
        {tasks.length === 0 ? (
          <p className="board-column-empty">No tasks in this column.</p>
        ) : shouldVirtualize ? (
          <div
            className="board-column-virtual-list"
            style={{
              height: `${virtualizer.getTotalSize()}px`,
            }}
          >
            {virtualizer.getVirtualItems().map((virtualItem) => {
              const task = tasks[virtualItem.index];

              if (!task) {
                return null;
              }

              return (
                <div
                  key={task.id}
                  ref={virtualizer.measureElement}
                  data-index={virtualItem.index}
                  className="board-column-virtual-item"
                  style={{
                    transform: `translateY(${virtualItem.start}px)`,
                  }}
                >
                  <TaskCard
                    task={task}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    draggable
                    dragDisabled={isDragDisabled}
                  />
                </div>
              );
            })}
          </div>
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
