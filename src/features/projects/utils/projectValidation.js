import {
  PROJECT_STATUSES,
} from './projectConstants.js'

export function validateProject(values) {
  const errors = {}

  const name = values.name.trim()
  const description = values.description.trim()

  const validStatuses = Object.values(PROJECT_STATUSES)

  if (!name) {
    errors.name = 'Project name is required.'
  } else if (name.length < 3) {
    errors.name = 'Project name must be at least 3 characters.'
  } else if (name.length > 100) {
    errors.name = 'Project name must be 100 characters or fewer.'
  }

  if (description.length > 500) {
    errors.description =
      'Description must be 500 characters or fewer.'
  }

  if (!values.status) {
    errors.status = 'Project status is required.'
  } else if (!validStatuses.includes(values.status)) {
    errors.status = 'Select a valid project status.'
  }

  return errors
}