import { useParams } from 'react-router-dom'

function ProjectBoardPage() {
  const { projectId } = useParams()

  return (
    <main>
      <h1>Project Board</h1>
      <p>Project ID: {projectId}</p>
    </main>
  )
}

export default ProjectBoardPage