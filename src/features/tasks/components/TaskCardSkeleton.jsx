import Card from '../../../components/ui/Card'

function TaskCardSkeleton() {
  return (
    <Card className="task-card">
      <div className="task-card-header">
        <span className="skeleton task-card-skeleton-title" />
        <span className="skeleton task-card-skeleton-priority" />
      </div>

      <div className="task-card-skeleton-lines">
        <span className="skeleton task-card-skeleton-line" />
        <span className="skeleton task-card-skeleton-line task-card-skeleton-line-short" />
      </div>

      <div className="task-card-meta">
        <div className="task-assignee">
          <span className="skeleton task-card-skeleton-avatar" />
          <span className="skeleton task-card-skeleton-name" />
        </div>
      </div>

      <div className="task-card-actions">
        <span className="skeleton task-card-skeleton-button" />
        <span className="skeleton task-card-skeleton-button" />
      </div>
    </Card>
  )
}

export default TaskCardSkeleton