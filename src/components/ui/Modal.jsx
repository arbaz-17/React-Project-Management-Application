import { useEffect, useId, useRef } from 'react'

function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium',
}) {
  const modalRef = useRef(null)
  const previouslyFocusedElementRef = useRef(null)
  const titleId = useId()

  useEffect(() => {
    if (!isOpen) {
      return
    }

    previouslyFocusedElementRef.current = document.activeElement

    const previousBodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    modalRef.current?.focus()

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)

      document.body.style.overflow = previousBodyOverflow

      const previouslyFocusedElement =
        previouslyFocusedElementRef.current

      if (previouslyFocusedElement instanceof HTMLElement) {
        previouslyFocusedElement.focus()
      }

      previouslyFocusedElementRef.current = null
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  return (
    <div
      className="modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <div
        ref={modalRef}
        className={`modal modal-${size}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
      >
        <div className="modal-header">
          <h2 id={titleId}>{title}</h2>

          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal