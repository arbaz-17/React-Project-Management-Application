import request from './apiClient'

export function getProjects() {
  return request('/projects')
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
    method: 'PATCH',
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