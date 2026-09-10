import Button from "../../../components/ui/Button";

function TaskActions({ onEdit, onDelete, size = "small" }) {
  return (
    <div className="task-card-actions">
      <Button variant="secondary" size={size} onClick={onEdit}>
        Edit
      </Button>

      <Button variant="danger" size={size} onClick={onDelete}>
        Delete
      </Button>
    </div>
  );
}

export default TaskActions;
