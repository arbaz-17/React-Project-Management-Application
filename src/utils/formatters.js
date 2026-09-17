export function formatDate(dateString) {
  if (!dateString) {
    return 'Not available'
  }

  const date = new Date(dateString)

  if (Number.isNaN(date.getTime())) {
    return 'Not available'
  }

  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

export function formatDueDate(dateString) {
  if (!dateString) {
    return 'No due date'
  }

  const dateParts = String(dateString)
    .split('T')[0]
    .split('-')
    .map(Number)

  if (
    dateParts.length !== 3 ||
    dateParts.some(Number.isNaN)
  ) {
    return 'No due date'
  }

  const [year, month, day] = dateParts

  const date = new Date(year, month - 1, day)

  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
  }).format(date)
}