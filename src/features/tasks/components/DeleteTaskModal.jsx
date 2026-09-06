import Button from '../../../components/ui/Button'
import Modal from '../../../components/ui/Modal'

function DeleteTaskModal({
  task,
  isOpen,
  onClose,
  onConfirm,
}) {
  if (!task) {
    return null
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Task"
      size="small"
    >
      <p className="delete-project-message">
        Are you sure you want to delete{' '}
        <strong>{task.title}</strong>?
      </p>

      <p className="delete-project-warning">
        This action cannot be undone.
      </p>

      <div className="project-form-actions">
        <Button
          variant="secondary"
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          variant="danger"
          onClick={() => onConfirm(task.id)}
        >
          Delete Task
        </Button>
      </div>
    </Modal>
  )
}

export default DeleteTaskModal