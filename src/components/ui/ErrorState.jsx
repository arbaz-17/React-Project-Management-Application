function ErrorState({
  title = 'Something went wrong',
  message = 'We were unable to load this content.',
  action,
}) {
  return (
    <div className="error-state" role="alert">
      <div className="error-state-content">
        <h3>{title}</h3>

        <p>{message}</p>

        {action && (
          <div className="error-state-action">
            {action}
          </div>
        )}
      </div>
    </div>
  )
}

export default ErrorState