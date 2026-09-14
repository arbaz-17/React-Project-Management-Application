import { Link } from 'react-router-dom'
import Button from '../../../components/ui/Button'

function BoardHeader({ project, onAddTask, isLoading = false }) {
  return (
    <div className="project-board-header">
      <div>
        <Link to="/projects" className="project-back-link">
          ← Back to Projects
        </Link>

        {isLoading ? (
          <span className="skeleton board-header-skeleton-title" />
        ) : (
          <h2>{project.name}</h2>
        )}

        {isLoading ? (
          <span className="skeleton board-header-skeleton-description" />
        ) : (
          <p>{project.description}</p>
        )}
      </div>

      <div className="project-board-header-actions">
        <Button onClick={onAddTask} disabled={isLoading}>
          + Add Task
        </Button>
      </div>
    </div>
  )
}

export default BoardHeader