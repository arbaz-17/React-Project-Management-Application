function FetchingIndicator({ message = 'Updating...' }) {
  return (
    <div
      className="fetching-indicator"
      role="status"
      aria-live="polite"
    >
      <span
        className="fetching-indicator-spinner"
        aria-hidden="true"
      />

      <span>{message}</span>
    </div>
  )
}

export default FetchingIndicator