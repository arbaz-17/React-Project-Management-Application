function Textarea({
  label,
  id,
  name,
  value,
  onChange,
  placeholder,
  disabled = false,
  required = false,
  rows = 4,
  error,
}) {
  const errorId = `${id}-error`

  return (
    <div className="form-field">
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      )}

      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        rows={rows}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`textarea ${error ? 'input-error' : ''}`}
      />

      {error && (
        <p id={errorId} className="form-error">
          {error}
        </p>
      )}
    </div>
  )
}

export default Textarea