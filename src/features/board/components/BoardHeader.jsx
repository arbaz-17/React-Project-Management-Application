import { Link } from 'react-router-dom'

import Badge from '../../../components/ui/Badge'
import Button from '../../../components/ui/Button'

function BoardHeader({ project, onAddTask }) {
  return (
    <div className="project-board-header">
      <div>
        <Link to="/projects" className="project-back-link">
          ← Back to Projects
        </Link>

        <h2>{project.name}</h2>

        <p>{project.description}</p>
      </div>

      <div className="project-board-header-actions">
        <Badge variant="info">Project Board</Badge>

        <Button onClick={onAddTask}>
          + Add Task
        </Button>
      </div>
    </div>
  )
}

export default BoardHeader