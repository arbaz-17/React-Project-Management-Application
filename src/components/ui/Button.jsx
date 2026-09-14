function Button({
  children,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  disabled = false,
  isLoading = false,
  className = '',
  ...props
}) {
  const buttonClassName = [
    'button',
    `button-${variant}`,
    `button-${size}`,
    isLoading ? 'button-loading' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type={type}
      className={buttonClassName}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {isLoading && (
        <span
          className="button-spinner"
          aria-hidden="true"
        />
      )}

      <span className="button-content">{children}</span>
    </button>
  )
}

export default Button