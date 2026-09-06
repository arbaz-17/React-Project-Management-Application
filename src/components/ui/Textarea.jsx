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
  return (
    <div className="form-field">
      {label && (
        <label
          htmlFor={id}
          className="form-label"
        >
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
        className={`textarea ${error ? 'input-error' : ''}`}
      />

      {error && (
        <p className="form-error">
          {error}
        </p>
      )}
    </div>
  )
}

export default Textarea