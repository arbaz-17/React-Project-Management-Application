import { useState } from 'react'

import Button from '../../../components/ui/Button'
import Input from '../../../components/ui/Input'
import Textarea from '../../../components/ui/Textarea'
import { validateProject } from '../../../utils/projectValidation.js'

function ProjectForm({
  initialValues,
  onSubmit,
  onCancel,
  submitLabel = 'Create Project',
  isSubmitting = false,
  serverError = null,
}) {
  const [values, setValues] = useState({
    name: initialValues?.name ?? '',
    description: initialValues?.description ?? '',
    category: initialValues?.category ?? '',
    status: initialValues?.status ?? '',
  })

  const [errors, setErrors] = useState({})

  function handleChange(event) {
    const { name, value } = event.target

    setValues((current) => ({
      ...current,
      [name]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    const validationErrors = validateProject(values)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    onSubmit({
      name: values.name.trim(),
      description: values.description.trim(),
      category: values.category.trim(),
      status: values.status.trim(),
    })
  }

  return (
    <form className="project-form" onSubmit={handleSubmit}>
      {serverError && (
        <p className="form-error" role="alert">
          {serverError}
        </p>
      )}

      <Input
        id="project-name"
        label="Project Name"
        name="name"
        value={values.name}
        onChange={handleChange}
        placeholder="e.g. Website Redesign"
        required
        disabled={isSubmitting}
        error={errors.name}
      />

      <Textarea
        id="project-description"
        label="Description"
        name="description"
        value={values.description}
        onChange={handleChange}
        placeholder="Describe the project..."
        rows={5}
        disabled={isSubmitting}
        error={errors.description}
      />

      <Input
        id="project-category"
        label="Category"
        name="category"
        value={values.category}
        onChange={handleChange}
        placeholder="e.g. Web Development"
        disabled={isSubmitting}
      />

      <Input
        id="project-status"
        label="Status"
        name="status"
        value={values.status}
        onChange={handleChange}
        placeholder="e.g. Active"
        disabled={isSubmitting}
      />

      <div className="project-form-actions">
        <Button
          variant="secondary"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : submitLabel}
        </Button>
      </div>
    </form>
  )
}

export default ProjectForm