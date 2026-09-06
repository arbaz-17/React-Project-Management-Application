function EmptyState({
  title,
  message,
  action,
}) {
  return (
    <div className="empty-state">
      <div className="empty-state-content">
        <h3>{title}</h3>

        {message && <p>{message}</p>}

        {action && (
          <div className="empty-state-action">
            {action}
          </div>
        )}
      </div>
    </div>
  )
}

export default EmptyState