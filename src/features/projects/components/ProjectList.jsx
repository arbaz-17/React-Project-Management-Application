import EmptyState from '../../../components/ui/EmptyState'
import ProjectCard from './ProjectCard'
import ProjectCardSkeleton from './ProjectCardSkeleton'

import { PROJECTS_PER_PAGE } from '../../../services/api/projectsApi'

function ProjectList({
  projects,
  onEdit,
  onDelete,
  hasActiveFilters = false,
  isLoading = false,
}) {
  if (isLoading) {
    return (
      <div
        className="project-list"
        role="status"
        aria-live="polite"
        aria-label="Loading projects"
      >
        {Array.from({ length: PROJECTS_PER_PAGE }).map((_, index) => (
          <ProjectCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (projects.length === 0) {
    return (
      <EmptyState
        title={hasActiveFilters ? 'No matching projects' : 'No projects yet'}
        message={
          hasActiveFilters
            ? 'Try adjusting or clearing your filters.'
            : 'Create your first project to get started.'
        }
      />
    )
  }

  return (
    <div className="project-list">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default ProjectList