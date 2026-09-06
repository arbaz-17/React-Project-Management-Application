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
}) {
  const [values, setValues] = useState({
    name: initialValues?.name ?? '',
    description: initialValues?.description ?? '',
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
    })
  }

  return (
    <form className="project-form" onSubmit={handleSubmit}>
      <Input
        id="project-name"
        label="Project Name"
        name="name"
        value={values.name}
        onChange={handleChange}
        placeholder="e.g. Website Redesign"
        required
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
        error={errors.description}
      />

      <div className="project-form-actions">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}

export default ProjectForm