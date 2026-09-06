export function getTaskById(tasks, taskId) {
  return tasks.find((task) => task.id === taskId)
}