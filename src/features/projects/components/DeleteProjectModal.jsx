import Button from '../../../components/ui/Button'
import Modal from '../../../components/ui/Modal'

function DeleteProjectModal({ project, isOpen, onClose, onConfirm }) {
  if (!project) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Project"
      size="small"
    >
      <p className="delete-project-message">
        Are you sure you want to delete <strong>{project.name}</strong>?
      </p>
      <p className="delete-project-warning">
        This action cannot be undone.
      </p>

      <div className="project-form-actions">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={() => onConfirm(project.id)}>
          Delete Project
        </Button>
      </div>
    </Modal>
  )
}

export default DeleteProjectModal