import { useParams } from 'react-router-dom'

function TaskDetailsPage() {
  const { projectId, taskId } = useParams()

  return (
    <main>
      <h1>Task Details</h1>
      <p>Project ID: {projectId}</p>
      <p>Task ID: {taskId}</p>
    </main>
  )
}

export default TaskDetailsPage