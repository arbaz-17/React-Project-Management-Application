import request from './apiClient'

export function getTasks() {
  return request('/tasks')
}

export async function getTasksByProject(projectId) {
  try {
    return await request(
      `/tasks?projectId=${encodeURIComponent(projectId)}`,
    )
  } catch (error) {
    if (error.status === 404) {
      return []
    }

    throw error
  }
}

export function getTask(taskId) {
  return request(`/tasks/${taskId}`)
}

export function createTask(task) {
  const now = new Date().toISOString()

  return request('/tasks', {
    method: 'POST',
    body: JSON.stringify({
      ...task,
      createdAt: now,
      updatedAt: now,
    }),
  })
}

export function updateTask(taskId, task) {
  return request(`/tasks/${taskId}`, {
    method: 'PUT',
    body: JSON.stringify({
      ...task,
      updatedAt: new Date().toISOString(),
    }),
  })
}

export function deleteTask(taskId) {
  return request(`/tasks/${taskId}`, {
    method: 'DELETE',
  })
}