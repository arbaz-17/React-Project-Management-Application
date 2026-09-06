import { useParams } from 'react-router-dom'

function ProjectBoardPage() {
  const { projectId } = useParams()

  return (
    <section className="page">
      <h2>Project Board</h2>
      <p>Project ID: {projectId}</p>
    </section>
  )
}

export default ProjectBoardPage