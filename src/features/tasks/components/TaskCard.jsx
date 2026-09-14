import { memo } from "react";
import { GripVertical } from "lucide-react";
import { Link } from "react-router-dom";
import { useDraggable } from "@dnd-kit/react";

import Card from "../../../components/ui/Card";

import AssigneeAvatar from "./AssigneeAvatar";
import TaskActions from "./TaskActions";
import TaskPriorityBadge from "./TaskPriorityBadge";

function TaskCard({
  task,
  onEdit,
  onDelete,
  draggable = false,
  dragDisabled = false,
}) {
  const { ref, handleRef, isDragging, isDropping } = useDraggable({
    id: `task:${task.id}`,
    type: "task",
    disabled: !draggable || dragDisabled,
  });

  const wrapperClassName = [
    "task-card-drag-wrapper",
    draggable ? "task-card-draggable" : "",
    isDragging ? "task-card-dragging" : "",
    isDropping ? "task-card-dropping" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={ref} className={wrapperClassName}>
      <Card className="task-card">
        <div className="task-card-header">
          <div className="task-card-heading">
            {draggable && (
              <button
                ref={handleRef}
                type="button"
                className="task-card-drag-handle"
                disabled={dragDisabled}
                aria-label={`Move ${task.title} to another status`}
                title="Drag to change status"
              >
                <GripVertical size={16} aria-hidden="true" />
              </button>
            )}

            <div className="task-card-title">
              <Link
                to={`/projects/${task.projectId}/tasks/${task.id}`}
                className="task-title-link"
              >
                {task.title}
              </Link>
            </div>
          </div>

          <TaskPriorityBadge priority={task.priority} />
        </div>

        {task.description && (
          <p className="task-card-description">{task.description}</p>
        )}

        <div className="task-card-meta">
          <AssigneeAvatar assignee={task.assignee} />

          {task.dueDate && (
            <span className="task-due-date">Due {task.dueDate}</span>
          )}
        </div>

        <TaskActions
          onEdit={() => onEdit(task)}
          onDelete={() => onDelete(task)}
        />
      </Card>
    </div>
  );
}

export default memo(TaskCard);
