import { useState } from 'react'

import Button from '../../../components/ui/Button'
import Input from '../../../components/ui/Input'
import Select from '../../../components/ui/Select'
import Textarea from '../../../components/ui/Textarea'
import { validateTask } from '../utils/taskValidation'

const statusOptions = [
  { value: 'BACKLOG', label: 'Backlog' },
  { value: 'TODO', label: 'To Do' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'DONE', label: 'Done' },
]

const priorityOptions = [
  { value: 'LOW', label: 'Low' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HIGH', label: 'High' },
]

function TaskForm({
  initialValues,
  onSubmit,
  onCancel,
  submitLabel = 'Create Task',
  isSubmitting = false,
  serverError = null,
}) {
  const [values, setValues] = useState({
    title: initialValues?.title ?? '',
    description: initialValues?.description ?? '',
    status: initialValues?.status ?? 'TODO',
    priority: initialValues?.priority ?? 'MEDIUM',
    assignee: initialValues?.assignee ?? '',
    dueDate: initialValues?.dueDate ?? '',
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

    const validationErrors = validateTask(values)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    onSubmit({
      title: values.title.trim(),
      description: values.description.trim(),
      status: values.status,
      priority: values.priority,
      assignee: values.assignee.trim(),
      dueDate: values.dueDate || null,
    })
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      {serverError && (
        <p className="form-error" role="alert">
          {serverError}
        </p>
      )}

      <Input
        id="task-title"
        name="title"
        label="Task Title"
        value={values.title}
        onChange={handleChange}
        placeholder="e.g. Implement login page"
        required
        disabled={isSubmitting}
        error={errors.title}
      />

      <Textarea
        id="task-description"
        name="description"
        label="Description"
        value={values.description}
        onChange={handleChange}
        placeholder="Describe the task..."
        rows={5}
        disabled={isSubmitting}
        error={errors.description}
      />

      <div className="task-form-grid">
        <Select
          id="task-status"
          name="status"
          label="Status"
          value={values.status}
          onChange={handleChange}
          options={statusOptions}
          required
          disabled={isSubmitting}
          error={errors.status}
        />

        <Select
          id="task-priority"
          name="priority"
          label="Priority"
          value={values.priority}
          onChange={handleChange}
          options={priorityOptions}
          required
          disabled={isSubmitting}
          error={errors.priority}
        />
      </div>

      <div className="task-form-grid">
        <Input
          id="task-assignee"
          name="assignee"
          label="Assignee"
          value={values.assignee}
          onChange={handleChange}
          placeholder="e.g. John Doe"
          required
          disabled={isSubmitting}
          error={errors.assignee}
        />

        <Input
          id="task-due-date"
          name="dueDate"
          type="date"
          label="Due Date"
          value={values.dueDate}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      </div>

      <div className="form-actions">
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

export default TaskForm