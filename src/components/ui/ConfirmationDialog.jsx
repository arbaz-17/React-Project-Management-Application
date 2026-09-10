import Button from './Button'
import Modal from './Modal'

function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="small"
    >
      <p className="confirmation-dialog-message">
        {message}
      </p>

      <p className="confirmation-dialog-warning">
        This action cannot be undone.
      </p>

      <div className="confirmation-dialog-actions">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>

        <Button variant="danger" onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  )
}

export default ConfirmationDialog