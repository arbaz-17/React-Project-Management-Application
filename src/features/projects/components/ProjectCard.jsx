import { ArrowRight, FolderKanban, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";

import { PROJECT_STATUS_VARIANTS } from "../utils/projectConstants.js";

function ProjectCard({ project, onEdit, onDelete }) {
  const statusVariant = PROJECT_STATUS_VARIANTS[project.status] ?? "default";

  return (
    <Card className="project-card">
      <div className="project-card-header">
        <div className="project-card-title-group">
          <Link
            className="project-card-title-link"
            to={`/projects/${project.id}`}
          >
            <h3>{project.name}</h3>
          </Link>

          <div className="project-card-category">
            <FolderKanban size={14} aria-hidden="true" />

            <span>{project.category || "Uncategorized"}</span>
          </div>
        </div>

        <Badge variant={statusVariant}>{project.status || "No Status"}</Badge>
      </div>

      <p className="project-card-description">
        {project.description || "No description provided."}
      </p>

      <div className="project-card-footer">
        <Link className="project-card-open-link" to={`/projects/${project.id}`}>
          <span>Open Project</span>
          <ArrowRight size={15} aria-hidden="true" />
        </Link>

        <div className="project-card-actions">
          <Button
            variant="secondary"
            size="small"
            onClick={() => onEdit(project)}
            aria-label={`Edit ${project.name}`}
          >
            <Pencil size={14} aria-hidden="true" />
            Edit
          </Button>

          <Button
            variant="danger"
            size="small"
            onClick={() => onDelete(project)}
            aria-label={`Delete ${project.name}`}
          >
            <Trash2 size={14} aria-hidden="true" />
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default ProjectCard;
