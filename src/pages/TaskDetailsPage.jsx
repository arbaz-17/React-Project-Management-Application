import { useParams } from 'react-router-dom'

function TaskDetailsPage() {
  const { projectId, taskId } = useParams()

  return (
    <section className="page">
      <h2>Task Details</h2>
      <p>Project ID: {projectId}</p>
      <p>Task ID: {taskId}</p>
    </section>
  )
}

export default TaskDetailsPage