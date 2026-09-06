export function getProjectById(projects, projectId) {
  return projects.find(
    (project) => project.id === projectId,
  )
}