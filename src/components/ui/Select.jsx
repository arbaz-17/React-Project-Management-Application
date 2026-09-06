function Select({
  label,
  id,
  name,
  value,
  onChange,
  options = [],
  disabled = false,
  required = false,
  error,
}) {
  return (
    <div className="form-field">
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      )}

      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`select ${error ? 'input-error' : ''}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <p className="form-error">{error}</p>}
    </div>
  )
}

export default Select