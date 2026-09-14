function Button({
  children,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  disabled = false,
  className = '',
  ...props
}) {
  const buttonClassName = [
    'button',
    `button-${variant}`,
    `button-${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type={type}
      className={buttonClassName}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button