export function validateTask(values) {
  const errors = {}

  const title = values.title.trim()
  const description = values.description.trim()
  const assignee = values.assignee.trim()

  if (!title) {
    errors.title = 'Task title is required.'
  } else if (title.length < 3) {
    errors.title =
      'Task title must be at least 3 characters.'
  } else if (title.length > 120) {
    errors.title =
      'Task title must be 120 characters or fewer.'
  }

  if (description.length > 1000) {
    errors.description =
      'Description must be 1000 characters or fewer.'
  }

  if (!values.status) {
    errors.status = 'Status is required.'
  }

  if (!values.priority) {
    errors.priority = 'Priority is required.'
  }

  if (!assignee) {
    errors.assignee = 'Assignee is required.'
  }

  return errors
}