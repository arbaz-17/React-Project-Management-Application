import Card from "../../../components/ui/Card";

function ProjectCardSkeleton() {
  return (
    <Card className="project-card project-card-skeleton">
      <div className="project-card-header">
        <div className="project-card-title-group">
          <span className="skeleton project-card-skeleton-title" />

          <span className="skeleton project-card-skeleton-category" />
        </div>

        <span className="skeleton project-card-skeleton-badge" />
      </div>

      <div className="project-card-skeleton-lines">
        <span className="skeleton project-card-skeleton-line" />
        <span className="skeleton project-card-skeleton-line" />
        <span className="skeleton project-card-skeleton-line project-card-skeleton-line-short" />
      </div>

      <div className="project-card-footer">
        <span className="skeleton project-card-skeleton-open" />

        <div className="project-card-actions">
          <span className="skeleton project-card-skeleton-action" />
          <span className="skeleton project-card-skeleton-action" />
        </div>
      </div>
    </Card>
  );
}

export default ProjectCardSkeleton;
