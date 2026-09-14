export const PROJECT_STATUSES = {
  ACTIVE: 'Active',
  COMPLETED: 'Completed',
  ARCHIVED: 'Archived',
}

export const PROJECT_STATUS_OPTIONS = [
  {
    value: PROJECT_STATUSES.ACTIVE,
    label: PROJECT_STATUSES.ACTIVE,
  },
  {
    value: PROJECT_STATUSES.COMPLETED,
    label: PROJECT_STATUSES.COMPLETED,
  },
  {
    value: PROJECT_STATUSES.ARCHIVED,
    label: PROJECT_STATUSES.ARCHIVED,
  },
]

export const PROJECT_STATUS_VARIANTS = {
  [PROJECT_STATUSES.ACTIVE]: 'success',
  [PROJECT_STATUSES.COMPLETED]: 'info',
  [PROJECT_STATUSES.ARCHIVED]: 'default',
}

export const PROJECT_CATEGORIES = {
  WEB_DEVELOPMENT: 'Web Development',
  MOBILE_DEVELOPMENT: 'Mobile Development',
  DESIGN: 'Design',
  MARKETING: 'Marketing',
  INTERNAL_OPERATIONS: 'Internal Operations',
}

export const PROJECT_CATEGORY_OPTIONS = [
  {
    value: PROJECT_CATEGORIES.WEB_DEVELOPMENT,
    label: PROJECT_CATEGORIES.WEB_DEVELOPMENT,
  },
  {
    value: PROJECT_CATEGORIES.MOBILE_DEVELOPMENT,
    label: PROJECT_CATEGORIES.MOBILE_DEVELOPMENT,
  },
  {
    value: PROJECT_CATEGORIES.DESIGN,
    label: PROJECT_CATEGORIES.DESIGN,
  },
  {
    value: PROJECT_CATEGORIES.MARKETING,
    label: PROJECT_CATEGORIES.MARKETING,
  },
  {
    value: PROJECT_CATEGORIES.INTERNAL_OPERATIONS,
    label: PROJECT_CATEGORIES.INTERNAL_OPERATIONS,
  },
]

export function normalizeProjectCategory(category) {
  if (!category) {
    return ''
  }

  const normalizedCategory = String(category)
    .trim()
    .toLowerCase()

  const matchingCategory = Object.values(
    PROJECT_CATEGORIES,
  ).find(
    (projectCategory) =>
      projectCategory.toLowerCase() ===
      normalizedCategory,
  )

  return matchingCategory ?? ''
}