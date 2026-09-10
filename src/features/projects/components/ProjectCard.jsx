import { Link } from 'react-router-dom'

import Badge from '../../../components/ui/Badge'
import Button from '../../../components/ui/Button'
import Card from '../../../components/ui/Card'

function ProjectCard({ project, onEdit, onDelete }) {
  return (
    <Card className="project-card">
      <div className="project-card-header">
        <div className="project-card-title-group">
          <h3>{project.name}</h3>
          <Badge variant="info">Project</Badge>
        </div>
      </div>

      <p className="project-card-description">
        {project.description || 'No description provided.'}
      </p>

      <div className="project-card-footer">
        <Link
          className="button button-primary button-small"
          to={`/projects/${project.id}`}
        >
          Open Project
        </Link>

        <div className="project-card-actions">
          <Button
            variant="secondary"
            size="small"
            onClick={() => onEdit(project)}
          >
            Edit
          </Button>

          <Button
            variant="danger"
            size="small"
            onClick={() => onDelete(project)}
          >
            Delete
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default ProjectCard