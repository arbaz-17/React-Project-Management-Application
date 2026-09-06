function Avatar({
  src,
  alt = '',
  name,
  size = 'medium',
}) {
  const fallback = name?.charAt(0).toUpperCase() || '?'

  return (
    <div className={`avatar avatar-${size}`}>
      {src ? (
        <img src={src} alt={alt || name || 'User avatar'} />
      ) : (
        <span aria-hidden="true">{fallback}</span>
      )}
    </div>
  )
}

export default Avatar