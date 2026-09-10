import Button from "./Button";
import Modal from "./Modal";

function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  isConfirming = false,
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
        <Button
          variant="secondary"
          onClick={onClose}
          disabled={isConfirming}
        >
          Cancel
        </Button>

        <Button
          variant="danger"
          onClick={onConfirm}
          disabled={isConfirming}
        >
          {isConfirming ? 'Deleting...' : confirmLabel}
        </Button>
      </div>
    </Modal>
  )
}

export default ConfirmationDialog;
