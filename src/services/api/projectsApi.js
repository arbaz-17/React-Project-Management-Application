import request from './apiClient'

export const PROJECTS_PER_PAGE = 6

export async function getProjects(filters = {}) {
  const params = new URLSearchParams()

  if (filters.search) {
    params.set('search', filters.search)
  }

  if (filters.status) {
    params.set('status', filters.status)
  }

  if (filters.category) {
    params.set('category', filters.category)
  }

  if (filters.page) {
    params.set('page', filters.page)
  }

  // Request one extra record to determine whether another page exists.
  params.set('limit', String(PROJECTS_PER_PAGE + 1))

  if (filters.sort) {
    const [sortBy, order] = filters.sort.split('-')

    params.set('sortBy', sortBy)
    params.set('order', order)
  }

  const queryString = params.toString()

  const projects = await request(`/projects?${queryString}`)

  const hasNextPage = projects.length > PROJECTS_PER_PAGE

  return {
    projects: projects.slice(0, PROJECTS_PER_PAGE),
    hasNextPage,
  }
}

export function getProject(projectId) {
  return request(`/projects/${projectId}`)
}

export function createProject(project) {
  const now = new Date().toISOString()

  return request('/projects', {
    method: 'POST',
    body: JSON.stringify({
      ...project,
      createdAt: now,
      updatedAt: now,
    }),
  })
}

export function updateProject(projectId, project) {
  return request(`/projects/${projectId}`, {
    method: 'PUT',
    body: JSON.stringify({
      ...project,
      updatedAt: new Date().toISOString(),
    }),
  })
}

export function deleteProject(projectId) {
  return request(`/projects/${projectId}`, {
    method: 'DELETE',
  })
}