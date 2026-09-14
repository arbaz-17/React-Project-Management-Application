import Card from '../../../components/ui/Card'

function TaskDetailsSkeleton() {
  return (
    <div
      className="task-details-skeleton"
      role="status"
      aria-live="polite"
      aria-label="Loading task details"
    >
      <div className="task-details-header">
        <span className="skeleton task-details-skeleton-back" />

        <div className="task-details-heading">
          <div className="task-details-title-group">
            <span className="skeleton task-details-skeleton-project" />

            <span className="skeleton task-details-skeleton-title" />
          </div>

          <div className="task-details-badges">
            <span className="skeleton task-details-skeleton-badge" />
            <span className="skeleton task-details-skeleton-badge" />
          </div>
        </div>
      </div>

      <Card className="task-details-card">
        <section className="task-details-section">
          <span className="skeleton task-details-skeleton-section-title" />

          <div className="task-details-skeleton-description">
            <span className="skeleton task-details-skeleton-line" />
            <span className="skeleton task-details-skeleton-line" />
            <span className="skeleton task-details-skeleton-line task-details-skeleton-line-short" />
          </div>
        </section>

        <section className="task-details-section">
          <span className="skeleton task-details-skeleton-section-title" />

          <div className="task-details-grid">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="task-detail-item"
              >
                <span className="skeleton task-details-skeleton-label" />
                <span className="skeleton task-details-skeleton-value" />
              </div>
            ))}
          </div>
        </section>

        <section className="task-details-section">
          <span className="skeleton task-details-skeleton-section-title" />

          <div className="task-details-activity">
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                className="task-detail-item"
              >
                <span className="skeleton task-details-skeleton-label" />
                <span className="skeleton task-details-skeleton-activity-value" />
              </div>
            ))}
          </div>
        </section>
      </Card>
    </div>
  )
}

export default TaskDetailsSkeleton